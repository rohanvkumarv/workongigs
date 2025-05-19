import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const StepCard = ({ image, step, title, description, delay, isLast = false }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
    viewport={{ once: true }}
    className={`
      group relative bg-white transition-all duration-300
      hover:z-10 hover:shadow-2xl hover:-translate-y-1
    `}
  >
    <div className="relative space-y-8 py-12 p-8">
      {/* Background gradients */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-white opacity-0 
                    group-hover:opacity-100 transition-opacity duration-300" />
      
      {/* Content */}
      <div className="relative z-10">
        <div className="w-16 h-16 rounded-2xl bg-black/5 p-3 mb-8 
                     group-hover:bg-black group-hover:text-white transition-colors duration-300">
          <img
            src={image}
            className="w-full h-full object-contain"
            width={512}
            height={512}
            alt={title}
          />
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <span className="text-sm font-medium text-gray-500">
              {step}
            </span>
            <h5 className="text-xl font-semibold text-black">
              {title}
            </h5>
            <p className="text-gray-600">
              {description}
            </p>
          </div>

          <motion.a
            href="#"
            className="inline-flex items-center text-sm text-black font-medium"
            whileHover={{ x: 4 }}
          >
            <span className="mr-2">Read more</span>
            <ArrowRight className="w-4 h-4 opacity-0 -translate-x-4 group-hover:opacity-100 
                                group-hover:translate-x-0 transition-all duration-300" />
          </motion.a>
        </div>
      </div>

      {/* Border Gradients */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r 
                    from-transparent via-black/5 to-transparent opacity-0 
                    group-hover:opacity-100 transition-opacity duration-300" />
      <div className="absolute top-0 left-0 bottom-0 w-px bg-gradient-to-b 
                    from-transparent via-black/5 to-transparent opacity-0 
                    group-hover:opacity-100 transition-opacity duration-300" />
    </div>
  </motion.div>
);

const HowToUse = () => {
  const steps = [
    {
      image: "https://cdn-icons-png.flaticon.com/512/4341/4341139.png",
      step: "Step One",
      title: "Create your account",
      description: "After successful registration, you'll be redirected to your dashboard."
    },
    {
      image: "https://cdn-icons-png.flaticon.com/512/4341/4341134.png",
      step: "Step Two",
      title: "Add a new client",
      description: "Click on 'Add New Client' and fill in the client’s details."
    },
    {
      image: "https://cdn-icons-png.flaticon.com/512/4341/4341160.png",
      step: "Step Three",
      title: "Add a new delivery",
      description: "Select the client and click 'Add Delivery'. Enter the name, cost, and upload the file (image, audio, or video). And… you’re done!"
    },
    {
      image: "https://cdn-icons-png.flaticon.com/512/4341/4341025.png",
      step: "Step Four",
      title: "Copy the delivery link and share it with your client.",
      description: "Copy the delivery link and share it with your client.",
      isLast: true
    }
  ];

  return (
    <div className="relative bg-white overflow-hidden" id="usage">
      {/* Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000008_1px,transparent_1px),linear-gradient(to_bottom,#00000008_1px,transparent_1px)] bg-[size:24px_24px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 py-20 relative">
        {/* Section Header */}
        <div className="md:w-2/3 lg:w-1/2 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="w-12 h-12 rounded-xl bg-black/5 p-3 mb-8"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-full h-full text-gray-800"
            >
              <path
                fillRule="evenodd"
                d="M9 4.5a.75.75 0 01.721.544l.813 2.846a3.75 3.75 0 002.576 2.576l2.846.813a.75.75 0 010 1.442l-2.846.813a3.75 3.75 0 00-2.576 2.576l-.813 2.846a.75.75 0 01-1.442 0l-.813-2.846a3.75 3.75 0 00-2.576-2.576l-2.846-.813a.75.75 0 010-1.442l2.846-.813A3.75 3.75 0 007.466 7.89l.813-2.846A.75.75 0 019 4.5zM18 1.5a.75.75 0 01.728.568l.258 1.036c.236.94.97 1.674 1.91 1.91l1.036.258a.75.75 0 010 1.456l-1.036.258c-.94.236-1.674.97-1.91 1.91l-.258 1.036a.75.75 0 01-1.456 0l-.258-1.036a2.625 2.625 0 00-1.91-1.91l-1.036-.258a.75.75 0 010-1.456l1.036-.258a2.625 2.625 0 001.91-1.91l.258-1.036A.75.75 0 0118 1.5z"
                clipRule="evenodd"
              />
            </svg>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4"
          >
            How to use our Service
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-600"
          >
            Our this initiative is beneficial for both clients and Freelancers ...
          </motion.p>
        </div>

        {/* Steps Grid */}
        <div className="grid divide-x divide-y divide-gray-100 overflow-hidden rounded-3xl 
                      border border-gray-100 sm:grid-cols-2 lg:grid-cols-4 lg:divide-y-0">
          {steps.map((step, index) => (
            <StepCard
              key={index}
              {...step}
              delay={0.3 + index * 0.1}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HowToUse;