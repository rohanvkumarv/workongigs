
// import { NextResponse } from 'next/server';
// import { db } from '@/lib/prisma';

// export async function POST(request) {
//   try {
//     const body = await request.json();
//     const { name, modeOfPay, status, email, phone, freelancerId } = body;

//     console.log('Creating client with data:', { name, modeOfPay, status, email, phone, freelancerId });

//     if (!name || !modeOfPay || !freelancerId) {
//       return NextResponse.json({ 
//         success: false, 
//         error: 'Missing required client fields' 
//       }, { status: 400 });
//     }

//     // Create client with direct freelancerId
//     const client = await db.client.create({
//       data: {
//         name,
//         phone: phone || null,
//         email: email || null,
//         modeOfPay,
//         status: status || 'Active',
//         freelancerId: freelancerId
//       }
//     });

//     console.log('Client created successfully:', client);

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
//       error: error.message,
//       stack: error.stack // Added for debugging, remove in production
//     }, { status: 500 });
//   }
// }

// app/api/freelancer/create-client/route.js
import { NextResponse } from 'next/server';
import { db } from '@/lib/prisma';

export async function POST(request) {
  try {
    const { freelancerId, name, email, phone, modeOfPay, status, note, image } = await request.json();

    if (!freelancerId || !name) {
      return NextResponse.json(
        { error: 'Freelancer ID and client name are required' },
        { status: 400 }
      );
    }

    // Create the client
    const client = await db.client.create({
      data: {
        name,
        email,
        phone,
        modeOfPay,
        status: status || 'Active',
        note,
        image,
        freelancerId
      }
    });

    return NextResponse.json({
      message: 'Client created successfully',
      client
    });
  } catch (error) {
    console.error('Error creating client:', error);
    return NextResponse.json(
      { error: 'Failed to create client', details: error.message },
      { status: 500 }
    );
  }
}