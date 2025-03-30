// File: /app/api/request-withdrawal/route.ts
import { NextResponse } from 'next/server';
import { db } from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { freelancerId, deliveryIds, amount } = body;
    
    if (!freelancerId || !deliveryIds || !deliveryIds.length || !amount || amount <= 0) {
      return NextResponse.json(
        { message: 'Invalid withdrawal request' },
        { status: 400 }
      );
    }
    
    // Verify these deliveries exist and belong to this freelancer
    const deliveries = await db.delivery.findMany({
      where: {
        id: { in: deliveryIds },
        client: {
          freelancerId: freelancerId
        },
        PaymentStatus: 'Paid',
        withdrawStatus: 'no'
      }
    });
    
    if (deliveries.length !== deliveryIds.length) {
      return NextResponse.json(
        { message: 'One or more deliveries are invalid or already withdrawn' },
        { status: 400 }
      );
    }
    
    // Calculate total amount from these deliveries
    const totalAmount = deliveries.reduce((sum, delivery) => sum + delivery.cost, 0);
    
    // Verify amount matches
    if (Math.abs(totalAmount - amount) > 0.01) { // Allow for tiny floating point differences
      return NextResponse.json(
        { message: 'Requested amount does not match selected deliveries' },
        { status: 400 }
      );
    }
    
    // Create a new withdrawal record
    const withdrawal = await db.withdrawal.create({
      data: {
        amount,
        status: 'pending',
        freelancerId,
        deliveryIds: deliveryIds  // This assumes you're using a String[] in the schema
      }
    });
    
    // Update all selected deliveries to have withdrawStatus = "yes"
    await db.delivery.updateMany({
      where: {
        id: { in: deliveryIds }
      },
      data: {
        withdrawStatus: 'yes'
      }
    });
    
    return NextResponse.json({
      success: true,
      withdrawal
    });
  } catch (error) {
    console.error('Error processing withdrawal request:', error);
    return NextResponse.json(
      { message: 'Internal server error', error: (error as Error).message },
      { status: 500 }
    );
  }
}