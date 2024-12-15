"use client"
// import React, { useState } from 'react';
// import { motion } from 'framer-motion';
// import { Upload, X, Plus, User, FolderPlus, Home, LogOut } from 'lucide-react';

// const FilePreview = ({ file, onRemove }) => (
//     <div className="flex items-center justify-between px-4 py-2 bg-gray-50 rounded-lg">
//       <div className="flex items-center gap-3">
//         <div className="w-8 h-8 rounded-lg bg-black/5 flex items-center justify-center">
//           <Upload className="w-4 h-4 text-gray-600" />
//         </div>
//         <div className="flex-1 min-w-0">
//           <p className="text-sm font-medium text-gray-900 truncate">{file.name}</p>
//           <p className="text-xs text-gray-500">{(file.size / 1024).toFixed(1)} KB</p>
//         </div>
//       </div>
//       <button
//         onClick={onRemove}
//         className="p-1 hover:bg-gray-200 rounded-full transition-colors"
//       >
//         <X className="w-4 h-4 text-gray-500" />
//       </button>
//     </div>
//   );
  
//   // AddNewProject Component
//   const AddNewProject = () => {
//     const [files, setFiles] = useState([]);
//     const [formData, setFormData] = useState({
//       projectName: '',
//       clientName: '',
//       cost: '',
//       paymentMode: '',
//       description: ''
//     });
  
//     const handleFileChange = (e) => {
//       const newFiles = Array.from(e.target.files);
//       setFiles(prev => [...prev, ...newFiles]);
//     };
  
//     const removeFile = (index) => {
//       setFiles(prev => prev.filter((_, i) => i !== index));
//     };
  
//     const handleDrop = (e) => {
//       e.preventDefault();
//       const droppedFiles = Array.from(e.dataTransfer.files);
//       setFiles(prev => [...prev, ...droppedFiles]);
//     };
  
//     return (
//       <div className="flex-1 p-8 bg-gray-50 min-h-screen">
//         <div className="max-w-4xl mx-auto">
//           {/* Header */}
//           <div className="mb-8">
//             <h1 className="text-2xl font-bold text-gray-900 mb-2">Create New Project</h1>
//             <p className="text-gray-600">Add project details and upload relevant files</p>
//           </div>
  
//           {/* Main Content */}
//           <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
//             {/* File Upload Section */}
//             <div
//               onDrop={handleDrop}
//               onDragOver={(e) => e.preventDefault()}
//               className="mb-8 border-2 border-dashed border-gray-200 rounded-xl p-8 
//                        text-center hover:border-gray-300 transition-colors relative"
//             >
//               <input
//                 type="file"
//                 multiple
//                 onChange={handleFileChange}
//                 className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
//               />
//               <Upload className="w-8 h-8 text-gray-400 mx-auto mb-4" />
//               <p className="text-gray-600 mb-2">
//                 Drop files here or click to upload
//               </p>
//               <p className="text-sm text-gray-500">
//                 Support for multiple files
//               </p>
//             </div>
  
//             {/* File Previews */}
//             {files.length > 0 && (
//               <div className="mb-8 space-y-2">
//                 {files.map((file, index) => (
//                   <FilePreview
//                     key={index}
//                     file={file}
//                     onRemove={() => removeFile(index)}
//                   />
//                 ))}
//               </div>
//             )}
  
//             {/* Project Details Form */}
//             <form className="space-y-6">
//               <div className="grid grid-cols-2 gap-6">
//                 <div className="space-y-2">
//                   <label className="text-sm font-medium text-gray-700">
//                     Project Name
//                   </label>
//                   <input
//                     type="text"
//                     value={formData.projectName}
//                     onChange={e => setFormData({...formData, projectName: e.target.value})}
//                     className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-black 
//                            focus:ring-1 focus:ring-black transition-colors"
//                   />
//                 </div>
//                 <div className="space-y-2">
//                   <label className="text-sm font-medium text-gray-700">
//                     Client Name
//                   </label>
//                   <input
//                     type="text"
//                     value={formData.clientName}
//                     onChange={e => setFormData({...formData, clientName: e.target.value})}
//                     className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-black 
//                            focus:ring-1 focus:ring-black transition-colors"
//                   />
//                 </div>
//               </div>
  
