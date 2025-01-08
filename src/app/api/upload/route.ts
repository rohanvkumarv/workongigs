
// import { Upload } from "@aws-sdk/lib-storage";
// import { S3Client } from "@aws-sdk/client-s3";
// import { v4 as uuidv4 } from "uuid";

// const s3 = new S3Client({
//   region: process.env.NEXT_PUBLIC_AWS_S3_REGION,
//   credentials: {
//     accessKeyId: process.env.NEXT_PUBLIC_S3_ACCESS_KEY_ID,
//     secretAccessKey: process.env.NEXT_PUBLIC_S3_SECRET_ACCESS_KEY,
//   },
// });

// export async function POST(req) {
//   // Headers to enable SSE
//   const headers = new Headers();
//   headers.set("Content-Type", "text/event-stream");
//   headers.set("Cache-Control", "no-cache");
//   headers.set("Connection", "keep-alive");

//   const stream = new ReadableStream({
//     async start(controller) {
//       const encoder = new TextEncoder();

//       try {
//         const formData = await req.formData();
//         const file = formData.get("file");

//         if (!file) {
//           throw new Error("No file provided");
//         }

//         const fileExtension = file.name.split(".").pop();
//         const fileName = `${uuidv4()}.${fileExtension}`;
//         const buffer = Buffer.from(await file.arrayBuffer());

//         // Create a multipart upload
//         const upload = new Upload({
//           client: s3,
//           params: {
//             Bucket: process.env.NEXT_PUBLIC_S3_BUCKET_NAME,
//             Key: fileName,
//             Body: buffer,
//             ContentType: file.type,
//           },
//           queueSize: 4, // default is 4
//           partSize: 1024 * 1024 * 5, // minimum 5MB per chunk
//         });

//         // Track upload progress
//         upload.on("httpUploadProgress", (progress) => {
//           const progressData = JSON.stringify({
//             loaded: progress.loaded,
//             total: progress.total,
//             percentage: Math.round((progress.loaded / progress.total) * 100),
//           });

//           controller.enqueue(encoder.encode(`data: ${progressData}\n\n`));
//         });

//         // Complete the upload
//         await upload.done();

//         const url = `https://${process.env.NEXT_PUBLIC_S3_BUCKET_NAME}.s3.${process.env.NEXT_PUBLIC_AWS_S3_REGION}.amazonaws.com/${fileName}`;

//         // Send final URL
//         controller.enqueue(encoder.encode(`data: ${JSON.stringify({ url })}\n\n`));
//         controller.close();

//       } catch (error) {
//         const errorData = JSON.stringify({ error: error.message });
//         controller.enqueue(encoder.encode(`data: ${errorData}\n\n`));
//         controller.close();
//       }
//     },
//   });

//   return new Response(stream, { headers });
// }
// app/api/upload/route.js
// import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
// import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
// import { v4 as uuidv4 } from "uuid";

// const s3 = new S3Client({
//   region: process.env.AWS_S3_REGION, // Remove NEXT_PUBLIC_
//   credentials: {
//     accessKeyId: process.env.S3_ACCESS_KEY_ID, // Remove NEXT_PUBLIC_
//     secretAccessKey: process.env.S3_SECRET_ACCESS_KEY, // Remove NEXT_PUBLIC_
//   },
// });

// export async function POST(req) {
//   const headers = new Headers();
//   headers.set("Content-Type", "text/event-stream");
//   headers.set("Cache-Control", "no-cache");
//   headers.set("Connection", "keep-alive");

//   const stream = new ReadableStream({
//     async start(controller) {
//       const encoder = new TextEncoder();

//       try {
//         const formData = await req.formData();
//         const file = formData.get("file");

//         if (!file) {
//           throw new Error("No file provided");
//         }

//         const fileExtension = file.name.split(".").pop();
//         const fileName = `${uuidv4()}.${fileExtension}`;

//         // Generate presigned URL
//         const command = new PutObjectCommand({
//           Bucket: process.env.S3_BUCKET_NAME,
//           Key: fileName,
//           ContentType: file.type,
//         });

//         const presignedUrl = await getSignedUrl(s3, command, { expiresIn: 3600 });
//         const finalUrl = `https://${process.env.S3_BUCKET_NAME}.s3.${process.env.AWS_S3_REGION}.amazonaws.com/${fileName}`;

//         // Send the presigned URL to the client
//         controller.enqueue(
//           encoder.encode(
//             `data: ${JSON.stringify({ presignedUrl, finalUrl })}\n\n`
//           )
//         );
//         controller.close();
//       } catch (error) {
//         const errorData = JSON.stringify({ error: error.message });
//         controller.enqueue(encoder.encode(`data: ${errorData}\n\n`));
//         controller.close();
//       }
//     },
//   });

//   return new Response(stream, { headers });
// }

// api/upload.js
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { v4 as uuidv4 } from "uuid";

const s3 = new S3Client({
  region: process.env.AWS_S3_REGION,
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
  },
});

const CHUNK_SIZE = 4 * 1024 * 1024; // 4MB chunks

export async function POST(req) {
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
        const chunkNumber = parseInt(formData.get("chunkNumber"));
        const totalChunks = parseInt(formData.get("totalChunks"));
        const fileId = formData.get("fileId") || uuidv4();

        if (!file) {
          throw new Error("No file provided");
        }

        const fileExtension = file.name.split(".").pop();
        const fileName = `${fileId}-${chunkNumber}.${fileExtension}`;
        const finalFileName = `${fileId}.${fileExtension}`;

        // Generate presigned URL for the chunk
        const command = new PutObjectCommand({
          Bucket: process.env.S3_BUCKET_NAME,
          Key: fileName,
          ContentType: file.type,
        });

        const presignedUrl = await getSignedUrl(s3, command, { expiresIn: 3600 });
        const finalUrl = `https://${process.env.S3_BUCKET_NAME}.s3.${process.env.AWS_S3_REGION}.amazonaws.com/${finalFileName}`;

        // Send the presigned URL and metadata to the client
        controller.enqueue(
          encoder.encode(
            `data: ${JSON.stringify({ 
              presignedUrl, 
              finalUrl,
              fileId,
              chunkNumber,
              totalChunks 
            })}\n\n`
          )
        );
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
