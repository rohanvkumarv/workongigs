// File: /app/api/get-withdrawal-history/route.ts
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
    
    // Get all withdrawals for this freelancer
    const withdrawals = await db.withdrawal.findMany({
      where: {
        freelancerId
      },
      orderBy: {
        createdAt: 'desc'
      }
    });
    
    // For each withdrawal, fetch the associated deliveries info
    const withdrawalHistory = await Promise.all(
      withdrawals.map(async (withdrawal) => {
        // Get the deliveries using the IDs stored in the array
        const deliveries = await db.delivery.findMany({
          where: {
            id: { in: withdrawal.deliveryIds }
          },
          select: {
            id: true,
            name: true,
            cost: true,
            client: {
              select: {
                id: true,
                name: true
              }
            }
          }
        });
        
        return {
          ...withdrawal,
          deliveries
        };
      })
    );
    
    return NextResponse.json({
      withdrawalHistory
    });
  } catch (error) {
    console.error('Error fetching withdrawal history:', error);
    return NextResponse.json(
      { message: 'Internal server error', error: (error as Error).message },
      { status: 500 }
    );
  }
}