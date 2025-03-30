
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

//     // Check if the freelancer exists
//     const freelancer = await db.freelancer.findUnique({
//       where: {
//         id: freelancerId
//       }
//     });

//     if (!freelancer) {
//       return NextResponse.json(
//         { error: 'Freelancer not found' },
//         { status: 404 }
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
//         createdAt: 'desc'
//       }
//     });

//     return NextResponse.json(clients);
//   } catch (error) {
//     console.error('Error fetching clients:', error);
//     return NextResponse.json(
//       { error: 'Failed to fetch clients', details: error.message },
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

    // Get all clients for the freelancer with their deliveries and revisions
    const clients = await db.client.findMany({
      where: {
        freelancerId: freelancerId,
      },
      include: {
        deliveries: {
          include: {
            files: true,
            revisions: {
              where: {
                status: "pending" // Get pending revisions
              }
            }
          },
          orderBy: {
            createdAt: 'desc'
          }
        }
      },
    });

    // Sort clients with the following priorities:
    // 1. Clients with pending revisions first
    // 2. Clients with recent deliveries next
    const sortedClients = clients.sort((a, b) => {
      // Check if client has pending revisions
      const aHasPendingRevisions = a.deliveries.some(d => d.revisions && d.revisions.length > 0);
      const bHasPendingRevisions = b.deliveries.some(d => d.revisions && d.revisions.length > 0);
      
      // Sort by pending revisions first
      if (aHasPendingRevisions && !bHasPendingRevisions) return -1;
      if (!aHasPendingRevisions && bHasPendingRevisions) return 1;
      
      // If both have or don't have revisions, sort by most recent delivery
      const aLatestDelivery = a.deliveries[0]?.createdAt || a.createdAt;
      const bLatestDelivery = b.deliveries[0]?.createdAt || b.createdAt;
      
      return new Date(bLatestDelivery) - new Date(aLatestDelivery);
    });

    return NextResponse.json(sortedClients);
  } catch (error) {
    console.error('Error fetching clients:', error);
    return NextResponse.json(
      { error: 'Failed to fetch clients', details: error.message },
      { status: 500 }
    );
  }
}