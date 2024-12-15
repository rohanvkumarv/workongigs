"use client"
// // import React, { useState } from 'react';
// // import { ChevronLeft, ChevronRight } from 'lucide-react';

// // const PreviewAndPay = ({ type = 'project', instanceAmount = 1000, totalAmount = 700 }) => {
// //   const [currentSlide, setCurrentSlide] = useState(0);
// //   const [activeTab, setActiveTab] = useState('project');
// //   const [activeInstance, setActiveInstance] = useState('instance1');
  
// //   const files = [
// //     { id: 1, type: 'image', preview: '/api/placeholder/600/300' },
// //     { id: 2, type: 'document', preview: '/api/placeholder/600/300' },
// //     { id: 3, type: 'image', preview: '/api/placeholder/600/300' }
// //   ];

// //   const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % files.length);
// //   const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + files.length) % files.length);

// //   return (
// //     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
// //       <div className="max-w-7xl mx-auto">
// //         <div className="bg-white rounded-2xl shadow-xl border border-gray-200/50 backdrop-blur-sm p-6">
// //           <h2 className="text-lg font-semibold text-gray-900 mb-6">preview and pay</h2>
          
// //           {/* Top Navigation */}
// //           <div className="flex flex-col gap-4">
// //             {/* Project/Instance Toggle */}
// //             <div className="flex gap-2">
// //               <button
// //                 onClick={() => setActiveTab('project')}
// //                 className={`px-4 py-2 rounded-lg text-sm font-medium transition-all
// //                   ${activeTab === 'project' 
// //                     ? 'bg-black text-white' 
// //                     : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
// //               >
// //                 project
// //               </button>
// //               <button
// //                 onClick={() => setActiveTab('instance')}
// //                 className={`px-4 py-2 rounded-lg text-sm font-medium transition-all
// //                   ${activeTab === 'instance' 
// //                     ? 'bg-black text-white' 
// //                     : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
// //               >
// //                 instances
// //               </button>
// //             </div>

// //             {/* Instance Tabs */}
// //             {activeTab === 'instance' && (
// //               <div className="flex gap-2">
// //                 {['Instance 1', 'Instance 2', 'Instance 3'].map((instance, idx) => (
// //                   <button
// //                     key={idx}
// //                     onClick={() => setActiveInstance(`instance${idx + 1}`)}
// //                     className={`px-4 py-2 rounded-lg text-sm font-medium transition-all
// //                       ${activeInstance === `instance${idx + 1}`
// //                         ? 'bg-gray-100 text-gray-900'
// //                         : 'text-gray-500 hover:bg-gray-50'}`}
// //                   >
// //                     {instance}
// //                   </button>
// //                 ))}
// //               </div>
// //             )}
// //           </div>

// //           {/* Main Content */}
// //           <div className="grid grid-cols-3 gap-6 mt-6">
// //             {/* Preview Section */}
// //             <div className="col-span-2 bg-gray-50 rounded-xl p-6">
// //               <p className="text-sm text-gray-500 mb-4">a preview or files slider if multiple</p>
              
// //               <div className="relative h-80 bg-white rounded-lg overflow-hidden shadow-sm">
// //                 <img
// //                   src={files[currentSlide].preview}
// //                   alt={`Preview ${currentSlide + 1}`}
// //                   className="w-full h-full object-cover"
// //                 />
                
// //                 {files.length > 1 && (
// //                   <>
// //                     <button
// //                       onClick={prevSlide}
// //                       className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-black/10 hover:bg-black/20 
// //                                rounded-full backdrop-blur-sm transition-colors"
// //                     >
// //                       <ChevronLeft className="w-5 h-5 text-white" />
// //                     </button>
// //                     <button
// //                       onClick={nextSlide}
// //                       className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-black/10 hover:bg-black/20 
// //                                rounded-full backdrop-blur-sm transition-colors"
// //                     >
// //                       <ChevronRight className="w-5 h-5 text-white" />
// //                     </button>
// //                   </>
// //                 )}

// //                 {/* Slide Indicators */}
// //                 <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
// //                   {files.map((_, idx) => (
// //                     <div
// //                       key={idx}
// //                       className={`w-1.5 h-1.5 rounded-full transition-all 
// //                         ${idx === currentSlide ? 'bg-white w-4' : 'bg-white/60'}`}
// //                     />
// //                   ))}
// //                 </div>
// //               </div>
// //             </div>

// //             {/* Payment Section */}
// //             <div className="bg-gray-50 rounded-xl p-6">
// //               <p className="text-sm text-gray-500 mb-4">total payable amount</p>
              
// //               <div className="bg-white rounded-lg p-6 shadow-sm">
// //                 {activeTab === 'instance' ? (
// //                   <div className="space-y-1">
// //                     <div className="flex items-baseline gap-2">
// //                       <span className="text-2xl font-semibold text-gray-900">{instanceAmount}</span>
// //                       <span className="text-gray-500">/ {totalAmount}</span>
// //                     </div>
// //                     <p className="text-sm text-gray-400">in this instance</p>
// //                   </div>
// //                 ) : (
// //                   <div className="text-2xl font-semibold text-gray-900">{totalAmount}</div>
// //                 )}

// //                 <button className="w-full mt-6 py-2.5 bg-black text-white rounded-lg hover:bg-gray-800 
// //                                transition-colors text-sm font-medium">
// //                   pay
// //                 </button>
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default PreviewAndPay;

// import React, { useState } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { 
//   ChevronLeft, ChevronRight, Download, CreditCard, 
//   Check, FileText, Package, Info, X 
// } from 'lucide-react';

