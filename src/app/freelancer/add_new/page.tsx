
"use client"
// // import React, { useState } from 'react';
// // import { useRouter } from 'next/navigation';
// // import { useAuth } from '@/context/authContext';
// // import { Info, Hash, Copy, Check, X } from 'lucide-react';
// // import FileUploadComponent from '../_components/FileUploadComponent';

// // const AddNewProject = () => {
// //   const router = useRouter();
// //   const { freelancerId } = useAuth();
// //   console.log( freelancerId)
  
// //   const [showTooltip, setShowTooltip] = useState(false);
// //   const [isSubmitting, setIsSubmitting] = useState(false);
// //   const [uploadedFiles, setUploadedFiles] = useState([]);
// //   const [showSuccessModal, setShowSuccessModal] = useState(false);
// //   const [projectLink, setProjectLink] = useState('');
// //   const [copied, setCopied] = useState(false);
  
// //   const [formData, setFormData] = useState({
// //     projectName: '',
// //     cost: '',
// //     currency: 'INR',
// //     paymentMode: '',
// //     description: ''
// //   });

// //   const [selectedMessage, setSelectedMessage] = useState(null);

// //   const currencies = [
// //     { code: 'INR', symbol: '₹' },
// //   ];

// //   const messages = [
// //     {
// //       id: 1,
// //       label: "Initial Draft",
// //       text: "Here's the initial draft for your review. Looking forward to your feedback."
// //     },
// //     {
// //       id: 2,
// //       label: "Updates Done",
// //       text: "I've completed the requested updates. Please check if this aligns with what you had in mind."
// //     },
// //     {
// //       id: 3,
// //       label: "Revision",
// //       text: "I've revised the content based on your feedback. Let me know if any further changes are needed."
// //     },
// //     {
// //       id: 4,
// //       label: "Final",
// //       text: "Here's the final version with all revisions incorporated. Please confirm if this meets your requirements."
// //     }
// //   ];

// //   const handleCopyLink = async () => {
// //     try {
// //       await navigator.clipboard.writeText(projectLink);
// //       setCopied(true);
// //       setTimeout(() => setCopied(false), 2000);
// //     } catch (err) {
// //       console.error('Failed to copy:', err);
// //     }
// //   };

// //   const handleUploadComplete = (fileInfo) => {
// //     setUploadedFiles(prev => [...prev, fileInfo]);
// //   };

// //   const handleMessageClick = (message) => {
// //     setSelectedMessage(message);
// //     setFormData({ ...formData, description: message.text });
// //   };

// //   const handleSubmit = async () => {
// //     try {
// //       setIsSubmitting(true);

// //       if (!formData.projectName || !formData.cost || !formData.paymentMode || !uploadedFiles.length) {
// //         alert('Please fill in all required fields and upload at least one file');
// //         return;
// //       }
// //       console.log(formData)

// //       const response = await fetch('/api/create-project', {
// //         method: 'POST',
// //         headers: {
// //           'Content-Type': 'application/json',
// //         },
// //         body: JSON.stringify({
// //           ...formData,
// //           files: uploadedFiles,
// //           freelancerId
// //         }),
// //       });

// //       const result = await response.json();

// //       if (!response.ok) throw new Error(result.error);

// //       if (result.clientId) {
// //         const link = `/${result.clientId}/preview`;
// //         setProjectLink(window.location.origin + link);
// //         setShowSuccessModal(true);
// //       }
// //     } catch (error) {
// //       console.error('Error creating project:', error);
// //       alert(`Failed to create project. Please try again. Error: ${error.message || 'Unknown error'}`);
// //     } finally {
// //       setIsSubmitting(false);
// //     }
// //   };

// //   return (
// //     <>
// //       <div className="min-h-screen bg-gray-50 p-4 md:p-8">
// //         <div className="max-w-7xl mx-auto">
// //           <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Create New Project</h1>
// //           <p className="text-gray-600 mb-6 md:mb-8">Set up your project details and payment structure</p>

// //           {/* File Upload Section */}
// //           <div className="mb-6 md:mb-8">
// //             <FileUploadComponent onUploadComplete={handleUploadComplete} />
// //           </div>

// //           {/* Project Details Box */}
// //           <div className="bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden backdrop-blur-sm">
// //             <div className="flex flex-col md:flex-row md:divide-x divide-gray-100">
// //               {/* Left Section - Project Details */}
// //               <div className="w-full md:w-1/2 p-4 md:p-8 bg-gradient-to-br from-white to-gray-50">
// //                 <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-6 flex items-center">
// //                   <span className="bg-black text-white rounded-lg w-8 h-8 inline-flex items-center justify-center mr-3 text-sm">01</span>
// //                   Project Details
// //                 </h3>
                
