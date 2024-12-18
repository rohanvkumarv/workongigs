
// // app/api/verify-otp-and-create-user/route.js
// import { NextResponse } from 'next/server';
// // import db from '@/libs/prisma';
// import { db } from '@/lib/prisma';
// import crypto from 'crypto';
// import bcrypt from 'bcryptjs';

// export async function POST(request) {
//   try {
//     const { email, otp, password } = await request.json();

//     // Hash the provided OTP for comparison
//     const hashedOtp = crypto.createHash('sha256').update(otp).digest('hex');

//     // Get stored OTP details
//     const storedOtp = await db.otpVerification.findUnique({
//       where: { email },
//     });

//     // Verify OTP
//     if (!storedOtp || storedOtp.otp !== hashedOtp || storedOtp.expiresAt < new Date()) {
//       return NextResponse.json(
//         { success: false, error: 'Invalid or expired OTP' },
//         { status: 400 }
//       );
//     }

//     // Hash password
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Create new freelancer
//     const freelancer = await db.freelancer.create({
//       data: {
//         email,
//         password: hashedPassword,
//       },
//     });

//     // Delete used OTP
//     await db.otpVerification.delete({
//       where: { email },
//     });

//     return NextResponse.json({ 
//       success: true, 
//       freelancerId: freelancer.id 
//     });
//   } catch (error) {
//     console.error('Error verifying OTP and creating user:', error);
//     return NextResponse.json(
//       { success: false, error: 'Failed to verify OTP or create user' },
//       { status: 500 }
//     );
//   }
// }

// import { NextResponse } from 'next/server';
// import { db } from '@/lib/prisma';
// import crypto from 'crypto';
// import bcrypt from 'bcryptjs';

// export async function POST(request) {
//   try {
//     // Validate request body
//     if (!request.body) {
//       return NextResponse.json(
//         { success: false, error: 'Missing request body' },
//         { status: 400 }
//       );
//     }

//     const { email, otp, password } = await request.json();

//     // Validate required fields
//     if (!email || !otp || !password) {
//       return NextResponse.json(
//         { success: false, error: 'Missing required fields' },
//         { status: 400 }
//       );
//     }

//     // Hash the provided OTP for comparison
//     const hashedOtp = crypto.createHash('sha256').update(otp).digest('hex');

//     // Get stored OTP details
//     const storedOtp = await db.otpVerification.findUnique({
//       where: { email },
//     });

//     // Verify OTP
//     if (!storedOtp || storedOtp.otp !== hashedOtp || storedOtp.expiresAt < new Date()) {
//       return NextResponse.json(
//         { success: false, error: 'Invalid or expired OTP' },
//         { status: 400 }
//       );
//     }

//     // Hash password
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Create new freelancer
//     const freelancer = await db.freelancer.create({
//       data: {
//         email,
//         password: hashedPassword,
//       },
//     });

//     // Delete used OTP
//     await db.otpVerification.delete({
//       where: { email },
//     });

//     return NextResponse.json({ 
//       success: true, 
//       freelancerId: freelancer.id 
//     });
    
//   } catch (error) {
//     console.error('Error verifying OTP and creating user:', error);
//     return NextResponse.json(
//       { success: false, error: 'Failed to verify OTP or create user' },
//       { status: 500 }
//     ); // Removed extra curly brace here
//   }
// }


import { NextResponse } from 'next/server';
import { db } from '@/lib/prisma';
import crypto from 'crypto';
import bcrypt from 'bcryptjs';

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
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new freelancer
    const freelancer = await db.freelancer.create({
      data: {
        email,
        password: hashedPassword,
      },
    });

    // Delete used OTP
    await db.otpVerification.delete({
      where: { email },
    });

    return NextResponse.json(
      { success: true, freelancerId: freelancer.id }
    );
    
  } catch (error) {
    console.error('Error verifying OTP and creating user:', error);
    // Fixed the syntax of NextResponse.json()
    return NextResponse.json(
      { success: false, error: 'Failed to verify OTP or create user' },
      { status: 500 }
    );
  }
}