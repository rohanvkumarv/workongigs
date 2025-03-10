// app/api/freelancer-feedback/route.js
import { NextResponse } from 'next/server';
import { db } from '@/lib/prisma';

// Get feedback for a specific freelancer
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const freelancerId = searchParams.get('freelancerId');
    
    if (!freelancerId) {
      return NextResponse.json({ error: 'Freelancer ID is required' }, { status: 400 });
    }
    
    const feedback = await db.freelancerFeedback.findMany({
      where: {
        freelancerId: freelancerId,
      },
      orderBy: {
        createdAt: 'desc',
      },
      include: {
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

// Submit new feedback
export async function POST(request) {
  try {
    const body = await request.json();
    const { freelancerId, type, title, description, priority } = body;
    
    // Validate required fields
    if (!freelancerId || !type || !title || !description) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }
    
    // Ensure the freelancer exists
    const freelancer = await db.freelancer.findUnique({
      where: { id: freelancerId },
    });
    
    if (!freelancer) {
      return NextResponse.json({ error: 'Freelancer not found' }, { status: 404 });
    }
    
    // Create the feedback
    const feedback = await db.freelancerFeedback.create({
      data: {
        type,
        title,
        description,
        priority,
        freelancerId,
        // The default status "pending" is set in the schema
      },
    });
    
    // Create initial status change record
    await db.statusChange.create({
      data: {
        oldStatus: 'none',
        newStatus: 'pending',
        feedbackId: feedback.id,
        adminId: 'system',
      },
    });
    
    return NextResponse.json({ success: true, feedback }, { status: 201 });
  } catch (error) {
    console.error('Error creating feedback:', error);
    return NextResponse.json({ error: 'Failed to create feedback' }, { status: 500 });
  }
}
