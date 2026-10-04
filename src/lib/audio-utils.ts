import { v4 as uuidv4 } from 'uuid';

import { getObjectUrl, putObject } from './storage';

/**
 * Uploads an audio buffer to storage.
 * Uses S3 when configured, otherwise the local filesystem.
 * @param audioBuffer The audio buffer to upload
 * @param applicationId The application ID to associate the audio with
 * @returns The storage key and bucket of the uploaded audio file
 */
export async function uploadAudioToS3(
  audioBuffer: Buffer,
  applicationId: string
): Promise<{
  s3Key: string;
  s3Bucket: string;
}> {
  try {
    // Generate a unique filename with timestamp
    const timestamp = new Date().getTime();
    const randomId = uuidv4().substring(0, 8); // Use first 8 chars of UUID for brevity
    const key = `audio/${applicationId}/${timestamp}-${randomId}.mp3`;

    const { key: storedKey, bucket } = await putObject(key, audioBuffer, 'audio/mpeg');

    return {
      s3Key: storedKey,
      s3Bucket: bucket,
    };
  } catch (error) {
    console.error('Error uploading audio to storage:', error);
    throw error;
  }
}

/**
 * Generates a URL for an audio file.
 * @param s3Key The storage key of the audio file
 * @param s3Bucket The bucket containing the audio file (unused by local storage)
 * @returns A URL for the audio file
 */
export async function getAudioSignedUrl(s3Key: string, s3Bucket?: string): Promise<string> {
  try {
    void s3Bucket;
    return await getObjectUrl(s3Key, {
      contentType: 'audio/mpeg',
      disposition: 'inline',
      expiresIn: 3600, // URL expires in 1 hour (S3 mode)
    });
  } catch (error) {
    console.error('Error generating audio URL:', error);
    throw error;
  }
}
