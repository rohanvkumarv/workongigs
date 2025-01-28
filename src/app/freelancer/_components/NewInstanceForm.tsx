// // // // "use client"
// // // // // NewInstanceForm.jsx
// // // // import React, { useState } from 'react';
// // // // import { Upload, X } from 'lucide-react';

// // // // const CHUNK_SIZE = 5 * 1024 * 1024; // 5MB chunks

// // // // const FilePreview = ({ file, onRemove, progress }) => (
// // // //   <div className="flex items-center justify-between p-3 bg-white rounded-lg shadow-sm border border-gray-100">
// // // //     <div className="flex items-center gap-3">
// // // //       <div className="w-8 h-8 rounded-lg bg-black/5 flex items-center justify-center">
// // // //         <Upload className="w-4 h-4 text-gray-600" />
// // // //       </div>
// // // //       <div className="flex-1 min-w-0">
// // // //         <p className="text-sm font-medium text-gray-900 truncate">{file.name}</p>
// // // //         <p className="text-xs text-gray-500">{(file.size / 1024).toFixed(1)} KB</p>
// // // //         {progress !== undefined && (
// // // //           <div className="w-full bg-gray-200 rounded-full h-1.5 mt-2">
// // // //             <div
// // // //               className="bg-blue-600 h-1.5 rounded-full transition-all duration-300"
// // // //               style={{ width: `${progress}%` }}
// // // //             />
// // // //           </div>
// // // //         )}
// // // //       </div>
// // // //     </div>
// // // //     <button
// // // //       onClick={onRemove}
// // // //       className="p-1 hover:bg-gray-100 rounded-full transition-colors"
// // // //     >
// // // //       <X className="w-4 h-4 text-gray-500" />
// // // //     </button>
// // // //   </div>
// // // // );

// // // // const NewInstanceForm = ({ projectId, onClose }) => {
// // // //   const [isSubmitting, setIsSubmitting] = useState(false);
// // // //   const [uploadProgress, setUploadProgress] = useState({});
// // // //   const [uploadedFiles, setUploadedFiles] = useState([]);
  
// // // //   const [formData, setFormData] = useState({
// // // //     desc: '',
// // // //     cost: '',
// // // //     files: []
// // // //   });

// // // //   const createChunks = (file) => {
// // // //     const chunks = [];
// // // //     let size = file.size;
// // // //     let offset = 0;
    
// // // //     while (offset < size) {
// // // //       const chunk = file.slice(offset, offset + CHUNK_SIZE);
// // // //       chunks.push(chunk);
// // // //       offset += CHUNK_SIZE;
// // // //     }
    
// // // //     return chunks;
// // // //   };

// // // //   const uploadFile = async (file) => {
// // // //     try {
// // // //       // Initialize progress
// // // //       setUploadProgress(prev => ({
// // // //         ...prev,
// // // //         [file.name]: 0
// // // //       }));

// // // //       // Step 1: Initiate upload
// // // //       const initFormData = new FormData();
// // // //       initFormData.append("fileName", file.name);
// // // //       initFormData.append("fileType", file.type);

// // // //       const initResponse = await fetch("/api/upload", {
// // // //         method: "POST",
// // // //         body: initFormData,
// // // //       });

// // // //       if (!initResponse.ok) {
// // // //         throw new Error('Failed to initiate upload');
// // // //       }

// // // //       const { uploadId, key } = await initResponse.json();

// // // //       // Step 2: Upload chunks
// // // //       const chunks = createChunks(file);
// // // //       const parts = [];

// // // //       for (let i = 0; i < chunks.length; i++) {
// // // //         const chunk = chunks[i];
// // // //         const chunkNumber = i + 1;

// // // //         const chunkFormData = new FormData();
// // // //         chunkFormData.append("file", new Blob([chunk]));
// // // //         chunkFormData.append("chunkNumber", chunkNumber.toString());
// // // //         chunkFormData.append("uploadId", uploadId);
// // // //         chunkFormData.append("key", key);

// // // //         const chunkResponse = await fetch("/api/upload-part", {
// // // //           method: "POST",
// // // //           body: chunkFormData,
// // // //         });

// // // //         if (!chunkResponse.ok) {
// // // //           throw new Error(`Failed to upload chunk ${chunkNumber}`);
// // // //         }

// // // //         const { ETag } = await chunkResponse.json();
// // // //         parts.push({ PartNumber: chunkNumber, ETag });

// // // //         // Update progress
// // // //         const progress = Math.round(((i + 1) / chunks.length) * 100);
// // // //         setUploadProgress(prev => ({
// // // //           ...prev,
// // // //           [file.name]: progress
// // // //         }));
// // // //       }

// // // //       // Step 3: Complete upload
// // // //       const completeResponse = await fetch("/api/complete-upload", {
// // // //         method: "POST",
// // // //         headers: {
// // // //           "Content-Type": "application/json",
// // // //         },
// // // //         body: JSON.stringify({
// // // //           uploadId,
// // // //           key,
// // // //           parts,
// // // //         }),
// // // //       });

// // // //       if (!completeResponse.ok) {
// // // //         throw new Error('Failed to complete upload');
// // // //       }

// // // //       const result = await completeResponse.json();
      
// // // //       // Add to uploaded files
// // // //       const fileUrl = result.fileUrl;
// // // //       setUploadedFiles(prev => [...prev, { name: file.name, url: fileUrl }]);

// // // //       return result;
// // // //     } catch (error) {
// // // //       console.error(`Error uploading ${file.name}:`, error);
// // // //       setUploadProgress(prev => ({
// // // //         ...prev,
// // // //         [file.name]: 0
// // // //       }));
// // // //       throw error;
// // // //     }
// // // //   };

// // // //   const handleFileChange = async (e) => {
// // // //     const selectedFiles = Array.from(e.target.files);
// // // //     setFormData(prev => ({
// // // //       ...prev,
// // // //       files: [...prev.files, ...selectedFiles]
// // // //     }));
    
// // // //     try {
// // // //       for (const file of selectedFiles) {
// // // //         await uploadFile(file);
// // // //       }
// // // //     } catch (error) {
// // // //       console.error('Upload failed:', error);
// // // //       alert('Failed to upload some files. Please try again.');
// // // //     }
// // // //   };

// // // //   const handleDrop = async (e) => {
// // // //     e.preventDefault();
// // // //     const droppedFiles = Array.from(e.dataTransfer.files);
// // // //     setFormData(prev => ({
// // // //       ...prev,
// // // //       files: [...prev.files, ...droppedFiles]
// // // //     }));
    
// // // //     try {
// // // //       for (const file of droppedFiles) {
// // // //         await uploadFile(file);
// // // //       }
// // // //     } catch (error) {
// // // //       console.error('Upload failed:', error);
// // // //       alert('Failed to upload some files. Please try again.');
// // // //     }
// // // //   };