//               <div className="grid grid-cols-2 gap-6">
//                 <div className="space-y-2">
//                   <label className="text-sm font-medium text-gray-700">
//                     Cost
//                   </label>
//                   <input
//                     type="number"
//                     value={formData.cost}
//                     onChange={e => setFormData({...formData, cost: e.target.value})}
//                     className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-black 
//                            focus:ring-1 focus:ring-black transition-colors"
//                   />
//                 </div>
//                 <div className="space-y-2">
//                   <label className="text-sm font-medium text-gray-700">
//                     Mode of Payment
//                   </label>
//                   <select
//                     value={formData.paymentMode}
//                     onChange={e => setFormData({...formData, paymentMode: e.target.value})}
//                     className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-black 
//                            focus:ring-1 focus:ring-black transition-colors"
//                   >
//                     <option value="">Select payment mode</option>
//                     <option value="bank">Bank Transfer</option>
//                     <option value="upi">UPI</option>
//                     <option value="cash">Cash</option>
//                   </select>
//                 </div>
//               </div>
  
//               <div className="space-y-2">
//                 <label className="text-sm font-medium text-gray-700">
//                   Description
//                 </label>
//                 <textarea
//                   value={formData.description}
//                   onChange={e => setFormData({...formData, description: e.target.value})}
//                   rows={4}
//                   className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-black 
//                          focus:ring-1 focus:ring-black transition-colors resize-none"
//                 />
//               </div>
  
//               <div className="flex justify-end space-x-4">
//                 <motion.button
//                   type="button"
//                   whileHover={{ scale: 1.02 }}
//                   whileTap={{ scale: 0.98 }}
//                   className="px-6 py-2 rounded-lg border border-gray-200 text-gray-600 
//                          hover:bg-gray-50 transition-colors"
//                 >
//                   Cancel
//                 </motion.button>
//                 <motion.button
//                   type="submit"
//                   whileHover={{ scale: 1.02 }}
//                   whileTap={{ scale: 0.98 }}
//                   className="px-6 py-2 rounded-lg bg-black text-white hover:bg-gray-900 
//                          transition-colors"
//                 >
//                   Create Project
//                 </motion.button>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//     );
//   };
  
  
  
//   export default AddNewProject;


//   modify this layout a bit first

// create a big div taking full screen it should be file upload thing drag and drop and all and then show preview of files on its right by shrinking it 

// and then below show basic details on one side and another side show descibriot  field like two sepaertions make it more beautfil
// and mode of payment will be like use can chose any from this
// monthly
// weekly
//  by no of projects  - in this case allow them to enter a number
//  then always allow 

//  and add a note or give i icon which show info like 

//  for how much time you want to allow clients download your projects /files without payment
// make it loook more premium separtable viusally looking section
// import React, { useState } from 'react';
// import { Upload, X, Info, Clock } from 'lucide-react';

// const FilePreview = ({ file, onRemove }) => (
//   <div className="flex items-center justify-between p-3 bg-white rounded-lg shadow-sm border border-gray-100">
//     <div className="flex items-center gap-3">
//       <div className="w-8 h-8 rounded-lg bg-black/5 flex items-center justify-center">
//         <Upload className="w-4 h-4 text-gray-600" />
//       </div>
//       <div className="flex-1 min-w-0">
//         <p className="text-sm font-medium text-gray-900 truncate">{file.name}</p>
//         <p className="text-xs text-gray-500">{(file.size / 1024).toFixed(1)} KB</p>
//       </div>
//     </div>
//     <button
//       onClick={onRemove}
//       className="p-1 hover:bg-gray-100 rounded-full transition-colors"
//     >
//       <X className="w-4 h-4 text-gray-500" />
//     </button>
//   </div>
// );

// const AddNewProject = () => {
//   const [files, setFiles] = useState([]);
//   const [formData, setFormData] = useState({
//     projectName: '',
//     clientName: '',
//     cost: '',
//     paymentMode: '',
//     projectCount: '',
//     downloadWindow: '',
//     description: ''
//   });
//   const [showTooltip, setShowTooltip] = useState(false);

//   const handleFileChange = (e) => {
//     const newFiles = Array.from(e.target.files);
//     setFiles(prev => [...prev, ...newFiles]);
//   };

//   const removeFile = (index) => {
//     setFiles(prev => prev.filter((_, i) => i !== index));
//   };

