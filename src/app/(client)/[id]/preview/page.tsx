
"use client"

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronLeft, ChevronRight, Download, CreditCard, 
  Check, FileText, Package, Info, X, StickyNote, Lock,
  Play, Pause, Loader, ChevronUp, ChevronDown
} from 'lucide-react';
import { useParams, useSearchParams, useRouter } from 'next/navigation';
import DevToolsBlocker from '@/components/DevToolsBlocker'; // Adjust path as needed

// Helper function to determine if files can be downloaded
const canDownloadFiles = (delivery, paymentMode) => {
  // Allow download if already paid or if payment mode is "Pay Later"
  return delivery.paymentStatus === "Paid" || paymentMode === "Pay Later";
};

// Progress notification component for payments
const PaymentProgress = ({ status, message, onClose }) => {
  const getStatusColor = () => {
    switch (status) {
      case 'success':
        return 'bg-green-50 border-green-200';
      case 'error':
        return 'bg-red-50 border-red-200';
      default:
        return 'bg-blue-50 border-blue-200';
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="fixed top-4 right-4 z-50"
      >
        <div className={`p-4 rounded-lg border shadow-lg ${getStatusColor()}`}>
          <div className="flex items-center gap-3">
            {status === 'success' ? (
              <Check className="w-5 h-5 text-green-600" />
            ) : status === 'error' ? (
              <X className="w-5 h-5 text-red-600" />
            ) : (
              <Loader className="w-5 h-5 text-blue-600 animate-spin" />
            )}
            <p className={`text-sm font-medium ${
              status === 'success' ? 'text-green-700' : 
              status === 'error' ? 'text-red-700' : 
              'text-blue-700'
            }`}>
              {message}
            </p>
            {status !== 'processing' && (
              <button
                onClick={onClose}
                className="ml-2 text-gray-400 hover:text-gray-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

// Download progress component with conditional color
const DownloadProgress = ({ 
  isVisible,
  progress, 
  fileName, 
  status,
  totalFiles,
  currentFileIndex
}) => {
  if (!isVisible) return null;

  const getStatusColor = () => {
    switch (status) {
      case 'completed':
        return 'bg-green-500';
      case 'error':
        return 'bg-red-500';
      default:
        return 'bg-black';
    }
  };

  const getIcon = () => {
    switch (status) {
      case 'completed':
        return <Check className="w-5 h-5" />;
      case 'error':
        return <X className="w-5 h-5" />;
      default:
        return <Download className="w-5 h-5" />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      className="fixed bottom-4 right-4 bg-white rounded-lg shadow-xl border 
                 border-gray-200 p-4 max-w-sm w-full z-50"
    >
      <div className="mb-3">
        <div className="flex items-center justify-between mb-1">
          <span className="text-sm font-medium text-gray-700">
            {status === 'downloading' 
              ? `Downloading ${currentFileIndex + 1}/${totalFiles}`
              : status.charAt(0).toUpperCase() + status.slice(1)}
          </span>
          <span className="text-sm text-gray-500">{`${Math.round(progress)}%`}</span>
        </div>
        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
            className={`h-full ${getStatusColor()}`}
          />
        </div>
      </div>

      <div className="flex items-center gap-2 text-sm text-gray-600">
        {getIcon()}
        <span className="truncate">{fileName}</span>
      </div>
    </motion.div>
  );
};

// Audio Preview Component with conditional styling
const AudioPreview = ({ url, filename, isPaid, isPayLater }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const audioRef = useRef(null);

  // Get the appropriate theme color based on payment status
  const getThemeColor = () => {
    if (isPaid) return 'bg-green-500 hover:bg-green-600';
    if (isPayLater) return 'bg-blue-500 hover:bg-blue-600';
    return 'bg-black hover:bg-gray-800';
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    if (audioRef.current) {
      const handleTimeUpdate = () => {
        const current = audioRef.current.currentTime;
        setCurrentTime(current);
        setProgress((current / audioRef.current.duration) * 100);
      };

      const handleLoadedMetadata = () => {
        setDuration(audioRef.current.duration);
        setIsLoading(false);
      };

      const handleEnded = () => {
        setIsPlaying(false);
        setProgress(0);
        audioRef.current.currentTime = 0;
      };

      audioRef.current.addEventListener('timeupdate', handleTimeUpdate);
      audioRef.current.addEventListener('loadedmetadata', handleLoadedMetadata);
      audioRef.current.addEventListener('ended', handleEnded);

      return () => {
        if (audioRef.current) {
          audioRef.current.removeEventListener('timeupdate', handleTimeUpdate);
          audioRef.current.removeEventListener('loadedmetadata', handleLoadedMetadata);
          audioRef.current.removeEventListener('ended', handleEnded);
        }
      };
    }
  }, []);

  const handlePlayPause = () => {
    if (isPlaying) {
      audioRef.current?.pause();
    } else {
      audioRef.current?.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleProgressClick = (e) => {
    if (audioRef.current) {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const percent = x / rect.width;
      const newTime = percent * audioRef.current.duration;
      audioRef.current.currentTime = newTime;
    }
  };

  return (
    <div className="w-full h-full flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md mx-4">
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden p-6">
          <div className="mb-4">
            <h3 className="text-base font-medium text-gray-900 truncate">
              {filename}
            </h3>
            <div className="text-sm text-gray-500">
              {isLoading ? (
                <span>Loading audio...</span>
              ) : (
                <span>{formatTime(currentTime)} / {formatTime(duration)}</span>
              )}
            </div>
          </div>

          <div className="mb-4">
            <div 
              className="w-full h-2 bg-gray-200 rounded-full cursor-pointer relative overflow-hidden"
              onClick={handleProgressClick}
            >
              <div 
                className={`absolute h-full transition-all duration-100 ${
                  isPaid ? 'bg-green-500' : isPayLater ? 'bg-blue-500' : 'bg-black'
                }`}
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          <div className="flex justify-center">
            <button 
              onClick={handlePlayPause}
              disabled={isLoading}
              className={`p-3 rounded-full text-white transition-colors duration-200 
                       disabled:bg-gray-400 ${getThemeColor()}`}
            >
              {isPlaying ? (
                <Pause className="w-5 h-5" />
              ) : (
                <Play className="w-5 h-5 ml-0.5" />
              )}
            </button>
          </div>

          <audio
            ref={audioRef}
            src={url}
            preload="metadata"
            className="hidden"
          />
        </div>
      </div>
    </div>
  );
};
// Custom Video Player Component with protected controls
// Custom Video Player Component with protected controls
const CustomVideoPlayer = ({ url, isPaid, isPayLater }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const videoRef = useRef(null);

  // Get the appropriate theme color based on payment status
  const getThemeColor = () => {
    if (isPaid) return 'bg-green-500 hover:bg-green-600';
    if (isPayLater) return 'bg-blue-500 hover:bg-blue-600';
    return 'bg-black hover:bg-gray-800';
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    if (videoRef.current) {
      const handleTimeUpdate = () => {
        const current = videoRef.current.currentTime;
        setCurrentTime(current);
        setProgress((current / videoRef.current.duration) * 100);
      };

      const handleLoadedMetadata = () => {
        setDuration(videoRef.current.duration);
        setIsLoading(false);
      };

      const handleEnded = () => {
        setIsPlaying(false);
        setProgress(0);
        videoRef.current.currentTime = 0;
      };

      videoRef.current.addEventListener('timeupdate', handleTimeUpdate);
      videoRef.current.addEventListener('loadedmetadata', handleLoadedMetadata);
      videoRef.current.addEventListener('ended', handleEnded);

      return () => {
        if (videoRef.current) {
          videoRef.current.removeEventListener('timeupdate', handleTimeUpdate);
          videoRef.current.removeEventListener('loadedmetadata', handleLoadedMetadata);
          videoRef.current.removeEventListener('ended', handleEnded);
        }
      };
    }
  }, []);

  const handlePlayPause = () => {
    if (isPlaying) {
      videoRef.current?.pause();
    } else {
      videoRef.current?.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleProgressClick = (e) => {
    if (videoRef.current) {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const percent = x / rect.width;
      const newTime = percent * videoRef.current.duration;
      videoRef.current.currentTime = newTime;
    }
  };

  // Skip forward/backward by 10 seconds
  const handleSkipForward = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = Math.min(videoRef.current.currentTime + 10, videoRef.current.duration);
    }
  };

  const handleSkipBackward = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = Math.max(videoRef.current.currentTime - 10, 0);
    }
  };

  return (
    <div className="relative w-full h-full">
      {/* Video element without controls */}
      <video
        ref={videoRef}
        src={url}
        className="w-full h-full object-cover"
        preload="metadata"
        playsInline
        // No 'controls' attribute - we're using our own
      />

      {/* Custom controls overlay - higher z-index to appear above watermark */}
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-4 z-20">
        {/* Progress bar */}
        <div 
          className="w-full h-2 bg-gray-500/50 rounded-full cursor-pointer relative overflow-hidden mb-2"
          onClick={handleProgressClick}
        >
          <div 
            className={`absolute h-full transition-all duration-100 ${
              isPaid ? 'bg-green-500' : isPayLater ? 'bg-blue-500' : 'bg-white'
            }`}
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Time and controls */}
        <div className="flex items-center justify-between">
          {/* Time display */}
          <div className="text-xs text-white">
            {isLoading ? (
              <span>Loading...</span>
            ) : (
              <span>{formatTime(currentTime)} / {formatTime(duration)}</span>
            )}
          </div>

          {/* Control buttons */}
          <div className="flex items-center gap-3">
            {/* Skip backward button */}
            <button 
              onClick={handleSkipBackward}
              className="p-1.5 rounded-full text-white bg-black/30 hover:bg-black/50 transition-colors"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 20V4M5 12L12 4L19 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" transform="rotate(90 12 12)"/>
              </svg>
            </button>
            
            {/* Play/pause button */}
            <button 
              onClick={handlePlayPause}
              disabled={isLoading}
              className={`p-3 rounded-full text-white transition-colors duration-200 
                       disabled:bg-gray-500 ${getThemeColor()}`}
            >
              {isPlaying ? (
                <Pause className="w-4 h-4" />
              ) : (
                <Play className="w-4 h-4 ml-0.5" />
              )}
            </button>
            
            {/* Skip forward button */}
            <button 
              onClick={handleSkipForward}
              className="p-1.5 rounded-full text-white bg-black/30 hover:bg-black/50 transition-colors"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 4V20M19 12L12 20L5 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" transform="rotate(90 12 12)"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
// Media Viewer Component
const MediaViewer = ({ 
  currentFile, 
  currentDelivery, 
  isDeliveryPaid, 
  paymentMode,
  currentSlide, 
  handlePrevSlide, 
  handleNextSlide 
}) => {
  const getMediaType = (url) => {
    const audioExtensions = ['mp3', 'wav', 'ogg', 'm4a'];
    const videoExtensions = ['mp4', 'webm', 'mov','mkv'];
    const extension = url.split('.').pop().toLowerCase();
    
    if (audioExtensions.includes(extension)) return 'audio';
    if (videoExtensions.includes(extension)) return 'video';
    return 'image';
  };

  // Determine if this file can be downloaded (paid or Pay Later)
  const canDownload = canDownloadFiles(currentDelivery, paymentMode);

  // Get the status color based on payment status and mode
  const getStatusColor = () => {
    if (isDeliveryPaid) return 'bg-green-500 text-white';
    if (paymentMode === 'Pay Later') return 'bg-blue-500 text-white';
    return 'bg-black text-white';
  };

  // WatermarkOverlay Component with lower z-index (below controls)
const WatermarkOverlay = ({ isPaid }) => {
  // Much more subtle watermark settings
  const opacity = isPaid ? 0.08 : 0.15;
  const size = isPaid ? '200px' : '180px';
  
  return (
    <div 
      className="absolute inset-0 pointer-events-none z-10" // Lower z-index so controls appear above
      style={{
        backgroundImage: 'url(/watermark/logo.png)',
        backgroundSize: size,
        backgroundRepeat: 'repeat',
        backgroundPosition: 'center',
        mixBlendMode: 'soft-light',
        opacity: opacity
      }}
    />
  );
};

// WatermarkCorner Component with lower z-index (below controls)
// const WatermarkCorner = () => {
//   return (
//     <div className="absolute bottom-4 right-4 pointer-events-none z-10 opacity-25 w-16 h-16"> // Lower z-index
//       <img 
//         src="/watermark/logo.png" 
//         alt="" 
//         className="w-full h-full object-contain"
//       />
//     </div>
//   );
// };

// Payment banner with higher z-index to ensure it's above controls
const PaymentBanner = ({ message }) => {
  return (
    <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-center py-2 z-20">
      <div className="flex items-center justify-center gap-2">
        <Lock className="w-4 h-4" />
        <p className="text-sm font-medium">{message}</p>
      </div>
    </div>
  );
};

const renderMedia = () => {
  const mediaType = getMediaType(currentFile.url);

  switch (mediaType) {
    case 'audio':
      return (
        <AudioPreview 
          url={currentFile.url}
          filename={currentFile.name}
          isPaid={isDeliveryPaid}
          isPayLater={paymentMode === 'Pay Later'}
        />
      );
    
    case 'video':
      // Apply very light blur filter for unpaid content
      const videoBlur = !canDownload ? 'filter blur-[0.8px]' : '';
      
      return (
        <div className="relative h-full w-full flex items-center justify-center overflow-hidden">
          {/* Use our Custom Video Player instead of standard video element */}
          <div className={`w-full h-full ${videoBlur}`}>
            <CustomVideoPlayer 
              url={currentFile.url}
              isPaid={isDeliveryPaid}
              isPayLater={paymentMode === 'Pay Later'}
            />
          </div>
          
          {/* Add watermark overlay for all videos (z-index: 10) */}
          <WatermarkOverlay isPaid={canDownload} />
          
          {/* Add a single corner watermark (z-index: 10) */}
          {/* <WatermarkCorner /> */}
          
          {/* Show payment banner for unpaid content (z-index: 40) */}
          {!canDownload && (
            <PaymentBanner message="Pay to view full quality video" />
          )}
        </div>
      );
    
    default: // Image
      // Apply light blur filter for unpaid content, but still show preview
      const imageBlur = !canDownload ? 'filter blur-[1.5px]' : '';
      
      return (
        <div className="relative w-full h-full">
          <img
            src={currentFile.url}
            alt={currentFile.name}
            className={`w-full h-full object-cover ${imageBlur}`}
          />
          
          {/* Add watermark overlay for all images (z-index: 10) */}
          <WatermarkOverlay isPaid={canDownload} />
          
          {/* Add a single corner watermark (z-index: 10) */}
          {/* <WatermarkCorner /> */}
          
          {/* Show payment banner for unpaid content (z-index: 40) */}
          {!canDownload && (
            <PaymentBanner message="Pay to view full quality image" />
          )}
        </div>
      );
  }
};
  return (
    <div className="md:col-span-2">
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
        {/* Delivery Name Banner with conditional styling */}
        <div className={`px-4 py-2 ${getStatusColor()}`}>
          <h2 className="text-lg font-medium flex items-center gap-2">
            {currentDelivery.name}
            {isDeliveryPaid && <Check className="w-4 h-4" />}
            {!isDeliveryPaid && paymentMode === 'Pay Later' && <span className="text-xs bg-white text-blue-500 px-2 py-0.5 rounded-full">Pay Later</span>}
          </h2>
        </div>
        
        {/* Media Content */}
        <div className="relative aspect-[16/9]">
          <div className="absolute inset-0">
            {renderMedia()}
          </div>
          
          {currentDelivery.files.length > 1 && (
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
                {Array.from({ length: currentDelivery.files.length }).map((_, idx) => (
                  <div
                    key={idx}
                    className={`h-1 rounded-full transition-all duration-300 
                              ${currentSlide === idx 
                                ? `w-4 ${isDeliveryPaid ? 'bg-green-500' : paymentMode === 'Pay Later' ? 'bg-blue-500' : 'bg-black'}` 
                                : 'w-1 bg-gray-300'}`}
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

// Latest Revision Display Component
const LatestRevisionDisplay = ({ 
  deliveryId, 
  revisions = [] 
}) => {
  // Get the latest revision for the current delivery
  const latestRevision = revisions && revisions.length 
    ? revisions.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))[0]
    : null;
    
  // Get the latest response if available
  const latestResponse = latestRevision?.responses && latestRevision.responses.length 
    ? latestRevision.responses.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))[0]
    : null;
    
  if (!latestRevision) return null;
  
  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'accepted':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'rejected':
        return 'bg-red-100 text-red-700 border-red-200';
      default:
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
    }
  };
  
  const formattedDate = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <StickyNote className="w-5 h-5 text-gray-500" />
          <h3 className="font-medium text-gray-700">Latest Revision</h3>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(latestRevision.status)}`}>
          {latestRevision.status}
        </span>
      </div>
      
      <div className="p-4">
        {/* Revision Request */}
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs text-gray-500">
              Requested on {formattedDate(latestRevision.createdAt)}
            </span>
          </div>
          <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">
            <p className="text-sm text-gray-700">{latestRevision.message}</p>
          </div>
        </div>
        
        {/* Latest Response */}
        {latestResponse && (
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs text-gray-500">
                Response on {formattedDate(latestResponse.createdAt)}
              </span>
            </div>
            <div className="bg-blue-50 p-3 rounded-lg border border-blue-100">
              <p className="text-sm text-gray-700">{latestResponse.message}</p>
            </div>
          </div>
        )}
        
        {/* "View All" Button */}
        <button 
          onClick={() => document.getElementById('revisionRequestToggle')?.click()}
          className="w-full mt-4 py-2 text-sm text-blue-600 hover:text-blue-800 
                   bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
        >
          View All Revisions
        </button>
      </div>
    </div>
  );
};

// Revision Request Component
const RevisionRequest = ({ 
  clientId, 
  deliveryId, 
  deliveryName, 
  revisions = [], 
  onNewRevision 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [revisionText, setRevisionText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [revisionStatus, setRevisionStatus] = useState({
    show: false,
    status: '',
    message: ''
  });

  const handleSubmitRevision = async () => {
    if (!revisionText.trim()) {
      setRevisionStatus({
        show: true,
        status: 'error',
        message: 'Please enter revision details'
      });
      return;
    }

    setIsSubmitting(true);
    setRevisionStatus({
      show: true,
      status: 'processing',
      message: 'Submitting revision request...'
    });

    try {
      const response = await fetch('/api/request-revision', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          clientId,
          deliveryId,
          message: revisionText
        }),
      });
      
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to submit revision request');
      }
      
      const { revision } = await response.json();
      
      setRevisionStatus({
        show: true,
        status: 'success',
        message: 'Revision request submitted successfully!'
      });
      
      setRevisionText('');
      
      // Call the callback to update the parent component with the new revision
      if (onNewRevision) {
        onNewRevision(revision);
      }

      // Hide the status message after 3 seconds
      setTimeout(() => {
        setRevisionStatus({
          show: false,
          status: '',
          message: ''
        });
      }, 3000);
    } catch (error) {
      console.error('Error submitting revision:', error);
      setRevisionStatus({
        show: true,
        status: 'error',
        message: error.message || 'Failed to submit revision request'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return 'bg-green-100 text-green-700';
      case 'accepted':
        return 'bg-blue-100 text-blue-700';
      case 'rejected':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-yellow-100 text-yellow-700';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <button
        id="revisionRequestToggle" // Added ID to access from other components
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-3 flex items-center justify-between 
                 hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-center gap-2">
          <StickyNote className={`w-5 h-5 ${isOpen ? 'text-blue-500' : 'text-gray-500'}`} />
          <h3 className={`font-medium ${isOpen ? 'text-blue-600' : 'text-gray-700'}`}>
            Request Revision for "{deliveryName}"
          </h3>
        </div>
        {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="p-4 space-y-4">
              {/* New Revision Form */}
              <div className="space-y-3">
                <h4 className="text-sm font-medium text-gray-700">
                  Tell us what changes you need:
                </h4>
                <textarea
                  value={revisionText}
                  onChange={(e) => setRevisionText(e.target.value)}
                  placeholder="Please describe what needs to be revised in detail..."
                  className="w-full rounded-lg border border-gray-300 p-3 h-32 text-sm
                           focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <div className="flex items-center justify-between">
                  <button
                    onClick={() => setShowHistory(!showHistory)}
                    className="text-sm text-gray-600 hover:text-gray-800"
                  >
                    {showHistory ? 'Hide Revision History' : 'Show Revision History'}
                  </button>
                  <button
                    onClick={handleSubmitRevision}
                    disabled={isSubmitting || !revisionText.trim()}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg
                             text-sm font-medium hover:bg-blue-600 transition-colors
                             disabled:bg-gray-300 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit Revision Request'}
                  </button>
                </div>
                
                {/* Status Message */}
                {revisionStatus.show && (
                  <div className={`p-3 rounded-lg text-sm ${
                    revisionStatus.status === 'success' ? 'bg-green-50 text-green-700' : 
                    revisionStatus.status === 'error' ? 'bg-red-50 text-red-700' : 
                    'bg-blue-50 text-blue-700'
                  }`}>
                    <div className="flex items-center gap-2">
                      {revisionStatus.status === 'success' ? (
                        <Check className="w-4 h-4" />
                      ) : revisionStatus.status === 'error' ? (
                        <X className="w-4 h-4" />
                      ) : (
                        <Loader className="w-4 h-4 animate-spin" />
                      )}
                      <span>{revisionStatus.message}</span>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Revision History */}
              <AnimatePresence>
                {showHistory && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden space-y-3"
                  >
                    <h4 className="text-sm font-medium text-gray-700 border-t pt-3">
                      Revision History
                    </h4>
                    
                    {revisions.length === 0 ? (
                      <p className="text-sm text-gray-500 italic">
                        No revision requests yet
                      </p>
                    ) : (
                      <div className="space-y-3 max-h-64 overflow-y-auto pr-2">
                        {revisions.map((revision) => (
                          <div
                            key={revision.id}
                            className="bg-gray-50 p-3 rounded-lg border border-gray-100 space-y-2"
                          >
                            <div className="flex items-center justify-between">
                              <span className="text-xs text-gray-500">
                                {new Date(revision.createdAt).toLocaleString()}
                              </span>
                              <span className={`px-2 py-0.5 rounded-full text-xs font-medium
                                ${getStatusColor(revision.status)}`}>
                                {revision.status}
                              </span>
                            </div>
                            <p className="text-sm text-gray-700">
                              {revision.message}
                            </p>
                            
                            {/* Responses from freelancer */}
                            {revision.responses && revision.responses.length > 0 && (
                              <div className="mt-2 pt-2 border-t border-gray-200">
                                <p className="text-xs text-gray-500 mb-2">Responses:</p>
                                <div className="space-y-2">
                                  {revision.responses.map((response, idx) => (
                                    <div key={idx} className="bg-blue-50 p-2 rounded text-xs text-gray-700">
                                      <div className="flex justify-between items-start mb-1">
                                        <span className="text-xs text-gray-500">
                                          {new Date(response.createdAt).toLocaleString()}
                                        </span>
                                      </div>
                                      <p>{response.message}</p>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Main Preview Payment Component
const PreviewPayment = () => {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  const clientId = params.id;
  const urlDeliveryName = searchParams.get('delivery');

  // States
  const [showMore, setShowMore] = useState(false);
  const [selectedDelivery, setSelectedDelivery] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [clientData, setClientData] = useState(null);
  const [downloading, setDownloading] = useState(false);
  const [showOtherDeliveries, setShowOtherDeliveries] = useState(true);
  const [revisions, setRevisions] = useState({});
  const [downloadProgress, setDownloadProgress] = useState({
    isVisible: false,
    progress: 0,
    fileName: '',
    status: 'downloading',
    totalFiles: 0,
    currentFileIndex: 0
  });
  const [paymentStatus, setPaymentStatus] = useState({
    show: false,
    status: '',
    message: ''
  });

  // Update selectedDelivery when URL changes
  useEffect(() => {
    if (clientData && urlDeliveryName) {
      const deliveryIndex = clientData.deliveries.findIndex(
        d => d.name.toLowerCase() === decodeURIComponent(urlDeliveryName).toLowerCase()
      );
      if (deliveryIndex !== -1) {
        setSelectedDelivery(deliveryIndex);
        setShowOtherDeliveries(false);
      }
    }
  }, [clientData, urlDeliveryName]);

  // Fetch client data
  useEffect(() => {
    const fetchClientData = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/get-data-for-preview', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ clientId }),
        });
        
        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.error || 'Failed to fetch client data');
        }
        
        const { client } = await response.json();
        setClientData(client);
        
        if (urlDeliveryName) {
          const deliveryIndex = client.deliveries.findIndex(
            d => d.name.toLowerCase() === decodeURIComponent(urlDeliveryName).toLowerCase()
          );
          if (deliveryIndex !== -1) {
            setSelectedDelivery(deliveryIndex);
            setShowOtherDeliveries(false);
          }
        }
      } catch (err) {
        console.error('Error fetching client:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (clientId) {
      fetchClientData();
    }
  }, [clientId, urlDeliveryName]);
  
  // Fetch revisions
  useEffect(() => {
    const fetchRevisions = async () => {
      if (!clientId) return;
      
      try {
        const response = await fetch('/api/get-revisions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ clientId }),
        });
        
        if (!response.ok) {
          throw new Error('Failed to fetch revisions');
        }
        
        const { revisions } = await response.json();
        
        // Organize revisions by deliveryId
        const revisionsByDelivery = {};
        revisions.forEach(revision => {
          if (!revisionsByDelivery[revision.deliveryId]) {
            revisionsByDelivery[revision.deliveryId] = [];
          }
          revisionsByDelivery[revision.deliveryId].push(revision);
        });
        
        setRevisions(revisionsByDelivery);
      } catch (error) {
        console.error('Error fetching revisions:', error);
      }
    };

    fetchRevisions();
  }, [clientId]);

  // Handle delivery change
  const handleDeliveryChange = (idx) => {
    const newDeliveryName = encodeURIComponent(clientData.deliveries[idx].name);
    const newUrl = `/${clientId}/preview?delivery=${newDeliveryName}`;
    window.history.replaceState({ ...window.history.state, as: newUrl, url: newUrl }, '', newUrl);
    setSelectedDelivery(idx);
    setCurrentSlide(0);
  };

  const downloadFile = async (url, filename, index, total) => {
    try {
      const response = await fetch(url);
      const contentLength = response.headers.get('content-length');
      const total = parseInt(contentLength, 10);
      let loaded = 0;

      const reader = response.body.getReader();
      const chunks = [];

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        chunks.push(value);
        loaded += value.length;
        
        const progress = (loaded / total) * 100;
        setDownloadProgress(prev => ({
          ...prev,
          progress,
          fileName: filename,
          currentFileIndex: index
        }));
      }

      const blob = new Blob(chunks);
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
      setDownloadProgress(prev => ({
        ...prev,
        status: 'error',
        fileName: `Failed to download ${filename}`
      }));
      throw error;
    }
  };

  const handleDownloadDelivery = async (files) => {
    setDownloading(true);
    try {
      await downloadAllFiles(files);
    } finally {
      setDownloading(false);
    }
  };

  const downloadAllFiles = async (files) => {
    setDownloading(true);
    setDownloadProgress({
      isVisible: true,
      progress: 0,
      fileName: '',
      status: 'downloading',
      totalFiles: files.length,
      currentFileIndex: 0
    });

    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        await downloadFile(file.url, file.name, i, files.length);
        await new Promise(resolve => setTimeout(resolve, 500));
      }
      
      setDownloadProgress(prev => ({
        ...prev,
        status: 'completed',
        fileName: 'All files downloaded successfully',
        progress: 100
      }));

      setTimeout(() => {
        setDownloadProgress(prev => ({
          ...prev,
          status: 'completed',
          fileName: 'All files downloaded successfully',
          progress: 100
        }));
  
        setTimeout(() => {
          setDownloadProgress(prev => ({ ...prev, isVisible: false }));
        }, 3000);
      });
    } catch (error) {
      setDownloadProgress(prev => ({
        ...prev,
        status: 'error',
        fileName: 'Download failed'
      }));
    } finally {
      setDownloading(false);
    }
  };
  
  // Handle new revision
  const handleNewRevision = (revision) => {
    setRevisions(prev => {
      const updated = { ...prev };
      if (!updated[revision.deliveryId]) {
        updated[revision.deliveryId] = [];
      }
      updated[revision.deliveryId] = [revision, ...updated[revision.deliveryId]];
      return updated;
    });
  };

  // Initialize Razorpay
  const initializeRazorpay = () => {
    return new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.async = true;
      
      script.onload = () => {
        resolve(true);
      };
      
      script.onerror = () => {
        reject(new Error("Failed to load Razorpay SDK"));
      };
      
      if (document.querySelector('script[src="https://checkout.razorpay.com/v1/checkout.js"]')) {
        resolve(true);
        return;
      }
      
      document.body.appendChild(script);
    });
  };

  // Payment handler
  const handlePayment = async (amount, deliveryId = null, payAllDeliveries = false) => {
    try {
      setPaymentStatus({
        show: true,
        status: 'processing',
        message: 'Initializing payment...'
      });

      await initializeRazorpay();

      const response = await fetch("/api/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount }),
      });

      const data = await response.json();

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: data.amount,
        currency: data.currency,
        name: "Delivery Payment",
        description: payAllDeliveries ? "All Deliveries Payment" : "Single Delivery Payment",
        order_id: data.id,
        handler: async (res) => {
          setPaymentStatus({
            show: true,
            status: 'processing',
            message: 'Verifying payment...'
          });

          try {
            const verificationData = {
              razorpay_order_id: res.razorpay_order_id,
              razorpay_payment_id: res.razorpay_payment_id,
              razorpay_signature: res.razorpay_signature,
              deliveryId,
              clientId,
              payAllDeliveries
            };

            const verifyResponse = await fetch("/api/verify-payment", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(verificationData),
            });

            const result = await verifyResponse.json();

            if (result.success) {
              // Store current delivery ID to maintain selection
              const currentDeliveryId = clientData.deliveries[selectedDelivery].id;
              
              const updatedDeliveries = [...clientData.deliveries];
              
              if (payAllDeliveries) {
                updatedDeliveries.forEach(delivery => {
                  if (delivery.paymentStatus === "Not Paid") {
                    delivery.paymentStatus = "Paid";
                  }
                });
              } else {
                const index = updatedDeliveries.findIndex(d => d.id === deliveryId);
                if (index !== -1) {
                  updatedDeliveries[index].paymentStatus = "Paid";
                }
              }
              
              setClientData({ ...clientData, deliveries: updatedDeliveries });
              
              // Keep the current delivery selected
              const updatedDeliveryIndex = updatedDeliveries.findIndex(d => d.id === currentDeliveryId);
              if (updatedDeliveryIndex !== -1) {
                setSelectedDelivery(updatedDeliveryIndex);
              }
              
              setPaymentStatus({
                show: true,
                status: 'success',
                message: 'Payment successful! Access granted to your files.'
              });

              // Update URL to reflect current delivery (in case it was changed)
              const currentDelivery = updatedDeliveries[updatedDeliveryIndex];
              const newDeliveryName = encodeURIComponent(currentDelivery.name);
              const newUrl = `/${clientId}/preview?delivery=${newDeliveryName}`;
              window.history.replaceState({ ...window.history.state, as: newUrl, url: newUrl }, '', newUrl);

              setTimeout(() => {
                setPaymentStatus(prev => ({ ...prev, show: false }));
              }, 5000);
            } else {
              throw new Error('Payment verification failed');
            }
          } catch (error) {
            console.error("Verification error:", error);
            setPaymentStatus({
              show: true,
              status: 'error',
              message: 'Payment verification failed. Please contact support.'
            });
          }
        },
        modal: {
          ondismiss: function() {
            setPaymentStatus({
              show: true,
              status: 'error',
              message: 'Payment cancelled.'
            });
            setTimeout(() => {
              setPaymentStatus(prev => ({ ...prev, show: false }));
            }, 3000);
          }
        },
        theme: {
          color: "#10B981", // Green color for success theme
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.on('payment.failed', function (response) {
        setPaymentStatus({
          show: true,
          status: 'error',
          message: 'Payment failed. Please try again.'
        });
      });
      
      paymentObject.open();
    } catch (error) {
      console.error("Payment initialization error:", error);
      setPaymentStatus({
        show: true,
        status: 'error',
        message: 'Payment failed. Please try again.'
      });
    }
  };

  // Navigation handlers
  const handleNextSlide = () => {
    setCurrentSlide((prev) => 
      prev === clientData.deliveries[selectedDelivery].files.length - 1 ? 0 : prev + 1
    );
  };

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => 
      prev === 0 ? clientData.deliveries[selectedDelivery].files.length - 1 : prev - 1
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-black border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (error || !clientData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
        <div className="bg-red-50 p-6 rounded-xl text-center max-w-md">
          <X className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-red-700 mb-2">Error Loading Client</h2>
          <p className="text-red-600">{error || 'Client not found'}</p>
        </div>
      </div>
    );
  }

  const currentDelivery = clientData.deliveries[selectedDelivery];
  const currentFile = currentDelivery.files[currentSlide];
  const isDeliveryPaid = currentDelivery.paymentStatus === "Paid";
  const paymentMode = clientData.modeOfPay;
  const canDownload = canDownloadFiles(currentDelivery, paymentMode);

  // Get styling based on payment status and mode
  const getDeliveryStatusColor = (delivery) => {
    if (delivery.paymentStatus === "Paid") {
      return 'bg-green-500 text-white shadow-lg';
    }
    if (paymentMode === "Pay Later") {
      return 'bg-blue-500 text-white shadow-lg';
    }
    return 'bg-black text-white shadow-lg';
  };

  const getDeliveryStatusColorInactive = (delivery) => {
    if (delivery.paymentStatus === "Paid") {
      return 'bg-green-50 text-green-700 hover:bg-green-100';
    }
    if (paymentMode === "Pay Later") {
      return 'bg-blue-50 text-blue-700 hover:bg-blue-100';
    }
    return 'bg-white/80 text-gray-600 hover:bg-white';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Progress Notifications */}
      <DevToolsBlocker />
      
      <AnimatePresence>
        {paymentStatus.show && (
          <PaymentProgress
            status={paymentStatus.status}
            message={paymentStatus.message}
            onClose={() => setPaymentStatus(prev => ({ ...prev, show: false }))}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {downloadProgress.isVisible && (
          <DownloadProgress {...downloadProgress} />
        )}
      </AnimatePresence>

      {/* Header Section */}
      <div className="w-full bg-black text-white py-6 md:py-8">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <h1 className="text-2xl md:text-4xl font-bold text-center">
            Preview, Pay & Download Your Files
          </h1>
          <p className="text-center mt-2 text-gray-400 text-sm md:text-base">
            Payment Mode: {clientData.modeOfPay} | Status: {clientData.status}
            {paymentMode === "Pay Later" && (
              <span className="inline-block ml-2 px-2 py-0.5 rounded-full text-xs font-medium bg-blue-500 text-white">
                Pay Later Enabled
              </span>
            )}
          </p>
        </div>
      </div>

      {/* Client Header with Current Delivery Name */}
      <div className="w-full bg-white/50 backdrop-blur-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 md:py-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-400">client</span>
              <span className="text-sm text-gray-400">/</span>
              <span className="text-sm font-medium text-gray-600">{clientData.name}</span>
              <span className="text-sm text-gray-400">/</span>
              <span className={`text-sm font-medium ${
                isDeliveryPaid ? 'text-green-600' : 
                paymentMode === 'Pay Later' ? 'text-blue-600' : 'text-gray-900'
              }`}>
                {currentDelivery.name} 
                {isDeliveryPaid && <Check className="inline-block w-4 h-4" />}
                {!isDeliveryPaid && paymentMode === 'Pay Later' && (
                  <span className="ml-1 px-1.5 py-0.5 text-xs bg-blue-100 rounded-full">Pay Later</span>
                )}
              </span>
            </div>
            <button
              onClick={() => setShowOtherDeliveries(!showOtherDeliveries)}
              className="text-sm text-gray-600 hover:text-gray-800 font-medium"
            >
              {showOtherDeliveries ? 'Hide Other Deliveries' : 'Show All Deliveries'}
            </button>
          </div>

          {showOtherDeliveries && (
            <div className="flex flex-wrap gap-2 md:gap-4">
              {clientData.deliveries.map((delivery, idx) => (
                <button
                  key={delivery.id}
                  onClick={() => handleDeliveryChange(idx)}
                  className={`px-4 md:px-8 py-2 md:py-3 rounded-xl md:rounded-2xl text-sm md:text-base 
                            font-medium transition-all duration-300 flex items-center gap-2
                            ${selectedDelivery === idx 
                              ? getDeliveryStatusColor(delivery)
                              : getDeliveryStatusColorInactive(delivery)}`}
                >
                  {delivery.name}
                  {delivery.paymentStatus === "Paid" && (
                    <Check className="w-4 h-4" />
                  )}
                  {delivery.paymentStatus !== "Paid" && paymentMode === "Pay Later" && (
                    <span className="text-xs">Pay Later</span>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-6 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          <MediaViewer
            currentFile={currentFile}
            currentDelivery={currentDelivery}
            isDeliveryPaid={isDeliveryPaid}
            paymentMode={paymentMode}
            currentSlide={currentSlide}
            handlePrevSlide={handlePrevSlide}
            handleNextSlide={handleNextSlide}
          />

          {/* Right Sidebar */}
          <div className="space-y-4 md:space-y-6">
            <div className="bg-white rounded-xl p-4 md:p-6 shadow-lg border border-gray-100">
              <h2 className="text-xl font-semibold mb-4">{currentDelivery.name}</h2>
              
              {/* Description Section */}
              <div className="p-2 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border border-gray-200 shadow-sm mb-4">
                <div className="flex items-center gap-2 mb-3">
                  <StickyNote className="w-5 h-5 text-gray-500" />
                  <h3 className="font-semibold text-gray-800">Description</h3>
                </div>
                <div className="bg-white p-4 rounded-xl shadow-inner">
                  <p className="text-sm leading-relaxed text-gray-600">
                    {currentDelivery.desc}
                  </p>
                </div>
              </div>
              
              {/* Payment Status Indicator for Pay Later */}
              {!isDeliveryPaid && paymentMode === "Pay Later" && (
                <div className="p-3 bg-blue-50 border border-blue-100 rounded-lg mb-4">
                  <div className="flex items-center gap-2">
                    <Info className="w-5 h-5 text-blue-500" />
                    <p className="text-sm text-blue-700">
                      <span className="font-medium">Pay Later:</span> You can download files now and pay later
                    </p>
                  </div>
                </div>
              )}
              
              {/* Payment or Download Section - Updated for Pay Later */}
              {canDownload ? (
                <>
                  <div className="space-y-2 mb-4">
                    {currentDelivery.files.map((file) => (
                      <button
                        key={file.id}
                        onClick={() => window.open(file.url, '_blank')}
                        className="w-full p-3 bg-gray-50 rounded-xl flex items-center 
                                 justify-between hover:bg-gray-100 transition-colors"
                      >
                        <div className="flex items-center gap-3 min-w-0 flex-1">
                          <FileText className="w-4 h-4 text-gray-400" />
                          <span className="text-sm font-medium truncate">{file.name}</span>
                        </div>
                        <Download className="w-4 h-4" />
                      </button>
                    ))}
                  </div>
                  <button
                    onClick={() => handleDownloadDelivery(currentDelivery.files)}
                    disabled={downloading}
                    className={`w-full py-3 text-white rounded-xl font-medium
                             flex items-center justify-center gap-2 disabled:bg-gray-400
                             transition-colors ${
                               isDeliveryPaid ? 'bg-green-500 hover:bg-green-600' : 
                               'bg-blue-500 hover:bg-blue-600'
                             }`}
                  >
                    <Package className="w-5 h-5" />
                    {downloading ? 'Downloading...' : 'Download All Files'}
                  </button>
                  
                  {/* Pay Now button for Pay Later method */}
                  {!isDeliveryPaid && paymentMode === "Pay Later" && (
                    <button
                      onClick={() => handlePayment(currentDelivery.cost, currentDelivery.id, false)}
                      className="w-full py-3 mt-2 bg-gray-800 text-white rounded-xl font-medium
                               flex items-center justify-center gap-2 hover:bg-gray-900
                               transition-colors"
                    >
                      <CreditCard className="w-5 h-5" />
                      Pay Now (₹{currentDelivery.cost})
                    </button>
                  )}
                </>
              ) : (
                <button
                  onClick={() => handlePayment(currentDelivery.cost, currentDelivery.id, false)}
                  className="w-full py-3 bg-black text-white rounded-xl font-medium
                           flex items-center justify-center gap-2 hover:bg-gray-900
                           transition-colors"
                >
                  <CreditCard className="w-5 h-5" />
                  Pay to Download Files (₹{currentDelivery.cost})
                </button>
              )}

              {/* Show More Button */}
              <button
                onClick={() => setShowMore(!showMore)}
                className="w-full mt-4 py-2 px-4 text-gray-600 hover:text-gray-800 
                         flex items-center justify-center gap-2 text-sm"
              >
                {showMore ? (
                  <>
                    Show Less <ChevronUp className="w-4 h-4" />
                  </>
                ) : (
                  <>
                    Show More Details <ChevronDown className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
            
            {/* New Latest Revision Display - only show if there are revisions */}
            {revisions[currentDelivery.id] && revisions[currentDelivery.id].length > 0 && (
              <LatestRevisionDisplay
                deliveryId={currentDelivery.id}
                revisions={revisions[currentDelivery.id] || []}
              />
            )}

            {/* Revision Request Section */}
            <RevisionRequest
              clientId={clientId}
              deliveryId={currentDelivery.id}
              deliveryName={currentDelivery.name}
              revisions={revisions[currentDelivery.id] || []}
              onNewRevision={handleNewRevision}
            />

            {/* Additional Information (Hidden by default) */}
            <AnimatePresence>
              {showMore && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-4 overflow-hidden"
                >
                  {/* Status Information */}
                  <div className="bg-gray-50 p-4 rounded-xl">
                    <div className="flex items-center gap-2 mb-2">
                      <Info className="w-5 h-5 text-gray-500" />
                      <h3 className="font-medium text-gray-700">Delivery Status</h3>
                    </div>
                    <div className="space-y-2">
                      {clientData.deliveries.map((delivery) => (
                        <div 
                          key={delivery.id}
                          className="flex items-center justify-between text-sm"
                        >
                          <span className="text-gray-600">{delivery.name}</span>
                          <div className="flex items-center gap-2">
                            <span className="text-gray-600">₹{delivery.cost}</span>
                            <span className={`px-2 py-0.5 rounded-full text-xs font-medium
                              ${delivery.paymentStatus === "Paid" 
                                ? 'bg-green-100 text-green-700'
                                : 'bg-gray-100 text-gray-700'}`}
                            >
                              {delivery.paymentStatus}
                            </span>
                            {delivery.paymentStatus !== "Paid" && paymentMode === "Pay Later" && (
                              <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
                                Pay Later
                              </span>
                            )}
                          </div>
                        </div>
                      ))}
                      <div className="text-right mt-2">
                        <span className="text-gray-700">Total: ₹{clientData.deliveries.reduce((sum, delivery) => sum + delivery.cost, 0)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Pay All Deliveries Button */}
                  {clientData.deliveries.some(d => d.paymentStatus === "Not Paid") && paymentMode !== "Pay Later" && (
                    <button
                      onClick={() => {
                        const unpaidTotal = clientData.deliveries
                          .filter(d => d.paymentStatus === "Not Paid")
                          .reduce((sum, d) => sum + d.cost, 0);
                        handlePayment(unpaidTotal, null, true);
                      }}
                      className="w-full py-3 bg-gray-100 text-gray-700 hover:bg-gray-200 
                               rounded-xl font-medium flex items-center justify-center gap-2
                               transition-colors"
                    >
                      <Package className="w-5 h-5" />
                      Pay for All Deliveries
                    </button>
                  )}
                  
                  {/* Pay All Deliveries Later Button */}
                  {clientData.deliveries.some(d => d.paymentStatus === "Not Paid") && paymentMode === "Pay Later" && (
                    <button
                      onClick={() => {
                        const unpaidTotal = clientData.deliveries
                          .filter(d => d.paymentStatus === "Not Paid")
                          .reduce((sum, d) => sum + d.cost, 0);
                        handlePayment(unpaidTotal, null, true);
                      }}
                      className="w-full py-3 bg-blue-100 text-blue-700 hover:bg-blue-200 
                               rounded-xl font-medium flex items-center justify-center gap-2
                               transition-colors"
                    >
                      <Package className="w-5 h-5" />
                      Pay for All Deliveries Now
                    </button>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreviewPayment;