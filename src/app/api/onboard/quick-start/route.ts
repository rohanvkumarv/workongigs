// // // app/api/onboard/quick-start/route.js
// // import { NextResponse } from 'next/server';
// // import { cookies } from 'next/headers';
// // import { db } from '@/lib/prisma';
// // import bcrypt from 'bcryptjs';

// // export async function POST(request) {
// //   try {
// //     const body = await request.json();
// //     const { 
// //       email, 
// //       password, 
// //       clientName,
// //       deliveryName,
// //       deliveryDesc,
// //       deliveryCost,
// //       files 
// //     } = body;

// //     // Validate required fields
// //     if (!email || !password || !clientName || !deliveryName || !deliveryCost) {
// //       return NextResponse.json({ 
// //         success: false, 
// //         error: 'Missing required fields' 
// //       }, { status: 400 });
// //     }

// //     // Check if user already exists
// //     const existingUser = await db.freelancer.findUnique({
// //       where: { email }
// //     });

// //     if (existingUser) {
// //       return NextResponse.json({ 
// //         success: false, 
// //         error: 'Email already registered. Please login instead.' 
// //       }, { status: 400 });
// //     }

// //     // Create everything in a transaction
// //     const result = await db.$transaction(async (tx) => {
// //       // 1. Create freelancer
// //       const freelancer = await tx.freelancer.create({
// //         data: {
// //           email,
// //           password: await bcrypt.hash(password, 10),
// //         },
// //       });

// //       // 2. Create client
// //       const client = await tx.client.create({
// //         data: {
// //           name: clientName,
// //           modeOfPay: 'Direct Payment',
// //           status: 'Active',
// //           freelancerId: freelancer.id
// //         }
// //       });

// //       // 3. Create delivery
// //       const delivery = await tx.delivery.create({
// //         data: {
// //           name: deliveryName,
// //           desc: deliveryDesc || '',
// //           cost: parseFloat(deliveryCost),
// //           PaymentStatus: 'Not Paid',
// //           withdrawStatus: 'no',
// //           clientId: client.id
// //         }
// //       });

// //       // 4. Create file records if files are provided
// //       if (files && files.length > 0) {
// //         await Promise.all(
// //           files.map(file => 
// //             tx.file.create({
// //               data: {
// //                 name: file.name,
// //                 url: file.url,
// //                 deliveryId: delivery.id
// //               }
// //             })
// //           )
// //         );
// //       }

// //       return { freelancer, client, delivery };
// //     });

// //     // Set authentication cookie
// //     const cookieStore = await cookies();
// //     cookieStore.set('freelancerId', JSON.stringify({
// //       id: result.freelancer.id,
// //       email: result.freelancer.email
// //     }), {
// //       httpOnly: true,
// //       secure: process.env.NODE_ENV === 'production',
// //       sameSite: 'lax',
// //       maxAge: 60 * 60 * 24 * 30, // 30 days
// //       path: '/',
// //     });

// //     return NextResponse.json({ 
// //       success: true,
// //       data: {
// //         freelancerId: result.freelancer.id,
// //         clientId: result.client.id,
// //         deliveryId: result.delivery.id,
// //         deliveryName: result.delivery.name
// //       }
// //     });

// //   } catch (error) {
// //     console.error('Quick onboard error:', error);
    
// //     return NextResponse.json({ 
// //       success: false, 
// //       error: 'Failed to create account. Please try again.',
// //       details: error.message
// //     }, { status: 500 });
// //   }
// // }
// // app/api/onboard/quick-start/route.js
// import { NextResponse } from 'next/server';
// import { db } from '@/lib/prisma';
// import bcrypt from 'bcryptjs';
// import nodemailer from 'nodemailer';
// import crypto from 'crypto';

// // ✅ NEW: Create nodemailer transporter
// const transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS
//   }
// });

// // ✅ NEW: Generate a secure random password
// function generatePassword(length = 12) {
//   const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*';
//   let password = '';
//   const randomBytes = crypto.randomBytes(length);
  
//   for (let i = 0; i < length; i++) {
//     password += charset[randomBytes[i] % charset.length];
//   }
  
//   return password;
// }

