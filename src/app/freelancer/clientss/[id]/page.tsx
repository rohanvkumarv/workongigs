
"use client"

import React, { useState, useEffect } from 'react';
import { Plus, Copy, Pencil, X, Check, Trash2, File } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/context/authContext';
import Alert from '@/components/Alert';
import FileUploadComponent from '../../_components/FileUploadComponent'; // Adjust path if needed

const ClientDetailsPage = () => {
  const [client, setClient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState({ show: false, message: '', type: 'success' });
  const router = useRouter();
  
  const params = useParams();
  const clientId = params.id;
  const { freelancerId } = useAuth();

  // Edit modal state
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedDelivery, setSelectedDelivery] = useState(null);
  const [editForm, setEditForm] = useState({
    name: '',
    desc: '',
    cost: '',
    PaymentStatus: ''
  });
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchClientDetails = async () => {
      try {
        const response = await fetch(`/api/get-client-details`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ clientId })
        });
        
        const data = await response.json();
        if (!response.ok) throw new Error(data.error || 'Failed to fetch client');
        setClient(data);
      } catch (error) {
        console.error('Error:', error);
        showAlert('Failed to fetch client details', 'error');
      } finally {
        setLoading(false);
      }
    };

    if (clientId) fetchClientDetails();
  }, [clientId]);

  const calculatePaidAmount = (deliveries) => {
    return deliveries
      .filter(delivery => delivery.PaymentStatus === 'Paid')
      .reduce((sum, delivery) => sum + delivery.cost, 0);
  };

  const copyPreviewLink = (deliveryName) => {
    const previewLink = `${window.location.origin}/${clientId}/preview?delivery=${encodeURIComponent(deliveryName)}`;
    navigator.clipboard.writeText(previewLink);
    showAlert('Preview link copied to clipboard!', 'success');
  };

  const showAlert = (message, type = 'success') => {
    setAlert({
      show: true,
      message,
      type
    });
    setTimeout(() => setAlert({ ...alert, show: false }), 3000);
  };

  const handleEditClick = (delivery) => {
    setSelectedDelivery(delivery);
    setEditForm({
      name: delivery.name,
      desc: delivery.desc,
      cost: delivery.cost.toString(),
      PaymentStatus: delivery.PaymentStatus
    });
    setEditModalOpen(true);
  };

  const handleUploadComplete = (fileInfo) => {
    setUploadedFiles(prev => [...prev, fileInfo]);
  };

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
      
      // Update the client state to reflect the deleted file
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

  const handleUpdateDelivery = async () => {
    try {
      setIsSubmitting(true);
      
      const response = await fetch('/api/update-delivery', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          deliveryId: selectedDelivery.id,
          name: editForm.name,
          desc: editForm.desc,
          cost: parseFloat(editForm.cost),
          paymentStatus: editForm.PaymentStatus,
          files: uploadedFiles
        })
      });
      
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || 'Failed to update delivery');
      
      // Update the client state with the updated delivery
      setClient(prev => ({
        ...prev,
        deliveries: prev.deliveries.map(delivery => 
          delivery.id === selectedDelivery.id ? result.delivery : delivery
        )
      }));
      
      setEditModalOpen(false);
      setUploadedFiles([]);
      showAlert('Delivery updated successfully', 'success');
    } catch (error) {
      console.error('Error updating delivery:', error);
      showAlert('Failed to update delivery', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black"></div>
      </div>
    );
  }

  if (!client) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8 flex items-center justify-center">
        Client not found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-8 relative">
      {alert.show && (
        <Alert
          message={alert.message}
          type={alert.type}
          onClose={() => setAlert({ ...alert, show: false })}
        />
      )}

      {/* Header Card */}
      <div className="max-w-7xl mx-auto mb-6">
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200/50 backdrop-blur-sm p-4 md:p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-black rounded-xl flex items-center justify-center shadow-lg">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">{client.name}</h1>
                <div className="flex items-center gap-2 mt-1 flex-wrap">
                  <span className="bg-blue-50 px-2 py-0.5 rounded-md text-xs font-medium text-blue-600 border border-blue-100">
                    {client.modeOfPay}
                  </span>
                  <span className="bg-gray-50 px-2 py-0.5 rounded-md text-xs font-medium text-gray-600 border border-gray-100">
                    {client.status}
                  </span>
                  {client.email && (
                    <span className="bg-purple-50 px-2 py-0.5 rounded-md text-xs font-medium text-purple-600 border border-purple-100">
                      {client.email}
                    </span>
                  )}
                  {client.phone && (
                    <span className="bg-emerald-50 px-2 py-0.5 rounded-md text-xs font-medium text-emerald-600 border border-emerald-100">
                      {client.phone}
                    </span>
                  )}
                  <Link 
                    href={`/${clientId}/preview`}
                    className="bg-black text-white px-2 py-0.5 rounded-md text-xs font-medium hover:bg-gray-800 transition-colors"
                  >
                    Open Preview
                  </Link>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4 md:gap-8">
              <div className="text-left md:text-right">
                <p className="text-sm text-gray-500">Amount (Paid/Total)</p>
                <div className="flex items-baseline gap-2">
                  <p className="text-lg font-semibold text-emerald-600">
                    ₹{calculatePaidAmount(client.deliveries).toLocaleString()}
                  </p>
                  <p className="text-sm text-gray-500">
                    / ₹{client.deliveries.reduce((sum, delivery) => sum + delivery.cost, 0).toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Deliveries Section */}
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200/50 backdrop-blur-sm overflow-hidden">
          {/* Mobile View */}
          <div className="block md:hidden">
            {client.deliveries.map((delivery, index) => (
              <div key={index} className="p-4 border-b border-gray-200 last:border-b-0">
                <div className="flex items-center justify-between mb-2">
                  <div className="font-medium text-gray-900">{delivery.name}</div>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    delivery.PaymentStatus === 'Not Paid' 
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      : 'bg-gray-50 text-gray-700 border border-gray-200'
                  }`}>
                    {delivery.PaymentStatus}
                  </span>
                </div>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Files:</span>
                    <span>{delivery.files?.length || 0} files</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Date:</span>
                    <span>{new Date(delivery.createdAt).toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Cost:</span>
                    <span className="font-medium">₹{delivery.cost.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Description:</span>
                    <span className="text-right flex-1 ml-4 group relative">
                      {delivery.desc}
                      <span className="absolute bottom-full right-0 mb-2 w-48 p-2 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-50">
                        {delivery.desc}
                      </span>
                    </span>
                  </div>
                  <div className="mt-3 flex justify-end gap-2">
                    <button
                      onClick={() => handleEditClick(delivery)}
                      className="p-2 bg-blue-50 hover:bg-blue-100 rounded-lg transition-all border border-blue-200 shadow-sm"
                    >
                      <Pencil className="w-4 h-4 text-blue-600" />
                    </button>
                    <button
                      onClick={() => copyPreviewLink(delivery.name)}
                      className="p-2 bg-white hover:bg-gray-50 rounded-lg transition-all border border-gray-200 shadow-sm"
                    >
                      <Copy className="w-4 h-4 text-gray-600" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop View */}
          <div className="hidden md:block">
            <div className="px-8 py-4 border-b border-gray-200 bg-gray-50">
              <div className="grid grid-cols-8 gap-4">
                <div className="text-sm font-medium text-gray-500">Name</div>
                <div className="text-sm font-medium text-gray-500">Files</div>
                <div className="text-sm font-medium text-gray-500">Description</div>
                <div className="text-sm font-medium text-gray-500">Date</div>
                <div className="text-sm font-medium text-gray-500">Payment Status</div>
                <div className="text-sm font-medium text-gray-500">Cost</div>
                <div className="text-sm font-medium text-gray-500 text-center col-span-2">Actions</div>
              </div>
            </div>

            <div className="divide-y divide-gray-200">
              {client.deliveries.map((delivery, index) => (
                <div key={index} className="px-8 py-4 hover:bg-gray-50/50 transition-all">
                  <div className="grid grid-cols-8 gap-4 items-center">
                    <div className="font-medium text-gray-900">{delivery.name}</div>
                    <div className="text-gray-600">{delivery.files?.length || 0} files</div>
                    <div className="text-gray-600 truncate group relative" title={delivery.desc}>
                      {delivery.desc}
                      <span className="absolute bottom-full left-0 mb-2 w-64 p-2 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-50 whitespace-normal">
                        {delivery.desc}
                      </span>
                    </div>
                    <div className="text-gray-600">
                      {new Date(delivery.createdAt).toLocaleDateString()}
                    </div>
                    <div>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        delivery.PaymentStatus === 'Not Paid' 
                          ? 'bg-yellow-50 text-yellow-700 border border-yellow-200'
                          : 'bg-green-50 text-green-700 border border-green-200'
                      }`}>
                        {delivery.PaymentStatus}
                      </span>
                    </div>
                    <div className="text-gray-900 font-medium">
                      ₹{delivery.cost.toLocaleString()}
                    </div>
                    <div className="flex items-center justify-center gap-2 col-span-2">
                      <button
                        onClick={() => handleEditClick(delivery)}
                        className="p-2 bg-blue-50 hover:bg-blue-100 rounded-lg transition-all relative border border-blue-200 shadow-sm group/edit"
                      >
                        <Pencil className="w-4 h-4 text-blue-600" />
                        <div className="absolute bottom-full right-0 mb-2 opacity-0 group-hover/edit:opacity-100 transition-all duration-200 translate-y-1 group-hover/edit:translate-y-0">
                          <div className="px-2 py-1 text-xs font-medium text-white bg-gray-900 rounded-lg shadow-lg whitespace-nowrap">
                            Edit Delivery
                          </div>
                        </div>
                      </button>
                      <button
                        onClick={() => copyPreviewLink(delivery.name)}
                        className="p-2 bg-white hover:bg-gray-50 rounded-lg transition-all relative border border-gray-200 shadow-sm group/copy"
                      >
                        <Copy className="w-4 h-4 text-gray-600 transform transition-transform group-hover/copy:scale-110" />
                        <div className="absolute bottom-full right-0 mb-2 opacity-0 group-hover/copy:opacity-100 transition-all duration-200 translate-y-1 group-hover/copy:translate-y-0">
                          <div className="px-2 py-1 text-xs font-medium text-white bg-gray-900 rounded-lg shadow-lg whitespace-nowrap">
                            Copy Preview Link
                          </div>
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Edit Delivery Modal */}
      {editModalOpen && selectedDelivery && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-3xl w-full relative overflow-hidden">
            <div className="sticky top-0 bg-white z-10 border-b border-gray-200">
              <div className="flex justify-between items-center p-6">
                <h3 className="text-xl font-semibold text-gray-900">Edit Delivery</h3>
                <button 
                  onClick={() => {
                    setEditModalOpen(false);
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
                    value={editForm.name}
                    onChange={(e) => setEditForm({...editForm, name: e.target.value})}
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
                      value={editForm.cost}
                      onChange={(e) => setEditForm({...editForm, cost: e.target.value})}
                      className="w-full px-4 py-3 rounded-r-lg border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                    />
                  </div>
                </div>
                
                {/* Payment Status */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Payment Status</label>
                  <select
                    value={editForm.PaymentStatus}
                    onChange={(e) => setEditForm({...editForm, PaymentStatus: e.target.value})}
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
                    value={editForm.desc}
                    onChange={(e) => setEditForm({...editForm, desc: e.target.value})}
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
                            <File className="w-5 h-5 text-gray-500" />
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
                              <File className="w-5 h-5 text-blue-500" />
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
             setEditModalOpen(false);
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
     </div>
   </div>
 )}

 {/* Floating Action Button */}
 <button
   onClick={() => router.push('/freelancer/create_new_delivery')}
   className="fixed bottom-4 right-4 md:bottom-8 md:right-8 w-14 h-14 bg-black text-white rounded-full shadow-lg 
            hover:shadow-xl transition-all flex items-center justify-center group z-40"
 >
   <Plus className="w-6 h-6 group-hover:rotate-90 transition-transform duration-200" />
 </button>
</div>
);
};

export default ClientDetailsPage;