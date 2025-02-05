

// // API Route: app/api/verify-payment/route.ts
// import crypto from "crypto";
// import { db } from "@/lib/prisma";
// import { NextResponse } from "next/server";

// export const POST = async (req: Request) => {
// try {
//   const body = await req.json();
  
//   const { 
//     razorpay_payment_id, 
//     razorpay_order_id, 
//     razorpay_signature,
//     deliveryId,
//     clientId,
//     payAllDeliveries
//   } = body;

//   const signature = razorpay_order_id + "|" + razorpay_payment_id;
  
//   const generatedSignature = crypto
//     .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET!)
//     .update(signature.toString())
//     .digest('hex');

//   if (generatedSignature === razorpay_signature) {
//     if (payAllDeliveries) {
//       // Update all unpaid deliveries to paid
//       await db.delivery.updateMany({
//         where: {
//           clientId: clientId,
//           PaymentStatus: "Not Paid"
//         },
//         data: {
//           PaymentStatus: "Paid"
//         }
//       });
//     } else {
//       // Single delivery update
//       await db.delivery.update({
//         where: {
//           id: deliveryId
//         },
//         data: {
//           PaymentStatus: "Paid"
//         }
//       });
//     }
    
//     return new NextResponse(JSON.stringify({ 
//       success: true,
//       payment_id: razorpay_payment_id 
//     }), {
//       status: 200,
//       headers: {
//         'Content-Type': 'application/json'
//       }
//     });
//   }
  
//   return new NextResponse(JSON.stringify({ success: false }), {
//     status: 400,
//     headers: {
//       'Content-Type': 'application/json'
//     }
//   });
// } catch (error) {
//   console.error("Payment verification error:", error);
//   return new NextResponse(JSON.stringify({ 
//     success: false, 
//     error: error.message 
//   }), { 
//     status: 500,
//     headers: {
//       'Content-Type': 'application/json'
//     }
//   });
// }
// };
// app/api/verify-payment/route.ts
import crypto from "crypto";
import { db } from "@/lib/prisma";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  try {
    const body = await req.json();
    
    console.log("Received request body:", body); // Log full request body
    
    const { 
      razorpay_payment_id, 
      razorpay_order_id, 
      razorpay_signature,
      deliveryId,
      clientId,
      payAllDeliveries
    } = body;

    // Log extracted values
    console.log("Extracted values:", {
      razorpay_payment_id,
      razorpay_order_id,
      razorpay_signature,
      deliveryId,
      clientId,
      payAllDeliveries
    });

    const signature = razorpay_order_id + "|" + razorpay_payment_id;
    console.log("Created signature string:", signature);
    
    const generatedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET!)
      .update(signature.toString())
      .digest('hex');

    console.log("Signature comparison:", {
      generated: generatedSignature,
      received: razorpay_signature,
      matches: generatedSignature === razorpay_signature
    });

    if (generatedSignature === razorpay_signature) {
      console.log("Signature verified successfully");
      
      if (payAllDeliveries) {
        console.log("Updating all unpaid deliveries for client:", clientId);
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
        console.log("Updating single delivery:", deliveryId);
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
    
    console.log("Signature verification failed");
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