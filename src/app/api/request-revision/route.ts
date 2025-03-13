// // Create this file as app/api/request-revision/route.js
// import { NextResponse } from 'next/server';
// import {db} from '@/lib/prisma'; // Adjust this import to match your project structure

// export async function POST(request) {
//   try {
//     const { clientId, deliveryId, message } = await request.json();

//     if (!clientId || !deliveryId || !message) {
//       return NextResponse.json(
//         { error: 'Missing required fields' },
//         { status: 400 }
//       );
//     }

//     // Verify the client and delivery exist
//     const delivery = await db.delivery.findUnique({
//       where: {
//         id: deliveryId,
//       },
//       include: {
//         client: true,
//       },
//     });

//     if (!delivery) {
//       return NextResponse.json(
//         { error: 'Delivery not found' },
//         { status: 404 }
//       );
//     }

//     if (delivery.client.id !== clientId) {
//       return NextResponse.json(
//         { error: 'Client does not own this delivery' },
//         { status: 403 }
//       );
//     }

//     // Create the revision
//     const revision = await db.revision.create({
//       data: {
//         message,
//         status: 'pending',
//         delivery: {
//           connect: {
//             id: deliveryId,
//           },
//         },
//       },
//     });

//     return NextResponse.json({ revision }, { status: 201 });
//   } catch (error) {
//     console.error('Error creating revision:', error);
//     return NextResponse.json(
//       { error: 'Failed to create revision' },
//       { status: 500 }
//     );
//   }
// }


// Create this file as app/api/request-revision/route.js
import { NextResponse } from 'next/server';
import { db } from '@/lib/prisma';

export async function POST(request) {
  try {
    const { clientId, deliveryId, message } = await request.json();

    if (!clientId || !deliveryId || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Verify the client and delivery exist
    const delivery = await db.delivery.findUnique({
      where: {
        id: deliveryId,
      },
      include: {
        client: true,
      },
    });

    if (!delivery) {
      return NextResponse.json(
        { error: 'Delivery not found' },
        { status: 404 }
      );
    }

    if (delivery.client.id !== clientId) {
      return NextResponse.json(
        { error: 'Client does not own this delivery' },
        { status: 403 }
      );
    }

    // Create the revision
    const revision = await db.revision.create({
      data: {
        message,
        status: 'pending',
        delivery: {
          connect: {
            id: deliveryId,
          },
        },
      },
    });

    return NextResponse.json({ revision }, { status: 201 });
  } catch (error) {
    console.error('Error creating revision:', error);
    return NextResponse.json(
      { error: 'Failed to create revision' },
      { status: 500 }
    );
  }
}