//   const handleDrop = (e) => {
//     e.preventDefault();
//     const droppedFiles = Array.from(e.dataTransfer.files);
//     setFiles(prev => [...prev, ...droppedFiles]);
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 p-8">
//       <div className="max-w-7xl mx-auto">
//         <h1 className="text-3xl font-bold text-gray-900 mb-2">Create New Project</h1>
//         <p className="text-gray-600 mb-8">Set up your project details and payment structure</p>

//         {/* File Upload and Preview Section */}
//         <div className="flex gap-6 mb-8">
//           {/* Upload Area */}
//           <div className="flex-1">
//             <div
//               onDrop={handleDrop}
//               onDragOver={(e) => e.preventDefault()}
//               className="h-96 border-2 border-dashed border-gray-200 rounded-xl p-8 
//                        bg-white text-center hover:border-gray-300 transition-colors relative
//                        flex flex-col items-center justify-center"
//             >
//               <input
//                 type="file"
//                 multiple
//                 onChange={handleFileChange}
//                 className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
//               />
//               <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
//               <h3 className="text-lg font-medium text-gray-900 mb-2">
//                 Drop files here or click to upload
//               </h3>
//               <p className="text-sm text-gray-500 max-w-sm mx-auto">
//                 Upload your project files. We support multiple file uploads and all common formats.
//               </p>
//             </div>
//           </div>

//           {/* File Preview Area */}
//           <div className="w-96">
//             <div className="bg-gray-100 rounded-xl p-6 h-96 overflow-y-auto">
//               <h3 className="text-lg font-medium text-gray-900 mb-4">Uploaded Files</h3>
//               <div className="space-y-3">
//                 {files.length === 0 ? (
//                   <p className="text-sm text-gray-500 text-center py-8">
//                     No files uploaded yet
//                   </p>
//                 ) : (
//                   files.map((file, index) => (
//                     <FilePreview
//                       key={index}
//                       file={file}
//                       onRemove={() => removeFile(index)}
//                     />
//                   ))
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Project Details Section */}
//         <div className="grid grid-cols-2 gap-8">
//           {/* Basic Details */}
//           <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
//             <h3 className="text-lg font-medium text-gray-900 mb-6">Basic Details</h3>
//             <div className="space-y-6">
//               <div className="space-y-2">
//                 <label className="text-sm font-medium text-gray-700">Project Name</label>
//                 <input
//                   type="text"
//                   value={formData.projectName}
//                   onChange={e => setFormData({...formData, projectName: e.target.value})}
//                   className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-black 
//                          focus:ring-1 focus:ring-black transition-colors"
//                 />
//               </div>
//               <div className="space-y-2">
//                 <label className="text-sm font-medium text-gray-700">Client Name</label>
//                 <input
//                   type="text"
//                   value={formData.clientName}
//                   onChange={e => setFormData({...formData, clientName: e.target.value})}
//                   className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-black 
//                          focus:ring-1 focus:ring-black transition-colors"
//                 />
//               </div>
//               <div className="space-y-2">
//                 <label className="text-sm font-medium text-gray-700">Cost</label>
//                 <input
//                   type="number"
//                   value={formData.cost}
//                   onChange={e => setFormData({...formData, cost: e.target.value})}
//                   className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-black 
//                          focus:ring-1 focus:ring-black transition-colors"
//                 />
//               </div>
//               <div className="space-y-2">
//                 <label className="text-sm font-medium text-gray-700">Mode of Payment</label>
//                 <select
//                   value={formData.paymentMode}
//                   onChange={e => setFormData({...formData, paymentMode: e.target.value})}
//                   className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-black 
//                          focus:ring-1 focus:ring-black transition-colors"
//                 >
//                   <option value="">Select payment mode</option>
//                   <option value="monthly">Monthly</option>
//                   <option value="weekly">Weekly</option>
//                   <option value="per_project">By Number of Projects</option>
//                 </select>
//               </div>
//               {formData.paymentMode === 'per_project' && (
//                 <div className="space-y-2">
//                   <label className="text-sm font-medium text-gray-700">Number of Projects</label>
//                   <input
//                     type="number"
//                     value={formData.projectCount}
//                     onChange={e => setFormData({...formData, projectCount: e.target.value})}
//                     className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-black 
//                            focus:ring-1 focus:ring-black transition-colors"
//                   />
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* Description and Additional Details */}
//           <div className="space-y-8">
//             <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
//               <h3 className="text-lg font-medium text-gray-900 mb-6">Project Description</h3>
//               <textarea
//                 value={formData.description}
//                 onChange={e => setFormData({...formData, description: e.target.value})}
//                 rows={8}
//                 className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-black 
//                        focus:ring-1 focus:ring-black transition-colors resize-none"
//                 placeholder="Describe your project details, requirements, and any special instructions..."
//               />
//             </div>

