// File: /app/api/admin/withdrawals/route.ts
import { NextResponse } from 'next/server';
import { db } from '@/lib/prisma';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status') || 'all';
    
    // Build the where condition based on status filter
    const whereCondition: any = {};
    if (status !== 'all') {
      whereCondition.status = status;
    }
    
    // Get all withdrawals with filtering
    const withdrawalsData = await db.withdrawal.findMany({
      where: whereCondition,
      orderBy: [
        { status: 'asc' }, // Pending first
        { createdAt: 'desc' } // Most recent first
      ],
      include: {
        freelancer: {
          select: {
            id: true,
            name: true,
            email: true,
            profileImage: true
          }
        }
      }
    });
    
    // For each withdrawal, fetch the associated deliveries
    const withdrawals = await Promise.all(
      withdrawalsData.map(async (withdrawal) => {
        // Get the deliveries using the IDs stored in the array
        const deliveries = await db.delivery.findMany({
          where: {
            id: { in: withdrawal.deliveryIds }
          },
          select: {
            id: true,
            name: true,
            cost: true,
            createdAt: true,
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
      withdrawals
    });
  } catch (error) {
    console.error('Error fetching admin withdrawals:', error);
    return NextResponse.json(
      { message: 'Internal server error', error: (error as Error).message },
      { status: 500 }
    );
  }
}