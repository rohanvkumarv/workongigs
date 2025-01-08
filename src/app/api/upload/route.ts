

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

// app/api/upload/route.js
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

export async function POST(req) {
  try {
    const data = await req.formData();
    const file = data.get("file");
    const chunkNumber = data.get("chunkNumber");
    const totalChunks = data.get("totalChunks");
    const originalFileName = data.get("originalFileName");

    if (!file) {
      return Response.json({ error: "No file provided" }, { status: 400 });
    }

    const fileId = uuidv4();
    const fileExtension = originalFileName.split('.').pop();
    const fileName = `${fileId}-chunk${chunkNumber}.${fileExtension}`;
    const finalFileName = `${fileId}.${fileExtension}`;

    const command = new PutObjectCommand({
      Bucket: process.env.S3_BUCKET_NAME,
      Key: fileName,
      ContentType: file.type,
    });

    const presignedUrl = await getSignedUrl(s3, command, { expiresIn: 3600 });
    const finalUrl = `https://${process.env.S3_BUCKET_NAME}.s3.${process.env.AWS_S3_REGION}.amazonaws.com/${finalFileName}`;

    return Response.json({
      success: true,
      presignedUrl,
      finalUrl,
      fileId,
      chunkNumber,
      totalChunks,
    });
  } catch (error) {
    console.error("Upload error:", error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}