// const FloatingBox = ({ children, className = "" }) => (
//   <motion.div
//     initial={{ y: 20, opacity: 0 }}
//     animate={{ y: 0, opacity: 1 }}
//     className={`bg-white rounded-2xl shadow-lg border border-gray-100 
//               backdrop-blur-sm ${className}`}
//   >
//     {children}
//   </motion.div>
// );

// const InstanceTab = ({ name, isActive, onClick }) => (
//   <motion.button
//     whileHover={{ y: -2 }}
//     whileTap={{ y: 0 }}
//     onClick={onClick}
//     className={`px-6 py-3 rounded-xl text-sm font-medium transition-all 
//               ${isActive 
//                 ? 'bg-black text-white shadow-lg' 
//                 : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-100'}`}
//   >
//     {name}
//   </motion.button>
// );

// const PreviewPayment = () => {
//   const [selectedInstance, setSelectedInstance] = useState(0);
//   const [currentSlide, setCurrentSlide] = useState(0);
//   const [isPaid, setIsPaid] = useState(false);
  
//   // Mock data
//   const projectData = {
//     name: "Advanced Web Application",
//     description: "A comprehensive web application with multiple features and responsive design. Includes source code, documentation, and design assets.",
//     totalPrice: 1000,
//     instances: [
//       {
//         id: 1,
//         name: "Basic Package",
//         price: 700,
//         description: "Core features and essential components",
//         files: [
//           { id: 1, name: "Source Code.zip", preview: "/api/placeholder/800/400", size: "2.5 MB" },
//           { id: 2, name: "Documentation.pdf", preview: "/api/placeholder/800/400", size: "1.2 MB" }
//         ]
//       },
//       {
//         id: 2,
//         name: "Premium Package",
//         price: 1000,
//         description: "All features with additional resources",
//         files: [
//           { id: 3, name: "Extended Source.zip", preview: "/api/placeholder/800/400", size: "4.5 MB" },
//           { id: 4, name: "Design Assets.sketch", preview: "/api/placeholder/800/400", size: "8.2 MB" }
//         ]
//       }
//     ]
//   };

//   const handleNextSlide = () => {
//     setCurrentSlide((prev) => 
//       prev === projectData.instances[selectedInstance].files.length - 1 ? 0 : prev + 1
//     );
//   };

//   const handlePrevSlide = () => {
//     setCurrentSlide((prev) => 
//       prev === 0 ? projectData.instances[selectedInstance].files.length - 1 : prev - 1
//     );
//   };

//   const handlePay = () => {
//     setIsPaid(true);
//   };

//   const handleDownloadAllInstances = () => {
//     console.log('Downloading all files from all instances');
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
//       <div className="max-w-7xl mx-auto space-y-6">
//         {/* Header Section */}
//         <div className="flex flex-col items-center text-center mb-8">
//           <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
//             <span>project</span>
//             <span>/</span>
//             <span className="font-medium">{projectData.name}</span>
//           </div>
          
//           {/* Instance Tabs - Floating */}
//           <div className="flex gap-3 p-2">
//             {projectData.instances.map((instance, idx) => (
//               <InstanceTab
//                 key={instance.id}
//                 name={instance.name}
//                 isActive={selectedInstance === idx}
//                 onClick={() => {
//                   setSelectedInstance(idx);
//                   setCurrentSlide(0);
//                 }}
//               />
//             ))}
//           </div>
//         </div>

//         <div className="grid grid-cols-3 gap-8">
//           {/* Preview Section */}
//           <div className="col-span-2 space-y-6">
//             {/* Preview Slider - Floating Box */}
//             <FloatingBox className="p-4">
//               <div className="relative aspect-video rounded-xl overflow-hidden bg-gray-100">
//                 {/* Navigation Buttons */}
//                 {projectData.instances[selectedInstance].files.length > 1 && (
//                   <>
//                     <button
//                       onClick={handlePrevSlide}
//                       className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full
//                                bg-white/90 hover:bg-white shadow-lg
//                                transition-all z-10"
//                     >
//                       <ChevronLeft className="w-5 h-5" />
//                     </button>
//                     <button
//                       onClick={handleNextSlide}
//                       className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full
//                                bg-white/90 hover:bg-white shadow-lg
//                                transition-all z-10"
//                     >
//                       <ChevronRight className="w-5 h-5" />
//                     </button>
//                   </>
//                 )}

//                 {/* Slides */}
//                 <div className="relative w-full h-full">
//                   {projectData.instances[selectedInstance].files.map((file, idx) => (
//                     <motion.div
//                       key={file.id}
//                       initial={{ opacity: 0 }}
//                       animate={{ 
//                         opacity: currentSlide === idx ? 1 : 0,
//                         scale: currentSlide === idx ? 1 : 0.95
//                       }}
//                       transition={{ duration: 0.4 }}
//                       className={`absolute inset-0 ${currentSlide === idx ? 'z-20' : 'z-10'}`}
//                     >
//                       <img
//                         src={file.preview}
//                         alt={file.name}
//                         className="w-full h-full object-cover"
//                       />
//                     </motion.div>
//                   ))}
//                 </div>

//                 {/* Slide Indicators */}
//                 {projectData.instances[selectedInstance].files.length > 1 && (
//                   <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-30">
//                     {projectData.instances[selectedInstance].files.map((_, idx) => (
//                       <button
//                         key={idx}
//                         onClick={() => setCurrentSlide(idx)}
//                         className={`h-1.5 rounded-full transition-all duration-300 
//                                   ${currentSlide === idx 
//                                     ? 'w-8 bg-black' 
//                                     : 'w-1.5 bg-black/20'}`}
//                       />
//                     ))}
//                   </div>
//                 )}
//               </div>
//             </FloatingBox>
//           </div>

