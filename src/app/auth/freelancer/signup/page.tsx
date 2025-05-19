
"use client";

import React, { useState, useEffect } from 'react';
import { ArrowLeft, Check, X } from 'lucide-react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Alert from '@/components/Alert';

const FreelancerSignupPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [alert, setAlert] = useState(null);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    otp: ''
  });
  const [passwordStrength, setPasswordStrength] = useState({
    hasLength: false,
    hasUppercase: false,
    hasLowercase: false,
    hasNumber: false,
    hasSpecial: false
  });
  const [otpSent, setOtpSent] = useState(false);

  const showAlert = (message, type = 'success') => {
    setAlert({ message, type });
    // Auto dismiss after 3 seconds
    setTimeout(() => {
      setAlert(null);
    }, 3000);
  };

  useEffect(() => {
    const checkPasswordStrength = (password) => {
      setPasswordStrength({
        hasLength: password.length >= 8,
        hasUppercase: /[A-Z]/.test(password),
        hasLowercase: /[a-z]/.test(password),
        hasNumber: /[0-9]/.test(password),
        hasSpecial: /[!@#$%^&*(),.?":{}|<>]/.test(password)
      });
    };

    checkPasswordStrength(formData.password);
  }, [formData.password]);

  const renderPasswordCheck = (condition, text) => (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="flex items-center gap-2 text-sm"
    >
      {condition ? 
        <Check size={16} className="text-green-500" /> : 
        <X size={16} className="text-gray-300" />}
      <span className={condition ? "text-green-500" : "text-gray-400"}>{text}</span>
    </motion.div>
  );

  const handleSendOtp = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/send-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: formData.email }),
      });
      const data = await res.json();
      
      if (data.success) {
        showAlert('OTP sent successfully!', 'success');
        setOtpSent(true);
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

  

// const handleVerifyOtp = async () => {
//   try {
//     setLoading(true);
//     const res = await fetch('/api/verify-otp-and-create-user', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       credentials: 'include', // Important for cookies
//       body: JSON.stringify({
//         email: formData.email,
//         otp: formData.otp,
//         password: formData.password,
//       }),
//     });
  
//     const data = await res.json();
//     if (data.success) {
//       showAlert('Account created successfully!', 'success');
      
//       if (data.freelancerId) {
//         // Optional: Keep localStorage for backward compatibility
//         localStorage.setItem("freelancerId", data.freelancerId);
        
//         // Short delay before redirect to show success message
//         setTimeout(() => {
//           router.push(`/freelancer/${data.freelancerId}/add_new`);
//         }, 1500);
//       }
//     } else {
//       showAlert(data.error || 'Invalid OTP or failed to create account', 'error');
//     }
//   } catch (error) {
//     showAlert('An error occurred during verification', 'error');
//   } finally {
//     setLoading(false);
//   }
// };

const handleVerifyOtp = async () => {
  try {
    setLoading(true);
    const response = await fetch('/api/verify-otp-and-create-user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include', // Important for cookies
      body: JSON.stringify({
        email: formData.email,
        otp: formData.otp,
        password: formData.password,
      }),
    });
  
    const data = await response.json();

    if (data.success) {
      showAlert('success', 'Success', 'Account created successfully!');
      
      if (data.freelancer?.id) {
      
        // Short delay before redirect to show success message
        setTimeout(() => {
          router.push(`/freelancer/clients`);
        }, 1500);
      }
    } else {
      showAlert('error', 'Error', data.error || 'Invalid OTP or failed to create account');
    }
  } catch (error) {
    console.error('Verification error:', error);
    showAlert('error', 'Error', 'An error occurred during verification');
  } finally {
    setLoading(false);
  }
};

  const handleSubmit = (e) => {
    e.preventDefault();
    if (step === 1) {
      const isPasswordValid = Object.values(passwordStrength).every(Boolean);
      if (!isPasswordValid) {
        showAlert('Please meet all password requirements', 'error');
        return;
      }
      if (formData.password !== formData.confirmPassword) {
        showAlert('Passwords do not match', 'error');
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
              <p className="text-gray-500 mt-2">Enter your details to get started</p>
            </div>

            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
              >
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full p-3.5 rounded-2xl border border-gray-200 bg-white focus:outline-none focus:border-gray-300"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  disabled={loading}
                />
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="space-y-4"
              >
                <input
                  type="password"
                  placeholder="Password"
                  className="w-full p-3.5 rounded-2xl border border-gray-200 bg-white focus:outline-none focus:border-gray-300"
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  disabled={loading}
                />
                
                <input
                  type="password"
                  placeholder="Confirm Password"
                  className={`w-full p-3.5 rounded-2xl border bg-white focus:outline-none ${
                    formData.confirmPassword && formData.password !== formData.confirmPassword 
                      ? 'border-red-300 focus:border-red-400' 
                      : 'border-gray-200 focus:border-gray-300'
                  }`}
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                  disabled={loading}
                />

                <div className="bg-gray-50 p-4 rounded-xl space-y-2">
                  {renderPasswordCheck(passwordStrength.hasLength, "At least 8 characters")}
                  {renderPasswordCheck(passwordStrength.hasUppercase, "One uppercase letter")}
                  {renderPasswordCheck(passwordStrength.hasLowercase, "One lowercase letter")}
                  {renderPasswordCheck(passwordStrength.hasNumber, "One number")}
                  {renderPasswordCheck(passwordStrength.hasSpecial, "One special character")}
                </div>
              </motion.div>
            </div>
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
              <p className="text-gray-500 mt-2">Enter the OTP sent to {formData.email}</p>
            </div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <input
                type="text"
                placeholder="Enter OTP"
                className="w-full p-3.5 rounded-2xl border border-gray-200 bg-white focus:outline-none focus:border-gray-300"
                value={formData.otp}
                onChange={(e) => setFormData({...formData, otp: e.target.value})}
                disabled={loading}
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
          className="px-6 py-2.5 rounded-2xl bg-black text-white hover:bg-gray-800 transition-colors"
        >
          Complete Signup
        </button>
      );
    }

    const isDisabled = !formData.email || !formData.password || 
                      !formData.confirmPassword || 
                      formData.password !== formData.confirmPassword ||
                      !Object.values(passwordStrength).every(Boolean);
    
    return (
      <button
        type="submit"
        disabled={isDisabled}
        className={`px-6 py-2.5 rounded-2xl transition-colors ${
          isDisabled 
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

        {/* Navigation */}
        <div className="flex justify-between items-center mt-8">
          {/* Go Back Button */}
          <div
            onClick={() => !loading && setStep(step - 1)}
            className={`flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800 rounded-2xl cursor-pointer ${
              step === 1 || loading ? 'invisible' : ''
            }`}
          >
            <ArrowLeft size={20} />
            Go back
          </div>

          {/* Next or Submit Button */}
          {renderButton()}
        </div>
      </form>
    </div>
  );
};

export default FreelancerSignupPage;