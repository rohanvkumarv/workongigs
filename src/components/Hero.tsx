

// import React from 'react';
// import { motion } from 'framer-motion';
// // import { SignedIn, SignedOut } from '@clerk/nextjs';
// import Link from 'next/link';
// import { ArrowRight, Shield, Lock, CheckCircle, ArrowUpRight ,Users,Bell } from 'lucide-react';

// const CustomButton = ({ href, children, variant = "primary" }) => (
//   <motion.div 
//     whileHover={{ scale: 1.02 }} 
//     whileTap={{ scale: 0.98 }}
//   >
//     <Link href={href}>
//       <button className={`
//         px-8 py-3 rounded-xl font-medium transition-all duration-300 
//         flex items-center justify-center gap-2 group 
//         ${variant === 'primary' 
//           ? 'bg-black text-white hover:bg-gray-900' 
//           : 'bg-white text-black border-2 border-gray-200 hover:border-black'
//         }
//       `}>
//         {children}
//       </button>
//     </Link>
//   </motion.div>
// );


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
//       className="max-w-3xl mx-auto bg-white rounded-2xl p-4 md:p-8 shadow-lg border border-gray-100
//                 hover:shadow-xl transition-shadow duration-300"
//     >
//       <div className="flex flex-col md:flex-row md:justify-between md:items-center md:divide-x divide-gray-200 gap-8 md:gap-0">
//         {features.map((feature, index) => {
//           const Icon = feature.icon;
//           return (
//             <div 
//               key={index} 
//               className="flex-1 md:px-6 first:md:pl-0 last:md:pr-0 text-center group border-b md:border-b-0 last:border-b-0 pb-8 md:pb-0 last:pb-0"
//             >
//               <div className="flex flex-col items-center gap-3">
//                 <div className="w-12 h-12 rounded-xl bg-black/5 flex items-center justify-center
//                             group-hover:bg-black group-hover:text-white transition-colors duration-300">
//                   <Icon className="w-6 h-6" />
//                 </div>
//                 <h3 className="text-lg font-semibold text-gray-900">
//                   {feature.label}
//                 </h3>
//                 <p className="text-sm text-gray-600 max-w-xs mx-auto">
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

// const Hero = () => {
//   return (
//     // <div className="relative min-h-screen bg-white overflow-hidden" id="home">
//     //   {/* Background Elements */}
//     //   <div className="absolute inset-0">
//     //     <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000008_1px,transparent_1px),linear-gradient(to_bottom,#00000008_1px,transparent_1px)] bg-[size:24px_24px]" />
//     //   </div>
      
//     //   {/* Gradient Orbs */}
//     //   <div className="absolute inset-0 overflow-hidden">
//     //     <div className="absolute top-0 -right-40 w-80 h-80 rounded-full 
//     //                  bg-gradient-to-br from-black/5 to-transparent blur-3xl" />
//     //     <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full 
//     //                  bg-gradient-to-tr from-black/5 to-transparent blur-3xl" />
//     //   </div>

//     //   {/* Content Container */}
//     //   <div className="max-w-7xl mx-auto px-4 relative">
//     //     <div className="pt-32 pb-20">
//     //       {/* Main Content */}
//     //       <div className="text-center max-w-4xl mx-auto">
//     //         {/* Premium Label */}
//     //         <motion.div
//     //           initial={{ opacity: 0, y: 20 }}
//     //           animate={{ opacity: 1, y: 0 }}
//     //           transition={{ duration: 0.5 }}
//     //           className="mb-6"
//     //         >
//     //           <span className="px-4 py-2 rounded-full bg-black/5 text-gray-700 
//     //                        text-sm font-medium inline-block">
//     //             Welcome to the Future of Freelancing
//     //           </span>
//     //         </motion.div>

//     //         {/* Hero Title */}
//     //         <motion.h1
//     //           initial={{ opacity: 0, y: 20 }}
//     //           animate={{ opacity: 1, y: 0 }}
//     //           transition={{ duration: 0.5, delay: 0.1 }}
//     //           className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-6"
//     //         >
//     //           Say hello to{" "}
//     //           <span className="relative inline-block">
//     //             WorkOnGigs
//     //             <motion.div
//     //               className="absolute -bottom-2 left-0 right-0 h-1 bg-black rounded-full"
//     //               initial={{ scaleX: 0 }}
//     //               animate={{ scaleX: 1 }}
//     //               transition={{ duration: 0.5, delay: 0.5 }}
//     //             />
//     //           </span>
//     //         </motion.h1>

