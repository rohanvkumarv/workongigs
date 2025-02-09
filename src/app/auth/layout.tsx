
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
// import "./globals.css";
import "@/app/globals.css"
import { i } from "framer-motion/client";
import { AuthProvider } from '@/context/authContext';


export const metadata = {
  title: "WorkOnGigs",
  description: "Future Of Freelancing",
  icons: {
    icon: 'favicon-32x32.png', // /public/icon.png
    // shortcut: '/shortcut-icon.png', // /public/shortcut-icon.png
   
  },
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
