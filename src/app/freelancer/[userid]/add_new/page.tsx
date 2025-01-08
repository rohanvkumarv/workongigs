
"use client"

import React, { useState } from 'react';
import { Upload, X, Info, Hash, Download } from 'lucide-react';
import { useRouter, useParams } from 'next/navigation';


const FilePreview = ({ file, onRemove, uploadProgress, fileUrl }) => (
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


    {uploadProgress !== undefined ? (
      <div className="w-full bg-gray-200 rounded-full h-1.5 mt-2">
        <div
          className="bg-blue-600 h-1.5 rounded-full transition-all duration-300"
          style={{ width: `${uploadProgress}%` }}
        />
      </div>
    ) : (
      <div className="text-xs text-gray-500 mt-2">Starting upload...</div>
    )}

    
    {/* Progress Bar */}
    {/* {uploadProgress !== undefined && uploadProgress < 100 && (
      <div className="w-full bg-gray-200 rounded-full h-1.5 mt-2">
        <div 
          className="bg-blue-600 h-1.5 rounded-full transition-all duration-300"
          style={{ width: `${uploadProgress}%` }}
        />
      </div>
    )} */}
    {uploadProgress === 100 && !fileUrl && (
      <div className="text-xs text-blue-600 mt-1">Processing...</div>
    )}
    {fileUrl && (
      <div className="text-xs text-green-600 mt-1">Upload complete</div>
    )}
  </div>
);



const AddNewProject = () => {
  const router = useRouter();
  const [files, setFiles] = useState([]);
  const [showTooltip, setShowTooltip] = useState(false);
  const [formData, setFormData] = useState({
    projectName: '',
    cost: '',
    currency: 'INR',
    paymentMode: '',
    projectCount: '',
    description: ''
  });


// new  
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [uploadProgress, setUploadProgress] = useState({});
  const [isUploading, setIsUploading] = useState(false);
  // new ends 


  const params = useParams();

  const freelancerId=localStorage.getItem("freelancerId");
  const [isSubmitting, setIsSubmitting] = useState(false);

  

  // const handleDrop = (e) => {
  //   e.preventDefault();
  //   const droppedFiles = Array.from(e.dataTransfer.files);
  //   setFiles(prev => [...prev, ...droppedFiles]);
  // };

  const currencies = [
    { code: 'INR', symbol: '₹' },
  ];

  // const uploadFile = async (file) => {
  //   try {
  //     // First get the presigned URL
  //     const formData = new FormData();
  //     formData.append("file", file);
      
  //     const response = await fetch("/api/upload", {
  //       method: "POST",
  //       body: formData,
  //     });
  
  //     const reader = response.body.getReader();
  //     const decoder = new TextDecoder();
  
  //     while (true) {
  //       const { done, value } = await reader.read();
  //       if (done) break;
  
  //       const chunk = decoder.decode(value);
  //       const lines = chunk.split("\n");
  
  //       for (const line of lines) {
  //         if (line.startsWith("data: ")) {
  //           const data = JSON.parse(line.slice(5));
  
  //           if (data.error) {
  //             throw new Error(data.error);
  //           }
  
  //           if (data.presignedUrl) {
  //             // Upload the file to S3 using the presigned URL
  //             const xhr = new XMLHttpRequest();
  //             xhr.open("PUT", data.presignedUrl);
  //             xhr.setRequestHeader("Content-Type", file.type);
  
  //             // Track upload progress
  //             xhr.upload.onprogress = (event) => {
  //               if (event.lengthComputable) {
  //                 const percentage = Math.round(
  //                   (event.loaded / event.total) * 100
  //                 );
  //                 setUploadProgress((prev) => ({
  //                   ...prev,
  //                   [file.name]: percentage,
  //                 }));
  //               }
  //             };
  
  //             // Create a promise to handle the upload
  //             await new Promise((resolve, reject) => {
  //               xhr.onload = () => {
  //                 if (xhr.status === 200) {
  //                   resolve(data.finalUrl);
  //                 } else {
  //                   reject(new Error("Upload failed"));
  //                 }
  //               };
  //               xhr.onerror = () => reject(new Error("Upload failed"));
  //               xhr.send(file);
  //             });
  
  //             return data.finalUrl;
  //           }
  //         }
  //       }
  //     }
  //   } catch (error) {
  //     console.error(`Error uploading ${file.name}:`, error);
  //     throw error;
  //   }
  // };

  // const handleFileChange = async (e) => {
  //   const newFiles = Array.from(e.target.files);
  //   setFiles(prev => [...prev, ...newFiles]);
    
  //   // Start uploading the new files immediately
  //   setIsUploading(true);
    
  //   try {
  //     for (const file of newFiles) {
  //       const url = await uploadFile(file);
  //       setUploadedFiles(prev => [...prev, { name: file.name, url }]);
  //     }
  //   } catch (error) {
  //     console.error('Upload failed:', error);
  //     alert('Failed to upload some files. Please try again.');
  //   } finally {
  //     setIsUploading(false);
  //   }
  // };
  const removeFile = (index) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
    setUploadProgress(prev => {
      const newProgress = { ...prev };
      delete newProgress[files[index].name];
      return newProgress;
    });
  };
  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);

      if (!formData.projectName || !formData.cost || !formData.paymentMode || !uploadedFiles.length) {
        alert('Please fill in all required fields and upload at least one file');
        return;
      }

      // Create the project with uploaded file URLs
      const response = await fetch('/api/create-project', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          files: uploadedFiles,
          freelancerId
        }),
      });

      const result = await response.json();

      if (!response.ok) throw new Error(result.error);

      if (result.projectId) {
        router.push(`/freelancer/${freelancerId}/projects/${result.projectId}/preview`);
      }
    } catch (error) {
      console.error('Error creating project:', error);
      alert(`Failed to create project. Please try again. Error: ${error.message || 'Unknown error'}`);
    } finally {
      setIsSubmitting(false);
    }
  };


  // Update these functions in your AddNewProject component

