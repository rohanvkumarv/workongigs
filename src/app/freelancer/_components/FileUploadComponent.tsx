
import React, { useState } from 'react';
import { Upload, X, Download } from 'lucide-react';

const FileUploadComponent = ({ onUploadComplete }) => {
  const [files, setFiles] = useState([]);
  const [uploadProgress, setUploadProgress] = useState({});
  const [uploadedFiles, setUploadedFiles] = useState([]);

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
        }),
      });

      if (!completeResponse.ok) {
        throw new Error('Failed to complete upload');
      }

      const result = await completeResponse.json();
      
      // Add to uploaded files
      const fileUrl = `${process.env.NEXT_PUBLIC_S3_BUCKET_URL}/${key}`;
      const fileInfo = { name: file.name, url: fileUrl };
      
      setUploadedFiles(prev => [...prev, fileInfo]);
      
      if (onUploadComplete) {
        onUploadComplete(fileInfo);
      }

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
    setFiles(prev => [...prev, ...newFiles]);
    
    try {
      for (const file of newFiles) {
        await uploadFile(file);
      }
    } catch (error) {
      console.error('Upload failed:', error);
      alert('Failed to upload some files. Please try again.');
    }
  };

  const handleDrop = async (e) => {
    e.preventDefault();
    const droppedFiles = Array.from(e.dataTransfer.files);
    setFiles(prev => [...prev, ...droppedFiles]);
    
    try {
      for (const file of droppedFiles) {
        await uploadFile(file);
      }
    } catch (error) {
      console.error('Upload failed:', error);
      alert('Failed to upload some files. Please try again.');
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
  };

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

  return (
    <div className="flex flex-col md:flex-row gap-4 md:gap-6">
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
            Upload your files. We support multiple file uploads.
          </p>
        </div>
      </div>

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
                  progress={uploadProgress[file.name]}
                  fileUrl={uploadedFiles[index]?.url}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FileUploadComponent;