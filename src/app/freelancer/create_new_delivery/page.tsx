
'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/authContext';
import { Info, Hash, Copy, Check, X, Phone, Mail, Search } from 'lucide-react';
import FileUploadComponent from '../_components/FileUploadComponent';

interface Client {
  id: string;
  name: string;
  email?: string;
  phone?: string;
}

const AddNewDelivery = () => {
  const router = useRouter();
  const { freelancerId } = useAuth();
  const deliveryFormRef = useRef<HTMLDivElement>(null);
  
  const [isLoading, setIsLoading] = useState(true);
  const [clients, setClients] = useState<Client[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [deliveryLink, setDeliveryLink] = useState('');
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState(null);

  const [deliveryData, setDeliveryData] = useState({
    name: '',
    cost: '',
    currency: 'INR',
    desc: '',
    PaymentStatus: 'Not Paid'
  });

  const [selectedMessage, setSelectedMessage] = useState(null);

  const currencies = [
    { code: 'INR', symbol: '₹' },
  ];

  const messages = [
    {
      id: 1,
      label: "Initial Draft",
      text: "Here's the initial draft for your review. Looking forward to your feedback."
    },
    {
      id: 2,
      label: "Updates Done",
      text: "I've completed the requested updates. Please check if this aligns with what you had in mind."
    },
    {
      id: 3,
      label: "Revision",
      text: "I've revised the content based on your feedback. Let me know if any further changes are needed."
    },
    {
      id: 4,
      label: "Final",
      text: "Here's the final version with all revisions incorporated. Please confirm if this meets your requirements."
    }
  ];

  // Fetch clients when component mounts
  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await fetch(`/api/get-clients?freelancerId=${freelancerId}`);
        const data = await response.json();
        if (response.ok) {
          setClients(data.clients);
        } else {
          throw new Error(data.error);
        }
      } catch (error) {
        console.error('Error fetching clients:', error);
        setError('Failed to load clients');
      } finally {
        setIsLoading(false);
      }
    };

    if (freelancerId) {
      fetchClients();
    }
  }, [freelancerId]);

  const filteredClients = clients.filter(client =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.phone?.includes(searchTerm)
  );

  const handleClientSelect = (client: Client) => {
    setSelectedClient(client);
    // Smooth scroll to delivery form
    setTimeout(() => {
      deliveryFormRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  const handleUploadComplete = (fileInfo: any) => {
    setUploadedFiles(prev => [...prev, fileInfo]);
  };

  const handleMessageClick = (message: any) => {
    setSelectedMessage(message);
    setDeliveryData({ ...deliveryData, desc: message.text });
  };

  const resetModal = () => {
    setShowSuccessModal(false);
    setDeliveryLink('');
    setError(null);
    setCopied(false);
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(deliveryLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleSubmit = async () => {
    if (!selectedClient) {
      alert('Please select a client first');
      return;
    }

    try {
      setIsSubmitting(true);

      if (!deliveryData.name || !deliveryData.cost || !uploadedFiles.length) {
        alert('Please fill in all required fields and upload at least one file');
        return;
      }

      const response = await fetch('/api/create-delivery', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          clientId: selectedClient.id,
          delivery: {
            ...deliveryData,
            files: uploadedFiles,
            cost: parseFloat(deliveryData.cost)
          }
        }),
      });

      const result = await response.json();

      if (!response.ok) throw new Error(result.error);

      if (result.success && result.delivery?.id) {
        const link = `/${selectedClient.id}/preview?delivery=${result.delivery.name}`;
        setDeliveryLink(window.location.origin + link);
        setShowSuccessModal(true);
      }
    } catch (error: any) {
      console.error('Error creating delivery:', error);
      setError(error.message || 'Failed to create delivery');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Client Selection Section */}
      <div className="bg-gradient-to-b from-white to-gray-50 border-b border-gray-200 py-12">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Create New Delivery</h1>
          <p className="text-gray-600 mb-8">Select a client and set up delivery information</p>

          {/* Search Box */}
          <div className="relative max-w-2xl mb-8">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search clients by name, email, or phone"
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-black focus:ring-1 focus:ring-black transition-colors shadow-sm"
            />
          </div>

          {/* Clients Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredClients.map((client) => (
              <button
                key={client.id}
                onClick={() => handleClientSelect(client)}
                className={`p-6 rounded-xl border transition-all duration-200 hover:scale-[1.02]
                  ${selectedClient?.id === client.id
                    ? 'border-black bg-black text-white shadow-lg'
                    : 'border-gray-200 hover:border-gray-300 hover:shadow-md bg-white'}`}
              >
                <div className="font-medium text-lg mb-2">{client.name}</div>
                {client.email && (
                  <div className="text-sm truncate">
                    {selectedClient?.id === client.id ? 
                      <span className="text-gray-300">{client.email}</span> :
                      <span className="text-gray-500">{client.email}</span>
                    }
                  </div>
                )}
                {client.phone && (
                  <div className="text-sm truncate mt-1">
                    {selectedClient?.id === client.id ? 
                      <span className="text-gray-300">{client.phone}</span> :
                      <span className="text-gray-500">{client.phone}</span>
                    }
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Delivery Form Section */}
      {selectedClient && (
        <div ref={deliveryFormRef} className="py-12">
          <div className="max-w-7xl mx-auto px-4 md:px-8">
            {/* Selected Client Banner */}
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 mb-8 flex items-center justify-between">
              <div>
                <div className="text-sm text-gray-500">Selected Client</div>
                <div className="font-medium text-gray-900">{selectedClient.name}</div>
              </div>
              <button
                onClick={() => setSelectedClient(null)}
                className="text-sm text-gray-500 hover:text-gray-700"
              >
                Change Client
              </button>
            </div>

            {/* File Upload Section */}
            <div className="mb-8">
              <FileUploadComponent onUploadComplete={handleUploadComplete} />
            </div>

            {/* Delivery Details Form */}
            <div className="bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden">
              <div className="p-6 md:p-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-8">Delivery Details</h3>

                <div className="grid md:grid-cols-2 gap-8">
                  {/* Left Column */}
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Delivery Name</label>
                      <input
                        type="text"
                        value={deliveryData.name}
                        onChange={e => setDeliveryData({...deliveryData, name: e.target.value})}
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-black focus:ring-1 focus:ring-black transition-colors"
                        placeholder="Enter delivery name"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Delivery Cost</label>
                      <div className="flex gap-3">
                        <select
                          value={deliveryData.currency}
                          onChange={e => setDeliveryData({...deliveryData, currency: e.target.value})}
                          className="w-24 px-3 py-3 rounded-lg border border-gray-200 focus:border-black focus:ring-1 focus:ring-black transition-colors bg-gray-50"
                        >
                          {currencies.map(curr => (
                            <option key={curr.code} value={curr.code}>
                              {curr.symbol} {curr.code}
                            </option>
                          ))}
                        </select>
                        <input
                          type="number"
                          value={deliveryData.cost}
                          onChange={e => setDeliveryData({...deliveryData, cost: e.target.value})}
                          className="flex-1 px-4 py-3 rounded-lg border border-gray-200 focus:border-black focus:ring-1 focus:ring-black transition-colors"
                          placeholder="Enter amount"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Right Column */}
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Description</label>
                      <textarea
                        value={deliveryData.desc}
                        onChange={(e) => setDeliveryData({ ...deliveryData, desc: e.target.value })}
                        rows={4}
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-black focus:ring-1 focus:ring-black transition-colors resize-none"
                        placeholder="Write your delivery description here..."
                      />
                    </div>

                    {/* Quick Messages */}
                    <div>
                      <h4 className="text-sm font-medium text-gray-700 mb-3">Quick Messages:</h4>
                      <div className="flex flex-wrap gap-2">
                        {messages.map((message) => (
                          <button
                            key={message.id}
                            onClick={() => handleMessageClick(message)}
                            className={`px-4 py-1.5 text-sm font-medium rounded-full transition-all duration-200 
                              ${selectedMessage?.id === message.id
                                ? 'bg-gradient-to-r from-gray-800 to-black text-white shadow-sm scale-[1.02]'
                                : 'bg-white text-gray-600 shadow-sm hover:shadow border border-gray-200 hover:border-gray-300'}`}
                          >
                            {message.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end space-x-4 mt-8 pt-6 border-t border-gray-100">
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedClient(null);
                      setDeliveryData({
                        name: '',
                        cost: '',
                        currency: 'INR',
                        desc: '',
                        PaymentStatus: 'PENDING'
                      });
                      setSelectedMessage(null);
                    }}
                    className="px-6 py-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="px-6 py-2 rounded-lg bg-black text-white hover:bg-gray-900 transition-colors disabled:bg-gray-400"
                  >
                    {isSubmitting ? 'Creating...' : 'Create Delivery'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-md w-full relative animate-scale-up">
            <button 
              onClick={resetModal}
              className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="p-6">
              <div className="w-16 h-16 bg-green-100 rounded-full mx-auto flex items-center justify-center mb-4">
                <Check className="w-8 h-8 text-green-500" />
              </div>

              <h3 className="text-2xl font-bold text-center text-gray-900 mb-2">
                Success! 🎉
              </h3>
              
              <p className="text-center text-gray-600 mb-6">
                Your delivery has been created successfully
              </p>

              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <p className="text-sm text-gray-600 mb-2">Delivery link:</p>
                <div className="flex items-center gap-2 bg-white rounded-lg border border-gray-200 p-3">
                  <input
                    type="text"
                    value={deliveryLink}
                    readOnly
                    className="flex-1 text-sm bg-transparent outline-none"
                  />
                  <button
                    onClick={handleCopyLink}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors group relative"
                  >
                    {copied ? (
                      <Check className="w-4 h-4 text-green-500" />
                    ) : (
                      <Copy className="w-4 h-4 text-gray-500" />
                    )}
                    
                    <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                      {copied ? 'Copied!' : 'Copy link'}
                    </span>
                  </button>
                </div>
              </div>

              <div className="flex gap-3 justify-center">
                <button
                  onClick={() => {
                    resetModal();
                    setSelectedClient(null);
                    setDeliveryData({
                      name: '',
                      cost: '',
                      currency: 'INR',
                      desc: '',
                      PaymentStatus: 'PENDING'
                    });
                    setSelectedMessage(null);
                  }}
                  className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 transition-colors"
                >
                  Create Another
                </button>
                <button
                  onClick={handleCopyLink}
                  className="px-6 py-2 text-sm bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
                >
                  {copied ? 'Copied!' : 'Copy Link'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes scale-up {
          from {
            transform: scale(0.95);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }
        .animate-scale-up {
          animation: scale-up 0.2s ease-out;
        }
      `}</style>
    </div>
  );
};

export default AddNewDelivery;