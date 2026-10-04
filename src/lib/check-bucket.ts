import { checkStorageAccess } from '@/lib/storage';

/**
 * Verifies access to the configured storage backend.
 * Returns true for local filesystem storage when S3 is not configured.
 */
export const checkBucketAccess = async () => {
  const result = await checkStorageAccess();
  console.log(result.message);
  return result.ok;
};
