// app/api/send-bulk-reminder/route.ts
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { db } from '@/lib/prisma';

// // Create nodemailer transporter
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
    const { unpaidDeliveries } = await request.json();

    // Fetch fresh data from database to ensure accuracy
    const deliveries = await db.delivery.findMany({
      where: {
        id: {
          in: unpaidDeliveries.map(d => d.id)
        },
        PaymentStatus: 'Not Paid'
      },
      include: {
        client: true
      }
    });

    // Send emails to all clients with unpaid deliveries
    const emailPromises = deliveries.map(async (delivery) => {
      const mailOptions = {
        from: process.env.SMTP_FROM,
        to: delivery.client.email,
        subject: 'Payment Reminder for Your Delivery',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #333;">Payment Reminder</h2>
            <p>Dear ${delivery.client.name},</p>
            <p>This is a friendly reminder about the pending payment for your delivery:</p>
            <div style="background: #f5f5f5; padding: 15px; border-radius: 5px; margin: 20px 0;">
              <p><strong>Delivery Name:</strong> ${delivery.name}</p>
              <p><strong>Amount Due:</strong> ₹${delivery.cost}</p>
              <p><strong>Due Date:</strong> ${new Date(delivery.createdAt).toLocaleDateString()}</p>
            </div>
            <p>Please click the link below to view the delivery and complete the payment:</p>
            <p><a href="https://workongigs.com/preview/${delivery.id}" 
                  style="background: #007bff; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">
                  View Delivery and Pay
               </a></p>
            <p style="margin-top: 20px;">Thank you for your business!</p>
            <hr style="margin: 20px 0;" />
            <p style="color: #666; font-size: 12px;">This is an automated reminder. Please do not reply to this email.</p>
          </div>
        `,
      };

      await transporter.sendMail(mailOptions);

      // Log the reminder in the database
    //   await db.paymentReminder.create({
    //     data: {
    //       deliveryId: delivery.id,
    //       clientId: delivery.client.id,
    //       type: 'bulk',
    //       sentAt: new Date(),
    //     }
    //   });
    });

    await Promise.all(emailPromises);

    return NextResponse.json({ 
      message: 'Reminders sent successfully',
      count: deliveries.length 
    });

  } catch (error) {
    console.error('Error sending reminders:', error);
    return NextResponse.json(
      { error: 'Failed to send reminders' },
      { status: 500 }
    );
  }
}