// //                 <div className="space-y-4 md:space-y-6">
// //                   <div className="space-y-2">
// //                     <label className="text-sm font-medium text-gray-700">Project Name</label>
// //                     <input
// //                       type="text"
// //                       value={formData.projectName}
// //                       onChange={e => setFormData({...formData, projectName: e.target.value})}
// //                       className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-black focus:ring-1 focus:ring-black transition-colors"
// //                       placeholder="Enter project name"
// //                     />
// //                   </div>

// //                   <div className="space-y-2">
// //                     <label className="text-sm font-medium text-gray-700">Project Cost</label>
// //                     <div className="flex gap-3">
// //                       <select
// //                         value={formData.currency}
// //                         onChange={e => setFormData({...formData, currency: e.target.value})}
// //                         className="w-24 px-3 py-3 rounded-lg border border-gray-200 focus:border-black focus:ring-1 focus:ring-black transition-colors bg-gray-50"
// //                       >
// //                         {currencies.map(curr => (
// //                           <option key={curr.code} value={curr.code}>
// //                             {curr.symbol} {curr.code}
// //                           </option>
// //                         ))}
// //                       </select>
// //                       <input
// //                         type="number"
// //                         value={formData.cost}
// //                         onChange={e => setFormData({...formData, cost: e.target.value})}
// //                         className="flex-1 px-4 py-3 rounded-lg border border-gray-200 focus:border-black focus:ring-1 focus:ring-black transition-colors"
// //                         placeholder="Enter amount"
// //                       />
// //                     </div>
// //                   </div>

// //                   <div className="space-y-2">
// //                     <div className="flex items-center gap-2">
// //                       <label className="text-sm font-medium text-gray-700">Payment Mode</label>
// //                       <div className="relative">
// //                         <button
// //                           onMouseEnter={() => setShowTooltip(true)}
// //                           onMouseLeave={() => setShowTooltip(false)}
// //                           className="text-gray-400 hover:text-gray-600"
// //                         >
// //                           <Info className="w-4 h-4" />
// //                         </button>
// //                         {showTooltip && (
// //                           <div className="absolute z-10 bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg w-48">
// //                             Choose how you want to receive payment
// //                           </div>
// //                         )}
// //                       </div>
// //                     </div>
// //                     <div className="grid grid-cols-2 gap-3">
// //                       {['Direct Payment', 'More Soon'].map((mode) => (
// //                         <button
// //                           key={mode}
// //                           onClick={() => setFormData({...formData, paymentMode: mode})}
// //                           className={`px-4 py-3 rounded-lg border text-sm font-medium transition-colors
// //                                     ${formData.paymentMode === mode 
// //                                       ? 'border-black bg-black text-white' 
// //                                       : 'border-gray-200 text-gray-700 hover:border-gray-300'}`}
// //                         >
// //                           {mode}
// //                         </button>
// //                       ))}
// //                     </div>
// //                   </div>
// //                 </div>
// //               </div>

// //               {/* Right Section - Delivery Message */}
// //               <div className="w-full md:w-1/2 p-4 md:p-8 bg-gradient-to-br from-white to-gray-50">
// //                 <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-6 flex items-center">
// //                   <span className="bg-black text-white rounded-lg w-8 h-8 inline-flex items-center justify-center mr-3 text-sm">02</span>
// //                   Delivery Message
// //                 </h3>

// //                 <textarea
// //                   value={formData.description}
// //                   onChange={(e) => setFormData({ ...formData, description: e.target.value })}
// //                   rows={8}
// //                   className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-black focus:ring-1 focus:ring-black transition-colors resize-none"
// //                   placeholder="Write your delivery message here..."
// //                 />

// //                 {/* Quick Messages */}
// //                 <div className="mt-4">
// //                   <h4 className="text-sm font-medium text-gray-700 mb-2">Quick Messages:</h4>
// //                   <div className="inline-flex flex-wrap gap-2">
// //                     {messages.map((message) => (
// //                       <button
// //                         key={message.id}
// //                         onClick={() => handleMessageClick(message)}
// //                         className={`px-4 py-1.5 text-sm font-medium rounded-full transition-all duration-200 
// //                           ${selectedMessage?.id === message.id
// //                             ? 'bg-gradient-to-r from-gray-800 to-black text-white shadow-sm scale-[1.02]'
// //                             : 'bg-white text-gray-600 shadow-sm hover:shadow border border-gray-200 hover:border-gray-300'}`}
// //                       >
// //                         {message.label}
// //                       </button>
// //                     ))}
// //                   </div>
// //                 </div>