//             <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
//               <div className="flex items-center gap-2 mb-4">
//                 <h3 className="text-lg font-medium text-gray-900">Download Window</h3>
//                 <div className="relative">
//                   <button
//                     onMouseEnter={() => setShowTooltip(true)}
//                     onMouseLeave={() => setShowTooltip(false)}
//                     className="text-gray-400 hover:text-gray-600"
//                   >
//                     <Info className="w-4 h-4" />
//                   </button>
//                   {showTooltip && (
//                     <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg w-48">
//                       Specify how long clients can download projects without additional payment
//                     </div>
//                   )}
//                 </div>
//               </div>
//               <div className="flex items-center gap-4">
//                 <input
//                   type="number"
//                   value={formData.downloadWindow}
//                   onChange={e => setFormData({...formData, downloadWindow: e.target.value})}
//                   className="flex-1 px-4 py-2 rounded-lg border border-gray-200 focus:border-black 
//                          focus:ring-1 focus:ring-black transition-colors"
//                   placeholder="Enter days"
//                 />
//                 <Clock className="w-5 h-5 text-gray-400" />
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Action Buttons */}
//         <div className="flex justify-end space-x-4 mt-8">
//           <button
//             type="button"
//             className="px-6 py-2 rounded-lg border border-gray-200 text-gray-600 
//                      hover:bg-gray-50 transition-colors"
//           >
//             Cancel
//           </button>
//           <button
//             type="submit"
//             className="px-6 py-2 rounded-lg bg-black text-white hover:bg-gray-900 
//                      transition-colors"
//           >
//             Create Project
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AddNewProject;
// import React, { useState } from 'react';
// import { Upload, X, Info, Hash } from 'lucide-react';

// const FilePreview = ({ file, onRemove }) => (
//   <div className="flex items-center justify-between p-3 bg-white rounded-lg shadow-sm border border-gray-100">
//     <div className="flex items-center gap-3">
//       <div className="w-8 h-8 rounded-lg bg-black/5 flex items-center justify-center">
//         <Upload className="w-4 h-4 text-gray-600" />
//       </div>
//       <div className="flex-1 min-w-0">
//         <p className="text-sm font-medium text-gray-900 truncate">{file.name}</p>
//         <p className="text-xs text-gray-500">{(file.size / 1024).toFixed(1)} KB</p>
//       </div>
//     </div>
//     <button
//       onClick={onRemove}
//       className="p-1 hover:bg-gray-100 rounded-full transition-colors"
//     >
//       <X className="w-4 h-4 text-gray-500" />
//     </button>
//   </div>
// );

// const AddNewProject = () => {
//   const [files, setFiles] = useState([]);
//   const [showTooltip, setShowTooltip] = useState(false);
//   const [formData, setFormData] = useState({
//     projectName: '',
//     cost: '',
//     currency: 'USD',
//     paymentMode: '',
//     projectCount: '',
//     description: ''
//   });

//   const handleFileChange = (e) => {
//     const newFiles = Array.from(e.target.files);
//     setFiles(prev => [...prev, ...newFiles]);
//   };

//   const removeFile = (index) => {
//     setFiles(prev => prev.filter((_, i) => i !== index));
//   };

//   const handleDrop = (e) => {
//     e.preventDefault();
//     const droppedFiles = Array.from(e.dataTransfer.files);
//     setFiles(prev => [...prev, ...droppedFiles]);
//   };

//   const currencies = [
//     { code: 'USD', symbol: '$' },
//     { code: 'EUR', symbol: '€' },
//     { code: 'GBP', symbol: '£' },
//     { code: 'INR', symbol: '₹' },
//   ];

//   return (
//     <div className="min-h-screen bg-gray-50 p-8">
//       <div className="max-w-7xl mx-auto">
//         <h1 className="text-3xl font-bold text-gray-900 mb-2">Create New Project</h1>
//         <p className="text-gray-600 mb-8">Set up your project details and payment structure</p>

