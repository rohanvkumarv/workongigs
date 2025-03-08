// app/api/admin/deliveries/export/route.ts
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

export async function GET() {
  try {
    // Fetch all deliveries for export
    const deliveries = await prisma.delivery.findMany({
      include: {
        client: {
          select: {
            name: true,
            reelancer: {
              select: {
                id: true,
                name: true,
                email: true,
                profession: true
              }
            }
          }
        },
        files: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    });
    
    // Format deliveries to include freelancer info and rename reelancer to freelancer
    const formattedDeliveries = deliveries.map(delivery => {
      // If delivery has client
      if (delivery.client) {
        // Create a new object with the client's freelancer renamed from reelancer
        return {
          ...delivery,
          client: {
            ...delivery.client,
            freelancer: delivery.client.reelancer
          }
        };
      }
      return delivery;
    });
    
    // Serialize the data to handle BigInt values
    const serializedDeliveries = serializeData(formattedDeliveries);
    
    return NextResponse.json({ deliveries: serializedDeliveries });
  } catch (error) {
    console.error('Error exporting deliveries:', error);
    return NextResponse.json(
      { error: 'Failed to export deliveries' },
      { status: 500 }
    );
  }
}