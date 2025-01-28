
// "use client"

// import React, { useState, useEffect } from 'react';
// import { Plus, X, Upload, Share2, Eye, ExternalLink } from 'lucide-react';
// import { useParams } from 'next/navigation';

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

// const ProjectDetailsPage = () => {
//   const [isFormOpen, setIsFormOpen] = useState(false);
//   const [project, setProject] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [isSubmitting, setIsSubmitting] = useState(false);
  
//   const params = useParams();
//   const projectId = params.id;

//   const [formData, setFormData] = useState({
//     desc: '',
//     cost: '',
//     files: []
//   });

//   useEffect(() => {
//     const fetchProjectDetails = async () => {
//       try {
//         const response = await fetch(`/api/get-project-details`, {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify({ projectId })
//         });
        
//         const data = await response.json();
//         if (!response.ok) throw new Error(data.error || 'Failed to fetch project');
//         setProject(data);
//       } catch (error) {
//         console.error('Error:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (projectId) fetchProjectDetails();
//   }, [projectId]);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const handleFileChange = (e) => {
//     const selectedFiles = Array.from(e.target.files);
//     setFormData(prev => ({
//       ...prev,
//       files: [...prev.files, ...selectedFiles]
//     }));
//   };

//   const removeFile = (index) => {
//     setFormData(prev => ({
//       ...prev,
//       files: prev.files.filter((_, i) => i !== index)
//     }));
//   };

//   const handleDrop = (e) => {
//     e.preventDefault();
//     const droppedFiles = Array.from(e.dataTransfer.files);
//     setFormData(prev => ({
//       ...prev,
//       files: [...prev.files, ...droppedFiles]
//     }));
//   };

 
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!formData.cost || formData.files.length === 0) {
//       alert('Please enter cost and upload at least one file');
//       return;
//     }
  
//     setIsSubmitting(true);
//     try {
//       const formDataToSend = new FormData();
//       formDataToSend.append('projectId', projectId);
//       formDataToSend.append('desc', formData.desc || '');
//       formDataToSend.append('cost', formData.cost.toString());
      
//       formData.files.forEach(file => {
//         formDataToSend.append('files', file);
//       });
  
//       const { success } = await fetch('/api/add-an-instance', {
//         method: 'POST', 
//         body: formDataToSend
//       }).then(res => res.json());
  
//       if (success) {
//         alert('Instance created successfully!');
//       }
//     } catch (error) {
//       console.error('Error:', error);
//       alert('Failed to create instance. Please try again.');
//     } finally {
//       setIsSubmitting(false);
//     }
//   };
//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8 flex items-center justify-center">
//         Loading...
//       </div>
//     );
//   }

//   if (!project) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8 flex items-center justify-center">
//         Project not found
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8 relative">
//       {/* Header Card */}
//       <div className="max-w-7xl mx-auto mb-6">
//         <div className="bg-white rounded-2xl shadow-xl border border-gray-200/50 backdrop-blur-sm p-6">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center gap-4">
//               <div className="w-12 h-12 bg-black rounded-xl flex items-center justify-center shadow-lg">
//                 <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
//                 </svg>
//               </div>
//               <div>
//                 <h1 className="text-xl font-semibold text-gray-900">{project.name}</h1>
//                 <div className="flex items-center gap-2 mt-1">
//                   <span className="bg-blue-50 px-2 py-0.5 rounded-md text-xs font-medium text-blue-600 border border-blue-100">
//                     {project.paymentMode}
//                   </span>
//                   <span className="bg-gray-50 px-2 py-0.5 rounded-md text-xs font-medium text-gray-600 border border-gray-100">
//                     {project.status}
//                   </span>
//                 </div>
//               </div>
//             </div>

//             <div className="flex items-center gap-8">
//               <div className="text-right">
//                 <p className="text-sm text-gray-500">Amount (Active/Total)</p>
//                 <div className="flex items-baseline gap-2">
//                   <p className="text-lg font-semibold text-emerald-600">
//                   ₹{project.totalAmount.toLocaleString()}
//                   </p>
//                   <p className="text-sm text-gray-500">
//                     / ₹{project.files.reduce((sum, file) => sum + file.cost, 0).toLocaleString()}
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Files Section */}
//       <div className="max-w-7xl mx-auto">
//         <div className="bg-white rounded-2xl shadow-xl border border-gray-200/50 backdrop-blur-sm overflow-hidden">
//           <div className="px-8 py-4 border-b border-gray-200 bg-gray-50">
//             <div className="grid grid-cols-7 gap-4">
//               <div className="text-sm font-medium text-gray-500">Instance</div>
//               <div className="text-sm font-medium text-gray-500">Files</div>
//               <div className="text-sm font-medium text-gray-500">Date</div>
//               <div className="text-sm font-medium text-gray-500">Status</div>
//               <div className="text-sm font-medium text-gray-500">Cost</div>
//               <div className="text-sm font-medium text-gray-500">Preview</div>
//               <div className="text-sm font-medium text-gray-500 text-right">Actions</div>
//             </div>
//           </div>