// // // //   const removeFile = (index) => {
// // // //     const fileName = formData.files[index].name;
// // // //     setFormData(prev => ({
// // // //       ...prev,
// // // //       files: prev.files.filter((_, i) => i !== index)
// // // //     }));
// // // //     setUploadedFiles(prev => prev.filter(file => file.name !== fileName));
// // // //     setUploadProgress(prev => {
// // // //       const newProgress = { ...prev };
// // // //       delete newProgress[fileName];
// // // //       return newProgress;
// // // //     });
// // // //   };

// // // //   const handleInputChange = (e) => {
// // // //     const { name, value } = e.target;
// // // //     setFormData(prev => ({
// // // //       ...prev,
// // // //       [name]: value
// // // //     }));
// // // //   };

// // // //   const handleSubmit = async (e) => {
// // // //     e.preventDefault();
// // // //     if (!formData.cost || uploadedFiles.length === 0) {
// // // //       alert('Please enter cost and upload at least one file');
// // // //       return;
// // // //     }
  
// // // //     setIsSubmitting(true);
// // // //     try {
// // // //       const requestData = {
// // // //         projectId,
// // // //         desc: formData.desc || '',
// // // //         cost: formData.cost,
// // // //         files: uploadedFiles
// // // //       };
  
// // // //       const response = await fetch('/api/add-an-instance', {
// // // //         method: 'POST',
// // // //         headers: {
// // // //           'Content-Type': 'application/json'
// // // //         },
// // // //         body: JSON.stringify(requestData)
// // // //       });

// // // //       const result = await response.json();
  
// // // //       if (result.success) {
// // // //         alert('Instance created successfully!');
// // // //         onClose();
// // // //         window.location.reload();
// // // //       }
// // // //     } catch (error) {
// // // //       console.error('Error:', error);
// // // //       alert('Failed to create instance. Please try again.');
// // // //     } finally {
// // // //       setIsSubmitting(false);
// // // //     }
// // // //   };

// // // //   return (
// // // //     <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 md:flex md:items-center md:justify-center">
// // // //       <div className="fixed bottom-0 right-0 left-0 md:relative md:min-w-[24rem] bg-white rounded-t-2xl md:rounded-2xl shadow-2xl transform transition-all duration-500 ease-out animate-slide-in">
// // // //         <div className="p-6">
// // // //           <div className="flex items-center justify-between mb-6">
// // // //             <h2 className="text-xl font-semibold text-gray-900">Add New Instance</h2>
// // // //             <button 
// // // //               onClick={onClose}
// // // //               className="p-2 hover:bg-gray-100 rounded-full transition-colors"
// // // //             >
// // // //               <X className="w-5 h-5 text-gray-500" />
// // // //             </button>
// // // //           </div>
          
// // // //           <form onSubmit={handleSubmit} className="space-y-5">
// // // //             {/* File Upload Area */}
// // // //             <div 
// // // //               className="border-2 border-dashed border-gray-200 rounded-xl p-6 text-center hover:border-gray-300 transition-colors"
// // // //               onDrop={handleDrop}
// // // //               onDragOver={(e) => e.preventDefault()}
// // // //             >
// // // //               <input
// // // //                 type="file"
// // // //                 multiple
// // // //                 onChange={handleFileChange}
// // // //                 className="hidden"
// // // //                 id="file-upload"
// // // //               />
// // // //               <label htmlFor="file-upload" className="cursor-pointer">
// // // //                 <div className="mx-auto w-12 h-12 bg-gray-50 rounded-lg flex items-center justify-center mb-3">
// // // //                   <Upload className="w-6 h-6 text-gray-400" />
// // // //                 </div>
// // // //                 <p className="text-sm text-gray-500">
// // // //                   Drop files here or click to upload
// // // //                 </p>
// // // //                 <p className="text-xs text-gray-400 mt-1">
// // // //                   Multiple files allowed
// // // //                 </p>
// // // //               </label>
// // // //             </div>

// // // //             {/* File Preview List */}
// // // //             {formData.files.length > 0 && (
// // // //               <div className="max-h-40 overflow-y-auto space-y-2">
// // // //                 {formData.files.map((file, index) => (
// // // //                   <FilePreview
// // // //                     key={index}
// // // //                     file={file}
// // // //                     onRemove={() => removeFile(index)}
// // // //                     progress={uploadProgress[file.name]}
// // // //                   />
// // // //                 ))}
// // // //               </div>
// // // //             )}

// // // //             {/* Cost Input */}
// // // //             <div>
// // // //               <label className="block text-sm font-medium text-gray-700 mb-1">
// // // //                 Cost
// // // //               </label>
// // // //               <input
// // // //                 type="number"
// // // //                 name="cost"
// // // //                 value={formData.cost}
// // // //                 onChange={handleInputChange}
// // // //                 className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none 
// // // //                          focus:ring-2 focus:ring-blue-100 transition-colors"
// // // //                 placeholder="Enter cost..."
// // // //                 required
// // // //               />
// // // //             </div>

// // // //             {/* Description Input */}
// // // //             <div>
// // // //               <label className="block text-sm font-medium text-gray-700 mb-1">
// // // //                 Description (Optional)
// // // //               </label>
// // // //               <textarea
// // // //                 name="desc"
// // // //                 value={formData.desc}
// // // //                 onChange={handleInputChange}
// // // //                 className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none 
// // // //                          focus:ring-2 focus:ring-blue-100 transition-colors"
// // // //                 rows={3}
// // // //                 placeholder="Enter description..."
// // // //               />
// // // //             </div>

// // // //             <button
// // // //               type="submit"
// // // //               disabled={isSubmitting}
// // // //               className="w-full px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 
// // // //                        transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
// // // //             >
// // // //               {isSubmitting ? 'Adding Instance...' : 'Add Instance'}
// // // //             </button>
// // // //           </form>
// // // //         </div>
// // // //       </div>

// // // //       <style jsx>{`
// // // //         @keyframes slideIn {
// // // //           from {
// // // //             transform: translateY(100%);
// // // //           }
// // // //           to {
// // // //             transform: translateY(0);
// // // //           }
// // // //         }
// // // //         .animate-slide-in {
// // // //           animation: slideIn 0.3s ease-out;
// // // //         }
// // // //       `}</style>
// // // //     </div>
// // // //   );
// // // // };

// // // // export default NewInstanceForm;

// // // // NewInstanceForm.tsx
// // // import React, { useState } from 'react';
// // // import { Upload, X } from 'lucide-react';

// // // const CHUNK_SIZE = 5 * 1024 * 1024; // 5MB chunks

// // // const FilePreview = ({ file, onRemove, progress }) => (
// // //   <div className="flex items-center justify-between p-3 bg-white rounded-lg shadow-sm border border-gray-100">
// // //     <div className="flex items-center gap-3">
// // //       <div className="w-8 h-8 rounded-lg bg-black/5 flex items-center justify-center">
// // //         <Upload className="w-4 h-4 text-gray-600" />
// // //       </div>
// // //       <div className="flex-1 min-w-0">
// // //         <p className="text-sm font-medium text-gray-900 truncate">{file.name}</p>
// // //         <p className="text-xs text-gray-500">{(file.size / 1024).toFixed(1)} KB</p>
// // //         {progress !== undefined && (
// // //           <div className="w-full bg-gray-200 rounded-full h-1.5 mt-2">
// // //             <div
// // //               className="bg-blue-600 h-1.5 rounded-full transition-all duration-300"
// // //               style={{ width: `${progress}%` }}
// // //             />
// // //           </div>
// // //         )}
// // //       </div>
// // //     </div>
// // //     <button
// // //       onClick={onRemove}
// // //       className="p-1 hover:bg-gray-100 rounded-full transition-colors"
// // //     >
// // //       <X className="w-4 h-4 text-gray-500" />
// // //     </button>
// // //   </div>
// // // );

