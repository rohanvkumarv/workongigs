
// 'use client';

// import React, { useState, useEffect, useRef } from 'react';
// import { 
//   Plus, Search, User, ArrowRight, ChevronDown, X, Check, Trash2,
//   FileText, Copy, Calendar, DollarSign, Edit, MessageCircle, FileUp, AlertTriangle, 
//   Paperclip, Pencil, Info, Camera, MoreHorizontal, ChevronUp, ArrowLeft
// } from 'lucide-react';
// import { useRouter } from 'next/navigation';
// import { useAuth } from '@/context/authContext';
// import Alert from '@/components/Alert';
// import { motion, AnimatePresence } from 'framer-motion';
// import FileUploadComponent from '../_components/FileUploadComponent';
// import DeliverySuccessModal from '../dashboard/_components/DeliverySuccessModal'; // Import success modal
// import { generatePreviewUrl } from '@/app/utils/previewUtils'; // Import preview utils
// import Image from 'next/image';

// const ClientsPage = () => {
//   const { freelancerId, email, isAuthenticated } = useAuth();
//   const router = useRouter();
//   const fileInputRef = useRef(null);

//   // State management
//   const [clients, setClients] = useState([]);
//   const [selectedClient, setSelectedClient] = useState(null);
//   const [selectedDelivery, setSelectedDelivery] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [alert, setAlert] = useState({ show: false, message: '', type: 'success' });
//   const [showClientInfo, setShowClientInfo] = useState(false);
  
//   // Mobile specific state
//   const [showMobileClientDetails, setShowMobileClientDetails] = useState(false);
  
//   // Modal states
//   const [showNewClientModal, setShowNewClientModal] = useState(false);
//   const [showNewDeliveryModal, setShowNewDeliveryModal] = useState(false);
//   const [showDeliveryDetailsModal, setShowDeliveryDetailsModal] = useState(false);
//   const [showEditDeliveryModal, setShowEditDeliveryModal] = useState(false);
//   const [showEditClientModal, setShowEditClientModal] = useState(false);
//   const [showSuccessModal, setShowSuccessModal] = useState(false);
//   const [createdDelivery, setCreatedDelivery] = useState(null);
  
//   // Form states
//   const [newClientForm, setNewClientForm] = useState({
//     name: '',
//     modeOfPay: 'Direct Payment',
//     status: 'Active',
//     email: '',
//     phone: '',
//     note: '',
//     image: ''
//   });
  
//   const [editClientForm, setEditClientForm] = useState({
//     name: '',
//     modeOfPay: 'Direct Payment',
//     status: 'Active',
//     email: '',
//     phone: '',
//     note: '',
//     image: ''
//   });
  
//   const [newDeliveryForm, setNewDeliveryForm] = useState({
//     name: '',
//     desc: '',
//     cost: '',
//     PaymentStatus: 'Not Paid'
//   });

//   const [editDeliveryForm, setEditDeliveryForm] = useState({
//     name: '',
//     desc: '',
//     cost: '',
//     PaymentStatus: ''
//   });
  
//   const [uploadedFiles, setUploadedFiles] = useState([]);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [uploadingImage, setUploadingImage] = useState(false);
//   const [previewImage, setPreviewImage] = useState('');

//   // Enhanced file upload tracking for new delivery
//   const [totalFilesSelected, setTotalFilesSelected] = useState(0);
//   const [filesUploadingCount, setFilesUploadingCount] = useState(0);
//   const [uploadErrors, setUploadErrors] = useState([]);
//   const [uploadProgress, setUploadProgress] = useState({}); // Track individual file progress

//   // Platform fee percentage
//   const PLATFORM_FEE = 3.75;

//   // Enhanced upload status checks
//   const isUploadingFiles = filesUploadingCount > 0;
//   const hasFilesSelected = totalFilesSelected > 0;
//   const allFilesUploaded = hasFilesSelected && uploadedFiles.length === totalFilesSelected && !isUploadingFiles;
//   const hasUploadErrors = uploadErrors.length > 0;

//   // Enhanced form submission check
//   const canSubmit = !isUploadingFiles && !isSubmitting && (
//     !hasFilesSelected || // No files selected, can submit
//     (allFilesUploaded && !hasUploadErrors) // All files uploaded successfully
//   );

//   // Calculate amount after platform fee deduction
//   const calculateNetAmount = (amount) => {
//     return amount - (amount * PLATFORM_FEE / 100);
//   };

//   // Display amount based on payment status
//   const getDisplayAmount = (delivery) => {
//     if (delivery.PaymentStatus === 'Paid') {
//       return calculateNetAmount(delivery.cost || 0);
//     }
//     return delivery.cost || 0;
//   };

//   // Enhanced file selection handler
//   const handleFilesSelected = (files) => {
//     setTotalFilesSelected(prev => prev + files.length);
//     setFilesUploadingCount(prev => prev + files.length);
//     setUploadErrors([]); // Clear previous errors
    
//     // Initialize progress tracking for each file
//     files.forEach(file => {
//       setUploadProgress(prev => ({
//         ...prev,
//         [file.name]: 0
//       }));
//     });
//   };

//   // Enhanced upload error handler
//   const handleUploadError = (file, error) => {
//     setUploadErrors(prev => [...prev, { fileName: file.name, error: error.message }]);
//     setFilesUploadingCount(prev => Math.max(0, prev - 1));
    
//     // Remove from progress tracking
//     setUploadProgress(prev => {
//       const newProgress = { ...prev };
//       delete newProgress[file.name];
//       return newProgress;
//     });
//   };

//   // Enhanced upload completion handler
//   const handleUploadComplete = (fileInfo) => {
//     setUploadedFiles(prev => [...prev, fileInfo]);
//     setFilesUploadingCount(prev => Math.max(0, prev - 1));
    
//     // Remove from progress tracking
//     setUploadProgress(prev => {
//       const newProgress = { ...prev };
//       delete newProgress[fileInfo.name];
//       return newProgress;
//     });
//   };

//   // Enhanced upload progress handler (if your upload component supports it)
//   const handleUploadProgress = (fileName, progress) => {
//     setUploadProgress(prev => ({
//       ...prev,
//       [fileName]: progress
//     }));
//   };

//   // Reset upload state when modal closes
//   const resetUploadState = () => {
//     setUploadedFiles([]);
//     setTotalFilesSelected(0);
//     setFilesUploadingCount(0);
//     setUploadErrors([]);
//     setUploadProgress({});
//   };

//   // Handle success modal close
//   const handleSuccessModalClose = () => {
//     setShowSuccessModal(false);
//     setCreatedDelivery(null);
//   };

//   // Fetch clients on component mount
//   useEffect(() => {
//     fetchClients();
//   }, [freelancerId]);

//   const fetchClients = async () => {
//     if (!freelancerId) return;
    
//     try {
//       setLoading(true);
//       const response = await fetch('/api/freelancer/get-clients', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ freelancerId })
//       });
      
//       const data = await response.json();
//       if (!response.ok) throw new Error(data.error || 'Failed to fetch clients');
      
//       setClients(data || []);
      
//       // Select the first client by default if available
//       if (data?.length > 0 && !selectedClient) {
//         setSelectedClient(data[0]);
//       }
//     } catch (error) {
//       console.error('Error fetching clients:', error);
//       showAlert('Failed to fetch clients', 'error');
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Handle client selection
//   const handleSelectClient = (client) => {
//     setSelectedClient(client);
//     setSelectedDelivery(null);
//     setShowClientInfo(false);
//     // For mobile: show the client details view when a client is selected
//     setShowMobileClientDetails(true);
//   };

//   // Handle delivery selection
//   const handleSelectDelivery = (delivery) => {
//     setSelectedDelivery(delivery);
//     setShowDeliveryDetailsModal(true);
//   };

//   // Handle edit delivery
//   const handleEditDelivery = (delivery) => {
//     setSelectedDelivery(delivery);
//     setEditDeliveryForm({
//       name: delivery.name,
//       desc: delivery.desc || '',
//       cost: delivery.cost ? delivery.cost.toString() : '0',
//       PaymentStatus: delivery.PaymentStatus || 'Not Paid'
//     });
//     setShowEditDeliveryModal(true);
//   };
  
//   // Handle edit client
//   const handleEditClient = (client) => {
//     setEditClientForm({
//       name: client.name,
//       modeOfPay: client.modeOfPay,
//       status: client.status,
//       email: client.email || '',
//       phone: client.phone || '',
//       note: client.note || '',
//       image: client.image || ''
//     });
//     setPreviewImage(client.image || '');
//     setShowEditClientModal(true);
//   };

//   // Show alert message
//   const showAlert = (message, type = 'success') => {
//     setAlert({
//       show: true,
//       message,
//       type
//     });
//     setTimeout(() => setAlert({ ...alert, show: false }), 3000);
//   };

//   // Copy preview link to clipboard
//   const copyPreviewLink = (clientId, deliveryId) => {
//     const previewLink = generatePreviewUrl(clientId, deliveryId);
//     navigator.clipboard.writeText(previewLink);
//     showAlert('Preview link copied to clipboard!', 'success');
//   };

//   // Calculate total paid amount for a client (with platform fee deduction)
//   const calculateTotalAmount = (deliveries = []) => {
//     return deliveries
//       .filter(delivery => delivery?.PaymentStatus === 'Paid')
//       .reduce((sum, delivery) => sum + calculateNetAmount(delivery?.cost || 0), 0);
//   };
  
//   // Calculate total unpaid amount for a client (with platform fee deduction)
//   const calculateUnpaidAmount = (deliveries = []) => {
//     return deliveries
//       .filter(delivery => delivery?.PaymentStatus !== 'Paid')
//       .reduce((sum, delivery) => sum + calculateNetAmount(delivery?.cost || 0), 0);
//   };

//   // Check if a client has any pending revisions
//   const hasRevisions = (client) => {
//     return client.deliveries.some(delivery => 
//       delivery.revisions && delivery.revisions.length > 0
//     );
//   };

//   // Filter clients based on search term
//   const filteredClients = clients?.filter(client =>
//     (client?.name && client.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
//     (client?.email && client.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
//     (client?.phone && client.phone.includes(searchTerm))
//   ) || [];

//   // Handle client image click
//   const handleClientImageClick = () => {
//     if (showEditClientModal) {
//       fileInputRef.current?.click();
//     }
//   };

//   // Handle client image change
//   const handleClientImageChange = async (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     // Validate file type
//     const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
//     if (!allowedTypes.includes(file.type)) {
//       showAlert('Please upload a valid image file (JPEG, PNG, GIF, WEBP)', 'error');
//       return;
//     }

