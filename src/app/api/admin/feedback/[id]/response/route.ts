
// app/api/admin/feedback/[id]/response/route.js
import { NextResponse } from 'next/server';
import { db } from '@/lib/prisma';

// Add admin response to feedback
export async function POST(request, { params }) {
  try {
    const { id } = params;
    const body = await request.json();
    const { message, adminId } = body;
    
    // Validate required fields
    if (!message || !adminId) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }
    
    // Ensure the feedback exists
    const feedback = await db.freelancerFeedback.findUnique({
      where: { id },
    });
    
    if (!feedback) {
      return NextResponse.json({ error: 'Feedback not found' }, { status: 404 });
    }
    
    // Create admin response
    const response = await db.adminResponse.create({
      data: {
        message,
        feedbackId: id,
        adminId,
      },
    });
    
    return NextResponse.json({ success: true, response }, { status: 201 });
  } catch (error) {
    console.error('Error creating admin response:', error);
    return NextResponse.json({ error: 'Failed to create admin response' }, { status: 500 });
  }
}