//           {/* Right Column */}
//           <div className="space-y-6">
//             {/* Payment Details - Floating Box */}
//             <FloatingBox className="p-6">
//               <div className="flex justify-between items-start mb-6">
//                 <div>
//                   <p className="text-sm text-gray-500 mb-1">total payable amount</p>
//                   <div className="flex items-baseline gap-2">
//                     <span className="text-3xl font-bold">${projectData.totalPrice}</span>
//                     <span className="text-gray-500">/</span>
//                     <span className="text-xl text-gray-500">
//                       ${projectData.instances[selectedInstance].price}
//                     </span>
//                   </div>
//                 </div>
//                 <div className="text-sm text-gray-500 text-right">
//                   of this<br />instance
//                 </div>
//               </div>
//             </FloatingBox>

//             {/* Description/Files Box - Floating */}
//             <FloatingBox className="p-6">
//               <AnimatePresence mode="wait">
//                 {!isPaid ? (
//                   <motion.div
//                     key="description"
//                     initial={{ opacity: 0 }}
//                     animate={{ opacity: 1 }}
//                     exit={{ opacity: 0 }}
//                     className="space-y-4"
//                   >
//                     <div className="flex items-start gap-3">
//                       <Info className="w-5 h-5 text-gray-400 flex-shrink-0 mt-1" />
//                       <div>
//                         <h3 className="font-medium mb-2">Package Description</h3>
//                         <p className="text-sm text-gray-500">
//                           {projectData.instances[selectedInstance].description}
//                         </p>
//                       </div>
//                     </div>

//                     <motion.button
//                       whileHover={{ scale: 1.02 }}
//                       whileTap={{ scale: 0.98 }}
//                       onClick={handlePay}
//                       className="w-full py-3 bg-black text-white rounded-xl font-medium
//                                flex items-center justify-center gap-2 group"
//                     >
//                       <CreditCard className="w-5 h-5" />
//                       Pay Now
//                     </motion.button>
//                   </motion.div>
//                 ) : (
//                   <motion.div
//                     key="files"
//                     initial={{ opacity: 0 }}
//                     animate={{ opacity: 1 }}
//                     exit={{ opacity: 0 }}
//                     className="space-y-4"
//                   >
//                     <div className="flex items-center justify-between mb-4">
//                       <h3 className="font-medium">Instance Files</h3>
//                       <div className="text-sm text-gray-500">
//                         {projectData.instances[selectedInstance].files.length} files
//                       </div>
//                     </div>

//                     {/* Individual Files */}
//                     <div className="space-y-2">
//                       {projectData.instances[selectedInstance].files.map((file) => (
//                         <motion.a
//                           key={file.id}
//                           href="#"
//                           whileHover={{ scale: 1.02 }}
//                           whileTap={{ scale: 0.98 }}
//                           className="w-full p-3 bg-gray-50 rounded-xl
//                                    flex items-center justify-between
//                                    hover:bg-gray-100 transition-colors"
//                         >
//                           <div className="flex items-center gap-3">
//                             <FileText className="w-4 h-4 text-gray-400" />
//                             <div>
//                               <span className="text-sm font-medium block">
//                                 {file.name}
//                               </span>
//                               <span className="text-xs text-gray-500">
//                                 {file.size}
//                               </span>
//                             </div>
//                           </div>
//                           <Download className="w-4 h-4" />
//                         </motion.a>
//                       ))}
//                     </div>

//                     {/* Download Buttons */}
//                     <div className="pt-4 space-y-3">
//                       <motion.button
//                         whileHover={{ scale: 1.02 }}
//                         whileTap={{ scale: 0.98 }}
//                         className="w-full py-3 bg-black text-white rounded-xl font-medium
//                                  flex items-center justify-center gap-2"
//                       >
//                         <Package className="w-5 h-5" />
//                         Download Instance Files
//                       </motion.button>

//                       <motion.button
//                         whileHover={{ scale: 1.02 }}
//                         whileTap={{ scale: 0.98 }}
//                         onClick={handleDownloadAllInstances}
//                         className="w-full py-3 bg-gray-100 text-gray-700 rounded-xl font-medium
//                                  flex items-center justify-center gap-2
//                                  hover:bg-gray-200 transition-colors"
//                       >
//                         <Download className="w-5 h-5" />
//                         Download All Project Files
//                       </motion.button>
//                     </div>
//                   </motion.div>
//                 )}
//               </AnimatePresence>
//             </FloatingBox>

//             {/* Success Message */}
//             {isPaid && (
//               <motion.div
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 className="flex items-center justify-between gap-2 text-green-600 
//                           bg-green-50 p-4 rounded-xl"
//               >
//                 <div className="flex items-center gap-2">
//                   <Check className="w-5 h-5" />
//                   <span className="font-medium">Payment Successful</span>
//                 </div>
//                 <button
//                   onClick={() => setIsPaid(false)}
//                   className="p-1 hover:bg-green-100 rounded-lg transition-colors"
//                 >
//                   <X className="w-4 h-4" />
//                 </button>
//               </motion.div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PreviewPayment;

// import React, { useState } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { 
//   ChevronLeft, ChevronRight, Download, CreditCard, 
//   Check, FileText, Package, Info, X 
// } from 'lucide-react';

