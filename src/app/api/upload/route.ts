// // app/api/upload/route.js
// import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
// import { Upload } from "@aws-sdk/lib-storage";
// import { v4 as uuidv4 } from 'uuid';

// const s3 = new S3Client({
//   region: process.env.NEXT_PUBLIC_AWS_S3_REGION,
//   credentials: {
//     accessKeyId: process.env.NEXT_PUBLIC_S3_ACCESS_KEY_ID,
//     secretAccessKey: process.env.NEXT_PUBLIC_S3_SECRET_ACCESS_KEY,
//   },
// });

// export async function POST(req) {
//   try {
//     const formData = await req.formData();
//     const file = formData.get('file');
    
//     if (!file) {
//       throw new Error('No file provided');
//     }

//     const fileExtension = file.name.split('.').pop();
//     const fileName = `${uuidv4()}.${fileExtension}`;
//     const buffer = Buffer.from(await file.arrayBuffer());

//     // Create a multipart upload
//     const upload = new Upload({
//       client: s3,
//       params: {
//         Bucket: process.env.NEXT_PUBLIC_S3_BUCKET_NAME,
//         Key: fileName,
//         Body: buffer,
//         ContentType: file.type,
//       },
//     });

//     // Complete the upload
//     await upload.done();

//     const url = `https://${process.env.NEXT_PUBLIC_S3_BUCKET_NAME}.s3.${process.env.NEXT_PUBLIC_AWS_S3_REGION}.amazonaws.com/${fileName}`;

//     return new Response(
//       JSON.stringify({ 
//         success: true, 
//         url
//       }),
//       { 
//         status: 200,
//         headers: { 'Content-Type': 'application/json' },
//       }
//     );

//   } catch (error) {
//     console.error('Upload error:', error);
//     return new Response(
//       JSON.stringify({ 
//         success: false, 
//         error: error.message 
//       }),
//       { 
//         status: 500,
//         headers: { 'Content-Type': 'application/json' },
//       }
//     );
//   }
// }

import { Upload } from "@aws-sdk/lib-storage";
import { S3Client } from "@aws-sdk/client-s3";
import { v4 as uuidv4 } from "uuid";

const s3 = new S3Client({
  region: process.env.NEXT_PUBLIC_AWS_S3_REGION,
  credentials: {
    accessKeyId: process.env.NEXT_PUBLIC_S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.NEXT_PUBLIC_S3_SECRET_ACCESS_KEY,
  },
});

export async function POST(req) {
  // Headers to enable SSE
  const headers = new Headers();
  headers.set("Content-Type", "text/event-stream");
  headers.set("Cache-Control", "no-cache");
  headers.set("Connection", "keep-alive");

  const stream = new ReadableStream({
    async start(controller) {
      const encoder = new TextEncoder();

      try {
        const formData = await req.formData();
        const file = formData.get("file");

        if (!file) {
          throw new Error("No file provided");
        }

        const fileExtension = file.name.split(".").pop();
        const fileName = `${uuidv4()}.${fileExtension}`;
        const buffer = Buffer.from(await file.arrayBuffer());

        // Create a multipart upload
        const upload = new Upload({
          client: s3,
          params: {
            Bucket: process.env.NEXT_PUBLIC_S3_BUCKET_NAME,
            Key: fileName,
            Body: buffer,
            ContentType: file.type,
          },
          queueSize: 4, // default is 4
          partSize: 1024 * 1024 * 5, // minimum 5MB per chunk
        });

        // Track upload progress
        upload.on("httpUploadProgress", (progress) => {
          const progressData = JSON.stringify({
            loaded: progress.loaded,
            total: progress.total,
            percentage: Math.round((progress.loaded / progress.total) * 100),
          });

          controller.enqueue(encoder.encode(`data: ${progressData}\n\n`));
        });

        // Complete the upload
        await upload.done();

        const url = `https://${process.env.NEXT_PUBLIC_S3_BUCKET_NAME}.s3.${process.env.NEXT_PUBLIC_AWS_S3_REGION}.amazonaws.com/${fileName}`;

        // Send final URL
        controller.enqueue(encoder.encode(`data: ${JSON.stringify({ url })}\n\n`));
        controller.close();

      } catch (error) {
        const errorData = JSON.stringify({ error: error.message });
        controller.enqueue(encoder.encode(`data: ${errorData}\n\n`));
        controller.close();
      }
    },
  });

  return new Response(stream, { headers });
}
