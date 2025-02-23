// "ise client"
// import DashboardContent from "./_components/DashboardContent"
// // export default function DashboardPage() {
// //   return <DashboardContent />;
// // }
// import React from 'react'

// const Page  = () => {
//   return <DashboardContent />;
// }

// export default Page 
"use client";

import DashboardContent from "./_components/DashboardContent";
import { NotificationProvider } from "@/components/NotificationProvider";

const Page = () => {
  return (
    <NotificationProvider>
      <DashboardContent />
    </NotificationProvider>
  );
};

export default Page;