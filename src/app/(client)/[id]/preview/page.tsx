
"use client"

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronLeft, ChevronRight, Download, CreditCard, 
  Check, FileText, Package, Info, X, StickyNote, Lock
} from 'lucide-react';

// Utility function for downloading files
const downloadFile = async (url, filename) => {
  try {
    const response = await fetch(url);
    const blob = await response.blob();
    const downloadUrl = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(downloadUrl);
  } catch (error) {
    console.error('Download failed:', error);
    alert('Failed to download file. Please try again.');
  }
};

// Utility function for downloading multiple files
const downloadAllFiles = async (files) => {
  try {
    for (const file of files) {
      await downloadFile(file.url, file.name);
      // Small delay between downloads to prevent browser issues
      await new Promise(resolve => setTimeout(resolve, 500));
    }
  } catch (error) {
    console.error('Bulk download failed:', error);
    alert('Failed to download all files. Please try individually.');
  }
};


// First, let's create an audio player component
const AudioPlayer = ({ url, filename }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef(null);

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setProgress((audioRef.current.currentTime / audioRef.current.duration) * 100);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleProgressClick = (e) => {
    const bounds = e.currentTarget.getBoundingClientRect();
    const percent = (e.clientX - bounds.left) / bounds.width;
    if (audioRef.current) {
      audioRef.current.currentTime = percent * audioRef.current.duration;
    }
  };

  return (
    <div className="w-full bg-black rounded-xl p-6 text-white">
      <div className="mb-4">
        <h3 className="text-lg font-medium truncate">{filename}</h3>
      </div>
      
      <audio 
        ref={audioRef}
        src={url}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        className="hidden"
      />

      {/* Progress Bar */}
      <div 
        className="h-1 bg-white/20 rounded-full mb-4 cursor-pointer"
        onClick={handleProgressClick}
      >
        <div 
          className="h-full bg-white rounded-full transition-all duration-200"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => {
              if (isPlaying) {
                audioRef.current?.pause();
              } else {
                audioRef.current?.play();
              }
            }}
            className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center
                     hover:bg-gray-100 transition-colors"
          >
            {isPlaying ? (
              <Pause className="w-6 h-6" />
            ) : (
              <Play className="w-6 h-6" />
            )}
          </button>
          <span className="text-sm">
            {formatTime(audioRef.current?.currentTime || 0)} / {formatTime(duration)}
          </span>
        </div>
        
        <button
          onClick={() => downloadFile(url, filename)}
          className="p-2 hover:bg-white/10 rounded-lg transition-colors"
        >
          <Download className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

// Update the FilePreview component to handle different file types
const FilePreview = ({ file, currentSlide, totalSlides, onNext, onPrev, isPaid }) => {
  const isAudio = file.type?.startsWith('audio/') || file.url?.match(/\.(mp3|wav|ogg|m4a)$/i);
  const isImage = file.type?.startsWith('image/') || file.url?.match(/\.(jpg|jpeg|png|gif|webp)$/i);

  return (
    <div className="relative h-full group">
      {isImage ? (
        <>
          <img
            src={file.url}
            alt={file.name}
            className={`w-full h-full object-cover transition-all duration-300 
                      ${!isPaid ? 'filter blur-sm' : ''}`}
          />
          
          {!isPaid && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/20 rounded-xl">
              <div className="text-center text-white">
                <Lock className="w-8 h-8 mx-auto mb-2" />
                <p className="font-medium">Payment Required to View Full Quality</p>
              </div>
            </div>
          )}
        </>
      ) : isAudio ? (
        <div className="h-full flex items-center justify-center">
          {isPaid ? (
            <AudioPlayer url={file.url} filename={file.name} />
          ) : (
            <div className="text-center">
              <Lock className="w-8 h-8 mx-auto mb-2 text-gray-400" />
              <p className="font-medium text-gray-500">Payment Required to Play Audio</p>
            </div>
          )}
        </div>
      ) : (
        <div className="h-full flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <FileText className="w-12 h-12 mx-auto mb-3 text-gray-400" />
            <p className="font-medium text-gray-600">{file.name}</p>
          </div>
        </div>
      )}
      
      {/* Navigation arrows for multiple files */}
      {totalSlides > 1 && (
        <>
          <button
            onClick={onPrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full
                     bg-white/90 hover:bg-white shadow-lg transition-all z-10"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={onNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full
                     bg-white/90 hover:bg-white shadow-lg transition-all z-10"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {Array.from({ length: totalSlides }).map((_, idx) => (
              <div
                key={idx}
                className={`h-1.5 rounded-full transition-all duration-300 
                          ${currentSlide === idx ? 'w-8 bg-black' : 'w-1.5 bg-black/20'}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

// Update the FilesList component to fix filename overflow
const FilesList = ({ files, downloadAllLabel }) => (
  <div className="space-y-4">
    <div className="space-y-2">
      {files.map((file) => (
        <motion.button
          key={file.id}
          onClick={() => downloadFile(file.url, file.name)}
          className="w-full p-3 bg-gray-50 rounded-xl flex items-center 
                   justify-between hover:bg-gray-100 transition-colors group"
        >
          <div className="flex items-center gap-3 min-w-0 flex-1">
            <div className="flex-shrink-0">
              <FileText className="w-4 h-4 text-gray-400" />
            </div>
            <div className="min-w-0 flex-1">
              <span className="text-sm font-medium block truncate" title={file.name}>
                {file.name}
              </span>
              <span className="text-xs text-gray-500">
                {formatFileSize(file.size)}
              </span>
            </div>
          </div>
          <Download className="w-4 h-4 flex-shrink-0 text-gray-400 group-hover:text-gray-600" />
        </motion.button>
      ))}
    </div>

    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => handleDownloadInstance(files)}
      className="w-full py-3 bg-black text-white rounded-xl font-medium
               flex items-center justify-center gap-2"
    >
      <Package className="w-5 h-5" />
      {downloadAllLabel}
    </motion.button>
  </div>
);

// Utility function to format file sizes
const formatFileSize = (bytes) => {
  if (!bytes) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
};




import {  Play, Pause } from 'lucide-react';

const MediaViewer = ({ currentFile, currentInstance, isInstancePaid, currentSlide, handlePrevSlide, handleNextSlide }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const getMediaType = (url) => {
    const audioExtensions = ['mp3', 'wav', 'ogg', 'm4a'];
    const videoExtensions = ['mp4', 'webm', 'mov'];
    const extension = url.split('.').pop().toLowerCase();
    
    if (audioExtensions.includes(extension)) return 'audio';
    if (videoExtensions.includes(extension)) return 'video';
    return 'image';
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    const audioElement = document.querySelector('audio');
    if (audioElement) {
      const handleTimeUpdate = () => {
        setProgress((audioElement.currentTime / audioElement.duration) * 100);
        setCurrentTime(audioElement.currentTime);
      };
      const handleLoadedMetadata = () => {
        setDuration(audioElement.duration);
      };
      
      audioElement.addEventListener('timeupdate', handleTimeUpdate);
      audioElement.addEventListener('loadedmetadata', handleLoadedMetadata);
      
      return () => {
        audioElement.removeEventListener('timeupdate', handleTimeUpdate);
        audioElement.removeEventListener('loadedmetadata', handleLoadedMetadata);
      };
    }
  }, []);

  const handlePlayPause = () => {
    const audioElement = document.querySelector('audio');
    if (audioElement) {
      if (isPlaying) {
        audioElement.pause();
      } else {
        audioElement.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleProgressClick = (e) => {
    const audioElement = document.querySelector('audio');
    if (audioElement) {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const percent = x / rect.width;
      const newTime = percent * audioElement.duration;
      audioElement.currentTime = newTime;
      setProgress(percent * 100);
    }
  };

  const renderAudioPlayer = () => (
    <div className="h-full flex items-center justify-center bg-white">
      <div className="w-full max-w-md mx-4">
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
          {/* Title */}
          <div className="px-4 pt-4">
            <h3 className="text-base font-medium text-gray-900 truncate">
              {currentFile.name || 'Now Playing'}
            </h3>
            <p className="text-sm text-gray-500">
              {formatTime(currentTime)} / {formatTime(duration)}
            </p>
          </div>

          {/* Progress Bar */}
          <div className="px-4 py-3">
            <div 
              className="w-full h-1 bg-gray-100 rounded-full cursor-pointer relative"
              onClick={handleProgressClick}
            >
              <div 
                className="absolute h-full bg-gray-900 rounded-full"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Controls */}
          <div className="px-4 pb-4 flex items-center justify-center">
            <button 
              onClick={handlePlayPause}
              className="p-2 rounded-full bg-gray-900 text-white hover:bg-gray-800 
                       transition-colors duration-200"
            >
              {isPlaying ? (
                <Pause className="w-4 h-4" />
              ) : (
                <Play className="w-4 h-4 ml-0.5" />
              )}
            </button>
          </div>

          <audio
            src={currentFile.url}
            preload="metadata"
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            className="hidden"
          />
        </div>
      </div>
    </div>
  );

  const renderMedia = () => {
    const mediaType = getMediaType(currentFile.url);
    const shouldBlur = !isInstancePaid && mediaType === 'image';
    const commonClassNames = `transition-all duration-300 ${shouldBlur ? 'filter blur-sm' : ''}`;

    switch (mediaType) {
      case 'audio':
        return renderAudioPlayer();
      
      case 'video':
        return (
          <video 
            className={`${commonClassNames} w-full h-full object-cover`}
            controls
            src={currentFile.url}
          >
            Your browser does not support the video element.
          </video>
        );
      
      default: // Image
        return (
          <img
            src={currentFile.url}
            alt={currentFile.name}
            className={`${commonClassNames} w-full h-full object-cover`}
          />
        );
    }
  };

  return (
    <div className="md:col-span-2">
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden aspect-[16/9]">
        <div className="relative h-full group">
          {renderMedia()}
          
          {!isInstancePaid && getMediaType(currentFile.url) === 'image' && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/20">
              <div className="text-center text-white px-4">
                <Lock className="w-6 h-6 mx-auto mb-2" />
                <p className="font-medium text-sm">Payment Required to View Full Quality</p>
              </div>
            </div>
          )}
          
          {currentInstance.files.length > 1 && (
            <>
              <button
                onClick={handlePrevSlide}
                className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full
                         bg-white/90 hover:bg-white shadow-sm transition-all z-10"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={handleNextSlide}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full
                         bg-white/90 hover:bg-white shadow-sm transition-all z-10"
              >
                <ChevronRight className="w-4 h-4" />
              </button>

              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
                {Array.from({ length: currentInstance.files.length }).map((_, idx) => (
                  <div
                    key={idx}
                    className={`h-1 rounded-full transition-all duration-300 
                              ${currentSlide === idx ? 'w-4 bg-gray-900' : 'w-1 bg-gray-300'}`}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};



const PreviewPayment = () => {
  const params = useParams();
  const projectId = params.id;
  
  const [selectedInstance, setSelectedInstance] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [projectData, setProjectData] = useState(null);
  const [downloading, setDownloading] = useState(false);

  useEffect(() => {
    const fetchProjectData = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/get-data-for-preview', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ projectId }),
        });
        
        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.error || 'Failed to fetch project data');
        }
        
        const { project } = await response.json();
        setProjectData(project);
      } catch (err) {
        console.error('Error fetching project:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (projectId) {
      fetchProjectData();
    }
  }, [projectId]);

  const initializeRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.async = true;
      script.onload = () => resolve(true);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async (amount, instanceId = null, payAllInstances = false) => {
    try {
      setLoading(true);
      await initializeRazorpay();

      const response = await fetch("/api/create-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount }),
      });

      const data = await response.json();

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: data.amount,
        currency: data.currency,
        name: "Project Payment",
        description: payAllInstances ? "All Instances Payment" : "Single Instance Payment",
        order_id: data.id,
        handler: async (res) => {
          const verifyData = {
            razorpay_order_id: res.razorpay_order_id,
            razorpay_payment_id: res.razorpay_payment_id,
            razorpay_signature: res.razorpay_signature,
            instanceId,
            projectId,
            payAllInstances
          };

          const verifyResponse = await fetch("/api/verify-payment", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(verifyData),
          });

          const result = await verifyResponse.json();

          if (result.success) {
            if (payAllInstances) {
              const updatedInstances = projectData.instances.map(instance => ({
                ...instance,
                paymentStatus: "Paid"
              }));
              setProjectData({ ...projectData, instances: updatedInstances });
            } else {
              const updatedInstances = [...projectData.instances];
              const index = updatedInstances.findIndex(i => i.id === instanceId);
              if (index !== -1) {
                updatedInstances[index] = {
                  ...updatedInstances[index],
                  paymentStatus: "Paid"
                };
                setProjectData({ ...projectData, instances: updatedInstances });
              }
            }
          } else {
            alert("Payment verification failed. Please contact support.");
          }
        },
        theme: {
          color: "#000000",
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (error) {
      console.error("Payment error:", error);
      alert("Payment failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-black border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (error || !projectData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
        <div className="bg-red-50 p-6 rounded-xl text-center max-w-md">
          <X className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-red-700 mb-2">Error Loading Project</h2>
          <p className="text-red-600">{error || 'Project not found'}</p>
        </div>
      </div>
    );
  }

  const handleInstanceChange = (idx) => {
    setSelectedInstance(idx);
    setCurrentSlide(0);
  };

  const handleNextSlide = () => {
    setCurrentSlide((prev) => 
      prev === projectData.instances[selectedInstance].files.length - 1 ? 0 : prev + 1
    );
  };

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => 
      prev === 0 ? projectData.instances[selectedInstance].files.length - 1 : prev - 1
    );
  };

  const handleDownloadInstance = async (files) => {
    setDownloading(true);
    try {
      await downloadAllFiles(files);
    } finally {
      setDownloading(false);
    }
  };

  const currentInstance = projectData.instances[selectedInstance];
  const currentFile = currentInstance.files[currentSlide];
  const isInstancePaid = currentInstance.paymentStatus === "Paid";
  const isSingleInstance = projectData.instances.length === 1;
  
  const unpaidInstances = projectData.instances.filter(instance => instance.paymentStatus === "Not Paid");
  const totalProjectPrice = unpaidInstances.reduce((sum, instance) => sum + instance.cost, 0);
  
  const handlePayInstance = () => handlePayment(currentInstance.cost, currentInstance.id, false);
  const handlePayProject = () => handlePayment(totalProjectPrice, null, true);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Continue with the JSX in the next artifact... */}
      {/* Black Header Section */}
      <div className="w-full bg-black text-white py-6 md:py-8 rounded-xl shadow-2xl">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <h1 className="text-2xl md:text-4xl font-bold text-center">
            Preview, Pay & Download Your Files
          </h1>
          <p className="text-center mt-2 text-gray-400 text-sm md:text-base">
            Payment Mode: {projectData.modeOfPay} | Status: {projectData.status}
          </p>
        </div>
      </div>

      {/* Project Header with Instances */}
      <div className="w-full bg-white/50 backdrop-blur-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 md:py-6">
          <div className="flex items-center gap-2 text-sm text-gray-400 mb-4 md:mb-6">
            <span>project</span>
            <span>/</span>
            <span className="text-gray-600 font-medium">{projectData.name}</span>
          </div>

          <div className="flex flex-wrap gap-2 md:gap-4">
            {projectData.instances.map((instance, idx) => (
              <button
                key={instance.id}
                onClick={() => handleInstanceChange(idx)}
                className={`px-4 md:px-8 py-2 md:py-3 rounded-xl md:rounded-2xl text-sm md:text-base 
                          font-medium transition-all duration-300 flex items-center gap-2
                          ${selectedInstance === idx 
                            ? 'bg-black text-white shadow-lg' 
                            : 'bg-white/80 text-gray-600 hover:bg-white'}`}
              >
                {instance.name}
                {instance.paymentStatus === "Paid" && (
                  <Check className="w-4 h-4 text-green-500" />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-6 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {/* Preview Section */}
          {/* <div className="md:col-span-2">
            <div className="bg-white rounded-xl md:rounded-2xl shadow-lg border border-gray-100 overflow-hidden
                          aspect-[16/9]">
              <div className="relative h-full group">
                <img
                  src={currentFile.url}
                  alt={currentFile.name}
                  className={`w-full h-full object-cover transition-all duration-300 
                            ${!isInstancePaid ? 'filter blur-sm' : ''}`}
                />
                
                {!isInstancePaid && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                    <div className="text-center text-white px-4">
                      <Lock className="w-8 h-8 mx-auto mb-2" />
                      <p className="font-medium text-sm md:text-base">Payment Required to View Full Quality</p>
                    </div>
                  </div>
                )}
                
                {currentInstance.files.length > 1 && (
                  <>
                    <button
                      onClick={handlePrevSlide}
                      className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 p-2 md:p-3 rounded-full
                               bg-white/90 hover:bg-white shadow-lg transition-all z-10"
                    >
                      <ChevronLeft className="w-4 h-4 md:w-5 md:h-5" />
                    </button>
                    <button
                      onClick={handleNextSlide}
                      className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 p-2 md:p-3 rounded-full
                               bg-white/90 hover:bg-white shadow-lg transition-all z-10"
                    >
                      <ChevronRight className="w-4 h-4 md:w-5 md:h-5" />
                    </button>

                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                      {Array.from({ length: currentInstance.files.length }).map((_, idx) => (
                        <div
                          key={idx}
                          className={`h-1.5 rounded-full transition-all duration-300 
                                    ${currentSlide === idx ? 'w-8 bg-black' : 'w-1.5 bg-black/20'}`}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div> */}
       <MediaViewer
  currentFile={currentFile}
  currentInstance={currentInstance}
  isInstancePaid={isInstancePaid}
  currentSlide={currentSlide}
  handlePrevSlide={handlePrevSlide}
  handleNextSlide={handleNextSlide}
/>


          {/* Right Sidebar */}
          <div className="space-y-4 md:space-y-6">
            {/* Payment/Download Box */}
            <div className="bg-white rounded-xl md:rounded-2xl p-4 md:p-6 shadow-lg border border-gray-100">
              <AnimatePresence mode="wait">
                {!isInstancePaid ? (
                  <motion.div
                    key="payment"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-4"
                  >
                    <div className="mb-6">
                      <p className="text-sm text-gray-500 mb-1">total payable amount</p>
                      <div className="flex items-baseline gap-2">
                        <span className="text-2xl md:text-3xl font-bold">₹{totalProjectPrice}</span>
                        {!isSingleInstance && currentInstance.cost > 0 && (
                          <>
                            <span className="text-gray-400">/</span>
                            <span className="text-lg md:text-xl text-gray-500">₹{currentInstance.cost}</span>
                          </>
                        )}
                      </div>
                      <p className="text-sm text-gray-500 mt-2">
                        {unpaidInstances.length} instance{unpaidInstances.length !== 1 ? 's' : ''} remaining
                      </p>
                    </div>

                    <div className="min-w-[300px] p-2 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border border-gray-200 shadow-sm">
                      <div className="flex items-center gap-2 mb-3">
                        <StickyNote className="w-5 h-5 text-gray-500" />
                        <h3 className="font-semibold text-gray-800">Description</h3>
                      </div>
                      <div className="bg-white p-4 rounded-xl shadow-inner">
                        <p className="text-sm leading-relaxed text-gray-600">{currentInstance.desc}</p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      {!isSingleInstance && currentInstance.cost > 0 && (
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={handlePayInstance}
                          className="w-full py-3 bg-black text-white rounded-xl font-medium
                                   flex items-center justify-center gap-2"
                        >
                          <CreditCard className="w-5 h-5" />
                          Pay for this Instance (₹{currentInstance.cost})
                        </motion.button>
                      )}

                      {totalProjectPrice > 0 && (
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={handlePayProject}
                          className={`w-full py-3 rounded-xl font-medium flex items-center justify-center gap-2
                                    ${isSingleInstance || !currentInstance.cost
                                      ? 'bg-black text-white'
                                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                        >
                          <Package className="w-5 h-5" />
                          Pay for Remaining Instances (₹{totalProjectPrice})
                        </motion.button>
                      )}
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="files"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-4"
                  >
                    {/* <div className="space-y-2">
                      {currentInstance.files.map((file: { id: string, url: string, name: string }) => (
                        <motion.button
                          key={file.id}
                          onClick={async () => {
                            try {
                              const response = await fetch(file.url);
                              const blob = await response.blob();
                              const url = window.URL.createObjectURL(blob);
                              const a = document.createElement('a');
                              a.href = url;
                              a.download = file.name;
                              document.body.appendChild(a);
                              a.click();
                              window.URL.revokeObjectURL(url);
                              document.body.removeChild(a);
                            } catch (error) {
                              console.error('Download failed:', error);
                            }
                          }}
                          className="w-full p-3 bg-gray-50 rounded-xl flex items-center 
                                   justify-between hover:bg-gray-100 transition-colors"
                        >
                          <div className="flex items-center gap-3 min-w-0 flex-1">
                            <FileText className="w-4 h-4 text-gray-400" />
                            <div className="min-w-0 flex-1">
                              <span className="text-sm font-medium block truncate">{file.name}</span>
                            </div>
                          </div>
                          <Download className="w-4 h-4" />
                        </motion.button>
                      ))}
                    </div> */}
  <div className="space-y-2">
  {/* Display existing files with functionality to open in a new window */}
  {currentInstance.files.map((file: { id: string, url: string, name: string }) => (
    <motion.button
      key={file.id}
      onClick={() => {
        window.open(file.url, '_blank');
      }}
      className="w-full p-3 bg-gray-50 rounded-xl flex items-center 
                justify-between hover:bg-gray-100 transition-colors"
    >
      <div className="flex items-center gap-3 min-w-0 flex-1">
        <FileText className="w-4 h-4 text-gray-400" />
        <div className="min-w-0 flex-1">
          <span className="text-sm font-medium block truncate">{file.name}</span>
        </div>
      </div>
      <Download className="w-4 h-4" />
    </motion.button>
  ))}
</div>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleDownloadInstance(currentInstance.files)}
                      disabled={downloading}
                      className="w-full py-3 bg-black text-white rounded-xl font-medium
                               flex items-center justify-center gap-2 disabled:bg-gray-400"
                    >
                      <Package className="w-5 h-5" />
                      {downloading ? 'Downloading...' : 'Download All Files'}
                    </motion.button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Paid Instance Status */}
            {isInstancePaid && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col md:flex-row items-center justify-between gap-2 text-green-600 
                          bg-green-50 p-4 rounded-xl"
              >
                <div className="flex items-center gap-2">
                  <Check className="w-5 h-5" />
                  <span className="font-medium">Instance Access Granted</span>
                </div>
                {unpaidInstances.length > 0 && (
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handlePayProject}
                    className="text-sm px-4 py-1 bg-green-100 hover:bg-green-200 
                             rounded-lg transition-colors"
                  >
                    Pay for Remaining Instances
                  </motion.button>
                )}
              </motion.div>
            )}

            {/* Status Information */}
            <div className="bg-gray-50 p-4 rounded-xl">
              <div className="flex items-center gap-2 mb-2">
                <Info className="w-5 h-5 text-gray-500" />
                <h3 className="font-medium text-gray-700">Instance Status</h3>
              </div>
              <div className="space-y-2">
                {projectData.instances.map((instance) => (
                  <div 
                    key={instance.id}
                    className="flex items-center justify-between text-sm"
                  >
                    <span className="text-gray-600">{instance.name}</span>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium
                      ${instance.paymentStatus === "Paid" 
                        ? 'bg-green-100 text-green-700'
                        : 'bg-gray-100 text-gray-700'}`}
                    >
                      {instance.paymentStatus}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreviewPayment;
