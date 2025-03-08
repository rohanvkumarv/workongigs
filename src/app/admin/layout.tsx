

import "@/app/globals.css"
import DashboardLayout from "./_components/DashboardLayout" // Import the new layout component

import { AuthProvider } from '@/context/authContext';

export const metadata = {
  title: "WorkOnGigs",
  description: "Future Of Freelancing",
  icons: {
    icon: 'favicon-32x32.png', 
   
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