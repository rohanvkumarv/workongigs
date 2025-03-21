// // app/api/get-clients/route.js
// import { NextResponse } from 'next/server';
// import { db } from '@/lib/prisma';

// export async function POST(request) {
//   try {
//     const { freelancerId } = await request.json();

//     if (!freelancerId) {
//       return NextResponse.json(
//         { error: 'Freelancer ID is required' },
//         { status: 400 }
//       );
//     }

//     // Get all clients for the freelancer with their deliveries
//     const clients = await db.client.findMany({
//       where: {
//         freelancerId: freelancerId,
//       },
//       include: {
//         deliveries: {
//           include: {
//             files: true
//           },
//           orderBy: {
//             createdAt: 'desc'
//           }
//         }
//       },
//       orderBy: {
//         updatedAt: 'desc'
//       }
//     });

//     return NextResponse.json(clients);
//   } catch (error) {
//     console.error('Error fetching clients:', error);
//     return NextResponse.json(
//       { error: 'Failed to fetch clients' },
//       { status: 500 }
//     );
//   }
// }
// app/api/freelancer/get-clients/route.js
import { NextResponse } from 'next/server';
import { db } from '@/lib/prisma';

export async function POST(request) {
  try {
    const { freelancerId } = await request.json();

    if (!freelancerId) {
      return NextResponse.json(
        { error: 'Freelancer ID is required' },
        { status: 400 }
      );
    }

    // Check if the freelancer exists
    const freelancer = await db.freelancer.findUnique({
      where: {
        id: freelancerId
      }
    });

    if (!freelancer) {
      return NextResponse.json(
        { error: 'Freelancer not found' },
        { status: 404 }
      );
    }

    // Get all clients for the freelancer with their deliveries
    const clients = await db.client.findMany({
      where: {
        freelancerId: freelancerId,
      },
      include: {
        deliveries: {
          include: {
            files: true
          },
          orderBy: {
            createdAt: 'desc'
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    return NextResponse.json(clients);
  } catch (error) {
    console.error('Error fetching clients:', error);
    return NextResponse.json(
      { error: 'Failed to fetch clients', details: error.message },
      { status: 500 }
    );
  }
}