//     // Validate file size (max 5MB)
//     if (file.size > 5 * 1024 * 1024) {
//       showAlert('Image size should be less than 5MB', 'error');
//       return;
//     }

//     // Create a preview
//     const reader = new FileReader();
//     reader.onload = () => {
//       setPreviewImage(reader.result);
//     };
//     reader.readAsDataURL(file);

//     // Upload to S3
//     setUploadingImage(true);
//     try {
//       const formData = new FormData();
//       formData.append('file', file);
//       formData.append('clientId', selectedClient?.id || 'new');

//       const response = await fetch('/api/clients/upload-client-image', {
//         method: 'POST',
//         body: formData
//       });

//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.error || 'Failed to upload image');
//       }

//       const data = await response.json();
      
//       // Update form with the new image URL
//       if (showEditClientModal) {
//         setEditClientForm(prev => ({
//           ...prev,
//           image: data.imageUrl
//         }));
//       } else {
//         setNewClientForm(prev => ({
//           ...prev,
//           image: data.imageUrl
//         }));
//       }
      
//     } catch (error) {
//       console.error('Error:', error);
//       showAlert('Error uploading image', 'error');
//     } finally {
//       setUploadingImage(false);
//     }
//   };

//   // Create new client
//   const handleCreateClient = async () => {
//     if (!newClientForm.name.trim()) {
//       showAlert('Client name is required', 'error');
//       return;
//     }
    
//     try {
//       setIsSubmitting(true);
      
//       const response = await fetch('/api/freelancer/create-client', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           ...newClientForm,
//           freelancerId
//         })
//       });
      
//       const data = await response.json();
      
//       if (!response.ok) {
//         throw new Error(data.error || 'Failed to create client');
//       }
      
//       // Add the new client to the clients list, ensuring it has an empty deliveries array
//       const newClient = {
//         ...data.client,
//         deliveries: []
//       };
      
//       setClients(prev => [...prev, newClient]);
//       setSelectedClient(newClient);
//       setShowNewClientModal(false);
//       setNewClientForm({
//         name: '',
//         modeOfPay: 'Direct Payment',
//         status: 'Active',
//         email: '',
//         phone: '',
//         note: '',
//         image: ''
//       });
//       setPreviewImage('');
//       showAlert('Client created successfully', 'success');
      
//       // For mobile view, show the client details after creating
//       setShowMobileClientDetails(true);
      
//       // Refresh clients list
//       fetchClients();
//     } catch (error) {
//       console.error('Error creating client:', error);
//       showAlert('Failed to create client', 'error');
//     } finally {
//       setIsSubmitting(false);
//     }
//   };
  
//   // Update client
//   const handleUpdateClient = async () => {
//     if (!editClientForm.name.trim()) {
//       showAlert('Client name is required', 'error');
//       return;
//     }
    
//     try {
//       setIsSubmitting(true);
      
//       const response = await fetch('/api/freelancer/update-client', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           ...editClientForm,
//           clientId: selectedClient.id
//         })
//       });
      
//       const data = await response.json();
      
//       if (!response.ok) {
//         throw new Error(data.error || 'Failed to update client');
//       }
      
//       // Update the client in the clients list
//       setClients(prev => prev.map(client => 
//         client.id === selectedClient.id ? data.client : client
//       ));
      
//       // Update the selected client
//       setSelectedClient(data.client);
//       setShowEditClientModal(false);
//       setPreviewImage('');
//       showAlert('Client updated successfully', 'success');
      
//     } catch (error) {
//       console.error('Error updating client:', error);
//       showAlert('Failed to update client', 'error');
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   // Create new delivery
//   const handleCreateDelivery = async () => {
//     if (!newDeliveryForm.name.trim() || !newDeliveryForm.cost) {
//       showAlert('Delivery name and cost are required', 'error');
//       return;
//     }
    
//     try {
//       setIsSubmitting(true);
      
//       const response = await fetch('/api/freelancer/create-delivery', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           ...newDeliveryForm,
//           clientId: selectedClient.id,
//           cost: parseFloat(newDeliveryForm.cost),
//           files: uploadedFiles
//         })
//       });
      
//       const data = await response.json();
      
//       if (!response.ok) {
//         throw new Error(data.error || 'Failed to create delivery');
//       }
      
//       // Update the selected client with the new delivery
//       const newDelivery = data.delivery;
      
//       setSelectedClient(prev => ({
//         ...prev,
//         deliveries: [...(prev.deliveries || []), newDelivery]
//       }));
      
//       // Update client in the clients list
//       setClients(prev => prev.map(client => 
//         client.id === selectedClient.id 
//           ? { 
//               ...client, 
//               deliveries: [...(client.deliveries || []), newDelivery]
//             }
//           : client
//       ));
      
//       setShowNewDeliveryModal(false);
//       setNewDeliveryForm({
//         name: '',
//         desc: '',
//         cost: '',
//         PaymentStatus: 'Not Paid'
//       });
//       resetUploadState();
      
//       // Show success modal with preview URL
//       setCreatedDelivery({
//         name: newDelivery.name,
//         clientId: selectedClient.id,
//         clientName: selectedClient.name
//       });
//       setShowSuccessModal(true);
      
//       // Refresh clients list
//       fetchClients();
//     } catch (error) {
//       console.error('Error creating delivery:', error);
//       showAlert('Failed to create delivery', 'error');
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   // Update delivery
//   const handleUpdateDelivery = async () => {
//     if (!editDeliveryForm.name.trim() || !editDeliveryForm.cost) {
//       showAlert('Delivery name and cost are required', 'error');
//       return;
//     }
    
//     try {
//       setIsSubmitting(true);
      
//       const response = await fetch('/api/update-delivery', {
//         method: 'PUT',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           deliveryId: selectedDelivery.id,
//           name: editDeliveryForm.name,
//           desc: editDeliveryForm.desc,
//           cost: parseFloat(editDeliveryForm.cost),
//           paymentStatus: editDeliveryForm.PaymentStatus,
//           files: uploadedFiles
//         })
//       });
      
//       const data = await response.json();
      
//       if (!response.ok) {
//         throw new Error(data.error || 'Failed to update delivery');
//       }
      
//       // Update the selected delivery
//       const updatedDelivery = data.delivery;
      
//       // Update selected client's delivery
//       setSelectedClient(prev => ({
//         ...prev,
//         deliveries: prev.deliveries.map(d => 
//           d.id === selectedDelivery.id ? updatedDelivery : d
//         )
//       }));
      
//       // Update clients list
//       setClients(prev => prev.map(client => 
//         client.id === selectedClient.id 
//           ? { 
//               ...client, 
//               deliveries: client.deliveries.map(d => 
//                 d.id === selectedDelivery.id ? updatedDelivery : d
//               )
//             }
//           : client
//       ));
      
//       setSelectedDelivery(updatedDelivery);
//       setShowEditDeliveryModal(false);
//       setUploadedFiles([]);
//       showAlert('Delivery updated successfully', 'success');
      
//       // Refresh clients list
//       fetchClients();
//     } catch (error) {
//       console.error('Error updating delivery:', error);
//       showAlert('Failed to update delivery', 'error');
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   // Delete delivery
//   const handleDeleteDelivery = async (delivery) => {
//     if (!confirm(`Are you sure you want to delete "${delivery.name}"? This action cannot be undone.`)) {
//       return;
//     }
    
//     try {
//       const response = await fetch('/api/delete-delivery', {
//         method: 'DELETE',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           deliveryId: delivery.id
//         })
//       });
      
//       const data = await response.json();
//       if (!response.ok) throw new Error(data.error || 'Failed to delete delivery');
      
//       // Update selected client's deliveries
//       setSelectedClient(prev => ({
//         ...prev,
//         deliveries: prev.deliveries.filter(d => d.id !== delivery.id)
//       }));
      
//       // Update clients list
//       setClients(prev => prev.map(client => 
//         client.id === selectedClient.id 
//           ? { 
//               ...client, 
//               deliveries: client.deliveries.filter(d => d.id !== delivery.id)
//             }
//           : client
//       ));
      
//       // Close delivery details modal if it's open
//       if (selectedDelivery && selectedDelivery.id === delivery.id) {
//         setShowDeliveryDetailsModal(false);
//         setSelectedDelivery(null);
//       }
      
//       showAlert('Delivery deleted successfully', 'success');
//     } catch (error) {
//       console.error('Error deleting delivery:', error);
//       showAlert('Failed to delete delivery', 'error');
//     }
//   };

//   // Mark delivery as paid/unpaid
//   const togglePaymentStatus = async (delivery) => {
//     const newStatus = delivery.PaymentStatus === 'Paid' ? 'Not Paid' : 'Paid';
    
//     try {
//       const response = await fetch('/api/update-delivery-status', {
//         method: 'PUT',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           deliveryId: delivery.id,
//           paymentStatus: newStatus
//         })
//       });
      
//       const data = await response.json();
//       if (!response.ok) throw new Error(data.error || 'Failed to update payment status');
      
//       // Update selected client's delivery
//       setSelectedClient(prev => ({
//         ...prev,
//         deliveries: prev.deliveries.map(d => 
//           d.id === delivery.id ? { ...d, PaymentStatus: newStatus } : d
//         )
//       }));
      
//       // Update clients list
//       setClients(prev => prev.map(client => 
//         client.id === selectedClient.id 
//           ? { 
//               ...client, 
//               deliveries: client.deliveries.map(d => 
//                 d.id === delivery.id ? { ...d, PaymentStatus: newStatus } : d
//               )
//             }
//           : client
//       ));
      
//       // Update selected delivery if it's the one being updated
//       if (selectedDelivery && selectedDelivery.id === delivery.id) {
//         setSelectedDelivery({ ...selectedDelivery, PaymentStatus: newStatus });
//       }
      
//       showAlert(`Delivery marked as ${newStatus}`, 'success');
//     } catch (error) {
//       console.error('Error updating payment status:', error);
//       showAlert('Failed to update payment status', 'error');
//     }
//   };

//   // Handle deleting a file
//   const handleDeleteFile = async (fileId) => {
//     if (!confirm('Are you sure you want to delete this file?')) return;
    
//     try {
//       const response = await fetch('/api/delete-file', {
//         method: 'DELETE',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ fileId })
//       });
      
//       const result = await response.json();
//       if (!response.ok) throw new Error(result.error || 'Failed to delete file');
      
