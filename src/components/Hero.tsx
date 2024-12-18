// import React from 'react';
// import { motion } from 'framer-motion';
// // import { SignedIn, SignedOut } from '@clerk/nextjs';
// import Link from 'next/link';
// import { ArrowRight, Shield, Lock, CheckCircle } from 'lucide-react';

// const FloatingElement = ({ children, delay, duration = 3 }) => (
//   <motion.div
//     initial={{ y: 0 }}
//     animate={{ 
//       y: [-10, 10, -10],
//       transition: {
//         duration,
//         repeat: Infinity,
//         ease: "easeInOut",
//         delay
//       }
//     }}
//   >
//     {children}
//   </motion.div>
// );

// const CustomButton = ({ href, children, className = "" }) => (
//   <motion.div 
//     whileHover={{ scale: 1.02 }} 
//     whileTap={{ scale: 0.98 }}
//   >
//     <Link href={href}>
//       <button className={`
//         px-8 py-3 bg-black text-white rounded-xl font-medium
//         hover:bg-gray-900 transition-all duration-300 
//         flex items-center justify-center gap-2 group
//         ${className}
//       `}>
//         {children}
//       </button>
//     </Link>
//   </motion.div>
// );

// const Hero = () => {
//   const features = [
//     { label: 'Safe', icon: Shield },
//     { label: 'Secure', icon: Lock },
//     { label: 'Reliable', icon: CheckCircle }
//   ];

//   return (
//     <div className="relative min-h-screen bg-white overflow-hidden" id="home">
//       {/* Background Elements */}
//       <div className="absolute inset-0">
//         <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000008_1px,transparent_1px),linear-gradient(to_bottom,#00000008_1px,transparent_1px)] bg-[size:24px_24px]" />
//       </div>
      
//       {/* Gradient Orbs */}
//       <div className="absolute inset-0 overflow-hidden">
//         <div className="absolute top-0 -right-40 w-80 h-80 rounded-full 
//                      bg-gradient-to-br from-black/5 to-transparent blur-3xl" />
//         <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full 
//                      bg-gradient-to-tr from-black/5 to-transparent blur-3xl" />
//       </div>

//       {/* Content Container */}
//       <div className="max-w-7xl mx-auto px-4 relative">
//         <div className="pt-32 pb-20">
//           {/* Main Content */}
//           <div className="text-center max-w-4xl mx-auto">
//             {/* Eyebrow Text */}
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.5 }}
//               className="mb-6"
//             >
//               <span className="px-4 py-2 rounded-full bg-black/5 text-gray-700 
//                            text-sm font-medium inline-block">
//                 Welcome to the Future of Freelancing
//               </span>
//             </motion.div>

//             {/* Hero Title */}
//             <motion.h1
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.5, delay: 0.1 }}
//               className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-6"
//             >
//               Say hello to{" "}
//               <span className="relative inline-block">
//                 WorkOnGigs
//                 <motion.div
//                   className="absolute -bottom-2 left-0 right-0 h-1 bg-black rounded-full"
//                   initial={{ scaleX: 0 }}
//                   animate={{ scaleX: 1 }}
//                   transition={{ duration: 0.5, delay: 0.5 }}
//                 />
//               </span>
//             </motion.h1>

//             {/* Description */}
//             <motion.p
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.5, delay: 0.2 }}
//               className="text-lg sm:text-xl text-gray-600 mb-12 max-w-2xl mx-auto"
//             >
//               We Ensure: Freelancers Get Paid and Clients Receive Satisfactory Work
//             </motion.p>

//             {/* CTA Buttons */}
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.5, delay: 0.3 }}
//               className="flex flex-wrap justify-center gap-4"
//             >
//               {/* <SignedOut>
//                 <CustomButton href="/sign-in">
//                   Get Started
//                   <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
//                 </CustomButton>
//               </SignedOut>

//               <SignedIn>
//                 <CustomButton href="/dashboard/upload">
//                   Upload New Project
//                   <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
//                 </CustomButton>
//               </SignedIn> */}
//             </motion.div>

//             {/* Features Section */}
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ duration: 0.5, delay: 0.4 }}
//               className="mt-20 pt-10 border-t border-gray-200"
//             >
//               <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-3xl mx-auto">
//                 {features.map((feature, index) => {
//                   const Icon = feature.icon;
//                   return (
//                     <FloatingElement key={index} delay={index * 0.2}>
//                       <div className="text-center group cursor-pointer">
//                         <div className="w-12 h-12 rounded-xl bg-black/5 flex items-center 
//                                     justify-center mx-auto mb-4 group-hover:bg-black/10 
//                                     transition-colors duration-300">
//                           <Icon className="w-6 h-6 text-gray-700" />
//                         </div>
//                         <h6 className="text-lg font-semibold text-gray-900">
//                           {feature.label}
//                         </h6>
//                       </div>
//                     </FloatingElement>
//                   );
//                 })}
//               </div>
//             </motion.div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Hero;

import React from 'react';
import { motion } from 'framer-motion';
// import { SignedIn, SignedOut } from '@clerk/nextjs';
import Link from 'next/link';
import { ArrowRight, Shield, Lock, CheckCircle, ArrowUpRight } from 'lucide-react';

