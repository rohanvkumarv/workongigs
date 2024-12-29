// // app/api/send-otp/route.js
// import { NextResponse } from 'next/server';
// import nodemailer from 'nodemailer';
// import crypto from 'crypto';
// import { db } from '@/lib/prisma';

// // Create the nodemailer transport
// const transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS,
//   },
// });

// // Utility function to send OTP email
// async function sendOtpEmail(email, otp) {
//   const mailOptions = {
//     from: process.env.EMAIL_USER,
//     to: email,
//     subject: 'Your OTP Code',
//     html: `
//       <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px; margin: 0 auto;">
//         <h2>Verify Your Email</h2>
//         <p>Your OTP code is:</p>
//         <h1 style="font-size: 32px; letter-spacing: 5px; background: #f5f5f5; padding: 10px; text-align: center;">${otp}</h1>
//         <p>This code will expire in 10 minutes.</p>
//       </div>
//     `,
//   };
//   return transporter.sendMail(mailOptions);
// }

// export async function POST(request) {
//   try {
//     const { email } = await request.json();

//     // Generate a 6-digit OTP
//     const otp = crypto.randomInt(100000, 999999).toString();
    
//     // Hash the OTP before storing
//     const hashedOtp = crypto.createHash('sha256').update(otp).digest('hex');

//     // Store OTP in database with expiration
//     await db.otpVerification.upsert({
//       where: { email },
//       update: {
//         otp: hashedOtp,
//         expiresAt: new Date(Date.now() + 10 * 60 * 1000), // 10 minutes expiration
//       },
//       create: {
//         email,
//         otp: hashedOtp,
//         expiresAt: new Date(Date.now() + 10 * 60 * 1000),
//       },
//     });

//     // Send OTP email
//     await sendOtpEmail(email, otp);

//     return NextResponse.json({ success: true });
//   } catch (error) {
//     console.error('Error sending OTP:', error);
//     return NextResponse.json(
//       { success: false, error: 'Failed to send OTP' },
//       { status: 500 }
//     );
//   }
// }
// app/api/send-otp/route.js
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import crypto from 'crypto';
import { db } from '@/lib/prisma';

// Create and verify the nodemailer transport
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  tls: {
    rejectUnauthorized: true
  }
});

// Verify SMTP connection on initialization
const verifyTransporter = async () => {
  try {
    await transporter.verify();
    console.log('SMTP connection established successfully');
  } catch (error) {
    console.error('SMTP connection failed:', {
      code: error.code,
      message: error.message,
      response: error.response
    });
    throw error;
  }
};

// Call verification on initialization
verifyTransporter().catch(console.error);

// Utility function to send OTP email
async function sendOtpEmail(email, otp) {
  const mailOptions = {
    from: {
      name: 'Your App Name', // Customize this
      address: process.env.EMAIL_USER
    },
    to: email,
    subject: 'Your OTP Code',
    html: `
      <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px; margin: 0 auto;">
        <h2>Verify Your Email</h2>
        <p>Your OTP code is:</p>
        <h1 style="font-size: 32px; letter-spacing: 5px; background: #f5f5f5; padding: 10px; text-align: center;">${otp}</h1>
        <p>This code will expire in 10 minutes.</p>
        <p>If you didn't request this code, please ignore this email.</p>
        <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #eee;">
          <p style="font-size: 12px; color: #666;">
            This is an automated message, please do not reply to this email.
          </p>
        </div>
      </div>
    `,
    text: `Your OTP code is: ${otp}\nThis code will expire in 10 minutes.\nIf you didn't request this code, please ignore this email.`,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', info.messageId);
    return info;
  } catch (error) {
    console.error('Email sending failed:', {
      code: error.code,
      message: error.message,
      response: error.response
    });
    throw error;
  }
}

// Utility function to validate email format
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export async function POST(request) {
  try {
    const { email } = await request.json();

    // Validate email
    if (!email || !isValidEmail(email)) {
      return NextResponse.json(
        { success: false, error: 'Invalid email address' },
        { status: 400 }
      );
    }

    // Generate OTP
    const otp = crypto.randomInt(100000, 999999).toString();
    const hashedOtp = crypto.createHash('sha256').update(otp).digest('hex');
    const expirationTime = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    try {
      // Store OTP in database
      await db.otpVerification.upsert({
        where: { email },
        update: {
          otp: hashedOtp,
          expiresAt: expirationTime,
          attempts: 0, // Reset attempts on new OTP
        },
        create: {
          email,
          otp: hashedOtp,
          expiresAt: expirationTime,
          attempts: 0,
        },
      });
    } catch (dbError) {
      console.error('Database operation failed:', dbError);
      return NextResponse.json(
        { success: false, error: 'Failed to store OTP' },
        { status: 500 }
      );
    }

    try {
      // Send OTP email
      await sendOtpEmail(email, otp);
    } catch (emailError) {
      console.error('Failed to send OTP email:', emailError);
      
      // Clean up database entry if email fails
      try {
        await db.otpVerification.delete({
          where: { email },
        });
      } catch (cleanupError) {
        console.error('Failed to clean up OTP record:', cleanupError);
      }

      return NextResponse.json(
        { success: false, error: 'Failed to send OTP email' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'OTP sent successfully',
    });

  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}