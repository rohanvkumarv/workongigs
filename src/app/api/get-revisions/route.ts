
// // // Create this file as app/api/get-revisions/route.js
// // import { NextResponse } from 'next/server';
// // import {db } from '@/lib/prisma'; // Adjust this import to match your project structure

// // export async function POST(request) {
// //   try {
// //     const { clientId } = await request.json();

// //     if (!clientId) {
// //       return NextResponse.json(
// //         { error: 'Client ID is required' },
// //         { status: 400 }
// //       );
// //     }

// //     // Get all deliveries for this client
// //     const deliveries = await db.delivery.findMany({
// //       where: {
// //         clientId: clientId,
// //       },
// //       select: {
// //         id: true,
// //       },
// //     });

// //     const deliveryIds = deliveries.map(delivery => delivery.id);

// //     // Get all revisions for these deliveries
// //     const revisions = await db.revision.findMany({
// //       where: {
// //         deliveryId: {
// //           in: deliveryIds,
// //         },
// //       },
// //       orderBy: {
// //         createdAt: 'desc',
// //       },
// //     });

// //     return NextResponse.json({ revisions }, { status: 200 });
// //   } catch (error) {
// //     console.error('Error fetching revisions:', error);
// //     return NextResponse.json(
// //       { error: 'Failed to fetch revisions' },
// //       { status: 500 }
// //     );
// //   }
// // }


// // Create this file as app/api/freelancer/add-revision-response/route.js
// import { NextResponse } from 'next/server';
// import { db } from '@/lib/prisma';

// export async function POST(request) {
//   try {
//     const { revisionId, message, freelancerId } = await request.json();
    
//     if (!revisionId || !message || !freelancerId) {
//       return NextResponse.json(
//         { error: 'Missing required fields' },
//         { status: 400 }
//       );
//     }

//     // Verify the revision belongs to one of the freelancer's clients
//     const revision = await db.revision.findUnique({
//       where: {
//         id: revisionId
//       },
//       include: {
//         delivery: {
//           include: {
//             client: true
//           }
//         }
//       }
//     });

//     if (!revision) {
//       return NextResponse.json(
//         { error: 'Revision not found' },
//         { status: 404 }
//       );
//     }

//     if (revision.delivery.client.freelancerId !== freelancerId) {
//       return NextResponse.json(
//         { error: 'Unauthorized' },
//         { status: 403 }
//       );
//     }

//     // Create a new response
//     const response = await db.revisionResponse.create({
//       data: {
//         message,
//         revision: {
//           connect: {
//             id: revisionId
//           }
//         }
//       }
//     });

//     return NextResponse.json({ revisionResponse: response }, { status: 201 });
//   } catch (error) {
//     console.error('Error adding revision response:', error);
//     return NextResponse.json(
//       { error: 'Failed to add revision response' },
//       { status: 500 }
//     );
//   }
// }

// Create this file as app/api/get-revisions/route.js
import { NextResponse } from 'next/server';
import { db } from '@/lib/prisma';

export async function POST(request) {
  try {
    const { clientId } = await request.json();

    if (!clientId) {
      return NextResponse.json(
        { error: 'Client ID is required' },
        { status: 400 }
      );
    }

    // Get all deliveries for this client
    const deliveries = await db.delivery.findMany({
      where: {
        clientId: clientId,
      },
      select: {
        id: true,
      },
    });

    const deliveryIds = deliveries.map(delivery => delivery.id);

    // Get all revisions for these deliveries
    const revisions = await db.revision.findMany({
      where: {
        deliveryId: {
          in: deliveryIds,
        },
      },
      include: {
        responses: {
          orderBy: {
            createdAt: 'asc',
          }
        }
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json({ revisions }, { status: 200 });
  } catch (error) {
    console.error('Error fetching revisions:', error);
    return NextResponse.json(
      { error: 'Failed to fetch revisions' },
      { status: 500 }
    );
  }
}
