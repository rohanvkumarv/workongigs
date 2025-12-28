import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const freelancerId = searchParams.get("freelancerId");
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "20");

    if (!freelancerId) {
      return NextResponse.json(
        { error: "Freelancer ID is required" },
        { status: 400 }
      );
    }

    const skip = (page - 1) * limit;

    // Get total count
    const totalCount = await prisma.walletTransaction.count({
      where: { freelancerId },
    });

    // Get transactions
    const transactions = await prisma.walletTransaction.findMany({
      where: { freelancerId },
      orderBy: { createdAt: "desc" },
      skip,
      take: limit,
    });

    return NextResponse.json({
      success: true,
      transactions,
      totalCount,
      currentPage: page,
      totalPages: Math.ceil(totalCount / limit),
    });
  } catch (error) {
    console.error("Error fetching wallet transactions:", error);
    return NextResponse.json(
      { error: "Failed to fetch wallet transactions" },
      { status: 500 }
    );
  }
}