//           <div className="divide-y divide-gray-200">
//             {project.files.map((file, index) => (
//               <div key={index} className="px-8 py-4 hover:bg-gray-50/50 transition-all">
//                 <div className="grid grid-cols-7 gap-4 items-center">
//                   <div className="font-medium text-gray-900">{file.instance}</div>
//                   <div className="text-gray-600">{file.noOfFiles} files</div>
//                   <div className="text-gray-600">
//                     {new Date(file.date).toLocaleDateString()}
//                   </div>
//                   <div>
//                     <span className={`px-3 py-1 rounded-full text-sm font-medium ${
//                       file.PaymentStatus === 'Not Paid' 
//                         ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
//                         : 'bg-gray-50 text-gray-700 border border-gray-200'
//                     }`}>
//                       {file.status}
//                     </span>
//                   </div>
//                   <div className="text-gray-900 font-medium">
//                   ₹{file.cost.toLocaleString()}
//                   </div>
//                   <div className="flex items-center gap-2">
//                     {file.files.map((fileItem, fileIndex) => (
//                       <a
//                         key={fileIndex}
//                         href={fileItem.previewUrl}
//                         target="_blank"
//                         rel="noopener noreferrer"
//                         className="p-2 hover:bg-gray-100 rounded-lg transition-all group"
//                       >
//                         <Eye className="w-4 h-4 text-gray-600 group-hover:scale-110 transition-transform" />
//                       </a>
//                     ))}
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

//       {/* Modal Form */}
//     {/* Modal Form */}
//     {isFormOpen && (
//         <div className="fixed bottom-0 right-0 mb-24 mr-8 w-96 bg-white rounded-2xl shadow-2xl transform transition-all duration-500 ease-out animate-slide-in">
//           <div className="p-6">
//             <div className="flex items-center justify-between mb-6">
//               <h2 className="text-xl font-semibold text-gray-900">Add New Instance</h2>
//               <button 
//                 onClick={() => setIsFormOpen(false)}
//                 className="p-2 hover:bg-gray-100 rounded-full transition-colors"
//               >
//                 <X className="w-5 h-5 text-gray-500" />
//               </button>
//             </div>
            
//             <form onSubmit={handleSubmit} className="space-y-5">
//               {/* File Upload Area */}
//               <div 
//                 className="border-2 border-dashed border-gray-200 rounded-xl p-6 text-center hover:border-gray-300 transition-colors"
//                 onDrop={handleDrop}
//                 onDragOver={(e) => e.preventDefault()}
//               >
//                 <input
//                   type="file"
//                   multiple
//                   onChange={handleFileChange}
//                   className="hidden"
//                   id="file-upload"
//                 />
//                 <label htmlFor="file-upload" className="cursor-pointer">
//                   <div className="mx-auto w-12 h-12 bg-gray-50 rounded-lg flex items-center justify-center mb-3">
//                     <Upload className="w-6 h-6 text-gray-400" />
//                   </div>
//                   <p className="text-sm text-gray-500">
//                     Drop files here or click to upload
//                   </p>
//                   <p className="text-xs text-gray-400 mt-1">
//                     Multiple files allowed
//                   </p>
//                 </label>
//               </div>

//               {/* File Preview List */}
//               {formData.files.length > 0 && (
//                 <div className="max-h-40 overflow-y-auto space-y-2">
//                   {formData.files.map((file, index) => (
//                     <FilePreview
//                       key={index}
//                       file={file}
//                       onRemove={() => removeFile(index)}
//                     />
//                   ))}
//                 </div>
//               )}

//               {/* Cost Input */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Cost
//                 </label>
//                 <input
//                   type="number"
//                   name="cost"
//                   value={formData.cost}
//                   onChange={handleInputChange}
//                   className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none 
//                          focus:ring-2 focus:ring-blue-100 transition-colors"
//                   placeholder="Enter cost..."
//                   required
//                 />
//               </div>

//               {/* Description Input */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Description (Optional)
//                 </label>
//                 <textarea
//                   name="desc"
//                   value={formData.desc}
//                   onChange={handleInputChange}
//                   className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none 
//                          focus:ring-2 focus:ring-blue-100 transition-colors"
//                   rows={3}
//                   placeholder="Enter description..."
//                 />
//               </div>

//               <button
//                 type="submit"
//                 disabled={isSubmitting}
//                 className="w-full px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 
//                        transition-colors disabled:bg-gray-400"
//               >
//                 {isSubmitting ? 'Adding Instance...' : 'Add Instance'}
//               </button>
//             </form>
//           </div>
//         </div>
//       )}

//       {/* Floating Action Button */}
//       <button
//         onClick={() => setIsFormOpen(true)}
//         className="fixed bottom-8 right-8 w-14 h-14 bg-black text-white rounded-full shadow-lg 
//                  hover:shadow-xl transition-all flex items-center justify-center group"
//       >
//         <Plus className="w-6 h-6 group-hover:rotate-90 transition-transform duration-200" />
//       </button>
//     </div>
//   );
// };

// export default ProjectDetailsPage;

"use client"

import React, { useState, useEffect } from 'react';
import { Plus, X, Upload, Share2, Eye, ExternalLink } from 'lucide-react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/context/authContext';


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

const ProjectDetailsPage = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const params = useParams();
  const projectId = params.id;
  // const freelancerId =localStorage.getItem('freelancerId');
  
  const { freelancerId, email, isAuthenticated, isLoading, logout } = useAuth();
  

  const [formData, setFormData] = useState({
    desc: '',
    cost: '',
    files: []
  });

  useEffect(() => {
    const fetchProjectDetails = async () => {
      try {
        const response = await fetch(`/api/get-project-details`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ projectId })
        });
        
        const data = await response.json();
        if (!response.ok) throw new Error(data.error || 'Failed to fetch project');
        setProject(data);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    if (projectId) fetchProjectDetails();
  }, [projectId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFormData(prev => ({
      ...prev,
      files: [...prev.files, ...selectedFiles]
    }));
  };

  const removeFile = (index) => {
    setFormData(prev => ({
      ...prev,
      files: prev.files.filter((_, i) => i !== index)
    }));
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFiles = Array.from(e.dataTransfer.files);
    setFormData(prev => ({
      ...prev,
      files: [...prev.files, ...droppedFiles]
    }));
  };

  const calculatePaidAmount = (files) => {
    return files
      .filter(file => file.PaymentStatus === 'Paid')
      .reduce((sum, file) => sum + file.cost, 0);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.cost || formData.files.length === 0) {
      alert('Please enter cost and upload at least one file');
      return;
    }
  
    setIsSubmitting(true);
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('projectId', projectId);
      formDataToSend.append('desc', formData.desc || '');
      formDataToSend.append('cost', formData.cost.toString());
      
      formData.files.forEach(file => {
        formDataToSend.append('files', file);
      });
  
      const { success } = await fetch('/api/add-an-instance', {
        method: 'POST', 
        body: formDataToSend
      }).then(res => res.json());
  
      if (success) {
        alert('Instance created successfully!');
        setIsFormOpen(false);
        // Optionally refresh the page or update the project data
        window.location.reload();
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to create instance. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8 flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8 flex items-center justify-center">
        Project not found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-8 relative">
      {/* Header Card */}
      <div className="max-w-7xl mx-auto mb-6">
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200/50 backdrop-blur-sm p-4 md:p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-black rounded-xl flex items-center justify-center shadow-lg">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">{project.name}</h1>
                <div className="flex items-center gap-2 mt-1 flex-wrap">
                  <span className="bg-blue-50 px-2 py-0.5 rounded-md text-xs font-medium text-blue-600 border border-blue-100">
                    {project.paymentMode}
                  </span>
                  <span className="bg-gray-50 px-2 py-0.5 rounded-md text-xs font-medium text-gray-600 border border-gray-100">
                    {project.status}
                  </span>
                  <Link 
                    href={`${projectId}/preview`}
                    className="bg-black text-white px-2 py-0.5 rounded-md text-xs font-medium hover:bg-gray-800 transition-colors"
                  >
                    Open Preview
                  </Link>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4 md:gap-8">
              <div className="text-left md:text-right">
                <p className="text-sm text-gray-500">Amount (Paid/Total)</p>
                <div className="flex items-baseline gap-2">
                  <p className="text-lg font-semibold text-emerald-600">
                    ₹{project.totalAmount}
                  </p>
                  <p className="text-sm text-gray-500">
                    / ₹{project.files.reduce((sum, file) => sum + file.cost, 0).toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Files Section */}
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200/50 backdrop-blur-sm overflow-hidden">
          {/* Mobile View */}
          <div className="block md:hidden">
            {project.files.map((file, index) => (
              <div key={index} className="p-4 border-b border-gray-200 last:border-b-0">
                <div className="flex items-center justify-between mb-2">
                  <div className="font-medium text-gray-900">{file.instance}</div>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    file.PaymentStatus === 'Not Paid' 
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      : 'bg-gray-50 text-gray-700 border border-gray-200'
                  }`}>
                    {file.status}
                  </span>
                </div>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Files:</span>
                    <span>{file.noOfFiles} files</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Date:</span>
                    <span>{new Date(file.date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Cost:</span>
                    <span className="font-medium">₹{file.cost.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-end mt-2">
                    <Link 
                      href={`/freelancer/${freelancerId}/projects/${projectId}/preview`}
                      className="text-sm text-gray-600 hover:text-gray-900 transition-colors flex items-center gap-1"
                    >
                      <Eye className="w-4 h-4" />
                      Preview
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop View */}
          <div className="hidden md:block">
            <div className="px-8 py-4 border-b border-gray-200 bg-gray-50">
              <div className="grid grid-cols-6 gap-4">
                <div className="text-sm font-medium text-gray-500">Instance</div>
                <div className="text-sm font-medium text-gray-500">Files</div>
                <div className="text-sm font-medium text-gray-500">Date</div>
                <div className="text-sm font-medium text-gray-500">Status</div>
                <div className="text-sm font-medium text-gray-500">Cost</div>
                <div className="text-sm font-medium text-gray-500 text-right">Actions</div>
              </div>
            </div>

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
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        file.PaymentStatus === 'Not Paid' 
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : 'bg-gray-50 text-gray-700 border border-gray-200'
                      }`}>
                        {file.status}
                      </span>
                    </div>
                    <div className="text-gray-900 font-medium">
                      ₹{file.cost.toLocaleString()}
                    </div>
                    <div className="flex items-center justify-end">
                      {/* <Link 
                        href={`/preview/${projectId}`}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-all group"
                      >
                        <Eye className="w-4 h-4 text-gray-600 group-hover:text-gray-900" />
                      </Link> */}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Modal Form */}
      {isFormOpen && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 md:flex md:items-center md:justify-center">
          <div className="fixed bottom-0 right-0 left-0 md:relative md:min-w-[24rem] bg-white rounded-t-2xl md:rounded-2xl shadow-2xl transform transition-all duration-500 ease-out animate-slide-in">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Add New Instance</h2>
                <button 
                  onClick={() => setIsFormOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* File Upload Area */}
                <div 
                  className="border-2 border-dashed border-gray-200 rounded-xl p-6 text-center hover:border-gray-300 transition-colors"
                  onDrop={handleDrop}
                  onDragOver={(e) => e.preventDefault()}
                >
                  <input
                    type="file"
                    multiple
                    onChange={handleFileChange}
                    className="hidden"
                    id="file-upload"
                  />
                  <label htmlFor="file-upload" className="cursor-pointer">
                    <div className="mx-auto w-12 h-12 bg-gray-50 rounded-lg flex items-center justify-center mb-3">
                    <Upload className="w-6 h-6 text-gray-400" />
                    </div>
                    <p className="text-sm text-gray-500">
                      Drop files here or click to upload
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      Multiple files allowed
                    </p>
                  </label>
                </div>

                {/* File Preview List */}
                {formData.files.length > 0 && (
                  <div className="max-h-40 overflow-y-auto space-y-2">
                    {formData.files.map((file, index) => (
                      <FilePreview
                        key={index}
                        file={file}
                        onRemove={() => removeFile(index)}
                      />
                    ))}
                  </div>
                )}

                {/* Cost Input */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Cost
                  </label>
                  <input
                    type="number"
                    name="cost"
                    value={formData.cost}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none 
                           focus:ring-2 focus:ring-blue-100 transition-colors"
                    placeholder="Enter cost..."
                    required
                  />
                </div>

                {/* Description Input */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description (Optional)
                  </label>
                  <textarea
                    name="desc"
                    value={formData.desc}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none 
                           focus:ring-2 focus:ring-blue-100 transition-colors"
                    rows={3}
                    placeholder="Enter description..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 
                         transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Adding Instance...' : 'Add Instance'}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Floating Action Button */}
      <button
        onClick={() => setIsFormOpen(true)}
        className="fixed bottom-4 right-4 md:bottom-8 md:right-8 w-14 h-14 bg-black text-white rounded-full shadow-lg 
                 hover:shadow-xl transition-all flex items-center justify-center group z-50"
      >
        <Plus className="w-6 h-6 group-hover:rotate-90 transition-transform duration-200" />
      </button>
    </div>
  );
};

// CSS Animation for Modal
const style = {
  '@keyframes slideIn': {
    from: {
      transform: 'translateY(100%)',
    },
    to: {
      transform: 'translateY(0)',
    },
  },
  '.animate-slide-in': {
    animation: 'slideIn 0.3s ease-out',
  },
};

export default ProjectDetailsPage;