// const ProjectHeader = ({ project, selectedInstance, onInstanceChange }) => (
//   <div className="w-full bg-white/50 backdrop-blur-sm border-b border-gray-100">
//     <div className="max-w-7xl mx-auto px-8 py-6">
//       {/* Project Navigation */}
//       <div className="flex items-center gap-2 text-sm text-gray-400 mb-6">
//         <span>project</span>
//         <span>/</span>
//         <span className="text-gray-600 font-medium">{project.name}</span>
//       </div>

//       {/* Instance Tabs */}
//       <div className="flex gap-4">
//         {project.instances.map((instance, idx) => (
//           <button
//             key={instance.id}
//             onClick={() => onInstanceChange(idx)}
//             className={`px-8 py-3 rounded-2xl text-base font-medium transition-all duration-300
//                       ${selectedInstance === idx 
//                         ? 'bg-black text-white shadow-lg' 
//                         : 'bg-white/80 text-gray-600 hover:bg-white'}`}
//           >
//             {instance.name}
//           </button>
//         ))}
//       </div>
//     </div>
//   </div>
// );

// const FilePreview = ({ file, currentSlide, totalSlides, onNext, onPrev }) => (
//   <div className="relative h-full">
//     <img
//       src={file.preview}
//       alt={file.name}
//       className="w-full h-full object-cover rounded-xl"
//     />
    
//     {totalSlides > 1 && (
//       <>
//         <button
//           onClick={onPrev}
//           className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full
//                    bg-white/90 hover:bg-white shadow-lg transition-all z-10"
//         >
//           <ChevronLeft className="w-5 h-5" />
//         </button>
//         <button
//           onClick={onNext}
//           className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full
//                    bg-white/90 hover:bg-white shadow-lg transition-all z-10"
//         >
//           <ChevronRight className="w-5 h-5" />
//         </button>

//         <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
//           {Array.from({ length: totalSlides }).map((_, idx) => (
//             <div
//               key={idx}
//               className={`h-1.5 rounded-full transition-all duration-300 
//                         ${currentSlide === idx 
//                           ? 'w-8 bg-black' 
//                           : 'w-1.5 bg-black/20'}`}
//             />
//           ))}
//         </div>
//       </>
//     )}
//   </div>
// );

// const PreviewPayment = () => {
//   const [selectedInstance, setSelectedInstance] = useState(0);
//   const [currentSlide, setCurrentSlide] = useState(0);
//   const [isPaid, setIsPaid] = useState(true);

//   // Mock data
//   const projectData = {
//     name: "Advanced Web Application",
//     description: "A comprehensive web application with multiple features and responsive design.",
//     totalPrice: 1000,
//     instances: [
//       {
//         id: 1,
//         name: "Basic Package",
//         price: 700,
//         description: "Core features and essential components",
//         files: [
//           { id: 1, name: "Source Code.zip", preview: "/api/placeholder/800/400", size: "2.5 MB" },
//           { id: 2, name: "Documentation.pdf", preview: "/api/placeholder/800/400", size: "1.2 MB" }
//         ]
//       },
//       {
//         id: 2,
//         name: "Premium Package",
//         price: 1000,
//         description: "All features with additional resources",
//         files: [
//           { id: 3, name: "Extended Source.zip", preview: "/api/placeholder/800/400", size: "4.5 MB" },
//           { id: 4, name: "Design Assets.sketch", preview: "/api/placeholder/800/400", size: "8.2 MB" }
//         ]
//       }
//     ]
//   };

//   const handleInstanceChange = (idx) => {
//     setSelectedInstance(idx);
//     setCurrentSlide(0);
//   };

//   const handleNextSlide = () => {
//     setCurrentSlide((prev) => 
//       prev === projectData.instances[selectedInstance].files.length - 1 ? 0 : prev + 1
//     );
//   };

//   const handlePrevSlide = () => {
//     setCurrentSlide((prev) => 
//       prev === 0 ? projectData.instances[selectedInstance].files.length - 1 : prev - 1
//     );
//   };

//   const handlePay = () => setIsPaid(true);

//   const currentInstance = projectData.instances[selectedInstance];
//   const currentFile = currentInstance.files[currentSlide];

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
//       <ProjectHeader
//         project={projectData}
//         selectedInstance={selectedInstance}
//         onInstanceChange={handleInstanceChange}
//       />

//       <div className="max-w-7xl mx-auto px-8 py-12">
//         <div className="grid grid-cols-3 gap-8">
//           {/* Preview Section */}
//           <div className="col-span-2">
//             <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden
//                           aspect-[16/9]">
//               <FilePreview
//                 file={currentFile}
//                 currentSlide={currentSlide}
//                 totalSlides={currentInstance.files.length}
//                 onNext={handleNextSlide}
//                 onPrev={handlePrevSlide}
//               />
//             </div>
//           </div>

//           {/* Payment Section */}
//           <div className="space-y-6">
//             {/* Price Box */}
//             <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
//               <div className="mb-6">
//                 <p className="text-sm text-gray-500 mb-1">total payable amount</p>
//                 <div className="flex items-baseline gap-2">
//                   <span className="text-3xl font-bold">${projectData.totalPrice}</span>
//                   <span className="text-gray-400">/</span>
//                   <span className="text-xl text-gray-500">
//                     ${currentInstance.price}
//                   </span>
//                 </div>
//               </div>

//               <AnimatePresence mode="wait">
//                 {!isPaid ? (
//                   <motion.div
//                     key="description"
//                     initial={{ opacity: 0 }}
//                     animate={{ opacity: 1 }}
//                     exit={{ opacity: 0 }}
//                     className="space-y-4"
//                   >
//                     <div className="p-4 bg-gray-50 rounded-xl">
//                       <h3 className="font-medium mb-2">Package Details</h3>
//                       <p className="text-sm text-gray-600">{currentInstance.description}</p>
//                     </div>

