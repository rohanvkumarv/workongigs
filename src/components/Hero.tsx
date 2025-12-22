
// 'use client';
// import React, { useState, useEffect } from 'react';
// import { motion } from 'framer-motion';
// import { ArrowRight, Shield, Lock, CheckCircle, Users, Bell, X, FileText, Check, Loader2, Copy } from 'lucide-react';
// import FileUploadComponent from '@/app/freelancer/_components/FileUploadComponent';

// const Hero = () => {
//   const [loading, setLoading] = useState(false);
//   const [showSuccess, setShowSuccess] = useState(false);
//   const [sentEmail, setSentEmail] = useState('');
//   const [previewLink, setPreviewLink] = useState('');
//   const [linkCopied, setLinkCopied] = useState(false);
//   const [error, setError] = useState('');
  
//   const [formData, setFormData] = useState({
//     email: '',
//     clientName: '',
//     projectName: '',
//     cost: ''
//   });
  
//   const [uploadedFiles, setUploadedFiles] = useState([]);
//   const [totalFilesSelected, setTotalFilesSelected] = useState(0);
//   const [filesUploadingCount, setFilesUploadingCount] = useState(0);
//   const [uploadErrors, setUploadErrors] = useState([]);

//   const isUploadingFiles = filesUploadingCount > 0;
//   const hasFilesSelected = totalFilesSelected > 0;
//   const allFilesUploaded = hasFilesSelected && uploadedFiles.length === totalFilesSelected && !isUploadingFiles;
//   const hasUploadErrors = uploadErrors.length > 0;
  
//   const canSubmit = !isUploadingFiles && !loading && allFilesUploaded && !hasUploadErrors;

//   useEffect(() => {
//     if (uploadedFiles.length > 0 && !formData.projectName) {
//       const firstFileName = uploadedFiles[0].name;
//       const projectName = firstFileName
//         .replace(/\.[^/.]+$/, '')
//         .replace(/[-_]/g, ' ')
//         .replace(/\b\w/g, l => l.toUpperCase());
      
//       setFormData(prev => ({ ...prev, projectName }));
//     }
//   }, [uploadedFiles]);

//   const handleFilesSelected = (files) => {
//     setTotalFilesSelected(prev => prev + files.length);
//     setFilesUploadingCount(prev => prev + files.length);
//     setUploadErrors([]);
//   };

//   const handleUploadError = (file, error) => {
//     setUploadErrors(prev => [...prev, { fileName: file.name, error: error.message }]);
//     setFilesUploadingCount(prev => Math.max(0, prev - 1));
//   };

//   const handleUploadComplete = (fileInfo) => {
//     setUploadedFiles(prev => [...prev, fileInfo]);
//     setFilesUploadingCount(prev => Math.max(0, prev - 1));
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   const removeFile = (index) => {
//     setUploadedFiles(prev => prev.filter((_, i) => i !== index));
//     setTotalFilesSelected(prev => prev - 1);
//   };

//   const copyPreviewLink = async () => {
//     try {
//       await navigator.clipboard.writeText(previewLink);
//       setLinkCopied(true);
//       setTimeout(() => setLinkCopied(false), 2000);
//     } catch (err) {
//       console.error('Failed to copy:', err);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');
    
//     if (!formData.email || !formData.clientName || !formData.cost) {
//       setError('Please fill in all fields');
//       return;
//     }

//     if (!uploadedFiles.length) {
//       setError('Please upload at least one file');
//       return;
//     }

//     setLoading(true);

//     try {
//       const response = await fetch('/api/onboard/quick-start', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           email: formData.email,
//           clientName: formData.clientName,
//           deliveryName: formData.projectName,
//           deliveryCost: formData.cost,
//           files: uploadedFiles
//         })
//       });

//       const data = await response.json();

//       if (!response.ok) {
//         throw new Error(data.error || 'Failed to create delivery');
//       }

//       const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://workongigs.com';
//       const generatedLink = `${baseUrl}/${data.data.clientId}/preview?delivery=${data.data.deliveryId}`;

//       setSentEmail(formData.email);
//       setPreviewLink(generatedLink);
//       setShowSuccess(true);

//     } catch (err) {
//       console.error('Onboard error:', err);
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const FeatureStrip = () => {
//     const features = [
//       { label: 'Safe', icon: Shield, desc: 'Bank-grade security' },
//       { label: 'Secure', icon: Lock, desc: 'End-to-end encryption' },
//       { label: 'Reliable', icon: CheckCircle, desc: '99.9% uptime' }
//     ];

//     return (
//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5 }}
//         className="bg-white rounded-xl p-4 shadow-md border border-gray-100"
//       >
//         <div className="flex justify-between items-center divide-x divide-gray-200">
//           {features.map((feature, index) => {
//             const Icon = feature.icon;
//             return (
//               <div key={index} className="flex-1 px-4 first:pl-0 last:pr-0 text-center group">
//                 <div className="flex flex-col items-center gap-2">
//                   <div className="w-10 h-10 rounded-lg bg-black/5 flex items-center justify-center
//                               group-hover:bg-black group-hover:text-white transition-colors duration-300">
//                     <Icon className="w-5 h-5" />
//                   </div>
//                   <div>
//                     <h3 className="text-sm font-semibold text-gray-900">{feature.label}</h3>
//                     <p className="text-xs text-gray-500 mt-0.5">{feature.desc}</p>
//                   </div>
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       </motion.div>
//     );
//   };

//   return (
//     <div className="relative min-h-screen bg-white" id="home">
//       <div className="absolute inset-0">
//         <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000008_1px,transparent_1px),linear-gradient(to_bottom,#00000008_1px,transparent_1px)] bg-[size:24px_24px]" />
//       </div>
      
//       <div className="absolute inset-0 overflow-hidden pointer-events-none">
//         <div className="absolute top-0 -right-40 w-80 h-80 rounded-full 
//                      bg-gradient-to-br from-black/5 to-transparent blur-3xl" />
//         <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full 
//                      bg-gradient-to-tr from-black/5 to-transparent blur-3xl" />
//       </div>

//       <div className="max-w-7xl mx-auto px-4 relative">
//         <div className="min-h-screen pt-28 pb-12 flex items-center">
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center w-full">
            
//             {/* Left Side */}
//             <div className="space-y-5">
//               <motion.div
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.5 }}
//               >
//                 <span className="px-4 py-2 rounded-full bg-black/5 text-gray-700 
//                              text-sm font-medium inline-block">
//                   Welcome to the Future of Freelancing
//                 </span>
//               </motion.div>

