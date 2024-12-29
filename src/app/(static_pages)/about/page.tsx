"use client"

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Building2, Users, Target, Zap } from 'lucide-react';

const Divider = () => (
  <div className="w-full h-px bg-gradient-to-r from-transparent via-black/10 to-transparent my-12" />
);

const AboutUs = () => {

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null; // or a loading state
  }

  return (
    <div className="w-full bg-white py-16 sm:py-20 md:py-24 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000008_1px,transparent_1px),linear-gradient(to_bottom,#00000008_1px,transparent_1px)] bg-[size:24px_24px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/[0.02] to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-4 relative">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="inline-flex items-center justify-center gap-2 text-sm font-medium 
                     bg-black/5 text-black/80 px-4 py-2 rounded-full mb-4"
          >
            <Sparkles className="w-4 h-4" />
            ABOUT US
            <Sparkles className="w-4 h-4" />
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl font-bold text-black mb-4 sm:mb-6"
          >
            Our Story
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="text-lg sm:text-xl text-black/60 max-w-2xl mx-auto"
          >
            Building a better future for freelancers
          </motion.p>
        </div>

        {/* Main Content Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <div className="relative bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] 
                       border border-gray-100 overflow-hidden p-8 sm:p-12">
            {/* Premium Corner Gradients */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-black/5 to-transparent" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-black/5 to-transparent" />

            {/* Content */}
            <div className="relative space-y-8">
              {/* About Workongigs */}
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">About Workongigs</h3>
                <p className="text-gray-600">
                  Welcome to Workongigs, a platform crafted for freelancers who collaborate directly with clients via WhatsApp and emails. We understand the challenges of managing payments, tracking orders, and delivering projects seamlessly. That's why we built Workongigs—to give freelancers an easier way to handle these essentials.
                </p>
              </div>

              <Divider />

              {/* Our Mission */}
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h3>
                <p className="text-gray-600">
                  Our mission is simple: to empower freelancers by offering a streamlined, hassle-free way to manage their projects and payments, so they can focus on what they do best—delivering great work.
                </p>
              </div>

              <Divider />

              {/* What We Offer */}
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">What We Offer</h3>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-black/5 flex items-center justify-center flex-shrink-0">
                      <Target className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Our mission is simple</h4>
                      <p className="text-gray-600">To empower freelancers by offering a streamlined, hassle-free way to manage their projects and payments, so they can focus on what they do best—delivering great work.</p>
                    </div>
                  </div>

                  <div className="w-full h-px bg-gradient-to-r from-transparent via-black/5 to-transparent my-6" />

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-black/5 flex items-center justify-center flex-shrink-0">
                      <Zap className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Organize Orders Efficiently</h4>
                      <p className="text-gray-600">With Workongigs, freelancers can upload their project files, generate a unique link, and share it directly with clients. The client can access their delivery only once the payment is completed—making the process smooth for both sides.</p>
                    </div>
                  </div>

                  <div className="w-full h-px bg-gradient-to-r from-transparent via-black/5 to-transparent my-6" />

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-black/5 flex items-center justify-center flex-shrink-0">
                      <Users className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">For Freelancers Using WhatsApp and Emails</h4>
                      <p className="text-gray-600">Our platform is designed specifically for freelancers who communicate directly with clients through WhatsApp and emails, providing a simple solution for those who don't have an official system to track and organize their work.</p>
                    </div>
                  </div>
                </div>
              </div>

              <Divider />

              {/* Why Choose Us */}
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Why Choose Us?</h3>
                <p className="text-gray-600 mb-6">
                  We know how freelancing works because we've been there too. We've created Workongigs to solve real problems freelancers face every day:
                </p>
                <div className="space-y-4">
                  {[
                    { title: 'Streamlined Project Delivery', desc: 'Keep track of whats delivered and whats pending.' },
                    { title: 'Transparent Payment System', desc: 'No more unpaid projects—clients can only access files after payment.' },
                    { title: 'Secure and Efficient', desc: 'Built to safeguard your projects while ensuring smooth collaboration.' }
                  ].map((item, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-black mt-2 flex-shrink-0" />
                      <div>
                        <span className="font-semibold text-gray-900">{item.title}: </span>
                        <span className="text-gray-600">{item.desc}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <Divider />

              {/* Contact Information */}
              <div className="mt-8 p-6 bg-black/5 rounded-2xl border border-black/10">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Contact Information</h3>
                <div className="space-y-3">
                  {/* <div className="flex items-center gap-2">
                    <Building2 className="w-5 h-5 text-gray-600" />
                    <span className="text-gray-900">Vill Post Ajgaraha Rewa Madhya Pradesh</span>
                  </div> */}
                  <div className="w-full h-px bg-black/5 my-2" />
                  <div>
                    <a href="mailto:contact@workongigs.com" className="text-gray-900 hover:text-gray-600 transition-colors">
                      contact@workongigs.com
                    </a>
                  </div>
                  {/* <div className="w-full h-px bg-black/5 my-2" />
                  <div>
                    <span className="text-gray-900">+917477211211</span>
                  </div> */}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AboutUs;