// // // interface NewInstanceFormProps {
// // //   projectId: string;
// // //   onClose: () => void;
// // // }

// // // const NewInstanceForm: React.FC<NewInstanceFormProps> = ({ projectId, onClose }) => {
// // //   const [isSubmitting, setIsSubmitting] = useState(false);
// // //   const [uploadProgress, setUploadProgress] = useState<Record<string, number>>({});
// // //   const [uploadedFiles, setUploadedFiles] = useState<Array<{ name: string; url: string }>>([]);
  
// // //   const [formData, setFormData] = useState({
// // //     desc: '',
// // //     cost: '',
// // //     files: [] as File[]
// // //   });

// // //   const createChunks = (file: File) => {
// // //     const chunks = [];
// // //     let size = file.size;
// // //     let offset = 0;
    
// // //     while (offset < size) {
// // //       const chunk = file.slice(offset, offset + CHUNK_SIZE);
// // //       chunks.push(chunk);
// // //       offset += CHUNK_SIZE;
// // //     }
    
// // //     return chunks;
// // //   };

// // //   const uploadFile = async (file: File) => {
// // //     try {
// // //       setUploadProgress(prev => ({
// // //         ...prev,
// // //         [file.name]: 0
// // //       }));

// // //       const initFormData = new FormData();
// // //       initFormData.append("fileName", file.name);
// // //       initFormData.append("fileType", file.type);

// // //       const initResponse = await fetch("/api/upload", {
// // //         method: "POST",
// // //         body: initFormData,
// // //       });

// // //       if (!initResponse.ok) {
// // //         throw new Error('Failed to initiate upload');
// // //       }

// // //       const { uploadId, key } = await initResponse.json();

// // //       const chunks = createChunks(file);
// // //       const parts = [];

// // //       for (let i = 0; i < chunks.length; i++) {
// // //         const chunk = chunks[i];
// // //         const chunkNumber = i + 1;

// // //         const chunkFormData = new FormData();
// // //         chunkFormData.append("file", new Blob([chunk]));
// // //         chunkFormData.append("chunkNumber", chunkNumber.toString());
// // //         chunkFormData.append("uploadId", uploadId);
// // //         chunkFormData.append("key", key);

// // //         const chunkResponse = await fetch("/api/upload-part", {
// // //           method: "POST",
// // //           body: chunkFormData,
// // //         });

// // //         if (!chunkResponse.ok) {
// // //           throw new Error(`Failed to upload chunk ${chunkNumber}`);
// // //         }

// // //         const { ETag } = await chunkResponse.json();
// // //         parts.push({ PartNumber: chunkNumber, ETag });

// // //         const progress = Math.round(((i + 1) / chunks.length) * 100);
// // //         setUploadProgress(prev => ({
// // //           ...prev,
// // //           [file.name]: progress
// // //         }));
// // //       }

// // //       const completeResponse = await fetch("/api/complete-upload", {
// // //         method: "POST",
// // //         headers: {
// // //           "Content-Type": "application/json",
// // //         },
// // //         body: JSON.stringify({
// // //           uploadId,
// // //           key,
// // //           parts,
// // //         }),
// // //       });

// // //       if (!completeResponse.ok) {
// // //         throw new Error('Failed to complete upload');
// // //       }

// // //       const result = await completeResponse.json();
// // //       const fileUrl = result.fileUrl;
// // //       setUploadedFiles(prev => [...prev, { name: file.name, url: fileUrl }]);

// // //       return result;
// // //     } catch (error) {
// // //       console.error(`Error uploading ${file.name}:`, error);
// // //       setUploadProgress(prev => ({
// // //         ...prev,
// // //         [file.name]: 0
// // //       }));
// // //       throw error;
// // //     }
// // //   };

// // //   const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
// // //     const selectedFiles = Array.from(e.target.files || []);
// // //     setFormData(prev => ({
// // //       ...prev,
// // //       files: [...prev.files, ...selectedFiles]
// // //     }));
    
// // //     try {
// // //       for (const file of selectedFiles) {
// // //         await uploadFile(file);
// // //       }
// // //     } catch (error) {
// // //       console.error('Upload failed:', error);
// // //       alert('Failed to upload some files. Please try again.');
// // //     }
// // //   };

// // //   const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
// // //     e.preventDefault();
// // //     const droppedFiles = Array.from(e.dataTransfer.files);
// // //     setFormData(prev => ({
// // //       ...prev,
// // //       files: [...prev.files, ...droppedFiles]
// // //     }));
    
// // //     try {
// // //       for (const file of droppedFiles) {
// // //         await uploadFile(file);
// // //       }
// // //     } catch (error) {
// // //       console.error('Upload failed:', error);
// // //       alert('Failed to upload some files. Please try again.');
// // //     }
// // //   };

// // //   const removeFile = (index: number) => {
// // //     const fileName = formData.files[index].name;
// // //     setFormData(prev => ({
// // //       ...prev,
// // //       files: prev.files.filter((_, i) => i !== index)
// // //     }));
// // //     setUploadedFiles(prev => prev.filter(file => file.name !== fileName));
// // //     setUploadProgress(prev => {
// // //       const newProgress = { ...prev };
// // //       delete newProgress[fileName];
// // //       return newProgress;
// // //     });
// // //   };

// // //   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
// // //     const { name, value } = e.target;
// // //     setFormData(prev => ({
// // //       ...prev,
// // //       [name]: value
// // //     }));
// // //   };

// // //   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
// // //     e.preventDefault();
// // //     if (!formData.cost || uploadedFiles.length === 0) {
// // //       alert('Please enter cost and upload at least one file');
// // //       return;
// // //     }
  
// // //     setIsSubmitting(true);
// // //     try {
// // //       const requestData = {
// // //         projectId,
// // //         desc: formData.desc || '',
// // //         cost: formData.cost,
// // //         files: uploadedFiles
// // //       };
  
// // //       const response = await fetch('/api/add-an-instance', {
// // //         method: 'POST',
// // //         headers: {
// // //           'Content-Type': 'application/json'
// // //         },
// // //         body: JSON.stringify(requestData)
// // //       });

// // //       const result = await response.json();
  
// // //       if (result.success) {
// // //         alert('Instance created successfully!');
// // //         onClose();
// // //         window.location.reload();
// // //       }
// // //     } catch (error) {
// // //       console.error('Error:', error);
// // //       alert('Failed to create instance. Please try again.');
// // //     } finally {
// // //       setIsSubmitting(false);
// // //     }
// // //   };