// // ✅ NEW: Send welcome email with credentials
// async function sendWelcomeEmail(email, password, deliveryLink, deliveryName, clientName) {
//   const mailOptions = {
//     from: process.env.EMAIL_USER,
//     to: email,
//     subject: '🎉 Welcome to WorkOnGigs - Your Account is Ready!',
//     html: `
//       <!DOCTYPE html>
//       <html>
//       <head>
//         <meta charset="utf-8">
//         <meta name="viewport" content="width=device-width, initial-scale=1.0">
//       </head>
//       <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f5f5f5;">
//         <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff;">
//           <!-- Header -->
//           <div style="background: linear-gradient(135deg, #000000 0%, #333333 100%); padding: 40px 20px; text-align: center;">
//             <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: bold;">
//               Welcome to WorkOnGigs! 🎉
//             </h1>
//             <p style="color: #e0e0e0; margin: 10px 0 0 0; font-size: 16px;">
//               Your account has been created successfully
//             </p>
//           </div>

//           <!-- Content -->
//           <div style="padding: 40px 30px;">
//             <p style="color: #333333; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
//               Hi there! 👋
//             </p>
            
//             <p style="color: #666666; font-size: 15px; line-height: 1.6; margin: 0 0 30px 0;">
//               Your delivery <strong>"${deliveryName}"</strong> for <strong>${clientName}</strong> has been created! Here are your login credentials:
//             </p>

//             <!-- Credentials Box -->
//             <div style="background-color: #f8f9fa; border-left: 4px solid #000000; padding: 20px; margin: 0 0 30px 0; border-radius: 4px;">
//               <div style="margin-bottom: 15px;">
//                 <p style="color: #666666; font-size: 13px; margin: 0 0 5px 0; text-transform: uppercase; letter-spacing: 0.5px;">
//                   Email
//                 </p>
//                 <p style="color: #000000; font-size: 16px; margin: 0; font-weight: bold; word-break: break-all;">
//                   ${email}
//                 </p>
//               </div>
              
//               <div>
//                 <p style="color: #666666; font-size: 13px; margin: 0 0 5px 0; text-transform: uppercase; letter-spacing: 0.5px;">
//                   Password
//                 </p>
//                 <p style="color: #000000; font-size: 16px; margin: 0; font-weight: bold; font-family: 'Courier New', monospace; background-color: #ffffff; padding: 10px; border-radius: 4px; border: 1px solid #e0e0e0;">
//                   ${password}
//                 </p>
//               </div>
//             </div>

//             <div style="background-color: #fff3cd; border: 1px solid #ffc107; padding: 15px; margin: 0 0 30px 0; border-radius: 4px;">
//               <p style="color: #856404; font-size: 14px; margin: 0; line-height: 1.5;">
//                 ⚠️ <strong>Important:</strong> Please save these credentials securely. You can change your password after logging in.
//               </p>
//             </div>

//             <!-- Action Buttons -->
//             <div style="text-align: center; margin: 0 0 30px 0;">
//               <a href="${process.env.NEXT_PUBLIC_BASE_URL || 'https://workongigs.com'}/auth/freelancer/login" 
//                  style="display: inline-block; background-color: #000000; color: #ffffff; text-decoration: none; padding: 14px 30px; border-radius: 8px; font-weight: bold; font-size: 16px; margin: 0 0 15px 0;">
//                 Login to Your Account →
//               </a>
              
//               <br>
              
//               <a href="${deliveryLink}" 
//                  style="display: inline-block; background-color: #ffffff; color: #000000; text-decoration: none; padding: 14px 30px; border-radius: 8px; font-weight: bold; font-size: 16px; border: 2px solid #000000;">
//                 View Your Delivery
//               </a>
//             </div>

//             <!-- Delivery Details -->
//             <div style="background-color: #f8f9fa; padding: 20px; margin: 0 0 30px 0; border-radius: 8px;">
//               <h3 style="color: #000000; font-size: 18px; margin: 0 0 15px 0;">
//                 📦 Delivery Details
//               </h3>
//               <div style="color: #666666; font-size: 15px; line-height: 1.8;">
//                 <p style="margin: 5px 0;"><strong>Project:</strong> ${deliveryName}</p>
//                 <p style="margin: 5px 0;"><strong>Client:</strong> ${clientName}</p>
//                 <p style="margin: 5px 0;"><strong>Status:</strong> Ready to share</p>
//               </div>
//             </div>

