import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRight, Shield, Users, FileCheck } from 'lucide-react';

const CustomButton = ({ children, className = "", ...props }) => (
  <button
    className={`inline-flex items-center justify-center px-8 py-3 text-base font-medium 
              transition-all duration-300 ${className}`}
    {...props}
  >
    {children}
  </button>
);

const FeatureCard = ({ icon: Icon, title, description, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    viewport={{ once: true }}
    className="group relative bg-white rounded-3xl p-6 sm:p-8
               shadow-[0_4px_20px_rgba(0,0,0,0.08)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)]
               border border-gray-100 backdrop-blur-sm transition-all duration-300"
  >
    {/* Icon */}
    <div className="p-3 w-14 h-14 rounded-2xl bg-black/5 flex items-center justify-center
                  mb-6 group-hover:bg-black group-hover:text-white transition-colors duration-300">
      <Icon className="w-6 h-6" />
    </div>

    {/* Content */}
    <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-black transition-colors">
      {title}
    </h3>
    <p className="text-gray-600 text-sm leading-relaxed mb-6 group-hover:text-gray-700">
      {description}
    </p>

    {/* Coming Soon Badge */}
    <div className="inline-flex items-center px-3 py-1 rounded-full bg-black/5 
                  text-xs font-medium text-gray-700">
      Coming Soon
    </div>

    {/* Corner Accents */}
    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br 
                  from-black/5 to-transparent opacity-0 group-hover:opacity-100 
                  transition-opacity duration-300" />
    <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr 
                  from-black/5 to-transparent opacity-0 group-hover:opacity-100 
                  transition-opacity duration-300" />
  </motion.div>
);

const UpcomingFeatures = () => {
  const features = [
    {
      icon: Users,
      title: "Client Management System",
      description: "A comprehensive platform designed specifically for freelancers to streamline client interactions, project tracking, and business operations."
    },
    {
      icon: Shield,
      title: "Secure File Preview",
      description: "Advanced file preview system with enterprise-grade security, ensuring safe document sharing between clients and freelancers."
    },
    {
      icon: FileCheck,
      title: "Freelancer Marketplace",
      description: "A curated marketplace connecting clients with skilled freelancers, featuring verified profiles and secure payment processing."
    }
  ];

  return (
    <div className="w-full bg-white py-24 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000008_1px,transparent_1px),linear-gradient(to_bottom,#00000008_1px,transparent_1px)] bg-[size:24px_24px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/[0.02] to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4"
          >
            Upcoming Features
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-lg text-gray-600 max-w-2xl mx-auto"
          >
            Exciting new features coming soon to enhance your freelancing experience
          </motion.p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default UpcomingFeatures;

