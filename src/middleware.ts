
// import { NextResponse } from 'next/server';
// import type { NextRequest } from 'next/server';

// export function middleware(request: NextRequest) {
//   console.log('Middleware triggered for:', request.nextUrl.pathname);
  
//   // Handle admin routes
//   if (request.nextUrl.pathname.startsWith('/admin') && 
//       !request.nextUrl.pathname.startsWith('/admin/login')) {
    
//     const adminCookie = request.cookies.get('adminId');
//     let isAdminAuthenticated = false;

//     if (adminCookie?.value) {
//       try {
//         const adminData = JSON.parse(adminCookie.value);
//         isAdminAuthenticated = !!(adminData && adminData.id);
//       } catch (error) {
//         console.error('Error parsing admin cookie:', error);
//         isAdminAuthenticated = false;
//       }
//     }

//     if (!isAdminAuthenticated) {
//       console.log('Redirecting to admin login');
//       return NextResponse.redirect(new URL('/admin/login', request.url));
//     }
    
//     return NextResponse.next();
//   }
  
//   // Handle freelancer routes 
//   if (request.nextUrl.pathname.startsWith('/freelancer')) {
//     const freelancerCookie = request.cookies.get('freelancerId');
//     let isFreelancerAuthenticated = false;

//     if (freelancerCookie?.value) {
//       try {
//         const freelancerData = JSON.parse(freelancerCookie.value);
//         isFreelancerAuthenticated = !!(freelancerData && freelancerData.id);
//       } catch (error) {
//         console.error('Error parsing freelancer cookie:', error);
//         isFreelancerAuthenticated = false;
//       }
//     }

//     if (!isFreelancerAuthenticated) {
//       console.log('Redirecting to freelancer login');
//       return NextResponse.redirect(new URL('/auth/freelancer/login', request.url));
//     }
//   }

//   console.log('Proceeding to the next response');
//   return NextResponse.next();
// }

// // Config for path matching
// export const config = {
//   matcher: [
//     '/freelancer/:path*',  // Protects freelancer routes
//     '/admin/:path*',       // Protects admin routes (excluding /admin/login)
//   ]
// };
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  console.log('Middleware triggered for:', request.nextUrl.pathname);
  
  // Redirect root paths to specific dashboards
  if (request.nextUrl.pathname === '/admin') {
    console.log('Redirecting from /admin to /admin/analytics');
    return NextResponse.redirect(new URL('/admin/analytics', request.url));
  }
  
  if (request.nextUrl.pathname === '/freelancer') {
    console.log('Redirecting from /freelancer to /freelancer/dashboard');
    return NextResponse.redirect(new URL('/freelancer/dashboard', request.url));
  }
  
  // Handle admin routes
  if (request.nextUrl.pathname.startsWith('/admin') && 
      !request.nextUrl.pathname.startsWith('/admin/login')) {
    
    const adminCookie = request.cookies.get('adminId');
    let isAdminAuthenticated = false;

    if (adminCookie?.value) {
      try {
        const adminData = JSON.parse(adminCookie.value);
        isAdminAuthenticated = !!(adminData && adminData.id);
      } catch (error) {
        console.error('Error parsing admin cookie:', error);
        isAdminAuthenticated = false;
      }
    }

    if (!isAdminAuthenticated) {
      console.log('Redirecting to admin login');
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
    
    return NextResponse.next();
  }
  
  // Handle freelancer routes 
  if (request.nextUrl.pathname.startsWith('/freelancer')) {
    const freelancerCookie = request.cookies.get('freelancerId');
    let isFreelancerAuthenticated = false;

    if (freelancerCookie?.value) {
      try {
        const freelancerData = JSON.parse(freelancerCookie.value);
        isFreelancerAuthenticated = !!(freelancerData && freelancerData.id);
      } catch (error) {
        console.error('Error parsing freelancer cookie:', error);
        isFreelancerAuthenticated = false;
      }
    }

    if (!isFreelancerAuthenticated) {
      console.log('Redirecting to freelancer login');
      return NextResponse.redirect(new URL('/auth/freelancer/login', request.url));
    }
  }

  console.log('Proceeding to the next response');
  return NextResponse.next();
}

// Config for path matching
export const config = {
  matcher: [
    '/freelancer',        // Match exact freelancer root path
    '/freelancer/:path*', // Protects freelancer routes
    '/admin',             // Match exact admin root path
    '/admin/:path*',      // Protects admin routes (excluding /admin/login)
  ]
};