//             <!-- What's Next -->
//             <div style="background-color: #f8f9fa; padding: 20px; margin: 0 0 30px 0; border-radius: 8px;">
//               <h3 style="color: #000000; font-size: 18px; margin: 0 0 15px 0;">
//                 What's Next? 🚀
//               </h3>
//               <ul style="color: #666666; font-size: 15px; line-height: 1.8; margin: 0; padding-left: 20px;">
//                 <li>Login to your dashboard</li>
//                 <li>Share the delivery link with your client</li>
//                 <li>Track payment status</li>
//                 <li>Manage your clients and projects</li>
//               </ul>
//             </div>

//             <p style="color: #666666; font-size: 14px; line-height: 1.6; margin: 0;">
//               Need help? Reply to this email or visit our help center.
//             </p>
//           </div>

//           <!-- Footer -->
//           <div style="background-color: #f8f9fa; padding: 30px; text-align: center; border-top: 1px solid #e0e0e0;">
//             <p style="color: #999999; font-size: 14px; margin: 0 0 10px 0;">
//               This is an automated email from WorkOnGigs
//             </p>
//             <p style="color: #999999; font-size: 12px; margin: 0;">
//               © ${new Date().getFullYear()} WorkOnGigs. All rights reserved.
//             </p>
//           </div>
//         </div>
//       </body>
//       </html>
//     `,
//   };

//   await transporter.sendMail(mailOptions);
// }

// export async function POST(request) {
//   try {
//     const body = await request.json();
//     const { 
//       email, 
//       clientName,
//       deliveryName,
//       deliveryCost,
//       files 
//     } = body;

//     // ✅ CHANGED: Removed password from required fields
//     // Validate required fields
//     if (!email || !clientName || !deliveryName || !deliveryCost) {
//       return NextResponse.json({ 
//         success: false, 
//         error: 'Missing required fields' 
//       }, { status: 400 });
//     }

//     // Check if user already exists
//     const existingUser = await db.freelancer.findUnique({
//       where: { email }
//     });

//     if (existingUser) {
//       return NextResponse.json({ 
//         success: false, 
//         error: 'Email already registered. Please login instead.' 
//       }, { status: 400 });
//     }

//     // ✅ NEW: Generate secure password
//     const generatedPassword = generatePassword(12);
//     const hashedPassword = await bcrypt.hash(generatedPassword, 10);

//     // Create everything in a transaction
//     const result = await db.$transaction(async (tx) => {
//       // 1. Create freelancer
//       const freelancer = await tx.freelancer.create({
//         data: {
//           email,
//           password: hashedPassword, // ✅ CHANGED: Using hashed generated password
//         },
//       });

//       // 2. Create client
//       const client = await tx.client.create({
//         data: {
//           name: clientName,
//           modeOfPay: 'Direct Payment',
//           status: 'Active',
//           freelancerId: freelancer.id
//         }
//       });

//       // 3. Create delivery
//       const delivery = await tx.delivery.create({
//         data: {
//           name: deliveryName,
//           desc: '',
//           cost: parseFloat(deliveryCost),
//           PaymentStatus: 'Not Paid',
//           withdrawStatus: 'no',
//           clientId: client.id
//         }
//       });

//       // 4. Create file records if files are provided
//       if (files && files.length > 0) {
//         await Promise.all(
//           files.map(file => 
//             tx.file.create({
//               data: {
//                 name: file.name,
//                 url: file.url,
//                 deliveryId: delivery.id
//               }
//             })
//           )
//         );
//       }

//       return { freelancer, client, delivery };
//     });

//     // ✅ NEW: Generate delivery preview link
//     const deliveryLink = `${process.env.NEXT_PUBLIC_BASE_URL || 'https://workongigs.com'}/preview/${result.client.id}/${result.delivery.id}`;

//     // ✅ NEW: Send welcome email with credentials
//     try {
//       await sendWelcomeEmail(
//         email, 
//         generatedPassword, // ✅ Send plain text password in email
//         deliveryLink,
//         deliveryName,
//         clientName
//       );
//     } catch (emailError) {
//       console.error('Failed to send welcome email:', emailError);
//       // Continue even if email fails - user can reset password
//     }

//     // ✅ REMOVED: Cookie setting (user needs to login with emailed credentials)
    
//     return NextResponse.json({ 
//       success: true,
//       data: {
//         freelancerId: result.freelancer.id,
//         clientId: result.client.id,
//         deliveryId: result.delivery.id,
//         deliveryName: result.delivery.name
//       }
//     });

//   } catch (error) {
//     console.error('Quick onboard error:', error);
    
//     return NextResponse.json({ 
//       success: false, 
//       error: 'Failed to create account. Please try again.',
//       details: error.message
//     }, { status: 500 });
//   }
// }

