// app/api/onboard/quick-start/route.js
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { db } from '@/lib/prisma';
import bcrypt from 'bcryptjs';

export async function POST(request) {
  try {
    const body = await request.json();
    const { 
      email, 
      password, 
      clientName,
      deliveryName,
      deliveryDesc,
      deliveryCost,
      files 
    } = body;

    // Validate required fields
    if (!email || !password || !clientName || !deliveryName || !deliveryCost) {
      return NextResponse.json({ 
        success: false, 
        error: 'Missing required fields' 
      }, { status: 400 });
    }

    // Check if user already exists
    const existingUser = await db.freelancer.findUnique({
      where: { email }
    });

    if (existingUser) {
      return NextResponse.json({ 
        success: false, 
        error: 'Email already registered. Please login instead.' 
      }, { status: 400 });
    }

    // Create everything in a transaction
    const result = await db.$transaction(async (tx) => {
      // 1. Create freelancer
      const freelancer = await tx.freelancer.create({
        data: {
          email,
          password: await bcrypt.hash(password, 10),
        },
      });

      // 2. Create client
      const client = await tx.client.create({
        data: {
          name: clientName,
          modeOfPay: 'Direct Payment',
          status: 'Active',
          freelancerId: freelancer.id
        }
      });

      // 3. Create delivery
      const delivery = await tx.delivery.create({
        data: {
          name: deliveryName,
          desc: deliveryDesc || '',
          cost: parseFloat(deliveryCost),
          PaymentStatus: 'Not Paid',
          withdrawStatus: 'no',
          clientId: client.id
        }
      });

      // 4. Create file records if files are provided
      if (files && files.length > 0) {
        await Promise.all(
          files.map(file => 
            tx.file.create({
              data: {
                name: file.name,
                url: file.url,
                deliveryId: delivery.id
              }
            })
          )
        );
      }

      return { freelancer, client, delivery };
    });

    // Set authentication cookie
    const cookieStore = await cookies();
    cookieStore.set('freelancerId', JSON.stringify({
      id: result.freelancer.id,
      email: result.freelancer.email
    }), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 30, // 30 days
      path: '/',
    });

    return NextResponse.json({ 
      success: true,
      data: {
        freelancerId: result.freelancer.id,
        clientId: result.client.id,
        deliveryId: result.delivery.id,
        deliveryName: result.delivery.name
      }
    });

  } catch (error) {
    console.error('Quick onboard error:', error);
    
    return NextResponse.json({ 
      success: false, 
      error: 'Failed to create account. Please try again.',
      details: error.message
    }, { status: 500 });
  }
}