// // //   return (
// // //     <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 md:flex md:items-center md:justify-center">
// // //       <div className="fixed bottom-0 right-0 left-0 md:relative md:min-w-[24rem] bg-white rounded-t-2xl md:rounded-2xl shadow-2xl transform transition-all duration-500 ease-out animate-slide-in">
// // //         <div className="p-6">
// // //           <div className="flex items-center justify-between mb-6">
// // //             <h2 className="text-xl font-semibold text-gray-900">Add New Instance</h2>
// // //             <button 
// // //               onClick={onClose}
// // //               className="p-2 hover:bg-gray-100 rounded-full transition-colors"
// // //             >
// // //               <X className="w-5 h-5 text-gray-500" />
// // //             </button>
// // //           </div>
          
// // //           <form onSubmit={handleSubmit} className="space-y-5">
// // //             <div 
// // //               className="border-2 border-dashed border-gray-200 rounded-xl p-6 text-center hover:border-gray-300 transition-colors"
// // //               onDrop={handleDrop}
// // //               onDragOver={(e) => e.preventDefault()}
// // //             >
// // //               <input
// // //                 type="file"
// // //                 multiple
// // //                 onChange={handleFileChange}
// // //                 className="hidden"
// // //                 id="file-upload"
// // //               />
// // //               <label htmlFor="file-upload" className="cursor-pointer">
// // //                 <div className="mx-auto w-12 h-12 bg-gray-50 rounded-lg flex items-center justify-center mb-3">
// // //                   <Upload className="w-6 h-6 text-gray-400" />
// // //                 </div>
// // //                 <p className="text-sm text-gray-500">
// // //                   Drop files here or click to upload
// // //                 </p>
// // //                 <p className="text-xs text-gray-400 mt-1">
// // //                   Multiple files allowed
// // //                 </p>
// // //               </label>
// // //             </div>

// // //             {formData.files.length > 0 && (
// // //               <div className="max-h-40 overflow-y-auto space-y-2">
// // //                 {formData.files.map((file, index) => (
// // //                   <FilePreview
// // //                     key={index}
// // //                     file={file}
// // //                     onRemove={() => removeFile(index)}
// // //                     progress={uploadProgress[file.name]}
// // //                   />
// // //                 ))}
// // //               </div>
// // //             )}

// // //             <div>
// // //               <label className="block text-sm font-medium text-gray-700 mb-1">Cost</label>
// // //               <input
// // //                 type="number"
// // //                 name="cost"
// // //                 value={formData.cost}
// // //                 onChange={handleInputChange}
// // //                 className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-100 transition-colors"
// // //                 placeholder="Enter cost..."
// // //                 required
// // //               />
// // //             </div>

// // //             <div>
// // //               <label className="block text-sm font-medium text-gray-700 mb-1">Description (Optional)</label>
// // //               <textarea
// // //                 name="desc"
// // //                 value={formData.desc}
// // //                 onChange={handleInputChange}
// // //                 className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-100 transition-colors"
// // //                 rows={3}
// // //                 placeholder="Enter description..."
// // //               />
// // //             </div>

// // //             <button
// // //               type="submit"
// // //               disabled={isSubmitting}
// // //               className="w-full px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
// // //             >
// // //               {isSubmitting ? 'Adding Instance...' : 'Add Instance'}
// // //             </button>
// // //           </form>
// // //         </div>
// // //       </div>

// // //       <style jsx>{`
// // //         @keyframes slideIn {
// // //           from { transform: translateY(100%); }
// // //           to { transform: translateY(0); }
// // //         }
// // //         .animate-slide-in {
// // //           animation: slideIn 0.3s ease-out;
// // //         }
// // //       `}</style>
// // //     </div>
// // //   );
// // // };

// // // export default NewInstanceForm;
// // "use client";

// // import React, { useState } from 'react';
// // import { Upload, X } from 'lucide-react';

// // const CHUNK_SIZE = 5 * 1024 * 1024; // 5MB chunks

// // interface FilePreviewProps {
// //   file: File;
// //   onRemove: () => void;
// //   progress?: number;
// //   fileUrl?: string;
// // }

// // const FilePreview: React.FC<FilePreviewProps> = ({ file, onRemove, progress, fileUrl }) => (
// //   <div className="flex flex-col p-3 bg-white rounded-lg shadow-sm border border-gray-100">
// //     <div className="flex items-center justify-between">
// //       <div className="flex items-center gap-3 flex-1 min-w-0">
// //         <div className="w-8 h-8 rounded-lg bg-black/5 flex items-center justify-center">
// //           <Upload className="w-4 h-4 text-gray-600" />
// //         </div>
// //         <div className="flex-1 min-w-0">
// //           <p className="text-sm font-medium text-gray-900 truncate">{file.name}</p>
// //           <p className="text-xs text-gray-500">{(file.size / 1024).toFixed(1)} KB</p>
// //         </div>
// //       </div>
// //       <button
// //         onClick={onRemove}
// //         className="p-1 hover:bg-gray-100 rounded-full transition-colors"
// //       >
// //         <X className="w-4 h-4 text-gray-500" />
// //       </button>
// //     </div>

// //     {progress !== undefined && (
// //       <div className="w-full bg-gray-200 rounded-full h-1.5 mt-2">
// //         <div
// //           className="bg-blue-600 h-1.5 rounded-full transition-all duration-300"
// //           style={{ width: `${progress}%` }}
// //         />
// //       </div>
// //     )}

// //     {progress === 100 && !fileUrl && (
// //       <div className="text-xs text-blue-600 mt-1">Processing...</div>
// //     )}
// //     {fileUrl && (
// //       <div className="text-xs text-green-600 mt-1">Upload complete</div>
// //     )}
// //   </div>
// // );

// // interface NewInstanceFormProps {
// //   projectId: string;
// //   onClose: () => void;
// // }

// // const NewInstanceForm: React.FC<NewInstanceFormProps> = ({ projectId, onClose }) => {
// //   const [isSubmitting, setIsSubmitting] = useState(false);
// //   const [uploadProgress, setUploadProgress] = useState<Record<string, number>>({});
// //   const [uploadedFiles, setUploadedFiles] = useState<Array<{ name: string; url: string }>>([]);
  
// //   const [formData, setFormData] = useState({
// //     desc: '',
// //     cost: '',
// //     files: [] as File[]
// //   });

// //   const createChunks = (file: File) => {
// //     const chunks = [];
// //     let size = file.size;
// //     let offset = 0;
    
// //     while (offset < size) {
// //       const chunk = file.slice(offset, offset + CHUNK_SIZE);
// //       chunks.push(chunk);
// //       offset += CHUNK_SIZE;
// //     }
    
// //     return chunks;
// //   };

// //   const uploadFile = async (file: File) => {
// //     try {
// //       // Initialize progress
// //       setUploadProgress(prev => ({
// //         ...prev,
// //         [file.name]: 0
// //       }));

// //       // Step 1: Initiate upload
// //       const initFormData = new FormData();
// //       initFormData.append("fileName", file.name);
// //       initFormData.append("fileType", file.type);
// //       initFormData.append("projectId", projectId);