//       // Update the selected delivery to reflect the deleted file
//       setSelectedDelivery(prev => ({
//         ...prev,
//         files: prev.files.filter(file => file.id !== fileId)
//       }));
      
//       showAlert('File deleted successfully', 'success');
//     } catch (error) {
//       console.error('Error deleting file:', error);
//       showAlert('Failed to delete file', 'error');
//     }
//   };

//   // Enhanced Upload Status Display Component
//   const UploadStatusDisplay = () => {
//     if (totalFilesSelected === 0) return null;

//     return (
//       <div className="space-y-2">
//         {/* Overall Status */}
//         <div className={`p-3 rounded-lg border text-sm ${
//           hasUploadErrors
//             ? 'bg-red-50 border-red-200 text-red-700'
//             : isUploadingFiles 
//               ? 'bg-blue-50 border-blue-200 text-blue-700' 
//               : allFilesUploaded 
//                 ? 'bg-green-50 border-green-200 text-green-700'
//                 : 'bg-yellow-50 border-yellow-200 text-yellow-700'
//         }`}>
//           {hasUploadErrors && (
//             <div className="flex items-center gap-2">
//               <AlertTriangle className="w-4 h-4" />
//               <span>❌ {uploadErrors.length} file(s) failed. {uploadedFiles.length} uploaded successfully.</span>
//             </div>
//           )}
//           {!hasUploadErrors && isUploadingFiles && (
//             <div className="flex items-center gap-2">
//               <div className="animate-spin w-4 h-4 border-t-2 border-b-2 border-blue-500 rounded-full"></div>
//               <span>📤 Uploading... ({uploadedFiles.length}/{totalFilesSelected})</span>
//             </div>
//           )}
//           {!hasUploadErrors && allFilesUploaded && (
//             <div className="flex items-center gap-2">
//               <Check className="w-4 h-4" />
//               <span>✅ All {uploadedFiles.length} file(s) uploaded successfully!</span>
//             </div>
//           )}
//         </div>

//         {/* Individual File Progress (if supported) */}
//         {Object.keys(uploadProgress).length > 0 && (
//           <div className="space-y-1">
//             {Object.entries(uploadProgress).map(([fileName, progress]) => (
//               <div key={fileName} className="flex items-center gap-2 text-xs">
//                 <span className="truncate flex-1">{fileName}</span>
//                 <div className="w-20 bg-gray-200 rounded-full h-1">
//                   <div 
//                     className="bg-blue-500 h-1 rounded-full transition-all duration-300" 
//                     style={{ width: `${progress}%` }}
//                   ></div>
//                 </div>
//                 <span>{progress}%</span>
//               </div>
//             ))}
//           </div>
//         )}

//         {/* Upload Errors */}
//         {hasUploadErrors && (
//           <div className="space-y-1">
//             <h5 className="text-xs font-medium text-red-700">Failed uploads:</h5>
//             {uploadErrors.map((error, index) => (
//               <div key={index} className="text-xs text-red-600 bg-red-50 p-2 rounded border">
//                 <span className="font-medium">{error.fileName}:</span> {error.error}
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     );
//   };

//   // Enhanced Create Delivery Button Component
//   const CreateDeliveryButton = () => {
//     const getButtonText = () => {
//       if (isSubmitting) return 'Creating...';
//       if (isUploadingFiles) return `Uploading Files... (${uploadedFiles.length}/${totalFilesSelected})`;
//       if (hasUploadErrors) return 'Upload Failed - Retry';
//       return 'Create Delivery';
//     };

//     const getButtonIcon = () => {
//       if (isSubmitting || isUploadingFiles) {
//         return <span className="animate-spin mr-2 h-4 w-4 border-t-2 border-b-2 border-white rounded-full"></span>;
//       }
//       if (hasUploadErrors) {
//         return <AlertTriangle className="w-4 h-4 mr-1" />;
//       }
//       return <Check className="w-4 h-4 mr-1" />;
//     };

//     const getButtonStyle = () => {
//       if (!canSubmit || !newDeliveryForm.name.trim() || !newDeliveryForm.cost) {
//         return 'bg-gray-300 text-gray-500 cursor-not-allowed';
//       }
//       if (hasUploadErrors) {
//         return 'bg-red-500 text-white hover:bg-red-600';
//       }
//       return 'bg-black text-white hover:bg-gray-800';
//     };

//     const getTooltipText = () => {
//       if (!newDeliveryForm.name.trim()) return 'Please enter delivery name';
//       if (!newDeliveryForm.cost) return 'Please enter cost';
//       if (isUploadingFiles) return `Please wait for files to finish uploading (${uploadedFiles.length}/${totalFilesSelected})`;
//       if (hasUploadErrors) return 'Some files failed to upload. Please retry or remove failed files.';
//       if (isSubmitting) return 'Creating delivery...';
//       return 'Create delivery';
//     };

//     return (
//       <button
//         onClick={handleCreateDelivery}
//         disabled={!canSubmit || !newDeliveryForm.name.trim() || !newDeliveryForm.cost}
//         className={`px-6 py-2 rounded-lg transition-colors flex items-center justify-center ${getButtonStyle()}`}
//         title={getTooltipText()}
//       >
//         {getButtonIcon()}
//         {getButtonText()}
//       </button>
//     );
//   };

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Alert message */}
//       {alert.show && (
//         <Alert
//           message={alert.message}
//           type={alert.type}
//           onClose={() => setAlert({ ...alert, show: false })}
//         />
//       )}
      
//       {/* Success Modal */}
//       <DeliverySuccessModal
//         isOpen={showSuccessModal}
//         onClose={handleSuccessModalClose}
//         clientId={createdDelivery?.clientId}
//         deliveryName={createdDelivery?.name}
//         clientName={createdDelivery?.clientName}
//       />
      
//       {/* Main container */}
//       <div className="flex flex-col md:flex-row h-[calc(100vh-5px)]">
//         {/* Left sidebar - Clients list - Hidden on mobile when client details are shown */}
//         <div className={`w-full md:w-80 lg:w-96 bg-white border-r border-gray-200 flex flex-col h-full relative transition-all duration-300 
//                         ${showMobileClientDetails ? 'hidden md:flex' : 'flex'}`}>
//           {/* Search header */}
//           <div className="p-4 border-b border-gray-200">
//             <div className="relative mb-4">
//               <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//               <input 
//                 type="text"
//                 placeholder="Search clients..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:border-gray-400 focus:ring-0 transition-colors"
//               />
//             </div>
//           </div>
          
//           {/* Clients list */}
//           <div className="flex-1 overflow-y-auto pb-20">
//             {loading ? (
//               <div className="flex justify-center items-center h-full">
//                 <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black"></div>
//               </div>
//             ) : filteredClients.length === 0 ? (
//               <div className="flex flex-col items-center justify-center h-full p-6 text-center">
//                 <User className="w-16 h-16 text-gray-300 mb-4" />
//                 {searchTerm ? (
//                   <>
//                     <h3 className="text-lg font-medium text-gray-900 mb-2">No matching clients</h3>
//                     <p className="text-gray-500 mb-4">Try a different search term</p>
//                     <button
//                       onClick={() => setSearchTerm('')}
//                       className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
//                     >
//                       Clear Search
//                     </button>
//                   </>
//                 ) : (
//                   <>
//                     <h3 className="text-lg font-medium text-gray-900 mb-2">No clients yet</h3>
//                     <p className="text-gray-500 mb-4">Get started by adding your first client</p>
//                     <button
//                       onClick={() => setShowNewClientModal(true)}
//                       className="px-4 py-2 bg-black text-white rounded-lg flex items-center gap-2 hover:bg-gray-800 transition-colors"
//                     >
//                       <Plus className="w-4 h-4" />
//                       <span>Add New Client</span>
//                     </button>
//                   </>
//                 )}
//               </div>
//             ) : (
//               <div className="divide-y divide-gray-100">
//                 {filteredClients.map((client) => (
//                   <button
//                     key={client.id}
//                     onClick={() => handleSelectClient(client)}
//                     className={`w-full flex items-center p-4 hover:bg-gray-50 transition-colors ${
//                       selectedClient?.id === client.id ? 'bg-yellow-300' : ''
//                     } ${hasRevisions(client) ? 'border-l-4 border-red-500' : ''}`}
//                   >
//                     <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0 overflow-hidden">
//                       {client.image ? (
//                         <div className="relative w-full h-full">
//                           <img 
//                             src={client.image} 
//                             alt={client.name} 
//                             className="object-cover w-full h-full"
//                           />
//                         </div>
//                       ) : (
//                         <User className="w-6 h-6 text-gray-500" />
//                       )}
//                     </div>
//                     <div className="flex-1 text-left min-w-0">
//                       <h3 className="font-medium text-gray-900 truncate">{client.name}</h3>
//                       <div className="flex items-center text-sm text-gray-500 mt-1">
//                         <span className="truncate">
//                           {client.deliveries?.length || 0} deliveries
//                         </span>
//                         {hasRevisions(client) && (
//                           <>
//                             <span className="mx-1">•</span>
//                             <span className="text-red-600 font-medium">Revisions</span>
//                           </>
//                         )}
//                       </div>
//                     </div>
//                     <ArrowRight className="w-5 h-5 text-gray-400 flex-shrink-0" />
//                   </button>
//                 ))}
//               </div>
//             )}
//           </div>
          
//           {/* Add New Client button (fixed at bottom) */}
//           <div className="absolute bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200">
//             <button
//               onClick={() => setShowNewClientModal(true)}
//               className="w-full px-4 py-2 bg-black text-white rounded-lg flex items-center justify-center gap-2 hover:bg-gray-800 transition-colors"
//             >
//               <Plus className="w-5 h-5" />
//               <span>Add New Client</span>
//             </button>
//           </div>
//         </div>
        
//         {/* Right content - Delivery details - Shown on mobile when client is selected */}
//         <div className={`flex-1 flex flex-col h-full relative bg-white md:bg-transparent transition-all duration-300
//                         ${showMobileClientDetails ? 'flex' : 'hidden md:flex'}`}>
//           {selectedClient ? (
//             <>
//               {/* Mobile back button header */}
//               <div className="md:hidden p-4 bg-white border-b border-gray-200">
//                 <button
//                   onClick={() => setShowMobileClientDetails(false)}
//                   className="flex items-center text-gray-700 font-medium"
//                 >
//                   <ArrowLeft className="w-5 h-5 mr-2" />
//                   Back to Clients
//                 </button>
//               </div>
              
