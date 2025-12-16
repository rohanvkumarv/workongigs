import React, { useState } from 'react';
import { Upload, X, Check, Loader2, FileText } from 'lucide-react';

const FileUploadComponent = ({ 
  onUploadComplete, 
  onFilesSelected, 
  onUploadError, 
  disabled = false,
  compact = false 
}) => {
  const [uploading, setUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const CHUNK_SIZE = 5 * 1024 * 1024; // 5MB chunks

  const uploadFile = async (file) => {
    try {
      const parts = Math.ceil(file.size / CHUNK_SIZE);
      
      // Step 1: Initiate upload
      const initFormData = new FormData();
      initFormData.append("fileName", file.name);
      initFormData.append("fileType", file.type);
      initFormData.append("parts", parts.toString());

      const initResponse = await fetch("/api/upload", {
        method: "POST",
        body: initFormData,
      });

      if (!initResponse.ok) throw new Error('Failed to initiate upload');

      const { uploadId, key, presignedUrls } = await initResponse.json();

      // Step 2: Upload chunks
      const uploadPromises = presignedUrls.map(async (presignedUrl, index) => {
        const start = index * CHUNK_SIZE;
        const end = Math.min(start + CHUNK_SIZE, file.size);
        const chunk = file.slice(start, end);

        const uploadResponse = await fetch(presignedUrl, {
          method: "PUT",
          body: chunk,
        });

        if (!uploadResponse.ok) throw new Error(`Failed to upload part ${index + 1}`);

        const ETag = uploadResponse.headers.get("ETag").replace(/"/g, '');
        return { PartNumber: index + 1, ETag };
      });

      const uploadedParts = await Promise.all(uploadPromises);

      // Step 3: Complete upload
      const completeResponse = await fetch("/api/complete-upload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ uploadId, key, parts: uploadedParts }),
      });

      if (!completeResponse.ok) throw new Error('Failed to complete upload');

      const { fileUrl } = await completeResponse.json();
      
      const fileInfo = { 
        name: file.name, 
        url: fileUrl,
        size: file.size,
        type: file.type
      };
      
      if (onUploadComplete) {
        onUploadComplete(fileInfo);
      }

      return fileUrl;
    } catch (error) {
      console.error(`Error uploading ${file.name}:`, error);
      if (onUploadError) {
        onUploadError(file, error);
      }
      throw error;
    }
  };

  const handleFiles = async (fileList) => {
    if (disabled) return;
    
    const newFiles = Array.from(fileList);
    
    if (onFilesSelected) {
      onFilesSelected(newFiles);
    }
    
    setUploading(true);
    
    for (const file of newFiles) {
      try {
        await uploadFile(file);
      } catch (error) {
        console.error(`Failed to upload ${file.name}:`, error);
      }
    }
    
    setUploading(false);
  };

  const handleFileChange = (e) => {
    handleFiles(e.target.files);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    handleFiles(e.dataTransfer.files);
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  if (compact) {
    return (
      <label className={`block w-full cursor-pointer ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}>
        <input
          type="file"
          multiple
          onChange={handleFileChange}
          disabled={disabled}
          className="hidden"
        />
        <div className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-2">
          <Upload className="w-4 h-4" />
          <span>Add more files</span>
        </div>
      </label>
    );
  }

  return (
    <div className="w-full">
      <div
        onDrop={handleDrop}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        className={`
          relative border-2 border-dashed rounded-xl transition-all
          ${dragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-200 bg-gray-50'}
          ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:border-gray-300 cursor-pointer'}
        `}
      >
        <input
          type="file"
          multiple
          onChange={handleFileChange}
          disabled={disabled}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed z-10"
        />
        
        <div className="p-8 text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
            <Upload className="w-8 h-8 text-blue-600" />
          </div>
          
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            {uploading ? 'Uploading...' : 'Drop your files here'}
          </h3>
          
          <p className="text-sm text-gray-500 mb-4">
            {uploading ? 'Please wait while we upload your files' : 'or click to browse'}
          </p>
          
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700">
            <Upload className="w-4 h-4" />
            <span>Select Files</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FileUploadComponent;