

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

      let totalAmount = 0;
      let freelancerId = "";
      let deliveryNames: string[] = [];

      if (payAllDeliveries) {
        console.log("Updating all unpaid deliveries for client:", clientId);

        // Get all unpaid deliveries with client info
        const unpaidDeliveries = await db.delivery.findMany({
          where: {
            clientId: clientId,
            PaymentStatus: "Not Paid"
          },
          include: {
            client: {
              select: {
                freelancerId: true
              }
            }
          }
        });

        // Calculate total amount
        totalAmount = unpaidDeliveries.reduce((sum, d) => sum + d.cost, 0);
        deliveryNames = unpaidDeliveries.map(d => d.name);
        if (unpaidDeliveries.length > 0) {
          freelancerId = unpaidDeliveries[0].client.freelancerId;
        }

        // Update all to paid
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

        // Get delivery with bundled deliveries if applicable
        const delivery = await db.delivery.findUnique({
          where: { id: deliveryId },
          include: {
            client: {
              select: {
                freelancerId: true
              }
            }
          }
        });

        if (!delivery) {
          throw new Error("Delivery not found");
        }

        freelancerId = delivery.client.freelancerId;
        totalAmount = delivery.cost;
        deliveryNames.push(delivery.name);

        // If delivery includes bundled deliveries, update them too
        if (delivery.includePreviousAmount && delivery.bundledDeliveryIds.length > 0) {
          const bundledDeliveries = await db.delivery.findMany({
            where: {
              id: { in: delivery.bundledDeliveryIds }
            }
          });

          totalAmount += bundledDeliveries.reduce((sum, d) => sum + d.cost, 0);
          deliveryNames.push(...bundledDeliveries.map(d => d.name));

          // Update bundled deliveries to paid
          await db.delivery.updateMany({
            where: {
              id: { in: delivery.bundledDeliveryIds }
            },
            data: {
              PaymentStatus: "Paid"
            }
          });
        }

        // Update main delivery to paid
        await db.delivery.update({
          where: { id: deliveryId },
          data: {
            PaymentStatus: "Paid"
          }
        });
      }

      // Credit wallet and create transaction
      if (freelancerId && totalAmount > 0) {
        // Get current wallet balance
        const freelancer = await db.freelancer.findUnique({
          where: { id: freelancerId },
          select: { walletBalance: true }
        });

        const balanceBefore = freelancer?.walletBalance || 0;
        const balanceAfter = balanceBefore + totalAmount;

        // Update freelancer wallet
        await db.freelancer.update({
          where: { id: freelancerId },
          data: {
            walletBalance: { increment: totalAmount },
            totalEarnings: { increment: totalAmount }
          }
        });

        // Create wallet transaction
        await db.walletTransaction.create({
          data: {
            freelancerId,
            type: "CREDIT",
            amount: totalAmount,
            description: `Payment for: ${deliveryNames.join(", ")}`,
            referenceId: deliveryId || clientId,
            balanceBefore,
            balanceAfter,
            status: "completed"
          }
        });

        console.log(`Wallet credited: ₹${totalAmount} for freelancer ${freelancerId}`);
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