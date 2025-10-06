
'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Shield, Lock, CheckCircle, Users, Bell, Info, Rocket, Loader2, Copy, Check } from 'lucide-react';
import FileUploadComponent from '@/app/freelancer/_components/FileUploadComponent';
import { generatePreviewUrl } from '@/app/utils/previewUtils';

const Hero = () => {
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [previewLink, setPreviewLink] = useState('');
  const [linkCopied, setLinkCopied] = useState(false);
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    clientName: '',
    deliveryName: '',
    deliveryCost: ''
  });
  
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [totalFilesSelected, setTotalFilesSelected] = useState(0);
  const [filesUploadingCount, setFilesUploadingCount] = useState(0);
  const [uploadErrors, setUploadErrors] = useState([]);

  const isUploadingFiles = filesUploadingCount > 0;
  const hasFilesSelected = totalFilesSelected > 0;
  const allFilesUploaded = hasFilesSelected && uploadedFiles.length === totalFilesSelected && !isUploadingFiles;
  const hasUploadErrors = uploadErrors.length > 0;
  
  const canSubmit = !isUploadingFiles && !loading && (
    !hasFilesSelected || (allFilesUploaded && !hasUploadErrors)
  );

  const handleFilesSelected = (files) => {
    setTotalFilesSelected(prev => prev + files.length);
    setFilesUploadingCount(prev => prev + files.length);
    setUploadErrors([]);
  };

  const handleUploadError = (file, error) => {
    setUploadErrors(prev => [...prev, { fileName: file.name, error: error.message }]);
    setFilesUploadingCount(prev => Math.max(0, prev - 1));
  };

  const handleUploadComplete = (fileInfo) => {
    setUploadedFiles(prev => [...prev, fileInfo]);
    setFilesUploadingCount(prev => Math.max(0, prev - 1));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(previewLink);
      setLinkCopied(true);
      setTimeout(() => setLinkCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!formData.email || !formData.password || !formData.clientName || 
        !formData.deliveryName || !formData.deliveryCost) {
      setError('Please fill in all required fields');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    if (isUploadingFiles) {
      setError('Please wait for files to finish uploading');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/onboard/quick-start', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          files: uploadedFiles
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create account');
      }

      const link = generatePreviewUrl(data.data.clientId, data.data.deliveryName);
      setPreviewLink(link);
      setShowSuccess(true);

      setTimeout(() => {
        window.location.href = '/freelancer/dashboard';
      }, 3000);

    } catch (err) {
      console.error('Onboard error:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const FeatureStrip = () => {
    const features = [
      { label: 'Safe', icon: Shield, desc: 'Bank-grade security' },
      { label: 'Secure', icon: Lock, desc: 'End-to-end encryption' },
      { label: 'Reliable', icon: CheckCircle, desc: '99.9% uptime' }
    ];

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-xl p-4 shadow-md border border-gray-100"
      >
        <div className="flex justify-between items-center divide-x divide-gray-200">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div key={index} className="flex-1 px-4 first:pl-0 last:pr-0 text-center group">
                <div className="flex flex-col items-center gap-2">
                  <div className="w-10 h-10 rounded-lg bg-black/5 flex items-center justify-center
                              group-hover:bg-black group-hover:text-white transition-colors duration-300">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900">{feature.label}</h3>
                    <p className="text-xs text-gray-500 mt-0.5">{feature.desc}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>
    );
  };

  return (
    <div className="relative min-h-screen bg-white" id="home">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000008_1px,transparent_1px),linear-gradient(to_bottom,#00000008_1px,transparent_1px)] bg-[size:24px_24px]" />
      </div>
      
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 -right-40 w-80 h-80 rounded-full 
                     bg-gradient-to-br from-black/5 to-transparent blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full 
                     bg-gradient-to-tr from-black/5 to-transparent blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 relative">
        <div className="min-h-screen pt-28 pb-12 flex items-center">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center w-full">
            
            {/* Left Side - Content */}
            <div className="space-y-5">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <span className="px-4 py-2 rounded-full bg-black/5 text-gray-700 
                             text-sm font-medium inline-block">
                  Welcome to the Future of Freelancing
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900"
              >
                Say hello to{" "}
                <span className="relative inline-block">
                  WorkOnGigs
                  <motion.div
                    className="absolute -bottom-2 left-0 right-0 h-1 bg-black rounded-full"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                  />
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-base sm:text-lg text-gray-600"
              >
                We Ensure: Freelancers Get Paid and Clients Receive Satisfactory Work
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="flex flex-wrap gap-3"
              >
                <a href="https://chat.whatsapp.com/CSyUwqxVCc4HfVOPbEzhAs" target="_blank" rel="noopener noreferrer">
                  <motion.button
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 
                             text-white rounded-lg font-medium hover:from-green-600 hover:to-green-700 
                             transition-all duration-300 flex items-center gap-2 text-sm"
                  >
                    <Users className="w-4 h-4" />
                    Join Community
                  </motion.button>
                </a>

                <a href="https://whatsapp.com/channel/0029VbAtNNnLY6dE9X6kpb3w" target="_blank" rel="noopener noreferrer">
                  <motion.button
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-600 
                             text-white rounded-lg font-medium hover:from-emerald-600 hover:to-teal-700 
                             transition-all duration-300 flex items-center gap-2 text-sm"
                  >
                    <Bell className="w-4 h-4" />
                    Follow Channel
                  </motion.button>
                </a>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="flex flex-wrap gap-3"
              >
                <Link href="/auth/freelancer/login">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-6 py-2 bg-white text-black rounded-lg font-medium border-2 border-gray-200
                             hover:border-black transition-all duration-300 text-sm"
                  >
                    Login
                  </motion.button>
                </Link>

                <Link href="/auth/freelancer/signup">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-6 py-2 bg-black text-white rounded-lg font-medium
                             hover:bg-gray-900 transition-all duration-300 flex items-center gap-2 text-sm"
                  >
                    Sign Up
                    <ArrowRight className="w-4 h-4" />
                  </motion.button>
                </Link>
              </motion.div>

              <div className="hidden lg:block pt-4">
                <FeatureStrip />
              </div>
            </div>

            {/* Right Side - Quick Start Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-6">
                {!showSuccess ? (
                  <>
                    <div className="flex items-center gap-3 mb-5">
                      <div className="w-10 h-10 bg-black rounded-xl flex items-center justify-center">
                        <Rocket className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h2 className="text-xl font-bold text-gray-900">Quick Start</h2>
                        <p className="text-xs text-gray-600">Create your first delivery</p>
                      </div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1.5">
                          Upload Files <span className="text-gray-400">(Optional)</span>
                        </label>
                        <FileUploadComponent
                          onUploadComplete={handleUploadComplete}
                          onFilesSelected={handleFilesSelected}
                          onUploadError={handleUploadError}
                          disabled={loading}
                        />
                        {hasFilesSelected && (
                          <div className="mt-1.5">
                            {isUploadingFiles && (
                              <p className="text-xs text-blue-600 flex items-center gap-1">
                                <Loader2 className="w-3 h-3 animate-spin" />
                                Uploading {filesUploadingCount} file(s)...
                              </p>
                            )}
                            {allFilesUploaded && !hasUploadErrors && (
                              <p className="text-xs text-green-600">
                                {uploadedFiles.length} file(s) uploaded
                              </p>
                            )}
                            {hasUploadErrors && (
                              <p className="text-xs text-red-600">
                                {uploadErrors.length} file(s) failed
                              </p>
                            )}
                          </div>
                        )}
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-medium text-gray-700 mb-1">
                            Project Name *
                          </label>
                          <input
                            type="text"
                            name="deliveryName"
                            value={formData.deliveryName}
                            onChange={handleInputChange}
                            placeholder="Website Design"
                            required
                            className="w-full px-3 py-2 rounded-lg border border-gray-200 
                                     focus:border-gray-400 focus:ring-0 transition-colors text-sm"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-medium text-gray-700 mb-1">
                            Cost (₹) *
                          </label>
                          <input
                            type="number"
                            name="deliveryCost"
                            value={formData.deliveryCost}
                            onChange={handleInputChange}
                            placeholder="5000"
                            required
                            min="0"
                            step="0.01"
                            className="w-full px-3 py-2 rounded-lg border border-gray-200 
                                     focus:border-gray-400 focus:ring-0 transition-colors text-sm"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">
                          Client Name *
                        </label>
                        <input
                          type="text"
                          name="clientName"
                          value={formData.clientName}
                          onChange={handleInputChange}
                          placeholder="Your client's name"
                          required
                          className="w-full px-3 py-2 rounded-lg border border-gray-200 
                                   focus:border-gray-400 focus:ring-0 transition-colors text-sm"
                        />
                      </div>

                      <div className="relative py-3">
                        <div className="absolute inset-0 flex items-center">
                          <div className="w-full border-t border-gray-200"></div>
                        </div>
                        <div className="relative flex justify-center text-xs">
                          <span className="px-2 bg-white text-gray-500">Create Your Account</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-medium text-gray-700 mb-1 flex items-center gap-1">
                            Your Email *
                            <div className="group relative">
                              <Info className="w-3 h-3 text-gray-400 cursor-help" />
                              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 
                                          opacity-0 group-hover:opacity-100 transition-opacity duration-200
                                          pointer-events-none z-10 w-40">
                                <div className="bg-gray-900 text-white text-xs rounded-lg py-1.5 px-2.5 whitespace-nowrap">
                                  Your login email
                                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 
                                               border-4 border-transparent border-t-gray-900"></div>
                                </div>
                              </div>
                            </div>
                          </label>
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="your@email.com"
                            required
                            className="w-full px-3 py-2 rounded-lg border border-gray-200 
                                     focus:border-gray-400 focus:ring-0 transition-colors text-sm"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-medium text-gray-700 mb-1 flex items-center gap-1">
                            Password *
                            <div className="group relative">
                              <Info className="w-3 h-3 text-gray-400 cursor-help" />
                              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 
                                          opacity-0 group-hover:opacity-100 transition-opacity duration-200
                                          pointer-events-none z-10 w-32">
                                <div className="bg-gray-900 text-white text-xs rounded-lg py-1.5 px-2.5 whitespace-nowrap">
                                  Min 6 characters
                                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 
                                               border-4 border-transparent border-t-gray-900"></div>
                                </div>
                              </div>
                            </div>
                          </label>
                          <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            placeholder="••••••"
                            required
                            minLength={6}
                            className="w-full px-3 py-2 rounded-lg border border-gray-200 
                                     focus:border-gray-400 focus:ring-0 transition-colors text-sm"
                          />
                        </div>
                      </div>

                      {error && (
                        <div className="p-2.5 bg-red-50 border border-red-200 rounded-lg">
                          <p className="text-xs text-red-700">{error}</p>
                        </div>
                      )}

                      <button
                        type="submit"
                        disabled={!canSubmit}
                        className="w-full px-6 py-2.5 bg-black text-white rounded-lg font-medium
                                 hover:bg-gray-900 transition-colors flex items-center justify-center gap-2
                                 disabled:bg-gray-300 disabled:cursor-not-allowed text-sm"
                      >
                        {loading ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            Creating...
                          </>
                        ) : isUploadingFiles ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            Uploading...
                          </>
                        ) : (
                          <>
                            <Rocket className="w-4 h-4" />
                            Get Started Now
                          </>
                        )}
                      </button>

                      <p className="text-xs text-gray-500 text-center">
                        By creating an account, you agree to our Terms
                      </p>
                    </form>
                  </>
                ) : (
                  <div className="text-center space-y-4 py-6">
                    <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                      <CheckCircle className="w-7 h-7 text-green-600" />
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 mb-1">
                        Account Created!
                      </h3>
                      <p className="text-sm text-gray-600">
                        Your delivery is ready to share
                      </p>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-3">
                      <label className="block text-xs font-medium text-gray-700 mb-2">
                        Preview Link
                      </label>
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          value={previewLink}
                          readOnly
                          className="flex-1 px-3 py-2 bg-white rounded-lg border border-gray-200 text-xs"
                        />
                        <button
                          onClick={copyToClipboard}
                          className="p-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
                        >
                          {linkCopied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                        </button>
                      </div>
                      {linkCopied && (
                        <p className="text-xs text-green-600 mt-2">Link copied!</p>
                      )}
                    </div>

                    <p className="text-xs text-gray-600">
                      Redirecting to dashboard...
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;