
// "use client"

// import React, { useState, useEffect, useRef } from 'react';
// // import { useParams } from 'next/navigation';
// import { motion, AnimatePresence } from 'framer-motion';
// import { 
//   ChevronLeft, ChevronRight, Download, CreditCard, 
//   Check, FileText, Package, Info, X, StickyNote, Lock,
//   Play, Pause, Loader
// } from 'lucide-react';
// import { useParams, useSearchParams, useRouter } from 'next/navigation';
// // Progress notification component for payments
// const PaymentProgress = ({ status, message, onClose }) => {
//   const getStatusColor = () => {
//     switch (status) {
//       case 'success':
//         return 'bg-green-50 border-green-200';
//       case 'error':
//         return 'bg-red-50 border-red-200';
//       default:
//         return 'bg-blue-50 border-blue-200';
//     }
//   };

//   const getIcon = () => {
//     switch (status) {
//       case 'success':
//         return <Check className="w-5 h-5 text-green-600" />;
//       case 'error':
//         return <X className="w-5 h-5 text-red-600" />;
//       default:
//         return <Loader className="w-5 h-5 text-blue-600 animate-spin" />;
//     }
//   };

//   const getTextColor = () => {
//     switch (status) {
//       case 'success':
//         return 'text-green-700';
//       case 'error':
//         return 'text-red-700';
//       default:
//         return 'text-blue-700';
//     }
//   };

//   return (
//     <AnimatePresence>
//       <motion.div
//         initial={{ opacity: 0, y: -20 }}
//         animate={{ opacity: 1, y: 0 }}
//         exit={{ opacity: 0, y: -20 }}
//         className="fixed top-4 right-4 z-50"
//       >
//         <div className={`p-4 rounded-lg border shadow-lg ${getStatusColor()}`}>
//           <div className="flex items-center gap-3">
//             {getIcon()}
//             <p className={`text-sm font-medium ${getTextColor()}`}>
//               {message}
//             </p>
//             {status !== 'processing' && (
//               <button
//                 onClick={onClose}
//                 className="ml-2 text-gray-400 hover:text-gray-600"
//               >
//                 <X className="w-4 h-4" />
//               </button>
//             )}
//           </div>
//         </div>
//       </motion.div>
//     </AnimatePresence>
//   );
// };

// // Download progress component
// const DownloadProgress = ({ 
//   isVisible,
//   progress, 
//   fileName, 
//   status,
//   totalFiles,
//   currentFileIndex
// }) => {
//   if (!isVisible) return null;

//   const getStatusColor = () => {
//     switch (status) {
//       case 'completed':
//         return 'bg-green-500';
//       case 'error':
//         return 'bg-red-500';
//       default:
//         return 'bg-blue-500';
//     }
//   };

//   const getIcon = () => {
//     switch (status) {
//       case 'completed':
//         return <Check className="w-5 h-5" />;
//       case 'error':
//         return <X className="w-5 h-5" />;
//       default:
//         return <Download className="w-5 h-5" />;
//     }
//   };

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 50 }}
//       animate={{ opacity: 1, y: 0 }}
//       exit={{ opacity: 0, y: 50 }}
//       className="fixed bottom-4 right-4 bg-white rounded-lg shadow-xl border 
//                  border-gray-200 p-4 max-w-sm w-full z-50"
//     >
//       <div className="mb-3">
//         <div className="flex items-center justify-between mb-1">
//           <span className="text-sm font-medium text-gray-700">
//             {status === 'downloading' 
//               ? `Downloading ${currentFileIndex + 1}/${totalFiles}`
//               : status.charAt(0).toUpperCase() + status.slice(1)}
//           </span>
//           <span className="text-sm text-gray-500">{`${Math.round(progress)}%`}</span>
//         </div>
//         <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
//           <motion.div
//             initial={{ width: 0 }}
//             animate={{ width: `${progress}%` }}
//             transition={{ duration: 0.3 }}
//             className={`h-full ${getStatusColor()}`}
//           />
//         </div>
//       </div>

//       <div className="flex items-center gap-2 text-sm text-gray-600">
//         {getIcon()}
//         <span className="truncate">{fileName}</span>
//       </div>
//     </motion.div>
//   );
// };

// // Enhanced Audio Preview Component
// const AudioPreview = ({ url, filename }) => {
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [progress, setProgress] = useState(0);
//   const [currentTime, setCurrentTime] = useState(0);
//   const [duration, setDuration] = useState(0);
//   const [isLoading, setIsLoading] = useState(true);
//   const audioRef = useRef(null);

//   const formatTime = (time) => {
//     const minutes = Math.floor(time / 60);
//     const seconds = Math.floor(time % 60);
//     return `${minutes}:${seconds.toString().padStart(2, '0')}`;
//   };

//   useEffect(() => {
//     if (audioRef.current) {
//       const handleTimeUpdate = () => {
//         const current = audioRef.current.currentTime;
//         setCurrentTime(current);
//         setProgress((current / audioRef.current.duration) * 100);
//       };

//       const handleLoadedMetadata = () => {
//         setDuration(audioRef.current.duration);
//         setIsLoading(false);
//       };

