// // // // app/api/user-login/route.js
// // // import { NextResponse } from 'next/server';
// // // import { db } from '@/lib/prisma';
// // // import bcrypt from 'bcryptjs';

// // // export async function POST(request) {
// // //   try {
// // //     const { email, password } = await request.json();

// // //     // Find user
// // //     const user = await db.freelancer.findUnique({
// // //       where: { email },
// // //     });

// // //     if (!user) {
// // //       return NextResponse.json(
// // //         { error: 'Invalid email or password' },
// // //         { status: 401 }
// // //       );
// // //     }

// // //     // Verify password
// // //     const isValidPassword = await bcrypt.compare(password, user.password);
// // //     if (!isValidPassword) {
// // //       return NextResponse.json(
// // //         { error: 'Invalid email or password' },
// // //         { status: 401 }
// // //       );
// // //     }

// // //     return NextResponse.json({
// // //       success: true,
// // //       user: {
// // //         id: user.id,
// // //         email: user.email,
// // //         name: user.name
// // //       }
// // //     });

// // //   } catch (error) {
// // //     console.error('Login error:', error);
// // //     return NextResponse.json(
// // //       { error: 'Failed to login' },
// // //       { status: 500 }
// // //     );
// // //   }
// // // }


// // // cookie one  

// // // app/api/user-login/route.js
// // // import { NextResponse } from 'next/server';
// // // import { cookies } from 'next/headers';
// // // import { db } from '@/lib/prisma';
// // // import bcrypt from 'bcryptjs';

// // // export async function POST(request) {
// // //   try {
// // //     const { email, password } = await request.json();

// // //     // Find user
// // //     const user = await db.freelancer.findUnique({
// // //       where: { email },
// // //     });

// // //     if (!user) {
// // //       return NextResponse.json(
// // //         { error: 'Invalid email or password' },
// // //         { status: 401 }
// // //       );
// // //     }

// // //     // Verify password
// // //     const isValidPassword = await bcrypt.compare(password, user.password);
// // //     if (!isValidPassword) {
// // //       return NextResponse.json(
// // //         { error: 'Invalid email or password' },
// // //         { status: 401 }
// // //       );
// // //     }

// // //     // Set authentication cookies
// // //     cookies().set('freelancerId', user.id, {
// // //       httpOnly: true,
// // //       secure: process.env.NODE_ENV === 'production',
// // //       sameSite: 'lax',
// // //       maxAge: 60 * 60 * 24 * 30, // 30 days
// // //       path: '/',
// // //     });

// // //     // Set session cookie
// // //     cookies().set('sessionActive', 'true', {
// // //       httpOnly: true,
// // //       secure: process.env.NODE_ENV === 'production',
// // //       sameSite: 'lax',
// // //       maxAge: 60 * 60 * 24, // 24 hours
// // //       path: '/',
// // //     });

// // //     return NextResponse.json({
// // //       success: true,
// // //       user: {
// // //         id: user.id,
// // //         email: user.email,
// // //         name: user.name
// // //       }
// // //     });

// // //   } catch (error) {
// // //     console.error('Login error:', error);
// // //     return NextResponse.json(
// // //       { error: 'Failed to login' },
// // //       { status: 500 }
// // //     );
// // //   }
// // // }
// // // app/api/user-login/route.js
// // import { NextResponse } from 'next/server';
// // import { cookies } from 'next/headers';
// // import { db } from '@/lib/prisma';
// // import bcrypt from 'bcryptjs';

// // export async function POST(request) {
// //   try {
// //     const { email, password } = await request.json();

// //     // Find user
// //     const user = await db.freelancer.findUnique({
// //       where: { email },
// //     });

// //     if (!user) {
// //       return NextResponse.json(
// //         { error: 'Invalid email or password' },
// //         { status: 401 }
// //       );
// //     }

// //     // Verify password
// //     const isValidPassword = await bcrypt.compare(password, user.password);
// //     if (!isValidPassword) {
// //       return NextResponse.json(
// //         { error: 'Invalid email or password' },
// //         { status: 401 }
// //       );
// //     }

// //     // Set cookies - updated with await
// //     const cookieStore = await cookies();
// //     cookieStore.set('freelancerId', user.id, {
// //       httpOnly: true,
// //       secure: process.env.NODE_ENV === 'production',
// //       sameSite: 'lax',
// //       maxAge: 60 * 60 * 24 * 30, // 30 days
// //       path: '/',
// //     });

// //     // Optional: Set session cookie
// //     cookieStore.set('sessionActive', 'true', {
// //       httpOnly: true,
// //       secure: process.env.NODE_ENV === 'production',
// //       sameSite: 'lax',
// //       maxAge: 60 * 60 * 24, // 24 hours
// //       path: '/',
// //     });

// //     return NextResponse.json({
// //       success: true,
// //       user: {
// //         id: user.id,
// //         email: user.email,
// //         name: user.name
// //       }
// //     });

// //   } catch (error) {
// //     console.error('Login error:', error);
// //     return NextResponse.json(
// //       { error: 'Failed to login' },
// //       { status: 500 }
// //     );
// //   }
// // }


// // app/api/user-login/route.js
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { db } from '@/lib/prisma';
import bcrypt from 'bcryptjs';

// export async function POST(request) {
//   try {
//     const { email, password } = await request.json();

//     // Find user
//     const user = await db.freelancer.findUnique({
//       where: { email },
//     });

//     if (!user) {
//       return NextResponse.json(
//         { error: 'Invalid email or password' },
//         { status: 401 }
//       );
//     }

//     // Verify password
//     const isValidPassword = await bcrypt.compare(password, user.password);
//     if (!isValidPassword) {
//       return NextResponse.json(
//         { error: 'Invalid email or password' },
//         { status: 401 }
//       );
//     }

//     // Set cookie - updated with await
//     const cookieStore = await cookies();
//     // cookieStore.set('freelancerId', user.id, {
//     //   httpOnly: true,
//     //   secure: process.env.NODE_ENV === 'production',
//     //   sameSite: 'lax',
//     //   maxAge: 60 * 60 * 24 * 30, // 30 days
//     //   path: '/',
//     // });


//     // In login/signup routes:
// cookieStore.set('freelancerId', JSON.stringify({
//   id: user.id,
//   email: user.email
// }), {
//   httpOnly: true,
//   secure: process.env.NODE_ENV === 'production',
//   sameSite: 'lax',
//   maxAge: 60 * 60 * 24 * 30, // 30 days
//   path: '/',
// });

//     return NextResponse.json({
//       success: true,
//       user: {
//         id: user.id,
//         email: user.email,
//         name: user.name
//       }
//     });

//   } catch (error) {
//     console.error('Login error:', error);
//     return NextResponse.json(
//       { error: 'Failed to login' },
//       { status: 500 }
//     );
//   }
// }


// app/api/freelancer-login/route.js
export async function POST(request) {
  try {
    const { email, password } = await request.json();

    const user = await db.freelancer.findUnique({
      where: { email },
    });

    if (!user || !await bcrypt.compare(password, user.password)) {
      return NextResponse.json(
        { success: false, error: 'Invalid email or password' },
        { status: 401 }
      );
    }

    const cookieStore = await cookies();
    cookieStore.set('freelancerId', JSON.stringify({
      id: user.id,
      email: user.email
    }), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 30, // 30 days
      path: '/',
    });

    return NextResponse.json({
      success: true,
      freelancer: {
        id: user.id,
        email: user.email
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to login' },
      { status: 500 }
    );
  }
}


