// app/api/admin/freelancers/route.ts
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
    const profession = searchParams.get('profession') || '';
    
    // Calculate pagination values
    const skip = (page - 1) * limit;
    
    // Build filter conditions
    const whereConditions: any = {};
    
    // Add search filter
    if (search) {
      whereConditions.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } },
        { username: { contains: search, mode: 'insensitive' } },
        { city: { contains: search, mode: 'insensitive' } },
        { country: { contains: search, mode: 'insensitive' } }
      ];
    }
    
    // Add profession filter
    if (profession && profession !== 'all') {
      whereConditions.profession = { contains: profession, mode: 'insensitive' };
    }
    
    // Execute count query for pagination
    const totalFreelancers = await prisma.freelancer.count({
      where: whereConditions
    });
    
    // Execute main query with pagination and include client count
    const freelancers = await prisma.freelancer.findMany({
      where: whereConditions,
      include: {
        _count: {
          select: {
            clients: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      },
      skip,
      take: limit
    });
    
    // Calculate pagination metadata
    const totalPages = Math.ceil(totalFreelancers / limit);
    
    // Prepare response data
    const responseData = {
      freelancers,
      pagination: {
        currentPage: page,
        totalPages,
        totalFreelancers,
        limit
      }
    };
    
    // Serialize the response data to handle BigInt values
    const serializedData = serializeData(responseData);
    
    return NextResponse.json(serializedData);
  } catch (error) {
    console.error('Error fetching freelancers:', error);
    return NextResponse.json(
      { error: 'Failed to fetch freelancers' },
      { status: 500 }
    );
  }
}