//       const handleEnded = () => {
//         setIsPlaying(false);
//         setProgress(0);
//         audioRef.current.currentTime = 0;
//       };

//       audioRef.current.addEventListener('timeupdate', handleTimeUpdate);
//       audioRef.current.addEventListener('loadedmetadata', handleLoadedMetadata);
//       audioRef.current.addEventListener('ended', handleEnded);

//       return () => {
//         if (audioRef.current) {
//           audioRef.current.removeEventListener('timeupdate', handleTimeUpdate);
//           audioRef.current.removeEventListener('loadedmetadata', handleLoadedMetadata);
//           audioRef.current.removeEventListener('ended', handleEnded);
//         }
//       };
//     }
//   }, []);

//   const handlePlayPause = () => {
//     if (isPlaying) {
//       audioRef.current?.pause();
//     } else {
//       audioRef.current?.play();
//     }
//     setIsPlaying(!isPlaying);
//   };

//   const handleProgressClick = (e) => {
//     if (audioRef.current) {
//       const rect = e.currentTarget.getBoundingClientRect();
//       const x = e.clientX - rect.left;
//       const percent = x / rect.width;
//       const newTime = percent * audioRef.current.duration;
//       audioRef.current.currentTime = newTime;
//     }
//   };

//   return (
//     <div className="w-full h-full flex items-center justify-center bg-gray-50">
//       <div className="w-full max-w-md mx-4">
//         <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden p-6">
//           <div className="mb-4">
//             <h3 className="text-base font-medium text-gray-900 truncate">
//               {filename}
//             </h3>
//             <div className="text-sm text-gray-500">
//               {isLoading ? (
//                 <span>Loading audio...</span>
//               ) : (
//                 <span>{formatTime(currentTime)} / {formatTime(duration)}</span>
//               )}
//             </div>
//           </div>

//           <div className="mb-4">
//             <div 
//               className="w-full h-2 bg-gray-200 rounded-full cursor-pointer relative overflow-hidden"
//               onClick={handleProgressClick}
//             >
//               <div 
//                 className="absolute h-full bg-black transition-all duration-100"
//                 style={{ width: `${progress}%` }}
//               />
//             </div>
//           </div>

//           <div className="flex justify-center">
//             <button 
//               onClick={handlePlayPause}
//               disabled={isLoading}
//               className="p-3 rounded-full bg-black text-white hover:bg-gray-800 
//                        transition-colors duration-200 disabled:bg-gray-400"
//             >
//               {isPlaying ? (
//                 <Pause className="w-5 h-5" />
//               ) : (
//                 <Play className="w-5 h-5 ml-0.5" />
//               )}
//             </button>
//           </div>

//           <audio
//             ref={audioRef}
//             src={url}
//             preload="metadata"
//             className="hidden"
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// // Payment Download Section Component
// const PaymentDownloadSection = ({ 
//   currentDelivery, 
//   clientData, 
//   handlePayment, 
//   handleDownloadDelivery, 
//   downloading 
// }) => {
//   const totalClientPrice = clientData.deliveries.reduce((sum, delivery) => 
//     delivery.paymentStatus === "Not Paid" ? sum + delivery.cost : sum, 0);

//   return (
//     <div className="space-y-4 md:space-y-6">
//       <div className="bg-white rounded-xl md:rounded-2xl p-4 md:p-6 shadow-lg border border-gray-100">
//         <AnimatePresence mode="wait">
//           {currentDelivery.paymentStatus === "Not Paid" ? (
//             <motion.div
//               key="payment-options"
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               className="space-y-4"
//             >
//               <div className="p-2 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border border-gray-200 shadow-sm">
//                 <div className="flex items-center gap-2 mb-3">
//                   <StickyNote className="w-5 h-5 text-gray-500" />
//                   <h3 className="font-semibold text-gray-800">Description</h3>
//                 </div>
//                 <div className="bg-white p-4 rounded-xl shadow-inner">
//                   <p className="text-sm leading-relaxed text-gray-600">
//                     {currentDelivery.desc}
//                   </p>
//                 </div>
//               </div>

//               <div className="space-y-3">
//                 <motion.button
//                   whileHover={{ scale: 1.02 }}
//                   whileTap={{ scale: 0.98 }}
//                   onClick={() => handlePayment(currentDelivery.cost, currentDelivery.id, false)}
//                   className="w-full py-3 bg-black text-white rounded-xl font-medium
//                            flex items-center justify-center gap-2"
//                 >
//                   <CreditCard className="w-5 h-5" />
//                   Pay for this Delivery (₹{currentDelivery.cost})
//                 </motion.button>

