import { NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { freelancerId, bankAccountNumber, bankName, ifscCode, bankEmail } = body;

    if (!freelancerId) {
      return NextResponse.json(
        { error: "Freelancer ID is required" },
        { status: 400 }
      );
    }

    // Validate IFSC code format (11 characters)
    if (ifscCode && ifscCode.length !== 11) {
      return NextResponse.json(
        { error: "IFSC code must be 11 characters" },
        { status: 400 }
      );
    }

    // Update freelancer banking info
    const updatedFreelancer = await prisma.freelancer.update({
      where: { id: freelancerId },
      data: {
        bankAccountNumber,
        bankName,
        ifscCode,
        bankEmail
      },
      select: {
        id: true,
        bankAccountNumber: true,
        bankName: true,
        ifscCode: true,
        bankEmail: true
      }
    });

    return NextResponse.json({
      success: true,
      message: "Banking information updated successfully",
      bankingInfo: updatedFreelancer
    });
  } catch (error) {
    console.error("Error updating banking info:", error);
    return NextResponse.json(
      { error: "Failed to update banking information" },
      { status: 500 }
    );
  }
}
