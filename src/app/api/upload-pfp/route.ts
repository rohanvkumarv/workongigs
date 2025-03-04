// app/api/upload-image/route.js
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { NextResponse } from 'next/server';
import crypto from 'crypto';

const s3 = new S3Client({
  region: process.env.AWS_S3_REGION,
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
  },
});

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file');
    const freelancerId = formData.get('freelancerId');
    
    if (!file || !freelancerId) {
      return NextResponse.json(
        { error: 'File and freelancer ID are required' }, 
        { status: 400 }
      );
    }

    // Generate a unique file name to avoid collisions
    const fileExtension = file.name.split('.').pop();
    const randomId = crypto.randomBytes(16).toString('hex');
    const fileName = `profile/${freelancerId}/${randomId}.${fileExtension}`;

    // Convert file to array buffer
    const buffer = await file.arrayBuffer();

    const command = new PutObjectCommand({
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Key: fileName,
      Body: Buffer.from(buffer),
      ContentType: file.type,
    });

    await s3.send(command);

    // Create the public URL for the uploaded image
    const imageUrl = `https://${process.env.AWS_S3_BUCKET_NAME}.s3.${process.env.AWS_S3_REGION}.amazonaws.com/${fileName}`;

    return NextResponse.json({ imageUrl });
  } catch (error) {
    console.error('Error uploading file:', error);
    return NextResponse.json(
      { error: 'Failed to upload image' },
      { status: 500 }
    );
  }
}