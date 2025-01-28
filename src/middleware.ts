
// import { NextResponse } from 'next/server';
// import type { NextRequest } from 'next/server';



// export function middleware(request: NextRequest) {
//     console.log('Middleware triggered for:', request.nextUrl.pathname);
  
//     const isAuthenticated = !!request.cookies.get('freelancerId')?.value;
//     console.log('User authenticated:', isAuthenticated);
  
//     if (request.nextUrl.pathname.startsWith('/freelancer') && !isAuthenticated) {
//       console.log('Redirecting to login');
//       return NextResponse.redirect(new URL('/auth/freelancer/login', request.url));
//     }
  
//     console.log('Proceeding to the next response');
//     return NextResponse.next();
//   }
  

// // Config goes right after the middleware function in the same file
// export const config = {
//   matcher: [
//     '/freelancer/:path*',
//     '/freelancer/:userid/dashboard',
//     '/freelancer/:userid/projects',
//     '/freelancer/:userid/profile'
//   ]
// };

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  console.log('Middleware triggered for:', request.nextUrl.pathname);

  const freelancerCookie = request.cookies.get('freelancerId');
  let isAuthenticated = false;

  if (freelancerCookie?.value) {
    try {
      // Try to parse the JSON data from cookie
      const freelancerData = JSON.parse(freelancerCookie.value);
      isAuthenticated = !!(freelancerData && freelancerData.id);
    } catch (error) {
      console.error('Error parsing freelancer cookie:', error);
      isAuthenticated = false;
    }
  }

  if (!isAuthenticated) {
    console.log('Redirecting to login');
    return NextResponse.redirect(new URL('/auth/freelancer/login', request.url));
  }

  console.log('Proceeding to the next response');
  return NextResponse.next();
}

// Config for path matching
export const config = {
  matcher: [
    '/freelancer/:path*'  // Protects all routes under /freelancer
  ]
};
