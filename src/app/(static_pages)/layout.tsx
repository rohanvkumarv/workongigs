
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
// import "./globals.css";
import "@/app/globals.css"
import { i } from "framer-motion/client";

import { AuthProvider } from '@/context/authContext';


export const metadata = {
  title: "My Next.js App",
  description: "A sample Next.js application",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
      <AuthProvider>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-grow p-4">{children}</main>
          <Footer />
          
        </div>
        </AuthProvider>
      </body>
    </html>
  );
}