//                 {totalClientPrice > 0 && (
//                   <motion.button
//                     whileHover={{ scale: 1.02 }}
//                     whileTap={{ scale: 0.98 }}
//                     onClick={() => handlePayment(totalClientPrice, null, true)}
//                     className="w-full py-3 bg-gray-100 text-gray-700 hover:bg-gray-200 
//                              rounded-xl font-medium flex items-center justify-center gap-2"
//                   >
//                     <Package className="w-5 h-5" />
//                     Pay for All Deliveries (₹{totalClientPrice})
//                   </motion.button>
//                 )}
//               </div>
//             </motion.div>
//           ) : (
//             <motion.div
//               key="download-options"
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               className="space-y-4"
//             >
//               <div className="space-y-2">
//                 {currentDelivery.files.map((file) => (
//                   <motion.button
//                     key={file.id}
//                     onClick={() => window.open(file.url, '_blank')}
//                     className="w-full p-3 bg-gray-50 rounded-xl flex items-center 
//                              justify-between hover:bg-gray-100 transition-colors"
//                   >
//                     <div className="flex items-center gap-3 min-w-0 flex-1">
//                       <FileText className="w-4 h-4 text-gray-400" />
//                       <span className="text-sm font-medium truncate">
//                         {file.name}
//                       </span>
//                     </div>
//                     <Download className="w-4 h-4" />
//                   </motion.button>
//                 ))}
//               </div>

//               <motion.button
//                 whileHover={{ scale: 1.02 }}
//                 whileTap={{ scale: 0.98 }}
//                 onClick={() => handleDownloadDelivery(currentDelivery.files)}
//                 disabled={downloading}
//                 className="w-full py-3 bg-black text-white rounded-xl font-medium
//                          flex items-center justify-center gap-2 disabled:bg-gray-400"
//               >
//                 <Package className="w-5 h-5" />
//                 {downloading ? 'Downloading...' : 'Download All Files'}
//               </motion.button>
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </div>
//     </div>
//   );
// };

// // Media Viewer Component
// const MediaViewer = ({ 
//   currentFile, 
//   currentDelivery, 
//   isDeliveryPaid, 
//   currentSlide, 
//   handlePrevSlide, 
//   handleNextSlide 
// }) => {
//   const getMediaType = (url) => {
//     const audioExtensions = ['mp3', 'wav', 'ogg', 'm4a'];
//     const videoExtensions = ['mp4', 'webm', 'mov'];
//     const extension = url.split('.').pop().toLowerCase();
    
//     if (audioExtensions.includes(extension)) return 'audio';
//     if (videoExtensions.includes(extension)) return 'video';
//     return 'image';
//   };



//     const renderMedia = () => {
//       const mediaType = getMediaType(currentFile.url);
    
//       switch (mediaType) {
//         case 'audio':
//           return (
//             <AudioPreview 
//               url={currentFile.url}
//               filename={currentFile.name}
//             />
//           );
        
//         case 'video':
//           return (
//             <div className="relative h-full flex items-center justify-center">
//               {isDeliveryPaid ? (
//                 <video 
//                   className="w-full h-full object-cover"
//                   controls
//                   src={currentFile.url}
//                 >
//                   Your browser does not support the video element.
//                 </video>
//               ) : (
//                 <div className="text-center">
//                   <Lock className="w-8 h-8 mx-auto mb-2 text-gray-400" />
//                   <p className="font-medium text-gray-500">Payment Required to Play Video</p>
//                 </div>
//               )}
//             </div>
//           );
        
//         default: // Image
//           const shouldBlur = !isDeliveryPaid;
//           const commonClassNames = `transition-all duration-300 ${shouldBlur ? 'filter blur-sm' : ''}`;
          
//           return (
//             <>
//               <img
//                 src={currentFile.url}
//                 alt={currentFile.name}
//                 className={`${commonClassNames} w-full h-full object-cover`}
//               />
//               {shouldBlur && (
//                 <div className="absolute inset-0 flex items-center justify-center bg-black/20">
//                   <div className="text-center text-white px-4">
//                     <Lock className="w-6 h-6 mx-auto mb-2" />
//                     <p className="font-medium text-sm">Payment Required to View Full Quality</p>
//                   </div>
//                 </div>
//               )}
//             </>
//           );
//       }
//     };


  
//     return (
//       <div className="md:col-span-2">
//         <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden aspect-[16/9]">
//           <div className="relative h-full group">
//             {renderMedia()}
            
//             {currentDelivery.files.length > 1 && (
//               <>
//                 <button
//                   onClick={handlePrevSlide}
//                   className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full
//                            bg-white/90 hover:bg-white shadow-sm transition-all z-10"
//                 >
//                   <ChevronLeft className="w-4 h-4" />
//                 </button>
//                 <button
//                   onClick={handleNextSlide}
//                   className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full
//                            bg-white/90 hover:bg-white shadow-sm transition-all z-10"
//                 >
//                   <ChevronRight className="w-4 h-4" />
//                 </button>
  
//                 <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
//                   {Array.from({ length: currentDelivery.files.length }).map((_, idx) => (
//                     <div
//                       key={idx}
//                       className={`h-1 rounded-full transition-all duration-300 
//                                 ${currentSlide === idx ? 'w-4 bg-gray-900' : 'w-1 bg-gray-300'}`}
//                     />
//                   ))}
//                 </div>
//               </>
//             )}
//           </div>
//         </div>
//       </div>
//     );
//   };
  
 
// import { 
 
//   User, ChevronUp, ChevronDown
// } from 'lucide-react';

// const PreviewPayment = () => {
//   const params = useParams();

