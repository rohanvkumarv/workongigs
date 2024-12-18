
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { db } from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';

const s3 = new S3Client({
  region: process.env.NEXT_PUBLIC_AWS_S3_REGION,
  credentials: {
    accessKeyId: process.env.NEXT_PUBLIC_S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.NEXT_PUBLIC_S3_SECRET_ACCESS_KEY,
  },
});

async function uploadFileToS3(file) {
  try {
    const fileExtension = file.name.split('.').pop();
    const fileName = `${uuidv4()}.${fileExtension}`;
    const buffer = Buffer.from(await file.arrayBuffer());

    await s3.send(new PutObjectCommand({
      Bucket: process.env.NEXT_PUBLIC_S3_BUCKET_NAME,
      Key: fileName,
      Body: buffer,
      ContentType: file.type,
    }));

    return {
      name: file.name,
      url: `https://${process.env.NEXT_PUBLIC_S3_BUCKET_NAME}.s3.${process.env.NEXT_PUBLIC_AWS_S3_REGION}.amazonaws.com/${fileName}`,
    };
  } catch (error) {
    console.error('S3 upload failed:', error);
    throw new Error('Failed to upload file to S3');
  }
}

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    
    const projectId = formData.get('projectId');
    const desc = formData.get('desc') || '';
    const costStr = formData.get('cost');
    const files = formData.getAll('files');

    if (!projectId || !costStr || files.length === 0) {
      return NextResponse.json(
        { success: false },
        { status: 400 }
      );
    }

    const cost = parseFloat(costStr.toString());

    const instance = await db.instance.create({
      data: {
        name: `Instance #${Date.now()}`,
        desc: desc.toString(),
        cost,
        PaymentStatus:"Not Paid",
        projectId: projectId.toString()
      }
    });

    const uploadedFiles = await Promise.all(
      files.map(uploadFileToS3)
    );

    await db.file.createMany({
      data: uploadedFiles.map(file => ({
        name: file.name,
        url: file.url,
        instanceId: instance.id,
      })),
    });

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { success: false },
      { status: 500 }
    );
  }
}