"use client";

import React, { useState, useEffect } from 'react';
import { 
  User, Search, Filter, MoreHorizontal, Phone, Mail, 
  ExternalLink, Download, Trash2, Edit, Plus, CheckCircle, XCircle, 
  ChevronDown, Briefcase, MapPin, Calendar, Clock, Users, FileText
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const FreelancersPage = () => {
  const [freelancers, setFreelancers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterProfession, setFilterProfession] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedFreelancer, setSelectedFreelancer] = useState(null);
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalFreelancers, setTotalFreelancers] = useState(0);
  const [freelancersPerPage] = useState(20);
  
  useEffect(() => {
    fetchFreelancers();
  }, [currentPage, searchTerm, filterProfession]);

  const fetchFreelancers = async () => {
    try {
      setLoading(true);
      
      // Build query parameters
      const params = new URLSearchParams();
      params.append('page', currentPage.toString());
      params.append('limit', freelancersPerPage.toString());
      
      if (searchTerm) {
        params.append('search', searchTerm);
      }
      
      if (filterProfession !== 'all') {
        params.append('profession', filterProfession);
      }
      
      const response = await fetch(`/api/admin/freelancers?${params.toString()}`);
      const data = await response.json();
      
      if (response.ok) {
        setFreelancers(data.freelancers);
        setTotalPages(data.pagination.totalPages);
        setTotalFreelancers(data.pagination.totalFreelancers);
      } else {
        throw new Error(data.error || 'Failed to fetch freelancers');
      }
    } catch (error) {
      console.error('Error fetching freelancers:', error);
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
        fetchFreelancers();
      }
    }, 500);
    
    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Handle filter changes
  useEffect(() => {
    if (currentPage !== 1) {
      setCurrentPage(1); // Reset to page 1 when filter changes
    } else {
      fetchFreelancers();
    }
  }, [filterProfession]);

  const handleViewDetails = (freelancer) => {
    setSelectedFreelancer(freelancer);
  };

  const exportToCSV = async () => {
    try {
      setLoading(true);
      
      // Fetch all freelancers for export
      const response = await fetch('/api/admin/freelancers/export');
      const data = await response.json();
      
      if (response.ok) {
        // CSV export functionality
        const headers = ['Name', 'Email', 'Mobile', 'Profession', 'City', 'Country', 'Created At'];
        const csvData = data.freelancers.map(freelancer => [
          freelancer.name || 'Unnamed',
          freelancer.email,
          freelancer.mobile || 'Not provided',
          freelancer.profession || 'Not specified',
          freelancer.city || 'Not specified',
          freelancer.country || 'Not specified',
          new Date(freelancer.createdAt).toLocaleDateString()
        ]);
        
        let csvContent = headers.join(',') + '\n';
        csvData.forEach(row => {
          csvContent += row.join(',') + '\n';
        });
        
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.setAttribute('href', url);
        link.setAttribute('download', 'freelancers.csv');
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else {
        throw new Error(data.error || 'Failed to export freelancers');
      }
    } catch (error) {
      console.error('Error exporting freelancers:', error);
    } finally {
      setLoading(false);
    }
  };

  // Freelancer Details Modal
  const FreelancerDetailsModal = ({ freelancer, onClose }) => {
    const [clients, setClients] = useState([]);
    const [clientsLoading, setClientsLoading] = useState(true);
    const [stats, setStats] = useState({
      totalDeliveries: 0,
      totalClients: 0,
      totalEarnings: 0,
      pendingEarnings: 0
    });

    useEffect(() => {
      fetchFreelancerClients(freelancer.id);
      fetchFreelancerStats(freelancer.id);
    }, [freelancer.id]);

    const fetchFreelancerClients = async (freelancerId) => {
      try {
        setClientsLoading(true);
        const response = await fetch(`/api/admin/freelancer-clients?freelancerId=${freelancerId}`);
        const data = await response.json();
        
        if (response.ok) {
          setClients(data.clients);
        } else {
          throw new Error(data.error || 'Failed to fetch clients');
        }
      } catch (error) {
        console.error('Error fetching freelancer clients:', error);
      } finally {
        setClientsLoading(false);
      }
    };

    const fetchFreelancerStats = async (freelancerId) => {
      try {
        const response = await fetch(`/api/admin/freelancer-stats?freelancerId=${freelancerId}`);
        const data = await response.json();
        
        if (response.ok) {
          setStats(data.stats);
        } else {
          throw new Error(data.error || 'Failed to fetch stats');
        }
      } catch (error) {
        console.error('Error fetching freelancer stats:', error);
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
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center overflow-hidden">
                {freelancer.profileImage ? (
                  <img 
                    src={freelancer.profileImage} 
                    alt={freelancer.name || 'Freelancer'} 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <User className="w-6 h-6 text-purple-600" />
                )}
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900">{freelancer.name || 'Unnamed Freelancer'}</h3>
                <p className="text-sm text-gray-500">Freelancer ID: {freelancer.id}</p>
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
              {/* Freelancer Information */}
              <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
                <h4 className="text-lg font-medium mb-4 text-gray-900">Freelancer Information</h4>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <span className="w-32 text-gray-500 text-sm">Email:</span>
                    <span className="text-gray-900 break-all">{freelancer.email}</span>
                  </div>
                  <div className="flex items-start">
                    <span className="w-32 text-gray-500 text-sm">Phone:</span>
                    <span className="text-gray-900">{freelancer.mobile ? `+${freelancer.mobile}` : 'Not provided'}</span>
                  </div>
                  <div className="flex items-start">
                    <span className="w-32 text-gray-500 text-sm">Profession:</span>
                    <span className="text-gray-900">{freelancer.profession || 'Not specified'}</span>
                  </div>
                  <div className="flex items-start">
                    <span className="w-32 text-gray-500 text-sm">Location:</span>
                    <span className="text-gray-900">
                      {freelancer.city && freelancer.country 
                        ? `${freelancer.city}, ${freelancer.country}`
                        : freelancer.city || freelancer.country || 'Not specified'}
                    </span>
                  </div>
                  <div className="flex items-start">
                    <span className="w-32 text-gray-500 text-sm">Username:</span>
                    <span className="text-gray-900">{freelancer.username || 'Not set'}</span>
                  </div>
                  <div className="flex items-start">
                    <span className="w-32 text-gray-500 text-sm">Created:</span>
                    <span className="text-gray-900">{new Date(freelancer.createdAt).toLocaleDateString()} 
                      <span className="text-gray-500 text-xs ml-1">
                        ({new Date(freelancer.createdAt).toLocaleTimeString()})
                      </span>
                    </span>
                  </div>
                  <div className="flex items-start">
                    <span className="w-32 text-gray-500 text-sm">Last Updated:</span>
                    <span className="text-gray-900">{new Date(freelancer.updatedAt).toLocaleDateString()}
                      <span className="text-gray-500 text-xs ml-1">
                        ({new Date(freelancer.updatedAt).toLocaleTimeString()})
                      </span>
                    </span>
                  </div>
                </div>
              </div>
              
              {/* Stats Summary */}
              <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
                <h4 className="text-lg font-medium mb-4 text-gray-900">Performance Summary</h4>
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex items-center gap-2 text-gray-500 mb-1">
                        <Users className="w-4 h-4" />
                        <span className="text-sm">Total Clients</span>
                      </div>
                      <div className="text-2xl font-semibold">{stats.totalClients}</div>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex items-center gap-2 text-gray-500 mb-1">
                        <FileText className="w-4 h-4" />
                        <span className="text-sm">Deliveries</span>
                      </div>
                      <div className="text-2xl font-semibold">{stats.totalDeliveries}</div>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-gray-600">Total Earnings</span>
                        <span className="font-semibold text-green-600">₹{stats.totalEarnings}</span>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-green-500 rounded-full"
                          style={{ 
                            width: `${stats.totalEarnings > 0 ? 
                              (100 - Math.min(100, (stats.pendingEarnings / (stats.totalEarnings + stats.pendingEarnings)) * 100)).toFixed(0) : 0}%` 
                          }}
                        />
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-gray-600">Pending Earnings</span>
                        <span className="font-semibold text-yellow-600">₹{stats.pendingEarnings}</span>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-yellow-400 rounded-full"
                          style={{ 
                            width: `${stats.pendingEarnings > 0 ? 
                              Math.min(100, (stats.pendingEarnings / (stats.totalEarnings + stats.pendingEarnings)) * 100).toFixed(0) : 0}%` 
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t border-gray-200">
                    <h5 className="text-sm font-medium text-gray-700 mb-2">Activity Timeline</h5>
                    <div className="space-y-2">
                      <div className="flex items-start">
                        <div className="flex-shrink-0 mt-1">
                          <div className="h-3 w-3 rounded-full bg-purple-500"></div>
                        </div>
                        <div className="ml-2">
                          <p className="text-sm text-gray-900">Account Created</p>
                          <p className="text-xs text-gray-500">{new Date(freelancer.createdAt).toLocaleDateString()}</p>
                        </div>
                      </div>
                      {stats.lastDeliveryDate && (
                        <div className="flex items-start">
                          <div className="flex-shrink-0 mt-1">
                            <div className="h-3 w-3 rounded-full bg-blue-500"></div>
                          </div>
                          <div className="ml-2">
                            <p className="text-sm text-gray-900">Last Delivery</p>
                            <p className="text-xs text-gray-500">{new Date(stats.lastDeliveryDate).toLocaleDateString()}</p>
                          </div>
                        </div>
                      )}
                      {stats.lastClientDate && (
                        <div className="flex items-start">
                          <div className="flex-shrink-0 mt-1">
                            <div className="h-3 w-3 rounded-full bg-green-500"></div>
                          </div>
                          <div className="ml-2">
                            <p className="text-sm text-gray-900">Last Client Added</p>
                            <p className="text-xs text-gray-500">{new Date(stats.lastClientDate).toLocaleDateString()}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Clients Section */}
            <div className="mt-8">
              <h4 className="text-lg font-medium mb-4 text-gray-900">Client List</h4>
              {clientsLoading ? (
                <div className="flex justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-700"></div>
                </div>
              ) : clients.length > 0 ? (
                <div className="overflow-x-auto rounded-xl border border-gray-200">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment Mode</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Deliveries</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {clients.map((client) => (
                        <tr key={client.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">{client.name}</div>
                            <div className="text-xs text-gray-500">{client.id}</div>
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
                            {client._count?.deliveries || 0}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {new Date(client.createdAt).toLocaleDateString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="bg-gray-50 rounded-xl p-8 text-center">
                  <p className="text-gray-500">No clients found for this freelancer</p>
                </div>
              )}
            </div>
          </div>
          
          {/* Footer */}
          {/* <div className="p-6 border-t border-gray-200 bg-gray-50 flex justify-end space-x-4">
            <button 
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition-colors"
            >
              Close
            </button>
            <a 
              href={`/freelancer/${freelancer.id}/dashboard`} 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center gap-2"
            >
              <ExternalLink className="w-4 h-4" />
              View Dashboard
            </a>
          </div> */}
        </motion.div>
      </div>
    );
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Freelancer Management</h1>
        <p className="text-gray-600">Manage all freelancer accounts and monitor their performance</p>
      </div>

      {/* Action Bar */}
      <div className="mb-6 flex flex-col sm:flex-row space-y-4 sm:space-y-0 items-start sm:items-center justify-between">
        {/* Search input */}
        <div className="relative w-full sm:w-64 md:w-96">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input 
            type="text" 
            placeholder="Search freelancers..."
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
                    <div className="p-2 text-xs font-medium text-gray-500 uppercase">Profession</div>
                    <button 
                      onClick={() => setFilterProfession('all')}
                      className={`w-full text-left px-4 py-2 text-sm rounded-md transition-colors ${filterProfession === 'all' ? 'bg-purple-100 text-purple-700' : 'hover:bg-gray-100'}`}
                    >
                      All Professions
                    </button>
                    <button 
                      onClick={() => setFilterProfession('Developer')}
                      className={`w-full text-left px-4 py-2 text-sm rounded-md transition-colors ${filterProfession === 'Developer' ? 'bg-purple-100 text-purple-700' : 'hover:bg-gray-100'}`}
                    >
                      Developer
                    </button>
                    <button 
                      onClick={() => setFilterProfession('Designer')}
                      className={`w-full text-left px-4 py-2 text-sm rounded-md transition-colors ${filterProfession === 'Designer' ? 'bg-purple-100 text-purple-700' : 'hover:bg-gray-100'}`}
                    >
                      Designer
                    </button>
                    <button 
                      onClick={() => setFilterProfession('Writer')}
                      className={`w-full text-left px-4 py-2 text-sm rounded-md transition-colors ${filterProfession === 'Writer' ? 'bg-purple-100 text-purple-700' : 'hover:bg-gray-100'}`}
                    >
                      Writer
                    </button>
                    <button 
                      onClick={() => setFilterProfession('Marketer')}
                      className={`w-full text-left px-4 py-2 text-sm rounded-md transition-colors ${filterProfession === 'Marketer' ? 'bg-purple-100 text-purple-700' : 'hover:bg-gray-100'}`}
                    >
                      Marketer
                    </button>
                    <button 
                      onClick={() => setFilterProfession('Consultant')}
                      className={`w-full text-left px-4 py-2 text-sm rounded-md transition-colors ${filterProfession === 'Consultant' ? 'bg-purple-100 text-purple-700' : 'hover:bg-gray-100'}`}
                    >
                      Consultant
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

      {/* Freelancers Table */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200">
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-700"></div>
          </div>
        ) : freelancers.length > 0 ? (
          <>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Freelancer</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Profession</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Clients</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {freelancers.map((freelancer) => (
                    <tr key={freelancer.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 bg-gray-100 rounded-full flex items-center justify-center overflow-hidden">
                            {freelancer.profileImage ? (
                              <img 
                                src={freelancer.profileImage} 
                                alt={freelancer.name || 'Freelancer'} 
                                className="h-10 w-10 object-cover"
                              />
                            ) : (
                              <User className="w-5 h-5 text-gray-500" />
                            )}
                          </div>
                          <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{freelancer.name || 'Unnamed Freelancer'}</div>
                            <div className="text-xs text-gray-500">{freelancer.username || freelancer.id}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          <div className="flex items-center">
                            <Mail className="w-4 h-4 text-gray-400 mr-1" />
                            <span>{freelancer.email}</span>
                          </div>
                        </div>
                        <div className="text-sm text-gray-900 mt-1">
                          {freelancer.mobile ? (
                            <div className="flex items-center">
                              <Phone className="w-4 h-4 text-gray-400 mr-1" />
                              <span>+{freelancer.mobile}</span>
                            </div>
                          ) : (
                            <span className="text-gray-400">No phone</span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div className="flex items-center">
                          <Briefcase className="w-4 h-4 text-gray-400 mr-2" />
                          <span>{freelancer.profession || 'Not specified'}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {(freelancer.city || freelancer.country) ? (
                          <div className="flex items-center">
                            <MapPin className="w-4 h-4 text-gray-400 mr-2" />
                            <span>
                              {freelancer.city && freelancer.country 
                                ? `${freelancer.city}, ${freelancer.country}`
                                : freelancer.city || freelancer.country}
                            </span>
                          </div>
                        ) : (
                          <span className="text-gray-400">Not specified</span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 text-gray-400 mr-2" />
                          <span>{new Date(freelancer.createdAt).toLocaleDateString()}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div className="flex items-center">
                          <Users className="w-4 h-4 text-gray-400 mr-2" />
                          <span>{freelancer._count?.clients || 0}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button 
                          onClick={() => handleViewDetails(freelancer)}
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
                Showing page {currentPage} of {totalPages} ({totalFreelancers} total freelancers)
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
            <h3 className="text-lg font-medium text-gray-900 mb-1">No Freelancers Found</h3>
            <p className="text-gray-500 max-w-md mx-auto">
              {searchTerm || filterProfession !== 'all' ? 
                'Try adjusting your search or filter to find what you\'re looking for.' :
                'There are no freelancers in the system yet.'}
            </p>
          </div>
        )}
      </div>

      {/* Freelancer Details Modal */}
      <AnimatePresence>
        {selectedFreelancer && (
          <FreelancerDetailsModal 
            freelancer={selectedFreelancer} 
            onClose={() => setSelectedFreelancer(null)} 
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default FreelancersPage;