//               <motion.h1
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.5, delay: 0.1 }}
//                 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900"
//               >
//                 Say hello to{" "}
//                 <span className="relative inline-block">
//                   WorkOnGigs
//                   <motion.div
//                     className="absolute -bottom-2 left-0 right-0 h-1 bg-black rounded-full"
//                     initial={{ scaleX: 0 }}
//                     animate={{ scaleX: 1 }}
//                     transition={{ duration: 0.5, delay: 0.5 }}
//                   />
//                 </span>
//               </motion.h1>

//               <motion.p
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.5, delay: 0.2 }}
//                 className="text-base sm:text-lg text-gray-600"
//               >
//                 We Ensure: Freelancers Get Paid and Clients Receive Satisfactory Work
//               </motion.p>

//               <motion.div
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.5, delay: 0.3 }}
//                 className="flex flex-wrap gap-3"
//               >
//                 <a href="https://chat.whatsapp.com/CSyUwqxVCc4HfVOPbEzhAs" target="_blank" rel="noopener noreferrer">
//                   <motion.button
//                     whileHover={{ scale: 1.02, y: -2 }}
//                     whileTap={{ scale: 0.98 }}
//                     className="px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 
//                              text-white rounded-lg font-medium hover:from-green-600 hover:to-green-700 
//                              transition-all duration-300 flex items-center gap-2 text-sm"
//                   >
//                     <Users className="w-4 h-4" />
//                     Join Community
//                   </motion.button>
//                 </a>

//                 <a href="https://whatsapp.com/channel/0029VbAtNNnLY6dE9X6kpb3w" target="_blank" rel="noopener noreferrer">
//                   <motion.button
//                     whileHover={{ scale: 1.02, y: -2 }}
//                     whileTap={{ scale: 0.98 }}
//                     className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-600 
//                              text-white rounded-lg font-medium hover:from-emerald-600 hover:to-teal-700 
//                              transition-all duration-300 flex items-center gap-2 text-sm"
//                   >
//                     <Bell className="w-4 h-4" />
//                     Follow Channel
//                   </motion.button>
//                 </a>
//               </motion.div>

//               <div className="hidden lg:block pt-16 sm:pt-20">
//                 <FeatureStrip />
//               </div>
//             </div>

//             {/* Right Side - Form */}
//             <motion.div
//               initial={{ opacity: 0, x: 20 }}
//               animate={{ opacity: 1, x: 0 }}
//               transition={{ duration: 0.5, delay: 0.3 }}
//             >
//               <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
//                 {!showSuccess ? (
//                   <form onSubmit={handleSubmit} className="p-6 space-y-5">
//                     <div>
//                       <h2 className="text-xl font-bold text-gray-900">Quick Start</h2>
//                       <p className="text-sm text-gray-600 mt-1">Create your first delivery</p>
//                     </div>

