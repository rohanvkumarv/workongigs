// // app/api/freelancer/create-delivery/route.js
// import { NextResponse } from 'next/server';
// import { db } from '@/lib/prisma';

// export async function POST(req) {
//   try {
//     const body = await req.json();
//     const { 
//       name, 
//       desc, 
//       cost, 
//       PaymentStatus, 
//       clientId, 
//       files 
//     } = body;

//     console.log('Creating delivery with data:', { 
//       name, 
//       desc, 
//       cost, 
//       PaymentStatus, 
//       clientId, 
//       files: files?.length 
//     });

//     if (!name || !clientId || cost === undefined) {
//       return NextResponse.json({ 
//         success: false, 
//         error: 'Missing required delivery fields' 
//       }, { status: 400 });
//     }

//     // Check if client exists
//     const client = await db.client.findUnique({
//       where: { id: clientId }
//     });

//     if (!client) {
//       return NextResponse.json({ 
//         success: false, 
//         error: 'Client not found' 
//       }, { status: 404 });
//     }

//     // Create delivery
//     const delivery = await db.delivery.create({
//       data: {
//         name,
//         desc: desc || '',
//         cost: parseFloat(cost),
//         PaymentStatus: PaymentStatus || 'Not Paid',
//         withdrawStatus: 'no',
//         clientId
//       }
//     });

//     console.log('Delivery created successfully:', delivery.id);

//     // Create file records if files are provided
//     let fileRecords = [];
//     if (files && files.length > 0) {
//       fileRecords = await Promise.all(
//         files.map(file => 
//           db.file.create({
//             data: {
//               name: file.name,
//               url: file.url,
//               deliveryId: delivery.id
//             }
//           })
//         )
//       );
//       console.log(`Created ${fileRecords.length} file records`);
//     }

//     // Get the complete delivery with files
//     const completeDelivery = await db.delivery.findUnique({
//       where: { id: delivery.id },
//       include: { files: true }
//     });

//     return NextResponse.json({ 
//       success: true, 
//       delivery: completeDelivery
//     });

//   } catch (error) {
//     console.error('Delivery creation error:', error);
    
//     return NextResponse.json({ 
//       success: false, 
//       error: error.message,
//       stack: error.stack // Added for debugging, remove in production
//     }, { status: 500 });
//   }
// }

// app/api/freelancer/create-delivery/route.js
import { NextResponse } from 'next/server';
import { db } from '@/lib/prisma';

export async function POST(request) {
  try {
    const body = await request.json();
    const { 
      name, 
      desc, 
      cost, 
      PaymentStatus, 
      clientId, 
      files 
    } = body;

    console.log('Creating delivery with data:', { 
      name, 
      desc, 
      cost, 
      PaymentStatus, 
      clientId, 
      files: files?.length 
    });

    if (!name || !clientId || cost === undefined) {
      return NextResponse.json({ 
        success: false, 
        error: 'Missing required delivery fields' 
      }, { status: 400 });
    }

    // Check if client exists
    const client = await db.client.findUnique({
      where: { id: clientId }
    });

    if (!client) {
      return NextResponse.json({ 
        success: false, 
        error: 'Client not found' 
      }, { status: 404 });
    }

    // Create delivery
    const delivery = await db.delivery.create({
      data: {
        name,
        desc: desc || '',
        cost: parseFloat(cost),
        PaymentStatus: PaymentStatus || 'Not Paid',
        withdrawStatus: 'no',
        clientId
      }
    });

    console.log('Delivery created successfully:', delivery.id);

    // Create file records if files are provided
    let fileRecords = [];
    if (files && files.length > 0) {
      fileRecords = await Promise.all(
        files.map(file => 
          db.file.create({
            data: {
              name: file.name,
              url: file.url,
              deliveryId: delivery.id
            }
          })
        )
      );
      console.log(`Created ${fileRecords.length} file records`);
    }

    // Get the complete delivery with files
    const completeDelivery = await db.delivery.findUnique({
      where: { id: delivery.id },
      include: { files: true }
    });

    return NextResponse.json({ 
      success: true, 
      delivery: completeDelivery
    });

  } catch (error) {
    console.error('Delivery creation error:', error);
    
    return NextResponse.json({ 
      success: false, 
      error: error.message,
      stack: error.stack // Added for debugging, remove in production
    }, { status: 500 });
  }
}