// //                 {/* Action Buttons */}
// //                 <div className="flex justify-end space-x-4 mt-6">
// //                   <button
// //                     type="button"
// //                     onClick={() => {
// //                       setFormData({ 
// //                         projectName: '',
// //                         cost: '',
// //                         currency: 'INR',
// //                         paymentMode: '',
// //                         description: ''
// //                       });
// //                       setSelectedMessage(null);
// //                     }}
// //                     className="px-6 py-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors"
// //                   >
// //                     Cancel
// //                   </button>
// //                   <button
// //                     onClick={handleSubmit}
// //                     disabled={isSubmitting}
// //                     className="px-6 py-2 rounded-lg bg-black text-white hover:bg-gray-900 transition-colors disabled:bg-gray-400"
// //                   >
// //                     {isSubmitting ? 'Creating...' : 'Create Link'}
// //                   </button>
// //                 </div>
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       </div>

// //       {/* Success Modal */}
// //       {showSuccessModal && (
// //         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
// //           <div className="bg-white rounded-2xl max-w-md w-full relative animate-scale-up">
// //             {/* Close button */}
// //             <button 
// //               onClick={() => setShowSuccessModal(false)}
// //               className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
// //             >
// //               <X className="w-5 h-5" />
// //             </button>

// //             {/* Modal content */}
// //             <div className="p-6">
// //               {/* Success icon */}
// //               <div className="w-16 h-16 bg-green-100 rounded-full mx-auto flex items-center justify-center mb-4">
// //                 <Check className="w-8 h-8 text-green-500" />
// //               </div>

// //               {/* Title */}
// //               <h3 className="text-2xl font-bold text-center text-gray-900 mb-2">
// //                 Success! 🎉
// //               </h3>
              
// //               {/* Description */}
// //               <p className="text-center text-gray-600 mb-6">
// //                 Your project has been created successfully
// //               </p>

// //               {/* Link container */}
// //               <div className="bg-gray-50 rounded-lg p-4 mb-6">
// //                 <p className="text-sm text-gray-600 mb-2">Project link:</p>
// //                 <div className="flex items-center gap-2 bg-white rounded-lg border border-gray-200 p-3">
// //                   <input
// //                     type="text"
// //                     value={projectLink}
// //                     readOnly
// //                     className="flex-1 text-sm bg-transparent outline-none"
// //                   />
// //                   <button
// //                     onClick={handleCopyLink}
// //                     className="p-2 hover:bg-gray-100 rounded-lg transition-colors group relative"
// //                   >
// //                     {copied ? (
// //                       <Check className="w-4 h-4 text-green-500" />
// //                     ) : (
// //                       <Copy className="w-4 h-4 text-gray-500" />
// //                     )}
                    
// //                     {/* Tooltip */}
// //                     <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity">
// //                       {copied ? 'Copied!' : 'Copy link'}
// //                     </span>
// //                   </button>
// //                 </div>
// //               </div>

// //               {/* Action buttons */}
// //               <div className="flex gap-3 justify-center">
// //                 <button
// //                   onClick={() => {
// //                     setShowSuccessModal(false);
// //                     window.location.reload();
// //                   }}
// //                   className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 transition-colors"
// //                 >
// //                   Create Another
// //                 </button>
// //                 <button
// //                   onClick={handleCopyLink}
// //                   className="px-6 py-2 text-sm bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
// //                 >
// //                   {copied ? 'Copied!' : 'Copy Link'}
// //                 </button>
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       )}

// //       <style jsx>{`
// //         @keyframes scale-up {
// //           from {
// //             transform: scale(0.95);
// //             opacity: 0;
// //           }
// //           to {
// //             transform: scale(1);
// //             opacity: 1;
// //           }
// //         }
// //         .animate-scale-up {
// //           animation: scale-up 0.2s ease-out;
// //         }
// //       `}</style>
// //     </>
// //   );
// // };

// // export default AddNewProject;


// import React, { useState } from 'react';
// import { useRouter } from 'next/navigation';
// import { useAuth } from '@/context/authContext';
// import { Info, Hash, Copy, Check, X, Phone, Mail } from 'lucide-react';
// import FileUploadComponent from '../_components/FileUploadComponent';

// const AddNewClient = () => {
//   const router = useRouter();
//   const { freelancerId } = useAuth();
  
//   const [showTooltip, setShowTooltip] = useState(false);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [uploadedFiles, setUploadedFiles] = useState([]);
//   const [showSuccessModal, setShowSuccessModal] = useState(false);
//   const [clientLink, setClientLink] = useState('');
//   const [copied, setCopied] = useState(false);
  
//   const [clientData, setClientData] = useState({
//     name: '',
//     phone: '',
//     email: '',
//     modeOfPay: '',
//     status: 'ACTIVE'
//   });

