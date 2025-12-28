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
    
    // Get all withdrawals with filtering, including banking info
    const withdrawals = await db.withdrawal.findMany({
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
            profileImage: true,
            mobile: true,
            bankAccountNumber: true,
            bankName: true,
            ifscCode: true,
            bankEmail: true,
            walletBalance: true,
            totalEarnings: true,
            totalWithdrawn: true
          }
        }
      }
    });

    // Convert BigInt mobile to string
    const withdrawalsWithFormattedData = withdrawals.map(w => ({
      ...w,
      freelancer: {
        ...w.freelancer,
        mobile: w.freelancer.mobile?.toString()
      }
    }));

    return NextResponse.json({
      withdrawals: withdrawalsWithFormattedData
    });
  } catch (error) {
    console.error('Error fetching admin withdrawals:', error);
    return NextResponse.json(
      { message: 'Internal server error', error: (error as Error).message },
      { status: 500 }
    );
  }
}