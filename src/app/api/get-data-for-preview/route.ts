
// app/api/get-data-for-preview/route.js
import { db } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    // Parse request body safely
    const body = await request.json().catch(() => ({}));
    const clientId = body?.clientId;
    
    if (!clientId) {
      return NextResponse.json(
        { error: 'Project ID is required' }, 
        { status: 400 }
      );
    }

    const client = await db.client.findUnique({
      where: {
        id: clientId
      },
      select: {
        id: true,
        name: true,
        modeOfPay: true,
        status: true,
        deliveries: {
          select: {
            id: true,
            name: true,
            desc: true,
            cost: true,
            PaymentStatus: true,
            files: {
              select: {
                id: true,
                name: true,
                url: true
              }
            }
          }
        }
      }
    });

    if (!client) {
      return NextResponse.json(
        { error: 'Project not found' }, 
        { status: 404 }
      );
    }

    // Transform data to match frontend expectations
    const transformedClient = {
      ...client,
      deliveries: client.deliveries.map(delivery => ({
        ...delivery,
        paymentStatus: delivery.PaymentStatus, // Normalize the field name
        files: delivery.files.map(file => ({
          id: file.id,
          name: file.name,
          url: file.url
        }))
      }))
    };

    return NextResponse.json({ 
      client: transformedClient 
    });

  } catch (error) {
    console.error('Error fetching project:', error);
    
    return NextResponse.json(
      { error: 'Failed to fetch project data' }, 
      { status: 500 }
    );
  }
}