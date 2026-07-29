import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { db } from '@/lib/prisma';
import crypto from 'crypto';

export async function POST(request: Request) {
  try {
    const { email, otp } = await request.json();

    if (!email || !otp) {
      return NextResponse.json(
        { success: false, error: 'Email and OTP are required' },
        { status: 400 }
      );
    }

    const hashedOtp = crypto.createHash('sha256').update(otp).digest('hex');

    const storedOtp = await db.otpVerification.findUnique({
      where: { email },
    });

    if (!storedOtp || storedOtp.otp !== hashedOtp || storedOtp.expiresAt < new Date()) {
      return NextResponse.json(
        { success: false, error: 'Invalid or expired OTP' },
        { status: 400 }
      );
    }

    await db.otpVerification.delete({
      where: { email },
    });

    let freelancer = await db.freelancer.findUnique({
      where: { email },
    });

    if (!freelancer) {
      freelancer = await db.freelancer.create({
        data: { email },
      });
    }

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
      freelancer: {
        id: freelancer.id,
        email: freelancer.email
      }
    });
  } catch (error) {
    console.error('Error verifying OTP:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to verify OTP' },
      { status: 500 }
    );
  }
}
