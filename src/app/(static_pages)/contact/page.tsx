"use client"

import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, User, Sparkles } from 'lucide-react';

const ContactPage = () => {
  return (
    // <div className="relative bg-white min-h-screen"> {/* Changed to white background */}
    <div className="w-full bg-white py-16 sm:py-20 md:py-24 relative overflow-hidden">
      {/* Premium Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000008_1px,transparent_1px),linear-gradient(to_bottom,#00000008_1px,transparent_1px)] bg-[size:24px_24px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/[0.02] to-transparent" />
      </div>
      

      {/* Content Container */}
      <div className="relative pt-32 px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center gap-2 text-sm font-medium 
                       bg-black/5 text-black/80 px-4 py-2 rounded-full mb-4">
            <Sparkles className="w-4 h-4" />
            REACH OUT
            <Sparkles className="w-4 h-4" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Contact Information
          </h1>
        </motion.div>

        {/* Main Contact Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-3xl mx-auto"
        >
          <div className="relative bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] 
                       border border-gray-100 overflow-hidden p-8 sm:p-12">
            {/* Premium Corner Gradients */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-black/5 to-transparent" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-black/5 to-transparent" />

            {/* Content */}
            <div className="relative">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="space-y-8"
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Reach Us At:
                </h2>

                <div className="space-y-6">
                  {/* Contact Details */}
                  <div className="flex items-center gap-3 group">
                    <div className="w-10 h-10 rounded-xl bg-black/5 flex items-center justify-center
                                group-hover:bg-black group-hover:text-white transition-colors">
                      <User className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Name</p>
                      <p className="text-gray-900 font-medium">Amit Singh</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 group">
                    <div className="w-10 h-10 rounded-xl bg-black/5 flex items-center justify-center
                                group-hover:bg-black group-hover:text-white transition-colors">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <a href="mailto:contact@workongigs.com" 
                         className="text-gray-900 font-medium hover:text-black transition-colors">
                        contact@workongigs.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 group">
                    <div className="w-10 h-10 rounded-xl bg-black/5 flex items-center justify-center
                                group-hover:bg-black group-hover:text-white transition-colors">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Phone Number</p>
                      <p className="text-gray-900 font-medium">+917477211211</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 group">
                    <div className="w-10 h-10 rounded-xl bg-black/5 flex items-center justify-center
                                group-hover:bg-black group-hover:text-white transition-colors">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Address</p>
                      <p className="text-gray-900 font-medium">Vill Post Ajgaraha Rewa Madhya Pradesh</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ContactPage;