//         {/* File Upload and Preview Section */}
//         <div className="flex gap-6 mb-8">
//           {/* Upload Area */}
//           <div className="flex-1">
//             <div
//               onDrop={handleDrop}
//               onDragOver={(e) => e.preventDefault()}
//               className="h-96 border-2 border-dashed border-gray-200 rounded-xl p-8 
//                        bg-white text-center hover:border-gray-300 transition-colors relative
//                        flex flex-col items-center justify-center"
//             >
//               <input
//                 type="file"
//                 multiple
//                 onChange={handleFileChange}
//                 className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
//               />
//               <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
//               <h3 className="text-lg font-medium text-gray-900 mb-2">
//                 Drop files here or click to upload
//               </h3>
//               <p className="text-sm text-gray-500 max-w-sm mx-auto">
//                 Upload your project files. We support multiple file uploads and all common formats.
//               </p>
//             </div>
//           </div>

//           {/* File Preview Area */}
//           <div className="w-96">
//             <div className="bg-gray-100 rounded-xl p-6 h-96 overflow-y-auto">
//               <h3 className="text-lg font-medium text-gray-900 mb-4">Uploaded Files</h3>
//               <div className="space-y-3">
//                 {files.length === 0 ? (
//                   <p className="text-sm text-gray-500 text-center py-8">
//                     No files uploaded yet
//                   </p>
//                 ) : (
//                   files.map((file, index) => (
//                     <FilePreview
//                       key={index}
//                       file={file}
//                       onRemove={() => removeFile(index)}
//                     />
//                   ))
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Project Details Box */}
//         <div className="bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden backdrop-blur-sm bg-white/80">
//           <div className="flex divide-x divide-gray-100">
//             {/* Left Section - Project Details */}
//             <div className="w-1/2 p-8 bg-gradient-to-br from-white to-gray-50">
//               <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
//                 <span className="bg-black text-white rounded-lg w-8 h-8 inline-flex items-center justify-center mr-3 text-sm">01</span>
//                 Project Details
//               </h3>
              
//               <div className="space-y-6">
//                 <div className="space-y-2">
//                   <label className="text-sm font-medium text-gray-700">Project Name</label>
//                   <input
//                     type="text"
//                     value={formData.projectName}
//                     onChange={e => setFormData({...formData, projectName: e.target.value})}
//                     className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-black 
//                            focus:ring-1 focus:ring-black transition-colors"
//                     placeholder="Enter project name"
//                   />
//                 </div>

//                 <div className="space-y-2">
//                   <label className="text-sm font-medium text-gray-700">Project Cost</label>
//                   <div className="flex gap-3">
//                     <select
//                       value={formData.currency}
//                       onChange={e => setFormData({...formData, currency: e.target.value})}
//                       className="w-24 px-3 py-3 rounded-lg border border-gray-200 focus:border-black 
//                              focus:ring-1 focus:ring-black transition-colors bg-gray-50"
//                     >
//                       {currencies.map(curr => (
//                         <option key={curr.code} value={curr.code}>
//                           {curr.symbol} {curr.code}
//                         </option>
//                       ))}
//                     </select>
//                     <input
//                       type="number"
//                       value={formData.cost}
//                       onChange={e => setFormData({...formData, cost: e.target.value})}
//                       className="flex-1 px-4 py-3 rounded-lg border border-gray-200 focus:border-black 
//                              focus:ring-1 focus:ring-black transition-colors"
//                       placeholder="Enter amount"
//                     />
//                   </div>
//                 </div>

//                 {formData.paymentMode === 'No. of Projects' && (
//                   <div className="space-y-2">
//                     <label className="text-sm font-medium text-gray-700">Number of Projects</label>
//                     <div className="relative">
//                       <input
//                         type="number"
//                         value={formData.projectCount}
//                         onChange={e => setFormData({...formData, projectCount: e.target.value})}
//                         className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-200 focus:border-black 
//                                focus:ring-1 focus:ring-black transition-colors"
//                         placeholder="Enter number of projects"
//                         min="1"
//                       />
//                       <div className="absolute left-4 top-1/2 -translate-y-1/2">
//                         <Hash className="w-4 h-4 text-gray-400" />
//                       </div>
//                     </div>
//                   </div>
//                 )}

