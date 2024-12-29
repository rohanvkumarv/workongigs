
// import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
// import { db } from '@/lib/prisma';
// import { NextResponse } from 'next/server';
// import { v4 as uuidv4 } from 'uuid';

// // Initialize S3 client
// const s3 = new S3Client({
//   region: process.env.NEXT_PUBLIC_AWS_S3_REGION,
//   credentials: {
//     accessKeyId: process.env.NEXT_PUBLIC_S3_ACCESS_KEY_ID,
//     secretAccessKey: process.env.NEXT_PUBLIC_S3_SECRET_ACCESS_KEY,
//   },
// });

// // Helper function to upload file to S3
// async function uploadFileToS3(file) {
//   const fileExtension = file.name.split('.').pop();
//   const fileName = `${uuidv4()}.${fileExtension}`;
//   const buffer = Buffer.from(await file.arrayBuffer());

//   await s3.send(new PutObjectCommand({
//     Bucket: process.env.NEXT_PUBLIC_S3_BUCKET_NAME,
//     Key: fileName,
//     Body: buffer,
//     ContentType: file.type,
//   }));

//   return {
//     name: file.name,
//     url: `https://${process.env.NEXT_PUBLIC_S3_BUCKET_NAME}.s3.${process.env.NEXT_PUBLIC_AWS_S3_REGION}.amazonaws.com/${fileName}`,
//   };
// }

// export async function POST(req) {
//     try {
//       const formData = await req.formData();
//       const files = formData.getAll('files');
      
//       console.log('Files:', files);
//       if (!files || files.length === 0) {
//         throw new Error('No files provided');
//       }
  
//       // 1. Create project first
//       const project = await db.project.create({
//         data: {
//           name: formData.get('projectName'),
//           modeOfPay: formData.get('paymentMode'),
//           status: 'ACTIVE',
//           freelancerId: formData.get('freelancerId'),
//         },
//       });
  
//       console.log('Project created:', project);
  
//       // 2. Create instance with the project reference
//       const instance = await db.instance.create({
//         data: {
//           name: 'instance1',
//           desc: formData.get('description') || '',
//           cost: parseFloat(formData.get('cost')),
//           PaymentStatus: "Not Paid",  // Matches schema exactly
//           projectId: project.id,      // Reference to the project we just created
//         },
//       });
  
//       console.log('Instance created:', instance);
  
//       // 3. Upload files to S3 and create file records
//       const uploadedFiles = await Promise.all(
//         files.map(async (file) => {
//           const uploaded = await uploadFileToS3(file);
//           // Create file record immediately after upload
//           const fileRecord = await db.file.create({
//             data: {
//               name: uploaded.name,
//               url: uploaded.url,
//               instanceId: instance.id,
//             },
//           });
//           return fileRecord;
//         })
//       );
  
//       console.log('Files uploaded and records created:', uploadedFiles);
  
//       return new Response(
//         JSON.stringify({ 
//           success: true, 
//           projectId: project.id,
//           instanceId: instance.id
//         }),
//         { 
//           status: 200,
//           headers: { 'Content-Type': 'application/json' },
//         }
//       );
  
//     } catch (error) {
//       console.error('Detailed error:', {
//         message: error.message,
//         stack: error.stack,
//         cause: error.cause
//       });
      
//       return new Response(
//         JSON.stringify({ 
//           success: false, 
//           error: error.message,
//           details: process.env.NODE_ENV === 'development' ? error.stack : undefined
//         }),
//         { 
//           status: 500,
//           headers: { 'Content-Type': 'application/json' },
//         }
//       );
//     }
//   }



// app/api/create-project/route.js
import { db } from '@/lib/prisma';

export async function POST(req) {
  try {
    const {
      projectName,
      cost,
      currency,
      paymentMode,
      description,
      freelancerId,
      files
    } = await req.json();

    // Create project
    const project = await db.project.create({
      data: {
        name: projectName,
        modeOfPay: paymentMode,
        status: 'ACTIVE',
        freelancerId,
      },
    });

    // Create instance
    const instance = await db.instance.create({
      data: {
        name: 'instance1',
        desc: description || '',
        cost: parseFloat(cost),
        PaymentStatus: "Not Paid",
        projectId: project.id,
      },
    });

    // Create file records
    const fileRecords = await Promise.all(
      files.map(file => 
        db.file.create({
          data: {
            name: file.name,
            url: file.url,
            instanceId: instance.id,
          },
        })
      )
    );

    return new Response(
      JSON.stringify({ 
        success: true, 
        projectId: project.id,
        instanceId: instance.id,
        files: fileRecords
      }),
      { 
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );

  } catch (error) {
    console.error('Project creation error:', error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message,
        details: process.env.NODE_ENV === 'development' ? error.stack : undefined
      }),
      { 
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}