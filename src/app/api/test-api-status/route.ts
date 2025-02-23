// app/api/delivery/updateStatus/route.ts
import { NextResponse } from 'next/server';
import {db} from '@/lib/prisma';

export async function PATCH(request: Request) {
  try {
    const { deliveryId, type } = await request.json();

    if (!deliveryId || !type) {
      return NextResponse.json({ 
        error: 'Delivery ID and update type are required' 
      }, { status: 400 });
    }

    // Check if type is valid
    if (type !== 'payment' && type !== 'withdraw') {
      return NextResponse.json({ 
        error: 'Invalid update type. Must be either "payment" or "withdraw"' 
      }, { status: 400 });
    }

    const updateData = type === 'payment' 
      ? { PaymentStatus: 'Paid' }
      : { withdrawStatus: 'yes' };

    const updatedDelivery = await db.delivery.update({
      where: { id: deliveryId },
      data: updateData,
      include: {
        client: {
          select: {
            name: true,
            email: true
          }
        }
      }
    });

    return NextResponse.json({
      message: `${type === 'payment' ? 'Payment' : 'Withdraw'} status updated successfully`,
      delivery: updatedDelivery
    });

  } catch (error) {
    console.error('Update Status Error:', error);
    return NextResponse.json(
      { error: 'Failed to update status' },
      { status: 500 }
    );
  }
}