//     //         {/* Description */}
//     //         <motion.p
//     //           initial={{ opacity: 0, y: 20 }}
//     //           animate={{ opacity: 1, y: 0 }}
//     //           transition={{ duration: 0.5, delay: 0.2 }}
//     //           className="text-lg sm:text-xl text-gray-600 mb-12 max-w-2xl mx-auto"
//     //         >
//     //           We Ensure: Freelancers Get Paid and Clients Receive Satisfactory Work
//     //         </motion.p>

//     //         {/* CTA Buttons */}
//     //         <motion.div
//     //           initial={{ opacity: 0, y: 20 }}
//     //           animate={{ opacity: 1, y: 0 }}
//     //           transition={{ duration: 0.5, delay: 0.3 }}
//     //           className="flex flex-wrap justify-center gap-4 mb-20"
//     //         >
//     //           {/* <SignedOut>
//     //             <Link href="/sign-in">
//     //               <motion.button
//     //                 whileHover={{ scale: 1.02 }}
//     //                 whileTap={{ scale: 0.98 }}
//     //                 className="px-8 py-3 bg-black text-white rounded-xl font-medium
//     //                          hover:bg-gray-900 transition-all duration-300
//     //                          flex items-center gap-2 group"
//     //               >
//     //                 Get Started
//     //                 <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
//     //               </motion.button>
//     //             </Link>
//     //           </SignedOut>

//     //           <SignedIn>
//     //             <Link href="/dashboard/upload">
//     //               <motion.button
//     //                 whileHover={{ scale: 1.02 }}
//     //                 whileTap={{ scale: 0.98 }}
//     //                 className="px-8 py-3 bg-black text-white rounded-xl font-medium
//     //                          hover:bg-gray-900 transition-all duration-300
//     //                          flex items-center gap-2 group"
//     //               >
//     //                 Upload New Project
//     //                 <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
//     //               </motion.button>
//     //             </Link>
//     //           </SignedIn> */}
//     //         </motion.div>

//     //         {/* Features Section */}
//     //         <FeatureStrip />
//     //       </div>
//     //     </div>
//     //   </div>
//     // </div>
// //     <div className="relative min-h-screen bg-white overflow-hidden" id="home">
// //   {/* Background Elements */}
// //   <div className="absolute inset-0">
// //     <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000008_1px,transparent_1px),linear-gradient(to_bottom,#00000008_1px,transparent_1px)] bg-[size:24px_24px]" />
// //   </div>
  
// //   {/* Gradient Orbs */}
// //   <div className="absolute inset-0 overflow-hidden">
// //     <div className="absolute top-0 -right-40 w-80 h-80 rounded-full 
// //                  bg-gradient-to-br from-black/5 to-transparent blur-3xl" />
// //     <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full 
// //                  bg-gradient-to-tr from-black/5 to-transparent blur-3xl" />
// //   </div>

// //   {/* Content Container */}
// //   <div className="max-w-7xl mx-auto px-4 relative">
// //     <div className="pt-32 pb-20">
// //       {/* Main Content */}
// //       <div className="text-center max-w-4xl mx-auto">
// //         {/* Premium Label */}
// //         <motion.div
// //           initial={{ opacity: 0, y: 20 }}
// //           animate={{ opacity: 1, y: 0 }}
// //           transition={{ duration: 0.5 }}
// //           className="mb-6"
// //         >
// //           <span className="px-4 py-2 rounded-full bg-black/5 text-gray-700 
// //                        text-sm font-medium inline-block">
// //             Welcome to the Future of Freelancing
// //           </span>
// //         </motion.div>

// //         {/* Hero Title */}
// //         <motion.h1
// //           initial={{ opacity: 0, y: 20 }}
// //           animate={{ opacity: 1, y: 0 }}
// //           transition={{ duration: 0.5, delay: 0.1 }}
// //           className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-6"
// //         >
// //           Say hello to{" "}
// //           <span className="relative inline-block">
// //             WorkOnGigs
// //             <motion.div
// //               className="absolute -bottom-2 left-0 right-0 h-1 bg-black rounded-full"
// //               initial={{ scaleX: 0 }}
// //               animate={{ scaleX: 1 }}
// //               transition={{ duration: 0.5, delay: 0.5 }}
// //             />
// //           </span>
// //         </motion.h1>

