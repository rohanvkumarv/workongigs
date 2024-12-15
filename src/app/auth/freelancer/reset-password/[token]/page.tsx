"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Check, X, Eye, EyeOff, ArrowLeft } from 'lucide-react';

const ResetPasswordPage = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [validationState, setValidationState] = useState({
    minLength: false,
    hasUpperCase: false,
    hasLowerCase: false,
    hasNumber: false,
    hasSpecial: false
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  // Validate password in real-time
  useEffect(() => {
    setValidationState({
      minLength: newPassword.length >= 8,
      hasUpperCase: /[A-Z]/.test(newPassword),
      hasLowerCase: /[a-z]/.test(newPassword),
      hasNumber: /[0-9]/.test(newPassword),
      hasSpecial: /[^A-Za-z0-9]/.test(newPassword),
    });
  }, [newPassword]);

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

  const handlePasswordReset = () => {
    // Basic client-side validation
    if (!Object.values(validationState).every(Boolean)) {
      setErrorMessage('Please meet all password requirements');
      return;
    }

    if (newPassword !== confirmPassword) {
      setErrorMessage('Passwords do not match');
      return;
    }

    // Here you would typically add your password reset logic
    console.log('Password reset attempted');
    alert('Password reset functionality to be implemented');
  };

  return (
    <div className="max-w-2xl mx-auto mt-24">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handlePasswordReset();
        }}
        className="rounded-3xl p-8 shadow-sm"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6 pt-8"
        >
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900">Reset Your Password</h1>
            <p className="text-gray-500 mt-2">Enter your new password below</p>
          </div>

          <div className="space-y-4">
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="New Password"
                className="w-full p-3.5 rounded-2xl border border-gray-200 bg-white focus:outline-none focus:border-gray-300 pr-10"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            <input
              type={showPassword ? "text" : "password"}
              placeholder="Confirm New Password"
              className={`w-full p-3.5 rounded-2xl border bg-white focus:outline-none ${
                confirmPassword && newPassword !== confirmPassword
                  ? 'border-red-300 focus:border-red-400'
                  : 'border-gray-200 focus:border-gray-300'
              }`}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />

            {errorMessage && (
              <div className="bg-red-50 p-3 rounded-xl text-red-600 text-sm">
                {errorMessage}
              </div>
            )}

            <div className="bg-gray-50 p-4 rounded-xl space-y-2">
              {renderPasswordCheck(validationState.minLength, "At least 8 characters")}
              {renderPasswordCheck(validationState.hasUpperCase, "One uppercase letter")}
              {renderPasswordCheck(validationState.hasLowerCase, "One lowercase letter")}
              {renderPasswordCheck(validationState.hasNumber, "One number")}
              {renderPasswordCheck(validationState.hasSpecial, "One special character")}
            </div>
          </div>
        </motion.div>

        <div className="flex justify-between items-center mt-8">
          <div
            onClick={() => {/* Handle go back */}}
            className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800 rounded-2xl cursor-pointer"
          >
            <ArrowLeft size={20} />
            Go back
          </div>

          <button
            type="submit"
            className={`px-6 py-2.5 rounded-2xl transition-colors ${
              (!newPassword || !confirmPassword || 
               !Object.values(validationState).every(Boolean))
                ? 'bg-gray-300 cursor-not-allowed'
                : 'bg-black text-white hover:bg-gray-800'
            }`}
            disabled={
              !newPassword || !confirmPassword || 
              !Object.values(validationState).every(Boolean)
            }
          >
            Reset Password
          </button>
        </div>
      </form>
    </div>
  );
};

export default ResetPasswordPage;