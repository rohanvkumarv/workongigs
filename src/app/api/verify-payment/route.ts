
// app/api/verify-payment/route.ts
import crypto from "crypto";
import { db } from "@/lib/prisma";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  const { 
    razorpay_payment_id, 
    razorpay_order_id, 
    razorpay_signature,
    instanceId,
    projectId,
    payAllInstances
  } = await req.json();

  const signature = razorpay_order_id + "|" + razorpay_payment_id;
  
  try {
    const generatedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET!)
      .update(signature.toString())
      .digest('hex');

    if (generatedSignature === razorpay_signature) {
      if (payAllInstances) {
        // Update all unpaid instances to paid
        await db.instance.updateMany({
          where: {
            projectId: projectId,
            PaymentStatus: "Not Paid"
          },
          data: {
            PaymentStatus: "Paid"
          }
        });
      } else {
        // Single instance update
        await db.instance.update({
          where: {
            id: instanceId
          },
          data: {
            PaymentStatus: "Paid"
          }
        });
      }
      
      return new NextResponse(JSON.stringify({ 
        success: true,
        payment_id: razorpay_payment_id 
      }));
    }
    
    return new NextResponse(JSON.stringify({ success: false }));
  } catch (error) {
    console.error("Payment verification error:", error);
    return new NextResponse(JSON.stringify({ 
      success: false, 
      error: error.message 
    }), { status: 500 });
  }
};
