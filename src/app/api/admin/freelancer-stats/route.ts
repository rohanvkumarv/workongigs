// app/api/admin/freelancer-stats/route.ts
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Helper function to handle BigInt serialization
const serializeData = (data) => {
  return JSON.parse(
    JSON.stringify(data, (key, value) => {
      // Convert BigInt to String to make it serializable
      if (typeof value === 'bigint') {
        return value.toString();
      }
      return value;
    })
  );
};

export async function GET(request: Request) {
  try {
    // Parse freelancer ID from query parameters
    const { searchParams } = new URL(request.url);
    const freelancerId = searchParams.get('freelancerId');
    
    if (!freelancerId) {
      return NextResponse.json(
        { error: 'Freelancer ID is required' },
        { status: 400 }
      );
    }
    
    // Count total clients
    const totalClients = await prisma.client.count({
      where: {
        freelancerId: freelancerId
      }
    });
    
    // Get all deliveries for this freelancer's clients
    const deliveries = await prisma.delivery.findMany({
      where: {
        client: {
          freelancerId: freelancerId
        }
      },
      select: {
        id: true,
        cost: true,
        PaymentStatus: true,
        createdAt: true,
        clientId: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    });
    
    // Calculate total deliveries
    const totalDeliveries = deliveries.length;
    
    // Calculate earnings
    let totalEarnings = 0;
    let pendingEarnings = 0;
    
    deliveries.forEach(delivery => {
      if (delivery.PaymentStatus === 'Paid') {
        totalEarnings += delivery.cost;
      } else {
        pendingEarnings += delivery.cost;
      }
    });
    
    // Get last delivery date
    const lastDeliveryDate = deliveries.length > 0 ? deliveries[0].createdAt : null;
    
    // Get last client added date
    const lastClientAdded = await prisma.client.findFirst({
      where: {
        freelancerId: freelancerId
      },
      orderBy: {
        createdAt: 'desc'
      },
      select: {
        createdAt: true
      }
    });
    
    const lastClientDate = lastClientAdded ? lastClientAdded.createdAt : null;
    
    // Prepare stats object
    const stats = {
      totalClients,
      totalDeliveries,
      totalEarnings,
      pendingEarnings,
      lastDeliveryDate,
      lastClientDate
    };
    
    // Serialize the response data to handle BigInt values
    const serializedStats = serializeData(stats);
    
    return NextResponse.json({ stats: serializedStats });
  } catch (error) {
    console.error('Error fetching freelancer stats:', error);
    return NextResponse.json(
      { error: 'Failed to fetch freelancer statistics' },
      { status: 500 }
    );
  }
}