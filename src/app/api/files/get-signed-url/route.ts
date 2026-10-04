import { NextRequest, NextResponse } from 'next/server';

import { auth } from '@/auth';
import { getObjectUrl } from '@/lib/storage';

export async function POST(req: NextRequest) {
  try {
    // Check authentication
    const session = await auth();
    if (!session) {
      return NextResponse.json(
        {
          error: 'Unauthorized',
          message: 'You must be logged in to access files',
        },
        { status: 401 }
      );
    }

    // Get file key and bucket from request
    const { key, bucket } = await req.json();

    if (!key || !bucket) {
      return NextResponse.json(
        {
          error: 'Bad Request',
          message: 'File key and bucket name are required',
        },
        { status: 400 }
      );
    }

    // Generate a URL that expires in 15 minutes (S3 mode)
    const signedUrl = await getObjectUrl(key, { expiresIn: 900 });

    // Return the URL
    return NextResponse.json({
      success: true,
      signedUrl,
    });
  } catch (error) {
    console.error('Error generating signed URL:', error);
    return NextResponse.json(
      {
        error: 'Internal Server Error',
        message: 'Failed to generate signed URL',
      },
      { status: 500 }
    );
  }
}
