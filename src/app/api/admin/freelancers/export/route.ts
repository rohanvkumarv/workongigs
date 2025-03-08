// app/api/admin/freelancers/export/route.ts
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
    // Fetch all freelancers for export with minimal fields
    const freelancers = await prisma.freelancer.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        mobile: true,
        profession: true,
        city: true,
        country: true,
        username: true,
        createdAt: true,
        updatedAt: true,
        _count: {
          select: {
            clients: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });
    
    // Serialize the data to handle BigInt values
    const serializedFreelancers = serializeData(freelancers);
    
    return NextResponse.json({ freelancers: serializedFreelancers });
  } catch (error) {
    console.error('Error exporting freelancers:', error);
    return NextResponse.json(
      { error: 'Failed to export freelancers' },
      { status: 500 }
    );
  }
}