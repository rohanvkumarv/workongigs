
import React, { useState, useEffect, useRef } from 'react';
import { X, Search, Plus, Check, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import FileUploadComponent from '../_components/FileUploadComponent'; // Use existing component
import DeliverySuccessModal from './DeliverySuccessModal'; // Import success modal
import { generatePreviewUrl } from '../utils/previewUtils'; // Import preview utils

const QuickDeliveryModal = ({ isOpen, onClose, freelancerId, onSuccess }) => {
  // States
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // File upload tracking
  const [totalFilesSelected, setTotalFilesSelected] = useState(0);
  const [filesUploadingCount, setFilesUploadingCount] = useState(0);
  const [uploadErrors, setUploadErrors] = useState([]);
  
  // Success modal state
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [createdDelivery, setCreatedDelivery] = useState(null);
  
  // Client search states
  const [clientSearch, setClientSearch] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedClient, setSelectedClient] = useState(null);
  const [showCreateClient, setShowCreateClient] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);
  
  // Form states
  const [deliveryForm, setDeliveryForm] = useState({
    name: '',
    desc: '',
    cost: '',
    PaymentStatus: 'Not Paid'
  });
  
  const [newClientForm, setNewClientForm] = useState({
    name: '',
    email: '',
    phone: '',
    modeOfPay: 'Direct Payment',
    status: 'Active',
    note: ''
  });

  // Refs
  const searchTimeoutRef = useRef(null);

  // Handle files being selected/dropped - called immediately when files are dropped
  const handleFilesSelected = (files) => {
    console.log('Files selected:', files);
    // Track total files and start upload counting
    setTotalFilesSelected(prev => prev + files.length);
    setFilesUploadingCount(prev => prev + files.length);
    // Show form IMMEDIATELY when files are dropped/selected
    setShowForm(true);
  };

  // Handle file upload error - called when upload fails
  const handleUploadError = (file, error) => {
    console.error('Upload failed for file:', file.name, error);
    // Add to error list
    setUploadErrors(prev => [...prev, { fileName: file.name, error: error.message }]);
    // Decrease uploading count when a file fails
    setFilesUploadingCount(prev => Math.max(0, prev - 1));
  };

  // Handle file upload completion - called by FileUploadComponent  
  const handleUploadComplete = (fileInfo) => {
    setUploadedFiles(prev => [...prev, fileInfo]);
    // Decrease uploading count when a file completes
    setFilesUploadingCount(prev => Math.max(0, prev - 1));
  };

  // Search for existing clients
  const searchClients = async (query) => {
    if (!query.trim() || query.length < 2) {
      setSearchResults([]);
      return;
    }

    setSearchLoading(true);
    try {
      const response = await fetch(`/api/freelancer/search-clients?freelancerId=${freelancerId}&query=${encodeURIComponent(query)}`);
      const data = await response.json();
      
      if (response.ok) {
        setSearchResults(data.clients || []);
      }
    } catch (error) {
      console.error('Error searching clients:', error);
    } finally {
      setSearchLoading(false);
    }
  };

  // Handle client search input
  const handleClientSearch = (value) => {
    setClientSearch(value);
    setSelectedClient(null);
    setShowCreateClient(false);
    
    // Clear previous timeout
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }
    
    // Set new timeout for search
    searchTimeoutRef.current = setTimeout(() => {
      searchClients(value);
    }, 300);
  };

  // Select existing client
  const handleSelectClient = (client) => {
    setSelectedClient(client);
    setClientSearch(client.name);
    setSearchResults([]);
    setShowCreateClient(false);
  };

  // Show create new client form
  const handleCreateNewClient = () => {
    setShowCreateClient(true);
    setSelectedClient(null);
    setSearchResults([]);
    setNewClientForm({ ...newClientForm, name: clientSearch });
  };

  // Check if files are still uploading
  const isUploadingFiles = filesUploadingCount > 0;
  const allFilesUploaded = totalFilesSelected > 0 && uploadedFiles.length === totalFilesSelected && !isUploadingFiles;
  
  // Check if form is ready for submission
  const canSubmit = !isUploadingFiles && !isSubmitting && (
    totalFilesSelected === 0 || // No files selected
    allFilesUploaded // All files uploaded
  );

  // Handle form submission
  const handleSubmit = async () => {
    // Validation
    if (!deliveryForm.name.trim()) {
      alert('Please enter delivery name');
      return;
    }

    if (!deliveryForm.cost) {
      alert('Please enter delivery cost');
      return;
    }

    if (!selectedClient && !showCreateClient) {
      alert('Please select a client or create a new one');
      return;
    }

    if (showCreateClient && !newClientForm.name.trim()) {
      alert('Please enter client name');
      return;
    }

    setIsSubmitting(true);
    
    try {
      let clientId = selectedClient?.id;
      
      // Create client if needed
      if (showCreateClient) {
        const clientResponse = await fetch('/api/freelancer/create-client', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ...newClientForm,
            freelancerId
          })
        });
        
        const clientData = await clientResponse.json();
        
        if (!clientResponse.ok) {
          throw new Error(clientData.error || 'Failed to create client');
        }
        
        clientId = clientData.client.id;
      }

      // Create delivery with uploaded files (even if still uploading, we'll use what's completed)
      const deliveryResponse = await fetch('/api/freelancer/create-delivery', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...deliveryForm,
          clientId,
          cost: parseFloat(deliveryForm.cost),
          files: uploadedFiles // Use completed uploads
        })
      });

      const deliveryData = await deliveryResponse.json();
      
      if (!deliveryResponse.ok) {
        throw new Error(deliveryData.error || 'Failed to create delivery');
      }

      // Success - Show success modal instead of closing immediately
      setCreatedDelivery({
        name: deliveryForm.name,
        clientId: clientId,
        clientName: selectedClient?.name || newClientForm.name
      });
      setShowSuccessModal(true);
      
    } catch (error) {
      console.error('Error creating delivery:', error);
      alert(error.message || 'Failed to create delivery');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle success modal close
  const handleSuccessModalClose = () => {
    setShowSuccessModal(false);
    setCreatedDelivery(null);
    onSuccess?.(); // Trigger dashboard refresh
    handleClose(); // Close main modal
  };

  // Handle modal close
  const handleClose = () => {
    setUploadedFiles([]);
    setShowForm(false);
    setTotalFilesSelected(0);
    setFilesUploadingCount(0);
    setUploadErrors([]);
    setClientSearch('');
    setSearchResults([]);
    setSelectedClient(null);
    setShowCreateClient(false);
    setDeliveryForm({
      name: '',
      desc: '',
      cost: '',
      PaymentStatus: 'Not Paid'
    });
    setNewClientForm({
      name: '',
      email: '',
      phone: '',
      modeOfPay: 'Direct Payment',
      status: 'Active',
      note: ''
    });
    onClose();
  };

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, []);

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
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
        >
          {/* Header */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-semibold text-gray-900">Quick Delivery Creation</h3>
              <button
                onClick={handleClose}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <p className="text-sm text-gray-500 mt-2">
              Drop files to start uploading, then complete the delivery details below
            </p>
          </div>

          {/* Content */}
          <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
            <div className="space-y-6">
              {/* File Upload Section - Always visible */}
              <div className="space-y-4">
                <label className="text-sm font-medium text-gray-700">
                  Delivery Files
                  {totalFilesSelected > 0 && (
                    <span className={`ml-2 ${
                      isUploadingFiles 
                        ? 'text-blue-600' 
                        : allFilesUploaded 
                          ? 'text-green-600' 
                          : 'text-yellow-600'
                    }`}>
                      ({uploadedFiles.length}/{totalFilesSelected} {
                        isUploadingFiles 
                          ? 'uploading...' 
                          : allFilesUploaded 
                            ? 'uploaded' 
                            : 'completed'
                      })
                    </span>
                  )}
                </label>
                
                {/* Use existing FileUploadComponent with all callbacks */}
                <FileUploadComponent 
                  onUploadComplete={handleUploadComplete}
                  onFilesSelected={handleFilesSelected}
                  onUploadError={handleUploadError}
                />
                
                {/* Show files status */}
                {showForm && (
                  <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <p className="text-sm text-blue-700">
                      📤 Files are uploading in the background. Complete the form below to create your delivery.
                    </p>
                  </div>
                )}
                
                {uploadedFiles.length > 0 && (
                  <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                    <p className="text-sm text-green-700">
                      ✅ {uploadedFiles.length} file(s) uploaded successfully.
                    </p>
                  </div>
                )}
              </div>

              {/* Form Section - Shows immediately when files are selected OR manually triggered */}
              <AnimatePresence>
                {showForm && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="space-y-6 border-t border-gray-200 pt-6"
                  >
                    {/* Client Search/Selection */}
                    <div className="space-y-4">
                      <label className="text-sm font-medium text-gray-700">
                        Client Information
                      </label>
                      
                      {/* Client Search Input */}
                      <div className="relative">
                        <div className="relative">
                          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                          <input
                            type="text"
                            value={clientSearch}
                            onChange={(e) => handleClientSearch(e.target.value)}
                            placeholder="Search existing client by name or phone..."
                            className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                          />
                        </div>

                        {/* Search Results Dropdown */}
                        {searchResults.length > 0 && (
                          <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                            {searchResults.map((client) => (
                              <button
                                key={client.id}
                                onClick={() => handleSelectClient(client)}
                                className="w-full text-left px-4 py-3 hover:bg-gray-50 border-b border-gray-100 last:border-b-0"
                              >
                                <div className="flex items-center gap-3">
                                  <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center overflow-hidden">
                                    {client.image ? (
                                      <img src={client.image} alt={client.name} className="w-full h-full object-cover" />
                                    ) : (
                                      <User className="w-4 h-4 text-gray-500" />
                                    )}
                                  </div>
                                  <div>
                                    <p className="font-medium text-gray-900">{client.name}</p>
                                    <p className="text-sm text-gray-500">
                                      {client.phone || client.email || 'No contact info'}
                                    </p>
                                  </div>
                                </div>
                              </button>
                            ))}
                          </div>
                        )}

                        {/* Create New Client Option */}
                        {clientSearch && searchResults.length === 0 && !searchLoading && !selectedClient && (
                          <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg">
                            <button
                              onClick={handleCreateNewClient}
                              className="w-full text-left px-4 py-3 hover:bg-blue-50 text-blue-600 flex items-center gap-2"
                            >
                              <Plus className="w-4 h-4" />
                              Create new client "{clientSearch}"
                            </button>
                          </div>
                        )}
                      </div>

                      {/* Selected Client Info */}
                      {selectedClient && (
                        <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center overflow-hidden">
                              {selectedClient.image ? (
                                <img src={selectedClient.image} alt={selectedClient.name} className="w-full h-full object-cover" />
                              ) : (
                                <User className="w-4 h-4 text-gray-500" />
                              )}
                            </div>
                            <div>
                              <p className="font-medium text-green-800">Selected: {selectedClient.name}</p>
                              <p className="text-sm text-green-600">
                                {selectedClient.phone || selectedClient.email || 'No contact info'}
                              </p>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* New Client Form */}
                      {showCreateClient && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="p-4 bg-blue-50 border border-blue-200 rounded-lg space-y-4"
                        >
                          <h4 className="font-medium text-blue-800">Create New Client</h4>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <label className="text-sm text-gray-600">Client Name *</label>
                              <input
                                type="text"
                                value={newClientForm.name}
                                onChange={(e) => setNewClientForm({...newClientForm, name: e.target.value})}
                                className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                              />
                            </div>
                            
                            <div>
                              <label className="text-sm text-gray-600">Phone</label>
                              <input
                                type="tel"
                                value={newClientForm.phone}
                                onChange={(e) => setNewClientForm({...newClientForm, phone: e.target.value})}
                                className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                              />
                            </div>
                            
                            <div>
                              <label className="text-sm text-gray-600">Email</label>
                              <input
                                type="email"
                                value={newClientForm.email}
                                onChange={(e) => setNewClientForm({...newClientForm, email: e.target.value})}
                                className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                              />
                            </div>
                            
                            <div>
                              <label className="text-sm text-gray-600">Payment Mode</label>
                              <select
                                value={newClientForm.modeOfPay}
                                onChange={(e) => setNewClientForm({...newClientForm, modeOfPay: e.target.value})}
                                className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                              >
                                <option value="Direct Payment">Direct Payment</option>
                                {/* <option value="Pay Later">Pay Later</option> */}
                              </select>
                            </div>
                          </div>
                        </motion.div>
                      )}

                      {/* Show form button if no files selected yet */}
                      {!showForm && (
                        <div className="text-center py-4">
                          <button
                            onClick={() => setShowForm(true)}
                            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                          >
                            Continue without files
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Delivery Information */}
                    <div className="space-y-4">
                      <label className="text-sm font-medium text-gray-700">
                        Delivery Information
                      </label>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm text-gray-600">Delivery Name *</label>
                          <input
                            type="text"
                            value={deliveryForm.name}
                            onChange={(e) => setDeliveryForm({...deliveryForm, name: e.target.value})}
                            placeholder="Enter delivery name"
                            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                          />
                        </div>
                        
                        <div>
                          <label className="text-sm text-gray-600">Cost *</label>
                          <div className="flex items-center">
                            <span className="px-3 py-3 rounded-l-lg border border-r-0 border-gray-200 bg-gray-50 text-gray-500">₹</span>
                            <input
                              type="number"
                              value={deliveryForm.cost}
                              onChange={(e) => setDeliveryForm({...deliveryForm, cost: e.target.value})}
                              placeholder="0"
                              className="w-full px-4 py-3 rounded-r-lg border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                            />
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <label className="text-sm text-gray-600">Description</label>
                        <textarea
                          value={deliveryForm.desc}
                          onChange={(e) => setDeliveryForm({...deliveryForm, desc: e.target.value})}
                          placeholder="Enter delivery description"
                          rows={3}
                          className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors resize-none"
                        />
                      </div>
                      <div className="p-6 border-t border-gray-200 bg-gray-50 flex flex-col sm:flex-row justify-end gap-3">
              <button
                onClick={handleClose}
                disabled={isSubmitting}
                className="px-4 py-2 rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-100 transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                disabled={!canSubmit}
                className={`px-6 py-2 rounded-lg transition-colors flex items-center justify-center ${
                  !canSubmit
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-black text-white hover:bg-gray-800'
                }`}
                title={
                  isUploadingFiles 
                    ? 'Please wait for files to finish uploading'
                    : isSubmitting 
                      ? 'Creating delivery...'
                      : 'Create delivery'
                }
              >
                {isSubmitting ? (
                  <>
                    <span className="animate-spin mr-2 h-4 w-4 border-t-2 border-b-2 border-white rounded-full"></span>
                    Creating...
                  </>
                ) : isUploadingFiles ? (
                  <>
                    <span className="animate-spin mr-2 h-4 w-4 border-t-2 border-b-2 border-gray-400 rounded-full"></span>
                    Uploading Files...
                  </>
                ) : (
                  <>
                    <Check className="w-4 h-4 mr-1" /> Create Delivery
                  </>
                )}
              </button>
            </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Footer - Show when form is visible */}
          {/* {showForm && (
            <div className="p-6 border-t border-gray-200 bg-gray-50 flex flex-col sm:flex-row justify-end gap-3">
              <button
                onClick={handleClose}
                disabled={isSubmitting}
                className="px-4 py-2 rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-100 transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                disabled={!canSubmit}
                className={`px-6 py-2 rounded-lg transition-colors flex items-center justify-center ${
                  !canSubmit
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-black text-white hover:bg-gray-800'
                }`}
                title={
                  isUploadingFiles 
                    ? 'Please wait for files to finish uploading'
                    : isSubmitting 
                      ? 'Creating delivery...'
                      : 'Create delivery'
                }
              >
                {isSubmitting ? (
                  <>
                    <span className="animate-spin mr-2 h-4 w-4 border-t-2 border-b-2 border-white rounded-full"></span>
                    Creating...
                  </>
                ) : isUploadingFiles ? (
                  <>
                    <span className="animate-spin mr-2 h-4 w-4 border-t-2 border-b-2 border-gray-400 rounded-full"></span>
                    Uploading Files...
                  </>
                ) : (
                  <>
                    <Check className="w-4 h-4 mr-1" /> Create Delivery
                  </>
                )}
              </button>
            </div>
          )} */}
        </motion.div>
      </motion.div>
      
      {/* Success Modal */}
      <DeliverySuccessModal
        isOpen={showSuccessModal}
        onClose={handleSuccessModalClose}
        clientId={createdDelivery?.clientId}
        deliveryName={createdDelivery?.name}
        clientName={createdDelivery?.clientName}
      />
    </AnimatePresence>
  );
};

export default QuickDeliveryModal;