//                     <motion.button
//                       whileHover={{ scale: 1.02 }}
//                       whileTap={{ scale: 0.98 }}
//                       onClick={handlePay}
//                       className="w-full py-3 bg-black text-white rounded-xl font-medium
//                                flex items-center justify-center gap-2"
//                     >
//                       <CreditCard className="w-5 h-5" />
//                       Pay Now
//                     </motion.button>
//                   </motion.div>
//                 ) : (
//                   <motion.div
//                     key="files"
//                     initial={{ opacity: 0 }}
//                     animate={{ opacity: 1 }}
//                     exit={{ opacity: 0 }}
//                     className="space-y-4"
//                   >
//                     <div className="space-y-2">
//                       {currentInstance.files.map((file) => (
//                         <motion.a
//                           key={file.id}
//                           href="#"
//                           className="w-full p-3 bg-gray-50 rounded-xl flex items-center 
//                                    justify-between hover:bg-gray-100 transition-colors"
//                         >
//                           <div className="flex items-center gap-3">
//                             <FileText className="w-4 h-4 text-gray-400" />
//                             <div>
//                               <span className="text-sm font-medium block">{file.name}</span>
//                               <span className="text-xs text-gray-500">{file.size}</span>
//                             </div>
//                           </div>
//                           <Download className="w-4 h-4" />
//                         </motion.a>
//                       ))}
//                     </div>

//                     <motion.button
//                       whileHover={{ scale: 1.02 }}
//                       whileTap={{ scale: 0.98 }}
//                       className="w-full py-3 bg-black text-white rounded-xl font-medium
//                                flex items-center justify-center gap-2"
//                     >
//                       <Package className="w-5 h-5" />
//                       Download All Files
//                     </motion.button>
//                   </motion.div>
//                 )}
//               </AnimatePresence>
//             </div>

//             {/* Success Message */}
//             {isPaid && (
//               <motion.div
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 className="flex items-center justify-between gap-2 text-green-600 
//                           bg-green-50 p-4 rounded-xl"
//               >
//                 <div className="flex items-center gap-2">
//                   <Check className="w-5 h-5" />
//                   <span className="font-medium">Payment Successful</span>
//                 </div>
//                 <button
//                   onClick={() => setIsPaid(false)}
//                   className="p-1 hover:bg-green-100 rounded-lg transition-colors"
//                 >
//                   <X className="w-4 h-4" />
//                 </button>
//               </motion.div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PreviewPayment;

// import React, { useState } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { 
//   ChevronLeft, ChevronRight, Download, CreditCard, 
//   Check, FileText, Package, Info, X, Lock
// } from 'lucide-react';

// const ProjectHeader = ({ project, selectedInstance, onInstanceChange }) => (
//   <div className="w-full bg-white/50 backdrop-blur-sm border-b border-gray-100">
//     <div className="max-w-7xl mx-auto px-8 py-6">
//       {/* Project Navigation */}
//       <div className="flex items-center gap-2 text-sm text-gray-400 mb-6">
//         <span>project</span>
//         <span>/</span>
//         <span className="text-gray-600 font-medium">{project.name}</span>
//       </div>

//       {/* Instance Tabs */}
//       <div className="flex gap-4">
//         {project.instances.map((instance, idx) => (
//           <button
//             key={instance.id}
//             onClick={() => onInstanceChange(idx)}
//             className={`px-8 py-3 rounded-2xl text-base font-medium transition-all duration-300
//                       ${selectedInstance === idx 
//                         ? 'bg-black text-white shadow-lg' 
//                         : 'bg-white/80 text-gray-600 hover:bg-white'}`}
//           >
//             {instance.name}
//           </button>
//         ))}
//       </div>
//     </div>
//   </div>
// );

// const FilePreview = ({ file, currentSlide, totalSlides, onNext, onPrev, isLocked }) => (
//   <div className="relative h-full group">
//     <img
//       src={file.preview}
//       alt={file.name}
//       className={`w-full h-full object-cover rounded-xl transition-all duration-300
//                 ${isLocked ? 'blur-sm' : ''}`}
//     />
    
//     {isLocked && (
//       <div className="absolute inset-0 flex items-center justify-center">
//         <div className="p-4 rounded-xl bg-black/80 text-white flex items-center gap-2">
//           <Lock className="w-5 h-5" />
//           <span>Purchase to unlock</span>
//         </div>
//       </div>
//     )}
    
//     {totalSlides > 1 && !isLocked && (
//       <>
//         <button
//           onClick={onPrev}
//           className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full
//                    bg-white/90 hover:bg-white shadow-lg transition-all z-10"
//         >
//           <ChevronLeft className="w-5 h-5" />
//         </button>
//         <button
//           onClick={onNext}
//           className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full
//                    bg-white/90 hover:bg-white shadow-lg transition-all z-10"
//         >
//           <ChevronRight className="w-5 h-5" />
//         </button>

//         <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
//           {Array.from({ length: totalSlides }).map((_, idx) => (
//             <div
//               key={idx}
//               className={`h-1.5 rounded-full transition-all duration-300 
//                         ${currentSlide === idx ? 'w-8 bg-black' : 'w-1.5 bg-black/20'}`}
//             />
//           ))}
//         </div>
//       </>
//     )}
//   </div>
// );

