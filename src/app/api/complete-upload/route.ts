
// // app/api/complete-upload/route.js
// import { S3Client, CompleteMultipartUploadCommand } from "@aws-sdk/client-s3";

// const s3 = new S3Client({
//   region: process.env.AWS_S3_REGION,
//   credentials: {
//     accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//     secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
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
//       Bucket: process.env.AWS_S3_BUCKET_NAME,
//       Key: key,
//       UploadId: uploadId,
//       MultipartUpload: { Parts: parts },
//     });

//     await s3.send(command);

//     // Construct the file URL
//     const fileUrl = `${process.env.NEXT_PUBLIC_AWS_S3_BASE_URL}/${key}`;

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

// Configure S3 client with increased timeout
const s3 = new S3Client({
  region: process.env.AWS_S3_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
  requestHandler: {
    requestTimeout: 300000, // 5 minutes timeout
  },
  maxAttempts: 3, // Retry failed requests
});

export async function POST(req) {
  try {
    const { uploadId, key, parts } = await req.json();

    if (!uploadId || !key || !parts || !parts.length) {
      return Response.json({ 
        error: "Missing required fields" 
      }, { status: 400 });
    }

    console.log(`Completing upload for ${key} with ${parts.length} parts`);

    const command = new CompleteMultipartUploadCommand({
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Key: key,
      UploadId: uploadId,
      MultipartUpload: { Parts: parts },
    });

    // Execute with retry logic
    let retries = 3;
    let lastError;

    while (retries > 0) {
      try {
        await s3.send(command);
        
        // Construct the file URL
        const fileUrl = `${process.env.NEXT_PUBLIC_AWS_S3_BASE_URL}/${key}`;

        console.log(`Upload completed successfully: ${fileUrl}`);

        return Response.json({ 
          success: true,
          key,
          fileUrl
        });
      } catch (error) {
        lastError = error;
        retries--;
        
        console.error(`Upload attempt failed, retries left: ${retries}`, error.message);
        
        if (retries > 0) {
          // Wait before retry (exponential backoff: 2s, 4s, 6s)
          const waitTime = (4 - retries) * 2000;
          console.log(`Waiting ${waitTime}ms before retry...`);
          await new Promise(resolve => setTimeout(resolve, waitTime));
        }
      }
    }

    // All retries failed
    throw lastError;

  } catch (error) {
    console.error('Complete upload error:', error);
    return Response.json(
      { 
        error: "Failed to complete upload",
        details: error.message 
      }, 
      { status: 500 }
    );
  }
}