//               {/* Client header */}
//               <div className="p-4 bg-white border-b border-gray-200">
//                 <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
//                   <div className="flex items-center">
//                     <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center mr-3 overflow-hidden">
//                       {selectedClient.image ? (
//                         <div className="relative w-full h-full">
//                           <img 
//                             src={selectedClient.image} 
//                             alt={selectedClient.name} 
//                             className="object-cover w-full h-full"
//                           />
//                         </div>
//                       ) : (
//                         <User className="w-5 h-5 text-gray-500" />
//                       )}
//                     </div>
//                     <div>
//                       <div className="flex items-center flex-wrap gap-2">
//                         <h2 className="font-medium text-gray-900">{selectedClient.name}</h2>
//                         <button 
//                           onClick={() => setShowClientInfo(!showClientInfo)}
//                           className="p-1 rounded-full hover:bg-blue-50 text-blue-500 transition-colors"
//                           title={showClientInfo ? "Hide client info" : "Show client info"}
//                         >
//                           {showClientInfo ? <ChevronUp className="w-4 h-4" /> : <Info className="w-4 h-4" />}
//                         </button>
//                         <button 
//                           onClick={() => handleEditClient(selectedClient)}
//                           className="p-1 rounded-full hover:bg-blue-50 text-blue-500 transition-colors"
//                           title="Edit client"
//                         >
//                           <Edit className="w-4 h-4" />
//                         </button>
//                       </div>
//                       {selectedClient.phone && (
//                         <p className="text-sm text-gray-500 mt-1">{selectedClient.phone}</p>
//                       )}
//                     </div>
//                   </div>
//                   <div className="flex gap-4 items-center">
//                     <div className="text-right">
//                       <div className="flex items-center gap-2">
//                         <p className="text-sm text-gray-500">Total paid</p>
//                         <p className="font-semibold text-green-600">
//                           ₹{calculateTotalAmount(selectedClient.deliveries).toLocaleString()}
//                         </p>
//                       </div>
//                       <div className="flex items-center gap-2">
//                         <p className="text-sm text-gray-500">Unpaid</p>
//                         <p className="font-semibold text-yellow-600">
//                           ₹{calculateUnpaidAmount(selectedClient.deliveries).toLocaleString()}
//                         </p>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
                
//                 {/* Expanded client info */}
//                 <AnimatePresence>
//                   {showClientInfo && (
//                     <motion.div
//                       initial={{ height: 0, opacity: 0 }}
//                       animate={{ height: 'auto', opacity: 1 }}
//                       exit={{ height: 0, opacity: 0 }}
//                       className="overflow-hidden"
//                     >
//                       <div className="mt-3 p-3 bg-gray-50 rounded-lg">
//                         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 text-sm">
//                           {selectedClient.email && (
//                             <div>
//                               <span className="text-gray-500">Email:</span>
//                               <p className="text-gray-900 break-words">{selectedClient.email}</p>
//                             </div>
//                           )}
//                           {selectedClient.modeOfPay && (
//                             <div>
//                               <span className="text-gray-500">Payment Mode:</span>
//                               <p className="text-gray-900">{selectedClient.modeOfPay}</p>
//                             </div>
//                           )}
//                           <div>
//                             <span className="text-gray-500">Status:</span>
//                             <p className="text-gray-900">{selectedClient.status}</p>
//                           </div>
//                           <div>
//                             <span className="text-gray-500">Client since:</span>
//                             <p className="text-gray-900">{new Date(selectedClient.createdAt).toLocaleDateString()}</p>
//                           </div>
//                         </div>
//                         {selectedClient.note && (
//                           <div className="mt-2">
//                             <span className="text-gray-500">Notes:</span>
//                             <p className="text-gray-900 mt-1 p-2 bg-white rounded border border-gray-200">{selectedClient.note}</p>
//                           </div>
//                         )}
//                       </div>
//                     </motion.div>
//                   )}
//                 </AnimatePresence>
//               </div>
              
//               {/* Deliveries list */}
//               <div className="flex-1 overflow-y-auto bg-white p-4 pb-20">
//                 {!selectedClient.deliveries || selectedClient.deliveries.length === 0 ? (
//                   <div className="flex flex-col items-center justify-center h-full text-center">
//                     <FileText className="w-16 h-16 text-gray-300 mb-4" />
//                     <h3 className="text-lg font-medium text-gray-900 mb-2">No deliveries yet</h3>
//                     <p className="text-gray-500 mb-4">Create your first delivery for this client</p>
//                     <button
//                       onClick={() => setShowNewDeliveryModal(true)}
//                       className="px-4 py-2 bg-black text-white rounded-lg flex items-center gap-2 hover:bg-gray-800 transition-colors"
//                     >
//                       <Plus className="w-4 h-4" />
//                       <span>Create Delivery</span>
//                     </button>
//                   </div>
//                 ) : (
//                   <div className="space-y-4">
//                     {selectedClient.deliveries.map((delivery) => (
//                       <div
//                         key={delivery.id}
//                         className={`bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all p-4 ${
//                           delivery.revisions && delivery.revisions.length > 0 ? 'border-l-4 border-red-500' : ''
//                         }`}
//                       >
//                         <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 mb-3">
//                           <h3 
//                             className="font-medium text-gray-900 hover:text-black cursor-pointer"
//                             onClick={() => handleSelectDelivery(delivery)}
//                           >
//                             {delivery.name}
//                           </h3>
//                           <div className="flex items-center gap-2 flex-wrap">
//                             <button
//                               onClick={() => togglePaymentStatus(delivery)}
//                               className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${
//                                 delivery.PaymentStatus === 'Paid'
//                                   ? 'bg-green-100 text-green-800 hover:bg-green-200'
//                                   : 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200'
//                               } transition-colors`}
//                             >
//                               {delivery.PaymentStatus === 'Paid' ? <Check className="w-3 h-3" /> : null}
//                               {delivery.PaymentStatus}
//                             </button>
//                             <button
//                               onClick={() => handleEditDelivery(delivery)}
//                               className="p-1 hover:bg-blue-100 rounded-full transition-colors"
//                               title="Edit delivery"
//                             >
//                               <Pencil className="w-4 h-4 text-blue-500" />
//                             </button>
//                             <button
//                               onClick={() => copyPreviewLink(selectedClient.id, delivery.id)}
//                               className="p-1 hover:bg-gray-100 rounded-full transition-colors"
//                               title="Copy preview link"
//                             >
//                               <Copy className="w-4 h-4 text-gray-500" />
//                             </button>
//                             <button
//                               onClick={() => handleDeleteDelivery(delivery)}
//                               className="p-1 hover:bg-red-100 rounded-full transition-colors"
//                               title="Delete delivery"
//                             >
//                               <Trash2 className="w-4 h-4 text-red-500" />
//                             </button>
//                           </div>
//                         </div>
//                         <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4 text-sm">
//                           <div className="flex items-center text-gray-600">
//                             <Calendar className="w-4 h-4 mr-2 flex-shrink-0" />
//                             <span>{new Date(delivery.createdAt).toLocaleDateString()}</span>
//                           </div>
//                           <div className="flex items-center text-gray-600">
//                             <Paperclip className="w-4 h-4 mr-2 flex-shrink-0" />
//                             <span>{delivery.files?.length || 0} files</span>
//                           </div>
//                           <div className="flex items-center text-gray-600">
//                             <span className="font-medium">
//                               ₹ {getDisplayAmount(delivery).toLocaleString()}
//                               {delivery.PaymentStatus === 'Paid' && (
//                                 <span className="text-xs text-gray-500 ml-1">(after fees)</span>
//                               )}
//                             </span>
//                           </div>
//                         </div>
//                         <div className="mt-3 text-sm text-gray-500 line-clamp-2" title={delivery.desc}>
//                           {delivery.desc || 'No description'}
//                         </div>
//                         <div className="mt-3 flex justify-end">
//                           <button
//                             onClick={() => handleSelectDelivery(delivery)}
//                             className="px-3 py-1 text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors flex items-center gap-1"
//                           >
//                             <MessageCircle className="w-3 h-3" />
//                             View Details
//                           </button>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 )}
//               </div>
              
//               {/* New Delivery floating button */}
//               <div className="absolute bottom-6 right-6">
//                 <button
//                   onClick={() => setShowNewDeliveryModal(true)}
//                   className="p-3 h-12 bg-black text-white rounded-lg flex items-center justify-center hover:bg-gray-800 transition-colors shadow-lg"
//                 >
//                   <Plus className="w-5 h-5 md:mr-2" />
//                   <span className="hidden md:inline">Add New Delivery</span>
//                 </button>
//               </div>
//             </>
//           ) : (
//             <div className="flex flex-col items-center justify-center h-full bg-gray-50 p-6 text-center">
//               <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
//                 <User className="w-10 h-10 text-gray-400" />
//               </div>
//               <h2 className="text-xl font-semibold text-gray-900 mb-2">No client selected</h2>
//               <p className="text-gray-500 mb-6 max-w-md">
//                 Select a client from the list to view their deliveries or create a new client to get started.
//               </p>
//               <button
//                 onClick={() => setShowNewClientModal(true)}
//                 className="px-4 py-2 bg-black text-white rounded-lg flex items-center gap-2 hover:bg-gray-800 transition-colors"
//               >
//                 <Plus className="w-4 h-4" />
//                 <span>Add New Client</span>
//               </button>
              
//               {/* Mobile-only back button when no client is selected */}
//               <button
//                 onClick={() => setShowMobileClientDetails(false)}
//                 className="mt-4 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg md:hidden flex items-center gap-2"
//               >
//                 <ArrowLeft className="w-4 h-4" />
//                 <span>Back to Clients</span>
//               </button>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* New Client Modal */}
//       <AnimatePresence>
//         {showNewClientModal && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
//           >
//             <motion.div
//               initial={{ scale: 0.95, opacity: 0 }}
//               animate={{ scale: 1, opacity: 1 }}
//               exit={{ scale: 0.95, opacity: 0 }}
//               className="bg-white rounded-2xl max-w-3xl w-full overflow-hidden max-h-[90vh]"
//             >
//               <div className="p-4 sm:p-6 border-b border-gray-200">
//                 <div className="flex justify-between items-center">
//                   <h3 className="text-lg sm:text-xl font-semibold text-gray-900">Add New Client</h3>
//                   <button
//                     onClick={() => {
//                       setShowNewClientModal(false);
//                       setPreviewImage('');
//                     }}
//                     className="text-gray-400 hover:text-gray-600 transition-colors"
//                   >
//                     <X className="w-5 h-5" />
//                   </button>
//                 </div>
//               </div>
              
