// 'use client';

// import React, { useState, useEffect } from 'react';
// import { 
//   Plus, Search, User, ArrowRight, ChevronDown, X, Check, Trash2,
//   FileText, Copy, Calendar, DollarSign, Edit, MessageCircle, FileUp, AlertTriangle, Paperclip
// } from 'lucide-react';
// import { useRouter } from 'next/navigation';
// import { useAuth } from '@/context/authContext';
// import Alert from '@/components/Alert';
// import { motion, AnimatePresence } from 'framer-motion';
// import FileUploadComponent from '../_components/FileUploadComponent';

// const ClientsPage = () => {
//   const { freelancerId, email, isAuthenticated } = useAuth();
//   const router = useRouter();

//   // State management
//   const [clients, setClients] = useState([]);
//   const [selectedClient, setSelectedClient] = useState(null);
//   const [selectedDelivery, setSelectedDelivery] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [alert, setAlert] = useState({ show: false, message: '', type: 'success' });
  
//   // Modal states
//   const [showNewClientModal, setShowNewClientModal] = useState(false);
//   const [showNewDeliveryModal, setShowNewDeliveryModal] = useState(false);
//   const [showDeliveryDetailsModal, setShowDeliveryDetailsModal] = useState(false);
  
//   // Form states
//   const [newClientForm, setNewClientForm] = useState({
//     name: '',
//     modeOfPay: 'Direct Payment',
//     status: 'Active',
//     email: '',
//     phone: ''
//   });
  
//   const [newDeliveryForm, setNewDeliveryForm] = useState({
//     name: '',
//     desc: '',
//     cost: '',
//     PaymentStatus: 'Not Paid'
//   });
  
//   const [uploadedFiles, setUploadedFiles] = useState([]);
//   const [isSubmitting, setIsSubmitting] = useState(false);

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
      
//       setClients(data);
      
//       // Select the first client by default if available
//       if (data.length > 0 && !selectedClient) {
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
//   };

//   // Handle delivery selection
//   const handleSelectDelivery = (delivery) => {
//     setSelectedDelivery(delivery);
//     setShowDeliveryDetailsModal(true);
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
//   const copyPreviewLink = (clientId, deliveryName) => {
//     const previewLink = `${window.location.origin}/${clientId}/preview?delivery=${encodeURIComponent(deliveryName)}`;
//     navigator.clipboard.writeText(previewLink);
//     showAlert('Preview link copied to clipboard!', 'success');
//   };

//   // Calculate total paid amount for a client
//   const calculatePaidAmount = (deliveries) => {
//     return deliveries
//       .filter(delivery => delivery.PaymentStatus === 'Paid')
//       .reduce((sum, delivery) => sum + delivery.cost, 0);
//   };

//   // Filter clients based on search term
//   const filteredClients = clients.filter(client =>
//     client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     (client.email && client.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
//     (client.phone && client.phone.includes(searchTerm))
//   );

//   // Handle file upload completion
//   const handleUploadComplete = (fileInfo) => {
//     setUploadedFiles(prev => [...prev, fileInfo]);
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
//       if (!response.ok) throw new Error(data.error || 'Failed to create client');
      
//       setClients(prev => [...prev, data]);
//       setSelectedClient(data);
//       setShowNewClientModal(false);
//       setNewClientForm({
//         name: '',
//         modeOfPay: 'Direct Payment',
//         status: 'Active',
//         email: '',
//         phone: ''
//       });
//       showAlert('Client created successfully', 'success');
//     } catch (error) {
//       console.error('Error creating client:', error);
//       showAlert('Failed to create client', 'error');
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
//       if (!response.ok) throw new Error(data.error || 'Failed to create delivery');
      
//       // Update the selected client with the new delivery
//       setSelectedClient(prev => ({
//         ...prev,
//         deliveries: [...(prev.deliveries || []), data]
//       }));
      
//       // Update client in the clients list
//       setClients(prev => prev.map(client => 
//         client.id === selectedClient.id 
//           ? { 
//               ...client, 
//               deliveries: [...(client.deliveries || []), data]
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
//       setUploadedFiles([]);
//       showAlert('Delivery created successfully', 'success');
//     } catch (error) {
//       console.error('Error creating delivery:', error);
//       showAlert('Failed to create delivery', 'error');
//     } finally {
//       setIsSubmitting(false);
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
      
//       {/* Main container */}
//       <div className="flex h-[calc(100vh-57px)]">
//         {/* Left sidebar - Clients list */}
//         <div className="w-full md:w-80 lg:w-96 bg-white border-r border-gray-200 flex flex-col h-full">
//           {/* Search and add client header */}
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
//             <button
//               onClick={() => setShowNewClientModal(true)}
//               className="w-full px-4 py-2 bg-black text-white rounded-lg flex items-center justify-center gap-2 hover:bg-gray-800 transition-colors"
//             >
//               <Plus className="w-5 h-5" />
//               <span>Add New Client</span>
//             </button>
//           </div>
          
//           {/* Clients list */}
//           <div className="flex-1 overflow-y-auto">
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
//                     }`}
//                   >
//                     <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
//                       <User className="w-6 h-6 text-gray-500" />
//                     </div>
//                     <div className="flex-1 text-left min-w-0">
//                       <h3 className="font-medium text-gray-900 truncate">{client.name}</h3>
//                       <div className="flex items-center text-sm text-gray-500 mt-1">
//                         <span className="truncate">
//                           {client.deliveries?.length || 0} deliveries
//                         </span>
//                         <span className="mx-1">•</span>
//                         <span className={client.status === 'Active' ? 'text-green-600' : 'text-gray-500'}>
//                           {client.status}
//                         </span>
//                       </div>
//                     </div>
//                     {selectedClient?.id === client.id && (
//                       <ArrowRight className="w-5 h-5 text-gray-400 flex-shrink-0" />
//                     )}
//                   </button>
//                 ))}
//               </div>
//             )}
//           </div>
//         </div>
        
