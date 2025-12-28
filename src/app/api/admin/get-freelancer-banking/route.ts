import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/prisma";

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

    // Get freelancer with banking info and wallet details
    const freelancer = await db.freelancer.findUnique({
      where: { id: freelancerId },
      select: {
        id: true,
        name: true,
        email: true,
        mobile: true,
        bankAccountNumber: true,
        bankName: true,
        ifscCode: true,
        bankEmail: true,
        walletBalance: true,
        totalEarnings: true,
        totalWithdrawn: true
      }
    });

    if (!freelancer) {
      return NextResponse.json(
        { error: "Freelancer not found" },
        { status: 404 }
      );
    }

    // Convert mobile BigInt to string
    const freelancerData = {
      ...freelancer,
      mobile: freelancer.mobile?.toString()
    };

    return NextResponse.json({
      success: true,
      freelancer: freelancerData
    });
  } catch (error) {
    console.error("Error fetching freelancer banking info:", error);
    return NextResponse.json(
      { error: "Failed to fetch freelancer information" },
      { status: 500 }
    );
  }
}
