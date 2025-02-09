
// import "@/app/globals.css"
//  // Adjust path as needed
// import Sidebar from "./_components/Sidebar";
// export default function AuthLayout({ children }: { children: React.ReactNode }) {
//   return (
//     <html lang="en">
//       <body className={` flex min-h-screen bg-gray-50`}>
//         {/* Sidebar */}
//         <Sidebar />

//         {/* Main Content Area */}
//         <div className="flex-1 md:pl-12 p-6 mt-10 md:mt-0">{children}</div>
//       </body>
//     </html>
//   );
// }

// // import "@/app/globals.css"
// // import { DashboardLayout } from "./_components/DashboardLayout";

// // export default function AuthLayout({ children }: { children: React.ReactNode }) {
// //   return (
// //     <html lang="en">
// //       <body>
// //         <DashboardLayout>{children}</DashboardLayout>
// //       </body>
// //     </html>
// //   );
// // }

import "@/app/globals.css"
import DashboardLayout from "./_components/DashboardLayout" // Import the new layout component
import Sidebar from "./_components/Sidebar";

import { AuthProvider } from '@/context/authContext';

export const metadata = {
  title: "WorkOnGigs",
  description: "Future Of Freelancing",
  icons: {
    icon: 'favicon-32x32.png', // /public/icon.png
    // shortcut: '/shortcut-icon.png', // /public/shortcut-icon.png
   
  },
};

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
      <AuthProvider>
        <DashboardLayout>
          {children}
        </DashboardLayout>
      </AuthProvider>
      </body>
    </html>
  );
}