//         {/* Right content - Delivery details */}
//         <div className="hidden md:flex flex-col flex-1 h-full">
//           {selectedClient ? (
//             <>
//               {/* Client header */}
//               <div className="p-4 bg-white border-b border-gray-200 flex items-center justify-between">
//                 <div className="flex items-center">
//                   <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center mr-3">
//                     <User className="w-5 h-5 text-gray-500" />
//                   </div>
//                   <div>
//                     <h2 className="font-medium text-gray-900">{selectedClient.name}</h2>
//                     <div className="flex items-center text-sm text-gray-500 mt-1">
//                       {selectedClient.email && (
//                         <span className="truncate mr-2">{selectedClient.email}</span>
//                       )}
//                       {selectedClient.phone && (
//                         <>
//                           {selectedClient.email && <span className="mx-1">•</span>}
//                           <span>{selectedClient.phone}</span>
//                         </>
//                       )}
//                     </div>
//                   </div>
//                 </div>
//                 <div className="flex items-center gap-4">
//                   <div className="text-right">
//                     <p className="text-sm text-gray-500">Total paid</p>
//                     <p className="font-semibold text-green-600">
//                       ₹{calculatePaidAmount(selectedClient.deliveries || []).toLocaleString()}
//                     </p>
//                   </div>
//                   <button
//                     onClick={() => setShowNewDeliveryModal(true)}
//                     className="px-4 py-2 bg-black text-white rounded-lg flex items-center gap-2 hover:bg-gray-800 transition-colors"
//                   >
//                     <Plus className="w-4 h-4" />
//                     <span>New Delivery</span>
//                   </button>
//                 </div>
//               </div>
              
//               {/* Deliveries list */}
//               <div className="flex-1 overflow-y-auto bg-white p-4">
//                 {(selectedClient.deliveries || []).length === 0 ? (
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
//                     {(selectedClient.deliveries || []).map((delivery) => (
//                       <div
//                         key={delivery.id}
//                         className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all p-4"
//                       >
//                         <div className="flex justify-between items-start mb-3">
//                           <h3 
//                             className="font-medium text-gray-900 hover:text-black cursor-pointer"
//                             onClick={() => handleSelectDelivery(delivery)}
//                           >
//                             {delivery.name}
//                           </h3>
//                           <div className="flex items-center gap-2">
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
//                               onClick={() => copyPreviewLink(selectedClient.id, delivery.name)}
//                               className="p-1 hover:bg-gray-100 rounded-full transition-colors"
//                               title="Copy preview link"
//                             >
//                               <Copy className="w-4 h-4 text-gray-500" />
//                             </button>
//                           </div>
//                         </div>
//                         <div className="grid grid-cols-3 gap-4 text-sm">
//                           <div className="flex items-center text-gray-600">
//                             <Calendar className="w-4 h-4 mr-2" />
//                             <span>{new Date(delivery.createdAt).toLocaleDateString()}</span>
//                           </div>
//                           <div className="flex items-center text-gray-600">
//                             <Paperclip className="w-4 h-4 mr-2" />
//                             <span>{delivery.files?.length || 0} files</span>
//                           </div>
//                           <div className="flex items-center text-gray-600">
//                             <DollarSign className="w-4 h-4 mr-2" />
//                             <span className="font-medium">₹{delivery.cost.toLocaleString()}</span>
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
//               className="bg-white rounded-2xl max-w-md w-full overflow-hidden"
//             >
//               <div className="p-6 border-b border-gray-200">
//                 <div className="flex justify-between items-center">
//                   <h3 className="text-xl font-semibold text-gray-900">Add New Client</h3>
//                   <button
//                     onClick={() => setShowNewClientModal(false)}
//                     className="text-gray-400 hover:text-gray-600 transition-colors"
//                   >
//                     <X className="w-5 h-5" />
//                   </button>
//                 </div>
//               </div>
              
//               <div className="p-6 space-y-4">
//                 {/* Client Name */}
//                 <div className="space-y-2">
//                   <label className="text-sm font-medium text-gray-700">Client Name *</label>
//                   <input
//                     type="text"
//                     value={newClientForm.name}
//                     onChange={(e) => setNewClientForm({...newClientForm, name: e.target.value})}
//                     placeholder="Enter client name"
//                     className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-gray-400 focus:ring-0 transition-colors"
//                     required
//                   />
//                 </div>
                
//                 {/* Payment Mode */}
//                 <div className="space-y-2">
//                   <label className="text-sm font-medium text-gray-700">Payment Mode</label>
//                   <select
//                     value={newClientForm.modeOfPay}
//                     onChange={(e) => setNewClientForm({...newClientForm, modeOfPay: e.target.value})}
//                     className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-gray-400 focus:ring-0 transition-colors"
//                   >
//                     <option value="Direct Payment">Direct Payment</option>
//                     {/* <option value="Bank Transfer">Bank Transfer</option>
//                     <option value="PayPal">PayPal</option>
//                     <option value="Credit Card">Credit Card</option>
//                     <option value="Cash">Cash</option> */}
//                   </select>
//                 </div>
                
//                 {/* Status */}
//                 {/* <div className="space-y-2">
//                   <label className="text-sm font-medium text-gray-700">Status</label>
//                   <select
//                     value={newClientForm.status}
//                     onChange={(e) => setNewClientForm({...newClientForm, status: e.target.value})}
//                     className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-gray-400 focus:ring-0 transition-colors"
//                   >
//                     <option value="Active">Active</option>
//                     <option value="Inactive">Inactive</option>
//                   </select>
//                 </div> */}
                
//                 {/* Email (Optional) */}
//                 <div className="space-y-2">
//                   <label className="text-sm font-medium text-gray-700">Email (Optional)</label>
//                   <input
//                     type="email"
//                     value={newClientForm.email}
//                     onChange={(e) => setNewClientForm({...newClientForm, email: e.target.value})}
//                     placeholder="Enter client email"
//                     className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-gray-400 focus:ring-0 transition-colors"
//                   />
//                 </div>
                
//                 {/* Phone (Optional) */}
//                 <div className="space-y-2">
//                   <label className="text-sm font-medium text-gray-700">Phone (Optional)</label>
//                   <input
//                     type="tel"
//                     value={newClientForm.phone}
//                     onChange={(e) => setNewClientForm({...newClientForm, phone: e.target.value})}
//                     placeholder="Enter client phone"
//                     className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-gray-400 focus:ring-0 transition-colors"
//                   />
//                 </div>
//               </div>
              
//               <div className="p-6 border-t border-gray-200 bg-gray-50 flex justify-end gap-3">
//                 <button
//                   onClick={() => setShowNewClientModal(false)}
//                   className="px-4 py-2 rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-100 transition-colors"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   onClick={handleCreateClient}
//                   disabled={isSubmitting || !newClientForm.name.trim()}
//                   className="px-6 py-2 rounded-lg bg-black text-white hover:bg-gray-800 transition-colors flex items-center disabled:bg-gray-400"
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
      
