
// // app/api/freelancer/update-details/route.js
// import { db } from '@/lib/prisma';
// import { NextResponse } from 'next/server';

// export async function PUT(request) {
//   try {
//     const {
//       freelancerId,
//       name,
//       mobile,
//       city,
//       country,
//       pincode,
//       profession
//     } = await request.json();

//     if (!freelancerId) {
//       return NextResponse.json(
//         { error: 'Freelancer ID is required' },
//         { status: 400 }
//       );
//     }

//     const updatedFreelancer = await db.freelancer.update({
//       where: { id: freelancerId },
//       data: {
//         name,
//         mobile: mobile ? parseInt(mobile) : null,
//         city,
//         country,
//         pincode,
//         profession,
//       },
//     });

//     return NextResponse.json(updatedFreelancer);
//   } catch (error) {
//     console.error('Error updating freelancer details:', error);
//     return NextResponse.json(
//       { error: 'Internal server error' },
//       { status: 500 }
//     );
//   }
// }

// app/api/update-details/route.ts
import { db } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    
    if (!body || !body.freelancerId) {
      return NextResponse.json(
        { error: 'Invalid request data' },
        { status: 400 }
      );
    }

    const {
      freelancerId,
      name,
      mobile,
      city,
      country,
      pincode,
      profession
    } = body;

    const updatedFreelancer = await db.freelancer.update({
      where: { id: freelancerId },
      data: {
        name,
        mobile: mobile ? parseInt(mobile) : null,
        city,
        country,
        pincode,
        profession
      },
    });

    return NextResponse.json(updatedFreelancer);
  } catch (error) {
    console.error('Error updating freelancer details:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}