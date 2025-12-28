import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const freelancerId = searchParams.get("freelancerId");

    if (!freelancerId) {
      return NextResponse.json(
        { error: "Freelancer ID is required" },
        { status: 400 }
      );
    }

    // Get freelancer wallet details
    const freelancer = await prisma.freelancer.findUnique({
      where: { id: freelancerId },
      select: {
        walletBalance: true,
        totalEarnings: true,
        totalWithdrawn: true,
      },
    });

    if (!freelancer) {
      return NextResponse.json(
        { error: "Freelancer not found" },
        { status: 404 }
      );
    }

    // Get pending withdrawals amount
    const pendingWithdrawals = await prisma.withdrawal.aggregate({
      where: {
        freelancerId,
        status: "pending",
      },
      _sum: {
        amount: true,
      },
    });

    return NextResponse.json({
      success: true,
      walletBalance: freelancer.walletBalance,
      totalEarnings: freelancer.totalEarnings,
      totalWithdrawn: freelancer.totalWithdrawn,
      pendingWithdrawals: pendingWithdrawals._sum.amount || 0,
    });
  } catch (error) {
    console.error("Error fetching wallet balance:", error);
    return NextResponse.json(
      { error: "Failed to fetch wallet balance" },
      { status: 500 }
    );
  }
}
