// import React, { useState } from 'react';
// import { X, Copy, Check, ExternalLink, Share2 } from 'lucide-react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { generatePreviewUrl } from '@/app/utils/previewUtils'; // Import from utils

// const DeliverySuccessModal = ({ isOpen, onClose, clientId, deliveryName, clientName }) => {
//   const [copied, setCopied] = useState(false);
  
//   const previewUrl = generatePreviewUrl(clientId, deliveryName);
  
//   const copyToClipboard = async () => {
//     try {
//       await navigator.clipboard.writeText(previewUrl);
//       setCopied(true);
//       setTimeout(() => setCopied(false), 2000);
//     } catch (err) {
//       console.error('Failed to copy: ', err);
//     }
//   };

//   const openInNewTab = () => {
//     window.open(previewUrl, '_blank');
//   };

//   if (!isOpen) return null;

//   return (
//     <AnimatePresence>
//       <motion.div
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         exit={{ opacity: 0 }}
//         className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
//       >
//         <motion.div
//           initial={{ scale: 0.9, opacity: 0 }}
//           animate={{ scale: 1, opacity: 1 }}
//           exit={{ scale: 0.9, opacity: 0 }}
//           className="bg-white rounded-2xl max-w-md w-full overflow-hidden shadow-2xl"
//         >
//           {/* Header */}
//           <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-green-50 to-emerald-50">
//             <div className="flex justify-between items-center">
//               <div className="flex items-center gap-3">
//                 <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
//                   <Check className="w-6 h-6 text-green-600" />
//                 </div>
//                 <div>
//                   <h3 className="text-lg font-semibold text-gray-900">Delivery Created!</h3>
//                   <p className="text-sm text-gray-600">Ready to share with {clientName}</p>
//                 </div>
//               </div>
//               <button
//                 onClick={onClose}
//                 className="text-gray-400 hover:text-gray-600 transition-colors"
//               >
//                 <X className="w-5 h-5" />
//               </button>
//             </div>
//           </div>

//           {/* Content */}
//           <div className="p-6">
//             <div className="space-y-4">
//               {/* Delivery Info */}
//               <div className="bg-gray-50 rounded-lg p-4">
//                 <h4 className="text-sm font-medium text-gray-700 mb-2">Delivery Details</h4>
//                 <p className="text-gray-900 font-medium">{deliveryName}</p>
//                 <p className="text-sm text-gray-500">Client: {clientName}</p>
//               </div>

//               {/* Preview URL Section */}
//               <div className="space-y-3">
//                 <label className="text-sm font-medium text-gray-700">Preview Link</label>
                
//                 {/* URL Display */}
//                 <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg border border-gray-200">
//                   <div className="flex-1 min-w-0">
//                     <p className="text-sm text-gray-600 truncate" title={previewUrl}>
//                       {previewUrl}
//                     </p>
//                   </div>
//                   <button
//                     onClick={copyToClipboard}
//                     className={`p-2 rounded-md transition-colors ${
//                       copied 
//                         ? 'bg-green-100 text-green-600' 
//                         : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
//                     }`}
//                     title="Copy to clipboard"
//                   >
//                     {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
//                   </button>
//                 </div>

//                 {/* Copy Success Message */}
//                 <AnimatePresence>
//                   {copied && (
//                     <motion.div
//                       initial={{ opacity: 0, y: -10 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       exit={{ opacity: 0, y: -10 }}
//                       className="text-sm text-green-600 flex items-center gap-1"
//                     >
//                       <Check className="w-4 h-4" />
//                       Link copied to clipboard!
//                     </motion.div>
//                   )}
//                 </AnimatePresence>
//               </div>
//             </div>
//           </div>

//           {/* Footer Actions */}
//           <div className="p-6 border-t border-gray-200 bg-gray-50 flex flex-col sm:flex-row gap-3">
//             <button
//               onClick={copyToClipboard}
//               className={`flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
//                 copied
//                   ? 'bg-green-100 text-green-700 border border-green-200'
//                   : 'bg-blue-600 text-white hover:bg-blue-700'
//               }`}
//             >
//               {copied ? (
//                 <>
//                   <Check className="w-4 h-4" /> Copied!
//                 </>
//               ) : (
//                 <>
//                   <Share2 className="w-4 h-4" /> Copy Link
//                 </>
//               )}
//             </button>
            
//             <button
//               onClick={openInNewTab}
//               className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-100 transition-colors"
//             >
//               <ExternalLink className="w-4 h-4" /> Preview
//             </button>
            
//             <button
//               onClick={onClose}
//               className="flex items-center justify-center px-4 py-2 rounded-lg text-gray-500 hover:text-gray-700 transition-colors"
//             >
//               Close
//             </button>
//           </div>
//         </motion.div>
//       </motion.div>
//     </AnimatePresence>
//   );
// };

// export default DeliverySuccessModal;

import React, { useState } from 'react';
import { X, Copy, Check, ExternalLink, Share2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { generatePreviewUrl } from '@/app/utils/previewUtils'; // Import from utils

const DeliverySuccessModal = ({ isOpen, onClose, clientId, deliveryId, deliveryName, clientName }) => {
  const [copied, setCopied] = useState(false);
  
  const previewUrl = generatePreviewUrl(clientId, deliveryId);
  
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(previewUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  const openInNewTab = () => {
    window.open(previewUrl, '_blank');
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-white rounded-2xl max-w-md w-full overflow-hidden shadow-2xl"
        >
          {/* Header */}
          <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-green-50 to-emerald-50">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <Check className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Delivery Created!</h3>
                  <p className="text-sm text-gray-600">Ready to share with {clientName}</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            <div className="space-y-4">
              {/* Delivery Info */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Delivery Details</h4>
                <p className="text-gray-900 font-medium">{deliveryName}</p>
                <p className="text-sm text-gray-500">Client: {clientName}</p>
              </div>

              {/* Preview URL Section */}
              <div className="space-y-3">
                <label className="text-sm font-medium text-gray-700">Preview Link</label>
                
                {/* URL Display */}
                <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg border border-gray-200">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-600 truncate" title={previewUrl}>
                      {previewUrl}
                    </p>
                  </div>
                  <button
                    onClick={copyToClipboard}
                    className={`p-2 rounded-md transition-colors ${
                      copied 
                        ? 'bg-green-100 text-green-600' 
                        : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                    }`}
                    title="Copy to clipboard"
                  >
                    {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>

                {/* Copy Success Message */}
                <AnimatePresence>
                  {copied && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="text-sm text-green-600 flex items-center gap-1"
                    >
                      <Check className="w-4 h-4" />
                      Link copied to clipboard!
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="p-6 border-t border-gray-200 bg-gray-50 flex flex-col sm:flex-row gap-3">
            <button
              onClick={copyToClipboard}
              className={`flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                copied
                  ? 'bg-green-100 text-green-700 border border-green-200'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4" /> Copied!
                </>
              ) : (
                <>
                  <Share2 className="w-4 h-4" /> Copy Link
                </>
              )}
            </button>
            
            <button
              onClick={openInNewTab}
              className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-100 transition-colors"
            >
              <ExternalLink className="w-4 h-4" /> Preview
            </button>
            
            <button
              onClick={onClose}
              className="flex items-center justify-center px-4 py-2 rounded-lg text-gray-500 hover:text-gray-700 transition-colors"
            >
              Close
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default DeliverySuccessModal;