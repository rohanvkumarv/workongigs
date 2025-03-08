// app/admin/login/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Shield, Lock } from 'lucide-react';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  // Animation effect when component mounts
  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      
      const data = await response.json();
      
      if (data.success) {
        router.push('/admin');
      } else {
        setError(data.error || 'Failed to login');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative bg-white overflow-hidden">
      {/* Background Pattern - using the same pattern from your other components */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000008_1px,transparent_1px),linear-gradient(to_bottom,#00000008_1px,transparent_1px)] bg-[size:24px_24px]" />
      </div>
      
      {/* Gradient Orbs - similar to your Hero component */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 -right-40 w-80 h-80 rounded-full 
                     bg-gradient-to-br from-black/5 to-transparent blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full 
                     bg-gradient-to-tr from-black/5 to-transparent blur-3xl" />
      </div>

      {/* Logo and Navigation */}
      <header className="relative z-10 max-w-7xl mx-auto px-4 pt-6">
        <Link href="/">
          <div className="flex items-center gap-2 w-fit">
            <div className="h-10 w-10 bg-black rounded-xl flex items-center justify-center">
              <span className="text-white text-xl font-bold">W</span>
            </div>
            <span className="text-xl font-bold">WorkOnGigs</span>
          </div>
        </Link>
      </header>

      {/* Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-18 flex min-h-[calc(100vh-80px)] items-center justify-center">
        <div className="w-full max-w-4xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: mounted ? 1 : 0, y: mounted ? 0 : 20 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden"
          >
            <div className="flex flex-col md:flex-row">
              {/* Left Side - Form */}
              <div className="w-full md:w-1/2 p-8 md:p-10">
                <div className="mb-8">
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Login</h1>
                  <p className="text-gray-600">Access your admin dashboard</p>
                </div>
                
                {error && (
                  <div className="mb-6 p-4 rounded-lg bg-red-50 text-red-600 border border-red-100">
                    <p>{error}</p>
                  </div>
                )}
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                      Email Address
                    </label>
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                      placeholder="admin@workongigs.com"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                      Password
                    </label>
                    <input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                      placeholder="••••••••"
                      required
                    />
                  </div>
                  
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 px-4 rounded-xl font-medium bg-black text-white hover:bg-gray-900 transition-all duration-300 flex items-center justify-center gap-2 group"
                  >
                    {loading ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Signing in...
                      </>
                    ) : (
                      <>
                        Sign in
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </button>
                </form>
                
                <div className="mt-8 text-center">
                  <Link 
                    href="/" 
                    className="text-sm text-gray-600 hover:text-black transition-colors"
                  >
                    Return to homepage
                  </Link>
                </div>
              </div>
              
              {/* Right Side - Info */}
              <div className="hidden md:block w-1/2 bg-gray-50 p-10">
                <div className="h-full flex flex-col">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Admin Dashboard</h2>
                  
                  <div className="space-y-6 mb-8">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-black/5 flex items-center justify-center flex-shrink-0">
                        <Shield className="w-5 h-5 text-gray-700" />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">Manage Freelancers</h3>
                        <p className="text-sm text-gray-600">Access to all freelancer accounts and activities</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-black/5 flex items-center justify-center flex-shrink-0">
                        <Lock className="w-5 h-5 text-gray-700" />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">Secure Administration</h3>
                        <p className="text-sm text-gray-600">Protected access to system configuration and settings</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-auto">
                    <p className="text-sm text-gray-500">
                      This admin portal is for authorized personnel only. 
                      If you're a freelancer, please use the regular login.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}