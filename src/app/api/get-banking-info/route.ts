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

    // Get freelancer banking info
    const freelancer = await prisma.freelancer.findUnique({
      where: { id: freelancerId },
      select: {
        bankAccountNumber: true,
        bankName: true,
        ifscCode: true,
        bankEmail: true
      }
    });

    if (!freelancer) {
      return NextResponse.json(
        { error: "Freelancer not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      bankingInfo: freelancer
    });
  } catch (error) {
    console.error("Error fetching banking info:", error);
    return NextResponse.json(
      { error: "Failed to fetch banking information" },
      { status: 500 }
    );
  }
}
