// // "use client"

// // import { useState, useEffect } from 'react';
// // import { motion } from 'framer-motion';
// // import Sidebar from './Sidebar';
// // // Updated Layout Component
// // export default function DashboardLayout({ 
// //   children 
// // }: { 
// //   children: React.ReactNode 
// // }) {
// //   return (
// //     <div className="flex h-screen bg-gray-50 overflow-hidden">
// //       {/* Fixed Sidebar */}
// //       <div className="fixed inset-y-0 left-0 z-50">
// //         <Sidebar />
// //       </div>
      
// //       {/* Main Content - Scrollable */}
// //       <div className="flex-1 ml-64 overflow-y-auto">
// //         <main className="p-6">
// //           {children}
// //         </main>
// //       </div>
// //     </div>
// //   );
// // }

// // DashboardLayout.tsx
// "use client"

// import { useState, useEffect } from 'react';
// import { motion } from 'framer-motion';

// export default function DashboardLayout({ 
//   children 
// }: { 
//   children: React.ReactNode 
// }) {
//   return (
//     <div className="flex min-h-screen bg-gray-50">
//       {/* Sidebar */}
//       <div className="sticky top-0 h-screen">
//         <Sidebar />
//       </div>
      
//       {/* Main Content */}
//       <div className="flex-1 min-w-0">
//         <main className="p-6">
//           {children}
//         </main>
//       </div>
//     </div>
//   );
// }

// DashboardLayout.tsx
"use client"

import { useState } from 'react';
// import Navbar from './Navbar';
import Sidebar from './Sidebar';

export default function DashboardLayout({ 
  children 
}: { 
  children: React.ReactNode 
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar/Sidebar Container with highest z-index */}
      <div className="relative z-[9999]">
        <Sidebar />
      </div>
      
      {/* Main Content Area */}
      <div className="md:pl-64"> {/* Add padding for sidebar on desktop */}
        {/* Mobile top spacing */}
        <div className="h-[57px] md:h-0" />
        
        {/* Content */}
        <main className="relative z-[1]">
          {children}
        </main>
      </div>
    </div>
  );
}