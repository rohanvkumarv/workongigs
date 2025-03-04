// // // // app/api/freelancer/get-details/route.js
// // // import { db } from '@/lib/prisma';
// // // import { NextResponse } from 'next/server';

// // // export async function POST(request) {
// // //   try {
// // //     const { freelancerId } = await request.json();

// // //     if (!freelancerId) {
// // //       return NextResponse.json(
// // //         { error: 'Freelancer ID is required' },
// // //         { status: 400 }
// // //       );
// // //     }

// // //     const freelancer = await db.freelancer.findUnique({
// // //       where: { id: freelancerId },
// // //       select: {
// // //         name: true,
// // //         email: true,
// // //         mobile: true,
// // //         city: true,
// // //         country: true,
// // //         pincode: true,
// // //         profession: true,
// // //       },
// // //     });

// // //     if (!freelancer) {
// // //       return NextResponse.json(
// // //         { error: 'Freelancer not found' },
// // //         { status: 404 }
// // //       );
// // //     }

// // //     return NextResponse.json(freelancer);
// // //   } catch (error) {
// // //     console.error('Error fetching freelancer details:', error);
// // //     return NextResponse.json(
// // //       { error: 'Internal server error' },
// // //       { status: 500 }
// // //     );
// // //   }
// // // }


// // // app/api/freelancer/get-details/route.js
// // import { db } from '@/lib/prisma';
// // import { NextResponse } from 'next/server';

// // export async function POST(request) {
// //   try {
// //     const { freelancerId } = await request.json();

// //     if (!freelancerId) {
// //       return NextResponse.json(
// //         { error: 'Freelancer ID is required' },
// //         { status: 400 }
// //       );
// //     }

// //     const freelancer = await db.freelancer.findUnique({
// //       where: { id: freelancerId },
// //       select: {
// //         name: true,
// //         email: true,
// //         mobile: true,
// //         city: true,
// //         country: true,
// //         pincode: true,
// //         profession: true,
// //       },
// //     });

// //     if (!freelancer) {
// //       return NextResponse.json(
// //         { error: 'Freelancer not found' },
// //         { status: 404 }
// //       );
// //     }

// //     // Convert null values to empty strings for frontend consistency
// //     const sanitizedFreelancer = Object.fromEntries(
// //       Object.entries(freelancer).map(([key, value]) => [key, value ?? ''])
// //     );

// //     return NextResponse.json(sanitizedFreelancer);
// //   } catch (error) {
// //     console.error('Error fetching freelancer details:', error);
// //     return NextResponse.json(
// //       { error: 'Internal server error' },
// //       { status: 500 }
// //     );
// //   }
// // }

// import { db } from '@/lib/prisma';
// import { NextResponse } from 'next/server';

// export async function POST(request) {
//   try {
//     const { freelancerId } = await request.json();

//     if (!freelancerId) {
//       return NextResponse.json(
//         { error: 'Freelancer ID is required' },
//         { status: 400 }
//       );
//     }

//     const freelancer = await db.freelancer.findUnique({
//       where: { id: freelancerId },
//       select: {
//         name: true,
//         email: true,
//         mobile: true,
//         city: true,
//         country: true,
//         pincode: true,
//         profession: true,
//       },
//     });

//     if (!freelancer) {
//       return NextResponse.json(
//         { error: 'Freelancer not found' },
//         { status: 404 }
//       );
//     }

//     // Convert BigInt to string and handle null values
//     const formattedFreelancer = {
//       ...freelancer,
//       mobile: freelancer.mobile ? freelancer.mobile.toString() : '',
//       name: freelancer.name || '',
//       city: freelancer.city || '',
//       country: freelancer.country || '',
//       pincode: freelancer.pincode || '',
//       profession: freelancer.profession || '',
//       email: freelancer.email || ''
//     };

//     return NextResponse.json(formattedFreelancer);
//   } catch (error) {
//     console.error('Error fetching freelancer details:', error);
//     return NextResponse.json(
//       { error: 'Internal server error' },
//       { status: 500 }
//     );
//   }
// }
// app/api/get-details/route.js
import { db } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const body = await request.json();
    
    if (!body?.freelancerId) {
      return NextResponse.json(
        { error: 'Freelancer ID required' }, 
        { status: 400 }
      );
    }

    const freelancer = await db.freelancer.findUnique({
      where: {
        id: body.freelancerId
      },
      select: {
        name: true,
        email: true,
        mobile: true,
        city: true,
        country: true,
        pincode: true,
        profession: true,
        profileImage: true // Include profile image
      }
    });

    if (!freelancer) {
      return NextResponse.json(
        { error: 'Freelancer not found' }, 
        { status: 404 }
      );
    }

    // Format the response
    const response = {
      id:freelancer.id,
      name: freelancer.name || '',
      email: freelancer.email || '',
      mobile: freelancer.mobile?.toString() || '',
      city: freelancer.city || '',
      country: freelancer.country || '',
      pincode: freelancer.pincode || '',
      profession: freelancer.profession || '',
      profileImage: freelancer.profileImage || ''
    };
    console.log(response)

    return NextResponse.json(response);
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch details' },
      { status: 500 }
    );
  }
}