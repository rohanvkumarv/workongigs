"use client";

import React, { useState, useEffect } from 'react';
import { 
  User, Search, Filter, MoreHorizontal, Phone, Mail, 
  ExternalLink, Download, Trash2, Edit, Plus, CheckCircle, XCircle, ChevronDown
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ClientsPage = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalClients, setTotalClients] = useState(0);
  const [clientsPerPage] = useState(20);
  
  useEffect(() => {
    fetchClients();
  }, [currentPage, searchTerm, filterStatus]);

  const fetchClients = async () => {
    try {
      setLoading(true);
      
      // Build query parameters
      const params = new URLSearchParams();
      params.append('page', currentPage.toString());
      params.append('limit', clientsPerPage.toString());
      
      if (searchTerm) {
        params.append('search', searchTerm);
      }
      
      if (filterStatus !== 'all') {
        params.append('status', filterStatus);
      }
      
      const response = await fetch(`/api/admin/clients?${params.toString()}`);
      const data = await response.json();
      
      if (response.ok) {
        setClients(data.clients);
        setTotalPages(data.pagination.totalPages);
        setTotalClients(data.pagination.totalClients);
      } else {
        throw new Error(data.error || 'Failed to fetch clients');
      }
    } catch (error) {
      console.error('Error fetching clients:', error);
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
        fetchClients();
      }
    }, 500);
    
    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Handle filter changes
  useEffect(() => {
    if (currentPage !== 1) {
      setCurrentPage(1); // Reset to page 1 when filter changes
    } else {
      fetchClients();
    }
  }, [filterStatus]);

  const handleViewDetails = (client) => {
    setSelectedClient(client);
  };

  const exportToCSV = async () => {
    try {
      setLoading(true);
      
      // Fetch all clients for export
      const response = await fetch('/api/admin/clients/export');
      const data = await response.json();
      
      if (response.ok) {
        // CSV export functionality
        const headers = ['Name', 'Email', 'Phone', 'Status', 'Payment Mode', 'Created At'];
        const csvData = data.clients.map(client => [
          client.name,
          client.email || 'N/A',
          client.phone || 'N/A',
          client.status,
          client.modeOfPay,
          new Date(client.createdAt).toLocaleDateString()
        ]);
        
        let csvContent = headers.join(',') + '\n';
        csvData.forEach(row => {
          csvContent += row.join(',') + '\n';
        });
        
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.setAttribute('href', url);
        link.setAttribute('download', 'clients.csv');
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else {
        throw new Error(data.error || 'Failed to export clients');
      }
    } catch (error) {
      console.error('Error exporting clients:', error);
    } finally {
      setLoading(false);
    }
  };

  // Client Details Modal
  const ClientDetailsModal = ({ client, onClose }) => {
    const [deliveries, setDeliveries] = useState([]);
    const [deliveriesLoading, setDeliveriesLoading] = useState(true);

    useEffect(() => {
      fetchClientDeliveries(client.id);
    }, [client.id]);

    const fetchClientDeliveries = async (clientId) => {
      try {
        setDeliveriesLoading(true);
        const response = await fetch(`/api/admin/client-deliveries?clientId=${clientId}`);
        const data = await response.json();
        
        if (response.ok) {
          setDeliveries(data.deliveries);
        } else {
          throw new Error(data.error || 'Failed to fetch deliveries');
        }
      } catch (error) {
        console.error('Error fetching client deliveries:', error);
      } finally {
        setDeliveriesLoading(false);
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
                <User className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900">{client.name}</h3>
                <p className="text-sm text-gray-500">Client ID: {client.id}</p>
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
              {/* Client Information */}
              <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
                <h4 className="text-lg font-medium mb-4 text-gray-900">Client Information</h4>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <span className="w-32 text-gray-500 text-sm">Status:</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      client.status.toLowerCase() === 'active' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {client.status}
                    </span>
                  </div>
                  <div className="flex items-start">
                    <span className="w-32 text-gray-500 text-sm">Payment Mode:</span>
                    <span className="text-gray-900">{client.modeOfPay}</span>
                  </div>
                  <div className="flex items-start">
                    <span className="w-32 text-gray-500 text-sm">Email:</span>
                    <span className="text-gray-900 break-all">{client.email || 'Not provided'}</span>
                  </div>
                  <div className="flex items-start">
                    <span className="w-32 text-gray-500 text-sm">Phone:</span>
                    <span className="text-gray-900">{client.phone || 'Not provided'}</span>
                  </div>
                  <div className="flex items-start">
                    <span className="w-32 text-gray-500 text-sm">Created:</span>
                    <span className="text-gray-900">{new Date(client.createdAt).toLocaleDateString()} 
                      <span className="text-gray-500 text-xs ml-1">
                        ({new Date(client.createdAt).toLocaleTimeString()})
                      </span>
                    </span>
                  </div>
                  <div className="flex items-start">
                    <span className="w-32 text-gray-500 text-sm">Last Updated:</span>
                    <span className="text-gray-900">{new Date(client.updatedAt).toLocaleDateString()}
                      <span className="text-gray-500 text-xs ml-1">
                        ({new Date(client.updatedAt).toLocaleTimeString()})
                      </span>
                    </span>
                  </div>
                </div>
              </div>
              
              {/* Associated Freelancer */}
              <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
                <h4 className="text-lg font-medium mb-4 text-gray-900">Associated Freelancer</h4>
                <div className="space-y-4">
                  {client.freelancer ? (
                    <>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center overflow-hidden">
                          {client.freelancer.profileImage ? (
                            <img src={client.freelancer.profileImage} alt={client.freelancer.name} className="w-full h-full object-cover" />
                          ) : (
                            <User className="w-5 h-5 text-gray-500" />
                          )}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{client.freelancer.name || 'Unnamed Freelancer'}</p>
                          <p className="text-sm text-gray-500">{client.freelancer.email}</p>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center">
                          <span className="w-32 text-gray-500 text-sm">Phone:</span>
                          <span className="text-gray-900">{client.freelancer.mobile ? `+${client.freelancer.mobile}` : 'Not provided'}</span>
                        </div>
                        <div className="flex items-center">
                          <span className="w-32 text-gray-500 text-sm">Profession:</span>
                          <span className="text-gray-900">{client.freelancer.profession || 'Not specified'}</span>
                        </div>
                        <div className="flex items-center">
                          <span className="w-32 text-gray-500 text-sm">Location:</span>
                          <span className="text-gray-900">
                            {client.freelancer.city ? `${client.freelancer.city}, ${client.freelancer.country || ''}` : 'Not specified'}
                          </span>
                        </div>
                      </div>
                    </>
                  ) : (
                    <p className="text-gray-500 italic">No freelancer information available</p>
                  )}
                </div>
              </div>
            </div>
            
            {/* Deliveries Section */}
            <div className="mt-8">
              <h4 className="text-lg font-medium mb-4 text-gray-900">Deliveries History</h4>
              {deliveriesLoading ? (
                <div className="flex justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-700"></div>
                </div>
              ) : deliveries.length > 0 ? (
                <div className="overflow-x-auto rounded-xl border border-gray-200">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Files</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {deliveries.map((delivery) => (
                        <tr key={delivery.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">{delivery.name}</div>
                            <div className="text-xs text-gray-500">{delivery.id}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">₹{delivery.cost}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 py-1 text-xs rounded-full font-medium ${
                              delivery.PaymentStatus === 'Paid' 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-yellow-100 text-yellow-800'
                            }`}>
                              {delivery.PaymentStatus}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {new Date(delivery.createdAt).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {delivery.files?.length || 0} files
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="bg-gray-50 rounded-xl p-8 text-center">
                  <p className="text-gray-500">No deliveries found for this client</p>
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
              href={`/${client.id}/preview`} 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center gap-2"
            >
              <ExternalLink className="w-4 h-4" />
              View Client Portal
            </a>
          </div>
        </motion.div>
      </div>
    );
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Client Management</h1>
        <p className="text-gray-600">Manage all client accounts and their associated data</p>
      </div>

      {/* Action Bar */}
      <div className="mb-6 flex flex-col sm:flex-row space-y-4 sm:space-y-0 items-start sm:items-center justify-between">
        {/* Search input */}
        <div className="relative w-full sm:w-64 md:w-96">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input 
            type="text" 
            placeholder="Search clients..."
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
                  className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-10"
                >
                  <div className="p-2">
                    <div className="p-2 text-xs font-medium text-gray-500 uppercase">Status</div>
                    <button 
                      onClick={() => setFilterStatus('all')}
                      className={`w-full text-left px-4 py-2 text-sm rounded-md transition-colors ${filterStatus === 'all' ? 'bg-purple-100 text-purple-700' : 'hover:bg-gray-100'}`}
                    >
                      All
                    </button>
                    <button 
                      onClick={() => setFilterStatus('active')}
                      className={`w-full text-left px-4 py-2 text-sm rounded-md transition-colors ${filterStatus === 'active' ? 'bg-purple-100 text-purple-700' : 'hover:bg-gray-100'}`}
                    >
                      Active
                    </button>
                    <button 
                      onClick={() => setFilterStatus('inactive')}
                      className={`w-full text-left px-4 py-2 text-sm rounded-md transition-colors ${filterStatus === 'inactive' ? 'bg-purple-100 text-purple-700' : 'hover:bg-gray-100'}`}
                    >
                      Inactive
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

      {/* Clients Table */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200">
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-700"></div>
          </div>
        ) : clients.length > 0 ? (
          <>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment Mode</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {clients.map((client) => (
                    <tr key={client.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 bg-gray-100 rounded-full flex items-center justify-center">
                            <User className="w-5 h-5 text-gray-500" />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{client.name}</div>
                            <div className="text-xs text-gray-500">{client.id}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {client.email ? (
                            <div className="flex items-center">
                              <Mail className="w-4 h-4 text-gray-400 mr-1" />
                              <span>{client.email}</span>
                            </div>
                          ) : (
                            <span className="text-gray-400">No email</span>
                          )}
                        </div>
                        <div className="text-sm text-gray-900 mt-1">
                          {client.phone ? (
                            <div className="flex items-center">
                              <Phone className="w-4 h-4 text-gray-400 mr-1" />
                              <span>{client.phone}</span>
                            </div>
                          ) : (
                            <span className="text-gray-400">No phone</span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-medium rounded-full ${
                          client.status.toLowerCase() === 'active' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {client.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {client.modeOfPay}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(client.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button 
                          onClick={() => handleViewDetails(client)}
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
                Showing page {currentPage} of {totalPages} ({totalClients} total clients)
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
              <User className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-1">No Clients Found</h3>
            <p className="text-gray-500 max-w-md mx-auto">
              {searchTerm || filterStatus !== 'all' ? 
                'Try adjusting your search or filter to find what you\'re looking for.' :
                'There are no clients in the system yet.'}
            </p>
          </div>
        )}
      </div>

      {/* Client Details Modal */}
      <AnimatePresence>
        {selectedClient && (
          <ClientDetailsModal 
            client={selectedClient} 
            onClose={() => setSelectedClient(null)} 
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default ClientsPage;
          