//   const [deliveryData, setDeliveryData] = useState({
//     name: '',
//     cost: '',
//     currency: 'INR',
//     desc: '',
//     PaymentStatus: 'PENDING'
//   });

//   const [selectedMessage, setSelectedMessage] = useState(null);

//   const currencies = [
//     { code: 'INR', symbol: '₹' },
//   ];

//   const messages = [
//     {
//       id: 1,
//       label: "Initial Draft",
//       text: "Here's the initial draft for your review. Looking forward to your feedback."
//     },
//     {
//       id: 2,
//       label: "Updates Done",
//       text: "I've completed the requested updates. Please check if this aligns with what you had in mind."
//     },
//     {
//       id: 3,
//       label: "Revision",
//       text: "I've revised the content based on your feedback. Let me know if any further changes are needed."
//     },
//     {
//       id: 4,
//       label: "Final",
//       text: "Here's the final version with all revisions incorporated. Please confirm if this meets your requirements."
//     }
//   ];

//   const handleCopyLink = async () => {
//     try {
//       await navigator.clipboard.writeText(clientLink);
//       setCopied(true);
//       setTimeout(() => setCopied(false), 2000);
//     } catch (err) {
//       console.error('Failed to copy:', err);
//     }
//   };

//   const handleUploadComplete = (fileInfo) => {
//     setUploadedFiles(prev => [...prev, fileInfo]);
//   };

//   const handleMessageClick = (message) => {
//     setSelectedMessage(message);
//     setDeliveryData({ ...deliveryData, desc: message.text });
//   };

//   const handleSubmit = async () => {
//     try {
//       setIsSubmitting(true);

//       if (!clientData.name || !clientData.modeOfPay || !deliveryData.name || !deliveryData.cost || !uploadedFiles.length) {
//         alert('Please fill in all required fields and upload at least one file');
//         return;
//       }

//       const response = await fetch('/api/create-client', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           client: {
//             ...clientData,
//             freelancerId
//           },
//           delivery: {
//             ...deliveryData,
//             files: uploadedFiles,
//             cost: parseFloat(deliveryData.cost)
//           }
//         }),
//       });

//       const result = await response.json();

//       if (!response.ok) throw new Error(result.error);

//       if (result.clientId) {
//         const link = `/${result.clientId}/preview`;
//         setClientLink(window.location.origin + link);
//         setShowSuccessModal(true);
//       }
//     } catch (error) {
//       console.error('Error creating client:', error);
//       alert(`Failed to create client. Please try again. Error: ${error.message || 'Unknown error'}`);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <>
//       <div className="min-h-screen bg-gray-50 p-4 md:p-8">
//         <div className="max-w-7xl mx-auto">
//           <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Create  New Client  And Deliver First Project </h1>
//           <p className="text-gray-600 mb-6 md:mb-8">Enter client and your first delivery details </p>

//           {/* File Upload Section */}
//           <div className="mb-6 md:mb-8">
//             <FileUploadComponent onUploadComplete={handleUploadComplete} />
//           </div>

//           {/* Main Content Box */}
//           <div className="bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden backdrop-blur-sm">
//             <div className="flex flex-col md:flex-row md:divide-x divide-gray-100">
//               {/* Left Section - Client Details */}
//               <div className="w-full md:w-1/2 p-4 md:p-8 bg-gradient-to-br from-white to-gray-50">
//                 <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-6 flex items-center">
//                   <span className="bg-black text-white rounded-lg w-8 h-8 inline-flex items-center justify-center mr-3 text-sm">01</span>
//                   Client Details
//                 </h3>
                
//                 <div className="space-y-4 md:space-y-6">
//                   <div className="space-y-2">
//                     <label className="text-sm font-medium text-gray-700">Client Name</label>
//                     <input
//                       type="text"
//                       value={clientData.name}
//                       onChange={e => setClientData({...clientData, name: e.target.value})}
//                       className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-black focus:ring-1 focus:ring-black transition-colors"
//                       placeholder="Enter client name"
//                     />
//                   </div>

//                   <div className="space-y-2">
//                     <label className="text-sm font-medium text-gray-700">Phone Number</label>
//                     <div className="relative">
//                       <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//                       <input
//                         type="tel"
//                         value={clientData.phone}
//                         onChange={e => setClientData({...clientData, phone: e.target.value})}
//                         className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-200 focus:border-black focus:ring-1 focus:ring-black transition-colors"
//                         placeholder="Enter phone number"
//                       />
//                     </div>
//                   </div>

//                   <div className="space-y-2">
//                     <label className="text-sm font-medium text-gray-700">Email Address</label>
//                     <div className="relative">
//                       <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//                       <input
//                         type="email"
//                         value={clientData.email}
//                         onChange={e => setClientData({...clientData, email: e.target.value})}
//                         className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-200 focus:border-black focus:ring-1 focus:ring-black transition-colors"
//                         placeholder="Enter email address"
//                       />
//                     </div>
//                   </div>

