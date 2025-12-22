"use client"
import React, { useState } from 'react';
import { Mail, ArrowRight, Loader } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

const UnifiedAuthPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState<'email' | 'otp'>('email');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [alert, setAlert] = useState<{ show: boolean; type: 'success' | 'error'; message: string }>({ 
    show: false, 
    type: 'success', 
    message: '' 
  });

  const showAlert = (type: 'success' | 'error', message: string) => {
    setAlert({ show: true, type, message });
    setTimeout(() => setAlert({ show: false, type: 'success', message: '' }), 5000);
  };

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      showAlert('error', 'Please enter your email');
      return;
    }

    try {
      setLoading(true);
      const response = await fetch("/api/send-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (data.success) {
        showAlert('success', 'OTP sent to your email!');
        setStep('otp');
      } else {
        showAlert('error', data.error || 'Failed to send OTP. Please try again.');
      }
    } catch (error) {
      console.error('Send OTP error:', error);
      showAlert('error', 'An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!otp) {
      showAlert('error', 'Please enter the OTP');
      return;
    }

    try {
      setLoading(true);
      const response = await fetch("/api/verify-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: 'include',
        body: JSON.stringify({ email, otp }),
      });

      const data = await response.json();

      if (data.success) {
        showAlert('success', 'Success! Redirecting...');
        setTimeout(() => {
          router.push('/freelancer/clients');
        }, 1000);
      } else {
        showAlert('error', data.error || 'Invalid OTP. Please try again.');
      }
    } catch (error) {
      console.error('Verify OTP error:', error);
      showAlert('error', 'An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/send-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (data.success) {
        showAlert('success', 'New OTP sent to your email!');
      } else {
        showAlert('error', data.error || 'Failed to resend OTP.');
      }
    } catch (error) {
      console.error('Resend OTP error:', error);
      showAlert('error', 'An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-24">
      {/* Alert */}
      <AnimatePresence>
        {alert.show && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`fixed top-4 right-4 p-4 rounded-lg shadow-lg border z-50 ${
              alert.type === 'success' ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'
            }`}
          >
            <p className={`font-medium ${
              alert.type === 'success' ? 'text-green-800' : 'text-red-800'
            }`}>{alert.message}</p>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="rounded-3xl p-8 shadow-sm">
        <AnimatePresence mode="wait">
          {step === 'email' ? (
            <motion.div
              key="email-step"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="space-y-6"
            >
              <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-900">Welcome</h1>
                <p className="text-gray-500 mt-2">Enter your email to continue</p>
              </div>

              <form onSubmit={handleSendOtp} className="space-y-6">
                <div className="relative">
                  <Mail 
                    size={20} 
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                  />
                  <input
                    type="email"
                    placeholder="Email address"
                    className="w-full p-3.5 pl-12 rounded-2xl border border-gray-200 bg-white focus:outline-none focus:border-gray-300 transition-colors"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={loading}
                    autoFocus
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading || !email}
                  className="w-full px-6 py-3 bg-black text-white rounded-2xl hover:bg-gray-800 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <Loader className="animate-spin" size={20} />
                      Sending OTP...
                    </>
                  ) : (
                    <>
                      Continue
                      <ArrowRight size={20} />
                    </>
                  )}
                </button>
              </form>
            </motion.div>
          ) : (
            <motion.div
              key="otp-step"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-900">Verify your email</h1>
                <p className="text-gray-500 mt-2">
                  We sent a code to <span className="font-medium text-gray-700">{email}</span>
                </p>
              </div>

              <form onSubmit={handleVerifyOtp} className="space-y-6">
                <div>
                  <input
                    type="text"
                    placeholder="Enter 6-digit code"
                    className="w-full p-3.5 rounded-2xl border border-gray-200 bg-white focus:outline-none focus:border-gray-300 text-center text-2xl tracking-widest transition-colors"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                    required
                    disabled={loading}
                    maxLength={6}
                    autoFocus
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading || otp.length !== 6}
                  className="w-full px-6 py-3 bg-black text-white rounded-2xl hover:bg-gray-800 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <Loader className="animate-spin" size={20} />
                      Verifying...
                    </>
                  ) : (
                    'Verify & Continue'
                  )}
                </button>

                <div className="flex items-center justify-between text-sm">
                  <button
                    type="button"
                    onClick={() => {
                      setStep('email');
                      setOtp('');
                    }}
                    disabled={loading}
                    className="text-gray-600 hover:text-gray-800 disabled:text-gray-400 transition-colors"
                  >
                    ← Change email
                  </button>
                  
                  <button
                    type="button"
                    onClick={handleResendOtp}
                    disabled={loading}
                    className="text-black hover:underline disabled:text-gray-400 font-medium transition-colors"
                  >
                    Resend code
                  </button>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default UnifiedAuthPage;