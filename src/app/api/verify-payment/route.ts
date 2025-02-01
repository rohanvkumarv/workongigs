

// API Route: app/api/verify-payment/route.ts
import crypto from "crypto";
import { db } from "@/lib/prisma";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
try {
  const body = await req.json();
  
  const { 
    razorpay_payment_id, 
    razorpay_order_id, 
    razorpay_signature,
    deliveryId,
    clientId,
    payAllDeliveries
  } = body;

  const signature = razorpay_order_id + "|" + razorpay_payment_id;
  
  const generatedSignature = crypto
    .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET!)
    .update(signature.toString())
    .digest('hex');

  if (generatedSignature === razorpay_signature) {
    if (payAllDeliveries) {
      // Update all unpaid deliveries to paid
      await db.delivery.updateMany({
        where: {
          clientId: clientId,
          PaymentStatus: "Not Paid"
        },
        data: {
          PaymentStatus: "Paid"
        }
      });
    } else {
      // Single delivery update
      await db.delivery.update({
        where: {
          id: deliveryId
        },
        data: {
          PaymentStatus: "Paid"
        }
      });
    }
    
    return new NextResponse(JSON.stringify({ 
      success: true,
      payment_id: razorpay_payment_id 
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
  
  return new NextResponse(JSON.stringify({ success: false }), {
    status: 400,
    headers: {
      'Content-Type': 'application/json'
    }
  });
} catch (error) {
  console.error("Payment verification error:", error);
  return new NextResponse(JSON.stringify({ 
    success: false, 
    error: error.message 
  }), { 
    status: 500,
    headers: {
      'Content-Type': 'application/json'
    }
  });
}
};