//                   <div className="space-y-2">
//                     <div className="flex items-center gap-2">
//                       <label className="text-sm font-medium text-gray-700">Payment Mode</label>
//                       <div className="relative">
//                         <button
//                           onMouseEnter={() => setShowTooltip(true)}
//                           onMouseLeave={() => setShowTooltip(false)}
//                           className="text-gray-400 hover:text-gray-600"
//                         >
//                           <Info className="w-4 h-4" />
//                         </button>
//                         {showTooltip && (
//                           <div className="absolute z-10 bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg w-48">
//                             Choose how you want to receive payment
//                           </div>
//                         )}
//                       </div>
//                     </div>
//                     <div className="grid grid-cols-2 gap-3">
//                       {['Direct Payment', 'More Soon'].map((mode) => (
//                         <button
//                           key={mode}
//                           onClick={() => setClientData({...clientData, modeOfPay: mode})}
//                           className={`px-4 py-3 rounded-lg border text-sm font-medium transition-colors
//                                     ${clientData.modeOfPay === mode 
//                                       ? 'border-black bg-black text-white' 
//                                       : 'border-gray-200 text-gray-700 hover:border-gray-300'}`}
//                         >
//                           {mode}
//                         </button>
//                       ))}
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* Right Section - Delivery Details */}
//               <div className="w-full md:w-1/2 p-4 md:p-8 bg-gradient-to-br from-white to-gray-50">
//                 <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-6 flex items-center">
//                   <span className="bg-black text-white rounded-lg w-8 h-8 inline-flex items-center justify-center mr-3 text-sm">02</span>
//                   Delivery Details
//                 </h3>

//                 <div className="space-y-4">
//                   <div className="space-y-2">
//                     <label className="text-sm font-medium text-gray-700">Delivery Name</label>
//                     <input
//                       type="text"
//                       value={deliveryData.name}
//                       onChange={e => setDeliveryData({...deliveryData, name: e.target.value})}
//                       className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-black focus:ring-1 focus:ring-black transition-colors"
//                       placeholder="Enter delivery name"
//                     />
//                   </div>

//                   <div className="space-y-2">
//                     <label className="text-sm font-medium text-gray-700">Delivery Cost</label>
//                     <div className="flex gap-3">
//                       <select
//                         value={deliveryData.currency}
//                         onChange={e => setDeliveryData({...deliveryData, currency: e.target.value})}
//                         className="w-24 px-3 py-3 rounded-lg border border-gray-200 focus:border-black focus:ring-1 focus:ring-black transition-colors bg-gray-50"
//                       >
//                         {currencies.map(curr => (
//                           <option key={curr.code} value={curr.code}>
//                             {curr.symbol} {curr.code}
//                           </option>
//                         ))}
//                       </select>
//                       <input
//                         type="number"
//                         value={deliveryData.cost}
//                         onChange={e => setDeliveryData({...deliveryData, cost: e.target.value})}
//                         className="flex-1 px-4 py-3 rounded-lg border border-gray-200 focus:border-black focus:ring-1 focus:ring-black transition-colors"
//                         placeholder="Enter amount"
//                       />
//                     </div>
//                   </div>

//                   <div className="space-y-2">
//                     <label className="text-sm font-medium text-gray-700">Description</label>
//                     <textarea
//                       value={deliveryData.desc}
//                       onChange={(e) => setDeliveryData({ ...deliveryData, desc: e.target.value })}
//                       rows={4}
//                       className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-black focus:ring-1 focus:ring-black transition-colors resize-none"
//                       placeholder="Write your delivery description here..."
//                     />
//                   </div>

//                   {/* Quick Messages */}
//                   <div className="mt-4">
//                     <h4 className="text-sm font-medium text-gray-700 mb-2">Quick Messages:</h4>
//                     <div className="inline-flex flex-wrap gap-2">
//                       {messages.map((message) => (
//                         <button
//                           key={message.id}
//                           onClick={() => handleMessageClick(message)}
//                           className={`px-4 py-1.5 text-sm font-medium rounded-full transition-all duration-200 
//                             ${selectedMessage?.id === message.id
//                               ? 'bg-gradient-to-r from-gray-800 to-black text-white shadow-sm scale-[1.02]'
//                               : 'bg-white text-gray-600 shadow-sm hover:shadow border border-gray-200 hover:border-gray-300'}`}
//                         >
//                           {message.label}
//                         </button>
//                       ))}
//                     </div>
//                   </div>
//                 </div>