const CHUNK_SIZE = 4 * 1024 * 1024; // 4MB chunks

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

const uploadChunk = async (chunk, file, chunkIndex, totalChunks) => {
  const formData = new FormData();
  formData.append("file", chunk);
  formData.append("chunkNumber", chunkIndex);
  formData.append("totalChunks", totalChunks);
  formData.append("originalFileName", file.name);

  const response = await fetch("/api/upload", {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error(`Upload failed: ${response.statusText}`);
  }

  const data = await response.json();
  return data;
};

const uploadFile = async (file) => {
  try {
    const chunks = createChunks(file);
    const totalChunks = chunks.length;
    let uploadedChunks = 0;

    // Initialize progress
    setUploadProgress(prev => ({
      ...prev,
      [file.name]: 0
    }));

    let finalUrl = null;

    // Upload each chunk
    for (let i = 0; i < chunks.length; i++) {
      const chunk = chunks[i];
      
      // Get the upload URL and upload the chunk
      const data = await uploadChunk(chunk, file, i, totalChunks);
      
      // Upload to S3
      const response = await fetch(data.presignedUrl, {
        method: "PUT",
        body: chunk,
        headers: {
          "Content-Type": file.type,
        },
      });

      if (!response.ok) {
        throw new Error(`S3 upload failed: ${response.statusText}`);
      }

      // Update progress
      uploadedChunks++;
      const progress = Math.round((uploadedChunks / totalChunks) * 100);
      setUploadProgress(prev => ({
        ...prev,
        [file.name]: progress
      }));

      // Save the final URL from the last chunk
      if (i === chunks.length - 1) {
        finalUrl = data.finalUrl;
      }
    }

    // After successful upload, add to uploadedFiles
    setUploadedFiles(prev => [...prev, { name: file.name, url: finalUrl }]);
    return finalUrl;
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
  setFiles(prev => [...prev, ...newFiles]);
  setIsUploading(true);
  
  try {
    for (const file of newFiles) {
      await uploadFile(file);
    }
  } catch (error) {
    console.error('Upload failed:', error);
    alert('Failed to upload some files. Please try again.');
  } finally {
    setIsUploading(false);
  }
};

const handleDrop = async (e) => {
  e.preventDefault();
  const droppedFiles = Array.from(e.dataTransfer.files);
  setFiles(prev => [...prev, ...droppedFiles]);
  setIsUploading(true);
  
  try {
    for (const file of droppedFiles) {
      await uploadFile(file);
    }
  } catch (error) {
    console.error('Upload failed:', error);
    alert('Failed to upload some files. Please try again.');
  } finally {
    setIsUploading(false);
  }
};

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Create New Project</h1>
        <p className="text-gray-600 mb-6 md:mb-8">Set up your project details and payment structure</p>

        {/* File Upload and Preview Section */}
        <div className="flex flex-col md:flex-row gap-4 md:gap-6 mb-6 md:mb-8">
          {/* Upload Area */}
          <div className="flex-1">
            <div
              onDrop={handleDrop}
              onDragOver={(e) => e.preventDefault()}
              className="h-64 md:h-96 border-2 border-dashed border-gray-200 rounded-xl p-4 md:p-8 
                       bg-white text-center hover:border-gray-300 transition-colors relative
                       flex flex-col items-center justify-center"
            >
              <input
                type="file"
                multiple
                onChange={handleFileChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <Upload className="w-10 h-10 md:w-12 md:h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-base md:text-lg font-medium text-gray-900 mb-2">
                Drop files here or click to upload
              </h3>
              <p className="text-sm text-gray-500 max-w-sm mx-auto">
                Upload your project files. We support multiple file uploads and all common formats.
              </p>
            </div>
          </div>

          {/* File Preview Area */}
          <div className="w-full md:w-96">
            <div className="bg-gray-100 rounded-xl p-4 md:p-6 h-64 md:h-96 overflow-y-auto">
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
                    uploadProgress={uploadProgress[file.name]}
                    fileUrl={uploadedFiles[index]?.url}
                  />
                  ))
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Project Details Box */}
        <div className="bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden backdrop-blur-sm">
          <div className="flex flex-col md:flex-row md:divide-x divide-gray-100">
            {/* Left Section - Project Details */}
            <div className="w-full md:w-1/2 p-4 md:p-8 bg-gradient-to-br from-white to-gray-50">
              <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-6 flex items-center">
                <span className="bg-black text-white rounded-lg w-8 h-8 inline-flex items-center justify-center mr-3 text-sm">01</span>
                Project Details
              </h3>
              
              <div className="space-y-4 md:space-y-6">
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
                    {['Direct Payment', "More Soon"].map((mode) => (
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
            <div className="w-full md:w-1/2 p-4 md:p-8 bg-gradient-to-br from-white to-gray-50">
              <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-6 flex items-center">
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
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="px-6 py-2 rounded-lg bg-black text-white hover:bg-gray-900 
                           transition-colors disabled:bg-gray-400"
                >
                  {isSubmitting ? 'Creating...' : 'Create Project'}
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


