
"use client"
// import React, { useState, useEffect } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { Menu, X, ArrowRight } from 'lucide-react';

// const Navbar = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [scrolled, setScrolled] = useState(false);
//   const [activeIndex, setActiveIndex] = useState(null);

//   useEffect(() => {
//     const handleScroll = () => {
//       setScrolled(window.scrollY > 20);
//     };
//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   const navItems = [
//     { label: 'About', href: '#about' },
//     { label: 'Projects', href: '#projects' },
//     { label: 'Services', href: '#services' },
//     { label: 'Reviews', href: '#reviews' },
//     { label: 'Contact', href: '#contact' }
//   ];

//   return (
//     <motion.div 
//       initial={{ y: -100 }}
//       animate={{ y: 0 }}
//       className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 
//                 ${scrolled ? 'bg-white shadow-md' : 'bg-white'}`}
//     >
//       <div className="max-w-7xl mx-auto">
//         <nav className="relative border-b border-gray-100">
//           <div className="px-4 sm:px-6 lg:px-8 py-4">
//             <div className="flex items-center justify-between">
//               {/* Logo */}
//               <motion.div 
//                 whileHover={{ scale: 1.05 }}
//                 className="relative z-10"
//               >
//                 <div className="h-10 w-10 bg-black rounded-xl flex items-center justify-center">
//                   <span className="text-white text-xl font-bold">R</span>
//                 </div>
//               </motion.div>

//               {/* Desktop Navigation */}
//               <div className="hidden md:flex items-center gap-1">
//                 {navItems.map((item, index) => (
//                   <motion.a
//                     key={item.label}
//                     href={item.href}
//                     className="relative px-4 py-2 text-gray-600 transition-colors duration-300
//                              hover:text-black group"
//                     onHoverStart={() => setActiveIndex(index)}
//                     onHoverEnd={() => setActiveIndex(null)}
//                   >
//                     <span className="relative z-10 text-sm font-medium">{item.label}</span>
                    
//                     <AnimatePresence>
//                       {activeIndex === index && (
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
                
//                 <motion.a
//                   href="#contact"
//                   whileHover={{ scale: 1.02 }}
//                   whileTap={{ scale: 0.98 }}
//                   className="ml-3 px-5 py-2 bg-black text-white rounded-lg text-sm font-medium
//                            hover:bg-gray-900 transition-colors duration-300 flex items-center gap-2 group"
//                 >
//                   Hire Me
//                   <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
//                 </motion.a>
//               </div>

//               {/* Mobile Menu Button */}
//               <motion.button
//                 whileTap={{ scale: 0.95 }}
//                 onClick={() => setIsOpen(!isOpen)}
//                 className="p-2 rounded-lg hover:bg-gray-100 transition-colors md:hidden"
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
//                 className="border-t border-gray-100 md:hidden overflow-hidden bg-white"
//               >
//                 <div className="px-4 py-4 space-y-2">
//                   {navItems.map((item, index) => (
//                     <motion.a
//                       key={item.label}
//                       href={item.href}
//                       initial={{ x: -20, opacity: 0 }}
//                       animate={{ x: 0, opacity: 1 }}
//                       transition={{ delay: index * 0.1 }}
//                       onClick={() => setIsOpen(false)}
//                       className="block px-4 py-2 text-gray-600 hover:text-black rounded-lg
//                                hover:bg-gray-100 transition-colors text-sm font-medium"
//                     >
//                       {item.label}
//                     </motion.a>
//                   ))}
                  
//                   <motion.a
//                     href="#contact"
//                     initial={{ x: -20, opacity: 0 }}
//                     animate={{ x: 0, opacity: 1 }}
//                     transition={{ delay: navItems.length * 0.1 }}
//                     className="block mt-4 px-4 py-2 bg-black text-white rounded-lg text-sm 
//                              font-medium hover:bg-gray-900 transition-colors text-center"
//                     onClick={() => setIsOpen(false)}
//                   >
//                     Hire Me
//                   </motion.a>
//                 </div>
//               </motion.div>
//             )}
//           </AnimatePresence>
//         </nav>
//       </div>
      
//       {/* Gradient Line */}
//       <motion.div 
//         initial={{ scaleX: 0 }}
//         animate={{ scaleX: 1 }}
//         className="h-[1px] bg-gradient-to-r from-transparent via-black/10 to-transparent"
//       />
//     </motion.div>
//   );
// };

// export default Navbar;
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowRight } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeIndex, setActiveIndex] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Left side navigation items
  const leftNavItems = [
    { label: 'How To Use', href: '#projects' },
    
  ];

  // Right side navigation items
  const rightNavItems = [
    { label: 'Benefits', href: '#benefits' },
    { label: 'Pricing', href: '/Pricing' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
  ];

  return (
    <div className="w-full fixed top-6 left-0 right-0 px-4 z-50">
      <div className="max-w-7xl mx-auto">
        <motion.nav
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className={`
            rounded-2xl relative backdrop-blur-md transition-all duration-300
            ${scrolled 
              ? 'bg-white/70 shadow-lg border border-gray-200/50' 
              : 'bg-white shadow-md'}
          `}
        >
          <div className="px-6 sm:px-8 py-4">
            <div className="flex items-center justify-between">
              {/* Left Section */}
              <div className="flex items-center gap-8">
                {/* Logo */}
                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  className="relative z-10 flex items-center gap-3"
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
                
                <motion.a
                  href="#contact"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="ml-2 px-5 py-2 bg-black text-white rounded-xl text-sm font-medium
                           hover:bg-gray-900 transition-colors duration-300 flex items-center gap-2 group"
                >
                  Get Started
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </motion.a>
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
                  
                  <motion.a
                    href="#contact"
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: (leftNavItems.length + rightNavItems.length) * 0.1 }}
                    className="block mt-4 px-4 py-2 bg-black text-white rounded-xl text-sm 
                             font-medium hover:bg-gray-900 transition-colors text-center"
                    onClick={() => setIsOpen(false)}
                  >
                    Get Started
                  </motion.a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.nav>
      </div>
    </div>
  );
};

