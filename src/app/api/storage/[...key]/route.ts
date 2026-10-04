import { NextRequest, NextResponse } from 'next/server';

import { getObjectBuffer, isLocalStorage } from '@/lib/storage';

// This route only exists to serve objects when the app is running with local
// (filesystem) storage. In S3 mode, objects are served via presigned URLs.

const CONTENT_TYPES: Record<string, string> = {
  '.mp3': 'audio/mpeg',
  '.wav': 'audio/wav',
  '.webm': 'audio/webm',
  '.m4a': 'audio/mp4',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.pdf': 'application/pdf',
};

function contentTypeFor(key: string): string {
  const ext = key.slice(key.lastIndexOf('.')).toLowerCase();
  return CONTENT_TYPES[ext] || 'application/octet-stream';
}

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ key: string[] }> }
) {
  if (!isLocalStorage()) {
    return NextResponse.json(
      { error: 'Not Found', message: 'Local storage is not enabled' },
      { status: 404 }
    );
  }

  const { key } = await params;
  const objectKey = Array.isArray(key) ? key.join('/') : String(key);

  try {
    const buffer = await getObjectBuffer(objectKey);
    return new NextResponse(new Uint8Array(buffer), {
      status: 200,
      headers: {
        'Content-Type': contentTypeFor(objectKey),
        'Content-Length': String(buffer.length),
        'Cache-Control': 'private, max-age=3600',
        'Accept-Ranges': 'bytes',
      },
    });
  } catch (error) {
    console.error('Error serving local object:', error);
    return NextResponse.json(
      { error: 'Not Found', message: 'Object not found' },
      { status: 404 }
    );
  }
}
