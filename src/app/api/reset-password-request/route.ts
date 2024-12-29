// import { NextRequest, NextResponse } from 'next/server';
// // import prisma from '@/lib/prisma';  // Assuming prisma is set up in lib/prisma.ts
// import crypto from 'crypto';
// // import nodemailer from 'nodemailer';

// const transporter = nodemailer.createTransport({
//   service: 'gmail', // or any other email service you prefer
//   auth: {
//     user: "rohanvkumarv@gmail.com", // Your email
//     pass: "", // Your email password
//   },
// });

// async function sendResetEmail(email: string, token: string) {
//   // Adjust the reset URL to match the new dynamic route structure
//   const resetUrl = `dreamlegal.in/sign-in/reset-password/${token}`;

//   await transporter.sendMail({
//     from: "rohanvkumarv@gmail.com",
//     to: email,
//     subject: 'Password Reset Request',
//     html: `<p>Click the following link to reset your password:</p><a href="${resetUrl}">${resetUrl}</a>`,
//   });
// }



// export async function POST(req: NextRequest) {
//   const { email } = await req.json();

//   if (!email) {
//     return NextResponse.json({ message: 'Email is required' }, { status: 400 });
//   }

//   const user = await prisma.user.findUnique({ where: { email } });

//   if (!user) {
//     return NextResponse.json({ message: 'User not found' }, { status: 404 });
//   }

//   // Generate a secure reset token
//   const token = crypto.randomBytes(32).toString('hex');

//   // Store the token and expiration in the PasswordReset model
//   await prisma.passwordReset.create({
//     data: {
//       userId: user.id,
//       token,
//       tokenExpiration: new Date(Date.now() + 3600000), // 1 hour expiration
//     },
//   });

//   // Send the reset email
//   await sendResetEmail(email, token);

//   return NextResponse.json({ message: 'Password reset email sent' }, { status: 200 });
// }


// app/api/reset-password-request/route.js
import { NextResponse } from 'next/server';

import { db } from '@/lib/prisma';
import nodemailer from 'nodemailer';
import crypto from 'crypto';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export async function POST(request) {
  try {
    const { email } = await request.json();

    // Find user
    const user = await db.freelancer.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json(
        { error: 'No account found with this email' },
        { status: 404 }
      );
    }

    // Generate simple reset token
    const resetToken = crypto.randomBytes(32).toString('hex');

    // Delete any existing reset tokens for this user
    await db.passwordReset.deleteMany({
      where: {
        userId: user.id,
      },
    });

    // Create new password reset entry
    await db.passwordReset.create({
      data: {
        userId: user.id,
        token: resetToken,
        tokenExpiration: new Date(Date.now() + 3600000), // 1 hour from now
      },
    });

    // Send reset email
    const resetUrl = `https://workongigs.com/auth/freelancer/reset-password/${resetToken}`;
    
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Password Reset Request',
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h2>Reset Your Password</h2>
          <p>Click the link below to reset your password:</p>
          <a href="${resetUrl}">${resetUrl}</a>
          <p>This link will expire in 1 hour.</p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Reset password request error:', error);
    return NextResponse.json(
      { error: 'Failed to send reset email' },
      { status: 500 }
    );
  }
}