export default Navbar;


// import React, { useState, useEffect } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { Menu, X, ArrowRight } from 'lucide-react';

// const Navbar = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [scrolled, setScrolled] = useState(false);
//   const [activeIndex, setActiveIndex] = useState(null);

//   useEffect(() => {
//     const handleScroll = () => {
//       setScrolled(window.scrollY > 20);
//     };
//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   // Left side items
//   const leftNavItems = [
//     { label: 'How to use', href: '#how-to-use' },
//   ];

//   // Right side items
//   const rightNavItems = [
//     { label: 'Benefits', href: '#benefits' },
//     { label: 'Pricing', href: '#pricing' },
//     { label: 'About', href: '#about' },
//     { label: 'Contact', href: '#contact' },
//   ];

//   return (
//     <motion.div 
//       initial={{ y: -100 }}
//       animate={{ y: 0 }}
//       className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500
//                 ${scrolled 
//                   ? 'bg-white/80 backdrop-blur-md shadow-lg' 
//                   : 'bg-transparent'}
//               `}
//     >
//       <div className="max-w-7xl mx-auto">
//         <nav className={`relative ${scrolled ? 'border-b border-gray-200/50' : ''}`}>
//           <div className="px-4 sm:px-6 lg:px-8 py-4">
//             <div className="flex items-center justify-between">
//               {/* Left Section */}
//               <div className="flex items-center gap-8">
//                 {/* Logo and Name */}
//                 <motion.div 
//                   whileHover={{ scale: 1.05 }}
//                   className="relative z-10 flex items-center gap-3"
//                 >
//                   <div className="h-10 w-10 bg-black rounded-xl flex items-center justify-center">
//                     <span className="text-white text-xl font-bold">R</span>
//                   </div>
//                   <span className="text-gray-900 font-medium text-lg hidden sm:block">Rohan</span>
//                 </motion.div>

//                 {/* How to use link */}
//                 <div className="hidden md:flex items-center">
//                   {leftNavItems.map((item, index) => (
//                     <motion.a
//                       key={item.label}
//                       href={item.href}
//                       className="relative px-4 py-2 text-gray-600 hover:text-gray-900 
//                                transition-colors duration-300"
//                     >
//                       <span className="text-sm font-medium">{item.label}</span>
//                     </motion.a>
//                   ))}
//                 </div>
//               </div>

//               {/* Right Section */}
//               <div className="hidden md:flex items-center gap-2">
//                 {rightNavItems.map((item, index) => (
//                   <motion.a
//                     key={item.label}
//                     href={item.href}
//                     className="relative px-4 py-2 text-gray-600 hover:text-gray-900 
//                              transition-colors duration-300"
//                     onHoverStart={() => setActiveIndex(index)}
//                     onHoverEnd={() => setActiveIndex(null)}
//                   >
//                     <span className="text-sm font-medium">{item.label}</span>
                    
//                     <AnimatePresence>
//                       {activeIndex === index && (
//                         <motion.div
//                           className="absolute inset-0 bg-gray-100 rounded-lg -z-0"
//                           initial={{ scale: 0.8, opacity: 0 }}
//                           animate={{ scale: 1, opacity: 1 }}
//                           exit={{ scale: 0.8, opacity: 0 }}
//                           transition={{ duration: 0.2 }}
//                         />
//                       )}
//                     </AnimatePresence>
//                   </motion.a>
//                 ))}
                
//                 <motion.a
//                   href="#contact"
//                   whileHover={{ scale: 1.02 }}
//                   whileTap={{ scale: 0.98 }}
//                   className="ml-3 px-5 py-2 bg-black text-white rounded-lg text-sm font-medium
//                            hover:bg-gray-900 transition-colors duration-300 flex items-center gap-2 group"
//                 >
//                   Get Started
//                   <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
//                 </motion.a>
//               </div>

//               {/* Mobile Menu Button */}
//               <motion.button
//                 whileTap={{ scale: 0.95 }}
//                 onClick={() => setIsOpen(!isOpen)}
//                 className="p-2 rounded-lg hover:bg-gray-100 transition-colors md:hidden"
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
//                 className="border-t border-gray-100 md:hidden overflow-hidden bg-white/80 backdrop-blur-md"
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
//                       className="block px-4 py-2 text-gray-600 hover:text-black rounded-lg
//                                hover:bg-gray-100 transition-colors text-sm font-medium"
//                     >
//                       {item.label}
//                     </motion.a>
//                   ))}
                  
//                   <motion.a
//                     href="#contact"
//                     initial={{ x: -20, opacity: 0 }}
//                     animate={{ x: 0, opacity: 1 }}
//                     transition={{ delay: (leftNavItems.length + rightNavItems.length) * 0.1 }}
//                     className="block mt-4 px-4 py-2 bg-black text-white rounded-lg text-sm 
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
//     </motion.div>
//   );
// };

// export default Navbar;