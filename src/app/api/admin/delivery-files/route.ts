// app/api/admin/delivery-files/route.ts
import { NextResponse } from 'next/server';
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
    // Parse delivery ID from query parameters
    const { searchParams } = new URL(request.url);
    const deliveryId = searchParams.get('deliveryId');
    
    if (!deliveryId) {
      return NextResponse.json(
        { error: 'Delivery ID is required' },
        { status: 400 }
      );
    }
    
    // Fetch all files for the specified delivery
    const files = await db.file.findMany({
      where: {
        deliveryId: deliveryId
      },
      orderBy: {
        createdAt: 'desc'
      }
    });
    
    // Serialize the response data to handle BigInt values
    const serializedFiles = serializeData(files);
    
    return NextResponse.json({ files: serializedFiles });
  } catch (error) {
    console.error('Error fetching delivery files:', error);
    return NextResponse.json(
      { error: 'Failed to fetch delivery files' },
      { status: 500 }
    );
  }
}