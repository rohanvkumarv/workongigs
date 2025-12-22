import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import crypto from 'crypto';
import { db } from '@/lib/prisma';

// Create the nodemailer transport
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Utility function to send OTP email
async function sendOtpEmail(email: string, otp: string) {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Your Verification Code',
    html: `
      <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">Verify Your Email</h2>
        <p style="color: #666;">Your verification code is:</p>
        <div style="font-size: 32px; font-weight: bold; letter-spacing: 8px; background: #f5f5f5; padding: 20px; text-align: center; margin: 20px 0; border-radius: 8px;">
          ${otp}
        </div>
        <p style="color: #666;">This code will expire in 10 minutes.</p>
        <p style="color: #999; font-size: 12px; margin-top: 30px;">If you didn't request this code, please ignore this email.</p>
      </div>
    `,
  };
  return transporter.sendMail(mailOptions);
}

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { success: false, error: 'Email is required' },
        { status: 400 }
      );
    }

    // Generate a 6-digit OTP
    const otp = crypto.randomInt(100000, 999999).toString();
    console.log('Generated OTP for', email, ':', otp); // For development - remove in production

    // Hash the OTP before storing
    const hashedOtp = crypto.createHash('sha256').update(otp).digest('hex');

    // Store OTP in database with expiration
    await db.otpVerification.upsert({
      where: { email },
      update: {
        otp: hashedOtp,
        expiresAt: new Date(Date.now() + 10 * 60 * 1000), // 10 minutes expiration
      },
      create: {
        email,
        otp: hashedOtp,
        expiresAt: new Date(Date.now() + 10 * 60 * 1000),
      },
    });

    // Send OTP email
    await sendOtpEmail(email, otp);

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Error sending OTP:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to send OTP' },
      { status: 500 }
    );
  }
}