// //         {/* Description */}
// //         <motion.p
// //           initial={{ opacity: 0, y: 20 }}
// //           animate={{ opacity: 1, y: 0 }}
// //           transition={{ duration: 0.5, delay: 0.2 }}
// //           className="text-lg sm:text-xl text-gray-600 mb-8 max-w-2xl mx-auto"
// //         >
// //           We Ensure: Freelancers Get Paid and Clients Receive Satisfactory Work
// //         </motion.p>

// //         {/* WhatsApp Community Button */}
// //         <motion.div
// //           initial={{ opacity: 0, y: 20 }}
// //           animate={{ opacity: 1, y: 0 }}
// //           transition={{ duration: 0.5, delay: 0.3 }}
// //           className="mb-12"
// //         >
// //           <a
// //             href="https://chat.whatsapp.com/CSyUwqxVCc4HfVOPbEzhAs"
// //             target="_blank"
// //             rel="noopener noreferrer"
// //           >
// //             <motion.button
// //               whileHover={{ scale: 1.02 }}
// //               whileTap={{ scale: 0.98 }}
// //               className="px-8 py-3 bg-gradient-to-r from-green-500 to-green-600 
// //                        text-white rounded-xl font-medium shadow-lg
// //                        hover:from-green-600 hover:to-green-700 
// //                        transition-all duration-300
// //                        flex items-center gap-3 group mx-auto
// //                        border border-green-400/20"
// //             >
// //               <svg
// //                 className="w-5 h-5"
// //                 viewBox="0 0 24 24"
// //                 fill="currentColor"
// //               >
// //                 <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.787"/>
// //               </svg>
// //               Join Our WhatsApp Community
// //               <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
// //             </motion.button>
// //           </a>
// //         </motion.div>

// //         {/* CTA Buttons */}
// //         <motion.div
// //           initial={{ opacity: 0, y: 20 }}
// //           animate={{ opacity: 1, y: 0 }}
// //           transition={{ duration: 0.5, delay: 0.4 }}
// //           className="flex flex-wrap justify-center gap-4 mb-20"
// //         >
// //           {/* <SignedOut>
// //             <Link href="/sign-in">
// //               <motion.button
// //                 whileHover={{ scale: 1.02 }}
// //                 whileTap={{ scale: 0.98 }}
// //                 className="px-8 py-3 bg-black text-white rounded-xl font-medium
// //                          hover:bg-gray-900 transition-all duration-300
// //                          flex items-center gap-2 group"
// //               >
// //                 Get Started
// //                 <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
// //               </motion.button>
// //             </Link>
// //           </SignedOut>

// //           <SignedIn>
// //             <Link href="/dashboard/upload">
// //               <motion.button
// //                 whileHover={{ scale: 1.02 }}
// //                 whileTap={{ scale: 0.98 }}
// //                 className="px-8 py-3 bg-black text-white rounded-xl font-medium
// //                          hover:bg-gray-900 transition-all duration-300
// //                          flex items-center gap-2 group"
// //               >
// //                 Upload New Project
// //                 <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
// //               </motion.button>
// //             </Link>
// //           </SignedIn> */}
// //         </motion.div>

// //         {/* Features Section */}
// //         <FeatureStrip />
// //       </div>
// //     </div>
// //   </div>
// // </div>
// <div className="relative min-h-screen bg-white overflow-hidden" id="home">
//   {/* Background Elements */}
//   <div className="absolute inset-0">
//     <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000008_1px,transparent_1px),linear-gradient(to_bottom,#00000008_1px,transparent_1px)] bg-[size:24px_24px]" />
//   </div>
  
//   {/* Gradient Orbs */}
//   <div className="absolute inset-0 overflow-hidden">
//     <div className="absolute top-0 -right-40 w-80 h-80 rounded-full 
//                  bg-gradient-to-br from-black/5 to-transparent blur-3xl" />
//     <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full 
//                  bg-gradient-to-tr from-black/5 to-transparent blur-3xl" />
//   </div>

//   {/* Content Container */}
//   <div className="max-w-7xl mx-auto px-4 relative">
//     <div className="pt-32 pb-20">
//       {/* Main Content */}
//       <div className="text-center max-w-4xl mx-auto">
//         {/* Premium Label */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5 }}
//           className="mb-6"
//         >
//           <span className="px-4 py-2 rounded-full bg-black/5 text-gray-700 
//                        text-sm font-medium inline-block">
//             Welcome to the Future of Freelancing
//           </span>
//         </motion.div>

