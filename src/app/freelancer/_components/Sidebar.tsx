"use client"

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { Upload, X, Plus, User, FolderPlus, Home, LogOut, Menu ,HelpCircle ,Pen} from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import Alert from '@/components/Alert';
const Sidebar = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const params = useParams();
  const freelancerId = params.userid;
  const ProjectId= params.id

  const menuItems = [
    { icon: Home, label: 'Dashboard', href: `/freelancer/dashboard` },
    { icon: FolderPlus, label: 'Clients', href:   `/freelancer/clients`},
    { icon: Plus, label: 'Add New Client', href: `/freelancer/add_new`},
    { icon: Plus, label: 'Create New Delivery', href: `/freelancer/create_new_delivery`},
    { icon: Pen, label: 'Revisions', href: `/freelancer/revisions`},
    { icon: HelpCircle, label: 'Support', href: `/freelancer/support`},
    { icon: User, label: 'Profile', href: `/freelancer/profile` }
  ];


  const NavLink = ({ item, onClick }) => {
    const Icon = item.icon;
    return (
      <Link href={item.href}>
        <motion.a
          onClick={onClick}
          whileHover={{ x: 4 }}
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-600 
                   hover:bg-gray-50 hover:text-black transition-colors relative group"
        >
          <Icon className="w-5 h-5" />
          <span className="font-medium">{item.label}</span>
          <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 
                       rounded-xl transition-opacity" />
        </motion.a>
      </Link>
    );
  };

 
  const [alert, setAlert] = useState({
    show: false,
    message: '',
    type: 'success'
  });

  // const handleLogout = async () => {
   
  //       // Clear auth data
  //       localStorage.removeItem("freelancerId");
        
  //       // Show success alert
  //       setAlert({
  //         show: true,
  //         message: "Logged out successfully",
  //         type: "success"
  //       });
  //       router.push('/auth/freelancer/login');
  
      
  // };


  
// const handleLogout = async () => {
//   try {
//     // Call logout API to clear cookies
//     const response = await fetch('/api/logout', {
//       method: 'POST',
//       credentials: 'include' // Important for cookie handling
//     });

//     if (response.ok) {
//       // Clear localStorage for backward compatibility
//       localStorage.removeItem("freelancerId");
      
//       // Show success alert
//       setAlert({
//         show: true,
//         message: "Logged out successfully",
//         type: "success"
//       });

//       // Redirect to login page
//       router.push('/auth/freelancer/login');
//     } else {
//       setAlert({
//         show: true,
//         message: "Failed to logout. Please try again.",
//         type: "error"
//       });
//     }
//   } catch (error) {
//     console.error('Logout error:', error);
//     setAlert({
//       show: true,
//       message: "An error occurred during logout",
//       type: "error"
//     });
//   }
// };
const handleLogout = async () => {
  try {
    const response = await fetch('/api/logout', {
      method: 'POST',
      credentials: 'include' // Important for cookie handling
    });

    const data = await response.json();

    if (data.success) {
      // Clear localStorage for backward compatibility
      localStorage.removeItem("freelancerId");
      
      setAlert({
        show: true,
        message: data.message || "Logged out successfully",
        type: "success"
      });

      // Redirect to login page
      router.push('/auth/freelancer/login');
    } else {
      setAlert({
        show: true,
        message: data.error || "Failed to logout. Please try again.",
        type: "error"
      });
    }
  } catch (error) {
    console.error('Logout error:', error);
    setAlert({
      show: true,
      message: "An error occurred during logout",
      type: "error"
    });
  }
};

  return (
    <>
     {alert.show && (
        <Alert
          message={alert.message}
          type={alert.type}
          onClose={() => setAlert({ ...alert, show: false })}
        />
      )}
      {/* Mobile Navbar - Highest z-index */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-[9999]">
        <div className="relative bg-white border-b border-gray-100 shadow-sm">
          <div className="flex items-center justify-between px-4 py-3">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 bg-black rounded-lg flex items-center justify-center">
                <span className="text-white text-xl font-bold">W</span>
              </div>
              <span className="font-medium text-gray-900">WorkOnGigs</span>
            </div>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 hover:bg-gray-50 rounded-lg transition-colors"
            >
              {isOpen ? (
                <X className="w-6 h-6 text-gray-600" />
              ) : (
                <Menu className="w-6 h-6 text-gray-600" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              className="absolute top-full left-0 right-0 bg-white border-b border-gray-100 shadow-lg z-[9999]"
            >
              <nav className="p-4">
                <div className="space-y-2">
                  {menuItems.map((item, index) => (
                    <NavLink key={index} item={item} onClick={() => setIsOpen(false)} />
                  ))}
                </div>
              </nav>
              <div className="p-4 border-t border-gray-100">
                <motion.button
                  whileTap={{ scale: 0.98 }}
                  className="w-full flex items-center gap-3 px-4 py-3 text-gray-600 
                           hover:text-red-600 transition-colors rounded-xl hover:bg-red-50 group"
                  onClick={() => {
                    setIsOpen(false);
                    router.push('/auth/freelancer/login');
                  }}
                >
                  <LogOut className="w-5 h-5" />
                  <span className="font-medium">Logout</span>
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Overlay */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/20 z-[9998]"
              style={{ top: '57px' }}
            />
          )}
        </AnimatePresence>
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden md:block">
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="fixed h-screen w-64 bg-white border-r border-gray-100 shadow-lg flex flex-col z-[9999]"
        >
          {/* Logo/Brand */}
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 bg-black rounded-lg flex items-center justify-center">
                <span className="text-white text-xl font-bold">W</span>
              </div>
              <span className="font-medium text-gray-900">WorkOnGigs</span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 p-4">
            <div className="space-y-2">
              {menuItems.map((item, index) => (
                <NavLink key={index} item={item} onClick={() => {}} />
              ))}
            </div>
          </nav>

          {/* Logout Button */}
          <div className="p-4 border-t border-gray-100">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full flex items-center gap-3 px-4 py-3 text-gray-600 
                       hover:text-red-600 transition-colors rounded-xl hover:bg-red-50 group"
              // onClick={() => {
                
              //   // Add your logout logic here
              //   router.push("/auth/freelancer/login")
              // }}
              onClick={handleLogout}
            >
              <LogOut className="w-5 h-5" />
              <span className="font-medium">Logout</span>
            </motion.button>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default Sidebar;