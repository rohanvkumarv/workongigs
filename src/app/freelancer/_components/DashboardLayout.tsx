"use client"

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Sidebar from './Sidebar';
// Updated Layout Component
export default function DashboardLayout({ 
  children 
}: { 
  children: React.ReactNode 
}) {
  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Fixed Sidebar */}
      <div className="fixed inset-y-0 left-0 z-50">
        <Sidebar />
      </div>
      
      {/* Main Content - Scrollable */}
      <div className="flex-1 ml-64 overflow-y-auto">
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
}