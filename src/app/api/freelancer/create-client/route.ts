// // app/api/freelancer/create-client/route.js
// import { NextResponse } from 'next/server';
// import { db } from '@/lib/prisma';

// export async function POST(req) {
//   try {
//     const body = await req.json();
//     const { name, modeOfPay, status, email, phone, freelancerId } = body;

//     if (!name || !modeOfPay || !freelancerId) {
//       return NextResponse.json({ 
//         success: false, 
//         error: 'Missing required client fields' 
//       }, { status: 400 });
//     }

//     // Create client with all fields
//     const client = await db.client.create({
//       data: {
//         name,
//         phone: phone || null,  // Handle optional fields
//         email: email || null,  // Handle optional fields
//         modeOfPay,
//         status: status || 'Active',
//         freelancerId,
//       },
//       include: {
//         deliveries: true
//       }
//     });

//     // Return success response with created data
//     return NextResponse.json({ 
//       success: true, 
//       client
//     });

//   } catch (error) {
//     console.error('Client creation error:', error);
    
//     // Handle specific database errors
//     if (error.code === 'P2002') {
//       return NextResponse.json({ 
//         success: false, 
//         error: 'A client with this information already exists'
//       }, { status: 409 });
//     }

//     // Generic error response
//     return NextResponse.json({ 
//       success: false, 
//       error: error.message
//     }, { status: 500 });
//   }
// }
// app/api/freelancer/create-client/route.js
import { NextResponse } from 'next/server';
import { db } from '@/lib/prisma';

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, modeOfPay, status, email, phone, freelancerId } = body;

    console.log('Creating client with data:', { name, modeOfPay, status, email, phone, freelancerId });

    if (!name || !modeOfPay || !freelancerId) {
      return NextResponse.json({ 
        success: false, 
        error: 'Missing required client fields' 
      }, { status: 400 });
    }

    // Create client with direct freelancerId
    const client = await db.client.create({
      data: {
        name,
        phone: phone || null,
        email: email || null,
        modeOfPay,
        status: status || 'Active',
        freelancerId: freelancerId
      }
    });

    console.log('Client created successfully:', client);

    return NextResponse.json({ 
      success: true, 
      client
    });

  } catch (error) {
    console.error('Client creation error:', error);
    
    // Handle specific database errors
    if (error.code === 'P2002') {
      return NextResponse.json({ 
        success: false, 
        error: 'A client with this information already exists'
      }, { status: 409 });
    }

    // Generic error response
    return NextResponse.json({ 
      success: false, 
      error: error.message,
      stack: error.stack // Added for debugging, remove in production
    }, { status: 500 });
  }
}