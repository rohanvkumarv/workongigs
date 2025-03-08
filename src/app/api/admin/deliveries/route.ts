// app/api/admin/deliveries/route.ts
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
    // Parse query parameters
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const search = searchParams.get('search') || '';
    const paymentStatus = searchParams.get('paymentStatus') || '';
    
    // Calculate pagination values
    const skip = (page - 1) * limit;
    
    // Build filter conditions
    const whereConditions: any = {};
    
    // Add search filter
    if (search) {
      whereConditions.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { desc: { contains: search, mode: 'insensitive' } },
        { 
          client: {
            name: { contains: search, mode: 'insensitive' }
          }
        },
        {
          client: {
            freelancer: {
              name: { contains: search, mode: 'insensitive' }
            }
          }
        }
      ];
    }
    
    // Add payment status filter
    if (paymentStatus && paymentStatus !== 'all') {
      whereConditions.PaymentStatus = paymentStatus;
    }
    
    // Execute count query for pagination
    const totalDeliveries = await prisma.delivery.count({
      where: whereConditions
    });
    
    // Execute main query with pagination
    const deliveries = await prisma.delivery.findMany({
      where: whereConditions,
      include: {
        client: {
          include: {
            reelancer: true // Include the freelancer (named 'reelancer' in schema)
          }
        },
        _count: {
          select: {
            files: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      },
      skip,
      take: limit
    });
    
    // Format deliveries to include freelancer info properly
    const formattedDeliveries = deliveries.map(delivery => {
      if (delivery.client && delivery.client.reelancer) {
        return {
          ...delivery,
          client: {
            ...delivery.client,
            freelancer: delivery.client.reelancer // Add freelancer property pointing to reelancer
          }
        };
      }
      return delivery;
    });
    
    // Calculate pagination metadata
    const totalPages = Math.ceil(totalDeliveries / limit);
    
    // Prepare response data
    const responseData = {
      deliveries: formattedDeliveries,
      pagination: {
        currentPage: page,
        totalPages,
        totalDeliveries,
        limit
      }
    };
    
    // Serialize the response data to handle BigInt values
    const serializedData = serializeData(responseData);
    
    return NextResponse.json(serializedData);
  } catch (error) {
    console.error('Error fetching deliveries:', error);
    return NextResponse.json(
      { error: 'Failed to fetch deliveries' },
      { status: 500 }
    );
  }
}