// const PaymentBox = ({ 
//   projectPrice, 
//   instancePrice, 
//   description, 
//   onPayInstance, 
//   onPayProject,
//   isSingleInstance
// }) => (
//   <div className="space-y-4">
//     {/* Prices */}
//     <div className="mb-6">
//       <p className="text-sm text-gray-500 mb-1">total payable amount</p>
//       <div className="flex items-baseline gap-2">
//         <span className="text-3xl font-bold">${projectPrice}</span>
//         {!isSingleInstance && (
//           <>
//             <span className="text-gray-400">/</span>
//             <span className="text-xl text-gray-500">${instancePrice}</span>
//           </>
//         )}
//       </div>
//     </div>

//     {/* Description */}
//     <div className="p-4 bg-gray-50 rounded-xl">
//       <h3 className="font-medium mb-2">Package Details</h3>
//       <p className="text-sm text-gray-600">{description}</p>
//     </div>

//     {/* Payment Buttons */}
//     <div className="space-y-3">
//       {!isSingleInstance && (
//         <motion.button
//           whileHover={{ scale: 1.02 }}
//           whileTap={{ scale: 0.98 }}
//           onClick={onPayInstance}
//           className="w-full py-3 bg-black text-white rounded-xl font-medium
//                    flex items-center justify-center gap-2"
//         >
//           <CreditCard className="w-5 h-5" />
//           Pay for this Instance (${instancePrice})
//         </motion.button>
//       )}

//       <motion.button
//         whileHover={{ scale: 1.02 }}
//         whileTap={{ scale: 0.98 }}
//         onClick={onPayProject}
//         className={`w-full py-3 rounded-xl font-medium flex items-center justify-center gap-2
//                   ${isSingleInstance || !onPayInstance
//                     ? 'bg-black text-white'
//                     : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
//       >
//         <Package className="w-5 h-5" />
//         Pay for Full Project (${projectPrice})
//       </motion.button>
//     </div>
//   </div>
// );

// const FilesList = ({ files, downloadAllLabel }) => (
//   <div className="space-y-4">
//     <div className="space-y-2">
//       {files.map((file) => (
//         <motion.a
//           key={file.id}
//           href="#"
//           className="w-full p-3 bg-gray-50 rounded-xl flex items-center 
//                    justify-between hover:bg-gray-100 transition-colors"
//         >
//           <div className="flex items-center gap-3">
//             <FileText className="w-4 h-4 text-gray-400" />
//             <div>
//               <span className="text-sm font-medium block">{file.name}</span>
//               <span className="text-xs text-gray-500">{file.size}</span>
//             </div>
//           </div>
//           <Download className="w-4 h-4" />
//         </motion.a>
//       ))}
//     </div>

//     <motion.button
//       whileHover={{ scale: 1.02 }}
//       whileTap={{ scale: 0.98 }}
//       className="w-full py-3 bg-black text-white rounded-xl font-medium
//                flex items-center justify-center gap-2"
//     >
//       <Package className="w-5 h-5" />
//       {downloadAllLabel}
//     </motion.button>
//   </div>
// );

// const PreviewPayment = () => {
//   const [selectedInstance, setSelectedInstance] = useState(0);
//   const [currentSlide, setCurrentSlide] = useState(0);
//   const [paidInstances, setPaidInstances] = useState(new Set());
//   const [isProjectPaid, setIsProjectPaid] = useState(false);

//   // Mock data
//   const projectData = {
//     name: "Advanced Web Application",
//     description: "A comprehensive web application with multiple features and responsive design.",
//     totalPrice: 1000,
//     instances: [
//       {
//         id: 1,
//         name: "Basic Package",
//         price: 700,
//         description: "Core features and essential components",
//         files: [
//           { id: 1, name: "Source Code.zip", preview: "/api/placeholder/800/400", size: "2.5 MB" },
//           { id: 2, name: "Documentation.pdf", preview: "/api/placeholder/800/400", size: "1.2 MB" }
//         ]
//       },
//       {
//         id: 2,
//         name: "Premium Package",
//         price: 300,
//         description: "All features with additional resources",
//         files: [
//           { id: 3, name: "Extended Source.zip", preview: "/api/placeholder/800/400", size: "4.5 MB" },
//           { id: 4, name: "Design Assets.sketch", preview: "/api/placeholder/800/400", size: "8.2 MB" }
//         ]
//       }
//     ]
//   };

//   const handleInstanceChange = (idx) => {
//     setSelectedInstance(idx);
//     setCurrentSlide(0);
//   };

//   const handleNextSlide = () => {
//     setCurrentSlide((prev) => 
//       prev === projectData.instances[selectedInstance].files.length - 1 ? 0 : prev + 1
//     );
//   };

//   const handlePrevSlide = () => {
//     setCurrentSlide((prev) => 
//       prev === 0 ? projectData.instances[selectedInstance].files.length - 1 : prev - 1
//     );
//   };

//   const handlePayInstance = () => {
//     setPaidInstances(prev => new Set([...prev, selectedInstance]));
//   };

//   const handlePayProject = () => {
//     setIsProjectPaid(true);
//     setPaidInstances(new Set(projectData.instances.map((_, idx) => idx)));
//   };

//   const currentInstance = projectData.instances[selectedInstance];
//   const currentFile = currentInstance.files[currentSlide];
//   const isInstancePaid = paidInstances.has(selectedInstance);
//   const isSingleInstance = projectData.instances.length === 1;

//   // Get all files from all instances
//   const allFiles = projectData.instances.flatMap(instance => instance.files);

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
//       <ProjectHeader
//         project={projectData}
//         selectedInstance={selectedInstance}
//         onInstanceChange={handleInstanceChange}
//       />

