

// app/api/verify-otp/route.js (Signup)
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { db } from '@/lib/prisma';
import crypto from 'crypto';
import bcrypt from 'bcryptjs';


// app/api/verify-otp/route.js
export async function POST(request) {
  try {
     // Validate request body
     if (!request.body) {
      return NextResponse.json(
        { success: false, error: 'Missing request body' },
        { status: 400 }
      );
    }

    const { email, otp, password } = await request.json();

    // Validate required fields
    if (!email || !otp || !password) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Hash the provided OTP for comparison
    const hashedOtp = crypto.createHash('sha256').update(otp).digest('hex');

    // Get stored OTP details
    const storedOtp = await db.otpVerification.findUnique({
      where: { email },
    });

    // Verify OTP
    if (!storedOtp || storedOtp.otp !== hashedOtp || storedOtp.expiresAt < new Date()) {
      return NextResponse.json(
        { success: false, error: 'Invalid or expired OTP' },
        { status: 400 }
      );
    }

    // Hash password
    // const hashedPassword = await bcrypt.hash(password, 10);
    // ... OTP verification logic ...

    const freelancer = await db.freelancer.create({
      data: {
        email,
        password: await bcrypt.hash(password, 10),
      },
    });

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
    console.error('Error verifying OTP and creating user:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to verify OTP or create user' },
      { status: 500 }
    );
  }
}