//                     {/* File Upload */}
//                     <div className="space-y-3">
//                       {totalFilesSelected === 0 ? (
//                         <FileUploadComponent
//                           onUploadComplete={handleUploadComplete}
//                           onFilesSelected={handleFilesSelected}
//                           onUploadError={handleUploadError}
//                           disabled={loading}
//                         />
//                       ) : (
//                         <>
//                           <div className="flex items-center justify-between mb-2">
//                             <p className="text-sm font-medium text-gray-700">
//                               {uploadedFiles.length} of {totalFilesSelected} file{totalFilesSelected !== 1 ? 's' : ''} uploaded
//                             </p>
//                             {/* NO COMPONENT - Just plain input */}
//                             <label className="cursor-pointer">
//                               <input
//                                 type="file"
//                                 multiple
//                                 className="hidden"
//                                 disabled={loading}
//                                 onChange={(e) => {
//                                   const files = Array.from(e.target.files);
//                                   if (files.length === 0) return;
//                                   handleFilesSelected(files);
//                                   // Upload each file
//                                   files.forEach(async (file) => {
//                                     try {
//                                       const CHUNK_SIZE = 5 * 1024 * 1024;
//                                       const parts = Math.ceil(file.size / CHUNK_SIZE);
//                                       const initFormData = new FormData();
//                                       initFormData.append("fileName", file.name);
//                                       initFormData.append("fileType", file.type);
//                                       initFormData.append("parts", parts.toString());
//                                       const initResponse = await fetch("/api/upload", { method: "POST", body: initFormData });
//                                       if (!initResponse.ok) throw new Error('Failed');
//                                       const { uploadId, key, presignedUrls } = await initResponse.json();
//                                       const uploadPromises = presignedUrls.map(async (url, idx) => {
//                                         const start = idx * CHUNK_SIZE;
//                                         const end = Math.min(start + CHUNK_SIZE, file.size);
//                                         const chunk = file.slice(start, end);
//                                         const uploadResponse = await fetch(url, { method: "PUT", body: chunk });
//                                         if (!uploadResponse.ok) throw new Error('Failed part');
//                                         const ETag = uploadResponse.headers.get("ETag").replace(/"/g, '');
//                                         return { PartNumber: idx + 1, ETag };
//                                       });
//                                       const uploadedParts = await Promise.all(uploadPromises);
//                                       const completeResponse = await fetch("/api/complete-upload", {
//                                         method: "POST",
//                                         headers: { "Content-Type": "application/json" },
//                                         body: JSON.stringify({ uploadId, key, parts: uploadedParts })
//                                       });
//                                       if (!completeResponse.ok) throw new Error('Failed complete');
//                                       const { fileUrl } = await completeResponse.json();
//                                       handleUploadComplete({ name: file.name, url: fileUrl, size: file.size, type: file.type });
//                                     } catch (error) {
//                                       handleUploadError(file, error);
//                                     }
//                                   });
//                                 }}
//                               />
//                               <span className="text-sm font-medium text-blue-600 hover:text-blue-700">
//                                 + Add more
//                               </span>
//                             </label>
//                           </div>

//                           {uploadedFiles.length > 0 && (
//                             <div className="space-y-2">
//                               {uploadedFiles.map((file, index) => (
//                                 <div
//                                   key={index}
//                                   className="flex items-center justify-between p-2 bg-gray-50 rounded-lg border border-gray-200 group hover:border-gray-300 transition-colors"
//                                 >
//                                   <div className="flex items-center gap-2 min-w-0 flex-1">
//                                     <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
//                                       <FileText className="w-4 h-4 text-blue-600" />
//                                     </div>
//                                     <div className="min-w-0 flex-1">
//                                       <p className="text-xs font-medium text-gray-900 truncate">
//                                         {file.name}
//                                       </p>
//                                     </div>
//                                   </div>
//                                   <button
//                                     type="button"
//                                     onClick={() => removeFile(index)}
//                                     className="p-1 rounded hover:bg-red-50 text-gray-400 hover:text-red-600 transition-colors opacity-0 group-hover:opacity-100"
//                                   >
//                                     <X className="w-3.5 h-3.5" />
//                                   </button>
//                                 </div>
//                               ))}
//                             </div>
//                           )}
//                         </>
//                       )}

