import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { db } from '@/lib/prisma';
import crypto from 'crypto';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { 
      email, 
      otp,
      clientName,
      deliveryName,
      deliveryCost,
      files 
    } = body;

    // Validate required fields
    if (!email || !otp || !clientName || !deliveryName || !deliveryCost) {
      return NextResponse.json({ 
        success: false, 
        error: 'Missing required fields' 
      }, { status: 400 });
    }

    // Hash the provided OTP for comparison
    const hashedOtp = crypto.createHash('sha256').update(otp).digest('hex');

    // Get stored OTP details
    const storedOtp = await db.otpVerification.findUnique({
      where: { email },
    });

    // Verify OTP
    if (!storedOtp || storedOtp.otp !== hashedOtp) {
      return NextResponse.json(
        { success: false, error: 'Invalid OTP' },
        { status: 400 }
      );
    }

    // Check if OTP is expired
    if (storedOtp.expiresAt < new Date()) {
      return NextResponse.json(
        { success: false, error: 'OTP has expired. Please request a new one.' },
        { status: 400 }
      );
    }

    // Check if user already exists
    let freelancer = await db.freelancer.findUnique({
      where: { email },
    });

    // If user doesn't exist, create new user
    if (!freelancer) {
      freelancer = await db.freelancer.create({
        data: {
          email,
          // No password needed for OTP-based auth
        },
      });
    }

    // Delete the used OTP
    await db.otpVerification.delete({
      where: { email },
    });

    // Create everything in a transaction
    const result = await db.$transaction(async (tx) => {
      // 1. Create client
      const client = await tx.client.create({
        data: {
          name: clientName,
          modeOfPay: 'Direct Payment',
          status: 'Active',
          freelancerId: freelancer.id
        }
      });

      // 2. Create delivery
      const delivery = await tx.delivery.create({
        data: {
          name: deliveryName,
          desc: '',
          cost: parseFloat(deliveryCost),
          PaymentStatus: 'Not Paid',
          withdrawStatus: 'no',
          clientId: client.id
        }
      });

      // 3. Create file records if files are provided
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

      return { client, delivery };
    });

    // Generate delivery preview link
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://workongigs.com';
    const deliveryLink = `${baseUrl}/${result.client.id}/preview?delivery=${result.delivery.id}`;

    // Set authentication cookie
    const cookieStore = await cookies();
    cookieStore.set('freelancerId', JSON.stringify({
      id: freelancer.id,
      email: freelancer.email
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
        freelancerId: freelancer.id,
        clientId: result.client.id,
        deliveryId: result.delivery.id,
        deliveryName: result.delivery.name,
        previewLink: deliveryLink
      }
    });

  } catch (error: any) {
    console.error('Quick start OTP error:', error);
    
    return NextResponse.json({ 
      success: false, 
      error: 'Failed to create delivery. Please try again.',
      details: error.message
    }, { status: 500 });
  }
}