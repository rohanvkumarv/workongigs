// File: /app/api/admin/update-withdrawal-status/route.ts
import { NextResponse } from 'next/server';
import { db } from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { withdrawalId, status, note } = body;
    
    if (!withdrawalId || !status || !['pending', 'completed', 'rejected'].includes(status)) {
      return NextResponse.json(
        { message: 'Invalid request parameters' },
        { status: 400 }
      );
    }
    
    // Get the withdrawal to access the delivery IDs
    const withdrawal = await db.withdrawal.findUnique({
      where: { id: withdrawalId }
    });
    
    if (!withdrawal) {
      return NextResponse.json(
        { message: 'Withdrawal not found' },
        { status: 404 }
      );
    }
    
    // If rejecting, set deliveries back to withdrawStatus = "no"
    if (status === 'rejected') {
      await db.delivery.updateMany({
        where: {
          id: { in: withdrawal.deliveryIds }
        },
        data: {
          withdrawStatus: 'no'
        }
      });
    }
    
    // Update the withdrawal status
    const updatedWithdrawal = await db.withdrawal.update({
      where: { id: withdrawalId },
      data: { 
        status,
        note: note || undefined
      }
    });
    
    return NextResponse.json({
      success: true,
      withdrawal: updatedWithdrawal
    });
  } catch (error) {
    console.error('Error updating withdrawal status:', error);
    return NextResponse.json(
      { message: 'Internal server error', error: (error as Error).message },
      { status: 500 }
    );
  }
}