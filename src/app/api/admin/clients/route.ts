// app/api/admin/clients/route.ts
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
    const status = searchParams.get('status') || '';
    
    // Calculate pagination values
    const skip = (page - 1) * limit;
    
    // Build filter conditions
    const whereConditions: any = {};
    
    // Add search filter
    if (search) {
      whereConditions.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } },
        { phone: { contains: search } }
      ];
    }
    
    // Add status filter
    if (status && status !== 'all') {
      whereConditions.status = { equals: status, mode: 'insensitive' };
    }
    
    // Execute count query for pagination
    const totalClients = await prisma.client.count({
      where: whereConditions
    });
    
    // Execute main query with pagination
    const clients = await prisma.client.findMany({
      where: whereConditions,
      include: {
        reelancer: {
          select: {
            id: true,
            name: true,
            email: true,
            mobile: true,
            city: true,
            country: true,
            profession: true,
            profileImage: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      },
      skip,
      take: limit
    });
    
    // Map clients to rename reelancer to freelancer
    const formattedClients = clients.map(client => ({
      ...client,
      freelancer: client.reelancer
    }));
    
    // Calculate pagination metadata
    const totalPages = Math.ceil(totalClients / limit);
    
    // Create response data
    const responseData = {
      clients: formattedClients,
      pagination: {
        currentPage: page,
        totalPages,
        totalClients,
        limit
      }
    };
    
    // Serialize the entire response to handle all BigInt values
    const serializedData = serializeData(responseData);
    
    return NextResponse.json(serializedData);
  } catch (error) {
    console.error('Error fetching clients:', error);
    return NextResponse.json(
      { error: 'Failed to fetch clients' },
      { status: 500 }
    );
  }
}