//               <div className="p-4 sm:p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
//                 <div className="flex flex-col md:flex-row gap-6">
//                   {/* Left Column - Client Image */}
//                   <div className="flex flex-col items-center">
//                     <div 
//                       className="relative w-24 h-24 rounded-full overflow-hidden mb-2 border-2 border-gray-200 cursor-pointer"
//                       onClick={() => fileInputRef.current?.click()}
//                     >
//                       {previewImage ? (
//                         <img 
//                           src={previewImage} 
//                           alt="Client" 
//                           className={`object-cover w-full h-full ${uploadingImage ? 'opacity-50' : ''}`}
//                         />
//                       ) : (
//                         <div className="w-full h-full bg-gray-100 flex items-center justify-center">
//                           <User className="w-10 h-10 text-gray-400" />
//                         </div>
//                       )}
                      
//                       <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
//                         <Camera className="w-8 h-8 text-white" />
//                       </div>
                      
//                       {uploadingImage && (
//                         <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-70">
//                           <svg className="animate-spin h-6 w-6 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                             <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                             <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                           </svg>
//                         </div>
//                       )}
//                     </div>
                    
//                     <span className="text-sm text-gray-500">
//                       Click to upload profile picture
//                     </span>
                    
//                     <input 
//                       type="file" 
//                       ref={fileInputRef} 
//                       onChange={handleClientImageChange}
//                       accept="image/jpeg, image/png, image/gif, image/webp" 
//                       className="hidden" 
//                     />
//                   </div>
                  
//                   {/* Right Column - Form Fields */}
//                   <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
//                     {/* Client Name */}
//                     <div className="space-y-2">
//                       <label className="text-sm font-medium text-gray-700">Client Name *</label>
//                       <input
//                         type="text"
//                         value={newClientForm.name}
//                         onChange={(e) => setNewClientForm({...newClientForm, name: e.target.value})}
//                         placeholder="Enter client name"
//                         className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-gray-400 focus:ring-0 transition-colors"
//                         required
//                       />
//                     </div>
                    
//                     {/* Payment Mode */}
//                     <div className="space-y-2">
//                       <label className="text-sm font-medium text-gray-700">Payment Mode</label>
//                       <select
//                         value={newClientForm.modeOfPay}
//                         onChange={(e) => setNewClientForm({...newClientForm, modeOfPay: e.target.value})}
//                         className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-gray-400 focus:ring-0 transition-colors"
//                       >
//                         <option value="Direct Payment">Direct Payment</option>
//                         {/* <option value="Pay Later">Pay Later</option> */}
//                       </select>
//                     </div>
                    
//                     {/* Email (Optional) */}
//                     <div className="space-y-2">
//                       <label className="text-sm font-medium text-gray-700">Email (Optional)</label>
//                       <input
//                         type="email"
//                         value={newClientForm.email}
//                         onChange={(e) => setNewClientForm({...newClientForm, email: e.target.value})}
//                         placeholder="Enter client email"
//                         className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-gray-400 focus:ring-0 transition-colors"
//                       />
//                     </div>
                    
//                     {/* Phone (Optional) */}
//                     <div className="space-y-2">
//                       <label className="text-sm font-medium text-gray-700">Phone</label>
//                       <input
//                         type="tel"
//                         value={newClientForm.phone}
//                         onChange={(e) => setNewClientForm({...newClientForm, phone: e.target.value})}
//                         placeholder="Enter client phone"
//                         className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-gray-400 focus:ring-0 transition-colors"
//                       />
//                     </div>
                    
//                     {/* Note (Optional) - Full Width */}
//                     <div className="space-y-2 md:col-span-2">
//                       <label className="text-sm font-medium text-gray-700">Notes (Optional)</label>
//                       <textarea
//                         value={newClientForm.note}
//                         onChange={(e) => setNewClientForm({...newClientForm, note: e.target.value})}
//                         placeholder="Add notes about this client"
//                         rows={3}
//                         className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-gray-400 focus:ring-0 transition-colors resize-none"
//                       />
//                     </div>
//                   </div>
//                 </div>
//               </div>
              
//               <div className="p-4 sm:p-6 border-t border-gray-200 bg-gray-50 flex flex-col sm:flex-row justify-end gap-3">
//                 <button
//                   onClick={() => {
//                     setShowNewClientModal(false);
//                     setPreviewImage('');
//                   }}
//                   className="px-4 py-2 rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-100 transition-colors"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   onClick={handleCreateClient}
//                   disabled={isSubmitting || !newClientForm.name.trim() || uploadingImage}
//                   className="px-6 py-2 rounded-lg bg-black text-white hover:bg-gray-800 transition-colors flex items-center justify-center disabled:bg-gray-400"
//                 >
//                   {isSubmitting ? (
//                     <>
//                       <span className="animate-spin mr-2 h-4 w-4 border-t-2 border-b-2 border-white rounded-full"></span>
//                       Creating...
//                     </>
//                   ) : (
//                     <>
//                       <Check className="w-4 h-4 mr-1" /> Create Client
//                     </>
//                   )}
//                 </button>
//               </div>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       {/* Edit Client Modal */}
//       <AnimatePresence>
//         {showEditClientModal && selectedClient && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
//           >
//             <motion.div
//               initial={{ scale: 0.95, opacity: 0 }}
//               animate={{ scale: 1, opacity: 1 }}
//               exit={{ scale: 0.95, opacity: 0 }}
//               className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden"
//             >
//               <div className="p-4 sm:p-6 border-b border-gray-200">
//                 <div className="flex justify-between items-center">
//                   <h3 className="text-lg sm:text-xl font-semibold text-gray-900">Edit Client</h3>
//                   <button
//                     onClick={() => {
//                       setShowEditClientModal(false);
//                       setPreviewImage('');
//                     }}
//                     className="text-gray-400 hover:text-gray-600 transition-colors"
//                   >
//                     <X className="w-5 h-5" />
//                   </button>
//                 </div>
//               </div>
              
//               <div className="p-4 sm:p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
//                 <div className="flex flex-col md:flex-row gap-6">
//                   {/* Left Column - Client Image */}
//                   <div className="flex flex-col items-center">
//                     <div 
//                       className="relative w-24 h-24 rounded-full overflow-hidden mb-2 border-2 border-gray-200 cursor-pointer"
//                       onClick={() => fileInputRef.current?.click()}
//                     >
//                       {previewImage || editClientForm.image ? (
//                         <img 
//                           src={previewImage || editClientForm.image} 
//                           alt="Client" 
//                           className={`object-cover w-full h-full ${uploadingImage ? 'opacity-50' : ''}`}
//                         />
//                       ) : (
//                         <div className="w-full h-full bg-gray-100 flex items-center justify-center">
//                           <User className="w-10 h-10 text-gray-400" />
//                         </div>
//                       )}
                      
//                       <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
//                         <Camera className="w-8 h-8 text-white" />
//                       </div>
                      
//                       {uploadingImage && (
//                         <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-70">
//                           <svg className="animate-spin h-6 w-6 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                             <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                             <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                           </svg>
//                         </div>
//                       )}
//                     </div>
                    
//                     <span className="text-sm text-gray-500">
//                       Click to {editClientForm.image ? 'change' : 'upload'} profile picture
//                     </span>
                    
//                     <input 
//                       type="file" 
//                       ref={fileInputRef} 
//                       onChange={handleClientImageChange}
//                       accept="image/jpeg, image/png, image/gif, image/webp" 
//                       className="hidden" 
//                     />
//                   </div>
                  
//                   {/* Right Column - Form Fields */}
//                   <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
//                     {/* Client Name */}
//                     <div className="space-y-2">
//                       <label className="text-sm font-medium text-gray-700">Client Name *</label>
//                       <input
//                         type="text"
//                         value={editClientForm.name}
//                         onChange={(e) => setEditClientForm({...editClientForm, name: e.target.value})}
//                         placeholder="Enter client name"
//                         className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-gray-400 focus:ring-0 transition-colors"
//                         required
//                       />
//                     </div>
                    
//                     {/* Payment Mode */}
//                     <div className="space-y-2">
//                       <label className="text-sm font-medium text-gray-700">Payment Mode</label>
//                       <select
//                         value={editClientForm.modeOfPay}
//                         onChange={(e) => setEditClientForm({...editClientForm, modeOfPay: e.target.value})}
//                         className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-gray-400 focus:ring-0 transition-colors"
//                       >
//                          <option value="Direct Payment">Direct Payment</option>
//                          <option value="Pay Later">Pay Later</option>
//                       </select>
//                     </div>
                    
//                     {/* Status */}
//                     <div className="space-y-2">
//                       <label className="text-sm font-medium text-gray-700">Status</label>
//                       <select
//                         value={editClientForm.status}
//                         onChange={(e) => setEditClientForm({...editClientForm, status: e.target.value})}
//                         className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-gray-400 focus:ring-0 transition-colors"
//                       >
//                         <option value="Active">Active</option>
//                         <option value="Inactive">Inactive</option>
//                       </select>
//                     </div>
                    
//                     {/* Email (Optional) */}
//                     <div className="space-y-2">
//                       <label className="text-sm font-medium text-gray-700">Email (Optional)</label>
//                       <input
//                         type="email"
//                         value={editClientForm.email}
//                         onChange={(e) => setEditClientForm({...editClientForm, email: e.target.value})}
//                         placeholder="Enter client email"
//                         className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-gray-400 focus:ring-0 transition-colors"
//                       />
//                     </div>
                    
//                     {/* Phone (Optional) */}
//                     <div className="space-y-2">
//                       <label className="text-sm font-medium text-gray-700">Phone </label>
//                       <input
//                         type="tel"
//                         value={editClientForm.phone}
//                         onChange={(e) => setEditClientForm({...editClientForm, phone: e.target.value})}
//                         placeholder="Enter client phone"
//                         className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-gray-400 focus:ring-0 transition-colors"
//                       />
//                     </div>
                    
//                     {/* Note (Optional) - Full Width */}
//                     <div className="space-y-2 md:col-span-2">
//                       <label className="text-sm font-medium text-gray-700">Notes (Optional)</label>
//                       <textarea
//                         value={editClientForm.note}
//                         onChange={(e) => setEditClientForm({...editClientForm, note: e.target.value})}
//                         placeholder="Add notes about this client"
//                         rows={3}
//                         className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-gray-400 focus:ring-0 transition-colors resize-none"
//                       />
//                     </div>
//                   </div>
//                 </div>
//               </div>
              