//       {/* New Delivery Modal */}
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
//               className="bg-white rounded-2xl max-w-2xl w-full overflow-hidden"
//             >
//               <div className="p-6 border-b border-gray-200">
//                 <div className="flex justify-between items-center">
//                   <h3 className="text-xl font-semibold text-gray-900">
//                     New Delivery for {selectedClient.name}
//                   </h3>
//                   <button
//                     onClick={() => {
//                       setShowNewDeliveryModal(false);
//                       setUploadedFiles([]);
//                     }}
//                     className="text-gray-400 hover:text-gray-600 transition-colors"
//                   >
//                     <X className="w-5 h-5" />
//                   </button>
//                 </div>
//               </div>
              
//               <div className="p-6 space-y-4 max-h-[calc(100vh-200px)] overflow-y-auto">
//                 {/* Delivery Name */}
//                 <div className="space-y-2">
//                   <label className="text-sm font-medium text-gray-700">Delivery Name *</label>
//                   <input
//                     type="text"
//                     value={newDeliveryForm.name}
//                     onChange={(e) => setNewDeliveryForm({...newDeliveryForm, name: e.target.value})}
//                     placeholder="Enter delivery name"
//                     className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-gray-400 focus:ring-0 transition-colors"
//                     required
//                   />
//                 </div>
                
//                 {/* Cost */}
//                 <div className="space-y-2">
//                   <label className="text-sm font-medium text-gray-700">Cost *</label>
//                   <div className="flex items-center">
//                     <span className="px-3 py-2 rounded-l-lg border border-r-0 border-gray-200 bg-gray-50 text-gray-500">₹</span>
//                     <input
//                       type="number"
//                       value={newDeliveryForm.cost}
//                       onChange={(e) => setNewDeliveryForm({...newDeliveryForm, cost: e.target.value})}
//                       placeholder="Enter cost"
//                       className="w-full px-4 py-2 rounded-r-lg border border-gray-200 focus:border-gray-400 focus:ring-0 transition-colors"
//                       required
//                     />
//                   </div>
//                 </div>
                
//                 {/* Payment Status */}
//                 {/* <div className="space-y-2">
//                   <label className="text-sm font-medium text-gray-700">Payment Status</label>
//                   <select
//                     value={newDeliveryForm.PaymentStatus}
//                     onChange={(e) => setNewDeliveryForm({...newDeliveryForm, PaymentStatus: e.target.value})}
//                     className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-gray-400 focus:ring-0 transition-colors"
//                   >
//                     <option value="Not Paid">Not Paid</option>
//                     <option value="Paid">Paid</option>
//                   </select>
//                 </div>
//                  */}
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
                
//                 {/* File Upload */}
//                 <div className="space-y-2">
//                   <label className="text-sm font-medium text-gray-700">Upload Files (Optional)</label>
//                   <FileUploadComponent onUploadComplete={handleUploadComplete} />
                  
//                   {/* Display uploaded files */}
//                   {uploadedFiles.length > 0 && (
//                     <div className="mt-4">
//                       <h4 className="text-sm font-medium text-gray-700 mb-2">Uploaded Files:</h4>
//                       <div className="space-y-2">
//                         {uploadedFiles.map((file, index) => (
//                           <div key={index} className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
//                             <div className="flex items-center gap-2">
//                               <FileText className="w-4 h-4 text-blue-500" />
//                               <span className="text-sm text-gray-700">{file.name}</span>
//                             </div>
//                             <button
//                               onClick={() => setUploadedFiles(files => files.filter((_, i) => i !== index))}
//                               className="p-1 hover:bg-red-50 rounded-md text-red-500 transition-colors"
//                             >
//                               <Trash2 className="w-4 h-4" />
//                             </button>
//                           </div>
//                         ))}
//                       </div>
//                     </div>
//                   )}
//                 </div>
//               </div>
              
//               <div className="p-6 border-t border-gray-200 bg-gray-50 flex justify-end gap-3">
//                 <button
//                   onClick={() => {
//                     setShowNewDeliveryModal(false);
//                     setUploadedFiles([]);
//                   }}
//                   className="px-4 py-2 rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-100 transition-colors"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   onClick={handleCreateDelivery}
//                   disabled={isSubmitting || !newDeliveryForm.name.trim() || !newDeliveryForm.cost}
//                   className="px-6 py-2 rounded-lg bg-black text-white hover:bg-gray-800 transition-colors flex items-center disabled:bg-gray-400"
//                 >
//                   {isSubmitting ? (
//                     <>
//                       <span className="animate-spin mr-2 h-4 w-4 border-t-2 border-b-2 border-white rounded-full"></span>
//                       Creating...
//                     </>
//                   ) : (
//                     <>
//                       <Check className="w-4 h-4 mr-1" /> Create Delivery
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
//               <div className="p-6 border-b border-gray-200">
//                 <div className="flex justify-between items-center">
//                   <h3 className="text-xl font-semibold text-gray-900">
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
              
//               <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
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
//                       <span className="text-sm text-gray-500 mr-2">Cost:</span>
//                       <span className="font-semibold text-gray-900">₹{selectedDelivery.cost.toLocaleString()}</span>
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
//                             <div className="flex items-center gap-3">
//                               <FileText className="w-5 h-5 text-gray-500" />
//                               <span className="text-sm text-gray-700">{file.name}</span>
//                             </div>
//                             <div className="flex items-center gap-2">
//                               <span className="text-xs text-gray-500">
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
//                   <div className="grid grid-cols-2 gap-4">
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
              
//               <div className="p-6 border-t border-gray-200 bg-gray-50 flex justify-between">
//                 <button
//                   onClick={() => router.push(`/client/${selectedClient.id}/delivery/${selectedDelivery.id}/edit`)}
//                   className="px-4 py-2 rounded-lg bg-blue-50 text-blue-700 border border-blue-200 hover:bg-blue-100 transition-colors flex items-center gap-2"
//                 >
//                   <Edit className="w-4 h-4" />
//                   Edit Delivery
//                 </button>
                
//                 <div className="flex gap-3">
//                   <button
//                     onClick={() => setShowDeliveryDetailsModal(false)}
//                     className="px-4 py-2 rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-100 transition-colors"
//                   >
//                     Close
//                   </button>
//                   <button
//                     onClick={() => copyPreviewLink(selectedClient.id, selectedDelivery.name)}
//                     className="px-4 py-2 rounded-lg bg-black text-white hover:bg-gray-800 transition-colors flex items-center gap-2"
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
//     </div>
//   );
// };

// export default ClientsPage;

'use client';