//                 <div className="space-y-2">
//                   <div className="flex items-center gap-2">
//                     <label className="text-sm font-medium text-gray-700">Payment Mode</label>
//                     <div className="relative">
//                       <button
//                         onMouseEnter={() => setShowTooltip(true)}
//                         onMouseLeave={() => setShowTooltip(false)}
//                         className="text-gray-400 hover:text-gray-600"
//                       >
//                         <Info className="w-4 h-4" />
//                       </button>
//                       {showTooltip && (
//                         <div className="absolute z-10 bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 
//                                     bg-gray-900 text-white text-xs rounded-lg w-48">
//                           Choose how long you want to allow users to access files
//                         </div>
//                       )}
//                     </div>
//                   </div>
//                   <div className="grid grid-cols-2 gap-3">
//                     {['Weekly', 'Monthly', 'No. of Projects', 'Always Allow'].map((mode) => (
//                       <button
//                         key={mode}
//                         onClick={() => setFormData({...formData, paymentMode: mode})}
//                         className={`px-4 py-3 rounded-lg border text-sm font-medium transition-colors
//                                 ${formData.paymentMode === mode 
//                                   ? 'border-black bg-black text-white' 
//                                   : 'border-gray-200 text-gray-700 hover:border-gray-300'}`}
//                       >
//                         {mode}
//                       </button>
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Right Section - Description */}
//             <div className="w-1/2 p-8 bg-gradient-to-br from-white to-gray-50">
//               <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
//                 <span className="bg-black text-white rounded-lg w-8 h-8 inline-flex items-center justify-center mr-3 text-sm">02</span>
//                 Project Description
//               </h3>
//               <textarea
//                 value={formData.description}
//                 onChange={e => setFormData({...formData, description: e.target.value})}
//                 rows={11}
//                 className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-black 
//                        focus:ring-1 focus:ring-black transition-colors resize-none"
//                 placeholder="Describe your project details, requirements, and any special instructions..."
//               />
              
//               {/* Action Buttons */}
//               <div className="flex justify-end space-x-4 mt-6">
//                 <button
//                   type="button"
//                   className="px-6 py-2 rounded-lg border border-gray-200 text-gray-600 
//                          hover:bg-gray-50 transition-colors"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="submit"
//                   className="px-6 py-2 rounded-lg bg-black text-white hover:bg-gray-900 
//                          transition-colors"
//                 >
//                   Create Project
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AddNewProject;

import React, { useState } from 'react';
import { Upload, X, Info, Hash } from 'lucide-react';

const FilePreview = ({ file, onRemove }) => (
  <div className="flex items-center justify-between p-3 bg-white rounded-lg shadow-sm border border-gray-100">
    <div className="flex items-center gap-3">
      <div className="w-8 h-8 rounded-lg bg-black/5 flex items-center justify-center">
        <Upload className="w-4 h-4 text-gray-600" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-900 truncate">{file.name}</p>
        <p className="text-xs text-gray-500">{(file.size / 1024).toFixed(1)} KB</p>
      </div>
    </div>
    <button
      onClick={onRemove}
      className="p-1 hover:bg-gray-100 rounded-full transition-colors"
    >
      <X className="w-4 h-4 text-gray-500" />
    </button>
  </div>
);

