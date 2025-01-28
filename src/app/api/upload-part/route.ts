// // import { S3Client, UploadPartCommand } from "@aws-sdk/client-s3";
// // import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

// // const s3 = new S3Client({
// //   region: process.env.AWS_S3_REGION,
// //   credentials: {
// //     accessKeyId: process.env.S3_ACCESS_KEY_ID,
// //     secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
// //   },
// // });

// // export async function GET(req) {
// //   const { searchParams } = new URL(req.url);
// //   const uploadId = searchParams.get("uploadId");
// //   const key = searchParams.get("key");
// //   const partNumber = parseInt(searchParams.get("partNumber"));

// //   const command = new UploadPartCommand({
// //     Bucket: process.env.S3_BUCKET_NAME,
// //     Key: key,
// //     UploadId: uploadId,
// //     PartNumber: partNumber,
// //   });

// //   const url = await getSignedUrl(s3, command, { expiresIn: 3600 });

// //   return Response.json({ url });
// // }

// // app/api/upload-part/route.js
// import { S3Client, UploadPartCommand } from "@aws-sdk/client-s3";
// import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

// const s3 = new S3Client({
//   region: process.env.AWS_S3_REGION,
//   credentials: {
//     accessKeyId: process.env.S3_ACCESS_KEY_ID,
//     secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
//   },
// });

// export async function POST(req) {
//   try {
//     const formData = await req.formData();
//     const file = formData.get("file");
//     const chunkNumber = parseInt(formData.get("chunkNumber"));
//     const uploadId = formData.get("uploadId");
//     const key = formData.get("key");

//     if (!file || !uploadId || !key || !chunkNumber) {
//       return Response.json({ 
//         error: "Missing required fields" 
//       }, { status: 400 });
//     }

//     const command = new UploadPartCommand({
//       Bucket: process.env.S3_BUCKET_NAME,
//       Key: key,
//       UploadId: uploadId,
//       PartNumber: chunkNumber,
//       Body: file,
//     });

//     const response = await s3.send(command);

//     return Response.json({ 
//       ETag: response.ETag,
//       PartNumber: chunkNumber,
//       success: true 
//     });
//   } catch (error) {
//     console.error('Upload part error:', error);
//     return Response.json(
//       { error: "Failed to upload part" }, 
//       { status: 500 }
//     );
//   }
// }

// app/api/upload-part/route.js
import { S3Client, UploadPartCommand } from "@aws-sdk/client-s3";

const s3 = new S3Client({
  region: process.env.AWS_S3_REGION,
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
  },
});

export async function POST(req) {
  try {
    const formData = await req.formData();
    const file = formData.get("file");
    const chunkNumber = parseInt(formData.get("chunkNumber"));
    const uploadId = formData.get("uploadId");
    const key = formData.get("key");

    if (!file || !uploadId || !key || !chunkNumber) {
      return Response.json({ 
        error: "Missing required fields" 
      }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const command = new UploadPartCommand({
      Bucket: process.env.S3_BUCKET_NAME,
      Key: key,
      UploadId: uploadId,
      PartNumber: chunkNumber,
      Body: buffer,
    });

    const response = await s3.send(command);

    return Response.json({ 
      ETag: response.ETag,
      PartNumber: chunkNumber,
      success: true 
    });
  } catch (error) {
    console.error('Upload part error:', error);
    return Response.json(
      { error: "Failed to upload part" }, 
      { status: 500 }
    );
  }
}
