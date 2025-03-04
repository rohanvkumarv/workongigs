

// import { db } from '@/lib/prisma';
// import { NextResponse } from 'next/server';

// export async function POST(request) {
//   try {
//     const body = await request.json();
    
//     if (!body?.freelancerId) {
//       return NextResponse.json(
//         { error: 'Freelancer ID required' }, 
//         { status: 400 }
//       );
//     }

//     const result = await db.freelancer.update({
//       where: {
//         id: body.freelancerId
//       },
//       data: {
//         name: body.name,
//         mobile: body.mobile ? parseInt(body.mobile) : null,
//         city: body.city,
//         country: body.country,
//         pincode: body.pincode,
//         profession: body.profession
//       },
//       // Only select the fields we want to return
//       select: {
//         name: true,
//         email: true,
//         mobile: true,
//         city: true,
//         country: true,
//         pincode: true,
//         profession: true
//       }
//     });

//     // Format the response
//     const response = {
//       name: result.name || '',
//       email: result.email || '',
//       mobile: result.mobile?.toString() || '',
//       city: result.city || '',
//       country: result.country || '',
//       pincode: result.pincode || '',
//       profession: result.profession || ''
//     };

//     return NextResponse.json(response);
//   } catch (error) {
//     console.error('Error:', error);
//     return NextResponse.json(
//       { error: 'Failed to update profile' },
//       { status: 500 }
//     );
//   }
// }
// app/api/update-details/route.js
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

    const result = await db.freelancer.update({
      where: {
        id: body.freelancerId
      },
      data: {
        name: body.name,
        mobile: body.mobile ? parseInt(body.mobile) : null,
        city: body.city,
        country: body.country,
        pincode: body.pincode,
        profession: body.profession,
        profileImage: body.profileImage || undefined // Add the profile image URL
      },
      // Only select the fields we want to return
      select: {
        name: true,
        email: true,
        mobile: true,
        city: true,
        country: true,
        pincode: true,
        profession: true,
        profileImage: true // Include profile image in the response
      }
    });

    // Format the response
    const response = {
      name: result.name || '',
      email: result.email || '',
      mobile: result.mobile?.toString() || '',
      city: result.city || '',
      country: result.country || '',
      pincode: result.pincode || '',
      profession: result.profession || '',
      profileImage: result.profileImage || ''
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: 'Failed to update profile' },
      { status: 500 }
    );
  }
}