
// app/api/freelancer/add-revision-response/route.js
import { NextResponse } from 'next/server';
import { db } from '@/lib/prisma';

export async function POST(request) {
  try {
    const { revisionId, message, freelancerId } = await request.json();
    
    if (!revisionId || !message || !freelancerId) {
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

    // Create a new response
    const response = await db.revisionResponse.create({
      data: {
        message,
        revision: {
          connect: {
            id: revisionId
          }
        }
      }
    });

    return NextResponse.json({ revisionResponse: response }, { status: 201 });
  } catch (error) {
    console.error('Error adding revision response:', error);
    return NextResponse.json(
      { error: 'Failed to add revision response' },
      { status: 500 }
    );
  }
}