//                       {isUploadingFiles && (
//                         <div className="flex items-center gap-2 text-xs text-blue-600 bg-blue-50 p-2 rounded-lg">
//                           <Loader2 className="w-3.5 h-3.5 animate-spin" />
//                           <span>Uploading {filesUploadingCount} file(s)...</span>
//                         </div>
//                       )}
//                       {hasUploadErrors && (
//                         <div className="text-xs text-red-600 bg-red-50 p-2 rounded-lg">
//                           {uploadErrors.length} file(s) failed to upload
//                         </div>
//                       )}
//                     </div>

//                     {/* Form Fields */}
//                     {uploadedFiles.length > 0 && (
//                       <>
//                         <div className="space-y-3">
//                           <input
//                             type="number"
//                             name="cost"
//                             value={formData.cost}
//                             onChange={handleInputChange}
//                             placeholder="Cost (₹)"
//                             required
//                             min="0"
//                             step="0.01"
//                             className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-black focus:ring-1 focus:ring-black transition-colors text-sm placeholder:text-gray-400"
//                           />

//                           <input
//                             type="text"
//                             name="clientName"
//                             value={formData.clientName}
//                             onChange={handleInputChange}
//                             placeholder="Client Name"
//                             required
//                             className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-black focus:ring-1 focus:ring-black transition-colors text-sm placeholder:text-gray-400"
//                           />

//                           <div>
//                             <input
//                               type="email"
//                               name="email"
//                               value={formData.email}
//                               onChange={handleInputChange}
//                               placeholder="Your Email"
//                               required
//                               className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-black focus:ring-1 focus:ring-black transition-colors text-sm placeholder:text-gray-400"
//                             />
//                             <p className="mt-1.5 text-xs text-gray-500">
//                               We'll send your login credentials here
//                             </p>
//                           </div>
//                         </div>

//                         {error && (
//                           <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
//                             <p className="text-sm text-red-700">{error}</p>
//                           </div>
//                         )}

//                         <button
//                           type="submit"
//                           disabled={!canSubmit}
//                           className="w-full px-6 py-3.5 bg-black text-white rounded-lg font-medium
//                                    hover:bg-gray-900 transition-all flex items-center justify-center gap-2
//                                    disabled:bg-gray-300 disabled:cursor-not-allowed transform hover:scale-[1.01]
//                                    active:scale-[0.99]"
//                         >
//                           {loading ? (
//                             <>
//                               <Loader2 className="w-5 h-5 animate-spin" />
//                               Creating Your Delivery...
//                             </>
//                           ) : isUploadingFiles ? (
//                             <>
//                               <Loader2 className="w-5 h-5 animate-spin" />
//                               Uploading Files...
//                             </>
//                           ) : (
//                             <>
//                               Send Files
//                               <ArrowRight className="w-5 h-5" />
//                             </>
//                           )}
//                         </button>

//                         <p className="text-xs text-gray-500 text-center">
//                           By creating a delivery, you agree to our Terms of Service
//                         </p>
//                       </>
//                     )}
//                   </form>
//                 ) : (
//                   <div className="p-8 text-center">
//                     <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
//                       <Check className="w-8 h-8 text-green-600" />
//                     </div>
                    
//                     <h3 className="text-2xl font-bold text-gray-900 mb-2">
//                       All Set! 🎉
//                     </h3>
//                     <p className="text-gray-600 mb-6">
//                       We've sent your login credentials to <span className="font-medium">{sentEmail}</span>
//                     </p>

//                     <div className="bg-gray-50 rounded-lg p-4 mb-6 border border-gray-200">
//                       <label className="block text-sm font-medium text-gray-700 mb-2">
//                         Preview Link
//                       </label>
//                       <div className="flex items-center gap-2">
//                         <input
//                           type="text"
//                           value={previewLink}
//                           readOnly
//                           className="flex-1 px-3 py-2 bg-white rounded-lg border border-gray-200 text-sm text-gray-600 truncate"
//                         />
//                         <button
//                           onClick={copyPreviewLink}
//                           className={`p-2 rounded-lg transition-colors ${
//                             linkCopied 
//                               ? 'bg-green-100 text-green-600' 
//                               : 'bg-black text-white hover:bg-gray-800'
//                           }`}
//                           title="Copy link"
//                         >
//                           {linkCopied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
//                         </button>
//                       </div>
//                       {linkCopied && (
//                         <p className="text-sm text-green-600 mt-2">Link copied to clipboard!</p>
//                       )}
//                     </div>

//                     <div className="bg-blue-50 rounded-lg p-4 mb-6 border border-blue-100">
//                       <p className="text-sm text-blue-900 mb-2">
//                         Check your email for:
//                       </p>
//                       <ul className="text-sm text-blue-800 space-y-1">
//                         <li>✓ Your login credentials</li>
//                         <li>✓ Delivery preview link</li>
//                         <li>✓ Next steps</li>
//                       </ul>
//                     </div>