//         {/* Hero Title */}
//         <motion.h1
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5, delay: 0.1 }}
//           className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-6"
//         >
//           Say hello to{" "}
//           <span className="relative inline-block">
//             WorkOnGigs
//             <motion.div
//               className="absolute -bottom-2 left-0 right-0 h-1 bg-black rounded-full"
//               initial={{ scaleX: 0 }}
//               animate={{ scaleX: 1 }}
//               transition={{ duration: 0.5, delay: 0.5 }}
//             />
//           </span>
//         </motion.h1>

//         {/* Description */}
//         <motion.p
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5, delay: 0.2 }}
//           className="text-lg sm:text-xl text-gray-600 mb-8 max-w-2xl mx-auto"
//         >
//           We Ensure: Freelancers Get Paid and Clients Receive Satisfactory Work
//         </motion.p>

//         {/* WhatsApp Buttons */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5, delay: 0.3 }}
//           className="flex flex-wrap justify-center gap-4 mb-12"
//         >
//           {/* WhatsApp Community Group Button */}
//           <div className="relative group">
//             <a
//               href="https://chat.whatsapp.com/CSyUwqxVCc4HfVOPbEzhAs"
//               target="_blank"
//               rel="noopener noreferrer"
//             >
//               <motion.button
//                 whileHover={{ scale: 1.02, y: -2 }}
//                 whileTap={{ scale: 0.98 }}
//                 className="px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 
//                          text-white rounded-xl font-medium shadow-lg
//                          hover:from-green-600 hover:to-green-700 
//                          transition-all duration-300
//                          flex items-center gap-3 group-hover:shadow-xl
//                          border border-green-400/20"
//               >
//                 <div className="flex items-center gap-2">
//                   <svg
//                     className="w-5 h-5"
//                     viewBox="0 0 24 24"
//                     fill="currentColor"
//                   >
//                     <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.787"/>
//                   </svg>
//                   <Users className="w-4 h-4" />
//                 </div>
//                 <span className="text-sm sm:text-base">Join Community</span>
//                 <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
//               </motion.button>
//             </a>
            
//             {/* Tooltip for Community */}
//             <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 
//                           opacity-0 group-hover:opacity-100 transition-opacity duration-300
//                           pointer-events-none z-10">
//               <div className="bg-gray-900 text-white text-xs rounded-lg py-2 px-3 whitespace-nowrap">
//                 Join our community for discussions & networking
//                 <div className="absolute top-full left-1/2 transform -translate-x-1/2 
//                              border-4 border-transparent border-t-gray-900"></div>
//               </div>
//             </div>
//           </div>

//           {/* WhatsApp Channel Button */}
//           <div className="relative group">
//             <a
//               href="https://whatsapp.com/channel/0029VbAtNNnLY6dE9X6kpb3w"
//               target="_blank"
//               rel="noopener noreferrer"
//             >
//               <motion.button
//                 whileHover={{ scale: 1.02, y: -2 }}
//                 whileTap={{ scale: 0.98 }}
//                 className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 
//                          text-white rounded-xl font-medium shadow-lg
//                          hover:from-emerald-600 hover:to-teal-700 
//                          transition-all duration-300
//                          flex items-center gap-3 group-hover:shadow-xl
//                          border border-emerald-400/20"
//               >
//                 <div className="flex items-center gap-2">
//                   <svg
//                     className="w-5 h-5"
//                     viewBox="0 0 24 24"
//                     fill="currentColor"
//                   >
//                     <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.787"/>
//                   </svg>
//                   <Bell className="w-4 h-4" />
//                 </div>
//                 <span className="text-sm sm:text-base">Follow Channel</span>
//                 <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
//               </motion.button>
//             </a>
            
//             {/* Tooltip for Channel */}
//             <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 
//                           opacity-0 group-hover:opacity-100 transition-opacity duration-300
//                           pointer-events-none z-10">
//               <div className="bg-gray-900 text-white text-xs rounded-lg py-2 px-3 whitespace-nowrap">
//                 Follow for updates, announcements & new features
//                 <div className="absolute top-full left-1/2 transform -translate-x-1/2 
//                              border-4 border-transparent border-t-gray-900"></div>
//               </div>
//             </div>
//           </div>
//         </motion.div>

//         {/* CTA Buttons */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5, delay: 0.4 }}
//           className="flex flex-wrap justify-center gap-4 mb-20"
//         >
//           {/* <SignedOut>
//             <Link href="/sign-in">
//               <motion.button
//                 whileHover={{ scale: 1.02 }}
//                 whileTap={{ scale: 0.98 }}
//                 className="px-8 py-3 bg-black text-white rounded-xl font-medium
//                          hover:bg-gray-900 transition-all duration-300
//                          flex items-center gap-2 group"
//               >
//                 Get Started
//                 <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
//               </motion.button>
//             </Link>
//           </SignedOut>

