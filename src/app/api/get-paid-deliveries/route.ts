// File: /app/api/get-paid-deliveries/route.ts
import { NextResponse } from 'next/server';
import { db } from '@/lib/prisma';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const freelancerId = searchParams.get('freelancerId');
    
    if (!freelancerId) {
      return NextResponse.json(
        { message: 'Freelancer ID is required' },
        { status: 400 }
      );
    }
    
    // Fetch all paid deliveries that haven't been withdrawn yet
    const paidDeliveries = await db.delivery.findMany({
      where: {
        client: {
          freelancerId: freelancerId
        },
        PaymentStatus: 'Paid',
        withdrawStatus: 'no'
      },
      orderBy: {
        createdAt: 'asc' // Oldest first
      },
      include: {
        client: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      }
    });
    
    return NextResponse.json({
      paidDeliveries
    });
  } catch (error) {
    console.error('Error fetching paid deliveries:', error);
    return NextResponse.json(
      { message: 'Internal server error', error: (error as Error).message },
      { status: 500 }
    );
  }
}