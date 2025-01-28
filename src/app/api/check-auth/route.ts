// // app/api/check-auth/route.js
export const dynamic = 'force-dynamic'
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

// export async function GET() {
//   try {
//     const cookieStore = await cookies();
//     const authCookie = cookieStore.get('auth');

//     if (!authCookie) {
//       return NextResponse.json({ 
//         success: false, 
//         message: 'No auth cookie found' 
//       });
//     }

//     // Parse the auth cookie
//     const authData = JSON.parse(authCookie.value);

//     // Check if token is expired
//     if (authData.exp && authData.exp < Date.now()) {
//       return NextResponse.json({ 
//         success: false, 
//         message: 'Auth token expired' 
//       });
//     }

//     // Return user data
//     return NextResponse.json({
//       success: true,
//       user: {
//         id: authData.id,
//         email: authData.email,
//         type: authData.type
//       }
//     });

//   } catch (error) {
//     console.error('Error checking auth:', error);
//     return NextResponse.json(
//       { success: false, error: 'Failed to check auth status' },
//       { status: 500 }
//     );
//   }
// }



// app/api/check-auth/route.js
// export const dynamic = 'force-dynamic'
export async function GET() {
  try {
    const cookieStore = await cookies();
    const freelancerCookie = cookieStore.get('freelancerId');

    if (!freelancerCookie) {
      return NextResponse.json({ 
        success: false, 
        error: 'Not authenticated' 
      });
    }

    // Now we can parse the JSON data from the cookie
    const freelancerData = JSON.parse(freelancerCookie.value);

    return NextResponse.json({
      success: true,
      freelancer: {
        id: freelancerData.id,
        email: freelancerData.email
      }
    });

  } catch (error) {
    console.error('Error checking auth:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to check auth status' },
      { status: 500 }
    );
  }
}