// //       const initResponse = await fetch("/api/upload", {
// //         method: "POST",
// //         body: initFormData,
// //       });

// //       if (!initResponse.ok) {
// //         throw new Error('Failed to initiate upload');
// //       }

// //       const { uploadId, key } = await initResponse.json();

// //       // Step 2: Upload chunks
// //       const chunks = createChunks(file);
// //       const parts = [];

// //       for (let i = 0; i < chunks.length; i++) {
// //         const chunk = chunks[i];
// //         const chunkNumber = i + 1;

// //         const chunkFormData = new FormData();
// //         chunkFormData.append("file", new Blob([chunk]));
// //         chunkFormData.append("chunkNumber", chunkNumber.toString());
// //         chunkFormData.append("uploadId", uploadId);
// //         chunkFormData.append("key", key);
// //         chunkFormData.append("projectId", projectId);

// //         const chunkResponse = await fetch("/api/upload-part", {
// //           method: "POST",
// //           body: chunkFormData,
// //         });

// //         if (!chunkResponse.ok) {
// //           throw new Error(`Failed to upload chunk ${chunkNumber}`);
// //         }

// //         const { ETag } = await chunkResponse.json();
// //         parts.push({ PartNumber: chunkNumber, ETag });

// //         // Update progress
// //         const progress = Math.round(((i + 1) / chunks.length) * 100);
// //         setUploadProgress(prev => ({
// //           ...prev,
// //           [file.name]: progress
// //         }));
// //       }

// //       // Step 3: Complete upload
// //       const completeResponse = await fetch("/api/complete-upload", {
// //         method: "POST",
// //         headers: {
// //           "Content-Type": "application/json",
// //         },
// //         body: JSON.stringify({
// //           uploadId,
// //           key,
// //           parts,
// //           projectId
// //         }),
// //       });

// //       if (!completeResponse.ok) {
// //         throw new Error('Failed to complete upload');
// //       }

// //       const result = await completeResponse.json();
// //       const fileUrl = result.fileUrl;
      
// //       setUploadedFiles(prev => [...prev, { name: file.name, url: fileUrl }]);

// //       return result;
// //     } catch (error) {
// //       console.error(`Error uploading ${file.name}:`, error);
// //       setUploadProgress(prev => ({
// //         ...prev,
// //         [file.name]: 0
// //       }));
// //       throw error;
// //     }
// //   };

// //   const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
// //     if (!e.target.files?.length) return;
    
// //     const selectedFiles = Array.from(e.target.files);
// //     setFormData(prev => ({
// //       ...prev,
// //       files: [...prev.files, ...selectedFiles]
// //     }));
    
// //     try {
// //       for (const file of selectedFiles) {
// //         await uploadFile(file);
// //       }
// //     } catch (error) {
// //       console.error('Upload failed:', error);
// //       alert('Failed to upload some files. Please try again.');
// //     }
// //   };

// //   const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
// //     e.preventDefault();
// //     const droppedFiles = Array.from(e.dataTransfer.files);
// //     setFormData(prev => ({
// //       ...prev,
// //       files: [...prev.files, ...droppedFiles]
// //     }));
    
// //     try {
// //       for (const file of droppedFiles) {
// //         await uploadFile(file);
// //       }
// //     } catch (error) {
// //       console.error('Upload failed:', error);
// //       alert('Failed to upload some files. Please try again.');
// //     }
// //   };

// //   const removeFile = (index: number) => {
// //     const fileName = formData.files[index].name;
// //     setFormData(prev => ({
// //       ...prev,
// //       files: prev.files.filter((_, i) => i !== index)
// //     }));
// //     setUploadedFiles(prev => prev.filter(file => file.name !== fileName));
// //     setUploadProgress(prev => {
// //       const newProgress = { ...prev };
// //       delete newProgress[fileName];
// //       return newProgress;
// //     });
// //   };

// //   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
// //     const { name, value } = e.target;
// //     setFormData(prev => ({
// //       ...prev,
// //       [name]: value
// //     }));
// //   };

// //   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
// //     e.preventDefault();
// //     if (!formData.cost || uploadedFiles.length === 0) {
// //       alert('Please enter cost and upload at least one file');
// //       return;
// //     }
  
// //     setIsSubmitting(true);
// //     try {
// //       const requestData = {
// //         projectId,
// //         desc: formData.desc || '',
// //         cost: formData.cost,
// //         files: uploadedFiles
// //       };
  
// //       const response = await fetch('/api/add-an-instance', {
// //         method: 'POST',
// //         headers: {
// //           'Content-Type': 'application/json'
// //         },
// //         body: JSON.stringify(requestData)
// //       });

// //       const result = await response.json();
  
// //       if (result.success) {
// //         alert('Instance created successfully!');
// //         onClose();
// //         window.location.reload();
// //       }
// //     } catch (error) {
// //       console.error('Error:', error);
// //       alert('Failed to create instance. Please try again.');
// //     } finally {
// //       setIsSubmitting(false);
// //     }
// //   };

// //   return (
// //     <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 md:flex md:items-center md:justify-center">
// //       <div className="fixed bottom-0 right-0 left-0 md:relative md:min-w-[24rem] bg-white rounded-t-2xl md:rounded-2xl shadow-2xl transform transition-all duration-500 ease-out animate-slide-in">
// //         <div className="p-6">
// //           <div className="flex items-center justify-between mb-6">
// //             <h2 className="text-xl font-semibold text-gray-900">Add New Instance</h2>
// //             <button 
// //               onClick={onClose}
// //               className="p-2 hover:bg-gray-100 rounded-full transition-colors"
// //             >
// //               <X className="w-5 h-5 text-gray-500" />
// //             </button>
// //           </div>
          
// //           <form onSubmit={handleSubmit} className="space-y-5">
// //             <div 
// //               className="border-2 border-dashed border-gray-200 rounded-xl p-6 text-center hover:border-gray-300 transition-colors"
// //               onDrop={handleDrop}
// //               onDragOver={(e) => e.preventDefault()}
// //             >
// //               <input
// //                 type="file"
// //                 multiple
// //                 onChange={handleFileChange}
// //                 className="hidden"
// //                 id="file-upload"
// //               />
// //               <label htmlFor="file-upload" className="cursor-pointer">
// //                 <div className="mx-auto w-12 h-12 bg-gray-50 rounded-lg flex items-center justify-center mb-3">
// //                   <Upload className="w-6 h-6 text-gray-400" />
// //                 </div>
// //                 <p className="text-sm text-gray-500">
// //                   Drop files here or click to upload
// //                 </p>
// //                 <p className="text-xs text-gray-400 mt-1">
// //                   Multiple files allowed
// //                 </p>
// //               </label>
// //             </div>

// //             {formData.files.length > 0 && (
// //               <div className="max-h-40 overflow-y-auto space-y-2">
// //                 {formData.files.map((file, index) => (
// //                   <FilePreview
// //                     key={index}
// //                     file={file}
// //                     onRemove={() => removeFile(index)}
// //                     progress={uploadProgress[file.name]}
// //                     fileUrl={uploadedFiles.find(f => f.name === file.name)?.url}
// //                   />
// //                 ))}
// //               </div>
// //             )}

