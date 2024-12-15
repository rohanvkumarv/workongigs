"use client"

import React, { useState, useEffect } from 'react';
import { ArrowLeft, Check, X } from 'lucide-react';
import { motion } from 'framer-motion';

const FreelancerSignupPage = () => {
  const [step, setStep] = useState(1);
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
              />
            </motion.div>
          </motion.div>
        );

      default:
        return null;
    }
  };

  const handleSubmit = () => {
    // Client-side validation or future API integration can be added here
    console.log('Form submitted', formData);
    alert('Signup process completed!');
  };

  return (
    <div className="max-w-2xl mx-auto mt-8">
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
        className="rounded-3xl p-8 shadow-sm"
      >
        {renderStep()}

        {/* Navigation */}
        <div className="flex justify-between items-center mt-8">
          {/* Go Back Button */}
          <div
            onClick={() => setStep(step - 1)}
            className={`flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800 rounded-2xl cursor-pointer ${step === 1 ? 'invisible' : ''}`}
          >
            <ArrowLeft size={20} />
            Go back
          </div>

          {/* Next or Submit Button */}
          {step === 2 ? (
            <button
              type="button"
              onClick={handleSubmit}
              className={`px-6 py-2.5 rounded-2xl bg-black text-white hover:bg-gray-800 transition-colors`}
            >
              Complete Signup
            </button>
          ) : (
            <div
              onClick={() => setStep(step + 1)}
              className={`px-6 py-2.5 rounded-2xl transition-colors cursor-pointer ${
                (!formData.email || !formData.password || !formData.confirmPassword || 
                 formData.password !== formData.confirmPassword)
                  ? 'bg-gray-300 cursor-not-allowed'
                  : 'bg-black text-white hover:bg-gray-800'
              }`}
            >
              Next step
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default FreelancerSignupPage;