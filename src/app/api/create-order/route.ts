// app/api/create-order/route.ts
// import { razorpayInstance } from "@/lib/razorpay";
import { NextResponse } from "next/server";


import Razorpay from "razorpay";

export const razorpayInstance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export const POST = async (req) => {
  const { amount } = await req.json();
  
  const options = {
    amount: amount * 100, // Convert to paise
    currency: "INR",
  };

  try {
    const order = await razorpayInstance.orders.create(options);
    return new NextResponse(JSON.stringify(order));
  } catch (error) {
    return new NextResponse(JSON.stringify({ error: error.message }), { status: 500 });
  }
};

