
"use client"

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { 
  Upload, 
  X, 
  Plus, 
  User, 
  FolderPlus, 
  Home, 
  LogOut, 
  Menu, 
  BarChart3, 
  FileText, 
  Users, 
  Package, 
  UserPlus, 
  Bell, 
  CreditCard, 
  Layout
} from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import Alert from '@/components/Alert';
import { useAuth } from '@/context/authContext';

const Sidebar = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const { email, isFreelancer, isAdmin, logoutAdmin, logoutAll, logoutFreelancer } = useAuth();

  // Updated menu items with only the new admin links from the image
  const menuItems = [
    { icon: Home, label: 'Dashboard', href: `/admin/dashboard` },
    
    { icon: BarChart3, label: 'Analytics', href: `/admin/analytics` },
    { icon: FileText, label: 'Blogs', href: `/admin/blogs` },
    { icon: Users, label: 'Clients', href: `/admin/clients` },
    { icon: Package, label: 'Deliveries', href: `/admin/deliveries` },
    { icon: UserPlus, label: 'Freelancers', href: `/admin/freelancers` },
    { icon: Bell, label: 'Notifications', href: `/admin/notifications` },
    { icon: CreditCard, label: 'Payments', href: `/admin/payments` },
    
  ];

  const NavLink = ({ item, onClick }) => {
    const Icon = item.icon;
    const isActive = item.label.toLowerCase() === '_components' || 
                     item.href.includes('layouts.tsx');
                     
    return (
      <Link href={item.href}>
        <motion.a
          onClick={onClick}
          whileHover={{ x: 4 }}
          className={`flex items-center gap-3 px-4 py-3 rounded-xl 
                   transition-colors relative group
                   ${isActive 
                      ? 'text-indigo-600 bg-indigo-50 font-medium'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-black'}`}
        >
          <Icon className="w-5 h-5" />
          <span className="font-medium">{item.label}</span>
          <div className={`absolute inset-0 ${isActive ? 'bg-indigo-100/50' : 'bg-black/5'} 
                        opacity-0 group-hover:opacity-100 rounded-xl transition-opacity`} />
        </motion.a>
      </Link>
    );
  };

  const [alert, setAlert] = useState({
    show: false,
    message: '',
    type: 'success'
  });

  const handleLogout = async () => {
    try {
      await logoutAdmin();
      
      setAlert({
        show: true,
        message: 'Successfully logged out',
        type: 'success'
      });
      
      setTimeout(() => {
        router.push('/auth/admin/login');
      }, 1000);
    } catch (error) {
      setAlert({
        show: true,
        message: 'Logout failed. Please try again.',
        type: 'error'
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
              <div className="h-10 w-10 bg-gradient-to-br from-purple-600 to-blue-500 rounded-lg flex items-center justify-center">
                <span className="text-white text-xl font-bold">W</span>
              </div>
              <span className="font-semibold text-gray-900">Admin Panel</span>
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
                    handleLogout();
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
          className="fixed h-screen w-64 bg-white border-r border-gray-100 shadow-xl flex flex-col z-[9999] overflow-hidden"
        >
          {/* Background pattern */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000008_1px,transparent_1px),linear-gradient(to_bottom,#00000008_1px,transparent_1px)] bg-[size:24px_24px]" />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/[0.01] to-transparent" />
          </div>
          {/* Combined Header with Logo and User Info */}
          <div className="pt-6 pb-4 px-6 border-b border-gray-100 relative">
            {/* Logo/Brand with subtle background glow */}
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-3 relative">
                <div className="h-10 w-10 bg-gradient-to-br from-purple-600 to-blue-500 rounded-lg flex items-center justify-center shadow-md relative z-10">
                  <span className="text-white text-xl font-bold">W</span>
                  <div className="absolute -inset-1 bg-purple-500/20 blur-md rounded-lg -z-10"></div>
                </div>
                <span className="font-semibold text-gray-900 text-lg">Admin Panel</span>
              </div>
              
              {/* Status indicator */}
              {/* <div className="flex items-center gap-2">
                <span className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></span>
                <span className="text-xs text-gray-500">Online</span>
              </div> */}
            </div>
            
            {/* User info with premium card styling */}
            <div className="bg-gradient-to-r from-gray-50 to-white rounded-xl p-3 border border-gray-100 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="h-10 w-10 bg-gradient-to-br from-purple-100 to-blue-100 rounded-full flex items-center justify-center shadow-sm">
                    <User className="w-5 h-5 text-purple-600" />
                  </div>
                  <div className="absolute -bottom-1 -right-1 h-4 w-4 bg-green-500 rounded-full border-2 border-white"></div>
                </div>
                <div>
                  <p className="font-medium text-sm text-gray-900">
                    {email ? email.split('@')[0] : 'Admin'}
                  </p>
                  <div className="flex items-center gap-1">
                    <p className="text-xs text-gray-500">Administrator</p>
                    {/* <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                      Pro
                    </span> */}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 p-4 overflow-y-auto">
            <div className="space-y-1">
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
              onClick={() => handleLogout()}
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