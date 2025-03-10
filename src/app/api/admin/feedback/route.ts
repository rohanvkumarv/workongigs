
// app/api/admin/feedback/route.js
import { NextResponse } from 'next/server';
import { db } from '@/lib/prisma';

// Get all feedback for admin
export async function GET() {
  try {
    const feedback = await db.freelancerFeedback.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        freelancer: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        adminResponses: true,
        statusChanges: true,
      },
    });
    
    return NextResponse.json({ feedback });
  } catch (error) {
    console.error('Error fetching feedback:', error);
    return NextResponse.json({ error: 'Failed to fetch feedback' }, { status: 500 });
  }
}