//       <div className="max-w-7xl mx-auto px-8 py-12">
//         <div className="grid grid-cols-3 gap-8">
//           {/* Preview Section */}
//           <div className="col-span-2">
//             <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden
//                           aspect-[16/9]">
//               <FilePreview
//                 file={currentFile}
//                 currentSlide={currentSlide}
//                 totalSlides={currentInstance.files.length}
//                 onNext={handleNextSlide}
//                 onPrev={handlePrevSlide}
//                 isLocked={!isInstancePaid && !isProjectPaid}
//               />
//             </div>
//           </div>

//           {/* Payment/Files Section */}
//           <div className="space-y-6">
//             <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
//               <AnimatePresence mode="wait">
//                 {!isInstancePaid && !isProjectPaid ? (
//                   <motion.div
//                     key="payment"
//                     initial={{ opacity: 0 }}
//                     animate={{ opacity: 1 }}
//                     exit={{ opacity: 0 }}
//                   >
//                     <PaymentBox
//                       projectPrice={projectData.totalPrice}
//                       instancePrice={currentInstance.price}
//                       description={currentInstance.description}
//                       onPayInstance={handlePayInstance}
//                       onPayProject={handlePayProject}
//                       isSingleInstance={isSingleInstance}
//                     />
//                   </motion.div>
//                 ) : (
//                   <motion.div
//                     key="files"
//                     initial={{ opacity: 0 }}
//                     animate={{ opacity: 1 }}
//                     exit={{ opacity: 0 }}
//                   >
//                     <FilesList
//                       files={isProjectPaid ? allFiles : currentInstance.files}
//                       downloadAllLabel={isProjectPaid 
//                         ? "Download All Project Files"
//                         : "Download All Instance Files"}
//                     />
//                   </motion.div>
//                 )}
//               </AnimatePresence>
//             </div>

//             {/* Success Messages */}
//             {(isInstancePaid || isProjectPaid) && (
//               <motion.div
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 className="flex items-center justify-between gap-2 text-green-600 
//                           bg-green-50 p-4 rounded-xl"
//               >
//                 <div className="flex items-center gap-2">
//                   <Check className="w-5 h-5" />
//                   <span className="font-medium">
//                     {isProjectPaid 
//                       ? "Full Project Access Granted" 
//                       : "Instance Access Granted"}
//                   </span>
//                 </div>
//               </motion.div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PreviewPayment;
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronLeft, ChevronRight, Download, CreditCard, 
  Check, FileText, Package, Info, X ,StickyNote
} from 'lucide-react';

const ProjectHeader = ({ project, selectedInstance, onInstanceChange }) => (
  <div className="w-full bg-white/50 backdrop-blur-sm border-b border-gray-100">
    <div className="max-w-7xl mx-auto px-8 py-6">
      {/* Project Navigation */}
      <div className="flex items-center gap-2 text-sm text-gray-400 mb-6">
        <span>project</span>
        <span>/</span>
        <span className="text-gray-600 font-medium">{project.name}</span>
      </div>

      {/* Instance Tabs */}
      <div className="flex gap-4">
        {project.instances.map((instance, idx) => (
          <button
            key={instance.id}
            onClick={() => onInstanceChange(idx)}
            className={`px-8 py-3 rounded-2xl text-base font-medium transition-all duration-300
                      ${selectedInstance === idx 
                        ? 'bg-black text-white shadow-lg' 
                        : 'bg-white/80 text-gray-600 hover:bg-white'}`}
          >
            {instance.name}
          </button>
        ))}
      </div>
    </div>
  </div>
);

const FilePreview = ({ file, currentSlide, totalSlides, onNext, onPrev }) => (
  <div className="relative h-full group">
    <img
      src={file.preview}
      alt={file.name}
      className="w-full h-full object-cover rounded-xl transition-all duration-300"
    />
    
    {totalSlides > 1 && (
      <>
        <button
          onClick={onPrev}
          className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full
                   bg-white/90 hover:bg-white shadow-lg transition-all z-10"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={onNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full
                   bg-white/90 hover:bg-white shadow-lg transition-all z-10"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {Array.from({ length: totalSlides }).map((_, idx) => (
            <div
              key={idx}
              className={`h-1.5 rounded-full transition-all duration-300 
                        ${currentSlide === idx ? 'w-8 bg-black' : 'w-1.5 bg-black/20'}`}
            />
          ))}
        </div>
      </>
    )}
  </div>
);

