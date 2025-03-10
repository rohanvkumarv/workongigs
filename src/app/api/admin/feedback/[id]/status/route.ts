
// app/api/admin/feedback/[id]/status/route.js
import { NextResponse } from 'next/server';
import { db } from '@/lib/prisma';

// Update feedback status
export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const body = await request.json();
    const { newStatus, adminId } = body;
    
    // Validate required fields
    if (!newStatus || !adminId) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }
    
    // Ensure the feedback exists
    const feedback = await db.freelancerFeedback.findUnique({
      where: { id },
    });
    
    if (!feedback) {
      return NextResponse.json({ error: 'Feedback not found' }, { status: 404 });
    }
    
    // Create status change record
    await db.statusChange.create({
      data: {
        oldStatus: feedback.status,
        newStatus,
        feedbackId: id,
        adminId,
      },
    });
    
    // Update the feedback status
    const updatedFeedback = await db.freelancerFeedback.update({
      where: { id },
      data: {
        status: newStatus,
      },
    });
    
    return NextResponse.json({ success: true, feedback: updatedFeedback });
  } catch (error) {
    console.error('Error updating feedback status:', error);
    return NextResponse.json({ error: 'Failed to update feedback status' }, { status: 500 });
  }
}