//                     <a
//                       href="/auth/freelancer/login"
//                       className="inline-flex items-center gap-2 px-6 py-3 bg-black text-white rounded-lg font-medium
//                                hover:bg-gray-900 transition-all transform hover:scale-[1.02] active:scale-[0.98]"
//                     >
//                       Go to Login
//                       <ArrowRight className="w-5 h-5" />
//                     </a>
//                   </div>
//                 )}
//               </div>

//               <p className="text-center text-sm text-gray-500 mt-4">
//                 Already have an account?{' '}
//                 <a href="/auth/freelancer/login" className="text-black font-medium hover:underline">
//                   Login here
//                 </a>
//               </p>
//             </motion.div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Hero;
'use client';
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Shield, Lock, CheckCircle, Users, Bell, X, FileText, Check, Loader2, Copy } from 'lucide-react';
import FileUploadComponent from '@/app/freelancer/_components/FileUploadComponent';

const Hero = () => {
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [sentEmail, setSentEmail] = useState('');
  const [previewLink, setPreviewLink] = useState('');
  const [linkCopied, setLinkCopied] = useState(false);
  const [error, setError] = useState('');
  const [step, setStep] = useState('form'); // 'form', 'otp', 'success'
  const [otp, setOtp] = useState('');
  
  const [formData, setFormData] = useState({
    email: '',
    clientName: '',
    projectName: '',
    cost: ''
  });
  
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [totalFilesSelected, setTotalFilesSelected] = useState(0);
  const [filesUploadingCount, setFilesUploadingCount] = useState(0);
  const [uploadErrors, setUploadErrors] = useState([]);

  const isUploadingFiles = filesUploadingCount > 0;
  const hasFilesSelected = totalFilesSelected > 0;
  const allFilesUploaded = hasFilesSelected && uploadedFiles.length === totalFilesSelected && !isUploadingFiles;
  const hasUploadErrors = uploadErrors.length > 0;
  
  const canSubmit = !isUploadingFiles && !loading && allFilesUploaded && !hasUploadErrors;

  useEffect(() => {
    if (uploadedFiles.length > 0 && !formData.projectName) {
      const firstFileName = uploadedFiles[0].name;
      const projectName = firstFileName
        .replace(/\.[^/.]+$/, '')
        .replace(/[-_]/g, ' ')
        .replace(/\b\w/g, l => l.toUpperCase());
      
      setFormData(prev => ({ ...prev, projectName }));
    }
  }, [uploadedFiles]);

  const handleFilesSelected = (files) => {
    setTotalFilesSelected(prev => prev + files.length);
    setFilesUploadingCount(prev => prev + files.length);
    setUploadErrors([]);
  };

  const handleUploadError = (file, error) => {
    setUploadErrors(prev => [...prev, { fileName: file.name, error: error.message }]);
    setFilesUploadingCount(prev => Math.max(0, prev - 1));
  };

  const handleUploadComplete = (fileInfo) => {
    setUploadedFiles(prev => [...prev, fileInfo]);
    setFilesUploadingCount(prev => Math.max(0, prev - 1));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const removeFile = (index) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
    setTotalFilesSelected(prev => prev - 1);
  };

  const copyPreviewLink = async () => {
    try {
      await navigator.clipboard.writeText(previewLink);
      setLinkCopied(true);
      setTimeout(() => setLinkCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  // Step 1: Send OTP
  const handleSendOtp = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!formData.email || !formData.clientName || !formData.cost) {
      setError('Please fill in all fields');
      return;
    }

    if (!uploadedFiles.length) {
      setError('Please upload at least one file');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: formData.email })
      });

      const data = await response.json();

      if (data.success) {
        setSentEmail(formData.email);
        setStep('otp');
      } else {
        setError(data.error || 'Failed to send OTP');
      }
    } catch (err) {
      console.error('Send OTP error:', err);
      setError('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  // Step 2: Verify OTP and Create Delivery
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!otp || otp.length !== 6) {
      setError('Please enter a valid 6-digit OTP');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/onboard/quick-start-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          email: formData.email,
          otp: otp,
          clientName: formData.clientName,
          deliveryName: formData.projectName,
          deliveryCost: formData.cost,
          files: uploadedFiles
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create delivery');
      }

      setPreviewLink(data.data.previewLink);
      setStep('success');

    } catch (err) {
      console.error('Verify OTP error:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Resend OTP
  const handleResendOtp = async () => {
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: formData.email })
      });

      const data = await response.json();

      if (data.success) {
        setError(''); // Clear any errors
        // Show success message temporarily
        const successMsg = error;
        setError('New OTP sent to your email!');
        setTimeout(() => setError(''), 3000);
      } else {
        setError(data.error || 'Failed to resend OTP');
      }
    } catch (err) {
      setError('Failed to resend OTP');
    } finally {
      setLoading(false);
    }
  };

  const FeatureStrip = () => {
    const features = [
      { label: 'Safe', icon: Shield, desc: 'Bank-grade security' },
      { label: 'Secure', icon: Lock, desc: 'End-to-end encryption' },
      { label: 'Reliable', icon: CheckCircle, desc: '99.9% uptime' }
    ];

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-xl p-4 shadow-md border border-gray-100"
      >
        <div className="flex justify-between items-center divide-x divide-gray-200">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div key={index} className="flex-1 px-4 first:pl-0 last:pr-0 text-center group">
                <div className="flex flex-col items-center gap-2">
                  <div className="w-10 h-10 rounded-lg bg-black/5 flex items-center justify-center
                              group-hover:bg-black group-hover:text-white transition-colors duration-300">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900">{feature.label}</h3>
                    <p className="text-xs text-gray-500 mt-0.5">{feature.desc}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>
    );
  };

  return (
    <div className="relative min-h-screen bg-white" id="home">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000008_1px,transparent_1px),linear-gradient(to_bottom,#00000008_1px,transparent_1px)] bg-[size:24px_24px]" />
      </div>
      
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 -right-40 w-80 h-80 rounded-full 
                     bg-gradient-to-br from-black/5 to-transparent blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full 
                     bg-gradient-to-tr from-black/5 to-transparent blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 relative">
        <div className="min-h-screen pt-28 pb-12 flex items-center">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center w-full">
            
            {/* Left Side */}
            <div className="space-y-5">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <span className="px-4 py-2 rounded-full bg-black/5 text-gray-700 
                             text-sm font-medium inline-block">
                  Welcome to the Future of Freelancing
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900"
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

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-base sm:text-lg text-gray-600"
              >
                We Ensure: Freelancers Get Paid and Clients Receive Satisfactory Work
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="flex flex-wrap gap-3"
              >
                <a href="https://chat.whatsapp.com/CSyUwqxVCc4HfVOPbEzhAs" target="_blank" rel="noopener noreferrer">
                  <motion.button
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 
                             text-white rounded-lg font-medium hover:from-green-600 hover:to-green-700 
                             transition-all duration-300 flex items-center gap-2 text-sm"
                  >
                    <Users className="w-4 h-4" />
                    Join Community
                  </motion.button>
                </a>

                <a href="https://whatsapp.com/channel/0029VbAtNNnLY6dE9X6kpb3w" target="_blank" rel="noopener noreferrer">
                  <motion.button
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-600 
                             text-white rounded-lg font-medium hover:from-emerald-600 hover:to-teal-700 
                             transition-all duration-300 flex items-center gap-2 text-sm"
                  >
                    <Bell className="w-4 h-4" />
                    Follow Channel
                  </motion.button>
                </a>
              </motion.div>

              <div className="hidden lg:block pt-16 sm:pt-20">
                <FeatureStrip />
              </div>
            </div>

            {/* Right Side - Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
                {step === 'success' ? (
                  // Success Screen
                  <div className="p-8 text-center">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Check className="w-8 h-8 text-green-600" />
                    </div>
                    
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      All Set! 🎉
                    </h3>
                    <p className="text-gray-600 mb-6">
                      Your delivery has been created and sent to <span className="font-medium">{sentEmail}</span>
                    </p>

                    <div className="bg-gray-50 rounded-lg p-4 mb-6 border border-gray-200">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Preview Link
                      </label>
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          value={previewLink}
                          readOnly
                          className="flex-1 px-3 py-2 bg-white rounded-lg border border-gray-200 text-sm text-gray-600 truncate"
                        />
                        <button
                          onClick={copyPreviewLink}
                          className={`p-2 rounded-lg transition-colors ${
                            linkCopied 
                              ? 'bg-green-100 text-green-600' 
                              : 'bg-black text-white hover:bg-gray-800'
                          }`}
                          title="Copy link"
                        >
                          {linkCopied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                        </button>
                      </div>
                      {linkCopied && (
                        <p className="text-sm text-green-600 mt-2">Link copied to clipboard!</p>
                      )}
                    </div>

                    <a
                      href="/auth/quick-start"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-black text-white rounded-lg font-medium
                               hover:bg-gray-900 transition-all transform hover:scale-[1.02] active:scale-[0.98]"
                    >
                      Go to Login
                      <ArrowRight className="w-5 h-5" />
                    </a>
                  </div>
                ) : step === 'otp' ? (
                  // OTP Verification Screen
                  <form onSubmit={handleVerifyOtp} className="p-6 space-y-5">
                    <div>
                      <h2 className="text-xl font-bold text-gray-900">Verify Your Email</h2>
                      <p className="text-sm text-gray-600 mt-1">
                        Enter the OTP sent to <span className="font-medium">{sentEmail}</span>
                      </p>
                    </div>

                    <div>
                      <input
                        type="text"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                        placeholder="Enter 6-digit OTP"
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-black focus:ring-1 focus:ring-black transition-colors text-center text-2xl tracking-widest"
                        maxLength={6}
                        autoFocus
                        disabled={loading}
                      />
                    </div>

                    {error && (
                      <div className={`p-3 rounded-lg ${
                        error.includes('sent') ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
                      }`}>
                        <p className={`text-sm ${error.includes('sent') ? 'text-green-700' : 'text-red-700'}`}>{error}</p>
                      </div>
                    )}

                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => setStep('form')}
                        disabled={loading}
                        className="px-4 py-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors disabled:opacity-50 text-sm font-medium"
                      >
                        ← Back
                      </button>
                      
                      <button
                        type="submit"
                        disabled={loading || otp.length !== 6}
                        className="flex-1 px-6 py-3 bg-black text-white rounded-lg font-medium
                                 hover:bg-gray-900 transition-all flex items-center justify-center gap-2
                                 disabled:bg-gray-300 disabled:cursor-not-allowed"
                      >
                        {loading ? (
                          <>
                            <Loader2 className="w-5 h-5 animate-spin" />
                            Verifying...
                          </>
                        ) : (
                          <>
                            Verify & Create
                            <ArrowRight className="w-5 h-5" />
                          </>
                        )}
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={handleResendOtp}
                      disabled={loading}
                      className="w-full text-sm text-gray-600 hover:text-black transition-colors disabled:opacity-50"
                    >
                      Didn't receive the code? <span className="font-medium">Resend OTP</span>
                    </button>
                  </form>
                ) : (
                  // Form Screen
                  <form onSubmit={handleSendOtp} className="p-6 space-y-5">
                    <div>
                      <h2 className="text-xl font-bold text-gray-900">Quick Start</h2>
                      <p className="text-sm text-gray-600 mt-1">Create your first delivery</p>
                    </div>

                    {/* File Upload */}
                    <div className="space-y-3">
                      {totalFilesSelected === 0 ? (
                        <FileUploadComponent
                          onUploadComplete={handleUploadComplete}
                          onFilesSelected={handleFilesSelected}
                          onUploadError={handleUploadError}
                          disabled={loading}
                        />
                      ) : (
                        <>
                          <div className="flex items-center justify-between mb-2">
                            <p className="text-sm font-medium text-gray-700">
                              {uploadedFiles.length} of {totalFilesSelected} file{totalFilesSelected !== 1 ? 's' : ''} uploaded
                            </p>
                            <label className="cursor-pointer">
                              <input
                                type="file"
                                multiple
                                className="hidden"
                                disabled={loading}
                                onChange={(e) => {
                                  const files = Array.from(e.target.files);
                                  if (files.length === 0) return;
                                  handleFilesSelected(files);
                                  files.forEach(async (file) => {
                                    try {
                                      const CHUNK_SIZE = 5 * 1024 * 1024;
                                      const parts = Math.ceil(file.size / CHUNK_SIZE);
                                      const initFormData = new FormData();
                                      initFormData.append("fileName", file.name);
                                      initFormData.append("fileType", file.type);
                                      initFormData.append("parts", parts.toString());
                                      const initResponse = await fetch("/api/upload", { method: "POST", body: initFormData });
                                      if (!initResponse.ok) throw new Error('Failed');
                                      const { uploadId, key, presignedUrls } = await initResponse.json();
                                      const uploadPromises = presignedUrls.map(async (url, idx) => {
                                        const start = idx * CHUNK_SIZE;
                                        const end = Math.min(start + CHUNK_SIZE, file.size);
                                        const chunk = file.slice(start, end);
                                        const uploadResponse = await fetch(url, { method: "PUT", body: chunk });
                                        if (!uploadResponse.ok) throw new Error('Failed part');
                                        const ETag = uploadResponse.headers.get("ETag").replace(/"/g, '');
                                        return { PartNumber: idx + 1, ETag };
                                      });
                                      const uploadedParts = await Promise.all(uploadPromises);
                                      const completeResponse = await fetch("/api/complete-upload", {
                                        method: "POST",
                                        headers: { "Content-Type": "application/json" },
                                        body: JSON.stringify({ uploadId, key, parts: uploadedParts })
                                      });
                                      if (!completeResponse.ok) throw new Error('Failed complete');
                                      const { fileUrl } = await completeResponse.json();
                                      handleUploadComplete({ name: file.name, url: fileUrl, size: file.size, type: file.type });
                                    } catch (error) {
                                      handleUploadError(file, error);
                                    }
                                  });
                                }}
                              />
                              <span className="text-sm font-medium text-blue-600 hover:text-blue-700">
                                + Add more
                              </span>
                            </label>
                          </div>

                          {uploadedFiles.length > 0 && (
                            <div className="space-y-2">
                              {uploadedFiles.map((file, index) => (
                                <div
                                  key={index}
                                  className="flex items-center justify-between p-2 bg-gray-50 rounded-lg border border-gray-200 group hover:border-gray-300 transition-colors"
                                >
                                  <div className="flex items-center gap-2 min-w-0 flex-1">
                                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                      <FileText className="w-4 h-4 text-blue-600" />
                                    </div>
                                    <div className="min-w-0 flex-1">
                                      <p className="text-xs font-medium text-gray-900 truncate">
                                        {file.name}
                                      </p>
                                    </div>
                                  </div>
                                  <button
                                    type="button"
                                    onClick={() => removeFile(index)}
                                    className="p-1 rounded hover:bg-red-50 text-gray-400 hover:text-red-600 transition-colors opacity-0 group-hover:opacity-100"
                                  >
                                    <X className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              ))}
                            </div>
                          )}
                        </>
                      )}

                      {isUploadingFiles && (
                        <div className="flex items-center gap-2 text-xs text-blue-600 bg-blue-50 p-2 rounded-lg">
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                          <span>Uploading {filesUploadingCount} file(s)...</span>
                        </div>
                      )}
                      {hasUploadErrors && (
                        <div className="text-xs text-red-600 bg-red-50 p-2 rounded-lg">
                          {uploadErrors.length} file(s) failed to upload
                        </div>
                      )}
                    </div>

                    {/* Form Fields */}
                    {uploadedFiles.length > 0 && (
                      <>
                        <div className="space-y-3">
                          <input
                            type="number"
                            name="cost"
                            value={formData.cost}
                            onChange={handleInputChange}
                            placeholder="Cost (₹)"
                            required
                            min="0"
                            step="0.01"
                            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-black focus:ring-1 focus:ring-black transition-colors text-sm placeholder:text-gray-400"
                          />

                          <input
                            type="text"
                            name="clientName"
                            value={formData.clientName}
                            onChange={handleInputChange}
                            placeholder="Client Name"
                            required
                            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-black focus:ring-1 focus:ring-black transition-colors text-sm placeholder:text-gray-400"
                          />

                          <div>
                            <input
                              type="email"
                              name="email"
                              value={formData.email}
                              onChange={handleInputChange}
                              placeholder="Your Email"
                              required
                              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-black focus:ring-1 focus:ring-black transition-colors text-sm placeholder:text-gray-400"
                            />
                            <p className="mt-1.5 text-xs text-gray-500">
                              We'll send an OTP to verify your email
                            </p>
                          </div>
                        </div>

                        {error && (
                          <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                            <p className="text-sm text-red-700">{error}</p>
                          </div>
                        )}

                        <button
                          type="submit"
                          disabled={!canSubmit}
                          className="w-full px-6 py-3.5 bg-black text-white rounded-lg font-medium
                                   hover:bg-gray-900 transition-all flex items-center justify-center gap-2
                                   disabled:bg-gray-300 disabled:cursor-not-allowed transform hover:scale-[1.01]
                                   active:scale-[0.99]"
                        >
                          {loading ? (
                            <>
                              <Loader2 className="w-5 h-5 animate-spin" />
                              Sending OTP...
                            </>
                          ) : isUploadingFiles ? (
                            <>
                              <Loader2 className="w-5 h-5 animate-spin" />
                              Uploading Files...
                            </>
                          ) : (
                            <>
                              Send OTP
                              <ArrowRight className="w-5 h-5" />
                            </>
                          )}
                        </button>

                        <p className="text-xs text-gray-500 text-center">
                          By creating a delivery, you agree to our Terms of Service
                        </p>
                      </>
                    )}
                  </form>
                )}
              </div>

              <p className="text-center text-sm text-gray-500 mt-4">
                Already have an account?{' '}
                <a href="/auth/quick-start" className="text-black font-medium hover:underline">
                  Login here
                </a>
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;