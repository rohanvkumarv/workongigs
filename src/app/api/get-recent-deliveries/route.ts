import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/prisma";

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
    const totalCount = await db.delivery.count({
      where: {
        client: {
          freelancerId
        }
      }
    });

    // Get deliveries with pagination
    const deliveries = await db.delivery.findMany({
      where: {
        client: {
          freelancerId
        }
      },
      include: {
        client: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true
          }
        },
        files: {
          select: {
            id: true,
            name: true,
            url: true
          }
        }
      },
      orderBy: {
        createdAt: "desc"
      },
      skip,
      take: limit
    });

    return NextResponse.json({
      success: true,
      deliveries,
      totalCount,
      currentPage: page,
      totalPages: Math.ceil(totalCount / limit)
    });
  } catch (error) {
    console.error("Error fetching recent deliveries:", error);
    return NextResponse.json(
      { error: "Failed to fetch recent deliveries" },
      { status: 500 }
    );
  }
}
