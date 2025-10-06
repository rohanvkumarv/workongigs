
import React, { useState } from 'react';
import { Upload, X, Download, AlertCircle } from 'lucide-react';

const FileUploadComponent = ({ 
  onUploadComplete, 
  onFilesSelected, 
  onUploadError, 
  onUploadProgress,
  disabled = false 
}) => {
  const [files, setFiles] = useState([]);
  const [uploadProgress, setUploadProgress] = useState({});
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [errors, setErrors] = useState({});

  const CHUNK_SIZE = 5 * 1024 * 1024; // 5MB chunks as required by S3

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
      // Initialize progress at 0
      setUploadProgress(prev => ({
        ...prev,
        [file.name]: 0
      }));
      
      // Notify parent about upload progress
      if (onUploadProgress) {
        onUploadProgress(file.name, 0);
      }
  
      const parts = Math.ceil(file.size / CHUNK_SIZE);
      
      // Step 1: Initiate upload and get presigned URLs
      const initFormData = new FormData();
      initFormData.append("fileName", file.name);
      initFormData.append("fileType", file.type);
      initFormData.append("parts", parts.toString());
  
      const initResponse = await fetch("/api/upload", {
        method: "POST",
        body: initFormData,
      });
  
      if (!initResponse.ok) {
        throw new Error('Failed to initiate upload');
      }
  
      const { uploadId, key, presignedUrls } = await initResponse.json();
  
      // Track completed chunks count for progress
      let completedChunks = 0;
      const totalChunks = parts;
  
      const uploadPromises = presignedUrls.map(async (presignedUrl, index) => {
        const start = index * CHUNK_SIZE;
        const end = Math.min(start + CHUNK_SIZE, file.size);
        const chunk = file.slice(start, end);
  
        const uploadResponse = await fetch(presignedUrl, {
          method: "PUT",
          body: chunk,
        });
  
        if (!uploadResponse.ok) {
          throw new Error(`Failed to upload part ${index + 1}`);
        }
  
        // Update progress after each chunk
        completedChunks++;
        const progress = Math.round((completedChunks / totalChunks) * 100);
        
        setUploadProgress(prev => ({
          ...prev,
          [file.name]: progress
        }));
        
        // Notify parent about upload progress
        if (onUploadProgress) {
          onUploadProgress(file.name, progress);
        }
  
        // Get ETag from response headers
        const ETag = uploadResponse.headers.get("ETag").replace(/"/g, '');
        return {
          PartNumber: index + 1,
          ETag
        };
      });
  
      const uploadedParts = await Promise.all(uploadPromises);
  
      // Step 3: Complete multipart upload
      const completeResponse = await fetch("/api/complete-upload", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          uploadId,
          key,
          parts: uploadedParts,
        }),
      });
  
      if (!completeResponse.ok) {
        throw new Error('Failed to complete upload');
      }
  
      const { fileUrl } = await completeResponse.json();
      
      // Add to uploaded files
      const fileInfo = { name: file.name, url: fileUrl };
      setUploadedFiles(prev => [...prev, fileInfo]);
      
      // Notify parent that upload is complete
      if (onUploadComplete) {
        onUploadComplete(fileInfo);
      }
  
      return fileUrl;
    } catch (error) {
      console.error(`Error uploading ${file.name}:`, error);
      
      // Reset progress on error
      setUploadProgress(prev => ({
        ...prev,
        [file.name]: 0
      }));
      
      // Set error state
      setErrors(prev => ({
        ...prev,
        [file.name]: error.message
      }));
      
      // Notify parent about upload error
      if (onUploadError) {
        onUploadError(file, error);
      }
      
      throw error;
    }
  };
  
  const handleFileChange = async (e) => {
    if (disabled) return;
    
    const newFiles = Array.from(e.target.files);
    setFiles(prev => [...prev, ...newFiles]);
    
    // Notify parent that files were selected
    if (onFilesSelected) {
      onFilesSelected(newFiles);
    }
    
    // Upload each file
    for (const file of newFiles) {
      try {
        await uploadFile(file);
      } catch (error) {
        console.error(`Failed to upload ${file.name}:`, error);
        // Error is already handled in uploadFile function
      }
    }
  };

  const handleDrop = async (e) => {
    e.preventDefault();
    if (disabled) return;
    
    const droppedFiles = Array.from(e.dataTransfer.files);
    setFiles(prev => [...prev, ...droppedFiles]);
    
    // Notify parent that files were selected
    if (onFilesSelected) {
      onFilesSelected(droppedFiles);
    }
    
    // Upload each file
    for (const file of droppedFiles) {
      try {
        await uploadFile(file);
      } catch (error) {
        console.error(`Failed to upload ${file.name}:`, error);
        // Error is already handled in uploadFile function
      }
    }
  };

  const removeFile = (index) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
    setUploadProgress(prev => {
      const newProgress = { ...prev };
      delete newProgress[files[index].name];
      return newProgress;
    });
    setErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors[files[index].name];
      return newErrors;
    });
  };

  return (
    <div className="w-full">
      {/* Full Width Drop Zone */}
      <div
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        className={`w-full h-32 border-2 border-dashed rounded-xl p-6 
                   text-center transition-colors relative
                   flex flex-col items-center justify-center ${
                     disabled 
                       ? 'border-gray-200 bg-gray-50 cursor-not-allowed' 
                       : 'border-gray-200 bg-white hover:border-gray-300 cursor-pointer'
                   }`}
      >
        <input
          type="file"
          multiple
          onChange={handleFileChange}
          disabled={disabled}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
        />
        <Upload className={`w-8 h-8 mx-auto mb-2 ${disabled ? 'text-gray-300' : 'text-gray-400'}`} />
        <h3 className={`text-base font-medium mb-1 ${disabled ? 'text-gray-400' : 'text-gray-900'}`}>
          {disabled ? 'Upload disabled during submission' : 'Drop files here or click to upload'}
        </h3>
        <p className={`text-sm ${disabled ? 'text-gray-300' : 'text-gray-500'}`}>
          {disabled ? 'Please wait...' : 'Upload your files. We support multiple file uploads.'}
        </p>
      </div>
      
      {/* Show upload progress for files being uploaded */}
      {files.length > 0 && Object.keys(uploadProgress).length > 0 && (
        <div className="mt-3 space-y-2">
          {files.map((file, index) => {
            const progress = uploadProgress[file.name];
            const error = errors[file.name];
            const fileUrl = uploadedFiles[index]?.url;
            
            // Only show if currently uploading or has error
            if (progress === undefined && !error) return null;
            
            return (
              <div key={index} className="flex items-center gap-3 p-2 bg-gray-50 rounded-lg">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-sm font-medium text-gray-900 truncate">{file.name}</p>
                    <span className="text-xs text-gray-500">{progress}%</span>
                  </div>
                  {error ? (
                    <div className="flex items-center gap-1 text-red-600 text-xs">
                      <AlertCircle className="w-3 h-3" />
                      <span>{error}</span>
                    </div>
                  ) : (
                    <div className="w-full bg-gray-200 rounded-full h-1">
                      <div
                        className="bg-blue-600 h-1 rounded-full transition-all duration-300"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default FileUploadComponent;