//                 {/* Action Buttons */}
//                 <div className="flex justify-end space-x-4 mt-6">
//                   <button
//                     type="button"
//                     onClick={() => {
//                       setClientData({
//                         name: '',
//                         phone: '',
//                         email: '',
//                         modeOfPay: '',
//                         status: 'ACTIVE'
//                       });
//                       setDeliveryData({
//                         name: '',
//                         cost: '',
//                         currency: 'INR',
//                         desc: '',
//                         PaymentStatus: 'PENDING'
//                       });
//                       setSelectedMessage(null);
//                     }}
//                     className="px-6 py-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors"
//                   >
//                     Cancel
//                   </button>
//                   <button
//                     onClick={handleSubmit}
//                     disabled={isSubmitting}
//                     className="px-6 py-2 rounded-lg bg-black text-white hover:bg-gray-900 transition-colors disabled:bg-gray-400"
//                   >
//                     {isSubmitting ? 'Creating...' : 'Create Link'}
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Success Modal */}
//       {showSuccessModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
//           <div className="bg-white rounded-2xl max-w-md w-full relative animate-scale-up">
//             {/* Close button */}
//             <button 
//               onClick={() => setShowSuccessModal(false)}
//               className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
//             >
//               <X className="w-5 h-5" />
//             </button>

//             {/* Modal content */}
//             <div className="p-6">
//               {/* Success icon */}
//               <div className="w-16 h-16 bg-green-100 rounded-full mx-auto flex items-center justify-center mb-4">
//                 <Check className="w-8 h-8 text-green-500" />
//               </div>

//               {/* Title */}
//               <h3 className="text-2xl font-bold text-center text-gray-900 mb-2">
//                 Success! 🎉
//               </h3>
              
//               {/* Description */}
//               <p className="text-center text-gray-600 mb-6">
//                 Your client and delivery have been created successfully
//               </p>

//               {/* Link container */}
//               <div className="bg-gray-50 rounded-lg p-4 mb-6">
//                 <p className="text-sm text-gray-600 mb-2">Client link:</p>
//                 <div className="flex items-center gap-2 bg-white rounded-lg border border-gray-200 p-3">
//                   <input
//                     type="text"
//                     value={clientLink}
//                     readOnly
//                     className="flex-1 text-sm bg-transparent outline-none"
//                   />
//                   <button
//                     onClick={handleCopyLink}
//                     className="p-2 hover:bg-gray-100 rounded-lg transition-colors group relative"
//                   >
//                     {copied ? (
//                       <Check className="w-4 h-4 text-green-500" />
//                     ) : (
//                       <Copy className="w-4 h-4 text-gray-500" />
//                     )}
                    
//                     {/* Tooltip */}
//                     <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity">
//                       {copied ? 'Copied!' : 'Copy link'}
//                     </span>
//                   </button>
//                 </div>
//               </div>

//               {/* Action buttons */}
//               <div className="flex gap-3 justify-center">
//                 <button
//                   onClick={() => {
//                     setShowSuccessModal(false);
//                     window.location.reload();
//                   }}
//                   className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 transition-colors"
//                 >
//                   Create Another
//                 </button>
//                 <button
//                   onClick={handleCopyLink}
//                   className="px-6 py-2 text-sm bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
//                 >
//                   {copied ? 'Copied!' : 'Copy Link'}
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       <style jsx>{`
//         @keyframes scale-up {
//           from {
//             transform: scale(0.95);
//             opacity: 0;
//           }
//           to {
//             transform: scale(1);
//             opacity: 1;
//           }
//         }
//         .animate-scale-up {
//           animation: scale-up 0.2s ease-out;
//         }
//       `}</style>
//     </>
//   );
// };

// export default AddNewClient;
'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/authContext';
import { Info, Hash, Copy, Check, X, Phone, Mail } from 'lucide-react';
// import FileUploadComponent from '../../../components/FileUploadComponent';
import FileUploadComponent from '../_components/FileUploadComponent';