const PaymentBox = ({ 
  projectPrice, 
  instancePrice, 
  description, 
  onPayInstance, 
  onPayProject,
  isSingleInstance
}) => (
  <div className="space-y-4">
    {/* Prices */}
    <div className="mb-6">
      <p className="text-sm text-gray-500 mb-1">total payable amount</p>
      <div className="flex items-baseline gap-2">
        <span className="text-3xl font-bold">${projectPrice}</span>
        {!isSingleInstance && (
          <>
            <span className="text-gray-400">/</span>
            <span className="text-xl text-gray-500">${instancePrice}</span>
          </>
        )}
      </div>
    </div>

    {/* Description */}
    <div className="min-w-[300px] p-2 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl border border-gray-200 shadow-sm">
      <div className="flex items-center gap-2 mb-3">
        <StickyNote className="w-5 h-5 text-gray-500" />
        <h3 className="font-semibold text-gray-800">Note</h3>
      </div>
      <div className="bg-white p-4  rounded-xl shadow-inner">
        <p className="text-sm leading-relaxed text-gray-600">{description}</p>
      </div>
    </div>

    {/* Payment Buttons */}
    <div className="space-y-3">
      {!isSingleInstance && (
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onPayInstance}
          className="w-full py-3 bg-black text-white rounded-xl font-medium
                   flex items-center justify-center gap-2"
        >
          <CreditCard className="w-5 h-5" />
          Pay for this Instance (${instancePrice})
        </motion.button>
      )}

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={onPayProject}
        className={`w-full py-3 rounded-xl font-medium flex items-center justify-center gap-2
                  ${isSingleInstance || !onPayInstance
                    ? 'bg-black text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
      >
        <Package className="w-5 h-5" />
        Pay for Full Project (${projectPrice})
      </motion.button>
    </div>
  </div>
);

const FilesList = ({ files, downloadAllLabel }) => (
  <div className="space-y-4">
    <div className="space-y-2">
      {files.map((file) => (
        <motion.a
          key={file.id}
          href="#"
          className="w-full p-3 bg-gray-50 rounded-xl flex items-center 
                   justify-between hover:bg-gray-100 transition-colors"
        >
          <div className="flex items-center gap-3">
            <FileText className="w-4 h-4 text-gray-400" />
            <div>
              <span className="text-sm font-medium block">{file.name}</span>
              <span className="text-xs text-gray-500">{file.size}</span>
            </div>
          </div>
          <Download className="w-4 h-4" />
        </motion.a>
      ))}
    </div>

    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="w-full py-3 bg-black text-white rounded-xl font-medium
               flex items-center justify-center gap-2"
    >
      <Package className="w-5 h-5" />
      {downloadAllLabel}
    </motion.button>
  </div>
);

const PreviewPayment = () => {
  const [selectedInstance, setSelectedInstance] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [paidInstances, setPaidInstances] = useState(new Set());
  const [isProjectPaid, setIsProjectPaid] = useState(false);

  // Mock data
  const projectData = {
    name: "Advanced Web Application",
    description: "A comprehensive web application with multiple features and responsive design.",
    totalPrice: 1000,
    instances: [
      {
        id: 1,
        name: "Basic Package",
        price: 700,
        description: "Core features and essential components",
        files: [
          { id: 1, name: "Source Code.zip", preview: "/api/placeholder/800/400", size: "2.5 MB" },
          { id: 2, name: "Documentation.pdf", preview: "/api/placeholder/800/400", size: "1.2 MB" }
        ]
      },
      {
        id: 2,
        name: "Premium Package",
        price: 300,
        description: "All features with additional resources",
        files: [
          { id: 3, name: "Extended Source.zip", preview: "/api/placeholder/800/400", size: "4.5 MB" },
          { id: 4, name: "Design Assets.sketch", preview: "/api/placeholder/800/400", size: "8.2 MB" }
        ]
      }
    ]
  };

  const handleInstanceChange = (idx) => {
    setSelectedInstance(idx);
    setCurrentSlide(0);
  };

  const handleNextSlide = () => {
    setCurrentSlide((prev) => 
      prev === projectData.instances[selectedInstance].files.length - 1 ? 0 : prev + 1
    );
  };

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => 
      prev === 0 ? projectData.instances[selectedInstance].files.length - 1 : prev - 1
    );
  };

  const handlePayInstance = () => {
    setPaidInstances(prev => new Set([...prev, selectedInstance]));
  };

  const handlePayProject = () => {
    setIsProjectPaid(true);
    setPaidInstances(new Set(projectData.instances.map((_, idx) => idx)));
  };

  const currentInstance = projectData.instances[selectedInstance];
  const currentFile = currentInstance.files[currentSlide];
  const isInstancePaid = paidInstances.has(selectedInstance);
  const isSingleInstance = projectData.instances.length === 1;

  // Get all files from all instances
  const allFiles = projectData.instances.flatMap(instance => instance.files);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Main Heading */}
      <div className="w-full bg-black text-white py-8 rounded-xl shadow-2xl">
        <div className="max-w-7xl mx-auto px-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-center">
            Preview, Pay & Download Your Files
          </h1>
        </div>
      </div>

      <ProjectHeader
        project={projectData}
        selectedInstance={selectedInstance}
        onInstanceChange={handleInstanceChange}
      />

      <div className="max-w-7xl mx-auto px-8 py-12">
        <div className="grid grid-cols-3 gap-8">
          {/* Preview Section */}
          <div className="col-span-2">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden
                          aspect-[16/9]">
              <FilePreview
                file={currentFile}
                currentSlide={currentSlide}
                totalSlides={currentInstance.files.length}
                onNext={handleNextSlide}
                onPrev={handlePrevSlide}
              />
            </div>
          </div>

          {/* Payment/Files Section */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <AnimatePresence mode="wait">
                {!isInstancePaid && !isProjectPaid ? (
                  <motion.div
                    key="payment"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <PaymentBox
                      projectPrice={projectData.totalPrice}
                      instancePrice={currentInstance.price}
                      description={currentInstance.description}
                      onPayInstance={handlePayInstance}
                      onPayProject={handlePayProject}
                      isSingleInstance={isSingleInstance}
                    />
                  </motion.div>
                ) : (
                  <motion.div
                    key="files"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <FilesList
                      files={isProjectPaid ? allFiles : currentInstance.files}
                      downloadAllLabel={isProjectPaid 
                        ? "Download All Project Files"
                        : "Download All Instance Files"}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Success Messages */}
            {(isInstancePaid || isProjectPaid) && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center justify-between gap-2 text-green-600 
                          bg-green-50 p-4 rounded-xl"
              >
                <div className="flex items-center gap-2">
                  <Check className="w-5 h-5" />
                  <span className="font-medium">
                    {isProjectPaid 
                      ? "Full Project Access Granted" 
                      : "Instance Access Granted"}
                  </span>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreviewPayment;