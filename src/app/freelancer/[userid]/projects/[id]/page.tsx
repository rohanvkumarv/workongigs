"use client"
// // import React, { useState } from 'react';
// // import { Plus, X, Upload, Share2, Eye, ExternalLink } from 'lucide-react';

// // const ProjectDetailsPage = () => {
// //   const [isFormOpen, setIsFormOpen] = useState(false);
  
// //   const project = {
// //     name: "E-commerce Website",
// //     paymentMode: "Fixed Price",
// //     totalAmount: 5000,
// //     amountLeft: 2000,
// //     files: [
// //       {
// //         instance: "Instance #1249",
// //         date: "2024-12-15",
// //         status: "Completed",
// //         noOfFiles: 3,
// //         previewUrl: "#",
// //         downloadUrl: "#"
// //       }
// //     ]
// //   };

// //   return (
// //     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8 relative">
// //       {/* Header Card */}
// //       <div className="max-w-7xl mx-auto mb-6">
// //         <div className="bg-white rounded-2xl shadow-xl border border-gray-200/50 backdrop-blur-sm p-8">
// //           <div className="grid grid-cols-3 gap-8">
// //             <div>
// //               <h2 className="text-sm font-medium text-gray-500 mb-2">Project Name</h2>
// //               <p className="text-xl font-semibold text-gray-900">{project.name}</p>
// //             </div>
// //             <div>
// //               <h2 className="text-sm font-medium text-gray-500 mb-2">Payment Mode</h2>
// //               <p className="text-xl font-semibold text-gray-900">{project.paymentMode}</p>
// //             </div>
// //             <div className="text-right">
// //               <h2 className="text-sm font-medium text-gray-500 mb-2">Amount</h2>
// //               <div className="flex items-end justify-end gap-2">
// //                 <p className="text-xl font-semibold text-gray-900">
// //                   ${project.amountLeft.toLocaleString()}
// //                 </p>
// //                 <p className="text-sm text-gray-500">
// //                   / ${project.totalAmount.toLocaleString()}
// //                 </p>
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       </div>

// //       {/* Files Section */}
// //       <div className="max-w-7xl mx-auto">
// //         <div className="bg-white rounded-2xl shadow-xl border border-gray-200/50 backdrop-blur-sm overflow-hidden">
// //           {/* Table Headers */}
// //           <div className="px-8 py-4 border-b border-gray-200 bg-gray-50">
// //             <div className="grid grid-cols-6 gap-4">
// //               <div className="text-sm font-medium text-gray-500">Instance</div>
// //               <div className="text-sm font-medium text-gray-500">Files</div>
// //               <div className="text-sm font-medium text-gray-500">Date</div>
// //               <div className="text-sm font-medium text-gray-500">Status</div>
// //               <div className="text-sm font-medium text-gray-500">Preview</div>
// //               <div className="text-sm font-medium text-gray-500 text-right">Actions</div>
// //             </div>
// //           </div>

// //           {/* Files List */}
// //           <div className="divide-y divide-gray-200">
// //             {project.files.map((file, index) => (
// //               <div key={index} className="px-8 py-4 hover:bg-gray-50/50 transition-all">
// //                 <div className="grid grid-cols-6 gap-4 items-center">
// //                   <div className="font-medium text-gray-900">{file.instance}</div>
// //                   <div className="text-gray-600">{file.noOfFiles} files</div>
// //                   <div className="text-gray-600">
// //                     {new Date(file.date).toLocaleDateString()}
// //                   </div>
// //                   <div>
// //                     <span className="px-3 py-1 rounded-full text-sm font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
// //                       {file.status}
// //                     </span>
// //                   </div>
// //                   <div className="flex items-center gap-2">
// //                     <a
// //                       href={file.previewUrl}
// //                       target="_blank"
// //                       rel="noopener noreferrer"
// //                       className="p-2 hover:bg-gray-100 rounded-lg transition-all group"
// //                     >
// //                       <Eye className="w-4 h-4 text-gray-600 group-hover:scale-110 transition-transform" />
// //                     </a>
// //                     <a
// //                       href={file.downloadUrl}
// //                       target="_blank"
// //                       rel="noopener noreferrer"
// //                       className="p-2 hover:bg-gray-100 rounded-lg transition-all group"
// //                     >
// //                       <ExternalLink className="w-4 h-4 text-gray-600 group-hover:scale-110 transition-transform" />
// //                     </a>
// //                   </div>
// //                   <div className="flex items-center justify-end">
// //                     <button className="p-2 hover:bg-gray-100 rounded-lg transition-all">
// //                       <Share2 className="w-4 h-4 text-gray-600" />
// //                     </button>
// //                   </div>
// //                 </div>
// //               </div>
// //             ))}
// //           </div>
// //         </div>
// //       </div>

// //       {/* Floating Action Button */}
// //       <button
// //         onClick={() => setIsFormOpen(true)}
// //         className="fixed bottom-8 right-8 w-14 h-14 bg-black text-white rounded-full shadow-lg hover:shadow-xl transition-all flex items-center justify-center group"
// //       >
// //         <Plus className="w-6 h-6 group-hover:rotate-90 transition-transform duration-200" />
// //       </button>

// //       {/* Modal Form */}
// //       {isFormOpen && (
// //         <>
// //           <div 
// //             className="fixed inset-0 bg-black/20 backdrop-blur-sm transition-opacity"
// //             onClick={() => setIsFormOpen(false)}
// //           />
// //           <div className="fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl shadow-2xl transform transition-transform duration-300 ease-out animate-slide-up">
// //             <div className="max-w-2xl mx-auto p-8">
// //               <div className="flex items-center justify-between mb-6">
// //                 <h2 className="text-xl font-semibold text-gray-900">Add New Files</h2>
// //                 <button 
// //                   onClick={() => setIsFormOpen(false)}
// //                   className="p-2 hover:bg-gray-100 rounded-full transition-colors"
// //                 >
// //                   <X className="w-5 h-5 text-gray-500" />
// //                 </button>
// //               </div>
              
// //               <form className="space-y-6">
// //                 <div className="space-y-4">
// //                   <div className="border-2 border-dashed border-gray-200 rounded-xl p-8 text-center hover:border-gray-300 transition-colors">
// //                     <div className="mx-auto w-12 h-12 bg-gray-50 rounded-lg flex items-center justify-center mb-4">
// //                       <Upload className="w-6 h-6 text-gray-400" />
// //                     </div>
// //                     <p className="text-sm text-gray-500">
// //                       Drag and drop your files here, or{' '}
// //                       <span className="text-blue-500 hover:text-blue-600 cursor-pointer">browse</span>
// //                     </p>
// //                     <p className="text-xs text-gray-400 mt-2">
// //                       Multiple files allowed
// //                     </p>
// //                   </div>

// //                   <div>
// //                     <label className="block text-sm font-medium text-gray-700 mb-2">
// //                       Cost
// //                     </label>
// //                     <input
// //                       type="number"
// //                       className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all"
// //                       placeholder="Enter cost..."
// //                     />
// //                   </div>

// //                   <div>
// //                     <label className="block text-sm font-medium text-gray-700 mb-2">
// //                       Message
// //                     </label>
// //                     <textarea
// //                       className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all"
// //                       rows={4}
// //                       placeholder="Enter message..."
// //                     />
// //                   </div>
// //                 </div>

// //                 <div className="flex items-center justify-end gap-3">
// //                   <button
// //                     type="button"
// //                     onClick={() => setIsFormOpen(false)}
// //                     className="px-4 py-2 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors"
// //                   >
// //                     Cancel
// //                   </button>
// //                   <button
// //                     type="submit"
// //                     className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
// //                   >
// //                     Upload Files
// //                   </button>
// //                 </div>
// //               </form>
// //             </div>
// //           </div>
// //         </>
// //       )}
// //     </div>
// //   );
// // };

// // export default ProjectDetailsPage;
// import React, { useState } from 'react';
// import { Plus, X, Upload, Share2, Eye, ExternalLink } from 'lucide-react';

// const ProjectDetailsPage = () => {
//   const [isFormOpen, setIsFormOpen] = useState(false);
  
//   const project = {
//     name: "E-commerce Website",
//     paymentMode: "Fixed Price",
//     totalAmount: 5000,
//     amountLeft: 2000,
//     client: "TechCorp Inc.",
//     dueDate: "2024-12-31",
//     files: [
//       {
//         instance: "Instance #1249",
//         date: "2024-12-15",
//         status: "Completed",
//         noOfFiles: 3,
//         previewUrl: "#",
//         downloadUrl: "#"
//       }
//     ]
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8 relative">
//       {/* Header Card */}
//       <div className="max-w-7xl mx-auto mb-6">
//         <div className="bg-white rounded-2xl shadow-xl border border-gray-200/50 backdrop-blur-sm p-6">
//           <div className="flex items-center justify-between gap-8">
//             {/* Project Info */}
//             <div className="flex items-center gap-4 min-w-[280px]">
//               <div className="w-12 h-12 bg-black rounded-xl flex items-center justify-center shadow-lg">
//                 <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
//                 </svg>
//               </div>
//               <div>
//                 <h1 className="text-xl font-semibold text-gray-900">{project.name}</h1>
//                 <div className="flex items-center gap-2 mt-1">
//                   <span className="text-sm text-gray-500">{project.client}</span>
//                   <span className="bg-blue-50 px-2 py-0.5 rounded-md text-xs font-medium text-blue-600 border border-blue-100">
//                     {project.paymentMode}
//                   </span>
//                 </div>
//               </div>
//             </div>

//             {/* Payment Progress */}
//             <div className=" text-right ">
//               {/* <div className="flex-1 bg-gray-100 h-3 rounded-full overflow-hidden">
//                 {/* <div 
//                   className="h-full bg-black rounded-full transition-all duration-500"
//                   style={{ width: `${((project.totalAmount - project.amountLeft) / project.totalAmount) * 100}%` }}
//                 /> 
//               </div> */}
            
//                 <p className="text-lg font-semibold text-gray-900">${project.amountLeft.toLocaleString()}</p>
//                 <p className="text-xs text-gray-500">remaining of ${project.totalAmount.toLocaleString()}</p>
              
//             </div>

//             {/* Due Date */}
//             <div className="bg-emerald-50 px-4 py-2 rounded-xl border border-emerald-100">
//               <p className="text-xs text-emerald-600 font-medium">Due Date</p>
//               <p className="text-sm font-semibold text-emerald-700">
//                 {new Date(project.dueDate).toLocaleDateString()}
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Files Section */}
//       <div className="max-w-7xl mx-auto">
//         <div className="bg-white rounded-2xl shadow-xl border border-gray-200/50 backdrop-blur-sm overflow-hidden">
//           {/* Table Headers */}
//           <div className="px-8 py-4 border-b border-gray-200 bg-gray-50">
//             <div className="grid grid-cols-6 gap-4">
//               <div className="text-sm font-medium text-gray-500">Instance</div>
//               <div className="text-sm font-medium text-gray-500">Files</div>
//               <div className="text-sm font-medium text-gray-500">Date</div>
//               <div className="text-sm font-medium text-gray-500">Status</div>
//               <div className="text-sm font-medium text-gray-500">Preview</div>
//               <div className="text-sm font-medium text-gray-500 text-right">Actions</div>
//             </div>
//           </div>

//           {/* Files List */}
//           <div className="divide-y divide-gray-200">
//             {project.files.map((file, index) => (
//               <div key={index} className="px-8 py-4 hover:bg-gray-50/50 transition-all">
//                 <div className="grid grid-cols-6 gap-4 items-center">
//                   <div className="font-medium text-gray-900">{file.instance}</div>
//                   <div className="text-gray-600">{file.noOfFiles} files</div>
//                   <div className="text-gray-600">
//                     {new Date(file.date).toLocaleDateString()}
//                   </div>
//                   <div>
//                     <span className="px-3 py-1 rounded-full text-sm font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
//                       {file.status}
//                     </span>
//                   </div>
//                   <div className="flex items-center gap-2">
//                     <a
//                       href={file.previewUrl}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className="p-2 hover:bg-gray-100 rounded-lg transition-all group"
//                     >
//                       <Eye className="w-4 h-4 text-gray-600 group-hover:scale-110 transition-transform" />
//                     </a>
//                     <a
//                       href={file.downloadUrl}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className="p-2 hover:bg-gray-100 rounded-lg transition-all group"
//                     >
//                       <ExternalLink className="w-4 h-4 text-gray-600 group-hover:scale-110 transition-transform" />
//                     </a>
//                   </div>
//                   <div className="flex items-center justify-end">
//                     <button className="p-2 hover:bg-gray-100 rounded-lg transition-all">
//                       <Share2 className="w-4 h-4 text-gray-600" />
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Floating Action Button */}
//       <button
//         onClick={() => setIsFormOpen(true)}
//         className="fixed bottom-8 right-8 w-14 h-14 bg-black text-white rounded-full shadow-lg hover:shadow-xl transition-all flex items-center justify-center group"
//       >
//         <Plus className="w-6 h-6 group-hover:rotate-90 transition-transform duration-200" />
//       </button>

//       {/* Modal Form */}
//       {isFormOpen && (
//         <>
//           <div 
//             className="fixed inset-0 bg-black/20 backdrop-blur-sm transition-opacity"
//             onClick={() => setIsFormOpen(false)}
//           />
//           <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 bg-white rounded-2xl shadow-2xl transform transition-all duration-300 ease-out animate-slide-up">
//             <div className="p-6">
//               <div className="flex items-center justify-between mb-6">
//                 <h2 className="text-xl font-semibold text-gray-900">Add Files</h2>
//                 <button 
//                   onClick={() => setIsFormOpen(false)}
//                   className="p-2 hover:bg-gray-100 rounded-full transition-colors"
//                 >
//                   <X className="w-5 h-5 text-gray-500" />
//                 </button>
//               </div>
              
//               <form className="space-y-5">
//                 <div className="border-2 border-dashed border-gray-200 rounded-xl p-6 text-center hover:border-gray-300 transition-colors">
//                   <div className="mx-auto w-12 h-12 bg-gray-50 rounded-lg flex items-center justify-center mb-3">
//                     <Upload className="w-6 h-6 text-gray-400" />
//                   </div>
//                   <p className="text-sm text-gray-500">
//                     Drop files here or{' '}
//                     <span className="text-blue-500 hover:text-blue-600 cursor-pointer">browse</span>
//                   </p>
//                   <p className="text-xs text-gray-400 mt-1">
//                     Multiple files allowed
//                   </p>
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Cost
//                   </label>
//                   <input
//                     type="number"
//                     className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all"
//                     placeholder="Enter cost..."
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Message
//                   </label>
//                   <textarea
//                     className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all"
//                     rows={3}
//                     placeholder="Enter message..."
//                   />
//                 </div>

//                 <div className="pt-2">
//                   <button
//                     type="submit"
//                     className="w-full px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
//                   >
//                     Upload Files
//                   </button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default ProjectDetailsPage;

import React, { useState } from 'react';
import { Plus, X, Upload, Share2, Eye, ExternalLink } from 'lucide-react';

const ProjectDetailsPage = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  
  const project = {
    name: "E-commerce Website",
    paymentMode: "Fixed Price",
    totalAmount: 5000,
    amountLeft: 2000,
    client: "TechCorp Inc.",
    dueDate: "2024-12-31",
    files: [
      {
        instance: "Instance #1249",
        date: "2024-12-15",
        status: "Completed",
        noOfFiles: 3,
        previewUrl: "#",
        downloadUrl: "#"
      }
    ]
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8 relative">
      {/* Header Card */}
      <div className="max-w-7xl mx-auto mb-6">
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200/50 backdrop-blur-sm p-6">
          <div className="flex items-center justify-between">
            {/* Project Info */}
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-black rounded-xl flex items-center justify-center shadow-lg">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">{project.name}</h1>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-sm text-gray-500">{project.client}</span>
                  <span className="bg-blue-50 px-2 py-0.5 rounded-md text-xs font-medium text-blue-600 border border-blue-100">
                    {project.paymentMode}
                  </span>
                </div>
              </div>
            </div>

            {/* Right Side Info */}
            <div className="flex items-center gap-8">
              {/* Amount */}
              <div className="text-right">
                <p className="text-sm text-gray-500">Amount</p>
                <div className="flex items-baseline gap-2">
                  <p className="text-lg font-semibold text-gray-900">${project.amountLeft.toLocaleString()}</p>
                  <p className="text-sm text-gray-500">/ ${project.totalAmount.toLocaleString()}</p>
                </div>
              </div>

              {/* Due Date */}
              <div className="bg-emerald-50 px-4 py-2 rounded-xl border border-emerald-100">
                <p className="text-xs text-emerald-600 font-medium">Due Date</p>
                <p className="text-sm font-semibold text-emerald-700">
                  {new Date(project.dueDate).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Files Section */}
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200/50 backdrop-blur-sm overflow-hidden">
          {/* Table Headers */}
          <div className="px-8 py-4 border-b border-gray-200 bg-gray-50">
            <div className="grid grid-cols-6 gap-4">
              <div className="text-sm font-medium text-gray-500">Instance</div>
              <div className="text-sm font-medium text-gray-500">Files</div>
              <div className="text-sm font-medium text-gray-500">Date</div>
              <div className="text-sm font-medium text-gray-500">Status</div>
              <div className="text-sm font-medium text-gray-500">Preview</div>
              <div className="text-sm font-medium text-gray-500 text-right">Actions</div>
            </div>
          </div>

          {/* Files List */}
          <div className="divide-y divide-gray-200">
            {project.files.map((file, index) => (
              <div key={index} className="px-8 py-4 hover:bg-gray-50/50 transition-all">
                <div className="grid grid-cols-6 gap-4 items-center">
                  <div className="font-medium text-gray-900">{file.instance}</div>
                  <div className="text-gray-600">{file.noOfFiles} files</div>
                  <div className="text-gray-600">
                    {new Date(file.date).toLocaleDateString()}
                  </div>
                  <div>
                    <span className="px-3 py-1 rounded-full text-sm font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
                      {file.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <a
                      href={file.previewUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 hover:bg-gray-100 rounded-lg transition-all group"
                    >
                      <Eye className="w-4 h-4 text-gray-600 group-hover:scale-110 transition-transform" />
                    </a>
                    <a
                      href={file.downloadUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 hover:bg-gray-100 rounded-lg transition-all group"
                    >
                      <ExternalLink className="w-4 h-4 text-gray-600 group-hover:scale-110 transition-transform" />
                    </a>
                  </div>
                  <div className="flex items-center justify-end">
                    <button className="p-2 hover:bg-gray-100 rounded-lg transition-all">
                      <Share2 className="w-4 h-4 text-gray-600" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Floating Action Button */}
      <button
        onClick={() => setIsFormOpen(true)}
        className="fixed bottom-8 right-8 w-14 h-14 bg-black text-white rounded-full shadow-lg hover:shadow-xl transition-all flex items-center justify-center group"
      >
        <Plus className="w-6 h-6 group-hover:rotate-90 transition-transform duration-200" />
      </button>

      {/* Modal Form */}
      {isFormOpen && (
        <>
          <div 
            className="fixed bottom-0 right-0 mb-24 mr-8 w-96 bg-white rounded-2xl shadow-2xl transform transition-all duration-500 ease-out animate-slide-in"
            style={{
              animation: 'slide-in 0.3s ease-out forwards',
              '@keyframes slide-in': {
                from: {
                  opacity: 0,
                  transform: 'translateX(100%)'
                },
                to: {
                  opacity: 1,
                  transform: 'translateX(0)'
                }
              }
            }}
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Add Files</h2>
                <button 
                  onClick={() => setIsFormOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>
              
              <form className="space-y-5">
                <div className="border-2 border-dashed border-gray-200 rounded-xl p-6 text-center hover:border-gray-300 transition-colors">
                  <div className="mx-auto w-12 h-12 bg-gray-50 rounded-lg flex items-center justify-center mb-3">
                    <Upload className="w-6 h-6 text-gray-400" />
                  </div>
                  <p className="text-sm text-gray-500">
                    Drop files here or{' '}
                    <span className="text-blue-500 hover:text-blue-600 cursor-pointer">browse</span>
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    Multiple files allowed
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Cost
                  </label>
                  <input
                    type="number"
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all"
                    placeholder="Enter cost..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Message
                  </label>
                  <textarea
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all"
                    rows={3}
                    placeholder="Enter message..."
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
                  >
                    Upload Files
                  </button>
                </div>
              </form>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ProjectDetailsPage;