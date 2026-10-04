// Server-side storage abstraction.
//
// When the AWS/S3 environment variables are configured, objects are stored in
// the remote S3-compatible bucket (Tigris, R2, AWS, etc.) exactly as before.
// When they are NOT configured, the app transparently falls back to storing
// objects on the local filesystem so the project can be started and used
// locally without any cloud credentials.
//
// Only storage is affected: database, AI and email integrations are untouched.

import {
  GetObjectCommand,
  HeadBucketCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { promises as fs } from 'node:fs';
import path from 'node:path';

export type StorageMode = 's3' | 'local';

const LOCAL_STORAGE_DIR = process.env.LOCAL_STORAGE_DIR
  ? path.resolve(process.env.LOCAL_STORAGE_DIR)
  : path.join(process.cwd(), '.local-storage');

/** Returns true when all required S3 credentials/endpoint are present. */
export function isS3Configured(): boolean {
  return Boolean(
    process.env.AWS_ACCESS_KEY_ID &&
      process.env.AWS_SECRET_ACCESS_KEY &&
      process.env.AWS_ENDPOINT_URL_S3 &&
      process.env.AWS_REGION
  );
}

export function getStorageMode(): StorageMode {
  return isS3Configured() ? 's3' : 'local';
}

export function isLocalStorage(): boolean {
  return getStorageMode() === 'local';
}

/** Bucket name, or a synthetic name used to identify local storage. */
export function getBucketName(): string {
  return process.env.AWS_BUCKET_NAME || (isLocalStorage() ? 'local' : 'hirelytics');
}

let cachedS3Client: S3Client | null = null;

function getS3Client(): S3Client {
  if (!cachedS3Client) {
    cachedS3Client = new S3Client({
      region: process.env.AWS_REGION!,
      endpoint: process.env.AWS_ENDPOINT_URL_S3,
      forcePathStyle: true,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
      },
    });
  }
  return cachedS3Client;
}

/** Resolve a storage key to an absolute path that stays inside LOCAL_STORAGE_DIR. */
function resolveLocalPath(key: string): string {
  const normalizedKey = key.replace(/^\/+/, '');
  const fullPath = path.resolve(LOCAL_STORAGE_DIR, normalizedKey);
  const root = path.resolve(LOCAL_STORAGE_DIR);
  if (fullPath !== root && !fullPath.startsWith(root + path.sep)) {
    throw new Error(`Invalid storage key: ${key}`);
  }
  return fullPath;
}

/** Build a browser-usable URL for a locally stored object. */
function getLocalObjectUrl(key: string): string {
  return `/api/storage/${key.split('/').map(encodeURIComponent).join('/')}`;
}

/**
 * Store an object. Returns the storage key and the bucket it belongs to.
 */
export async function putObject(
  key: string,
  body: Buffer | Uint8Array,
  contentType?: string
): Promise<{ key: string; bucket: string }> {
  if (isLocalStorage()) {
    const fullPath = resolveLocalPath(key);
    await fs.mkdir(path.dirname(fullPath), { recursive: true });
    await fs.writeFile(fullPath, body);
    return { key, bucket: getBucketName() };
  }

  await getS3Client().send(
    new PutObjectCommand({
      Bucket: getBucketName(),
      Key: key,
      Body: body,
      ContentType: contentType,
    })
  );
  return { key, bucket: getBucketName() };
}

/**
 * Read an object's bytes. S3 objects are fetched via a short-lived signed URL;
 * local objects are read directly from disk.
 */
export async function getObjectBuffer(key: string): Promise<Buffer> {
  if (isLocalStorage()) {
    return fs.readFile(resolveLocalPath(key));
  }

  const url = await getSignedUrl(
    getS3Client(),
    new GetObjectCommand({ Bucket: getBucketName(), Key: key }),
    { expiresIn: 300 }
  );
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch object from S3: ${response.statusText}`);
  }
  return Buffer.from(await response.arrayBuffer());
}

/**
 * Get a URL for an object that can be rendered/fetched by the browser.
 * - S3: a presigned URL.
 * - Local: a relative URL served by the /api/storage route.
 */
export async function getObjectUrl(
  key: string,
  options?: {
    contentType?: string;
    disposition?: 'inline' | 'attachment';
    expiresIn?: number;
  }
): Promise<string> {
  if (isLocalStorage()) {
    return getLocalObjectUrl(key);
  }

  const command = new GetObjectCommand({
    Bucket: getBucketName(),
    Key: key,
    ...(options?.contentType ? { ResponseContentType: options.contentType } : {}),
    ...(options?.disposition ? { ResponseContentDisposition: options.disposition } : {}),
  });

  return getSignedUrl(getS3Client(), command, {
    expiresIn: options?.expiresIn ?? 3600,
  });
}

/** Verify the configured storage backend is reachable. */
export async function checkStorageAccess(): Promise<{
  ok: boolean;
  mode: StorageMode;
  bucket: string;
  message: string;
}> {
  const bucket = getBucketName();

  if (isLocalStorage()) {
    try {
      await fs.mkdir(LOCAL_STORAGE_DIR, { recursive: true });
      await fs.access(LOCAL_STORAGE_DIR);
      console.log(`[storage] Using local storage at ${LOCAL_STORAGE_DIR}`);
      return {
        ok: true,
        mode: 'local',
        bucket,
        message: `Using local filesystem storage at ${LOCAL_STORAGE_DIR}`,
      };
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      console.error(`[storage] Local storage unavailable: ${message}`);
      return { ok: false, mode: 'local', bucket, message };
    }
  }

  try {
    await getS3Client().send(new HeadBucketCommand({ Bucket: bucket }));
    console.log(`[storage] Connected to S3 bucket: ${bucket}`);
    return { ok: true, mode: 's3', bucket, message: `Connected to S3 bucket: ${bucket}` };
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error(`[storage] Failed to access S3 bucket: ${message}`);
    return { ok: false, mode: 's3', bucket, message };
  }
}

export const LOCAL_STORAGE_ROOT = LOCAL_STORAGE_DIR;