import React, { useState, useEffect } from 'react';
import { 
  Plus, Search, User, ArrowRight, ChevronDown, X, Check, Trash2,
  FileText, Copy, Calendar, DollarSign, Edit, MessageCircle, FileUp, AlertTriangle, Paperclip, Pencil
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/authContext';
import Alert from '@/components/Alert';
import { motion, AnimatePresence } from 'framer-motion';
import FileUploadComponent from '../_components/FileUploadComponent';

const ClientsPage = () => {
  const { freelancerId, email, isAuthenticated } = useAuth();
  const router = useRouter();

  // State management
  const [clients, setClients] = useState([]);
  const [selectedClient, setSelectedClient] = useState(null);
  const [selectedDelivery, setSelectedDelivery] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [alert, setAlert] = useState({ show: false, message: '', type: 'success' });
  
  // Modal states
  const [showNewClientModal, setShowNewClientModal] = useState(false);
  const [showNewDeliveryModal, setShowNewDeliveryModal] = useState(false);
  const [showDeliveryDetailsModal, setShowDeliveryDetailsModal] = useState(false);
  const [showEditDeliveryModal, setShowEditDeliveryModal] = useState(false);
  
  // Form states
  const [newClientForm, setNewClientForm] = useState({
    name: '',
    modeOfPay: 'Direct Payment',
    status: 'Active',
    email: '',
    phone: ''
  });
  
  const [newDeliveryForm, setNewDeliveryForm] = useState({
    name: '',
    desc: '',
    cost: '',
    PaymentStatus: 'Not Paid'
  });

  const [editDeliveryForm, setEditDeliveryForm] = useState({
    name: '',
    desc: '',
    cost: '',
    PaymentStatus: ''
  });
  
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch clients on component mount
  useEffect(() => {
    fetchClients();
  }, [freelancerId]);

  const fetchClients = async () => {
    if (!freelancerId) return;
    
    try {
      setLoading(true);
      const response = await fetch('/api/freelancer/get-clients', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ freelancerId })
      });
      
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Failed to fetch clients');
      
      setClients(data || []);
      
      // Select the first client by default if available
      if (data?.length > 0 && !selectedClient) {
        setSelectedClient(data[0]);
      }
    } catch (error) {
      console.error('Error fetching clients:', error);
      showAlert('Failed to fetch clients', 'error');
    } finally {
      setLoading(false);
    }
  };

  // Handle client selection
  const handleSelectClient = (client) => {
    setSelectedClient(client);
    setSelectedDelivery(null);
  };

  // Handle delivery selection
  const handleSelectDelivery = (delivery) => {
    setSelectedDelivery(delivery);
    setShowDeliveryDetailsModal(true);
  };

  // Handle edit delivery
  const handleEditDelivery = (delivery) => {
    setSelectedDelivery(delivery);
    setEditDeliveryForm({
      name: delivery.name,
      desc: delivery.desc || '',
      cost: delivery.cost ? delivery.cost.toString() : '0',
      PaymentStatus: delivery.PaymentStatus || 'Not Paid'
    });
    setShowEditDeliveryModal(true);
  };

  // Show alert message
  const showAlert = (message, type = 'success') => {
    setAlert({
      show: true,
      message,
      type
    });
    setTimeout(() => setAlert({ ...alert, show: false }), 3000);
  };

  // Copy preview link to clipboard
  const copyPreviewLink = (clientId, deliveryName) => {
    const previewLink = `${window.location.origin}/${clientId}/preview?delivery=${encodeURIComponent(deliveryName)}`;
    navigator.clipboard.writeText(previewLink);
    showAlert('Preview link copied to clipboard!', 'success');
  };

  // Calculate total paid amount for a client
  const calculatePaidAmount = (deliveries = []) => {
    return deliveries
      .filter(delivery => delivery?.PaymentStatus === 'Paid')
      .reduce((sum, delivery) => sum + (delivery?.cost || 0), 0);
  };

  // Filter clients based on search term
  const filteredClients = clients?.filter(client =>
    (client?.name && client.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (client?.email && client.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (client?.phone && client.phone.includes(searchTerm))
  ) || [];

  // Handle file upload completion
  const handleUploadComplete = (fileInfo) => {
    setUploadedFiles(prev => [...prev, fileInfo]);
  };

  // Create new client
  const handleCreateClient = async () => {
    if (!newClientForm.name.trim()) {
      showAlert('Client name is required', 'error');
      return;
    }
    
    try {
      setIsSubmitting(true);
      
      const response = await fetch('/api/freelancer/create-client', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...newClientForm,
          freelancerId
        })
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to create client');
      }
      
      // Add the new client to the clients list, ensuring it has an empty deliveries array
      const newClient = {
        ...data.client,
        deliveries: []
      };
      
      setClients(prev => [...prev, newClient]);
      setSelectedClient(newClient);
      setShowNewClientModal(false);
      setNewClientForm({
        name: '',
        modeOfPay: 'Direct Payment',
        status: 'Active',
        email: '',
        phone: ''
      });
      showAlert('Client created successfully', 'success');
      
      // Refresh clients list
      fetchClients();
    } catch (error) {
      console.error('Error creating client:', error);
      showAlert('Failed to create client', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Create new delivery
  const handleCreateDelivery = async () => {
    if (!newDeliveryForm.name.trim() || !newDeliveryForm.cost) {
      showAlert('Delivery name and cost are required', 'error');
      return;
    }
    
    try {
      setIsSubmitting(true);
      
      const response = await fetch('/api/freelancer/create-delivery', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...newDeliveryForm,
          clientId: selectedClient.id,
          cost: parseFloat(newDeliveryForm.cost),
          files: uploadedFiles
        })
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to create delivery');
      }
      
      // Update the selected client with the new delivery
      const newDelivery = data.delivery;
      
      setSelectedClient(prev => ({
        ...prev,
        deliveries: [...(prev.deliveries || []), newDelivery]
      }));
      
      // Update client in the clients list
      setClients(prev => prev.map(client => 
        client.id === selectedClient.id 
          ? { 
              ...client, 
              deliveries: [...(client.deliveries || []), newDelivery]
            }
          : client
      ));
      
      setShowNewDeliveryModal(false);
      setNewDeliveryForm({
        name: '',
        desc: '',
        cost: '',
        PaymentStatus: 'Not Paid'
      });
      setUploadedFiles([]);
      showAlert('Delivery created successfully', 'success');
      
      // Refresh clients list
      fetchClients();
    } catch (error) {
      console.error('Error creating delivery:', error);
      showAlert('Failed to create delivery', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Update delivery
  const handleUpdateDelivery = async () => {
    if (!editDeliveryForm.name.trim() || !editDeliveryForm.cost) {
      showAlert('Delivery name and cost are required', 'error');
      return;
    }
    
    try {
      setIsSubmitting(true);
      
      const response = await fetch('/api/update-delivery', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          deliveryId: selectedDelivery.id,
          name: editDeliveryForm.name,
          desc: editDeliveryForm.desc,
          cost: parseFloat(editDeliveryForm.cost),
          paymentStatus: editDeliveryForm.PaymentStatus,
          files: uploadedFiles
        })
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to update delivery');
      }
      
      // Update the selected delivery
      const updatedDelivery = data.delivery;
      
      // Update selected client's delivery
      setSelectedClient(prev => ({
        ...prev,
        deliveries: prev.deliveries.map(d => 
          d.id === selectedDelivery.id ? updatedDelivery : d
        )
      }));
      
      // Update clients list
      setClients(prev => prev.map(client => 
        client.id === selectedClient.id 
          ? { 
              ...client, 
              deliveries: client.deliveries.map(d => 
                d.id === selectedDelivery.id ? updatedDelivery : d
              )
            }
          : client
      ));
      
      setSelectedDelivery(updatedDelivery);
      setShowEditDeliveryModal(false);
      setUploadedFiles([]);
      showAlert('Delivery updated successfully', 'success');
      
      // Refresh clients list
      fetchClients();
    } catch (error) {
      console.error('Error updating delivery:', error);
      showAlert('Failed to update delivery', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Mark delivery as paid/unpaid
  const togglePaymentStatus = async (delivery) => {
    const newStatus = delivery.PaymentStatus === 'Paid' ? 'Not Paid' : 'Paid';
    
    try {
      const response = await fetch('/api/update-delivery-status', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          deliveryId: delivery.id,
          paymentStatus: newStatus
        })
      });
      
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Failed to update payment status');
      
      // Update selected client's delivery
      setSelectedClient(prev => ({
        ...prev,
        deliveries: prev.deliveries.map(d => 
          d.id === delivery.id ? { ...d, PaymentStatus: newStatus } : d
        )
      }));
      
      // Update clients list
      setClients(prev => prev.map(client => 
        client.id === selectedClient.id 
          ? { 
              ...client, 
              deliveries: client.deliveries.map(d => 
                d.id === delivery.id ? { ...d, PaymentStatus: newStatus } : d
              )
            }
          : client
      ));
      
      // Update selected delivery if it's the one being updated
      if (selectedDelivery && selectedDelivery.id === delivery.id) {
        setSelectedDelivery({ ...selectedDelivery, PaymentStatus: newStatus });
      }
      
      showAlert(`Delivery marked as ${newStatus}`, 'success');
    } catch (error) {
      console.error('Error updating payment status:', error);
      showAlert('Failed to update payment status', 'error');
    }
  };

  // Handle deleting a file
  const handleDeleteFile = async (fileId) => {
    if (!confirm('Are you sure you want to delete this file?')) return;
    
    try {
      const response = await fetch('/api/delete-file', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fileId })
      });
      
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || 'Failed to delete file');
      
      // Update the selected delivery to reflect the deleted file
      setSelectedDelivery(prev => ({
        ...prev,
        files: prev.files.filter(file => file.id !== fileId)
      }));
      
      showAlert('File deleted successfully', 'success');
    } catch (error) {
      console.error('Error deleting file:', error);
      showAlert('Failed to delete file', 'error');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Alert message */}
      {alert.show && (
        <Alert
          message={alert.message}
          type={alert.type}
          onClose={() => setAlert({ ...alert, show: false })}
        />
      )}
      
      {/* Main container */}
      <div className="flex h-[calc(100vh-57px)]">
        {/* Left sidebar - Clients list */}
        <div className="w-full md:w-80 lg:w-96 bg-white border-r border-gray-200 flex flex-col h-full">
          {/* Search and add client header */}
          <div className="p-4 border-b border-gray-200">
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input 
                type="text"
                placeholder="Search clients..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:border-gray-400 focus:ring-0 transition-colors"
              />
            </div>
            <button
              onClick={() => setShowNewClientModal(true)}
              className="w-full px-4 py-2 bg-black text-white rounded-lg flex items-center justify-center gap-2 hover:bg-gray-800 transition-colors"
            >
              <Plus className="w-5 h-5" />
              <span>Add New Client</span>
            </button>
          </div>
          
          {/* Clients list */}
          <div className="flex-1 overflow-y-auto">
            {loading ? (
              <div className="flex justify-center items-center h-full">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black"></div>
              </div>
            ) : filteredClients.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full p-6 text-center">
                <User className="w-16 h-16 text-gray-300 mb-4" />
                {searchTerm ? (
                  <>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No matching clients</h3>
                    <p className="text-gray-500 mb-4">Try a different search term</p>
                    <button
                      onClick={() => setSearchTerm('')}
                      className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                    >
                      Clear Search
                    </button>
                  </>
                ) : (
                  <>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No clients yet</h3>
                    <p className="text-gray-500 mb-4">Get started by adding your first client</p>
                    <button
                      onClick={() => setShowNewClientModal(true)}
                      className="px-4 py-2 bg-black text-white rounded-lg flex items-center gap-2 hover:bg-gray-800 transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add New Client</span>
                    </button>
                  </>
                )}
              </div>
            ) : (
              <div className="divide-y divide-gray-100">
                {filteredClients.map((client) => (
                  <button
                    key={client.id}
                    onClick={() => handleSelectClient(client)}
                    className={`w-full flex items-center p-4 hover:bg-gray-50 transition-colors ${
                      selectedClient?.id === client.id ? 'bg-yellow-300' : ''
                    }`}
                  >
                    <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                      <User className="w-6 h-6 text-gray-500" />
                    </div>
                    <div className="flex-1 text-left min-w-0">
                      <h3 className="font-medium text-gray-900 truncate">{client.name}</h3>
                      <div className="flex items-center text-sm text-gray-500 mt-1">
                        <span className="truncate">
                          {client.deliveries?.length || 0} deliveries
                        </span>
                        <span className="mx-1">•</span>
                        <span className={client.status === 'Active' ? 'text-green-600' : 'text-gray-500'}>
                          {client.status}
                        </span>
                      </div>
                    </div>
                    {selectedClient?.id === client.id && (
                      <ArrowRight className="w-5 h-5 text-gray-400 flex-shrink-0" />
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
        
        {/* Right content - Delivery details */}
        <div className="hidden md:flex flex-col flex-1 h-full">
          {selectedClient ? (
            <>
              {/* Client header */}
              <div className="p-4 bg-white border-b border-gray-200 flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center mr-3">
                    <User className="w-5 h-5 text-gray-500" />
                  </div>
                  <div>
                    <h2 className="font-medium text-gray-900">{selectedClient.name}</h2>
                    <div className="flex items-center text-sm text-gray-500 mt-1">
                      {selectedClient.email && (
                        <span className="truncate mr-2">{selectedClient.email}</span>
                      )}
                      {selectedClient.phone && (
                        <>
                          {selectedClient.email && <span className="mx-1">•</span>}
                          <span>{selectedClient.phone}</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-sm text-gray-500">Total paid</p>
                    <p className="font-semibold text-green-600">
                      ₹{calculatePaidAmount(selectedClient.deliveries).toLocaleString()}
                    </p>
                  </div>
                  <button
                    onClick={() => setShowNewDeliveryModal(true)}
                    className="px-4 py-2 bg-black text-white rounded-lg flex items-center gap-2 hover:bg-gray-800 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                    <span>New Delivery</span>
                  </button>
                </div>
              </div>
              
              {/* Deliveries list */}
              <div className="flex-1 overflow-y-auto bg-white p-4">
                {!selectedClient.deliveries || selectedClient.deliveries.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-center">
                    <FileText className="w-16 h-16 text-gray-300 mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No deliveries yet</h3>
                    <p className="text-gray-500 mb-4">Create your first delivery for this client</p>
                    <button
                      onClick={() => setShowNewDeliveryModal(true)}
                      className="px-4 py-2 bg-black text-white rounded-lg flex items-center gap-2 hover:bg-gray-800 transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Create Delivery</span>
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {selectedClient.deliveries.map((delivery) => (
                      <div
                        key={delivery.id}
                        className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all p-4"
                      >
                        <div className="flex justify-between items-start mb-3">
                          <h3 
                            className="font-medium text-gray-900 hover:text-black cursor-pointer"
                            onClick={() => handleSelectDelivery(delivery)}
                          >
                            {delivery.name}
                          </h3>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => togglePaymentStatus(delivery)}
                              className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${
                                delivery.PaymentStatus === 'Paid'
                                  ? 'bg-green-100 text-green-800 hover:bg-green-200'
                                  : 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200'
                              } transition-colors`}
                            >
                              {delivery.PaymentStatus === 'Paid' ? <Check className="w-3 h-3" /> : null}
                              {delivery.PaymentStatus}
                            </button>
                            <button
                              onClick={() => handleEditDelivery(delivery)}
                              className="p-1 hover:bg-blue-100 rounded-full transition-colors"
                              title="Edit delivery"
                            >
                              <Pencil className="w-4 h-4 text-blue-500" />
                            </button>
                            <button
                              onClick={() => copyPreviewLink(selectedClient.id, delivery.name)}
                              className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                              title="Copy preview link"
                            >
                              <Copy className="w-4 h-4 text-gray-500" />
                            </button>
                          </div>
                        </div>
                        <div className="grid grid-cols-3 gap-4 text-sm">
                          <div className="flex items-center text-gray-600">
                            <Calendar className="w-4 h-4 mr-2" />
                            <span>{new Date(delivery.createdAt).toLocaleDateString()}</span>
                          </div>
                          <div className="flex items-center text-gray-600">
                            <Paperclip className="w-4 h-4 mr-2" />
                            <span>{delivery.files?.length || 0} files</span>
                          </div>
                          <div className="flex items-center text-gray-600">
                            <DollarSign className="w-4 h-4 mr-2" />
                            <span className="font-medium">₹{(delivery.cost || 0).toLocaleString()}</span>
                          </div>
                        </div>
                        <div className="mt-3 text-sm text-gray-500 line-clamp-2" title={delivery.desc}>
                          {delivery.desc || 'No description'}
                        </div>
                        <div className="mt-3 flex justify-end">
                          <button
                            onClick={() => handleSelectDelivery(delivery)}
                            className="px-3 py-1 text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors flex items-center gap-1"
                          >
                            <MessageCircle className="w-3 h-3" />
                            View Details
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-full bg-gray-50 p-6 text-center">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <User className="w-10 h-10 text-gray-400" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">No client selected</h2>
              <p className="text-gray-500 mb-6 max-w-md">
                Select a client from the list to view their deliveries or create a new client to get started.
              </p>
              <button
                onClick={() => setShowNewClientModal(true)}
                className="px-4 py-2 bg-black text-white rounded-lg flex items-center gap-2 hover:bg-gray-800 transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>Add New Client</span>
              </button>
            </div>
          )}
        </div>
      </div>
      
      {/* New Client Modal */}
      <AnimatePresence>
        {showNewClientModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-2xl max-w-md w-full overflow-hidden"
            >
              <div className="p-6 border-b border-gray-200">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-semibold text-gray-900">Add New Client</h3>
                  <button
                    onClick={() => setShowNewClientModal(false)}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>
              
              <div className="p-6 space-y-4">
                {/* Client Name */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Client Name *</label>
                  <input
                    type="text"
                    value={newClientForm.name}
                    onChange={(e) => setNewClientForm({...newClientForm, name: e.target.value})}
                    placeholder="Enter client name"
                    className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-gray-400 focus:ring-0 transition-colors"
                    required
                  />
                </div>
                
                {/* Payment Mode */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Payment Mode</label>
                  <select
                    value={newClientForm.modeOfPay}
                    onChange={(e) => setNewClientForm({...newClientForm, modeOfPay: e.target.value})}
                    className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-gray-400 focus:ring-0 transition-colors"
                  >
                    <option value="Direct Payment">Direct Payment</option>
                    {/* Add other payment modes if needed */}
                  </select>
                </div>
                
                {/* Email (Optional) */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Email (Optional)</label>
                  <input
                    type="email"
                    value={newClientForm.email}
                    onChange={(e) => setNewClientForm({...newClientForm, email: e.target.value})}
                    placeholder="Enter client email"
                    className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-gray-400 focus:ring-0 transition-colors"
                  />
                </div>
                
                {/* Phone (Optional) */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Phone (Optional)</label>
                  <input
                    type="tel"
                    value={newClientForm.phone}
                    onChange={(e) => setNewClientForm({...newClientForm, phone: e.target.value})}
                    placeholder="Enter client phone"
                    className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-gray-400 focus:ring-0 transition-colors"
                    />
                  </div>
                </div>
                
                <div className="p-6 border-t border-gray-200 bg-gray-50 flex justify-end gap-3">
                  <button
                    onClick={() => setShowNewClientModal(false)}
                    className="px-4 py-2 rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-100 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleCreateClient}
                    disabled={isSubmitting || !newClientForm.name.trim()}
                    className="px-6 py-2 rounded-lg bg-black text-white hover:bg-gray-800 transition-colors flex items-center disabled:bg-gray-400"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="animate-spin mr-2 h-4 w-4 border-t-2 border-b-2 border-white rounded-full"></span>
                        Creating...
                      </>
                    ) : (
                      <>
                        <Check className="w-4 h-4 mr-1" /> Create Client
                      </>
                    )}
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* New Delivery Modal */}
        <AnimatePresence>
          {showNewDeliveryModal && selectedClient && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                className="bg-white rounded-2xl max-w-2xl w-full overflow-hidden"
              >
                <div className="p-6 border-b border-gray-200">
                  <div className="flex justify-between items-center">
                    <h3 className="text-xl font-semibold text-gray-900">
                      New Delivery for {selectedClient.name}
                    </h3>
                    <button
                      onClick={() => {
                        setShowNewDeliveryModal(false);
                        setUploadedFiles([]);
                      }}
                      className="text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                </div>
                
                <div className="p-6 space-y-4 max-h-[calc(100vh-200px)] overflow-y-auto">
                  {/* Delivery Name */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Delivery Name *</label>
                    <input
                      type="text"
                      value={newDeliveryForm.name}
                      onChange={(e) => setNewDeliveryForm({...newDeliveryForm, name: e.target.value})}
                      placeholder="Enter delivery name"
                      className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-gray-400 focus:ring-0 transition-colors"
                      required
                    />
                  </div>
                  
                  {/* Cost */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Cost *</label>
                    <div className="flex items-center">
                      <span className="px-3 py-2 rounded-l-lg border border-r-0 border-gray-200 bg-gray-50 text-gray-500">₹</span>
                      <input
                        type="number"
                        value={newDeliveryForm.cost}
                        onChange={(e) => setNewDeliveryForm({...newDeliveryForm, cost: e.target.value})}
                        placeholder="Enter cost"
                        className="w-full px-4 py-2 rounded-r-lg border border-gray-200 focus:border-gray-400 focus:ring-0 transition-colors"
                        required
                      />
                    </div>
                  </div>
                  
                  {/* Description */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Description</label>
                    <textarea
                      value={newDeliveryForm.desc}
                      onChange={(e) => setNewDeliveryForm({...newDeliveryForm, desc: e.target.value})}
                      placeholder="Enter delivery description"
                      rows={4}
                      className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-gray-400 focus:ring-0 transition-colors resize-none"
                    />
                  </div>
                  
                  {/* File Upload */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Upload Files (Optional)</label>
                    <FileUploadComponent onUploadComplete={handleUploadComplete} />
                    
                    {/* Display uploaded files */}
                    {uploadedFiles.length > 0 && (
                      <div className="mt-4">
                        <h4 className="text-sm font-medium text-gray-700 mb-2">Uploaded Files:</h4>
                        <div className="space-y-2">
                          {uploadedFiles.map((file, index) => (
                            <div key={index} className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                              <div className="flex items-center gap-2">
                                <FileText className="w-4 h-4 text-blue-500" />
                                <span className="text-sm text-gray-700">{file.name}</span>
                              </div>
                              <button
                                onClick={() => setUploadedFiles(files => files.filter((_, i) => i !== index))}
                                className="p-1 hover:bg-red-50 rounded-md text-red-500 transition-colors"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="p-6 border-t border-gray-200 bg-gray-50 flex justify-end gap-3">
                  <button
                    onClick={() => {
                      setShowNewDeliveryModal(false);
                      setUploadedFiles([]);
                    }}
                    className="px-4 py-2 rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-100 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleCreateDelivery}
                    disabled={isSubmitting || !newDeliveryForm.name.trim() || !newDeliveryForm.cost}
                    className="px-6 py-2 rounded-lg bg-black text-white hover:bg-gray-800 transition-colors flex items-center disabled:bg-gray-400"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="animate-spin mr-2 h-4 w-4 border-t-2 border-b-2 border-white rounded-full"></span>
                        Creating...
                      </>
                    ) : (
                      <>
                        <Check className="w-4 h-4 mr-1" /> Create Delivery
                      </>
                    )}
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
        {/* Delivery Details Modal */}
      <AnimatePresence>
        {showDeliveryDetailsModal && selectedDelivery && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden"
            >
              <div className="p-6 border-b border-gray-200">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-semibold text-gray-900">
                    {selectedDelivery.name}
                  </h3>
                  <button
                    onClick={() => setShowDeliveryDetailsModal(false)}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>
              
              <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
                <div className="space-y-6">
                  {/* Status and Cost */}
                  <div className="flex flex-wrap gap-4 items-center justify-between">
                    <button
                      onClick={() => togglePaymentStatus(selectedDelivery)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 ${
                        selectedDelivery.PaymentStatus === 'Paid'
                          ? 'bg-green-100 text-green-800 hover:bg-green-200'
                          : 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200'
                      } transition-colors`}
                    >
                      {selectedDelivery.PaymentStatus === 'Paid' ? <Check className="w-4 h-4" /> : null}
                      {selectedDelivery.PaymentStatus}
                    </button>
                    
                    <div className="bg-gray-100 px-4 py-2 rounded-lg">
                      <span className="text-sm text-gray-500 mr-2">Cost:</span>
                      <span className="font-semibold text-gray-900">₹{(selectedDelivery.cost || 0).toLocaleString()}</span>
                    </div>
                  </div>
                  
                  {/* Description */}
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium text-gray-700">Description</h4>
                    <div className="bg-gray-50 p-4 rounded-lg text-gray-700">
                      {selectedDelivery.desc || 'No description provided'}
                    </div>
                  </div>
                  
                  {/* Files */}
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium text-gray-700">Files</h4>
                    {selectedDelivery.files && selectedDelivery.files.length > 0 ? (
                      <div className="space-y-2">
                        {selectedDelivery.files.map((file, index) => (
                          <a 
                            key={index} 
                            href={file.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors border border-gray-200"
                          >
                            <div className="flex items-center gap-3">
                              <FileText className="w-5 h-5 text-gray-500" />
                              <span className="text-sm text-gray-700">{file.name}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-xs text-gray-500">
                                {new Date(file.createdAt).toLocaleDateString()}
                              </span>
                              <FileUp className="w-4 h-4 text-gray-400" />
                            </div>
                          </a>
                        ))}
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center p-8 bg-gray-50 rounded-lg border border-gray-200 border-dashed">
                        <AlertTriangle className="w-10 h-10 text-gray-300 mb-2" />
                        <p className="text-gray-500">No files attached to this delivery</p>
                      </div>
                    )}
                  </div>
                  
                  {/* Metadata */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <h4 className="text-xs font-medium text-gray-500">Created On</h4>
                      <p className="text-sm text-gray-900">
                        {new Date(selectedDelivery.createdAt).toLocaleDateString()} 
                        <span className="text-gray-500 ml-1">
                          ({new Date(selectedDelivery.createdAt).toLocaleTimeString()})
                        </span>
                      </p>
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-xs font-medium text-gray-500">Last Updated</h4>
                      <p className="text-sm text-gray-900">
                        {new Date(selectedDelivery.updatedAt).toLocaleDateString()}
                        <span className="text-gray-500 ml-1">
                          ({new Date(selectedDelivery.updatedAt).toLocaleTimeString()})
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="p-6 border-t border-gray-200 bg-gray-50 flex justify-between">
                <button
                  onClick={() => {
                    setShowDeliveryDetailsModal(false);
                    handleEditDelivery(selectedDelivery);
                  }}
                  className="px-4 py-2 rounded-lg bg-blue-50 text-blue-700 border border-blue-200 hover:bg-blue-100 transition-colors flex items-center gap-2"
                >
                  <Edit className="w-4 h-4" />
                  Edit Delivery
                </button>
                
                <div className="flex gap-3">
                  <button
                    onClick={() => setShowDeliveryDetailsModal(false)}
                    className="px-4 py-2 rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-100 transition-colors"
                  >
                    Close
                  </button>
                  <button
                    onClick={() => copyPreviewLink(selectedClient.id, selectedDelivery.name)}
                    className="px-4 py-2 rounded-lg bg-black text-white hover:bg-gray-800 transition-colors flex items-center gap-2"
                  >
                    <Copy className="w-4 h-4" />
                    Copy Preview Link
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Edit Delivery Modal */}
      <AnimatePresence>
        {showEditDeliveryModal && selectedDelivery && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-2xl max-w-3xl w-full relative overflow-hidden"
            >
              <div className="sticky top-0 bg-white z-10 border-b border-gray-200">
                <div className="flex justify-between items-center p-6">
                  <h3 className="text-xl font-semibold text-gray-900">Edit Delivery</h3>
                  <button 
                    onClick={() => {
                      setShowEditDeliveryModal(false);
                      setUploadedFiles([]);
                    }}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>
              
              <div className="p-6 overflow-y-auto max-h-[calc(100vh-200px)]">
                <div className="space-y-6">
                  {/* Name */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Delivery Name</label>
                    <input
                      type="text"
                      value={editDeliveryForm.name}
                      onChange={(e) => setEditDeliveryForm({...editDeliveryForm, name: e.target.value})}
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                    />
                  </div>
                  
                  {/* Cost */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Cost</label>
                    <div className="flex items-center">
                      <span className="px-4 py-3 rounded-l-lg border border-r-0 border-gray-200 bg-gray-50">₹</span>
                      <input
                        type="number"
                        value={editDeliveryForm.cost}
                        onChange={(e) => setEditDeliveryForm({...editDeliveryForm, cost: e.target.value})}
                        className="w-full px-4 py-3 rounded-r-lg border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                      />
                    </div>
                  </div>
                  
                  {/* Payment Status */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Payment Status</label>
                    <select
                      value={editDeliveryForm.PaymentStatus}
                      onChange={(e) => setEditDeliveryForm({...editDeliveryForm, PaymentStatus: e.target.value})}
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                    >
                      <option value="Not Paid">Not Paid</option>
                      <option value="Paid">Paid</option>
                    </select>
                  </div>
                  
                  {/* Description */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Description</label>
                    <textarea
                      value={editDeliveryForm.desc}
                      onChange={(e) => setEditDeliveryForm({...editDeliveryForm, desc: e.target.value})}
                      rows={4}
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors resize-none"
                    />
                  </div>
                  {/* Current Files */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Current Files</label>
                    {selectedDelivery.files && selectedDelivery.files.length > 0 ? (
                      <div className="space-y-2">
                        {selectedDelivery.files.map((file, index) => (
                          <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <div className="flex items-center space-x-3">
                              <FileText className="w-5 h-5 text-gray-500" />
                              <span className="text-sm text-gray-700">{file.name}</span>
                            </div>
                            <button
                              onClick={() => handleDeleteFile(file.id)}
                              className="p-1 hover:bg-red-50 rounded-md text-red-500 transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-sm text-gray-500 italic">No files attached</div>
                    )}
                  </div>
                  
                  {/* Upload New Files */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Upload Additional Files</label>
                    <FileUploadComponent onUploadComplete={handleUploadComplete} />
                    
                    {/* Display new uploaded files */}
                    {uploadedFiles.length > 0 && (
                      <div className="mt-4">
                        <h4 className="text-sm font-medium text-gray-700 mb-2">New Files to Add:</h4>
                        <div className="space-y-2">
                          {uploadedFiles.map((file, index) => (
                            <div key={index} className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                              <div className="flex items-center space-x-3">
                                <FileText className="w-5 h-5 text-blue-500" />
                                <span className="text-sm text-gray-700">{file.name}</span>
                              </div>
                              <button
                                onClick={() => setUploadedFiles(files => files.filter((_, i) => i !== index))}
                                className="p-1 hover:bg-red-50 rounded-md text-red-500 transition-colors"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="sticky bottom-0 bg-white border-t border-gray-200 p-6 flex justify-end gap-3">
                <button
                  onClick={() => {
                    setShowEditDeliveryModal(false);
                    setUploadedFiles([]);
                  }}
                  className="px-4 py-2 rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleUpdateDelivery}
                  disabled={isSubmitting}
                  className="px-6 py-2 rounded-lg bg-black text-white hover:bg-gray-800 transition-colors flex items-center"
                >
                  {isSubmitting ? (
                    <>
                      <span className="animate-spin mr-2 h-4 w-4 border-t-2 border-b-2 border-white rounded-full"></span>
                      Updating...
                    </>
                  ) : (
                    <>
                      <Check className="w-5 h-5 mr-1" /> Save Changes
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ClientsPage;