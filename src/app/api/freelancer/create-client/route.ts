

// app/api/freelancer/create-client/route.js
import { NextResponse } from 'next/server';
import { db } from '@/lib/prisma';

export async function POST(request) {
  try {
    const { freelancerId, name, email, phone, modeOfPay, status, note, image } = await request.json();

    if (!freelancerId || !name) {
      return NextResponse.json(
        { error: 'Freelancer ID and client name are required' },
        { status: 400 }
      );
    }

    // Create the client
    const client = await db.client.create({
      data: {
        name,
        email,
        phone,
        modeOfPay,
        status: status || 'Active',
        note,
        image,
        freelancerId
      }
    });

    return NextResponse.json({
      message: 'Client created successfully',
      client
    });
  } catch (error) {
    console.error('Error creating client:', error);
    return NextResponse.json(
      { error: 'Failed to create client', details: error.message },
      { status: 500 }
    );
  }
}