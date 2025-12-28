// File: /app/api/admin/update-withdrawal-status/route.ts
import { NextResponse } from 'next/server';
import { db } from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { withdrawalId, status, note, transactionId, processingMethod } = body;

    if (!withdrawalId || !status || !['pending', 'completed', 'rejected'].includes(status)) {
      return NextResponse.json(
        { message: 'Invalid request parameters' },
        { status: 400 }
      );
    }

    // Get the withdrawal record
    const withdrawal = await db.withdrawal.findUnique({
      where: { id: withdrawalId }
    });

    if (!withdrawal) {
      return NextResponse.json(
        { message: 'Withdrawal not found' },
        { status: 404 }
      );
    }

    if (withdrawal.status !== 'pending') {
      return NextResponse.json(
        { message: 'Withdrawal has already been processed' },
        { status: 400 }
      );
    }

    if (status === 'completed') {
      // Approve withdrawal
      // Update freelancer's total withdrawn amount
      await db.freelancer.update({
        where: { id: withdrawal.freelancerId },
        data: {
          totalWithdrawn: { increment: withdrawal.amount }
        }
      });

      // Update wallet transaction to completed
      await db.walletTransaction.updateMany({
        where: {
          referenceId: withdrawalId,
          type: 'DEBIT',
          status: 'pending'
        },
        data: {
          status: 'completed'
        }
      });

      // Update withdrawal status with processing details
      const updatedWithdrawal = await db.withdrawal.update({
        where: { id: withdrawalId },
        data: {
          status: 'completed',
          note,
          transactionId,
          processingMethod
        }
      });

      return NextResponse.json({
        success: true,
        withdrawal: updatedWithdrawal,
        message: 'Withdrawal approved successfully'
      });

    } else if (status === 'rejected') {
      // Reject withdrawal - refund to wallet
      const refundAmount = withdrawal.amount;

      // Refund to wallet balance
      await db.freelancer.update({
        where: { id: withdrawal.freelancerId },
        data: {
          walletBalance: { increment: refundAmount }
        }
      });

      // Update wallet transaction to failed
      await db.walletTransaction.updateMany({
        where: {
          referenceId: withdrawalId,
          type: 'DEBIT',
          status: 'pending'
        },
        data: {
          status: 'failed'
        }
      });

      // Update withdrawal status
      const updatedWithdrawal = await db.withdrawal.update({
        where: { id: withdrawalId },
        data: {
          status: 'rejected',
          note
        }
      });

      return NextResponse.json({
        success: true,
        withdrawal: updatedWithdrawal,
        message: 'Withdrawal rejected and amount refunded to wallet'
      });
    }

    return NextResponse.json({
      success: false,
      message: 'Invalid status'
    }, { status: 400 });

  } catch (error) {
    console.error('Error updating withdrawal status:', error);
    return NextResponse.json(
      { message: 'Internal server error', error: (error as Error).message },
      { status: 500 }
    );
  }
}