// //             <div>
// //               <label className="block text-sm font-medium text-gray-700 mb-1">Cost</label>
// //               <input
// //                 type="number"
// //                 name="cost"
// //                 value={formData.cost}
// //                 onChange={handleInputChange}
// //                 className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-100 transition-colors"
// //                 placeholder="Enter cost..."
// //                 required
// //               />
// //             </div>

// //             <div>
// //               <label className="block text-sm font-medium text-gray-700 mb-1">Description (Optional)</label>
// //               <textarea
// //                 name="desc"
// //                 value={formData.desc}
// //                 onChange={handleInputChange}
// //                 className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-100 transition-colors"
// //                 rows={3}
// //                 placeholder="Enter description..."
// //               />
// //             </div>

// //             <button
// //               type="submit"
// //               disabled={isSubmitting}
// //               className="w-full px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
// //             >
// //               {isSubmitting ? 'Adding Instance...' : 'Add Instance'}
// //             </button>
// //           </form>
// //         </div>
// //       </div>

// //       <style jsx>{`
// //         @keyframes slideIn {
// //           from { transform: translateY(100%); }
// //           to { transform: translateY(0); }
// //         }
// //         .animate-slide-in {
// //           animation: slideIn 0.3s ease-out;
// //         }
// //       `}</style>
// //     </div>
// //   );
// // };

// // export default NewInstanceForm;

// "use client";

// import React, { useState } from 'react';
// import { Upload, X } from 'lucide-react';

// // Reduced chunk size to prevent timeouts
// const CHUNK_SIZE = 1 * 1024 * 1024; // 1MB chunks
// const MAX_RETRIES = 3;
// const RETRY_DELAY = 1000; // 1 second

// interface FilePreviewProps {
//   file: File;
//   onRemove: () => void;
//   progress?: number;
// }

// const FilePreview: React.FC<FilePreviewProps> = ({ file, onRemove, progress }) => (
//   <div className="flex items-center justify-between p-3 bg-white rounded-lg shadow-sm border border-gray-100">
//     <div className="flex items-center gap-3">
//       <div className="w-8 h-8 rounded-lg bg-black/5 flex items-center justify-center">
//         <Upload className="w-4 h-4 text-gray-600" />
//       </div>
//       <div className="flex-1 min-w-0">
//         <p className="text-sm font-medium text-gray-900 truncate">{file.name}</p>
//         <p className="text-xs text-gray-500">{(file.size / 1024).toFixed(1)} KB</p>
//         {progress !== undefined && (
//           <div className="w-full bg-gray-200 rounded-full h-1.5 mt-2">
//             <div
//               className="bg-blue-600 h-1.5 rounded-full transition-all duration-300"
//               style={{ width: `${progress}%` }}
//             />
//           </div>
//         )}
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

// interface NewInstanceFormProps {
//   projectId: string;
//   onClose: () => void;
// }

// const NewInstanceForm: React.FC<NewInstanceFormProps> = ({ projectId, onClose }) => {
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [uploadProgress, setUploadProgress] = useState<Record<string, number>>({});
//   const [formData, setFormData] = useState({
//     desc: '',
//     cost: '',
//     files: [] as File[]
//   });

//   const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

//   const createChunks = (file: File) => {
//     const chunks = [];
//     let size = file.size;
//     let offset = 0;
    
//     while (offset < size) {
//       const chunk = file.slice(offset, offset + CHUNK_SIZE);
//       chunks.push(chunk);
//       offset += CHUNK_SIZE;
//     }
    
//     return chunks;
//   };

//   const uploadChunkWithRetry = async (
//     chunk: Blob,
//     chunkNumber: number,
//     uploadId: string,
//     key: string,
//     retryCount = 0
//   ) => {
//     try {
//       const chunkFormData = new FormData();
//       chunkFormData.append("file", chunk);
//       chunkFormData.append("chunkNumber", chunkNumber.toString());
//       chunkFormData.append("uploadId", uploadId);
//       chunkFormData.append("key", key);
//       chunkFormData.append("projectId", projectId);

//       const response = await fetch("/api/upload-part", {
//         method: "POST",
//         body: chunkFormData,
//       });

//       if (!response.ok) {
//         throw new Error(`Failed to upload chunk ${chunkNumber}`);
//       }

//       return await response.json();
//     } catch (error) {
//       if (retryCount < MAX_RETRIES) {
//         await sleep(RETRY_DELAY * (retryCount + 1));
//         return uploadChunkWithRetry(chunk, chunkNumber, uploadId, key, retryCount + 1);
//       }
//       throw error;
//     }
//   };

//   const uploadFile = async (file: File) => {
//     try {
//       setUploadProgress(prev => ({
//         ...prev,
//         [file.name]: 0
//       }));

//       // Step 1: Initiate upload
//       const initFormData = new FormData();
//       initFormData.append("fileName", file.name);
//       initFormData.append("fileType", file.type);
//       initFormData.append("projectId", projectId);

//       const initResponse = await fetch("/api/upload", {
//         method: "POST",
//         body: initFormData,
//       });

//       if (!initResponse.ok) {
//         throw new Error('Failed to initiate upload');
//       }

//       const { uploadId, key } = await initResponse.json();

//       // Step 2: Upload chunks
//       const chunks = createChunks(file);
//       const parts = [];

//       for (let i = 0; i < chunks.length; i++) {
//         const chunk = chunks[i];
//         const chunkNumber = i + 1;

//         const { ETag } = await uploadChunkWithRetry(chunk, chunkNumber, uploadId, key);
//         parts.push({ PartNumber: chunkNumber, ETag });

//         const progress = Math.round(((i + 1) / chunks.length) * 100);
//         setUploadProgress(prev => ({
//           ...prev,
//           [file.name]: progress
//         }));
//       }

//       // Step 3: Complete upload with retry
//       let completeSuccess = false;
//       let retryCount = 0;

//       while (!completeSuccess && retryCount < MAX_RETRIES) {
//         try {
//           const completeResponse = await fetch("/api/complete-upload", {
//             method: "POST",
//             headers: {
//               "Content-Type": "application/json",
//             },
//             body: JSON.stringify({
//               uploadId,
//               key,
//               parts,
//               projectId
//             }),
//           });

//           if (!completeResponse.ok) {
//             throw new Error('Failed to complete upload');
//           }

//           completeSuccess = true;
//         } catch (error) {
//           retryCount++;
//           if (retryCount >= MAX_RETRIES) throw error;
//           await sleep(RETRY_DELAY * retryCount);
//         }
//       }

//       return { name: file.name, key };
//     } catch (error) {
//       console.error(`Error uploading ${file.name}:`, error);
//       setUploadProgress(prev => ({
//         ...prev,
//         [file.name]: 0
//       }));
//       throw error;
//     }
//   };

//   const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (!e.target.files?.length) return;
    
