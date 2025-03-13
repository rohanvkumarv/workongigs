
// Create this file as app/api/freelancer/update-revision-status/route.js
import { NextResponse } from 'next/server';
import { db } from '@/lib/prisma';

export async function POST(request) {
  try {
    const { revisionId, status, freelancerId } = await request.json();
    
    if (!revisionId || !status || !freelancerId) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Verify the revision belongs to one of the freelancer's clients
    const revision = await db.revision.findUnique({
      where: {
        id: revisionId
      },
      include: {
        delivery: {
          include: {
            client: true
          }
        }
      }
    });

    if (!revision) {
      return NextResponse.json(
        { error: 'Revision not found' },
        { status: 404 }
      );
    }

    if (revision.delivery.client.freelancerId !== freelancerId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 403 }
      );
    }

    // Update the revision status
    const updatedRevision = await db.revision.update({
      where: {
        id: revisionId
      },
      data: {
        status: status
      }
    });

    return NextResponse.json({ revision: updatedRevision }, { status: 200 });
  } catch (error) {
    console.error('Error updating revision status:', error);
    return NextResponse.json(
      { error: 'Failed to update revision status' },
      { status: 500 }
    );
  }
}
