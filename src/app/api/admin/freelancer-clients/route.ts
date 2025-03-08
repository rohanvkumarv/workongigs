// app/api/admin/freelancer-clients/route.ts
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
    
    // Fetch all clients for the specified freelancer with delivery count
    const clients = await prisma.client.findMany({
      where: {
        freelancerId: freelancerId
      },
      include: {
        _count: {
          select: {
            deliveries: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });
    
    // Serialize the response data to handle BigInt values
    const serializedClients = serializeData(clients);
    
    return NextResponse.json({ clients: serializedClients });
  } catch (error) {
    console.error('Error fetching freelancer clients:', error);
    return NextResponse.json(
      { error: 'Failed to fetch freelancer clients' },
      { status: 500 }
    );
  }
}