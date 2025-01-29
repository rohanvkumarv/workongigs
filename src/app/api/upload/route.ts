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
// import { S3Client } from "@aws-sdk/client-s3";
// import { UploadPartCommand } from "@aws-sdk/client-s3";
// import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

// const s3 = new S3Client({
//   region: process.env.AWS_S3_REGION,
//   credentials: {
//     accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//     secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
//   },
// });

// export async function POST(req) {
//   try {
//     const formData = await req.formData();
//     const fileName = formData.get("fileName");
//     const fileType = formData.get("fileType");
//     const parts = parseInt(formData.get("parts"));
    
//     if (!fileName || !parts) {
//       return Response.json({ 
//         error: "fileName and parts are required" 
//       }, { status: 400 });
//     }

//     const key = `uploads/${Date.now()}-${fileName}`;

//     // Create multipart upload
//     const createCommand = new CreateMultipartUploadCommand({
//       Bucket: process.env.AWS_S3_BUCKET_NAME,
//       Key: key,
//       ContentType: fileType || 'application/octet-stream',
//     });

//     const { UploadId } = await s3.send(createCommand);

//     // Generate presigned URLs for each part
//     const presignedUrls = await Promise.all(
//       Array.from({ length: parts }, (_, index) => {
//         const command = new UploadPartCommand({
//           Bucket: process.env.AWS_S3_BUCKET_NAME,
//           Key: key,
//           UploadId,
//           PartNumber: index + 1,
//         });
//         return getSignedUrl(s3, command, { expiresIn: 3600 });
//       })
//     );

//     return Response.json({ 
//       uploadId: UploadId,
//       key,
//       presignedUrls,
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
// app/api/upload/route.ts
import { 
  S3Client, 
  CreateMultipartUploadCommand, 
  UploadPartCommand 
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

// Initialize S3 client
const s3 = new S3Client({
  region: process.env.AWS_S3_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const fileName = formData.get("fileName");
    const fileType = formData.get("fileType");
    const parts = parseInt(formData.get("parts") as string);
    
    if (!fileName || !parts) {
      return Response.json({ 
        error: "fileName and parts are required" 
      }, { status: 400 });
    }

    const key = `uploads/${Date.now()}-${fileName}`;

    // Create multipart upload
    const multipartUpload = await s3.send(
      new CreateMultipartUploadCommand({
        Bucket: process.env.AWS_S3_BUCKET_NAME,
        Key: key,
        ContentType: fileType || 'application/octet-stream',
      })
    );

    const uploadId = multipartUpload.UploadId;

    // Generate presigned URLs for each part
    const presignedUrls = await Promise.all(
      Array.from({ length: parts }, async (_, index) => {
        const command = new UploadPartCommand({
          Bucket: process.env.AWS_S3_BUCKET_NAME,
          Key: key,
          UploadId: uploadId,
          PartNumber: index + 1,
        });
        
        return getSignedUrl(s3, command, { expiresIn: 3600 });
      })
    );

    return Response.json({ 
      uploadId,
      key,
      presignedUrls,
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