const AddNewProject = () => {
  const [files, setFiles] = useState([]);
  const [showTooltip, setShowTooltip] = useState(false);
  const [formData, setFormData] = useState({
    projectName: '',
    cost: '',
    currency: 'USD',
    paymentMode: '',
    projectCount: '',
    description: ''
  });

  const handleFileChange = (e) => {
    const newFiles = Array.from(e.target.files);
    setFiles(prev => [...prev, ...newFiles]);
  };

  const removeFile = (index) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFiles = Array.from(e.dataTransfer.files);
    setFiles(prev => [...prev, ...droppedFiles]);
  };

  const currencies = [
    { code: 'USD', symbol: '$' },
    { code: 'EUR', symbol: '€' },
    { code: 'GBP', symbol: '£' },
    { code: 'INR', symbol: '₹' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Create New Project</h1>
        <p className="text-gray-600 mb-8">Set up your project details and payment structure</p>

        {/* File Upload and Preview Section */}
        <div className="flex gap-6 mb-8">
          {/* Upload Area */}
          <div className="flex-1">
            <div
              onDrop={handleDrop}
              onDragOver={(e) => e.preventDefault()}
              className="h-96 border-2 border-dashed border-gray-200 rounded-xl p-8 
                       bg-white text-center hover:border-gray-300 transition-colors relative
                       flex flex-col items-center justify-center"
            >
              <input
                type="file"
                multiple
                onChange={handleFileChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Drop files here or click to upload
              </h3>
              <p className="text-sm text-gray-500 max-w-sm mx-auto">
                Upload your project files. We support multiple file uploads and all common formats.
              </p>
            </div>
          </div>

          {/* File Preview Area */}
          <div className="w-96">
            <div className="bg-gray-100 rounded-xl p-6 h-96 overflow-y-auto">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Uploaded Files</h3>
              <div className="space-y-3">
                {files.length === 0 ? (
                  <p className="text-sm text-gray-500 text-center py-8">
                    No files uploaded yet
                  </p>
                ) : (
                  files.map((file, index) => (
                    <FilePreview
                      key={index}
                      file={file}
                      onRemove={() => removeFile(index)}
                    />
                  ))
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Project Details Box */}
        <div className="bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden backdrop-blur-sm bg-white/80">
          <div className="flex divide-x divide-gray-100">
            {/* Left Section - Project Details */}
            <div className="w-1/2 p-8 bg-gradient-to-br from-white to-gray-50">
              <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                <span className="bg-black text-white rounded-lg w-8 h-8 inline-flex items-center justify-center mr-3 text-sm">01</span>
                Project Details
              </h3>
              
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Project Name</label>
                  <input
                    type="text"
                    value={formData.projectName}
                    onChange={e => setFormData({...formData, projectName: e.target.value})}
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-black 
                           focus:ring-1 focus:ring-black transition-colors"
                    placeholder="Enter project name"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Project Cost</label>
                  <div className="flex gap-3">
                    <select
                      value={formData.currency}
                      onChange={e => setFormData({...formData, currency: e.target.value})}
                      className="w-24 px-3 py-3 rounded-lg border border-gray-200 focus:border-black 
                             focus:ring-1 focus:ring-black transition-colors bg-gray-50"
                    >
                      {currencies.map(curr => (
                        <option key={curr.code} value={curr.code}>
                          {curr.symbol} {curr.code}
                        </option>
                      ))}
                    </select>
                    <input
                      type="number"
                      value={formData.cost}
                      onChange={e => setFormData({...formData, cost: e.target.value})}
                      className="flex-1 px-4 py-3 rounded-lg border border-gray-200 focus:border-black 
                             focus:ring-1 focus:ring-black transition-colors"
                      placeholder="Enter amount"
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
                        <div className="absolute z-10 bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 
                                    bg-gray-900 text-white text-xs rounded-lg w-48">
                          Choose how long you want to allow users to access files
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    {['Weekly', 'Monthly', 'No. of Projects', 'Always Allow'].map((mode) => (
                      <button
                        key={mode}
                        onClick={() => setFormData({...formData, paymentMode: mode})}
                        className={`px-4 py-3 rounded-lg border text-sm font-medium transition-colors
                                ${formData.paymentMode === mode 
                                  ? 'border-black bg-black text-white' 
                                  : 'border-gray-200 text-gray-700 hover:border-gray-300'}`}
                      >
                        {mode}
                      </button>
                    ))}
                  </div>
                </div>
                {formData.paymentMode === 'No. of Projects' && (
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Number of Projects</label>
                    <div className="relative">
                      <input
                        type="number"
                        value={formData.projectCount}
                        onChange={e => setFormData({...formData, projectCount: e.target.value})}
                        className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-200 focus:border-black 
                               focus:ring-1 focus:ring-black transition-colors"
                        placeholder="Enter number of projects"
                        min="1"
                      />
                      <div className="absolute left-4 top-1/2 -translate-y-1/2">
                        <Hash className="w-4 h-4 text-gray-400" />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Right Section - Description */}
            <div className="w-1/2 p-8 bg-gradient-to-br from-white to-gray-50">
              <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                <span className="bg-black text-white rounded-lg w-8 h-8 inline-flex items-center justify-center mr-3 text-sm">02</span>
                Project Description
              </h3>
              <textarea
                value={formData.description}
                onChange={e => setFormData({...formData, description: e.target.value})}
                rows={11}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-black 
                       focus:ring-1 focus:ring-black transition-colors resize-none"
                placeholder="Describe your project details, requirements, and any special instructions..."
              />
              
              {/* Action Buttons */}
              <div className="flex justify-end space-x-4 mt-6">
                <button
                  type="button"
                  className="px-6 py-2 rounded-lg border border-gray-200 text-gray-600 
                         hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-lg bg-black text-white hover:bg-gray-900 
                         transition-colors"
                >
                  Create Project
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddNewProject;