
// // "use client"

// // import React, { useState, useEffect } from 'react';
// // import { motion, AnimatePresence } from 'framer-motion';
// // import { Menu, X, ArrowRight } from 'lucide-react';

// // const Navbar = () => {
// //   const [isOpen, setIsOpen] = useState(false);
// //   const [scrolled, setScrolled] = useState(false);
// //   const [activeIndex, setActiveIndex] = useState(null);

// //   useEffect(() => {
// //     const handleScroll = () => {
// //       setScrolled(window.scrollY > 20);
// //     };
// //     window.addEventListener('scroll', handleScroll);
// //     return () => window.removeEventListener('scroll', handleScroll);
// //   }, []);

// //   // Left side navigation items
// //   const leftNavItems = [
// //     { label: 'How To Use', href: '/#usage' },
    
// //   ];

// //   // Right side navigation items
// //   const rightNavItems = [
// //     { label: 'Benefits', href: '/#benefits' },
// //     { label: 'Pricing', href: '/pricing' },
// //     { label: 'About', href: '/about' },
// //     { label: 'Contact', href: '/contact' },
// //     { label: 'Login', href: '/auth/freelancer/login' },
// //   ];
// //   useEffect(() => {
// //     const freelancerId = localStorage.getItem('freelancerId');
// //   }, []);

// //   return (
// //     <div className="w-full fixed top-6 left-0 right-0 px-4 z-50">
// //       <div className="max-w-7xl mx-auto">
// //         <motion.nav
// //           initial={{ y: -20, opacity: 0 }}
// //           animate={{ y: 0, opacity: 1 }}
// //           className={`
// //             rounded-2xl relative backdrop-blur-md transition-all duration-300
// //             ${scrolled 
// //               ? 'bg-white/70 shadow-lg border border-gray-200/50' 
// //               : 'bg-white shadow-md'}
// //           `}
// //         >
// //           <div className="px-6 sm:px-8 py-4">
// //             <div className="flex items-center justify-between">
// //               {/* Left Section */}
// //               <div className="flex items-center gap-8">
// //                 {/* Logo */}
// //                 <motion.div 
// //                   whileHover={{ scale: 1.05 }}
// //                   className="relative z-10 flex items-center gap-3"
// //                 >
// //                   <div className="h-9 w-9 bg-black rounded-xl flex items-center justify-center">
// //                     <span className="text-white text-xl font-bold">W</span>
// //                   </div>
// //                   <span className="text-black font-medium text-lg hidden sm:block">WorkOnGigs</span>
// //                 </motion.div>

// //                 {/* Left Navigation Items - Desktop */}
// //                 <div className="hidden md:flex items-center gap-1">
// //                   {leftNavItems.map((item, index) => (
// //                     <motion.a
// //                       key={item.label}
// //                       href={item.href}
// //                       className="relative px-4 py-2 text-gray-600 transition-colors duration-300
// //                                hover:text-black group"
// //                       onHoverStart={() => setActiveIndex(index)}
// //                       onHoverEnd={() => setActiveIndex(null)}
// //                     >
// //                       <span className="relative z-10 text-sm font-medium">{item.label}</span>
                      
// //                       <AnimatePresence>
// //                         {activeIndex === index && (
// //                           <motion.div
// //                             className="absolute inset-0 bg-black/5 rounded-lg -z-0"
// //                             initial={{ scale: 0.8, opacity: 0 }}
// //                             animate={{ scale: 1, opacity: 1 }}
// //                             exit={{ scale: 0.8, opacity: 0 }}
// //                             transition={{ duration: 0.2 }}
// //                           />
// //                         )}
// //                       </AnimatePresence>
// //                     </motion.a>
// //                   ))}
// //                 </div>
// //               </div>

// //               {/* Right Section - Desktop */}
// //               <div className="hidden md:flex items-center gap-2">
// //                 {rightNavItems.map((item, index) => (
// //                   <motion.a
// //                     key={item.label}
// //                     href={item.href}
// //                     className="relative px-4 py-2 text-gray-600 transition-colors duration-300
// //                              hover:text-black group"
// //                     onHoverStart={() => setActiveIndex(index + leftNavItems.length)}
// //                     onHoverEnd={() => setActiveIndex(null)}
// //                   >
// //                     <span className="relative z-10 text-sm font-medium">{item.label}</span>
                    
// //                     <AnimatePresence>
// //                       {activeIndex === index + leftNavItems.length && (
// //                         <motion.div
// //                           className="absolute inset-0 bg-black/5 rounded-lg -z-0"
// //                           initial={{ scale: 0.8, opacity: 0 }}
// //                           animate={{ scale: 1, opacity: 1 }}
// //                           exit={{ scale: 0.8, opacity: 0 }}
// //                           transition={{ duration: 0.2 }}
// //                         />
// //                       )}
// //                     </AnimatePresence>
// //                   </motion.a>
// //                 ))}
                
// //                 {freelancerId ? (
// //                   <motion.a
// //                     href={`/freelancer/${freelancerId}/dashboard`}
// //                     whileHover={{ scale: 1.02 }}
// //                     whileTap={{ scale: 0.98 }}
// //                     className="ml-2 px-5 py-2 bg-black text-white rounded-xl text-sm font-medium
// //                              hover:bg-gray-900 transition-colors duration-300 flex items-center gap-2 group"
// //                   >
// //                     Dashboard
// //                     <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
// //                   </motion.a>
// //                 ) : (
// //                   <motion.a
// //                     href="/auth/freelancer/signup"
// //                     whileHover={{ scale: 1.02 }}
// //                     whileTap={{ scale: 0.98 }}
// //                     className="ml-2 px-5 py-2 bg-black text-white rounded-xl text-sm font-medium
// //                              hover:bg-gray-900 transition-colors duration-300 flex items-center gap-2 group"
// //                   >
// //                     Get Started
// //                     <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
// //                   </motion.a>
// //                 )}
// //               </div>

// //               {/* Mobile Menu Button */}
// //               <motion.button
// //                 whileTap={{ scale: 0.95 }}
// //                 onClick={() => setIsOpen(!isOpen)}
// //                 className="p-2 rounded-xl hover:bg-gray-100 transition-colors md:hidden"
// //               >
// //                 {isOpen ? (
// //                   <X className="w-6 h-6 text-gray-900" />
// //                 ) : (
// //                   <Menu className="w-6 h-6 text-gray-900" />
// //                 )}
// //               </motion.button>
// //             </div>
// //           </div>

// //           {/* Mobile Menu */}
// //           <AnimatePresence>
// //             {isOpen && (
// //               <motion.div
// //                 initial={{ opacity: 0, height: 0 }}
// //                 animate={{ opacity: 1, height: 'auto' }}
// //                 exit={{ opacity: 0, height: 0 }}
// //                 transition={{ duration: 0.3 }}
// //                 className="border-t border-gray-100 md:hidden overflow-hidden"
// //               >
// //                 <div className="px-4 py-4 space-y-2">
// //                   {[...leftNavItems, ...rightNavItems].map((item, index) => (
// //                     <motion.a
// //                       key={item.label}
// //                       href={item.href}
// //                       initial={{ x: -20, opacity: 0 }}
// //                       animate={{ x: 0, opacity: 1 }}
// //                       transition={{ delay: index * 0.1 }}
// //                       onClick={() => setIsOpen(false)}
// //                       className="block px-4 py-2 text-gray-600 hover:text-black rounded-xl
// //                                hover:bg-gray-100 transition-colors text-sm font-medium"
// //                     >
// //                       {item.label}
// //                     </motion.a>
// //                   ))}
                  
// //                   <motion.a
// //                     href="/auth/freelancer/signup"
// //                     initial={{ x: -20, opacity: 0 }}
// //                     animate={{ x: 0, opacity: 1 }}
// //                     transition={{ delay: (leftNavItems.length + rightNavItems.length) * 0.1 }}
// //                     className="block mt-4 px-4 py-2 bg-black text-white rounded-xl text-sm 
// //                              font-medium hover:bg-gray-900 transition-colors text-center"
// //                     onClick={() => setIsOpen(false)}
// //                   >
// //                     Get Started
// //                   </motion.a>
// //                 </div>
// //               </motion.div>
// //             )}
// //           </AnimatePresence>
// //         </motion.nav>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Navbar;

// "use client";

// import React, { useState, useEffect } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { Menu, X, ArrowRight } from 'lucide-react';
// import { useAuth } from '@/context/authContext';
// const Navbar = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [scrolled, setScrolled] = useState(false);
//   const [activeIndex, setActiveIndex] = useState(null);
//   const [mounted, setMounted] = useState(false);

//   const { freelancerId,adminId, email, isAuthenticated, isLoading, logout } = useAuth();
//   console.log( freelancerId)
  
//   // useEffect(() => {
//   //   setMounted(true);
//   //   if (typeof window !== 'undefined') {
//   //     const id = window.localStorage.getItem('freelancerId');
//   //     setFreelancerId(id);
//   //   }

//   //   const handleScroll = () => {
//   //     setScrolled(window.scrollY > 20);
//   //   };
//   //   window.addEventListener('scroll', handleScroll);
//   //   return () => window.removeEventListener('scroll', handleScroll);
//   // }, []);

//   // Left side navigation items
//   useEffect(() => {
//     setMounted(true);  // Still needed for SSR
    
//     const handleScroll = () => {
//       setScrolled(window.scrollY > 20);
//     };
//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);
//   const leftNavItems = [
//     { label: 'How To Use', href: '/#usage' },
//     { label: 'Our Blogs', href: '/blogs' },
//   ];

//   // Right side navigation items
//   const rightNavItems = [
//     { label: 'Benefits', href: '/#benefits' },
//     { label: 'Pricing', href: '/pricing' },
//     { label: 'About', href: '/about' },
//     { label: 'Contact', href: '/contact' },
//     { label: 'Login', href: '/auth/freelancer/login' },
//   ];

//   if (!mounted) {
//     return null;
//   }

//   return (
//     <div className="w-full fixed top-6 left-0 right-0 px-4 z-50">
//       <div className="max-w-7xl mx-auto">
//         <nav className={`
//           rounded-2xl relative backdrop-blur-md transition-all duration-300
//           ${scrolled 
//             ? 'bg-white/70 shadow-lg border border-gray-200/50' 
//             : 'bg-white shadow-md'}
//         `}>
//           <div className="px-6 sm:px-8 py-4">
//             <div className="flex items-center justify-between">
//               {/* Left Section */}
//               <div className="flex items-center gap-8">
//                 {/* Logo */}
//                 <motion.div 
//                   whileHover={{ scale: 1.05 }}
//                   className="relative z-10 flex items-center gap-3 cursor-pointer"
//                   onClick={() => window.location.href = '/'}
//                 >
//                   <div className="h-9 w-9 bg-black rounded-xl flex items-center justify-center">
//                     <span className="text-white text-xl font-bold">W</span>
//                   </div>
//                   <span className="text-black font-medium text-lg hidden sm:block">WorkOnGigs</span>
//                 </motion.div>

//                 {/* Left Navigation Items - Desktop */}
//                 <div className="hidden md:flex items-center gap-1">
//                   {leftNavItems.map((item, index) => (
//                     <motion.a
//                       key={item.label}
//                       href={item.href}
//                       className="relative px-4 py-2 text-gray-600 transition-colors duration-300
//                                hover:text-black group"
//                       onHoverStart={() => setActiveIndex(index)}
//                       onHoverEnd={() => setActiveIndex(null)}
//                     >
//                       <span className="relative z-10 text-sm font-medium">{item.label}</span>
                      
//                       <AnimatePresence>
//                         {activeIndex === index && (
//                           <motion.div
//                             className="absolute inset-0 bg-black/5 rounded-lg -z-0"
//                             initial={{ scale: 0.8, opacity: 0 }}
//                             animate={{ scale: 1, opacity: 1 }}
//                             exit={{ scale: 0.8, opacity: 0 }}
//                             transition={{ duration: 0.2 }}
//                           />
//                         )}
//                       </AnimatePresence>
//                     </motion.a>
//                   ))}
//                 </div>
//               </div>

//               {/* Right Section - Desktop */}
//               <div className="hidden md:flex items-center gap-2">
//                 {rightNavItems.map((item, index) => (
//                   <motion.a
//                     key={item.label}
//                     href={item.href}
//                     className="relative px-4 py-2 text-gray-600 transition-colors duration-300
//                              hover:text-black group"
//                     onHoverStart={() => setActiveIndex(index + leftNavItems.length)}
//                     onHoverEnd={() => setActiveIndex(null)}
//                   >
//                     <span className="relative z-10 text-sm font-medium">{item.label}</span>
                    
//                     <AnimatePresence>
//                       {activeIndex === index + leftNavItems.length && (
//                         <motion.div
//                           className="absolute inset-0 bg-black/5 rounded-lg -z-0"
//                           initial={{ scale: 0.8, opacity: 0 }}
//                           animate={{ scale: 1, opacity: 1 }}
//                           exit={{ scale: 0.8, opacity: 0 }}
//                           transition={{ duration: 0.2 }}
//                         />
//                       )}
//                     </AnimatePresence>
//                   </motion.a>
//                 ))}
                
//                 {freelancerId ? (
//                   <motion.a
//                     href={`/freelancer/dashboard`}
//                     whileHover={{ scale: 1.02 }}
//                     whileTap={{ scale: 0.98 }}
//                     className="ml-2 px-5 py-2 bg-black text-white rounded-xl text-sm font-medium
//                              hover:bg-gray-900 transition-colors duration-300 flex items-center gap-2 group"
//                   >
//                     Dashboard
//                     <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
//                   </motion.a>
//                 ) : (
//                   <motion.a
//                     href="/auth/freelancer/signup"
//                     whileHover={{ scale: 1.02 }}
//                     whileTap={{ scale: 0.98 }}
//                     className="ml-2 px-5 py-2 bg-black text-white rounded-xl text-sm font-medium
//                              hover:bg-gray-900 transition-colors duration-300 flex items-center gap-2 group"
//                   >
//                     Get Started
//                     <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
//                   </motion.a>
//                 )}
                
//                 {adminId ? (
//   <motion.a
//     href={`/admin`}
//     whileHover={{ scale: 1.02 }}
//     whileTap={{ scale: 0.98 }}
//     className="ml-2 px-5 py-2 bg-black text-white rounded-xl text-sm font-medium
//              hover:bg-gray-900 transition-colors duration-300 flex items-center gap-2 group"
//   >
//     Admin Dashboard
//     <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
//   </motion.a>
// ) : null}

//               </div>

//               {/* Mobile Menu Button */}
//               <motion.button
//                 whileTap={{ scale: 0.95 }}
//                 onClick={() => setIsOpen(!isOpen)}
//                 className="p-2 rounded-xl hover:bg-gray-100 transition-colors md:hidden"
//               >
//                 {isOpen ? (
//                   <X className="w-6 h-6 text-gray-900" />
//                 ) : (
//                   <Menu className="w-6 h-6 text-gray-900" />
//                 )}
//               </motion.button>
//             </div>
//           </div>

//           {/* Mobile Menu */}
//           <AnimatePresence>
//             {isOpen && (
//               <motion.div
//                 initial={{ opacity: 0, height: 0 }}
//                 animate={{ opacity: 1, height: 'auto' }}
//                 exit={{ opacity: 0, height: 0 }}
//                 transition={{ duration: 0.3 }}
//                 className="border-t border-gray-100 md:hidden overflow-hidden"
//               >
//                 <div className="px-4 py-4 space-y-2">
//                   {[...leftNavItems, ...rightNavItems].map((item, index) => (
//                     <motion.a
//                       key={item.label}
//                       href={item.href}
//                       initial={{ x: -20, opacity: 0 }}
//                       animate={{ x: 0, opacity: 1 }}
//                       transition={{ delay: index * 0.1 }}
//                       onClick={() => setIsOpen(false)}
//                       className="block px-4 py-2 text-gray-600 hover:text-black rounded-xl
//                                hover:bg-gray-100 transition-colors text-sm font-medium"
//                     >
//                       {item.label}
//                     </motion.a>
//                   ))}
                  
//                   <motion.a
//                     href="/auth/freelancer/signup"
//                     initial={{ x: -20, opacity: 0 }}
//                     animate={{ x: 0, opacity: 1 }}
//                     transition={{ delay: (leftNavItems.length + rightNavItems.length) * 0.1 }}
//                     className="block mt-4 px-4 py-2 bg-black text-white rounded-xl text-sm 
//                              font-medium hover:bg-gray-900 transition-colors text-center"
//                     onClick={() => setIsOpen(false)}
//                   >
//                     Get Started
//                   </motion.a>
//                 </div>
//               </motion.div>
//             )}
//           </AnimatePresence>
//         </nav>
//       </div>
//     </div>
//   );
// };

// export default Navbar;
"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowRight } from 'lucide-react';
import { useAuth } from '@/context/authContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeIndex, setActiveIndex] = useState(null);
  const [mounted, setMounted] = useState(false);

  const { freelancerId, adminId, email, isAuthenticated, isLoading, logout } = useAuth();
  
  useEffect(() => {
    setMounted(true);  // Still needed for SSR
    
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Left side navigation items
  const leftNavItems = [
    { label: 'How To Use', href: '/#usage' },
    { label: 'Our Blogs', href: '/blogs' },
  ];

  // Right side navigation items
  const rightNavItems = [
    { label: 'Benefits', href: '/#benefits' },
    { label: 'Pricing', href: '/pricing' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
    { label: 'Login', href: '/auth/freelancer/login' },
  ];

  if (!mounted) {
    return null;
  }

  return (
    <div className="w-full fixed top-6 left-0 right-0 px-4 z-50">
      <div className="max-w-7xl mx-auto">
        <nav className={`
          rounded-2xl relative backdrop-blur-md transition-all duration-300
          ${scrolled 
            ? 'bg-white/70 shadow-lg border border-gray-200/50' 
            : 'bg-white shadow-md'}
        `}>
          <div className="px-6 sm:px-8 py-4">
            <div className="flex items-center justify-between">
              {/* Left Section */}
              <div className="flex items-center gap-8">
                {/* Logo */}
                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  className="relative z-10 flex items-center gap-3 cursor-pointer"
                  onClick={() => window.location.href = '/'}
                >
                  <div className="h-9 w-9 bg-black rounded-xl flex items-center justify-center">
                    <span className="text-white text-xl font-bold">W</span>
                  </div>
                  <span className="text-black font-medium text-lg hidden sm:block">WorkOnGigs</span>
                </motion.div>

                {/* Left Navigation Items - Desktop */}
                <div className="hidden md:flex items-center gap-1">
                  {leftNavItems.map((item, index) => (
                    <motion.a
                      key={item.label}
                      href={item.href}
                      className="relative px-4 py-2 text-gray-600 transition-colors duration-300
                               hover:text-black group"
                      onHoverStart={() => setActiveIndex(index)}
                      onHoverEnd={() => setActiveIndex(null)}
                    >
                      <span className="relative z-10 text-sm font-medium">{item.label}</span>
                      
                      <AnimatePresence>
                        {activeIndex === index && (
                          <motion.div
                            className="absolute inset-0 bg-black/5 rounded-lg -z-0"
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                          />
                        )}
                      </AnimatePresence>
                    </motion.a>
                  ))}
                </div>
              </div>

              {/* Right Section - Desktop */}
              <div className="hidden md:flex items-center gap-2">
                {rightNavItems.map((item, index) => (
                  <motion.a
                    key={item.label}
                    href={item.href}
                    className="relative px-4 py-2 text-gray-600 transition-colors duration-300
                             hover:text-black group"
                    onHoverStart={() => setActiveIndex(index + leftNavItems.length)}
                    onHoverEnd={() => setActiveIndex(null)}
                  >
                    <span className="relative z-10 text-sm font-medium">{item.label}</span>
                    
                    <AnimatePresence>
                      {activeIndex === index + leftNavItems.length && (
                        <motion.div
                          className="absolute inset-0 bg-black/5 rounded-lg -z-0"
                          initial={{ scale: 0.8, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          exit={{ scale: 0.8, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                        />
                      )}
                    </AnimatePresence>
                  </motion.a>
                ))}
                
                {freelancerId ? (
                  <motion.a
                    href={`/freelancer/dashboard`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="ml-2 px-5 py-2 bg-black text-white rounded-xl text-sm font-medium
                             hover:bg-gray-900 transition-colors duration-300 flex items-center gap-2 group"
                  >
                    Dashboard
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </motion.a>
                ) : (
                  <motion.a
                    href="/auth/freelancer/signup"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="ml-2 px-5 py-2 bg-black text-white rounded-xl text-sm font-medium
                             hover:bg-gray-900 transition-colors duration-300 flex items-center gap-2 group"
                  >
                    Get Started
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </motion.a>
                )}
                
                {adminId ? (
                  <motion.a
                    href={`/admin`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="ml-2 px-5 py-2 bg-black text-white rounded-xl text-sm font-medium
                             hover:bg-gray-900 transition-colors duration-300 flex items-center gap-2 group"
                  >
                    Admin Dashboard
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </motion.a>
                ) : null}
              </div>

              {/* Mobile Menu Button */}
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 rounded-xl hover:bg-gray-100 transition-colors md:hidden"
              >
                {isOpen ? (
                  <X className="w-6 h-6 text-gray-900" />
                ) : (
                  <Menu className="w-6 h-6 text-gray-900" />
                )}
              </motion.button>
            </div>
          </div>

          {/* Mobile Menu */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="border-t border-gray-100 md:hidden overflow-hidden"
              >
                <div className="px-4 py-4 space-y-2">
                  {[...leftNavItems, ...rightNavItems].map((item, index) => (
                    <motion.a
                      key={item.label}
                      href={item.href}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: index * 0.1 }}
                      onClick={() => setIsOpen(false)}
                      className="block px-4 py-2 text-gray-600 hover:text-black rounded-xl
                               hover:bg-gray-100 transition-colors text-sm font-medium"
                    >
                      {item.label}
                    </motion.a>
                  ))}
                  
                  {/* Conditional rendering for mobile navigation buttons */}
                  {freelancerId ? (
                    <motion.a
                      href="/freelancer/dashboard"
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: (leftNavItems.length + rightNavItems.length) * 0.1 }}
                      className="block mt-4 px-4 py-2 bg-black text-white rounded-xl text-sm 
                               font-medium hover:bg-gray-900 transition-colors text-center flex items-center justify-center gap-2"
                      onClick={() => setIsOpen(false)}
                    >
                      Dashboard
                      <ArrowRight className="w-4 h-4" />
                    </motion.a>
                  ) : (
                    <motion.a
                      href="/auth/freelancer/signup"
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: (leftNavItems.length + rightNavItems.length) * 0.1 }}
                      className="block mt-4 px-4 py-2 bg-black text-white rounded-xl text-sm 
                               font-medium hover:bg-gray-900 transition-colors text-center flex items-center justify-center gap-2"
                      onClick={() => setIsOpen(false)}
                    >
                      Get Started
                      <ArrowRight className="w-4 h-4" />
                    </motion.a>
                  )}
                  
                  {/* Add Admin Dashboard for mobile if adminId exists */}
                  {adminId && (
                    <motion.a
                      href="/admin"
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: (leftNavItems.length + rightNavItems.length + 1) * 0.1 }}
                      className="block mt-2 px-4 py-2 bg-black text-white rounded-xl text-sm 
                               font-medium hover:bg-gray-900 transition-colors text-center flex items-center justify-center gap-2"
                      onClick={() => setIsOpen(false)}
                    >
                      Admin Dashboard
                      <ArrowRight className="w-4 h-4" />
                    </motion.a>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;