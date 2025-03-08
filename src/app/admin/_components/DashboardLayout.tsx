

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