//               <div className="p-4 sm:p-6 border-t border-gray-200 bg-gray-50 flex flex-col sm:flex-row justify-end gap-3">
//                 <button
//                   onClick={() => {
//                     setShowEditClientModal(false);
//                     setPreviewImage('');
//                   }}
//                   className="px-4 py-2 rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-100 transition-colors"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   onClick={handleUpdateClient}
//                   disabled={isSubmitting || !editClientForm.name.trim() || uploadingImage}
//                   className="px-6 py-2 rounded-lg bg-black text-white hover:bg-gray-800 transition-colors flex items-center justify-center disabled:bg-gray-400"
//                 >
//                   {isSubmitting ? (
//                     <>
//                       <span className="animate-spin mr-2 h-4 w-4 border-t-2 border-b-2 border-white rounded-full"></span>
//                       Updating...
//                     </>
//                   ) : (
//                     <>
//                       <Check className="w-4 h-4 mr-1" /> Save Changes
//                     </>
//                   )}
//                 </button>
//               </div>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>
          
     
//       {/* Delivery Details Modal */}
//       <AnimatePresence>
//         {showDeliveryDetailsModal && selectedDelivery && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
//           >
//             <motion.div
//               initial={{ scale: 0.95, opacity: 0 }}
//               animate={{ scale: 1, opacity: 1 }}
//               exit={{ scale: 0.95, opacity: 0 }}
//               className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden"
//             >
//               <div className="p-4 sm:p-6 border-b border-gray-200">
//                 <div className="flex justify-between items-center">
//                   <h3 className="text-lg sm:text-xl font-semibold text-gray-900">
//                     {selectedDelivery.name}
//                   </h3>
//                   <button
//                     onClick={() => setShowDeliveryDetailsModal(false)}
//                     className="text-gray-400 hover:text-gray-600 transition-colors"
//                   >
//                     <X className="w-5 h-5" />
//                   </button>
//                 </div>
//               </div>
              
//               <div className="p-4 sm:p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
//                 <div className="space-y-6">
//                   {/* Status and Cost */}
//                   <div className="flex flex-wrap gap-4 items-center justify-between">
//                     <button
//                       onClick={() => togglePaymentStatus(selectedDelivery)}
//                       className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 ${
//                         selectedDelivery.PaymentStatus === 'Paid'
//                           ? 'bg-green-100 text-green-800 hover:bg-green-200'
//                           : 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200'
//                       } transition-colors`}
//                     >
//                       {selectedDelivery.PaymentStatus === 'Paid' ? <Check className="w-4 h-4" /> : null}
//                       {selectedDelivery.PaymentStatus}
//                     </button>
                    
//                     <div className="bg-gray-100 px-4 py-2 rounded-lg">
//                       <span className="text-sm text-gray-500 mr-2">
//                         {selectedDelivery.PaymentStatus === 'Paid' ? 'Net Amount:' : 'Cost:'}
//                       </span>
//                       <span className="font-semibold text-gray-900">
//                         ₹{getDisplayAmount(selectedDelivery).toLocaleString()}
//                         {selectedDelivery.PaymentStatus === 'Paid' && (
//                           <span className="text-xs text-gray-500 ml-1">(after 3.75% fee)</span>
//                         )}
//                       </span>
//                     </div>
//                   </div>
                  
//                   {/* Description */}
//                   <div className="space-y-2">
//                     <h4 className="text-sm font-medium text-gray-700">Description</h4>
//                     <div className="bg-gray-50 p-4 rounded-lg text-gray-700">
//                       {selectedDelivery.desc || 'No description provided'}
//                     </div>
//                   </div>
                  
//                   {/* Files */}
//                   <div className="space-y-2">
//                     <h4 className="text-sm font-medium text-gray-700">Files</h4>
//                     {selectedDelivery.files && selectedDelivery.files.length > 0 ? (
//                       <div className="space-y-2">
//                         {selectedDelivery.files.map((file, index) => (
//                           <a 
//                             key={index} 
//                             href={file.url}
//                             target="_blank"
//                             rel="noopener noreferrer"
//                             className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors border border-gray-200"
//                           >
//                             <div className="flex items-center gap-3 min-w-0">
//                               <FileText className="w-5 h-5 text-gray-500 flex-shrink-0" />
//                               <span className="text-sm text-gray-700 truncate">{file.name}</span>
//                             </div>
//                             <div className="flex items-center gap-2 ml-2">
//                               <span className="text-xs text-gray-500 hidden sm:inline">
//                                 {new Date(file.createdAt).toLocaleDateString()}
//                               </span>
//                               <FileUp className="w-4 h-4 text-gray-400" />
//                             </div>
//                           </a>
//                         ))}
//                       </div>
//                     ) : (
//                       <div className="flex flex-col items-center justify-center p-8 bg-gray-50 rounded-lg border border-gray-200 border-dashed">
//                         <AlertTriangle className="w-10 h-10 text-gray-300 mb-2" />
//                         <p className="text-gray-500">No files attached to this delivery</p>
//                       </div>
//                     )}
//                   </div>
                  
//                   {/* Metadata */}
//                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                     <div className="space-y-1">
//                       <h4 className="text-xs font-medium text-gray-500">Created On</h4>
//                       <p className="text-sm text-gray-900">
//                         {new Date(selectedDelivery.createdAt).toLocaleDateString()} 
//                         <span className="text-gray-500 ml-1">
//                           ({new Date(selectedDelivery.createdAt).toLocaleTimeString()})
//                         </span>
//                       </p>
//                     </div>
//                     <div className="space-y-1">
//                       <h4 className="text-xs font-medium text-gray-500">Last Updated</h4>
//                       <p className="text-sm text-gray-900">
//                         {new Date(selectedDelivery.updatedAt).toLocaleDateString()}
//                         <span className="text-gray-500 ml-1">
//                           ({new Date(selectedDelivery.updatedAt).toLocaleTimeString()})
//                         </span>
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               </div>
              
//               <div className="p-4 sm:p-6 border-t border-gray-200 bg-gray-50 flex flex-col sm:flex-row sm:justify-between gap-3">
//                 <button
//                   onClick={() => {
//                     setShowDeliveryDetailsModal(false);
//                     handleEditDelivery(selectedDelivery);
//                   }}
//                   className="px-4 py-2 rounded-lg bg-blue-50 text-blue-700 border border-blue-200 hover:bg-blue-100 transition-colors flex items-center justify-center gap-2"
//                 >
//                   <Edit className="w-4 h-4" />
//                   Edit Delivery
//                 </button>
                
//                 <div className="flex flex-col sm:flex-row gap-3">
//                   <button
//                     onClick={() => handleDeleteDelivery(selectedDelivery)}
//                     className="px-4 py-2 rounded-lg bg-red-50 text-red-700 border border-red-200 hover:bg-red-100 transition-colors flex items-center justify-center gap-2"
//                   >
//                     <Trash2 className="w-4 h-4" />
//                     Delete
//                   </button>
//                   <button
//                     onClick={() => setShowDeliveryDetailsModal(false)}
//                     className="px-4 py-2 rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-100 transition-colors"
//                   >
//                     Close
//                   </button>
//                   <button
//                     onClick={() => copyPreviewLink(selectedClient.id, selectedDelivery.id)}
//                     className="px-4 py-2 rounded-lg bg-black text-white hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
//                   >
//                     <Copy className="w-4 h-4" />
//                     Copy Preview Link
//                   </button>
//                 </div>
//               </div>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>
      
//       {/* New Delivery Modal - Enhanced */}
//       <AnimatePresence>
//         {showNewDeliveryModal && selectedClient && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
//           >
//             <motion.div
//               initial={{ scale: 0.95, opacity: 0 }}
//               animate={{ scale: 1, opacity: 1 }}
//               exit={{ scale: 0.95, opacity: 0 }}
//               className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden"
//             >
//               <div className="p-4 sm:p-6 border-b border-gray-200">
//                 <div className="flex justify-between items-center">
//                   <h3 className="text-lg sm:text-xl font-semibold text-gray-900">
//                     New Delivery for {selectedClient.name}
//                   </h3>
//                   <button
//                     onClick={() => {
//                       setShowNewDeliveryModal(false);
//                       resetUploadState();
//                       setNewDeliveryForm({
//                         name: '',
//                         desc: '',
//                         cost: '',
//                         PaymentStatus: 'Not Paid'
//                       });
//                     }}
//                     className="text-gray-400 hover:text-gray-600 transition-colors"
//                   >
//                     <X className="w-5 h-5" />
//                   </button>
//                 </div>
//               </div>
              
//               <div className="p-4 sm:p-6 space-y-4 overflow-y-auto max-h-[calc(90vh-140px)]">
//                 {/* Delivery Name and Cost in one row */}
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   {/* Delivery Name */}
//                   <div className="space-y-2">
//                     <label className="text-sm font-medium text-gray-700">Delivery Name *</label>
//                     <input
//                       type="text"
//                       value={newDeliveryForm.name}
//                       onChange={(e) => setNewDeliveryForm({...newDeliveryForm, name: e.target.value})}
//                       placeholder="Enter delivery name"
//                       className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-gray-400 focus:ring-0 transition-colors"
//                       required
//                     />
//                   </div>
                  
//                   {/* Cost */}
//                   <div className="space-y-2">
//                     <label className="text-sm font-medium text-gray-700">Cost *</label>
//                     <div className="flex items-center">
//                       <span className="px-3 py-2 rounded-l-lg border border-r-0 border-gray-200 bg-gray-50 text-gray-500">₹</span>
//                       <input
//                         type="number"
//                         value={newDeliveryForm.cost}
//                         onChange={(e) => setNewDeliveryForm({...newDeliveryForm, cost: e.target.value})}
//                         placeholder="Enter cost"
//                         className="w-full px-4 py-2 rounded-r-lg border border-gray-200 focus:border-gray-400 focus:ring-0 transition-colors"
//                         required
//                       />
//                     </div>
//                   </div>
//                 </div>
                
//                 {/* Description */}
//                 <div className="space-y-2">
//                   <label className="text-sm font-medium text-gray-700">Description</label>
//                   <textarea
//                     value={newDeliveryForm.desc}
//                     onChange={(e) => setNewDeliveryForm({...newDeliveryForm, desc: e.target.value})}
//                     placeholder="Enter delivery description"
//                     rows={4}
//                     className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-gray-400 focus:ring-0 transition-colors resize-none"
//                   />
//                 </div>
                
//                 {/* File Upload Section */}
//                 <div className="space-y-3">
//                   <label className="text-sm font-medium text-gray-700">Upload Files (Optional)</label>
                  
//                   {/* Enhanced Upload Status Display */}
//                   <UploadStatusDisplay />
                  
//                   {/* Display uploaded files - Compact view */}
//                   {uploadedFiles.length > 0 && (
//                     <div className="space-y-2">
//                       <h4 className="text-sm font-medium text-gray-700">Uploaded Files:</h4>
//                       <div className="max-h-32 overflow-y-auto space-y-1">
//                         {uploadedFiles.map((file, index) => (
//                           <div key={index} className="flex items-center justify-between p-2 bg-green-50 rounded-md border border-green-200">
//                             <div className="flex items-center gap-2 min-w-0">
//                               <Check className="w-3 h-3 text-green-500 flex-shrink-0" />
//                               <span className="text-xs text-gray-700 truncate">{file.name}</span>
//                             </div>
//                             <button
//                               onClick={() => setUploadedFiles(files => files.filter((_, i) => i !== index))}
//                               className="p-1 hover:bg-red-50 rounded-sm text-red-500 transition-colors ml-1"
//                               disabled={isUploadingFiles} // Disable during upload
//                             >
//                               <Trash2 className="w-3 h-3" />
//                             </button>
//                           </div>
//                         ))}
//                       </div>
//                     </div>
//                   )}
                  
//                   {/* File Drop Area */}
//                   <div className="w-full">
//                     <FileUploadComponent 
//                       onUploadComplete={handleUploadComplete}
//                       onFilesSelected={handleFilesSelected}
//                       onUploadError={handleUploadError}
//                       onUploadProgress={handleUploadProgress} // If your component supports this
//                       disabled={isSubmitting} // Disable file upload during form submission
//                     />
//                   </div>
//                 </div>
//               </div>
              
//               {/* Modal Footer with Enhanced Button */}
//               <div className="p-4 sm:p-6 border-t border-gray-200 bg-gray-50 flex flex-col sm:flex-row justify-end gap-3">
//                 <button
//                   onClick={() => {
//                     setShowNewDeliveryModal(false);
//                     resetUploadState();
//                     setNewDeliveryForm({
//                       name: '',
//                       desc: '',
//                       cost: '',
//                       PaymentStatus: 'Not Paid'
//                     });
//                   }}
//                   disabled={isSubmitting} // Disable cancel during submission
//                   className="px-4 py-2 rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-100 transition-colors disabled:opacity-50"
//                 >
//                   Cancel
//                 </button>
                
//                 {/* Enhanced Create Delivery Button */}
//                 <CreateDeliveryButton />
//               </div>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>
      
//       {/* Edit Delivery Modal */}
//       <AnimatePresence>
//         {showEditDeliveryModal && selectedDelivery && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
//           >
//             <motion.div
//               initial={{ scale: 0.95, opacity: 0 }}
//               animate={{ scale: 1, opacity: 1 }}
//               exit={{ scale: 0.95, opacity: 0 }}
//               className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] relative overflow-hidden"
//             >
//               <div className="sticky top-0 bg-white z-10 border-b border-gray-200">
//                 <div className="flex justify-between items-center p-4 sm:p-6">
//                   <h3 className="text-lg sm:text-xl font-semibold text-gray-900">Edit Delivery</h3>
//                   <button 
//                     onClick={() => {
//                       setShowEditDeliveryModal(false);
//                       setUploadedFiles([]);
//                     }}
//                     className="text-gray-400 hover:text-gray-600 transition-colors"
//                   >
//                     <X className="w-5 h-5" />
//                   </button>
//                 </div>
//               </div>
              
//               <div className="p-4 sm:p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
//                 <div className="space-y-6">
//                   {/* Name and Cost in one row */}
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                     {/* Name */}
//                     <div className="space-y-2">
//                       <label className="text-sm font-medium text-gray-700">Delivery Name</label>
//                       <input
//                         type="text"
//                         value={editDeliveryForm.name}
//                         onChange={(e) => setEditDeliveryForm({...editDeliveryForm, name: e.target.value})}
//                         className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
//                       />
//                     </div>
                    
//                     {/* Cost */}
//                     <div className="space-y-2">
//                       <label className="text-sm font-medium text-gray-700">Cost</label>
//                       <div className="flex items-center">
//                         <span className="px-4 py-3 rounded-l-lg border border-r-0 border-gray-200 bg-gray-50">₹</span>
//                         <input
//                           type="number"
//                           value={editDeliveryForm.cost}
//                           onChange={(e) => setEditDeliveryForm({...editDeliveryForm, cost: e.target.value})}
//                           className="w-full px-4 py-3 rounded-r-lg border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
//                         />
//                       </div>
//                     </div>
//                   </div>
                  
//                   {/* Description - Full Width */}
//                   <div className="space-y-2">
//                     <label className="text-sm font-medium text-gray-700">Description</label>
//                     <textarea
//                       value={editDeliveryForm.desc}
//                       onChange={(e) => setEditDeliveryForm({...editDeliveryForm, desc: e.target.value})}
//                       rows={4}
//                       className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors resize-none"
//                     />
//                   </div>

//                   {/* File Management Section */}
//                   <div className="space-y-3">
//                     <label className="text-sm font-medium text-gray-700">File Management</label>
                    
//                     {/* Current Files - Above upload area, compact */}
//                     {selectedDelivery.files && selectedDelivery.files.length > 0 && (
//                       <div className="space-y-2">
//                         <h4 className="text-sm font-medium text-gray-700">Current Files:</h4>
//                         <div className="max-h-32 overflow-y-auto space-y-1">
//                           {selectedDelivery.files.map((file, index) => (
//                             <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded-md">
//                               <div className="flex items-center space-x-2 min-w-0">
//                                 <FileText className="w-4 h-4 text-gray-500 flex-shrink-0" />
//                                 <span className="text-sm text-gray-700 truncate">{file.name}</span>
//                               </div>
//                               <button
//                                 onClick={() => handleDeleteFile(file.id)}
//                                 className="p-1 hover:bg-red-50 rounded-sm text-red-500 transition-colors ml-1"
//                               >
//                                 <Trash2 className="w-3 h-3" />
//                               </button>
//                             </div>
//                           ))}
//                         </div>
//                       </div>
//                     )}
                    
//                     {/* Display new uploaded files - Above upload area, compact */}
//                     {uploadedFiles.length > 0 && (
//                       <div className="space-y-2">
//                         <h4 className="text-sm font-medium text-gray-700">New Files to Add:</h4>
//                         <div className="max-h-32 overflow-y-auto space-y-1">
//                           {uploadedFiles.map((file, index) => (
//                             <div key={index} className="flex items-center justify-between p-2 bg-blue-50 rounded-md">
//                               <div className="flex items-center space-x-2 min-w-0">
//                                 <FileText className="w-4 h-4 text-blue-500 flex-shrink-0" />
//                                 <span className="text-sm text-gray-700 truncate">{file.name}</span>
//                               </div>
//                               <button
//                                 onClick={() => setUploadedFiles(files => files.filter((_, i) => i !== index))}
//                                 className="p-1 hover:bg-red-50 rounded-sm text-red-500 transition-colors ml-1"
//                               >
//                                 <Trash2 className="w-3 h-3" />
//                               </button>
//                             </div>
//                           ))}
//                         </div>
//                       </div>
//                     )}
                    
//                     {/* Upload Area - Full Width */}
//                     <div className="w-full">
//                       <FileUploadComponent onUploadComplete={handleUploadComplete} />
//                     </div>
//                   </div>
//                 </div>
//               </div>
              
//               <div className="sticky bottom-0 bg-white border-t border-gray-200 p-4 sm:p-6 flex flex-col sm:flex-row justify-end gap-3">
//                 <button
//                   onClick={() => {
//                     setShowEditDeliveryModal(false);
//                     setUploadedFiles([]);
//                   }}
//                   className="px-4 py-2 rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   onClick={handleUpdateDelivery}
//                   disabled={isSubmitting}
//                   className="px-6 py-2 rounded-lg bg-black text-white hover:bg-gray-800 transition-colors flex items-center justify-center"
//                 >
//                   {isSubmitting ? (
//                     <>
//                       <span className="animate-spin mr-2 h-4 w-4 border-t-2 border-b-2 border-white rounded-full"></span>
//                       Updating...
//                     </>
//                   ) : (
//                     <>
//                       <Check className="w-5 h-5 mr-1" /> Save Changes
//                     </>
//                   )}
//                 </button>
//               </div>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// };

// export default ClientsPage;
'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Shield, Lock, CheckCircle, Users, Bell, Info, Rocket, Loader2, Copy, Check } from 'lucide-react';
import FileUploadComponent from '@/app/freelancer/_components/FileUploadComponent';
import { generatePreviewUrl } from '@/app/utils/previewUtils';

