
import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const CustomButton = ({ children, className = "", ...props }) => (
  <button
    className={`inline-flex items-center justify-center px-8 py-3 text-base font-medium
              transition-all duration-300 ${className}`}
    {...props}
  >
    {children}
  </button>
);

const CTA = () => {
  return (
    <div className="w-full bg-white py-24 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000008_1px,transparent_1px),linear-gradient(to_bottom,#00000008_1px,transparent_1px)] bg-[size:24px_24px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/[0.02] to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="bg-gray-50 rounded-3xl p-8 sm:p-12 lg:p-16 border border-gray-100
                     shadow-[0_4px_20px_rgba(0,0,0,0.08)] relative overflow-hidden">
          
          {/* Content Container */}
          <div className="relative z-10 text-center max-w-3xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6"
            >
              Ready to Start Your Journey?
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-xl text-gray-600 mb-10"
            >
              Begin your freelancing journey with secure payments and professional tools
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Link href="/sign-in">
                <CustomButton 
                  className="rounded-xl bg-black text-white hover:bg-gray-900
                           shadow-lg hover:shadow-xl group relative overflow-hidden
                           px-10 py-4 text-lg"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Get Started
                    <ArrowUpRight className="w-5 h-5 group-hover:translate-x-0.5 
                                         group-hover:-translate-y-0.5 transition-transform" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-gray-900 to-black 
                               opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </CustomButton>
              </Link>
            </motion.div>
          </div>

          {/* Premium Corner Accents */}
          <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br 
                       from-gray-100 to-transparent" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr 
                       from-gray-100 to-transparent" />
        </div>
      </div>

      {/* Subtle Decorative Elements */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-gradient-to-r 
                    from-gray-100 to-transparent rounded-full filter blur-3xl 
                    opacity-70 -translate-y-1/2" />
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-gradient-to-l 
                    from-gray-100 to-transparent rounded-full filter blur-3xl 
                    opacity-70 -translate-y-1/2" />
    </div>
  );
};

export default CTA;