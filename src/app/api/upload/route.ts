import { NextRequest, NextResponse } from 'next/server';

import { auth } from '@/auth';
import { getObjectUrl, putObject } from '@/lib/storage';

export async function POST(req: NextRequest) {
  try {
    // Check authentication
    const session = await auth();
    if (!session) {
      return NextResponse.json(
        {
          error: 'Unauthorized',
          message: 'You must be logged in to upload files',
        },
        { status: 401 }
      );
    }

    // Get form data with the file
    const formData = await req.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json(
        { error: 'Bad Request', message: 'No file provided' },
        { status: 400 }
      );
    }

    // Validate file type (PDF only)
    if (file.type !== 'application/pdf') {
      return NextResponse.json(
        { error: 'Bad Request', message: 'Only PDF files are allowed' },
        { status: 400 }
      );
    }

    // Generate a unique filename
    const timestamp = new Date().getTime();
    const fileName = `${timestamp}-${file.name.replace(/\s+/g, '-')}`;
    const key = `resumes/${timestamp.toString().slice(0, 6)}/${fileName}`;

    // Convert file to buffer for storage
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Store file (S3 when configured, otherwise local filesystem)
    const { bucket } = await putObject(key, buffer, file.type);

    // Build a browser-usable URL for the stored file
    const fileUrl = await getObjectUrl(key, { contentType: file.type });

    // Convert file to base64 for database storage
    const base64 = Buffer.from(arrayBuffer).toString('base64');

    // Return success response with file info and storage key for generating URLs later
    return NextResponse.json({
      success: true,
      file: {
        url: fileUrl,
        fileName: fileName,
        base64: `data:${file.type};base64,${base64}`,
        key: key,
        bucket: bucket,
      },
    });
  } catch (error) {
    console.error('Error uploading file:', error);
    return NextResponse.json(
      { error: 'Internal Server Error', message: 'Failed to upload file' },
      { status: 500 }
    );
  }
}
