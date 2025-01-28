// // // // app/api/logout/route.js
// // // import { NextResponse } from 'next/server';
// // // import { cookies } from 'next/headers';

// // // export async function POST() {
// // //   const cookieStore = await cookies();
  
// // //   // Clear all auth-related cookies
// // //   cookieStore.delete('freelancerId');
// // //   cookieStore.delete('sessionActive');

// // //   return NextResponse.json({ 
// // //     success: true, 
// // //     message: 'Logged out successfully' 
// // //   });
// // // }
// // // app/api/logout/route.js
// // import { NextResponse } from 'next/server';
// // import { cookies } from 'next/headers';

// // export async function POST() {
// //   try {
// //     const cookieStore = await cookies();
    
// //     // Delete with exact same options as when set
// //     cookieStore.set('freelancerId', '', {
// //       httpOnly: true,
// //       secure: process.env.NODE_ENV === 'production',
// //       sameSite: 'lax',
// //       path: '/',
// //       maxAge: 0  // This expires the cookie immediately
// //     });

// //     cookieStore.set('sessionActive', '', {
// //       httpOnly: true,
// //       secure: process.env.NODE_ENV === 'production',
// //       sameSite: 'lax',
// //       path: '/',
// //       maxAge: 0  // This expires the cookie immediately
// //     });

// //     // Create response
// //     const response = NextResponse.json({ 
// //       success: true, 
// //       message: 'Logged out successfully' 
// //     });

// //     // Also clear cookies in response
// //     response.cookies.set('freelancerId', '', { maxAge: 0 });
// //     response.cookies.set('sessionActive', '', { maxAge: 0 });

// //     return response;

// //   } catch (error) {
// //     console.error('Logout error:', error);
// //     return NextResponse.json(
// //       { success: false, error: 'Failed to logout' },
// //       { status: 500 }
// //     );
// //   }
// // }


// // app/api/logout/route.js
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

// export async function POST() {
//   try {
//     const cookieStore = await cookies();
    
//     // Clear the auth cookie by setting it to expire immediately
//     cookieStore.set('auth', '', {
//       expires: new Date(0),
//       path: '/',
//       secure: process.env.NODE_ENV === 'production',
//       sameSite: 'lax',
//       httpOnly: true
//     });

//     return NextResponse.json({ 
//       success: true, 
//       message: 'Logged out successfully' 
//     });
//   } catch (error) {
//     console.error('Logout error:', error);
//     return NextResponse.json(
//       { success: false, error: 'Failed to logout' },
//       { status: 500 }
//     );
//   }
// }

// app/api/logout/route.js
export async function POST() {
  try {
    const cookieStore = await cookies();
    
    cookieStore.set('freelancerId', '', {
      expires: new Date(0),
      path: '/',
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      httpOnly: true
    });

    return NextResponse.json({ 
      success: true,
      message: 'Logged out successfully'
    });
  } catch (error) {
    console.error('Logout error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to logout' },
      { status: 500 }
    );
  }
}