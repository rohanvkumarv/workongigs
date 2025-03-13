
// app/api/freelancer/revisions/route.js
import { NextResponse } from 'next/server';
import { db } from '@/lib/prisma';

export async function POST(request) {
  try {
    const { freelancerId } = await request.json();
    
    if (!freelancerId) {
      return NextResponse.json({ error: 'Freelancer ID is required' }, { status: 400 });
    }

    // Get all clients for this freelancer
    const clients = await db.client.findMany({
      where: {
        freelancerId: freelancerId
      },
      select: {
        id: true,
        name: true,
        deliveries: {
          select: {
            id: true,
            name: true
          }
        }
      }
    });

    // Get all deliveryIds
    const deliveryIds = clients.flatMap(client => 
      client.deliveries.map(delivery => delivery.id)
    );

    // Get all revisions for these deliveries
    const revisions = await db.revision.findMany({
      where: {
        deliveryId: {
          in: deliveryIds
        }
      },
      orderBy: {
        createdAt: 'desc'
      },
      include: {
        delivery: {
          select: {
            name: true,
            client: {
              select: {
                name: true
              }
            }
          }
        },
        responses: {
          orderBy: {
            createdAt: 'asc'
          }
        }
      }
    });

    // Format the revisions data for the frontend
    const formattedRevisions = revisions.map(revision => ({
      id: revision.id,
      message: revision.message,
      status: revision.status,
      createdAt: revision.createdAt,
      updatedAt: revision.updatedAt,
      deliveryId: revision.deliveryId,
      deliveryName: revision.delivery.name,
      clientName: revision.delivery.client.name,
      responses: revision.responses || []
    }));

    return NextResponse.json({ revisions: formattedRevisions }, { status: 200 });
  } catch (error) {
    console.error('Error fetching freelancer revisions:', error);
    return NextResponse.json(
      { error: 'Failed to fetch revisions' },
      { status: 500 }
    );
  }
}
