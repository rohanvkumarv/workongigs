// app/api/freelancer/update-client/route.js
import { NextResponse } from 'next/server';
import { db } from '@/lib/prisma';

export async function POST(request) {
  try {
    const { clientId, name, email, phone, modeOfPay, status, note, image } = await request.json();

    if (!clientId) {
      return NextResponse.json(
        { error: 'Client ID is required' },
        { status: 400 }
      );
    }

    // Update the client
    const updatedClient = await db.client.update({
      where: {
        id: clientId
      },
      data: {
        name,
        email,
        phone,
        modeOfPay,
        status,
        note,
        image
      },
      include: {
        deliveries: {
          include: {
            files: true
          },
          orderBy: {
            createdAt: 'desc'
          }
        }
      }
    });

    return NextResponse.json({
      message: 'Client updated successfully',
      client: updatedClient
    });
  } catch (error) {
    console.error('Error updating client:', error);
    return NextResponse.json(
      { error: 'Failed to update client', details: error.message },
      { status: 500 }
    );
  }
}