// File: /app/api/request-withdrawal/route.ts
import { NextResponse } from 'next/server';
import { db } from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { freelancerId, amount } = body;

    if (!freelancerId || !amount || amount <= 0) {
      return NextResponse.json(
        { message: 'Invalid withdrawal request. Amount must be greater than 0.' },
        { status: 400 }
      );
    }

    // Get freelancer wallet balance
    const freelancer = await db.freelancer.findUnique({
      where: { id: freelancerId },
      select: {
        walletBalance: true,
        bankAccountNumber: true,
        bankName: true,
        ifscCode: true
      }
    });

    if (!freelancer) {
      return NextResponse.json(
        { message: 'Freelancer not found' },
        { status: 404 }
      );
    }

    // Check if freelancer has banking information
    if (!freelancer.bankAccountNumber || !freelancer.bankName || !freelancer.ifscCode) {
      return NextResponse.json(
        { message: 'Please add your banking information in your profile before requesting withdrawal' },
        { status: 400 }
      );
    }

    // Verify amount <= wallet balance
    if (amount > freelancer.walletBalance) {
      return NextResponse.json(
        { message: `Insufficient wallet balance. Available: ₹${freelancer.walletBalance}` },
        { status: 400 }
      );
    }

    const balanceBefore = freelancer.walletBalance;
    const balanceAfter = balanceBefore - amount;

    // Create withdrawal record with pending status
    const withdrawal = await db.withdrawal.create({
      data: {
        amount,
        status: 'pending',
        freelancerId,
        walletBalanceBefore: balanceBefore,
        walletBalanceAfter: balanceAfter
      }
    });

    // Deduct amount from wallet (hold in pending)
    await db.freelancer.update({
      where: { id: freelancerId },
      data: {
        walletBalance: balanceAfter
      }
    });

    // Create wallet transaction record (pending)
    await db.walletTransaction.create({
      data: {
        freelancerId,
        type: 'DEBIT',
        amount,
        description: `Withdrawal request #${withdrawal.id.slice(-8)}`,
        referenceId: withdrawal.id,
        balanceBefore,
        balanceAfter,
        status: 'pending'
      }
    });

    return NextResponse.json({
      success: true,
      withdrawal,
      message: 'Withdrawal request submitted successfully'
    });
  } catch (error) {
    console.error('Error processing withdrawal request:', error);
    return NextResponse.json(
      { message: 'Internal server error', error: (error as Error).message },
      { status: 500 }
    );
  }
}