// // app/api/update-delivery/route.js
// import { NextResponse } from 'next/server';
// import { db } from '@/lib/prisma';

// export async function PUT(request) {
//   try {
//     const body = await request.json();
//     const { 
//       deliveryId, 
//       name, 
//       desc, 
//       cost,
//       paymentStatus, 
//       files // Optional - new files to add
//     } = body;

//     if (!deliveryId) {
//       return NextResponse.json(
//         { error: 'Delivery ID is required' },
//         { status: 400 }
//       );
//     }

//     // First, get the delivery to verify it exists
//     const existingDelivery = await db.delivery.findUnique({
//       where: { id: deliveryId },
//       include: { files: true, client: true }
//     });

//     if (!existingDelivery) {
//       return NextResponse.json(
//         { error: 'Delivery not found' },
//         { status: 404 }
//       );
//     }

//     // Prepare update data
//     const updateData = {};
//     if (name !== undefined) updateData.name = name;
//     if (desc !== undefined) updateData.desc = desc;
//     if (cost !== undefined) updateData.cost = parseFloat(cost);
//     if (paymentStatus !== undefined) updateData.PaymentStatus = paymentStatus;

//     // Update the delivery
//     const updatedDelivery = await db.delivery.update({
//       where: { id: deliveryId },
//       data: updateData,
//       include: {
//         files: true,
//         client: true
//       }
//     });

//     // Handle file additions if provided
//     if (files && files.length > 0) {
//       // Create new file records associated with this delivery
//       const filePromises = files.map(file => 
//         db.file.create({
//           data: {
//             name: file.name,
//             url: file.url,
//             deliveryId: deliveryId
//           }
//         })
//       );
      
//       await Promise.all(filePromises);

//       // Refetch the delivery with the new files
//       const deliveryWithNewFiles = await db.delivery.findUnique({
//         where: { id: deliveryId },
//         include: {
//           files: true,
//           client: true
//         }
//       });

//       return NextResponse.json({ 
//         success: true, 
//         message: 'Delivery updated successfully',
//         delivery: deliveryWithNewFiles
//       });
//     }

//     return NextResponse.json({ 
//       success: true, 
//       message: 'Delivery updated successfully',
//       delivery: updatedDelivery
//     });

//   } catch (error) {
//     console.error('Error updating delivery:', error);
//     return NextResponse.json(
//       { 
//         success: false, 
//         error: 'Failed to update delivery',
//         details: error.message 
//       },
//       { status: 500 }
//     );
//   }
// }
// app/api/update-delivery/route.ts
import { NextResponse } from 'next/server';
import { db } from '@/lib/prisma';

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { 
      deliveryId, 
      name, 
      desc, 
      cost,
      paymentStatus, 
      files
    } = body;

    if (!deliveryId) {
      return NextResponse.json(
        { success: false, error: 'Delivery ID is required' },
        { status: 400 }
      );
    }

    // First, get the delivery to verify it exists
    const existingDelivery = await db.delivery.findUnique({
      where: { id: deliveryId },
      include: { files: true, client: true }
    });

    if (!existingDelivery) {
      return NextResponse.json(
        { success: false, error: 'Delivery not found' },
        { status: 404 }
      );
    }

    // Prepare update data
    const updateData: any = {};
    if (name !== undefined) updateData.name = name;
    if (desc !== undefined) updateData.desc = desc;
    if (cost !== undefined) updateData.cost = parseFloat(cost.toString());
    if (paymentStatus !== undefined) updateData.PaymentStatus = paymentStatus;

    // Update the delivery
    const updatedDelivery = await db.delivery.update({
      where: { id: deliveryId },
      data: updateData,
      include: {
        files: true,
        client: true
      }
    });

    // Handle file additions if provided
    if (files && files.length > 0) {
      // Create new file records associated with this delivery
      const filePromises = files.map((file: any) => 
        db.file.create({
          data: {
            name: file.name,
            url: file.url,
            deliveryId: deliveryId
          }
        })
      );
      
      await Promise.all(filePromises);

      // Refetch the delivery with the new files
      const deliveryWithNewFiles = await db.delivery.findUnique({
        where: { id: deliveryId },
        include: {
          files: true,
          client: true
        }
      });

      return NextResponse.json({ 
        success: true, 
        message: 'Delivery updated successfully',
        delivery: deliveryWithNewFiles
      });
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Delivery updated successfully',
      delivery: updatedDelivery
    });

  } catch (error) {
    console.error('Error updating delivery:', error);
    
    // Ensure we always return an object, not null
    return NextResponse.json({
      success: false, 
      error: 'Failed to update delivery',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { 
      status: 500 
    });
  }
}