//   // const params = useParams();
//   const searchParams = useSearchParams();
//   const router = useRouter();
//   const clientId = params.id;
  
//   // new  
//   const urlDeliveryName = searchParams.get('delivery');

//   // Move all useState hooks to the top
//   const [showMore, setShowMore] = useState(false);
//   const [selectedDelivery, setSelectedDelivery] = useState(0);
//   const [currentSlide, setCurrentSlide] = useState(0);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [clientData, setClientData] = useState(null);
//   const [downloading, setDownloading] = useState(false);
//   const [downloadProgress, setDownloadProgress] = useState({
//     isVisible: false,
//     progress: 0,
//     fileName: '',
//     status: 'downloading',
//     totalFiles: 0,
//     currentFileIndex: 0
//   });
//   const [paymentStatus, setPaymentStatus] = useState({
//     show: false,
//     status: '',
//     message: ''
//   });
//   useEffect(() => {
//     if (clientData && urlDeliveryName) {
//       const deliveryIndex = clientData.deliveries.findIndex(
//         d => d.name.toLowerCase() === decodeURIComponent(urlDeliveryName).toLowerCase()
//       );
//       if (deliveryIndex !== -1) {
//         setSelectedDelivery(deliveryIndex);
//       }
//     }
//   }, [clientData, urlDeliveryName]);

//   // Update URL when selected delivery changes
//   const handleDeliveryChange = (idx) => {
//     const newDeliveryName = encodeURIComponent(clientData.deliveries[idx].name);
//     // Update URL without causing a reload
//     const newUrl = `/${clientId}/preview?delivery=${newDeliveryName}`;
//     window.history.replaceState({ ...window.history.state, as: newUrl, url: newUrl }, '', newUrl);
//     setSelectedDelivery(idx);
//     setCurrentSlide(0);
//   };

//   // Fetch client data with delivery name handling
//   useEffect(() => {
//     const fetchClientData = async () => {
//       try {
//         setLoading(true);
//         const response = await fetch('/api/get-data-for-preview', {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({ clientId }),
//         });
        
//         if (!response.ok) {
//           const data = await response.json();
//           throw new Error(data.error || 'Failed to fetch client data');
//         }
        
//         const { client } = await response.json();
//         setClientData(client);
        
