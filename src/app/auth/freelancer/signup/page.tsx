
"use client";

import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Alert from '@/components/Alert';

const FreelancerSignupPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [alert, setAlert] = useState(null);
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');

  const showAlert = (message, type = 'success') => {
    setAlert({ message, type });
    setTimeout(() => {
      setAlert(null);
    }, 3000);
  };

  const handleSendOtp = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/send-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();

      if (data.success) {
        showAlert('OTP sent successfully!', 'success');
        setStep(2);
      } else {
        showAlert(data.error || 'Failed to send OTP', 'error');
      }
    } catch (error) {
      showAlert('An error occurred while sending OTP', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/verify-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ email, otp }),
      });

      const data = await response.json();

      if (data.success) {
        showAlert('Account created successfully!', 'success');

        if (data.freelancer?.id) {
          setTimeout(() => {
            router.push(`/freelancer/clients`);
          }, 1500);
        }
      } else {
        showAlert(data.error || 'Invalid OTP or failed to create account', 'error');
      }
    } catch (error) {
      console.error('Verification error:', error);
      showAlert('An error occurred during verification', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (step === 1) {
      if (!email) {
        showAlert('Please enter your email', 'error');
        return;
      }
      handleSendOtp();
    } else if (step === 2) {
      handleVerifyOtp();
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6 pt-8"
          >
            <div className="mb-8">
              <h1 className="text-2xl font-bold text-gray-900">Create your account</h1>
              <p className="text-gray-500 mt-2">Enter your email to get started</p>
            </div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              <input
                type="email"
                placeholder="Email"
                className="w-full p-3.5 rounded-2xl border border-gray-200 bg-white focus:outline-none focus:border-gray-300"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
                autoFocus
              />
            </motion.div>
          </motion.div>
        );

      case 2:
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6 pt-8"
          >
            <div className="mb-8">
              <h1 className="text-2xl font-bold text-gray-900">Verify Your Email</h1>
              <p className="text-gray-500 mt-2">Enter the OTP sent to {email}</p>
            </div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <input
                type="text"
                placeholder="Enter OTP"
                className="w-full p-3.5 rounded-2xl border border-gray-200 bg-white focus:outline-none focus:border-gray-300 text-center text-2xl tracking-widest"
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                disabled={loading}
                maxLength={6}
                autoFocus
              />
            </motion.div>

            <p className="text-sm text-gray-500 mt-4">
              Didn't receive the code?{' '}
              <button
                type="button"
                onClick={handleSendOtp}
                disabled={loading}
                className="text-black hover:underline disabled:text-gray-400"
              >
                Resend OTP
              </button>
            </p>
          </motion.div>
        );

      default:
        return null;
    }
  };

  const renderButton = () => {
    if (loading) {
      return (
        <button
          disabled
          className="px-6 py-2.5 rounded-2xl bg-gray-400 text-white cursor-not-allowed"
        >
          Loading...
        </button>
      );
    }

    if (step === 2) {
      return (
        <button
          type="submit"
          disabled={otp.length !== 6}
          className={`px-6 py-2.5 rounded-2xl transition-colors ${
            otp.length !== 6
              ? 'bg-gray-300 cursor-not-allowed'
              : 'bg-black text-white hover:bg-gray-800'
          }`}
        >
          Complete Signup
        </button>
      );
    }

    return (
      <button
        type="submit"
        disabled={!email}
        className={`px-6 py-2.5 rounded-2xl transition-colors ${
          !email
            ? 'bg-gray-300 cursor-not-allowed'
            : 'bg-black text-white hover:bg-gray-800'
        }`}
      >
        Next step
      </button>
    );
  };

  return (
    <div className="max-w-2xl mx-auto mt-8">
      {alert && (
        <Alert
          message={alert.message}
          type={alert.type}
          onClose={() => setAlert(null)}
        />
      )}

      <form
        onSubmit={handleSubmit}
        className="rounded-3xl p-8 shadow-sm"
      >
        {renderStep()}

        <div className="flex justify-between items-center mt-8">
          <div
            onClick={() => !loading && setStep(step - 1)}
            className={`flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800 rounded-2xl cursor-pointer ${
              step === 1 || loading ? 'invisible' : ''
            }`}
          >
            <ArrowLeft size={20} />
            Go back
          </div>

          {renderButton()}
        </div>
      </form>
    </div>
  );
};

export default FreelancerSignupPage;
