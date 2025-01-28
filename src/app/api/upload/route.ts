

// // // // app/api/upload/route.js
// // // import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
// // // import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
// // // import { v4 as uuidv4 } from "uuid";

// // // const s3 = new S3Client({
// // //   region: process.env.AWS_S3_REGION,
// // //   credentials: {
// // //     accessKeyId: process.env.S3_ACCESS_KEY_ID,
// // //     secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
// // //   },
// // // });

// // // export async function POST(req) {
// // //   try {
// // //     const data = await req.formData();
// // //     const file = data.get("file");
// // //     const originalFileName = data.get("originalFileName");

// // //     if (!file) {
// // //       return Response.json({ error: "No file provided" }, { status: 400 });
// // //     }

// // //     const fileId = uuidv4();
// // //     const fileExtension = originalFileName.split('.').pop();
// // //     const fileName = `${fileId}.${fileExtension}`;

// // //     // Direct upload without chunks for simplicity first
// // //     const command = new PutObjectCommand({
// // //       Bucket: process.env.S3_BUCKET_NAME,
// // //       Key: fileName,
// // //       Body: await file.arrayBuffer(),
// // //       ContentType: file.type,
// // //       ACL: 'public-read'  // Make sure this is added
// // //     });

// // //     await s3.send(command);

// // //     const finalUrl = `https://${process.env.S3_BUCKET_NAME}.s3.${process.env.AWS_S3_REGION}.amazonaws.com/${fileName}`;

// // //     return Response.json({
// // //       success: true,
// // //       url: finalUrl,
// // //       key: fileName
// // //     });
// // //   } catch (error) {
// // //     console.error("Upload error:", error);
// // //     return Response.json({ 
// // //       error: error.message,
// // //       details: error.stack 
// // //     }, { status: 500 });
// // //   }
// // // }

// // import { S3Client, CreateMultipartUploadCommand } from "@aws-sdk/client-s3";

// // const s3 = new S3Client({
// //   region: process.env.AWS_S3_REGION,
// //   credentials: {
// //     accessKeyId: process.env.S3_ACCESS_KEY_ID,
// //     secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
// //   },
// // });

// // export async function POST(req) {
// //   const { fileName, fileType } = await req.json();
// //   const key = `uploads/${Date.now()}-${fileName}`;

// //   const uploadCommand = new CreateMultipartUploadCommand({
// //     Bucket: process.env.S3_BUCKET_NAME,
// //     Key: key,
// //     ContentType: fileType,
// //   });

// //   const { UploadId } = await s3.send(uploadCommand);

// //   return Response.json({ uploadId: UploadId, key });
// // }
// // app/api/upload/route.js
// import { S3Client, CreateMultipartUploadCommand } from "@aws-sdk/client-s3";

// const s3 = new S3Client({
//   region: process.env.AWS_S3_REGION,
//   credentials: {
//     accessKeyId: process.env.S3_ACCESS_KEY_ID,
//     secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
//   },
// });

// export async function POST(req) {
//   try {
//     // Parse FormData instead of JSON
//     const formData = await req.formData();
//     const fileName = formData.get("fileName");
//     const fileType = formData.get("fileType");
    
//     if (!fileName) {
//       return Response.json({ error: "fileName is required" }, { status: 400 });
//     }

//     const key = `uploads/${Date.now()}-${fileName}`;

//     const uploadCommand = new CreateMultipartUploadCommand({
//       Bucket: process.env.S3_BUCKET_NAME,
//       Key: key,
//       ContentType: fileType || 'application/octet-stream',
//     });

//     const { UploadId } = await s3.send(uploadCommand);

//     return Response.json({ 
//       uploadId: UploadId, 
//       key,
//       success: true 
//     });
//   } catch (error) {
//     console.error('Upload error:', error);
//     return Response.json(
//       { error: "Failed to initiate upload" }, 
//       { status: 500 }
//     );
//   }
// }

// app/api/upload/route.js
import { S3Client, CreateMultipartUploadCommand } from "@aws-sdk/client-s3";

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
    const fileName = formData.get("fileName");
    const fileType = formData.get("fileType");
    
    if (!fileName) {
      return Response.json({ error: "fileName is required" }, { status: 400 });
    }

    const key = `uploads/${Date.now()}-${fileName}`;

    const uploadCommand = new CreateMultipartUploadCommand({
      Bucket: process.env.S3_BUCKET_NAME,
      Key: key,
      ContentType: fileType || 'application/octet-stream',
    });

    const { UploadId } = await s3.send(uploadCommand);

    return Response.json({ 
      uploadId: UploadId, 
      key,
      success: true 
    });
  } catch (error) {
    console.error('Upload error:', error);
    return Response.json(
      { error: "Failed to initiate upload" }, 
      { status: 500 }
    );
  }
}
