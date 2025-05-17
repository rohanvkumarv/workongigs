"use client"
import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Lock, CheckCircle, MessageSquare } from 'lucide-react';

const BenefitCard = ({ icon: Icon, title, description, delay, variant = "primary" }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
    viewport={{ once: true }}
    className="flex gap-4 group"
  >
    {/* Icon Container */}
    <div className={`
      w-12 h-12 rounded-xl flex items-center justify-center shrink-0
      transition-colors duration-300
      ${variant === "primary" 
        ? "bg-black/5 group-hover:bg-black group-hover:text-white" 
        : "bg-black/5 group-hover:bg-black group-hover:text-white"}
    `} id="benefits">
      <Icon className="w-6 h-6" />
    </div>

    {/* Content */}
    <div className="space-y-1">
      <h4 className="font-semibold text-lg text-gray-900 group-hover:text-black transition-colors">
        {title}
      </h4>
      <p className="text-gray-600">
        {description}
      </p>
    </div>
  </motion.div>
);

const Benefits = () => {
  const freelancerBenefits = [
    {
      icon: MessageSquare,
      title: "Improved Client Interaction",
      description: "A link to the preview and payment page simplifies sharing project progress with clients, making it a direct and professional way to involve them in the process."
    },
    {
      icon: Shield,
      title: "Enhanced Trust and Professionalism",
      description: "A secure system for file sharing and payment processing boosts the freelancer's professional image and builds client trust."
    },
    {
      icon: CheckCircle,
      title: "Effortless File Sharing",
      description: "Freelancers can easily share the preview and payment page link with clients, eliminating the need for additional platforms or complex procedures."
    }
  ];

  const clientBenefits = [
    {
      icon: Lock,
      title: "Secure Payment Processing",
      description: "A secure payment gateway protects clients' financial transactions, building trust and confidence."
    },
    {
      icon: Shield,
      title: "Flexible Payment Options",
      description: "Clients can review files and choose to pay without immediate download, allowing for better decision-making."
    },
    {
      icon: CheckCircle,
      title: "Clear Project Details",
      description: "Comprehensive project details, including cost and optional messages, are provided upfront for transparency and clarity."
    }
  ];

  return (
    <div className="relative bg-white overflow-hidden" id="benefits">
      {/* Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000008_1px,transparent_1px),linear-gradient(to_bottom,#00000008_1px,transparent_1px)] bg-[size:24px_24px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 py-20 relative">
        {/* Freelancer Benefits Section */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 mb-32" id='lancers'>
          {/* Content */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="lg:w-1/2 space-y-8"
          >
            <div className="space-y-4">
              <span className="text-sm font-medium bg-black/5 px-4 py-2 rounded-full">
                For Freelancers
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
                Benefits for Freelancers
              </h2>
              <p className="text-gray-600">
                Empowering freelancers with professional tools and seamless interactions
              </p>
            </div>

            <div className="space-y-6"  >
              {freelancerBenefits.map((benefit, index) => (
                <BenefitCard
                  key={index}
                  {...benefit}
                  delay={0.2 + index * 0.1}
                />
              ))}
            </div>
          </motion.div>

          {/* Animation */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="lg:w-1/2"
          >
            <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-black/5">
            <img src="/img/freelancer.png" alt="Client Benefits" style={{ width: '100%', height: '100%' }} />
            </div>
          </motion.div>
        </div>

        {/* Client Benefits Section */}
        <div className="flex flex-col-reverse lg:flex-row gap-12 lg:gap-20" id='clients' >
          {/* Animation */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="lg:w-1/2"
          >
            <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-black/5">
              <img src="/img/client1.png" alt="Client Benefits" style={{ width: '100%', height: '100%' }} />
            </div>
          </motion.div>

          {/* Content */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="lg:w-1/2 space-y-8"
          >
            <div className="space-y-4">
              <span className="text-sm font-medium bg-black/5 px-4 py-2 rounded-full">
                For Clients
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
                Benefits for Clients
              </h2>
              <p className="text-gray-600">
                Ensuring a smooth and secure experience for every client
              </p>
            </div>

            <div className="space-y-6">
              {clientBenefits.map((benefit, index) => (
                <BenefitCard
                  key={index}
                  {...benefit}
                  delay={0.2 + index * 0.1}
                  variant="secondary"
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Benefits;