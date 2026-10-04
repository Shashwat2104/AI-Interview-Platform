import { NextRequest, NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';

import { auth } from '@/auth';
import { connectToDatabase } from '@/lib/mongodb';
import { putObject } from '@/lib/storage';
import { JobApplication } from '@/models/job-application';

export async function POST(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { image, timestamp } = await request.json();

    // Convert base64 to buffer
    const buffer = Buffer.from(image.replace(/^data:image\/\w+;base64,/, ''), 'base64');

    // Generate unique key for storage
    const key = `monitoring/${id}/${uuidv4()}.jpg`;

    // Store image (S3 when configured, otherwise local filesystem)
    await putObject(key, buffer, 'image/jpeg');

    // Update application document
    await connectToDatabase();
    await JobApplication.updateOne(
      { _id: id },
      {
        $push: {
          monitoringImages: {
            s3Key: key,
            timestamp: new Date(timestamp),
          },
        },
      }
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error uploading monitoring image:', error);
    return NextResponse.json({ error: 'Failed to upload monitoring image' }, { status: 500 });
  }
}
