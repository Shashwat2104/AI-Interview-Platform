'use client';

/**
 * Convert a File object to base64 string
 * This is used only for preview purposes on the client side
 * @param file The file to convert to base64
 * @returns Promise with base64 string
 */
export const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
};

/**
 * Upload a file to the server, which will then upload it to Tigris S3
 * This approach keeps AWS credentials secure on the server
 * @param file The file to upload
 * @returns Promise with file information including URL, base64, key and bucket
 */
export const uploadFileToServer = async (
  file: File
): Promise<{
  url: string;
  fileName: string;
  base64: string;
  key: string;
  bucket: string;
}> => {
  try {
    // Create a FormData object to send the file
    const formData = new FormData();
    formData.append('file', file);

    // Send to our API endpoint
    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      const message = `File upload failed at /api/upload. Server responded with status ${response.status}. Reason: ${errorData.message || 'Unknown error'}`;
      console.error('[File Upload] ' + message, { fileName: file.name, fileSize: file.size });
      throw new Error(message);
    }

    const result = await response.json();

    if (!result.success) {
      const message = `File upload to S3 was not successful. Reason: ${result.message || 'Unknown error'}`;
      console.error('[File Upload] ' + message, { fileName: file.name, fileSize: file.size });
      throw new Error(message);
    }

    return result.file;
  } catch (error) {
    console.error('[File Upload] Unexpected error uploading file:', {
      fileName: file.name,
      fileSize: file.size,
      error,
    });
    throw new Error(
      `Unexpected error uploading file: ${error instanceof Error ? error.message : String(error)}`
    );
  }
};

/**
 * Process file for storage: upload to server which handles Tigris S3 upload
 * @param file The file to process
 * @returns Object containing S3 URL, base64 string, filename, key and bucket
 */
export const processFileForStorage = async (
  file: File
): Promise<{
  url: string;
  base64: string;
  fileName: string;
  key: string;
  bucket: string;
}> => {
  try {
    // Upload file to server which handles S3 upload and base64 conversion
    const result = await uploadFileToServer(file);
    return result;
  } catch (error) {
    console.error('[File Storage] Error processing file for storage:', {
      fileName: file.name,
      fileSize: file.size,
      error,
    });
    throw new Error(
      `Error processing file for storage: ${error instanceof Error ? error.message : String(error)}`
    );
  }
};