//         // If there's a delivery name in the URL, select that delivery
//         if (urlDeliveryName) {
//           const deliveryIndex = client.deliveries.findIndex(
//             d => d.name.toLowerCase() === decodeURIComponent(urlDeliveryName).toLowerCase()
//           );
//           if (deliveryIndex !== -1) {
//             setSelectedDelivery(deliveryIndex);
//           }
//         }
//       } catch (err) {
//         console.error('Error fetching client:', err);
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (clientId) {
//       fetchClientData();
//     }
//   }, [clientId, urlDeliveryName]);
  

//   //  useEffect(() => {
//   //   if (clientData && urlDeliveryName) {
//   //     const deliveryIndex = clientData.deliveries.findIndex(
//   //       d => d.name.toLowerCase() === decodeURIComponent(urlDeliveryName).toLowerCase()
//   //     );
//   //     if (deliveryIndex !== -1) {
//   //       setSelectedDelivery(deliveryIndex);
//   //     }
//   //   }
//   // }, [clientData, urlDeliveryName]);

//   // // Update URL when selected delivery changes
//   // const handleDeliveryChange = (idx) => {
//   //   const newDeliveryName = encodeURIComponent(clientData.deliveries[idx].name);
//   //   // Update URL to use delivery name
//   //   router.push(`/${clientId}/preview?delivery=${newDeliveryName}`, undefined, { 
//   //     shallow: true 
//   //   });
//   //   setSelectedDelivery(idx);
//   //   setCurrentSlide(0);
//   // };

//   // // Fetch client data with delivery name handling
//   // useEffect(() => {
//   //   const fetchClientData = async () => {
//   //     try {
//   //       setLoading(true);
//   //       const response = await fetch('/api/get-data-for-preview', {
//   //         method: 'POST',
//   //         headers: {
//   //           'Content-Type': 'application/json',
//   //         },
//   //         body: JSON.stringify({ clientId }),
//   //       });
        
//   //       if (!response.ok) {
//   //         const data = await response.json();
//   //         throw new Error(data.error || 'Failed to fetch client data');
//   //       }
        
//   //       const { client } = await response.json();
//   //       setClientData(client);
        
//   //       // If there's a delivery name in the URL, select that delivery
//   //       if (urlDeliveryName) {
//   //         const deliveryIndex = client.deliveries.findIndex(
//   //           d => d.name.toLowerCase() === decodeURIComponent(urlDeliveryName).toLowerCase()
//   //         );
//   //         if (deliveryIndex !== -1) {
//   //           setSelectedDelivery(deliveryIndex);
//   //         }
//   //       }
//   //     } catch (err) {
//   //       console.error('Error fetching client:', err);
//   //       setError(err.message);
//   //     } finally {
//   //       setLoading(false);
//   //     }
//   //   };

//   //   if (clientId) {
//   //     fetchClientData();
//   //   }
//   // }, [clientId, urlDeliveryName]);

    
//     // Fetch client data
//     // useEffect(() => {
//     //   const fetchClientData = async () => {
//     //     try {
//     //       setLoading(true);
//     //       const response = await fetch('/api/get-data-for-preview', {
//     //         method: 'POST',
//     //         headers: {
//     //           'Content-Type': 'application/json',
//     //         },
//     //         body: JSON.stringify({ clientId }),
//     //       });
          
//     //       if (!response.ok) {
//     //         const data = await response.json();
//     //         throw new Error(data.error || 'Failed to fetch client data');
//     //       }
          
//     //       const { client } = await response.json();
//     //       setClientData(client);
//     //     } catch (err) {
//     //       console.error('Error fetching client:', err);
//     //       setError(err.message);
//     //     } finally {
//     //       setLoading(false);
//     //     }
//     //   };
  
//     //   if (clientId) {
//     //     fetchClientData();
//     //   }
//     // }, [clientId]);
  
//     // Download handlers
//     const downloadFile = async (url, filename, index, total) => {
//       try {
//         const response = await fetch(url);
//         const contentLength = response.headers.get('content-length');
//         const total = parseInt(contentLength, 10);
//         let loaded = 0;
  
//         const reader = response.body.getReader();
//         const chunks = [];
  
//         while (true) {
//           const { done, value } = await reader.read();
          
//           if (done) break;
          
//           chunks.push(value);
//           loaded += value.length;
          
//           const progress = (loaded / total) * 100;
//           setDownloadProgress(prev => ({
//             ...prev,
//             progress,
//             fileName: filename,
//             currentFileIndex: index
//           }));
//         }
  
//         const blob = new Blob(chunks);
//         const downloadUrl = window.URL.createObjectURL(blob);
//         const link = document.createElement('a');
//         link.href = downloadUrl;
//         link.download = filename;
//         document.body.appendChild(link);
//         link.click();
//         document.body.removeChild(link);
//         window.URL.revokeObjectURL(downloadUrl);
//       } catch (error) {
//         console.error('Download failed:', error);
//         setDownloadProgress(prev => ({
//           ...prev,
//           status: 'error',
//           fileName: `Failed to download ${filename}`
//         }));
//         throw error;
//       }
//     };
  
//     const downloadAllFiles = async (files) => {
//       setDownloading(true);
//       setDownloadProgress({
//         isVisible: true,
//         progress: 0,
//         fileName: '',
//         status: 'downloading',
//         totalFiles: files.length,
//         currentFileIndex: 0
//       });
  
//       try {
//         for (let i = 0; i < files.length; i++) {
//           const file = files[i];
//           await downloadFile(file.url, file.name, i, files.length);
//           await new Promise(resolve => setTimeout(resolve, 500));
//         }
        
//         setDownloadProgress(prev => ({
//           ...prev,
//           status: 'completed',
//           fileName: 'All files downloaded successfully',
//           progress: 100
//         }));
  
//         setTimeout(() => {
//           setDownloadProgress(prev => ({ ...prev, isVisible: false }));
//         }, 3000);
//       } catch (error) {
//         setDownloadProgress(prev => ({
//           ...prev,
//           status: 'error',
//           fileName: 'Download failed'
//         }));
//       } finally {
//         setDownloading(false);
//       }
//     };
  
//     const initializeRazorpay = () => {
//       return new Promise((resolve, reject) => {
//         const script = document.createElement("script");
//         script.src = "https://checkout.razorpay.com/v1/checkout.js";
//         script.async = true;
        
//         script.onload = () => {
//           console.log("Razorpay SDK loaded successfully");
//           resolve(true);
//         };
    
//         script.onerror = (error) => {
//           console.error("Razorpay SDK failed to load:", error);
//           reject(new Error("Failed to load Razorpay SDK"));
//         };
    
//         // Check if script already exists
//         if (document.querySelector('script[src="https://checkout.razorpay.com/v1/checkout.js"]')) {
//           console.log("Razorpay SDK already loaded");
//           resolve(true);
//           return;
//         }
    
//         document.body.appendChild(script);
//       });
//     };
//       const handleDownloadDelivery = async (files) => {
//           setDownloading(true);
//           try {
//             await downloadAllFiles(files);
//           } finally {
//             setDownloading(false);
//           }
//         };
    
//     // Payment handler
//     const handlePayment = async (amount, deliveryId = null, payAllDeliveries = false) => {
//       try {
//         setPaymentStatus({
//           show: true,
//           status: 'processing',
//           message: 'Initializing payment...'
//         });
    
//         await initializeRazorpay();
//         console.log("Creating order with amount:", amount);
    
//         const response = await fetch("/api/create-order", {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ amount }),
//         });
    
//         const data = await response.json();
//         console.log("Order creation response:", data);
    
//         const options = {
//           key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
//           amount: data.amount,
//           currency: data.currency,
//           name: "Delivery Payment",
//           description: payAllDeliveries ? "All Deliveries Payment" : "Single Delivery Payment",
//           order_id: data.id,
//           handler: async (res) => {
//             console.log("Full Razorpay response:", res);
            
//             setPaymentStatus({
//               show: true,
//               status: 'processing',
//               message: 'Verifying payment...'
//             });
    
//             try {
//               const verificationData = {
//                 razorpay_order_id: res.razorpay_order_id,
//                 razorpay_payment_id: res.razorpay_payment_id,
//                 razorpay_signature: res.razorpay_signature,
//                 deliveryId,
//                 clientId,
//                 payAllDeliveries
//               };
              
//               console.log("Sending verification data:", verificationData);
    
//               const verifyResponse = await fetch("/api/verify-payment", {
//                 method: "POST",
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify(verificationData),
//               });
    
//               console.log("Verification API response status:", verifyResponse.status);
//               const result = await verifyResponse.json();
//               console.log("Verification API response:", result);
    
//               if (result.success) {
//                 const updatedDeliveries = [...clientData.deliveries];
                
//                 if (payAllDeliveries) {
//                   updatedDeliveries.forEach(delivery => {
//                     if (delivery.paymentStatus === "Not Paid") {
//                       delivery.paymentStatus = "Paid";
//                     }
//                   });
//                 } else {
//                   const index = updatedDeliveries.findIndex(d => d.id === deliveryId);
//                   if (index !== -1) {
//                     updatedDeliveries[index].paymentStatus = "Paid";
//                   }
//                 }
                
//                 setClientData({ ...clientData, deliveries: updatedDeliveries });
                
//                 setPaymentStatus({
//                   show: true,
//                   status: 'success',
//                   message: 'Payment successful! Access granted to your files.'
//                 });
    
//                 setTimeout(() => {
//                   setPaymentStatus(prev => ({ ...prev, show: false }));
//                 }, 5000);
//               } else {
//                 console.error("Payment verification failed:", result);
//                 throw new Error('Payment verification failed');
//               }
//             } catch (error) {
//               console.error("Verification error:", error);
//               setPaymentStatus({
//                 show: true,
//                 status: 'error',
//                 message: 'Payment verification failed. Please contact support.'
//               });
//             }
//           },
//           prefill: {
//             name: "Customer",
//             email: "customer@example.com",
//           },
//           modal: {
//             ondismiss: function() {
//               console.log("Payment modal dismissed");
//               setPaymentStatus({
//                 show: true,
//                 status: 'error',
//                 message: 'Payment cancelled.'
//               });
//               setTimeout(() => {
//                 setPaymentStatus(prev => ({ ...prev, show: false }));
//               }, 3000);
//             }
//           },
//           theme: {
//             color: "#000000",
//           },
//         };
    
//         console.log("Initializing Razorpay with options:", {
//           ...options,
//           key: "HIDDEN" // Hide sensitive data
//         });
    
//         const paymentObject = new window.Razorpay(options);
//         paymentObject.on('payment.failed', function (response) {
//           console.log("Payment failed response:", response);
//           setPaymentStatus({
//             show: true,
//             status: 'error',
//             message: 'Payment failed. Please try again.'
//           });
//         });
        
//         paymentObject.open();
//       } catch (error) {
//         console.error("Payment initialization error:", error);
//         setPaymentStatus({
//           show: true,
//           status: 'error',
//           message: 'Payment failed. Please try again.'
//         });
//       }
//     };
  
//     // Navigation handlers
//     // const handleDeliveryChange = (idx) => {
//     //   setSelectedDelivery(idx);
//     //   setCurrentSlide(0);
//     // };
  
//     const handleNextSlide = () => {
//       setCurrentSlide((prev) => 
//         prev === clientData.deliveries[selectedDelivery].files.length - 1 ? 0 : prev + 1
//       );
//     };
  
//     const handlePrevSlide = () => {
//       setCurrentSlide((prev) => 
//         prev === 0 ? clientData.deliveries[selectedDelivery].files.length - 1 : prev - 1
//       );
//     };
 
  

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
//         <div className="w-16 h-16 border-4 border-black border-t-transparent rounded-full animate-spin" />
//       </div>
//     );
//   }

//   if (error || !clientData) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
//         <div className="bg-red-50 p-6 rounded-xl text-center max-w-md">
//           <X className="w-12 h-12 text-red-500 mx-auto mb-4" />
//           <h2 className="text-xl font-bold text-red-700 mb-2">Error Loading Client</h2>
//           <p className="text-red-600">{error || 'Client not found'}</p>
//         </div>
//       </div>
//     );
//   }

//   const currentDelivery = clientData.deliveries[selectedDelivery];
//   const currentFile = currentDelivery.files[currentSlide];
//   const isDeliveryPaid = currentDelivery.paymentStatus === "Paid";

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
//     {/* Progress Notifications */}
//     <AnimatePresence>
//       {paymentStatus.show && (
//         <PaymentProgress
//           status={paymentStatus.status}
//           message={paymentStatus.message}
//           onClose={() => setPaymentStatus(prev => ({ ...prev, show: false }))}
//         />
//       )}
//     </AnimatePresence>

//     <AnimatePresence>
//       {downloadProgress.isVisible && (
//         <DownloadProgress {...downloadProgress} />
//       )}
//     </AnimatePresence>

//     {/* Header Section */}
//     <div className="w-full bg-black text-white py-6 md:py-8">
//       <div className="max-w-7xl mx-auto px-4 md:px-8">
//         <h1 className="text-2xl md:text-4xl font-bold text-center">
//           Preview, Pay & Download Your Files
//         </h1>
//         <p className="text-center mt-2 text-gray-400 text-sm md:text-base">
//           Payment Mode: {clientData.modeOfPay} | Status: {clientData.status}
//         </p>
//       </div>
//     </div>

//     {/* Client Header with Deliveries */}
//     <div className="w-full bg-white/50 backdrop-blur-sm border-b border-gray-100">
//       <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 md:py-6">
//         <div className="flex items-center gap-2 text-sm text-gray-400 mb-4 md:mb-6">
//           <span>client</span>
//           <span>/</span>
//           <span className="text-gray-600 font-medium">{clientData.name}</span>
//         </div>

//         <div className="flex flex-wrap gap-2 md:gap-4">
//           {clientData.deliveries.map((delivery, idx) => (
//             <button
//               key={delivery.id}
//               onClick={() => handleDeliveryChange(idx)}
//               className={`px-4 md:px-8 py-2 md:py-3 rounded-xl md:rounded-2xl text-sm md:text-base 
//                         font-medium transition-all duration-300 flex items-center gap-2
//                         ${selectedDelivery === idx 
//                           ? 'bg-black text-white shadow-lg' 
//                           : 'bg-white/80 text-gray-600 hover:bg-white'}`}
//             >
//               {delivery.name}
//               {delivery.paymentStatus === "Paid" && (
//                 <Check className="w-4 h-4 text-green-500" />
//               )}
//             </button>
//           ))}
//         </div>
//       </div>
//     </div>

//     {/* Main Content Area */}
//     <div className="max-w-7xl mx-auto px-4 md:px-8 py-6 md:py-12">
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
//         <MediaViewer
//           currentFile={currentFile}
//           currentDelivery={currentDelivery}
//           isDeliveryPaid={isDeliveryPaid}
//           currentSlide={currentSlide}
//           handlePrevSlide={handlePrevSlide}
//           handleNextSlide={handleNextSlide}
//         />

//         {/* Right Sidebar */}
//         <div className="space-y-4 md:space-y-6">
//           <div className="bg-white rounded-xl p-4 md:p-6 shadow-lg border border-gray-100">
//             <h2 className="text-xl font-semibold mb-4">{currentDelivery.name}</h2>
//             <p className="text-gray-600 text-sm mb-4">{currentDelivery.desc}</p>
            
//             {isDeliveryPaid ? (
//               <>
//                 {/* Download buttons for current delivery */}
//                 <div className="space-y-2 mb-4">
//                   {currentDelivery.files.map((file) => (
//                     <button
//                       key={file.id}
//                       onClick={() => window.open(file.url, '_blank')}
//                       className="w-full p-3 bg-gray-50 rounded-xl flex items-center 
//                                justify-between hover:bg-gray-100 transition-colors"
//                     >
//                       <div className="flex items-center gap-3 min-w-0 flex-1">
//                         <FileText className="w-4 h-4 text-gray-400" />
//                         <span className="text-sm font-medium truncate">{file.name}</span>
//                       </div>
//                       <Download className="w-4 h-4" />
//                     </button>
//                   ))}
//                 </div>
//                 <button
//                   onClick={() => handleDownloadDelivery(currentDelivery.files)}
//                   disabled={downloading}
//                   className="w-full py-3 bg-black text-white rounded-xl font-medium
//                            flex items-center justify-center gap-2 disabled:bg-gray-400"
//                 >
//                   <Package className="w-5 h-5" />
//                   {downloading ? 'Downloading...' : 'Download All Files'}
//                 </button>
//               </>
//             ) : (
//               <button
//                 onClick={() => handlePayment(currentDelivery.cost, currentDelivery.id, false)}
//                 className="w-full py-3 bg-black text-white rounded-xl font-medium
//                          flex items-center justify-center gap-2"
//               >
//                 <CreditCard className="w-5 h-5" />
//                 Pay to Download Files (₹{currentDelivery.cost})
//               </button>
//             )}

//             {/* Show More Button */}
//             <button
//               onClick={() => setShowMore(!showMore)}
//               className="w-full mt-4 py-2 px-4 text-gray-600 hover:text-gray-800 
//                        flex items-center justify-center gap-2 text-sm"
//             >
//               {showMore ? (
//                 <>
//                   Show Less <ChevronUp className="w-4 h-4" />
//                 </>
//               ) : (
//                 <>
//                   Show More Details <ChevronDown className="w-4 h-4" />
//                 </>
//               )}
//             </button>
//           </div>

//           {/* Additional Information (Hidden by default) */}
//           <AnimatePresence>
//             {showMore && (
//               <motion.div
//                 initial={{ opacity: 0, height: 0 }}
//                 animate={{ opacity: 1, height: "auto" }}
//                 exit={{ opacity: 0, height: 0 }}
//                 className="space-y-4 overflow-hidden"
//               >
//                 {/* Status Information */}
//                 <div className="bg-gray-50 p-4 rounded-xl">
//                   <div className="flex items-center gap-2 mb-2">
//                     <Info className="w-5 h-5 text-gray-500" />
//                     <h3 className="font-medium text-gray-700">Delivery Status</h3>
//                   </div>
//                   <div className="space-y-2">
//                     {clientData.deliveries.map((delivery) => (
//                       <div 
//                         key={delivery.id}
//                         className="flex items-center justify-between text-sm"
//                       >
//                         <span className="text-gray-600">{delivery.name}</span>
//                         <span className={`px-2 py-0.5 rounded-full text-xs font-medium
//                           ${delivery.paymentStatus === "Paid" 
//                             ? 'bg-green-100 text-green-700'
//                             : 'bg-gray-100 text-gray-700'}`}
//                         >
//                           {delivery.paymentStatus}
//                         </span>
//                       </div>
//                     ))}
//                   </div>
//                 </div>

//                 {/* Pay All Deliveries Button */}
//                 {clientData.deliveries.some(d => d.paymentStatus === "Not Paid") && (
//                   <button
//                     onClick={() => {
//                       const unpaidTotal = clientData.deliveries
//                         .filter(d => d.paymentStatus === "Not Paid")
//                         .reduce((sum, d) => sum + d.cost, 0);
//                       handlePayment(unpaidTotal, null, true);
//                     }}
//                     className="w-full py-3 bg-gray-100 text-gray-700 hover:bg-gray-200 
//                              rounded-xl font-medium flex items-center justify-center gap-2"
//                   >
//                     <Package className="w-5 h-5" />
//                     Pay for All Deliveries
//                   </button>
//                 )}
//               </motion.div>
//             )}
//           </AnimatePresence>
//         </div>
//       </div>
//     </div>
//   </div>
//   );
// };

// export default PreviewPayment;

"use client"

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronLeft, ChevronRight, Download, CreditCard, 
  Check, FileText, Package, Info, X, StickyNote, Lock,
  Play, Pause, Loader, ChevronUp, ChevronDown
} from 'lucide-react';
import { useParams, useSearchParams, useRouter } from 'next/navigation';

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
const AudioPreview = ({ url, filename, isPaid }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const audioRef = useRef(null);

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
                  isPaid ? 'bg-green-500' : 'bg-black'
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
                       disabled:bg-gray-400 ${
                         isPaid ? 'bg-green-500 hover:bg-green-600' : 'bg-black hover:bg-gray-800'
                       }`}
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

// Media Viewer Component
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
        const shouldBlur = !isDeliveryPaid;
        const commonClassNames = `transition-all duration-300 ${shouldBlur ? 'filter blur-sm' : ''}`;
        
        return (
          <>
            <img
              src={currentFile.url}
              alt={currentFile.name}
              className={`${commonClassNames} w-full h-full object-cover`}
            />
            {shouldBlur && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                <div className="text-center text-white px-4">
                  <Lock className="w-6 h-6 mx-auto mb-2" />
                  <p className="font-medium text-sm">Payment Required to View Full Quality</p>
                </div>
              </div>
            )}
          </>
        );
    }
  };

  return (
    <div className="md:col-span-2">
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
        {/* Delivery Name Banner */}
        <div className={`px-4 py-2 ${
          isDeliveryPaid ? 'bg-green-500 text-white' : 'bg-black text-white'
        }`}>
          <h2 className="text-lg font-medium flex items-center gap-2">
            {currentDelivery.name}
            {isDeliveryPaid && <Check className="w-4 h-4" />}
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
                                ? `w-4 ${isDeliveryPaid ? 'bg-green-500' : 'bg-black'}` 
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
        setDownloadProgress(prev => ({ ...prev, isVisible: false }));
      }, 3000);
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Progress Notifications */}
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
                isDeliveryPaid ? 'text-green-600' : 'text-gray-900'
              }`}>
                {currentDelivery.name} {isDeliveryPaid && <Check className="inline-block w-4 h-4" />}
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
                              ? delivery.paymentStatus === "Paid"
                                ? 'bg-green-500 text-white shadow-lg'
                                : 'bg-black text-white shadow-lg'
                              : delivery.paymentStatus === "Paid"
                                ? 'bg-green-50 text-green-700 hover:bg-green-100'
                                : 'bg-white/80 text-gray-600 hover:bg-white'}`}
                >
                  {delivery.name}
                  {delivery.paymentStatus === "Paid" && (
                    <Check className="w-4 h-4" />
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
              
              {/* Payment or Download Section */}
              {isDeliveryPaid ? (
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
                    className="w-full py-3 bg-green-500 text-white rounded-xl font-medium
                             flex items-center justify-center gap-2 disabled:bg-gray-400
                             hover:bg-green-600 transition-colors"
                  >
                    <Package className="w-5 h-5" />
                    {downloading ? 'Downloading...' : 'Download All Files'}
                  </button>
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

                  {/* Pay All Deliveries Button */}
                  {clientData.deliveries.some(d => d.paymentStatus === "Not Paid") && (
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