// Move FeatureStrip outside to prevent re-renders
const FeatureStrip = React.memo(() => {
  const features = [
    { label: 'Safe', icon: Shield, desc: 'Bank-grade security' },
    { label: 'Secure', icon: Lock, desc: 'End-to-end encryption' },
    { label: 'Reliable', icon: CheckCircle, desc: '99.9% uptime' }
  ];

  return (
    <div className="bg-white rounded-xl p-4 shadow-md border border-gray-100">
      <div className="flex justify-between items-center divide-x divide-gray-200">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <div key={index} className="flex-1 px-4 first:pl-0 last:pr-0 text-center group">
              <div className="flex flex-col items-center gap-2">
                <div className="w-10 h-10 rounded-lg bg-black/5 flex items-center justify-center
                            group-hover:bg-black group-hover:text-white transition-colors duration-300">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-900">{feature.label}</h3>
                  <p className="text-xs text-gray-500 mt-0.5">{feature.desc}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
});

FeatureStrip.displayName = 'FeatureStrip';

const Hero = () => {
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [previewLink, setPreviewLink] = useState('');
  const [linkCopied, setLinkCopied] = useState(false);
  const [error, setError] = useState('');
  const [hasAnimated, setHasAnimated] = useState(false);
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    clientName: '',
    deliveryName: '',
    deliveryCost: ''
  });
  
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [totalFilesSelected, setTotalFilesSelected] = useState(0);
  const [filesUploadingCount, setFilesUploadingCount] = useState(0);
  const [uploadErrors, setUploadErrors] = useState([]);

  // Mark as animated after first render
  React.useEffect(() => {
    setHasAnimated(true);
  }, []);

  const isUploadingFiles = filesUploadingCount > 0;
  const hasFilesSelected = totalFilesSelected > 0;
  const allFilesUploaded = hasFilesSelected && uploadedFiles.length === totalFilesSelected && !isUploadingFiles;
  const hasUploadErrors = uploadErrors.length > 0;
  
  const canSubmit = !isUploadingFiles && !loading && (
    !hasFilesSelected || (allFilesUploaded && !hasUploadErrors)
  );

  const handleFilesSelected = (files) => {
    setTotalFilesSelected(prev => prev + files.length);
    setFilesUploadingCount(prev => prev + files.length);
    setUploadErrors([]);
  };

  const handleUploadError = (file, error) => {
    setUploadErrors(prev => [...prev, { fileName: file.name, error: error.message }]);
    setFilesUploadingCount(prev => Math.max(0, prev - 1));
  };

  const handleUploadComplete = (fileInfo) => {
    setUploadedFiles(prev => [...prev, fileInfo]);
    setFilesUploadingCount(prev => Math.max(0, prev - 1));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(previewLink);
      setLinkCopied(true);
      setTimeout(() => setLinkCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!formData.email || !formData.password || !formData.clientName || 
        !formData.deliveryName || !formData.deliveryCost) {
      setError('Please fill in all required fields');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    if (isUploadingFiles) {
      setError('Please wait for files to finish uploading');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/onboard/quick-start', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          files: uploadedFiles
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create account');
      }

      const link = generatePreviewUrl(data.data.clientId, data.data.deliveryName);
      setPreviewLink(link);
      setShowSuccess(true);

      setTimeout(() => {
        window.location.href = '/freelancer/dashboard';
      }, 3000);

    } catch (err) {
      console.error('Onboard error:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-white" id="home">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000008_1px,transparent_1px),linear-gradient(to_bottom,#00000008_1px,transparent_1px)] bg-[size:24px_24px]" />
      </div>
      
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 -right-40 w-80 h-80 rounded-full 
                     bg-gradient-to-br from-black/5 to-transparent blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full 
                     bg-gradient-to-tr from-black/5 to-transparent blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 relative">
        <div className="min-h-screen pt-28 pb-12 flex items-center">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center w-full">
            
            {/* Left Side - Content */}
            <div className="space-y-5">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <span className="px-4 py-2 rounded-full bg-black/5 text-gray-700 
                             text-sm font-medium inline-block">
                  Welcome to the Future of Freelancing
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900"
              >
                Say hello to{" "}
                <span className="relative inline-block">
                  WorkOnGigs
                  <motion.div
                    className="absolute -bottom-2 left-0 right-0 h-1 bg-black rounded-full"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                  />
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-base sm:text-lg text-gray-600"
              >
                We Ensure: Freelancers Get Paid and Clients Receive Satisfactory Work
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="flex flex-wrap gap-3"
              >
                <a href="https://chat.whatsapp.com/CSyUwqxVCc4HfVOPbEzhAs" target="_blank" rel="noopener noreferrer">
                  <motion.button
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 
                             text-white rounded-lg font-medium hover:from-green-600 hover:to-green-700 
                             transition-all duration-300 flex items-center gap-2 text-sm"
                  >
                    <Users className="w-4 h-4" />
                    Join Community
                  </motion.button>
                </a>

                <a href="https://whatsapp.com/channel/0029VbAtNNnLY6dE9X6kpb3w" target="_blank" rel="noopener noreferrer">
                  <motion.button
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-600 
                             text-white rounded-lg font-medium hover:from-emerald-600 hover:to-teal-700 
                             transition-all duration-300 flex items-center gap-2 text-sm"
                  >
                    <Bell className="w-4 h-4" />
                    Follow Channel
                  </motion.button>
                </a>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="flex flex-wrap gap-3"
              >
                <Link href="/auth/freelancer/login">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-6 py-2 bg-white text-black rounded-lg font-medium border-2 border-gray-200
                             hover:border-black transition-all duration-300 text-sm"
                  >
                    Login
                  </motion.button>
                </Link>

                <Link href="/auth/freelancer/signup">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-6 py-2 bg-black text-white rounded-lg font-medium
                             hover:bg-gray-900 transition-all duration-300 flex items-center gap-2 text-sm"
                  >
                    Sign Up
                    <ArrowRight className="w-4 h-4" />
                  </motion.button>
                </Link>
              </motion.div>

              <div className="hidden lg:block pt-4">
                <FeatureStrip />
              </div>
            </div>

            {/* Right Side - Quick Start Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-6">
                {!showSuccess ? (
                  <>
                    <div className="flex items-center gap-3 mb-5">
                      <div className="w-10 h-10 bg-black rounded-xl flex items-center justify-center">
                        <Rocket className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h2 className="text-xl font-bold text-gray-900">Quick Start</h2>
                        <p className="text-xs text-gray-600">Create your first delivery</p>
                      </div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1.5">
                          Upload Files <span className="text-gray-400">(Optional)</span>
                        </label>
                        <FileUploadComponent
                          onUploadComplete={handleUploadComplete}
                          onFilesSelected={handleFilesSelected}
                          onUploadError={handleUploadError}
                          disabled={loading}
                        />
                        {hasFilesSelected && (
                          <div className="mt-1.5">
                            {isUploadingFiles && (
                              <p className="text-xs text-blue-600 flex items-center gap-1">
                                <Loader2 className="w-3 h-3 animate-spin" />
                                Uploading {filesUploadingCount} file(s)...
                              </p>
                            )}
                            {allFilesUploaded && !hasUploadErrors && (
                              <p className="text-xs text-green-600">
                                {uploadedFiles.length} file(s) uploaded
                              </p>
                            )}
                            {hasUploadErrors && (
                              <p className="text-xs text-red-600">
                                {uploadErrors.length} file(s) failed
                              </p>
                            )}
                          </div>
                        )}
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-medium text-gray-700 mb-1">
                            Project Name *
                          </label>
                          <input
                            type="text"
                            name="deliveryName"
                            value={formData.deliveryName}
                            onChange={handleInputChange}
                            placeholder="Website Design"
                            required
                            className="w-full px-3 py-2 rounded-lg border border-gray-200 
                                     focus:border-gray-400 focus:ring-0 transition-colors text-sm"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-medium text-gray-700 mb-1">
                            Cost (₹) *
                          </label>
                          <input
                            type="number"
                            name="deliveryCost"
                            value={formData.deliveryCost}
                            onChange={handleInputChange}
                            placeholder="5000"
                            required
                            min="0"
                            step="0.01"
                            className="w-full px-3 py-2 rounded-lg border border-gray-200 
                                     focus:border-gray-400 focus:ring-0 transition-colors text-sm"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">
                          Client Name *
                        </label>
                        <input
                          type="text"
                          name="clientName"
                          value={formData.clientName}
                          onChange={handleInputChange}
                          placeholder="Your client's name"
                          required
                          className="w-full px-3 py-2 rounded-lg border border-gray-200 
                                   focus:border-gray-400 focus:ring-0 transition-colors text-sm"
                        />
                      </div>

                      <div className="relative py-3">
                        <div className="absolute inset-0 flex items-center">
                          <div className="w-full border-t border-gray-200"></div>
                        </div>
                        <div className="relative flex justify-center text-xs">
                          <span className="px-2 bg-white text-gray-500">Create Your Account</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-medium text-gray-700 mb-1 flex items-center gap-1">
                            Your Email *
                            <div className="group relative">
                              <Info className="w-3 h-3 text-gray-400 cursor-help" />
                              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 
                                          opacity-0 group-hover:opacity-100 transition-opacity duration-200
                                          pointer-events-none z-10 w-40">
                                <div className="bg-gray-900 text-white text-xs rounded-lg py-1.5 px-2.5 whitespace-nowrap">
                                  Your login email
                                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 
                                               border-4 border-transparent border-t-gray-900"></div>
                                </div>
                              </div>
                            </div>
                          </label>
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="your@email.com"
                            required
                            className="w-full px-3 py-2 rounded-lg border border-gray-200 
                                     focus:border-gray-400 focus:ring-0 transition-colors text-sm"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-medium text-gray-700 mb-1 flex items-center gap-1">
                            Password *
                            <div className="group relative">
                              <Info className="w-3 h-3 text-gray-400 cursor-help" />
                              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 
                                          opacity-0 group-hover:opacity-100 transition-opacity duration-200
                                          pointer-events-none z-10 w-32">
                                <div className="bg-gray-900 text-white text-xs rounded-lg py-1.5 px-2.5 whitespace-nowrap">
                                  Min 6 characters
                                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 
                                               border-4 border-transparent border-t-gray-900"></div>
                                </div>
                              </div>
                            </div>
                          </label>
                          <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            placeholder="••••••"
                            required
                            minLength={6}
                            className="w-full px-3 py-2 rounded-lg border border-gray-200 
                                     focus:border-gray-400 focus:ring-0 transition-colors text-sm"
                          />
                        </div>
                      </div>

                      {error && (
                        <div className="p-2.5 bg-red-50 border border-red-200 rounded-lg">
                          <p className="text-xs text-red-700">{error}</p>
                        </div>
                      )}

                      <button
                        type="submit"
                        disabled={!canSubmit}
                        className="w-full px-6 py-2.5 bg-black text-white rounded-lg font-medium
                                 hover:bg-gray-900 transition-colors flex items-center justify-center gap-2
                                 disabled:bg-gray-300 disabled:cursor-not-allowed text-sm"
                      >
                        {loading ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            Creating...
                          </>
                        ) : isUploadingFiles ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            Uploading...
                          </>
                        ) : (
                          <>
                            <Rocket className="w-4 h-4" />
                            Get Started Now
                          </>
                        )}
                      </button>

                      <p className="text-xs text-gray-500 text-center">
                        By creating an account, you agree to our Terms
                      </p>
                    </form>
                  </>
                ) : (
                  <div className="text-center space-y-4 py-6">
                    <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                      <CheckCircle className="w-7 h-7 text-green-600" />
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 mb-1">
                        Account Created!
                      </h3>
                      <p className="text-sm text-gray-600">
                        Your delivery is ready to share
                      </p>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-3">
                      <label className="block text-xs font-medium text-gray-700 mb-2">
                        Preview Link
                      </label>
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          value={previewLink}
                          readOnly
                          className="flex-1 px-3 py-2 bg-white rounded-lg border border-gray-200 text-xs"
                        />
                        <button
                          onClick={copyToClipboard}
                          className="p-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
                        >
                          {linkCopied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                        </button>
                      </div>
                      {linkCopied && (
                        <p className="text-xs text-green-600 mt-2">Link copied!</p>
                      )}
                    </div>

                    <p className="text-xs text-gray-600">
                      Redirecting to dashboard...
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;