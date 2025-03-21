// app/api/admin/client-deliveries/route.ts
import { NextResponse } from 'next/server';
// import { PrismaClient } from '@prisma/client';

// const prisma = new PrismaClient();


import { db } from '@/lib/prisma';

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
    // Parse client ID from query parameters
    const { searchParams } = new URL(request.url);
    const clientId = searchParams.get('clientId');
    
    if (!clientId) {
      return NextResponse.json(
        { error: 'Client ID is required' },
        { status: 400 }
      );
    }
    
    // Fetch all deliveries for the specified client
    const deliveries = await db.delivery.findMany({
      where: {
        clientId: clientId
      },
      include: {
        files: true // Include associated files
      },
      orderBy: {
        createdAt: 'desc'
      }
    });
    
    // Serialize the response data to handle any nested BigInt values
    const serializedDeliveries = serializeData(deliveries);
    
    return NextResponse.json({ deliveries: serializedDeliveries });
  } catch (error) {
    console.error('Error fetching client deliveries:', error);
    return NextResponse.json(
      { error: 'Failed to fetch client deliveries' },
      { status: 500 }
    );
  }
}