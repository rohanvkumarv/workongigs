import { NextRequest, NextResponse } from 'next/server';
// import prisma from '@/lib/prisma';  // Assuming prisma is set up in lib/prisma.ts
import crypto from 'crypto';
// import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail', // or any other email service you prefer
  auth: {
    user: "rohanvkumarv@gmail.com", // Your email
    pass: "", // Your email password
  },
});

async function sendResetEmail(email: string, token: string) {
  // Adjust the reset URL to match the new dynamic route structure
  const resetUrl = `dreamlegal.in/sign-in/reset-password/${token}`;

  await transporter.sendMail({
    from: "rohanvkumarv@gmail.com",
    to: email,
    subject: 'Password Reset Request',
    html: `<p>Click the following link to reset your password:</p><a href="${resetUrl}">${resetUrl}</a>`,
  });
}



export async function POST(req: NextRequest) {
  const { email } = await req.json();

  if (!email) {
    return NextResponse.json({ message: 'Email is required' }, { status: 400 });
  }

  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    return NextResponse.json({ message: 'User not found' }, { status: 404 });
  }

  // Generate a secure reset token
  const token = crypto.randomBytes(32).toString('hex');

  // Store the token and expiration in the PasswordReset model
  await prisma.passwordReset.create({
    data: {
      userId: user.id,
      token,
      tokenExpiration: new Date(Date.now() + 3600000), // 1 hour expiration
    },
  });

  // Send the reset email
  await sendResetEmail(email, token);

  return NextResponse.json({ message: 'Password reset email sent' }, { status: 200 });
}
