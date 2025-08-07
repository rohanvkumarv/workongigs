// app/api/freelancer/search-clients/route.js
import { NextResponse } from 'next/server';
import { db } from '@/lib/prisma';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const freelancerId = searchParams.get('freelancerId');
    const query = searchParams.get('query');

    if (!freelancerId) {
      return NextResponse.json(
        { error: 'Freelancer ID is required' },
        { status: 400 }
      );
    }

    if (!query || query.length < 2) {
      return NextResponse.json({ clients: [] });
    }

    // Search clients by name, phone, or email
    const clients = await db.client.findMany({
      where: {
        freelancerId,
        OR: [
          {
            name: {
              contains: query,
              mode: 'insensitive'
            }
          },
          {
            phone: {
              contains: query
            }
          },
          {
            email: {
              contains: query,
              mode: 'insensitive'
            }
          }
        ]
      },
      select: {
        id: true,
        name: true,
        phone: true,
        email: true,
        image: true,
        modeOfPay: true,
        status: true
      },
      orderBy: {
        name: 'asc'
      },
      take: 10 // Limit results
    });

    return NextResponse.json({ clients });
  } catch (error) {
    console.error('Error searching clients:', error);
    return NextResponse.json(
      { error: 'Failed to search clients', details: error.message },
      { status: 500 }
    );
  }
}