//     const selectedFiles = Array.from(e.target.files);
    
//     // Validate file sizes
//     const totalSize = selectedFiles.reduce((sum, file) => sum + file.size, 0);
//     if (totalSize > 100 * 1024 * 1024) { // 100MB total limit
//       alert('Total file size cannot exceed 100MB');
//       return;
//     }

//     setFormData(prev => ({
//       ...prev,
//       files: [...prev.files, ...selectedFiles]
//     }));
    
//     try {
//       for (const file of selectedFiles) {
//         await uploadFile(file);
//       }
//     } catch (error) {
//       console.error('Upload failed:', error);
//       alert('Failed to upload some files. Please try again.');
//     }
//   };

//   const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
//     e.preventDefault();
//     const droppedFiles = Array.from(e.dataTransfer.files);
    
//     // Validate file sizes
//     const totalSize = droppedFiles.reduce((sum, file) => sum + file.size, 0);
//     if (totalSize > 100 * 1024 * 1024) { // 100MB total limit
//       alert('Total file size cannot exceed 100MB');
//       return;
//     }

//     setFormData(prev => ({
//       ...prev,
//       files: [...prev.files, ...droppedFiles]
//     }));
    
//     try {
//       for (const file of droppedFiles) {
//         await uploadFile(file);
//       }
//     } catch (error) {
//       console.error('Upload failed:', error);
//       alert('Failed to upload some files. Please try again.');
//     }
//   };