const CustomButton = ({ href, children, variant = "primary" }) => (
  <motion.div 
    whileHover={{ scale: 1.02 }} 
    whileTap={{ scale: 0.98 }}
  >
    <Link href={href}>
      <button className={`
        px-8 py-3 rounded-xl font-medium transition-all duration-300 
        flex items-center justify-center gap-2 group 
        ${variant === 'primary' 
          ? 'bg-black text-white hover:bg-gray-900' 
          : 'bg-white text-black border-2 border-gray-200 hover:border-black'
        }
      `}>
        {children}
      </button>
    </Link>
  </motion.div>
);



// ... Keep the CustomButton component the same ...

// const FeatureStrip = () => {
//   const features = [
//     { label: 'Safe', icon: Shield, description: 'Our platform ensures secure transactions' },
//     { label: 'Secure', icon: Lock, description: 'Advanced encryption and security measures' },
//     { label: 'Reliable', icon: CheckCircle, description: 'Trusted platform with verified users' }
//   ];

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.5 }}
//       className="max-w-3xl mx-auto bg-white rounded-2xl p-8 shadow-lg border border-gray-100
//                 hover:shadow-xl transition-shadow duration-300"
//     >
//       <div className="flex justify-between items-center divide-x divide-gray-200">
//         {features.map((feature, index) => {
//           const Icon = feature.icon;
//           return (
//             <div key={index} className="flex-1 px-6 first:pl-0 last:pr-0 text-center group">
//               <div className="flex flex-col items-center gap-3">
//                 <div className="w-12 h-12 rounded-xl bg-black/5 flex items-center justify-center
//                             group-hover:bg-black group-hover:text-white transition-colors duration-300">
//                   <Icon className="w-6 h-6" />
//                 </div>
//                 <h3 className="text-lg font-semibold text-gray-900">
//                   {feature.label}
//                 </h3>
//                 <p className="text-sm text-gray-600">
//                   {feature.description}
//                 </p>
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     </motion.div>
//   );
// };

const FeatureStrip = () => {
  const features = [
    { label: 'Safe', icon: Shield, description: 'Our platform ensures secure transactions' },
    { label: 'Secure', icon: Lock, description: 'Advanced encryption and security measures' },
    { label: 'Reliable', icon: CheckCircle, description: 'Trusted platform with verified users' }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-3xl mx-auto bg-white rounded-2xl p-4 md:p-8 shadow-lg border border-gray-100
                hover:shadow-xl transition-shadow duration-300"
    >
      <div className="flex flex-col md:flex-row md:justify-between md:items-center md:divide-x divide-gray-200 gap-8 md:gap-0">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <div 
              key={index} 
              className="flex-1 md:px-6 first:md:pl-0 last:md:pr-0 text-center group border-b md:border-b-0 last:border-b-0 pb-8 md:pb-0 last:pb-0"
            >
              <div className="flex flex-col items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-black/5 flex items-center justify-center
                            group-hover:bg-black group-hover:text-white transition-colors duration-300">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {feature.label}
                </h3>
                <p className="text-sm text-gray-600 max-w-xs mx-auto">
                  {feature.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
};

const Hero = () => {
  return (
    <div className="relative min-h-screen bg-white overflow-hidden" id="home">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000008_1px,transparent_1px),linear-gradient(to_bottom,#00000008_1px,transparent_1px)] bg-[size:24px_24px]" />
      </div>
      
      {/* Gradient Orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 -right-40 w-80 h-80 rounded-full 
                     bg-gradient-to-br from-black/5 to-transparent blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full 
                     bg-gradient-to-tr from-black/5 to-transparent blur-3xl" />
      </div>

      {/* Content Container */}
      <div className="max-w-7xl mx-auto px-4 relative">
        <div className="pt-32 pb-20">
          {/* Main Content */}
          <div className="text-center max-w-4xl mx-auto">
            {/* Premium Label */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-6"
            >
              <span className="px-4 py-2 rounded-full bg-black/5 text-gray-700 
                           text-sm font-medium inline-block">
                Welcome to the Future of Freelancing
              </span>
            </motion.div>

            {/* Hero Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-6"
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

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg sm:text-xl text-gray-600 mb-12 max-w-2xl mx-auto"
            >
              We Ensure: Freelancers Get Paid and Clients Receive Satisfactory Work
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-wrap justify-center gap-4 mb-20"
            >
              {/* <SignedOut>
                <Link href="/sign-in">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-8 py-3 bg-black text-white rounded-xl font-medium
                             hover:bg-gray-900 transition-all duration-300
                             flex items-center gap-2 group"
                  >
                    Get Started
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </motion.button>
                </Link>
              </SignedOut>

              <SignedIn>
                <Link href="/dashboard/upload">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-8 py-3 bg-black text-white rounded-xl font-medium
                             hover:bg-gray-900 transition-all duration-300
                             flex items-center gap-2 group"
                  >
                    Upload New Project
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </motion.button>
                </Link>
              </SignedIn> */}
            </motion.div>

            {/* Features Section */}
            <FeatureStrip />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;