//           <SignedIn>
//             <Link href="/dashboard/upload">
//               <motion.button
//                 whileHover={{ scale: 1.02 }}
//                 whileTap={{ scale: 0.98 }}
//                 className="px-8 py-3 bg-black text-white rounded-xl font-medium
//                          hover:bg-gray-900 transition-all duration-300
//                          flex items-center gap-2 group"
//               >
//                 Upload New Project
//                 <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
//               </motion.button>
//             </Link>
//           </SignedIn> */}
//         </motion.div>

//         {/* Features Section */}
//         <FeatureStrip />
//       </div>
//     </div>
//   </div>
// </div>
//   );
// };

// export default Hero;
import React from 'react';
import { motion } from 'framer-motion';
// import { SignedIn, SignedOut } from '@clerk/nextjs';
import Link from 'next/link';
import { ArrowRight, Shield, Lock, CheckCircle, ArrowUpRight ,Users,Bell, Info } from 'lucide-react';

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
              className="text-lg sm:text-xl text-gray-600 mb-8 max-w-2xl mx-auto"
            >
              We Ensure: Freelancers Get Paid and Clients Receive Satisfactory Work
            </motion.p>

            {/* Transaction Fee Disclaimer */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="mb-8"
            >
              <div className="max-w-2xl mx-auto bg-amber-50 border border-amber-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 mt-0.5">
                    <Info className="w-5 h-5 text-amber-600" />
                  </div>
                  <div className="text-left">
                    <p className="text-sm text-amber-800 font-medium mb-1">
                      Transaction Fee Notice
                    </p>
                    <p className="text-sm text-amber-700 leading-relaxed">
                      For each transaction, a total fee of <strong>3.75%</strong> is applied: 
                      <strong> 2.5%</strong> covers payment gateway charges, and the remaining 
                      <strong> 1.25%</strong> supports platform operations and maintenance costs.

                      Transaction fee: 3.75% total (2.5% payment gateway, 1.25% platform operations)
              
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* WhatsApp Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-wrap justify-center gap-4 mb-12"
            >
              {/* WhatsApp Community Group Button */}
              <div className="relative group">
                <a
                  href="https://chat.whatsapp.com/CSyUwqxVCc4HfVOPbEzhAs"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <motion.button
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 
                             text-white rounded-xl font-medium shadow-lg
                             hover:from-green-600 hover:to-green-700 
                             transition-all duration-300
                             flex items-center gap-3 group-hover:shadow-xl
                             border border-green-400/20"
                  >
                    <div className="flex items-center gap-2">
                      <svg
                        className="w-5 h-5"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.787"/>
                      </svg>
                      <Users className="w-4 h-4" />
                    </div>
                    <span className="text-sm sm:text-base">Join Community</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </motion.button>
                </a>
                
                {/* Tooltip for Community */}
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 
                              opacity-0 group-hover:opacity-100 transition-opacity duration-300
                              pointer-events-none z-10">
                  <div className="bg-gray-900 text-white text-xs rounded-lg py-2 px-3 whitespace-nowrap">
                    Join our community for discussions & networking
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 
                                 border-4 border-transparent border-t-gray-900"></div>
                  </div>
                </div>
              </div>

              {/* WhatsApp Channel Button */}
              <div className="relative group">
                <a
                  href="https://whatsapp.com/channel/0029VbAtNNnLY6dE9X6kpb3w"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <motion.button
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 
                             text-white rounded-xl font-medium shadow-lg
                             hover:from-emerald-600 hover:to-teal-700 
                             transition-all duration-300
                             flex items-center gap-3 group-hover:shadow-xl
                             border border-emerald-400/20"
                  >
                    <div className="flex items-center gap-2">
                      <svg
                        className="w-5 h-5"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.787"/>
                      </svg>
                      <Bell className="w-4 h-4" />
                    </div>
                    <span className="text-sm sm:text-base">Follow Channel</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </motion.button>
                </a>
                
                {/* Tooltip for Channel */}
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 
                              opacity-0 group-hover:opacity-100 transition-opacity duration-300
                              pointer-events-none z-10">
                  <div className="bg-gray-900 text-white text-xs rounded-lg py-2 px-3 whitespace-nowrap">
                    Follow for updates, announcements & new features
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 
                                 border-4 border-transparent border-t-gray-900"></div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
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