//   const removeFile = (index: number) => {
//     const fileName = formData.files[index].name;
//     setFormData(prev => ({
//       ...prev,
//       files: prev.files.filter((_, i) => i !== index)
//     }));
//     setUploadProgress(prev => {
//       const newProgress = { ...prev };
//       delete newProgress[fileName];
//       return newProgress;
//     });
//   };

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     if (!formData.cost || formData.files.length === 0) {
//       alert('Please enter cost and upload at least one file');
//       return;
//     }
  
//     setIsSubmitting(true);
//     try {
//       const filesData = formData.files.map(file => ({
//         name: file.name,
//         progress: uploadProgress[file.name]
//       }));

//       // Only proceed if all files are uploaded successfully
//       if (!filesData.every(file => file.progress === 100)) {
//         throw new Error('Some files have not finished uploading');
//       }

//       const requestData = {
//         projectId,
//         desc: formData.desc || '',
//         cost: formData.cost,
//         files: filesData
//       };
  
//       const response = await fetch('/api/add-an-instance', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(requestData)
//       });

//       const result = await response.json();
  
//       if (result.success) {
//         alert('Instance created successfully!');
//         onClose();
//         window.location.reload();
//       }
//     } catch (error) {
//       console.error('Error:', error);
//       alert('Failed to create instance. Please try again.');
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 md:flex md:items-center md:justify-center">
//       <div className="fixed bottom-0 right-0 left-0 md:relative md:min-w-[24rem] bg-white rounded-t-2xl md:rounded-2xl shadow-2xl transform transition-all duration-500 ease-out animate-slide-in">
//         <div className="p-6">
//           <div className="flex items-center justify-between mb-6">
//             <h2 className="text-xl font-semibold text-gray-900">Add New Instance</h2>
//             <button 
//               onClick={onClose}
//               className="p-2 hover:bg-gray-100 rounded-full transition-colors"
//             >
//               <X className="w-5 h-5 text-gray-500" />
//             </button>
//           </div>
          
//           <form onSubmit={handleSubmit} className="space-y-5">
//             <div 
//               className="border-2 border-dashed border-gray-200 rounded-xl p-6 text-center hover:border-gray-300 transition-colors"
//               onDrop={handleDrop}
//               onDragOver={(e) => e.preventDefault()}
//             >
//               <input
//                 type="file"
//                 multiple
//                 onChange={handleFileChange}
//                 className="hidden"
//                 id="file-upload"
//               />
//               <label htmlFor="file-upload" className="cursor-pointer">
//                 <div className="mx-auto w-12 h-12 bg-gray-50 rounded-lg flex items-center justify-center mb-3">
//                   <Upload className="w-6 h-6 text-gray-400" />
//                 </div>
//                 <p className="text-sm text-gray-500">
//                   Drop files here or click to upload
//                 </p>
//                 <p className="text-xs text-gray-400 mt-1">
//                   Multiple files allowed (Max 100MB total)
//                 </p>
//               </label>
//             </div>

//             {formData.files.length > 0 && (
//               <div className="max-h-40 overflow-y-auto space-y-2">
//                 {formData.files.map((file, index) => (
//                   <FilePreview
//                     key={index}
//                     file={file}
//                     onRemove={() => removeFile(index)}
//                     progress={uploadProgress[file.name]}
//                   />
//                 ))}
//               </div>
//             )}

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">Cost</label>
//               <input
//                 type="number"
//                 name="cost"
//                 value={formData.cost}
//                 onChange={handleInputChange}
//                 className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-100 transition-colors"
//                 placeholder="Enter cost..."
//                 required
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">Description (Optional)</label>
//               <textarea
//                 name="desc"
//                 value={formData.desc}
//                 onChange={handleInputChange}
//                 className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-100 transition-colors"
//                 rows={3}
//                 placeholder="Enter description..."
//               />
//             </div>

//             <button
//               type="submit"
//               disabled={isSubmitting || !formData.files.length || Object.values(uploadProgress).some(p => p < 100)}
//               className="w-full px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
//             >
//               {isSubmitting ? 'Adding Instance...' : 'Add Instance'}
//             </button>
//           </form>
//         </div>
//       </div>

//       <style jsx>{`
//         @keyframes slideIn {
//           from { transform: translateY(100%); }
//           to { transform: translateY(0); }
//         }
//         .animate-slide-in {
//           animation: slideIn 0.3s ease-out;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default NewInstanceForm;

"use client";

import React, { useState } from 'react';
import { Upload, X, Download } from 'lucide-react';

const FilePreview = ({ file, onRemove, progress, fileUrl }) => (
  <div className="flex flex-col p-3 bg-white rounded-lg shadow-sm border border-gray-100">
    <div className="flex items-center justify-between mb-2">
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <div className="w-8 h-8 rounded-lg bg-black/5 flex items-center justify-center flex-shrink-0">
          <Upload className="w-4 h-4 text-gray-600" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-gray-900 truncate">{file.name}</p>
          <p className="text-xs text-gray-500">{(file.size / 1024).toFixed(1)} KB</p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        {fileUrl && (
          <a
            href={fileUrl}
            download
            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
            onClick={(e) => e.stopPropagation()}
          >
            <Download className="w-4 h-4 text-gray-500" />
          </a>
        )}
        <button
          onClick={onRemove}
          className="p-1 hover:bg-gray-100 rounded-full transition-colors"
        >
          <X className="w-4 h-4 text-gray-500" />
        </button>
      </div>
    </div>

    {progress !== undefined && (
      <div className="w-full bg-gray-200 rounded-full h-1.5 mt-2">
        <div
          className="bg-blue-600 h-1.5 rounded-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
    )}

    {progress === 100 && !fileUrl && (
      <div className="text-xs text-blue-600 mt-1">Processing...</div>
    )}
    {fileUrl && (
      <div className="text-xs text-green-600 mt-1">Upload complete</div>
    )}
  </div>
);

const NewInstanceForm = ({ projectId, onClose }) => {
  const [files, setFiles] = useState([]);
  const [uploadProgress, setUploadProgress] = useState({});
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({
    desc: '',
    cost: '',
  });

  const CHUNK_SIZE = 5 * 1024 * 1024; // 5MB chunks

  const createChunks = (file) => {
    const chunks = [];
    let size = file.size;
    let offset = 0;
    
    while (offset < size) {
      const chunk = file.slice(offset, offset + CHUNK_SIZE);
      chunks.push(chunk);
      offset += CHUNK_SIZE;
    }
    
    return chunks;
  };

  const uploadFile = async (file) => {
    try {
      // Initialize progress
      setUploadProgress(prev => ({
        ...prev,
        [file.name]: 0
      }));

      // Step 1: Initiate upload
      const initFormData = new FormData();
      initFormData.append("fileName", file.name);
      initFormData.append("fileType", file.type);
      initFormData.append("projectId", projectId);

      const initResponse = await fetch("/api/upload", {
        method: "POST",
        body: initFormData,
      });

      if (!initResponse.ok) {
        throw new Error('Failed to initiate upload');
      }

      const { uploadId, key } = await initResponse.json();

      // Step 2: Upload chunks
      const chunks = createChunks(file);
      const parts = [];

      for (let i = 0; i < chunks.length; i++) {
        const chunk = chunks[i];
        const chunkNumber = i + 1;

        const chunkFormData = new FormData();
        chunkFormData.append("file", new Blob([chunk]));
        chunkFormData.append("chunkNumber", chunkNumber.toString());
        chunkFormData.append("uploadId", uploadId);
        chunkFormData.append("key", key);
        chunkFormData.append("projectId", projectId);

        const chunkResponse = await fetch("/api/upload-part", {
          method: "POST",
          body: chunkFormData,
        });

        if (!chunkResponse.ok) {
          throw new Error(`Failed to upload chunk ${chunkNumber}`);
        }

        const { ETag } = await chunkResponse.json();
        parts.push({ PartNumber: chunkNumber, ETag });

        // Update progress
        const progress = Math.round(((i + 1) / chunks.length) * 100);
        setUploadProgress(prev => ({
          ...prev,
          [file.name]: progress
        }));
      }

      // Step 3: Complete upload
      const completeResponse = await fetch("/api/complete-upload", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          uploadId,
          key,
          parts,
          projectId
        }),
      });

      if (!completeResponse.ok) {
        throw new Error('Failed to complete upload');
      }

      const result = await completeResponse.json();
      const fileUrl = result.fileUrl;
      const fileInfo = { name: file.name, url: fileUrl };
      
      setUploadedFiles(prev => [...prev, fileInfo]);
      
      return result;
    } catch (error) {
      console.error(`Error uploading ${file.name}:`, error);
      setUploadProgress(prev => ({
        ...prev,
        [file.name]: 0
      }));
      throw error;
    }
  };

  const handleFileChange = async (e) => {
    const newFiles = Array.from(e.target.files);
    if (!newFiles.length) return;

    const totalSize = newFiles.reduce((sum, file) => sum + file.size, 0);
    if (totalSize > 100 * 1024 * 1024) { // 100MB limit
      alert('Total file size cannot exceed 100MB');
      return;
    }

    setFiles(prev => [...prev, ...newFiles]);
    
    try {
      for (const file of newFiles) {
        await uploadFile(file);
      }
    } catch (error) {
      console.error('Upload failed:', error);
      alert('Failed to upload some files. Please try again.');
      // Remove failed files from the list
      setFiles(prev => prev.filter(f => !newFiles.includes(f)));
    }
  };

  const handleDrop = async (e) => {
    e.preventDefault();
    const droppedFiles = Array.from(e.dataTransfer.files);
    
    const totalSize = droppedFiles.reduce((sum, file) => sum + file.size, 0);
    if (totalSize > 100 * 1024 * 1024) { // 100MB limit
      alert('Total file size cannot exceed 100MB');
      return;
    }

    setFiles(prev => [...prev, ...droppedFiles]);
    
    try {
      for (const file of droppedFiles) {
        await uploadFile(file);
      }
    } catch (error) {
      console.error('Upload failed:', error);
      alert('Failed to upload some files. Please try again.');
      // Remove failed files from the list
      setFiles(prev => prev.filter(f => !droppedFiles.includes(f)));
    }
  };

  const removeFile = (index) => {
    const fileName = files[index].name;
    setFiles(prev => prev.filter((_, i) => i !== index));
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
    setUploadProgress(prev => {
      const newProgress = { ...prev };
      delete newProgress[fileName];
      return newProgress;
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.cost || uploadedFiles.length === 0) {
      alert('Please enter cost and upload at least one file');
      return;
    }

    // Check if all files are uploaded successfully
    const allUploaded = files.every(file => uploadProgress[file.name] === 100);
    if (!allUploaded) {
      alert('Please wait for all files to finish uploading');
      return;
    }
  
    setIsSubmitting(true);
    try {
      const requestData = {
        projectId,
        desc: formData.desc || '',
        cost: formData.cost,
        files: uploadedFiles
      };
  
      const response = await fetch('/api/add-an-instance', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestData)
      });

      const result = await response.json();
  
      if (result.success) {
        alert('Instance created successfully!');
        onClose();
        window.location.reload();
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to create instance. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 md:flex md:items-center md:justify-center">
      <div className="fixed bottom-0 right-0 left-0 md:relative md:min-w-[24rem] bg-white rounded-t-2xl md:rounded-2xl shadow-2xl transform transition-all duration-500 ease-out animate-slide-in">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Add New Instance</h2>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-5">
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
                  Multiple files allowed (Max 100MB total)
                </p>
              </label>
            </div>

            {files.length > 0 && (
              <div className="max-h-40 overflow-y-auto space-y-2">
                {files.map((file, index) => (
                  <FilePreview
                    key={index}
                    file={file}
                    onRemove={() => removeFile(index)}
                    progress={uploadProgress[file.name]}
                    fileUrl={uploadedFiles[index]?.url}
                  />
                ))}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Cost</label>
              <input
                type="number"
                name="cost"
                value={formData.cost}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-100 transition-colors"
                placeholder="Enter cost..."
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description (Optional)</label>
              <textarea
                name="desc"
                value={formData.desc}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-100 transition-colors"
                rows={3}
                placeholder="Enter description..."
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting || !files.length || Object.values(uploadProgress).some(p => p !== 100)}
              className="w-full px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Adding Instance...' : 'Add Instance'}
            </button>
          </form>
        </div>
      </div>

      <style jsx>{`
        @keyframes slideIn {
          from { transform: translateY(100%); }
          to { transform: translateY(0); }
        }
        .animate-slide-in {
          animation: slideIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default NewInstanceForm;