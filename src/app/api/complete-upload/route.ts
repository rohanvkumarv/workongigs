
// // app/api/complete-upload/route.js
// import { S3Client, CompleteMultipartUploadCommand } from "@aws-sdk/client-s3";

// const s3 = new S3Client({
//   region: process.env.AWS_S3_REGION,
//   credentials: {
//     accessKeyId: process.env.S3_ACCESS_KEY_ID,
//     secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
//   },
// });

// export async function POST(req) {
//   try {
//     const { uploadId, key, parts } = await req.json();

//     if (!uploadId || !key || !parts || !parts.length) {
//       return Response.json({ 
//         error: "Missing required fields" 
//       }, { status: 400 });
//     }

//     const command = new CompleteMultipartUploadCommand({
//       Bucket: process.env.S3_BUCKET_NAME,
//       Key: key,
//       UploadId: uploadId,
//       MultipartUpload: { Parts: parts },
//     });

//     await s3.send(command);

//     const fileUrl = `${process.env.NEXT_PUBLIC_S3_BUCKET_URL}/${key}`;

//     return Response.json({ 
//       success: true, 
//       key,
//       fileUrl 
//     });
//   } catch (error) {
//     console.error('Complete upload error:', error);
//     return Response.json(
//       { error: "Failed to complete upload" }, 
//       { status: 500 }
//     );
//   }
// }

// app/api/complete-upload/route.js
import { S3Client, CompleteMultipartUploadCommand } from "@aws-sdk/client-s3";

const s3 = new S3Client({
  region: process.env.AWS_S3_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

export async function POST(req) {
  try {
    const { uploadId, key, parts } = await req.json();

    if (!uploadId || !key || !parts || !parts.length) {
      return Response.json({ 
        error: "Missing required fields" 
      }, { status: 400 });
    }

    const command = new CompleteMultipartUploadCommand({
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Key: key,
      UploadId: uploadId,
      MultipartUpload: { Parts: parts },
    });

    await s3.send(command);

    // Construct the file URL
    const fileUrl = `${process.env.NEXT_PUBLIC_AWS_S3_BASE_URL}/${key}`;

    return Response.json({ 
      success: true,
      key,
      fileUrl
    });
  } catch (error) {
    console.error('Complete upload error:', error);
    return Response.json(
      { error: "Failed to complete upload" }, 
      { status: 500 }
    );
  }
}