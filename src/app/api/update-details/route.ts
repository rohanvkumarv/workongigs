
// import { db } from '@/lib/prisma';
// import { NextResponse } from 'next/server';

// export async function POST(request) {
//   try {
//     const body = await request.json();
//     console.log('Request body:', body);

//     // Basic validation
//     if (!body.freelancerId) {
//       return NextResponse.json({ error: 'Freelancer ID required' }, { status: 400 });
//     }

//     const result = await db.freelancer.update({
//       where: {
//         id: body.freelancerId
//       },
//       data: {
//         name: body.name,
//         mobile: body.mobile ? BigInt(body.mobile) : null,  // Convert to BigInt
//         city: body.city,
//         country: body.country,
//         pincode: body.pincode,
//         profession: body.profession
//       }
//     });

//     // Convert BigInt to string for JSON response
//     const response = {
//       ...result,
//       mobile: result.mobile ? result.mobile.toString() : null
//     };

//     return NextResponse.json(response);
//   } catch (error) {
//     console.log('Error details:', {
//       name: error.name,
//       message: error.message,
//       code: error.code
//     });

//     return NextResponse.json(
//       { error: 'Failed to update profile' },
//       { status: 500 }
//     );
//   }
// }

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
        profession: body.profession
      },
      // Only select the fields we want to return
      select: {
        name: true,
        email: true,
        mobile: true,
        city: true,
        country: true,
        pincode: true,
        profession: true
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
      profession: result.profession || ''
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