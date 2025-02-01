
"use client"

import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronLeft, ChevronRight, Download, CreditCard, 
  Check, FileText, Package, Info, X, StickyNote, Lock,
  Play, Pause
} from 'lucide-react';





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

const downloadAllFiles = async (files) => {
  try {
    for (const file of files) {
      await downloadFile(file.url, file.name);
      await new Promise(resolve => setTimeout(resolve, 500));
    }
  } catch (error) {
    console.error('Bulk download failed:', error);
    alert('Failed to download all files. Please try individually.');
  }
};

const PaymentDownloadSection = ({ 
  currentDelivery, 
  clientData, 
  handlePayment, 
  handleDownloadDelivery, 
  downloading 
}) => {
  const totalClientPrice = clientData.deliveries.reduce((sum, delivery) => 
    delivery.paymentStatus === "Not Paid" ? sum + delivery.cost : sum, 0);

  return (
    <div className="space-y-4 md:space-y-6">
      <div className="bg-white rounded-xl md:rounded-2xl p-4 md:p-6 shadow-lg border border-gray-100">
        <AnimatePresence mode="wait">
          {currentDelivery.paymentStatus === "Not Paid" ? (
            <motion.div
              key="payment-options"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-4"
            >
              <div className="p-2 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border border-gray-200 shadow-sm">
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

              <div className="space-y-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handlePayment(currentDelivery.cost, currentDelivery.id, false)}
                  className="w-full py-3 bg-black text-white rounded-xl font-medium
                           flex items-center justify-center gap-2"
                >
                  <CreditCard className="w-5 h-5" />
                  Pay for this Delivery (₹{currentDelivery.cost})
                </motion.button>

                {totalClientPrice > 0 && (
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handlePayment(totalClientPrice, null, true)}
                    className="w-full py-3 bg-gray-100 text-gray-700 hover:bg-gray-200 
                             rounded-xl font-medium flex items-center justify-center gap-2"
                  >
                    <Package className="w-5 h-5" />
                    Pay for All Deliveries (₹{totalClientPrice})
                  </motion.button>
                )}
              </div>
            </motion.div>
          ) : (<motion.div
            key="download-options"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-4"
          >
            {/* File List */}
            <div className="space-y-2">
              {currentDelivery.files.map((file) => (
                <motion.button
                  key={file.id}
                  onClick={() => window.open(file.url, '_blank')}
                  className="w-full p-3 bg-gray-50 rounded-xl flex items-center 
                           justify-between hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center gap-3 min-w-0 flex-1">
                    <FileText className="w-4 h-4 text-gray-400" />
                    <span className="text-sm font-medium truncate">
                      {file.name}
                    </span>
                  </div>
                  <Download className="w-4 h-4" />
                </motion.button>
              ))}
            </div>

            {/* Download All Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleDownloadDelivery(currentDelivery.files)}
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

    {/* Delivery Status Grid */}
    <div className="bg-gray-50 p-4 rounded-xl">
      <div className="flex items-center gap-2 mb-2">
        <Info className="w-5 h-5 text-gray-500" />
        <h3 className="font-medium text-gray-700">Delivery Status</h3>
      </div>
      <div className="grid gap-2">
        {clientData.deliveries.map((delivery) => (
          <div 
            key={delivery.id}
            className="flex items-center justify-between text-sm"
          >
            <span className="text-gray-600">{delivery.name}</span>
            <span className={`px-2 py-0.5 rounded-full text-xs font-medium
              ${delivery.paymentStatus === "Paid" 
                ? 'bg-green-100 text-green-700'
                : 'bg-gray-100 text-gray-700'}`}
            >
              {delivery.paymentStatus}
            </span>
          </div>
        ))}
      </div>
    </div>
  </div>
);
};




// Audio Preview Component with Payment Gate
const AudioPreview = ({ url, filename, isPaid }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [hasReachedPreviewLimit, setHasReachedPreviewLimit] = useState(false);
  const audioRef = useRef(null);
  
  const PREVIEW_DURATION = 5; // Preview duration in seconds

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

        if (!isPaid && current >= PREVIEW_DURATION && !hasReachedPreviewLimit) {
          audioRef.current.pause();
          setIsPlaying(false);
          setHasReachedPreviewLimit(true);
        }
      };

      const handleLoadedMetadata = () => {
        setDuration(audioRef.current.duration);
      };

      audioRef.current.addEventListener('timeupdate', handleTimeUpdate);
      audioRef.current.addEventListener('loadedmetadata', handleLoadedMetadata);

      return () => {
        if (audioRef.current) {
          audioRef.current.removeEventListener('timeupdate', handleTimeUpdate);
          audioRef.current.removeEventListener('loadedmetadata', handleLoadedMetadata);
        }
      };
    }
  }, [isPaid, hasReachedPreviewLimit]);

  const handlePlayPause = () => {
    if (!isPaid && hasReachedPreviewLimit) {
      return;
    }

    if (isPlaying) {
      audioRef.current?.pause();
    } else {
      if (!isPaid && currentTime >= PREVIEW_DURATION) {
        audioRef.current.currentTime = 0;
      }
      audioRef.current?.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleProgressClick = (e) => {
    if (!isPaid) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percent = x / rect.width;
    const newTime = percent * audioRef.current.duration;
    audioRef.current.currentTime = newTime;
  };

  return (
    <div className="w-full h-full flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md mx-4">
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden p-6">
          <div className="mb-4">
            <h3 className="text-base font-medium text-gray-900 truncate">
              {filename}
            </h3>
            <p className="text-sm text-gray-500">
              {formatTime(currentTime)} / {formatTime(isPaid ? duration : PREVIEW_DURATION)}
            </p>
          </div>

          <div className="mb-4">
            <div 
              className="w-full h-1 bg-gray-100 rounded-full cursor-pointer relative"
              onClick={handleProgressClick}
            >
              <div 
                className={`absolute h-full rounded-full ${
                  isPaid ? 'bg-black' : 'bg-gray-400'
                }`}
                style={{ 
                  width: `${isPaid ? progress : Math.min(progress, (PREVIEW_DURATION/duration) * 100)}%`
                }}
              />
              {!isPaid && (
                <div 
                  className="absolute h-full w-1 bg-red-500"
                  style={{ 
                    left: `${(PREVIEW_DURATION/duration) * 100}%`,
                    display: duration ? 'block' : 'none'
                  }}
                />
              )}
            </div>
          </div>

          <div className="flex justify-center">
            <button 
              onClick={handlePlayPause}
              disabled={!isPaid && hasReachedPreviewLimit}
              className={`p-3 rounded-full transition-colors duration-200 ${
                !isPaid && hasReachedPreviewLimit
                  ? 'bg-gray-200 text-gray-400'
                  : 'bg-black text-white hover:bg-gray-800'
              }`}
            >
              {isPlaying ? (
                <Pause className="w-5 h-5" />
              ) : (
                <Play className="w-5 h-5 ml-0.5" />
              )}
            </button>
          </div>

          {!isPaid && (
            <div className="mt-4 text-center">
              <Lock className="w-5 h-5 mx-auto mb-2 text-gray-400" />
              <p className="text-sm text-gray-500">
                {hasReachedPreviewLimit 
                  ? 'Preview limit reached. Purchase to continue listening.'
                  : `Preview available: First ${PREVIEW_DURATION} seconds`}
              </p>
            </div>
          )}

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

const MediaViewer = ({ 
  currentFile, 
  currentDelivery, 
  isDeliveryPaid, 
  currentSlide, 
  handlePrevSlide, 
  handleNextSlide 
}) => {
  const getMediaType = (url) => {
    const audioExtensions = ['mp3', 'wav', 'ogg', 'm4a'];
    const videoExtensions = ['mp4', 'webm', 'mov'];
    const extension = url.split('.').pop().toLowerCase();
    
    if (audioExtensions.includes(extension)) return 'audio';
    if (videoExtensions.includes(extension)) return 'video';
    return 'image';
  };

  const renderMedia = () => {
    const mediaType = getMediaType(currentFile.url);
    const shouldBlur = !isDeliveryPaid && mediaType === 'image';
    const commonClassNames = `transition-all duration-300 ${shouldBlur ? 'filter blur-sm' : ''}`;

    switch (mediaType) {
      case 'audio':
        return (
          <AudioPreview 
            url={currentFile.url}
            filename={currentFile.name}
            isPaid={isDeliveryPaid}
          />
        );
      
      case 'video':
        return (
          <div className="relative h-full flex items-center justify-center">
            {isDeliveryPaid ? (
              <video 
                className="w-full h-full object-cover"
                controls
                src={currentFile.url}
              >
                Your browser does not support the video element.
              </video>
            ) : (
              <div className="text-center">
                <Lock className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                <p className="font-medium text-gray-500">Payment Required to Play Video</p>
              </div>
            )}
          </div>
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
          
          {!isDeliveryPaid && getMediaType(currentFile.url) === 'image' && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/20">
              <div className="text-center text-white px-4">
                <Lock className="w-6 h-6 mx-auto mb-2" />
                <p className="font-medium text-sm">Payment Required to View Full Quality</p>
              </div>
            </div>
          )}
          
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
  const clientId = params.id;
  
  const [selectedDelivery, setSelectedDelivery] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [clientData, setClientData] = useState(null);
  const [downloading, setDownloading] = useState(false);

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
  }, [clientId]);

  const initializeRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.async = true;
      script.onload = () => resolve(true);
      document.body.appendChild(script);
    });
  };

  // Client-side handlePayment function
const handlePayment = async (amount, deliveryId = null, payAllDeliveries = false) => {
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
      name: "Delivery Payment",
      description: payAllDeliveries ? "All Deliveries Payment" : "Single Delivery Payment",
      order_id: data.id,
      handler: async (res) => {
        const verifyData = {
          razorpay_order_id: res.razorpay_order_id,
          razorpay_payment_id: res.razorpay_payment_id,
          razorpay_signature: res.razorpay_signature,
          deliveryId,
          clientId,
          payAllDeliveries
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
          // Update local state based on payment type
          const updatedDeliveries = [...clientData.deliveries];
          
          if (payAllDeliveries) {
            // Update all unpaid deliveries to paid
            updatedDeliveries.forEach(delivery => {
              if (delivery.PaymentStatus === "Not Paid") {
                delivery.PaymentStatus = "Paid";
              }
            });
          } else {
            // Update single delivery
            const index = updatedDeliveries.findIndex(d => d.id === deliveryId);
            if (index !== -1) {
              updatedDeliveries[index].PaymentStatus = "Paid";
            }
          }
          
          setClientData({ ...clientData, deliveries: updatedDeliveries });
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

  const handleDeliveryChange = (idx) => {
    setSelectedDelivery(idx);
    setCurrentSlide(0);
  };

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

  const handleDownloadDelivery = async (files) => {
    setDownloading(true);
    try {
      await downloadAllFiles(files);
    } finally {
      setDownloading(false);
    }
  };

  const currentDelivery = clientData.deliveries[selectedDelivery];
  const currentFile = currentDelivery.files[currentSlide];
  const isDeliveryPaid = currentDelivery.paymentStatus === "Paid";
  const isSingleDelivery = clientData.deliveries.length === 1;
  
  const unpaidDeliveries = clientData.deliveries.filter(delivery => delivery.paymentStatus === "Not Paid");
  const totalClientPrice = unpaidDeliveries.reduce((sum, delivery) => sum + delivery.cost, 0);
  
  const handlePayDelivery = () => handlePayment(currentDelivery.cost, currentDelivery.id, false);
  const handlePayClient = () => handlePayment(totalClientPrice, null, true);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Black Header Section */}
      <div className="w-full bg-black text-white py-6 md:py-8 rounded-xl shadow-2xl">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <h1 className="text-2xl md:text-4xl font-bold text-center">
            Preview, Pay & Download Your Files
          </h1>
          <p className="text-center mt-2 text-gray-400 text-sm md:text-base">
            Payment Mode: {clientData.modeOfPay} | Status: {clientData.status}
          </p>
        </div>
      </div>

      {/* Client Header with Deliveries */}
      <div className="w-full bg-white/50 backdrop-blur-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 md:py-6">
          <div className="flex items-center gap-2 text-sm text-gray-400 mb-4 md:mb-6">
            <span>client</span>
            <span>/</span>
            <span className="text-gray-600 font-medium">{clientData.name}</span>
          </div>

          <div className="flex flex-wrap gap-2 md:gap-4">
            {clientData.deliveries.map((delivery, idx) => (
              <button
                key={delivery.id}
                onClick={() => handleDeliveryChange(idx)}
                className={`px-4 md:px-8 py-2 md:py-3 rounded-xl md:rounded-2xl text-sm md:text-base 
                          font-medium transition-all duration-300 flex items-center gap-2
                          ${selectedDelivery === idx 
                            ? 'bg-black text-white shadow-lg' 
                            : 'bg-white/80 text-gray-600 hover:bg-white'}`}
              >
                {delivery.name}
                {delivery.paymentStatus === "Paid" && (
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
          
          <MediaViewer
            currentFile={currentFile}
            currentDelivery={currentDelivery}
            isDeliveryPaid={isDeliveryPaid}
            currentSlide={currentSlide}
            handlePrevSlide={handlePrevSlide}
            handleNextSlide={handleNextSlide}
          />

          {/* Right Sidebar */}
          <div className="space-y-4 md:space-y-6">
            <PaymentDownloadSection
              currentDelivery={currentDelivery}
              clientData={clientData}
              handlePayment={handlePayment}
              handleDownloadDelivery={handleDownloadDelivery}
              downloading={downloading}
            />

            {/* Paid Delivery Status */}
            {isDeliveryPaid && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col md:flex-row items-center justify-between gap-2 text-green-600 
                          bg-green-50 p-4 rounded-xl"
              >
                <div className="flex items-center gap-2">
                  <Check className="w-5 h-5" />
                  <span className="font-medium">Delivery Access Granted</span>
                </div>
                {unpaidDeliveries.length > 0 && (
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handlePayClient}
                    className="text-sm px-4 py-1 bg-green-100 hover:bg-green-200 
                             rounded-lg transition-colors"
                  >
                    Pay for Remaining Deliveries
                  </motion.button>
                )}
              </motion.div>
            )}

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
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium
                      ${delivery.paymentStatus === "Paid" 
                        ? 'bg-green-100 text-green-700'
                        : 'bg-gray-100 text-gray-700'}`}
                    >
                      {delivery.paymentStatus}
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
