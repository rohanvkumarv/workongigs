
// // app/api/create-project/route.js (move this to a separate file)
// import { db } from '@/lib/prisma';

// export async function POST(req) {
//   try {
//     const {
//       projectName,
//       cost,
//       currency,
//       paymentMode,
//       description,
//       freelancerId,
//       files
//     } = await req.json();
//     console.log(req.json)

//     // Create project
//     const client = await db.client.create({
//       data: {
//         name: projectName,
//         modeOfPay: paymentMode,
//         status: 'ACTIVE',
//         freelancerId,
//       },
//     });

//     // Create instance
//     const delivery = await db.delivery.create({
//       data: {
//         name: 'Delivery1',
//         desc: description || '',
//         cost: parseFloat(cost),
//         PaymentStatus: "Not Paid",
//         clientId: client.id,
//       },
//     });

//     // Create file records
//     const fileRecords = await Promise.all(
//       files.map(file => 
//         db.file.create({
//           data: {
//             name: file.name,
//             url: file.url,
//             deliveryId: delivery.id,
//           },
//         })
//       )
//     );

//     return Response.json({ 
//       success: true, 
//       clientId: client.id,
//       deliveryId: delivery.id,
//       files: fileRecords
//     });

//   } catch (error) {
//     console.error('Project creation error:', error);
//     return Response.json({ 
//       success: false, 
//       error: error.message,
//       details: process.env.NODE_ENV === 'development' ? error.stack : undefined
//     }, { status: 500 });
//   }
// }



// app/api/create-client/route.js
import { db } from '@/lib/prisma';

export async function POST(req) {
  try {
    const {
      client: {
        name,
        phone,
        email,
        modeOfPay,
        status,
        freelancerId
      },
      delivery: {
        name: deliveryName,
        cost,
        currency,
        desc,
        files,
        PaymentStatus
      }
    } = await req.json();

    // Input validation
    if (!name || !modeOfPay || !freelancerId) {
      return Response.json({ 
        success: false, 
        error: 'Missing required client fields' 
      }, { status: 400 });
    }

    if (!deliveryName || !cost || !files || files.length === 0) {
      return Response.json({ 
        success: false, 
        error: 'Missing required delivery fields' 
      }, { status: 400 });
    }

    // Create client with all fields
    const client = await db.client.create({
      data: {
        name,
        phone: phone || null,  // Handle optional fields
        email: email || null,  // Handle optional fields
        modeOfPay,
        status: status || 'ACTIVE',
        freelancerId,
      },
    });

    // Create delivery record
    const delivery = await db.delivery.create({
      data: {
        name: deliveryName,
        desc: desc || '',
        cost: parseFloat(cost),
        PaymentStatus: PaymentStatus || 'Not Paid',
        clientId: client.id,
      },
    });

    // Create file records
    const fileRecords = await Promise.all(
      files.map(file => 
        db.file.create({
          data: {
            name: file.name,
            url: file.url,
            deliveryId: delivery.id,
          },
        })
      )
    );

    // Return success response with created data
    return Response.json({ 
      success: true, 
      client: {
        id: client.id,
        name: client.name,
        phone: client.phone,
        email: client.email,
        status: client.status
      },
      delivery: {
        id: delivery.id,
        name: delivery.name,
        cost: delivery.cost,
        PaymentStatus: delivery.PaymentStatus
      },
      files: fileRecords
    });

  } catch (error) {
    console.error('Client creation error:', error);
    
    // Handle specific database errors
    if (error.code === 'P2002') {
      return Response.json({ 
        success: false, 
        error: 'A client with this information already exists'
      }, { status: 409 });
    }

    // Generic error response
    return Response.json({ 
      success: false, 
      error: error.message,
      details: process.env.NODE_ENV === 'development' ? error.stack : undefined
    }, { status: 500 });
  }
}