// app/api/onboard/quick-start/route.js
import { NextResponse } from 'next/server';
import { db } from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import nodemailer from 'nodemailer';
import crypto from 'crypto';

// ✅ NEW: Create nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// ✅ NEW: Generate a secure random password
function generatePassword(length = 12) {
  const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*';
  let password = '';
  const randomBytes = crypto.randomBytes(length);
  
  for (let i = 0; i < length; i++) {
    password += charset[randomBytes[i] % charset.length];
  }
  
  return password;
}

// ✅ NEW: Send welcome email with credentials
async function sendWelcomeEmail(email, password, deliveryLink, deliveryName, clientName) {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: '🎉 Welcome to WorkOnGigs - Your Account is Ready!',
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
      <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f5f5f5;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff;">
          <!-- Header -->
          <div style="background: linear-gradient(135deg, #000000 0%, #333333 100%); padding: 40px 20px; text-align: center;">
            <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: bold;">
              Welcome to WorkOnGigs! 🎉
            </h1>
            <p style="color: #e0e0e0; margin: 10px 0 0 0; font-size: 16px;">
              Your account has been created successfully
            </p>
          </div>

          <!-- Content -->
          <div style="padding: 40px 30px;">
            <p style="color: #333333; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
              Hi there! 👋
            </p>
            
            <p style="color: #666666; font-size: 15px; line-height: 1.6; margin: 0 0 30px 0;">
              Your delivery <strong>"${deliveryName}"</strong> for <strong>${clientName}</strong> has been created! Here are your login credentials:
            </p>

            <!-- Credentials Box -->
            <div style="background-color: #f8f9fa; border-left: 4px solid #000000; padding: 20px; margin: 0 0 30px 0; border-radius: 4px;">
              <div style="margin-bottom: 15px;">
                <p style="color: #666666; font-size: 13px; margin: 0 0 5px 0; text-transform: uppercase; letter-spacing: 0.5px;">
                  Email
                </p>
                <p style="color: #000000; font-size: 16px; margin: 0; font-weight: bold; word-break: break-all;">
                  ${email}
                </p>
              </div>
              
              <div>
                <p style="color: #666666; font-size: 13px; margin: 0 0 5px 0; text-transform: uppercase; letter-spacing: 0.5px;">
                  Password
                </p>
                <p style="color: #000000; font-size: 16px; margin: 0; font-weight: bold; font-family: 'Courier New', monospace; background-color: #ffffff; padding: 10px; border-radius: 4px; border: 1px solid #e0e0e0;">
                  ${password}
                </p>
              </div>
            </div>

            <div style="background-color: #fff3cd; border: 1px solid #ffc107; padding: 15px; margin: 0 0 30px 0; border-radius: 4px;">
              <p style="color: #856404; font-size: 14px; margin: 0; line-height: 1.5;">
                ⚠️ <strong>Important:</strong> Please save these credentials securely. You can change your password after logging in.
              </p>
            </div>

            <!-- Action Buttons -->
            <div style="text-align: center; margin: 0 0 30px 0;">
              <a href="${process.env.NEXT_PUBLIC_BASE_URL || 'https://workongigs.com'}/auth/freelancer/login" 
                 style="display: inline-block; background-color: #000000; color: #ffffff; text-decoration: none; padding: 14px 30px; border-radius: 8px; font-weight: bold; font-size: 16px; margin: 0 0 15px 0;">
                Login to Your Account →
              </a>
              
              <br>
              
              <a href="${deliveryLink}" 
                 style="display: inline-block; background-color: #ffffff; color: #000000; text-decoration: none; padding: 14px 30px; border-radius: 8px; font-weight: bold; font-size: 16px; border: 2px solid #000000;">
                View Your Delivery
              </a>
            </div>

            <!-- Delivery Details -->
            <div style="background-color: #f8f9fa; padding: 20px; margin: 0 0 30px 0; border-radius: 8px;">
              <h3 style="color: #000000; font-size: 18px; margin: 0 0 15px 0;">
                📦 Delivery Details
              </h3>
              <div style="color: #666666; font-size: 15px; line-height: 1.8;">
                <p style="margin: 5px 0;"><strong>Project:</strong> ${deliveryName}</p>
                <p style="margin: 5px 0;"><strong>Client:</strong> ${clientName}</p>
                <p style="margin: 5px 0;"><strong>Status:</strong> Ready to share</p>
              </div>
            </div>

            <!-- What's Next -->
            <div style="background-color: #f8f9fa; padding: 20px; margin: 0 0 30px 0; border-radius: 8px;">
              <h3 style="color: #000000; font-size: 18px; margin: 0 0 15px 0;">
                What's Next? 🚀
              </h3>
              <ul style="color: #666666; font-size: 15px; line-height: 1.8; margin: 0; padding-left: 20px;">
                <li>Login to your dashboard</li>
                <li>Share the delivery link with your client</li>
                <li>Track payment status</li>
                <li>Manage your clients and projects</li>
              </ul>
            </div>

            <p style="color: #666666; font-size: 14px; line-height: 1.6; margin: 0;">
              Need help? Reply to this email or visit our help center.
            </p>
          </div>

          <!-- Footer -->
          <div style="background-color: #f8f9fa; padding: 30px; text-align: center; border-top: 1px solid #e0e0e0;">
            <p style="color: #999999; font-size: 14px; margin: 0 0 10px 0;">
              This is an automated email from WorkOnGigs
            </p>
            <p style="color: #999999; font-size: 12px; margin: 0;">
              © ${new Date().getFullYear()} WorkOnGigs. All rights reserved.
            </p>
          </div>
        </div>
      </body>
      </html>
    `,
  };

  await transporter.sendMail(mailOptions);
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { 
      email, 
      clientName,
      deliveryName,
      deliveryCost,
      files 
    } = body;

    // ✅ CHANGED: Removed password from required fields
    // Validate required fields
    if (!email || !clientName || !deliveryName || !deliveryCost) {
      return NextResponse.json({ 
        success: false, 
        error: 'Missing required fields' 
      }, { status: 400 });
    }

    // Check if user already exists
    const existingUser = await db.freelancer.findUnique({
      where: { email }
    });

    if (existingUser) {
      return NextResponse.json({ 
        success: false, 
        error: 'Email already registered. Please login instead.' 
      }, { status: 400 });
    }

    // ✅ NEW: Generate secure password
    const generatedPassword = generatePassword(12);
    const hashedPassword = await bcrypt.hash(generatedPassword, 10);

    // Create everything in a transaction
    const result = await db.$transaction(async (tx) => {
      // 1. Create freelancer
      const freelancer = await tx.freelancer.create({
        data: {
          email,
          password: hashedPassword, // ✅ CHANGED: Using hashed generated password
        },
      });

      // 2. Create client
      const client = await tx.client.create({
        data: {
          name: clientName,
          modeOfPay: 'Direct Payment',
          status: 'Active',
          freelancerId: freelancer.id
        }
      });

      // 3. Create delivery
      const delivery = await tx.delivery.create({
        data: {
          name: deliveryName,
          desc: '',
          cost: parseFloat(deliveryCost),
          PaymentStatus: 'Not Paid',
          withdrawStatus: 'no',
          clientId: client.id
        }
      });

      // 4. Create file records if files are provided
      if (files && files.length > 0) {
        await Promise.all(
          files.map(file => 
            tx.file.create({
              data: {
                name: file.name,
                url: file.url,
                deliveryId: delivery.id
              }
            })
          )
        );
      }

      return { freelancer, client, delivery };
    });

    // ✅ NEW: Generate delivery preview link with new format
    const deliveryLink = `${process.env.NEXT_PUBLIC_BASE_URL || 'https://workongigs.com'}/${result.client.id}/preview?delivery=${result.delivery.id}`;

    // ✅ NEW: Send welcome email with credentials
    try {
      await sendWelcomeEmail(
        email, 
        generatedPassword, // ✅ Send plain text password in email
        deliveryLink,
        deliveryName,
        clientName
      );
    } catch (emailError) {
      console.error('Failed to send welcome email:', emailError);
      // Continue even if email fails - user can reset password
    }

    // ✅ REMOVED: Cookie setting (user needs to login with emailed credentials)
    
    return NextResponse.json({ 
      success: true,
      data: {
        freelancerId: result.freelancer.id,
        clientId: result.client.id,
        deliveryId: result.delivery.id,
        deliveryName: result.delivery.name,
        previewLink: deliveryLink // ✅ NEW: Return preview link to frontend
      }
    });

  } catch (error) {
    console.error('Quick onboard error:', error);
    
    return NextResponse.json({ 
      success: false, 
      error: 'Failed to create account. Please try again.',
      details: error.message
    }, { status: 500 });
  }
}