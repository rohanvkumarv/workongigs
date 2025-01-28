// app/api/freelancer/get-details/route.js
import { db } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { freelancerId } = await request.json();

    if (!freelancerId) {
      return NextResponse.json(
        { error: 'Freelancer ID is required' },
        { status: 400 }
      );
    }

    const freelancer = await db.freelancer.findUnique({
      where: { id: freelancerId },
      select: {
        name: true,
        email: true,
        mobile: true,
        city: true,
        country: true,
        pincode: true,
        profession: true,
      },
    });

    if (!freelancer) {
      return NextResponse.json(
        { error: 'Freelancer not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(freelancer);
  } catch (error) {
    console.error('Error fetching freelancer details:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
