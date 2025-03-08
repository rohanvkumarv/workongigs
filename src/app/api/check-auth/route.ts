// // // app/api/check-auth/route.js
// export const dynamic = 'force-dynamic'
// import { NextResponse } from 'next/server';
// import { cookies } from 'next/headers';

// export async function GET() {
//   try {
//     const cookieStore = await cookies();
//     const freelancerCookie = cookieStore.get('freelancerId');

//     if (!freelancerCookie) {
//       return NextResponse.json({ 
//         success: false, 
//         error: 'Not authenticated' 
//       });
//     }

//     // Now we can parse the JSON data from the cookie
//     const freelancerData = JSON.parse(freelancerCookie.value);

//     return NextResponse.json({
//       success: true,
//       freelancer: {
//         id: freelancerData.id,
//         email: freelancerData.email
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
export const dynamic = 'force-dynamic'
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET() {
  try {
    const cookieStore = await cookies();
    const freelancerCookie = cookieStore.get('freelancerId');
    const adminCookie = cookieStore.get('adminId');
    
    let response = {
      success: false,
      isFreelancer: false,
      isAdmin: false,
      freelancer: null,
      admin: null
    };

    // Check for freelancer authentication
    if (freelancerCookie?.value) {
      try {
        const freelancerData = JSON.parse(freelancerCookie.value);
        response.success = true;
        response.isFreelancer = true;
        response.freelancer = {
          id: freelancerData.id,
          email: freelancerData.email
        };
      } catch (error) {
        console.error('Error parsing freelancer cookie:', error);
      }
    }

    // Check for admin authentication
    if (adminCookie?.value) {
      try {
        const adminData = JSON.parse(adminCookie.value);
        response.success = true;
        response.isAdmin = true;
        response.admin = {
          id: adminData.id,
          email: adminData.email
        };
      } catch (error) {
        console.error('Error parsing admin cookie:', error);
      }
    }

    // If either auth type is successful, return success
    if (response.success) {
      return NextResponse.json(response);
    } else {
      return NextResponse.json({ 
        success: false, 
        error: 'Not authenticated' 
      });
    }

  } catch (error) {
    console.error('Error checking auth:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to check auth status' },
      { status: 500 }
    );
  }
}