const AddNewPage = () => {
  const router = useRouter();
  const { freelancerId } = useAuth();
  console.log('Component rendered');
  
  const [showTooltip, setShowTooltip] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [clientLink, setClientLink] = useState('');
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState(null);
  
  const [clientData, setClientData] = useState({
    name: '',
    phone: '',
    email: '',
    modeOfPay: '',
    status: 'ACTIVE'
  });

  const [deliveryData, setDeliveryData] = useState({
    name: '',
    cost: '',
    currency: 'INR',
    desc: '',
    PaymentStatus: 'Not Paid'
  });

  const [selectedMessage, setSelectedMessage] = useState(null);

  const currencies = [
    { code: 'INR', symbol: '₹' },
  ];

  const messages = [
    {
      id: 1,
      label: "Initial Draft",
      text: "Here's the initial draft for your review. Looking forward to your feedback."
    },
    {
      id: 2,
      label: "Updates Done",
      text: "I've completed the requested updates. Please check if this aligns with what you had in mind."
    },
    {
      id: 3,
      label: "Revision",
      text: "I've revised the content based on your feedback. Let me know if any further changes are needed."
    },
    {
      id: 4,
      label: "Final",
      text: "Here's the final version with all revisions incorporated. Please confirm if this meets your requirements."
    }
  ];

  const resetModal = () => {
    setShowSuccessModal(false);
    setClientLink('');
    setError(null);
    setCopied(false);
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(clientLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleUploadComplete = (fileInfo: any) => {
    setUploadedFiles(prev => [...prev, fileInfo]);
  };

  const handleMessageClick = (message: any) => {
    setSelectedMessage(message);
    setDeliveryData({ ...deliveryData, desc: message.text });
  };

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);

      if (!clientData.name || !clientData.modeOfPay || !deliveryData.name || !deliveryData.cost || !uploadedFiles.length) {
        alert('Please fill in all required fields and upload at least one file');
        return;
      }

      const response = await fetch('/api/create-client', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          client: {
            ...clientData,
            freelancerId
          },
          delivery: {
            ...deliveryData,
            files: uploadedFiles,
            cost: parseFloat(deliveryData.cost)
          }
        }),
      });

      const result = await response.json();

      if (!response.ok) throw new Error(result.error);

      if (result.success && result.client?.id) {
        const link = `/${result.client.id}/preview?delivery=${result.delivery.name}`;
        setClientLink(window.location.origin + link);
        setShowSuccessModal(true);
        console.log("Setting modal to true", showSuccessModal);
      }
    } catch (error: any) {
      console.error('Error creating client:', error);
      setError(error.message || 'Failed to create client');
      setShowSuccessModal(false);
    } finally {
      setIsSubmitting(false);
    }

    console.log('Modal state after submission:', showSuccessModal);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Create New Client and First Delivery</h1>
        <p className="text-gray-600 mb-6 md:mb-8">Enter the details of your new client and their first delivery. </p>

        {/* File Upload Section */}
        <div className="mb-6 md:mb-8">
          <FileUploadComponent onUploadComplete={handleUploadComplete} />
        </div>

        {/* Main Content Box */}
        <div className="bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden backdrop-blur-sm">
          <div className="flex flex-col md:flex-row md:divide-x divide-gray-100">
            {/* Left Section - Client Details */}
            <div className="w-full md:w-1/2 p-4 md:p-8 bg-gradient-to-br from-white to-gray-50">
              <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-6 flex items-center">
                <span className="bg-black text-white rounded-lg w-8 h-8 inline-flex items-center justify-center mr-3 text-sm">01</span>
                Client Details
              </h3>
              
              <div className="space-y-4 md:space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Client Name</label>
                  <input
                    type="text"
                    value={clientData.name}
                    onChange={e => setClientData({...clientData, name: e.target.value})}
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-black focus:ring-1 focus:ring-black transition-colors"
                    placeholder="Enter client name"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Phone Number</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="tel"
                      value={clientData.phone}
                      onChange={e => setClientData({...clientData, phone: e.target.value})}
                      className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-200 focus:border-black focus:ring-1 focus:ring-black transition-colors"
                      placeholder="Enter phone number"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="email"
                      value={clientData.email}
                      onChange={e => setClientData({...clientData, email: e.target.value})}
                      className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-200 focus:border-black focus:ring-1 focus:ring-black transition-colors"
                      placeholder="Enter email address"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <label className="text-sm font-medium text-gray-700">Payment Mode</label>
                    <div className="relative">
                      <button
                        onMouseEnter={() => setShowTooltip(true)}
                        onMouseLeave={() => setShowTooltip(false)}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        <Info className="w-4 h-4" />
                      </button>
                      {showTooltip && (
                        <div className="absolute z-10 bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg w-48">
                          Choose how you want to receive payment
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    {['Direct Payment', 'More Soon'].map((mode) => (
                      <button
                        key={mode}
                        onClick={() => setClientData({...clientData, modeOfPay: mode})}
                        className={`px-4 py-3 rounded-lg border text-sm font-medium transition-colors
                                  ${clientData.modeOfPay === mode 
                                    ? 'border-black bg-black text-white' 
                                    : 'border-gray-200 text-gray-700 hover:border-gray-300'}`}
                      >
                        {mode}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            {/* Right Section - Delivery Details */}
            <div className="w-full md:w-1/2 p-4 md:p-8 bg-gradient-to-br from-white to-gray-50">
              <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-6 flex items-center">
                <span className="bg-black text-white rounded-lg w-8 h-8 inline-flex items-center justify-center mr-3 text-sm">02</span>
                Delivery Details
              </h3>

              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Delivery Name</label>
                  <input
                    type="text"
                    value={deliveryData.name}
                    onChange={e => setDeliveryData({...deliveryData, name: e.target.value})}
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-black focus:ring-1 focus:ring-black transition-colors"
                    placeholder="Enter delivery name"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Delivery Cost</label>
                  <div className="flex gap-3">
                    <select
                      value={deliveryData.currency}
                      onChange={e => setDeliveryData({...deliveryData, currency: e.target.value})}
                      className="w-24 px-3 py-3 rounded-lg border border-gray-200 focus:border-black focus:ring-1 focus:ring-black transition-colors bg-gray-50"
                    >
                      {currencies.map(curr => (
                        <option key={curr.code} value={curr.code}>
                          {curr.symbol} {curr.code}
                        </option>
                      ))}
                    </select>
                    <input
                      type="number"
                      value={deliveryData.cost}
                      onChange={e => setDeliveryData({...deliveryData, cost: e.target.value})}
                      className="flex-1 px-4 py-3 rounded-lg border border-gray-200 focus:border-black focus:ring-1 focus:ring-black transition-colors"
                      placeholder="Enter amount"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Description</label>
                  <textarea
                    value={deliveryData.desc}
                    onChange={(e) => setDeliveryData({ ...deliveryData, desc: e.target.value })}
                    rows={4}
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-black focus:ring-1 focus:ring-black transition-colors resize-none"
                    placeholder="Write your delivery description here..."
                  />
                </div>

                {/* Quick Messages */}
                <div className="mt-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Quick Messages:</h4>
                  <div className="inline-flex flex-wrap gap-2">
                    {messages.map((message) => (
                      <button
                        key={message.id}
                        onClick={() => handleMessageClick(message)}
                        className={`px-4 py-1.5 text-sm font-medium rounded-full transition-all duration-200 
                          ${selectedMessage?.id === message.id
                            ? 'bg-gradient-to-r from-gray-800 to-black text-white shadow-sm scale-[1.02]'
                            : 'bg-white text-gray-600 shadow-sm hover:shadow border border-gray-200 hover:border-gray-300'}`}
                      >
                        {message.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end space-x-4 mt-6">
                  <button
                    type="button"
                    onClick={() => {
                      setClientData({
                        name: '',
                        phone: '',
                        email: '',
                        modeOfPay: '',
                        status: 'ACTIVE'
                      });
                      setDeliveryData({
                        name: '',
                        cost: '',
                        currency: 'INR',
                        desc: '',
                        PaymentStatus: 'PENDING'
                      });
                      setSelectedMessage(null);
                    }}
                    className="px-6 py-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="px-6 py-2 rounded-lg bg-black text-white hover:bg-gray-900 transition-colors disabled:bg-gray-400"
                  >
                    {isSubmitting ? 'Creating...' : 'Create Link'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-md w-full relative animate-scale-up">
            <button 
              onClick={resetModal}
              className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="p-6">
              <div className="w-16 h-16 bg-green-100 rounded-full mx-auto flex items-center justify-center mb-4">
                <Check className="w-8 h-8 text-green-500" />
              </div>

              <h3 className="text-2xl font-bold text-center text-gray-900 mb-2">
                Success! 🎉
              </h3>
              
              <p className="text-center text-gray-600 mb-6">
                Your client and delivery have been created successfully
              </p>

              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <p className="text-sm text-gray-600 mb-2">Client link:</p>
                <div className="flex items-center gap-2 bg-white rounded-lg border border-gray-200 p-3">
                  <input
                    type="text"
                    value={clientLink}
                    readOnly
                    className="flex-1 text-sm bg-transparent outline-none"
                  />
                  <button
                    onClick={handleCopyLink}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors group relative"
                  >
                    {copied ? (
                      <Check className="w-4 h-4 text-green-500" />
                    ) : (
                      <Copy className="w-4 h-4 text-gray-500" />
                    )}
                    
                    <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                      {copied ? 'Copied!' : 'Copy link'}
                    </span>
                  </button>
                </div>
              </div>

              <div className="flex gap-3 justify-center">
                <button
                  onClick={() => {
                    resetModal();
                    window.location.reload();
                  }}
                  className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 transition-colors"
                >
                  Create Another
                </button>
                <button
                  onClick={handleCopyLink}
                  className="px-6 py-2 text-sm bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
                >
                  {copied ? 'Copied!' : 'Copy Link'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes scale-up {
          from {
            transform: scale(0.95);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }
        .animate-scale-up {
          animation: scale-up 0.2s ease-out;
        }
      `}</style>
    </div>
  );
};

export default AddNewPage;