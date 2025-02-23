// app/api/send-single-reminder/route.ts
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { db } from '@/lib/prisma';

// Create nodemailer transporter
// const transporter = nodemailer.createTransport({
//   host: process.env.SMTP_HOST,
//   port: Number(process.env.SMTP_PORT),
//   secure: true,
//   auth: {
//     user: process.env.SMTP_USER,
//     pass: process.env.SMTP_PASS,
//   },
// });
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER, // Your Gmail address (e.g., 'yourname@gmail.com')
        pass: process.env.EMAIL_PASS // Your 16-character Google App Password
    }
  });

export async function POST(request: Request) {
  try {
    const { deliveryId, clientId } = await request.json();

    // Get delivery and client details
    const delivery = await db.delivery.findUnique({
      where: { 
        id: deliveryId,
        PaymentStatus: 'Not Paid' // Ensure it's still unpaid
      },
      include: {
        client: true,
      },
    });

    if (!delivery) {
      return NextResponse.json(
        { error: 'Delivery not found or already paid' },
        { status: 404 }
      );
    }

    // // Check if we've sent too many reminders recently
    // const recentReminders = await db.paymentReminder.count({
    //   where: {
    //     deliveryId,
    //     sentAt: {
    //       gte: new Date(Date.now() - 24 * 60 * 60 * 1000) // Last 24 hours
    //     }
    //   }
    // });

    // if (recentReminders >= 3) {
    //   return NextResponse.json(
    //     { error: 'Too many reminders sent recently' },
    //     { status: 429 }
    //   );
    // }

    const mailOptions = {
      from: process.env.SMTP_FROM,
      to: delivery.client.email,
      subject: `Payment Reminder: ${delivery.name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">Payment Reminder</h2>
          <p>Dear ${delivery.client.name},</p>
          <p>This is a reminder about the pending payment for your delivery:</p>
          <div style="background: #f5f5f5; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <p><strong>Delivery Name:</strong> ${delivery.name}</p>
            <p><strong>Amount Due:</strong> $${delivery.cost}</p>
            <p><strong>Due Date:</strong> ${new Date(delivery.createdAt).toLocaleDateString()}</p>
          </div>
          <p>To complete your payment, please click the button below:</p>
          <p><a href="${process.env.NEXT_PUBLIC_APP_URL}/preview/${delivery.id}" 
                style="background: #007bff; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block; margin: 20px 0;">
                View Delivery and Pay
             </a></p>
          <p>If you've already made the payment, please disregard this reminder.</p>
          <p style="margin-top: 20px;">Thank you for your business!</p>
          <hr style="margin: 20px 0;" />
          <p style="color: #666; font-size: 12px;">
            This is an automated reminder. If you have any questions, please contact us directly.
          </p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    // Log the reminder in the database
    // await db.paymentReminder.create({
    //   data: {
    //     deliveryId: delivery.id,
    //     clientId: delivery.client.id,
    //     type: 'single',
    //     sentAt: new Date(),
    //   }
    // });

    return NextResponse.json({ 
      message: 'Reminder sent successfully',
      deliveryId,
      clientEmail: delivery.client.email 
    });

  } catch (error) {
    console.error('Error sending reminder:', error);
    return NextResponse.json(
      { error: 'Failed to send reminder' },
      { status: 500 }
    );
  }
}