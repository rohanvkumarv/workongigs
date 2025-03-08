"use client";

import React, { useState, useEffect } from 'react';
import { 
  FileText, Search, Filter, MoreHorizontal, Download, 
  ExternalLink, CheckCircle, XCircle, ChevronDown, Calendar, 
  Clock, Tag, CircleDollarSign, User, FileIcon, AlertCircle,
  Briefcase
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const DeliveriesPage = () => {
  const [deliveries, setDeliveries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterPaymentStatus, setFilterPaymentStatus] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedDelivery, setSelectedDelivery] = useState(null);
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalDeliveries, setTotalDeliveries] = useState(0);
  const [deliveriesPerPage] = useState(20);
  
  useEffect(() => {
    fetchDeliveries();
  }, [currentPage, searchTerm, filterPaymentStatus]);

  const fetchDeliveries = async () => {
    try {
      setLoading(true);
      
      // Build query parameters
      const params = new URLSearchParams();
      params.append('page', currentPage.toString());
      params.append('limit', deliveriesPerPage.toString());
      
      if (searchTerm) {
        params.append('search', searchTerm);
      }
      
      if (filterPaymentStatus !== 'all') {
        params.append('paymentStatus', filterPaymentStatus);
      }
      
      const response = await fetch(`/api/admin/deliveries?${params.toString()}`);
      const data = await response.json();
      
      if (response.ok) {
        setDeliveries(data.deliveries);
        setTotalPages(data.pagination.totalPages);
        setTotalDeliveries(data.pagination.totalDeliveries);
      } else {
        throw new Error(data.error || 'Failed to fetch deliveries');
      }
    } catch (error) {
      console.error('Error fetching deliveries:', error);
    } finally {
      setLoading(false);
    }
  };

  // Handle search with debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      if (currentPage !== 1) {
        setCurrentPage(1); // Reset to page 1 when search changes
      } else {
        fetchDeliveries();
      }
    }, 500);
    
    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Handle filter changes
  useEffect(() => {
    if (currentPage !== 1) {
      setCurrentPage(1); // Reset to page 1 when filter changes
    } else {
      fetchDeliveries();
    }
  }, [filterPaymentStatus]);

  const handleViewDetails = (delivery) => {
    setSelectedDelivery(delivery);
  };

  const exportToCSV = async () => {
    try {
      setLoading(true);
      
      // Fetch all deliveries for export
      const response = await fetch('/api/admin/deliveries/export');
      const data = await response.json();
      
      if (response.ok) {
        // CSV export functionality
        const headers = ['Delivery Name', 'Client', 'Freelancer', 'Cost', 'Payment Status', 'Creation Date', 'Files Count'];
        const csvData = data.deliveries.map(delivery => [
          delivery.name,
          delivery.client?.name || 'Unknown Client',
          delivery.client?.freelancer?.name || 'Unknown Freelancer',
          delivery.cost.toString(),
          delivery.PaymentStatus,
          new Date(delivery.createdAt).toLocaleDateString(),
          delivery.files?.length || 0
        ]);
        
        let csvContent = headers.join(',') + '\n';
        csvData.forEach(row => {
          csvContent += row.join(',') + '\n';
        });
        
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.setAttribute('href', url);
        link.setAttribute('download', 'deliveries.csv');
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else {
        throw new Error(data.error || 'Failed to export deliveries');
      }
    } catch (error) {
      console.error('Error exporting deliveries:', error);
    } finally {
      setLoading(false);
    }
  };

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  // Delivery Details Modal
  const DeliveryDetailsModal = ({ delivery, onClose }) => {
    const [files, setFiles] = useState([]);
    const [filesLoading, setFilesLoading] = useState(true);

    useEffect(() => {
      fetchDeliveryFiles(delivery.id);
    }, [delivery.id]);

    const fetchDeliveryFiles = async (deliveryId) => {
      try {
        setFilesLoading(true);
        const response = await fetch(`/api/admin/delivery-files?deliveryId=${deliveryId}`);
        const data = await response.json();
        
        if (response.ok) {
          setFiles(data.files);
        } else {
          throw new Error(data.error || 'Failed to fetch files');
        }
      } catch (error) {
        console.error('Error fetching delivery files:', error);
      } finally {
        setFilesLoading(false);
      }
    };

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-white rounded-2xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden"
        >
          {/* Header */}
          <div className="p-6 border-b border-gray-200 flex justify-between items-center bg-gradient-to-r from-gray-50 to-white">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <FileText className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900">{delivery.name}</h3>
                <p className="text-sm text-gray-500">Delivery ID: {delivery.id}</p>
              </div>
            </div>
            <button 
              onClick={onClose}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            >
              <XCircle className="w-6 h-6 text-gray-400 hover:text-gray-600" />
            </button>
          </div>
          
          {/* Content */}
          <div className="overflow-y-auto p-6 max-h-[calc(90vh-134px)]">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Delivery Information */}
              <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
                <h4 className="text-lg font-medium mb-4 text-gray-900">Delivery Information</h4>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <span className="w-32 text-gray-500 text-sm">Description:</span>
                    <span className="text-gray-900">{delivery.desc || 'No description provided'}</span>
                  </div>
                  <div className="flex items-start">
                    <span className="w-32 text-gray-500 text-sm">Cost:</span>
                    <span className="text-gray-900 font-medium">{formatCurrency(delivery.cost)}</span>
                  </div>
                  <div className="flex items-start">
                    <span className="w-32 text-gray-500 text-sm">Payment Status:</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      delivery.PaymentStatus === 'Paid' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {delivery.PaymentStatus}
                    </span>
                  </div>
                  <div className="flex items-start">
                    <span className="w-32 text-gray-500 text-sm">Withdraw Status:</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      delivery.withdrawStatus === 'yes' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {delivery.withdrawStatus === 'yes' ? 'Withdrawn' : 'Not Withdrawn'}
                    </span>
                  </div>
                  <div className="flex items-start">
                    <span className="w-32 text-gray-500 text-sm">Created:</span>
                    <span className="text-gray-900">{new Date(delivery.createdAt).toLocaleDateString()} 
                      <span className="text-gray-500 text-xs ml-1">
                        ({new Date(delivery.createdAt).toLocaleTimeString()})
                      </span>
                    </span>
                  </div>
                  <div className="flex items-start">
                    <span className="w-32 text-gray-500 text-sm">Last Updated:</span>
                    <span className="text-gray-900">{new Date(delivery.updatedAt).toLocaleDateString()}
                      <span className="text-gray-500 text-xs ml-1">
                        ({new Date(delivery.updatedAt).toLocaleTimeString()})
                      </span>
                    </span>
                  </div>
                </div>
              </div>
              
              {/* Client Information */}
              <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
                <h4 className="text-lg font-medium mb-4 text-gray-900">Client Information</h4>
                {delivery.client ? (
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                        <User className="w-5 h-5 text-gray-500" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{delivery.client.name}</p>
                        <p className="text-sm text-gray-500">{delivery.client.id}</p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-start">
                        <span className="w-32 text-gray-500 text-sm">Status:</span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          delivery.client.status.toLowerCase() === 'active' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {delivery.client.status}
                        </span>
                      </div>
                      <div className="flex items-start">
                        <span className="w-32 text-gray-500 text-sm">Payment Mode:</span>
                        <span className="text-gray-900">{delivery.client.modeOfPay}</span>
                      </div>
                      <div className="flex items-start">
                        <span className="w-32 text-gray-500 text-sm">Email:</span>
                        <span className="text-gray-900 break-all">{delivery.client.email || 'Not provided'}</span>
                      </div>
                      <div className="flex items-start">
                        <span className="w-32 text-gray-500 text-sm">Phone:</span>
                        <span className="text-gray-900">{delivery.client.phone || 'Not provided'}</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <p className="text-gray-500 italic">No client information available</p>
                )}
              </div>
            </div>
            
            {/* Freelancer Information */}
            <div className="mt-6">
              <h4 className="text-lg font-medium mb-4 text-gray-900">Freelancer Information</h4>
              {delivery.client?.freelancer ? (
                <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center overflow-hidden">
                      {delivery.client.freelancer.profileImage ? (
                        <img 
                          src={delivery.client.freelancer.profileImage} 
                          alt={delivery.client.freelancer.name || 'Freelancer'} 
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <User className="w-5 h-5 text-gray-500" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{delivery.client.freelancer.name || 'Unnamed Freelancer'}</p>
                      <p className="text-sm text-gray-500">{delivery.client.freelancer.email}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <span className="w-24 text-gray-500 text-sm">Phone:</span>
                        <span className="text-gray-900">{delivery.client.freelancer.mobile ? `+${delivery.client.freelancer.mobile}` : 'Not provided'}</span>
                      </div>
                      <div className="flex items-center">
                        <span className="w-24 text-gray-500 text-sm">Profession:</span>
                        <span className="text-gray-900">{delivery.client.freelancer.profession || 'Not specified'}</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <span className="w-24 text-gray-500 text-sm">City:</span>
                        <span className="text-gray-900">{delivery.client.freelancer.city || 'Not specified'}</span>
                      </div>
                      <div className="flex items-center">
                        <span className="w-24 text-gray-500 text-sm">Country:</span>
                        <span className="text-gray-900">{delivery.client.freelancer.country || 'Not specified'}</span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4">
                    <a 
                      href={`/admin/freelancers?id=${delivery.client.freelancer.id}`} 
                      className="text-purple-600 hover:text-purple-800 text-sm font-medium flex items-center gap-1"
                    >
                      View Freelancer Profile
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              ) : (
                <div className="bg-gray-50 rounded-xl p-5 text-center">
                  <p className="text-gray-500">No freelancer information available</p>
                </div>
              )}
            </div>
            
            {/* Files Section */}
            <div className="mt-8">
              <h4 className="text-lg font-medium mb-4 text-gray-900">Attached Files</h4>
              {filesLoading ? (
                <div className="flex justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-700"></div>
                </div>
              ) : files.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {files.map((file) => (
                    <div key={file.id} className="bg-white p-4 rounded-xl border border-gray-200 hover:shadow-md transition-shadow">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                          <FileIcon className="w-4 h-4 text-gray-500" />
                        </div>
                        <div className="flex-1 truncate">
                          <p className="font-medium text-sm text-gray-900 truncate">{file.name}</p>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-gray-500">
                          {new Date(file.createdAt).toLocaleDateString()}
                        </span>
                        <a 
                          href={file.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-purple-600 hover:text-purple-700 text-sm font-medium"
                        >
                          View File
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-gray-50 rounded-xl p-8 text-center">
                  <div className="flex justify-center mb-4">
                    <AlertCircle className="w-12 h-12 text-gray-400" />
                  </div>
                  <p className="text-gray-600">No files attached to this delivery</p>
                </div>
              )}
            </div>
          </div>
          
          {/* Footer */}
          <div className="p-6 border-t border-gray-200 bg-gray-50 flex justify-end space-x-4">
            <button 
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition-colors"
            >
              Close
            </button>
            <a 
              href={`/${delivery.client?.id}/preview?delivery=${delivery.name}`} 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center gap-2"
            >
              <ExternalLink className="w-4 h-4" />
              View Preview
            </a>
          </div>
        </motion.div>
      </div>
    );
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Delivery Management</h1>
        <p className="text-gray-600">Manage all delivery records across the platform</p>
      </div>

      {/* Action Bar */}
      <div className="mb-6 flex flex-col sm:flex-row space-y-4 sm:space-y-0 items-start sm:items-center justify-between">
        {/* Search input */}
        <div className="relative w-full sm:w-64 md:w-96">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input 
            type="text" 
            placeholder="Search deliveries..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>
        
        {/* Action buttons */}
        <div className="flex space-x-3 w-full sm:w-auto justify-between sm:justify-start">
          <div className="relative">
            <button 
              onClick={() => setShowFilters(!showFilters)}
              className="px-4 py-2 border border-gray-300 rounded-lg flex items-center gap-2 hover:bg-gray-50 transition-colors"
            >
              <Filter className="w-4 h-4 text-gray-600" />
              <span>Filters</span>
              <ChevronDown className={`w-4 h-4 text-gray-600 transition-transform ${showFilters ? 'transform rotate-180' : ''}`} />
            </button>
            
            {/* Filter dropdown */}
            <AnimatePresence>
              {showFilters && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 z-10"
                >
                  <div className="p-2">
                    <div className="p-2 text-xs font-medium text-gray-500 uppercase">Payment Status</div>
                    <button 
                      onClick={() => setFilterPaymentStatus('all')}
                      className={`w-full text-left px-4 py-2 text-sm rounded-md transition-colors ${filterPaymentStatus === 'all' ? 'bg-purple-100 text-purple-700' : 'hover:bg-gray-100'}`}
                    >
                      All
                    </button>
                    <button 
                      onClick={() => setFilterPaymentStatus('Paid')}
                      className={`w-full text-left px-4 py-2 text-sm rounded-md transition-colors ${filterPaymentStatus === 'Paid' ? 'bg-purple-100 text-purple-700' : 'hover:bg-gray-100'}`}
                    >
                      Paid
                    </button>
                    <button 
                      onClick={() => setFilterPaymentStatus('Not Paid')}
                      className={`w-full text-left px-4 py-2 text-sm rounded-md transition-colors ${filterPaymentStatus === 'Not Paid' ? 'bg-purple-100 text-purple-700' : 'hover:bg-gray-100'}`}
                    >
                      Not Paid
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          
          <button 
            onClick={exportToCSV}
            className="px-4 py-2 border border-gray-300 rounded-lg flex items-center gap-2 hover:bg-gray-50 transition-colors"
          >
            <Download className="w-4 h-4 text-gray-600" />
            <span className="hidden sm:inline">Export</span>
          </button>
        </div>
      </div>

      {/* Deliveries Table */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200">
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-700"></div>
          </div>
        ) : deliveries.length > 0 ? (
          <>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Delivery</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Freelancer</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {deliveries.map((delivery) => (
                    <tr key={delivery.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 bg-gray-100 rounded-full flex items-center justify-center">
                            <FileText className="w-5 h-5 text-gray-500" />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{delivery.name}</div>
                            <div className="text-xs text-gray-500 truncate max-w-xs">
                              {delivery.desc ? (
                                delivery.desc.length > 50 ? `${delivery.desc.substring(0, 50)}...` : delivery.desc
                              ) : 'No description'}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {delivery.client ? (
                          <div className="text-sm text-gray-900">
                            <div className="font-medium">{delivery.client.name}</div>
                            <div className="text-xs text-gray-500">{delivery.client.id.substring(0, 8)}...</div>
                          </div>
                        ) : (
                          <span className="text-gray-400">Unknown client</span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {delivery.client?.freelancer ? (
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-8 w-8 bg-gray-100 rounded-full flex items-center justify-center overflow-hidden mr-2">
                              {delivery.client.freelancer.profileImage ? (
                                <img 
                                  src={delivery.client.freelancer.profileImage} 
                                  alt={delivery.client.freelancer.name || 'Freelancer'} 
                                  className="h-8 w-8 object-cover"
                                />
                              ) : (
                                <User className="w-4 h-4 text-gray-500" />
                              )}
                            </div>
                            <div className="text-sm text-gray-900">
                              <div className="font-medium">{delivery.client.freelancer.name || 'Unnamed'}</div>
                              <div className="text-xs text-gray-500 flex items-center">
                                <Briefcase className="w-3 h-3 mr-1" />
                                {delivery.client.freelancer.profession || 'Not specified'}
                              </div>
                            </div>
                          </div>
                        ) : (
                          <span className="text-gray-400">Unknown freelancer</span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {formatCurrency(delivery.cost)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-medium rounded-full ${
                          delivery.PaymentStatus === 'Paid' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {delivery.PaymentStatus}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 text-gray-400 mr-2" />
                          <span>{new Date(delivery.createdAt).toLocaleDateString()}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button 
                          onClick={() => handleViewDetails(delivery)}
                          className="text-purple-600 hover:text-purple-900 mr-3"
                        >
                          Details
                        </button>
                      </td>
                    </tr>
                  ))}
                  </tbody>
                </table>
              </div>
              
              {/* Pagination */}
              <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 flex items-center justify-between">
                <div className="text-sm text-gray-500">
                  Showing page {currentPage} of {totalPages} ({totalDeliveries} total deliveries)
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className={`px-3 py-1 rounded-md ${
                      currentPage === 1
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
                    }`}
                  >
                    Previous
                  </button>
                  
                  <div className="flex space-x-1">
                    {/* First page */}
                    {currentPage > 3 && (
                      <button
                        onClick={() => setCurrentPage(1)}
                        className="px-3 py-1 rounded-md bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
                      >
                        1
                      </button>
                    )}
                    
                    {/* Ellipsis for many pages */}
                    {currentPage > 4 && (
                      <span className="px-2 py-1">...</span>
                    )}
                    
                    {/* Page numbers around current page */}
                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                      let pageNum;
                      
                      if (totalPages <= 5) {
                        // Show all pages if total is 5 or less
                        pageNum = i + 1;
                      } else if (currentPage <= 3) {
                        // Show first 5 pages
                        pageNum = i + 1;
                      } else if (currentPage >= totalPages - 2) {
                        // Show last 5 pages
                        pageNum = totalPages - 4 + i;
                      } else {
                        // Show current page and 2 before/after
                        pageNum = currentPage - 2 + i;
                      }
                      
                      // Only render if pageNum is valid
                      if (pageNum > 0 && pageNum <= totalPages) {
                        return (
                          <button
                            key={pageNum}
                            onClick={() => setCurrentPage(pageNum)}
                            className={`px-3 py-1 rounded-md ${
                              currentPage === pageNum
                                ? 'bg-purple-600 text-white'
                                : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
                            }`}
                          >
                            {pageNum}
                          </button>
                        );
                      }
                      return null;
                    })}
                    
                    {/* Ellipsis for many pages */}
                    {currentPage < totalPages - 3 && (
                      <span className="px-2 py-1">...</span>
                    )}
                    
                    {/* Last page */}
                    {totalPages > 3 && currentPage < totalPages - 2 && (
                      <button
                        onClick={() => setCurrentPage(totalPages)}
                        className="px-3 py-1 rounded-md bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
                      >
                        {totalPages}
                      </button>
                    )}
                  </div>
                  
                  <button
                    onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                    className={`px-3 py-1 rounded-md ${
                      currentPage === totalPages
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
                    }`}
                  >
                    Next
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="py-20 text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-1">No Deliveries Found</h3>
              <p className="text-gray-500 max-w-md mx-auto">
                {searchTerm || filterPaymentStatus !== 'all' ? 
                  'Try adjusting your search or filter to find what you\'re looking for.' :
                  'There are no deliveries in the system yet.'}
              </p>
            </div>
          )}
        </div>
  
        {/* Delivery Details Modal */}
        <AnimatePresence>
          {selectedDelivery && (
            <DeliveryDetailsModal 
              delivery={selectedDelivery} 
              onClose={() => setSelectedDelivery(null)} 
            />
          )}
        </AnimatePresence>
      </div>
    );
  };
  
  export default DeliveriesPage;