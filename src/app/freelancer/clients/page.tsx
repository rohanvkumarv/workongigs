
"use client"

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Search, Eye, Copy, Filter, ChevronDown } from 'lucide-react';
import { useAuth } from '@/context/authContext';
import Alert from '@/components/Alert';

const ClientsPage = () => {
  const { freelancerId, email, isAuthenticated, logout } = useAuth();
  
  const [allClients, setAllClients] = useState([]);
  const [filteredClients, setFilteredClients] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [isLoading, setIsLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const [alert, setAlert] = useState({ show: false, message: '', type: 'success' });

  const filters = [
    { id: 'all', label: 'All Clients' },
    { id: 'active', label: 'Active' },
    { id: 'completed', label: 'Completed' },
    { id: 'pending', label: 'Pending' }
  ];

  useEffect(() => {
    filterClients();
  }, [searchTerm, activeFilter, allClients]);

  useEffect(() => {
    const fetchClients = async (id) => {
      try {
        setIsLoading(true);
        const response = await fetch('/api/get-freelancer-clients', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ freelancerId: id })
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.error);
        setAllClients(data);
        setFilteredClients(data);
      } catch (error) {
        console.error('Error fetching clients:', error);
        setAlert({
          show: true,
          message: 'Failed to fetch clients',
          type: 'error'
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    if (freelancerId) {
      fetchClients(freelancerId);
    }
  }, [freelancerId]);

  const filterClients = () => {
    let filtered = [...allClients];

    if (searchTerm) {
      filtered = filtered.filter(client => 
        client.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (activeFilter !== 'all') {
      filtered = filtered.filter(client => 
        client.status.toLowerCase() === activeFilter.toLowerCase()
      );
    }

    setFilteredClients(filtered);
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'completed': return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'active': return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'pending': return 'bg-amber-50 text-amber-700 border-amber-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const copyPreviewLink = (clientId) => {
    const previewLink = `${window.location.origin}/${clientId}/preview`;
    navigator.clipboard.writeText(previewLink);
    setAlert({
      show: true,
      message: 'Preview link copied to clipboard!',
      type: 'success'
    });
    setTimeout(() => setAlert({ ...alert, show: false }), 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-8 space-y-4 md:space-y-6 mt-[57px] md:mt-0 relative z-[1]">
      {alert.show && (
        <Alert
          message={alert.message}
          type={alert.type}
          onClose={() => setAlert({ ...alert, show: false })}
        />
      )}

      <div className="bg-white rounded-xl md:rounded-2xl shadow-xl border border-gray-200/50 backdrop-blur-sm relative z-[2]">
        <div className="px-4 md:px-8 py-4 md:py-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-black rounded-xl flex items-center justify-center shadow-lg">
                <svg className="w-5 h-5 md:w-6 md:h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <div>
                <h1 className="text-xl md:text-2xl font-semibold text-gray-900">Your Clients</h1>
                <p className="text-sm text-gray-500">View and manage all your clients</p>
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row items-stretch md:items-center gap-4">
              <div className="relative flex-1 md:flex-none">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input 
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search clients..."
                  className="w-full md:w-64 pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all shadow-sm"
                />
              </div>
              <button 
                onClick={() => setShowFilters(!showFilters)}
                className="md:hidden p-2.5 bg-white hover:bg-gray-50 rounded-xl transition-colors border border-gray-200 shadow-sm flex items-center justify-center gap-2"
              >
                <Filter className="w-5 h-5 text-gray-600" />
                <span className="text-sm text-gray-600">Filters</span>
                <ChevronDown className={`w-4 h-4 text-gray-600 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
              </button>
              <button className="hidden md:block p-2.5 bg-white hover:bg-gray-50 rounded-xl transition-colors border border-gray-200 shadow-sm">
                <Filter className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>

          <div className={`flex flex-wrap gap-2 mt-4 ${!showFilters && 'hidden md:flex'}`}>
            {filters.map(filter => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`flex-1 md:flex-none px-4 py-2 rounded-xl text-sm font-medium transition-all shadow-sm ${
                  activeFilter === filter.id 
                    ? 'bg-gray-900 text-white shadow-lg hover:bg-gray-800' 
                    : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl md:rounded-2xl shadow-xl border border-gray-200/50 backdrop-blur-sm relative z-[1]">
        <div className="hidden md:block px-6 py-4 border-b border-gray-200">
          <div className="grid grid-cols-8 gap-4">
            <div className="text-sm font-medium text-gray-500 col-span-2">Client Name</div>
            <div className="text-sm font-medium text-gray-500">Deliveries Count</div>
            <div className="text-sm font-medium text-gray-500">Total Cost</div>
            <div className="text-sm font-medium text-gray-500">Mode of Pay</div>
            <div className="text-sm font-medium text-gray-500">Status</div>
            <div className="text-sm font-medium text-gray-500 text-center">Preview Link</div>
            <div className="text-sm font-medium text-gray-500 text-center">View Client</div>
          </div>
        </div>

        <div className="divide-y divide-gray-200">
          {isLoading ? (
            <div className="px-4 md:px-6 py-8 text-center text-gray-500">Loading clients...</div>
          ) : filteredClients.length === 0 ? (
            <div className="px-4 md:px-6 py-8 text-center text-gray-500">No clients found</div>
          ) : (
            filteredClients.map((client) => (
              <div 
                key={client.id}
                className="px-4 md:px-6 py-4 hover:bg-gray-50/50 transition-all group"
              >
                {/* Mobile view */}
                <div className="md:hidden space-y-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium text-gray-900">{client.name}</h3>
                      <p className="text-sm text-gray-600 mt-1">
                        {client.deliveriesCount || 0} deliveries • ₹{new Intl.NumberFormat('en-IN').format(client.totalDeliveryCost || 0)}
                      </p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(client.status)}`}>
                      {client.status}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="font-medium text-gray-900">{client.modeOfPay}</div>
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => copyPreviewLink(client.id)}
                        className="p-2 bg-white hover:bg-gray-50 rounded-lg transition-all border border-gray-200 shadow-sm"
                      >
                        <Copy className="w-4 h-4 text-gray-600" />
                      </button>
                      <button 
                        onClick={() => window.location.href = `/freelancer/clients/${client.id}`}
                        className="p-2 bg-white hover:bg-gray-50 rounded-lg transition-all border border-gray-200 shadow-sm"
                      >
                        <Eye className="w-4 h-4 text-gray-600" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Desktop view */}
                <div className="hidden md:grid grid-cols-8 gap-4 items-center">
                  <div className="col-span-2">
                    <h3 className="font-medium text-gray-900">{client.name}</h3>
                  </div>
                  <div className="text-gray-600 font-medium">
                    {client.deliveriesCount || 0}
                  </div>
                  <div className="text-gray-600 font-medium">
                    ₹{new Intl.NumberFormat('en-IN').format(client.totalDeliveryCost || 0)}
                  </div>
                  <div className="font-medium text-gray-900">
                    {client.modeOfPay}
                  </div>
                  <div>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(client.status)}`}>
                      {client.status}
                    </span>
                  </div>
                  <div className="flex items-center justify-center">
                    <button 
                      onClick={() => copyPreviewLink(client.id)}
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
                  <div className="flex items-center justify-center">
                    <button 
                      onClick={() => window.location.href = `/freelancer/clients/${client.id}`}
                      className="p-2 bg-white hover:bg-gray-50 rounded-lg transition-all relative border border-gray-200 shadow-sm group/view"
                    >
                      <Eye className="w-4 h-4 text-gray-600 transform transition-transform group-hover/view:scale-110" />
                      <div className="absolute bottom-full right-0 mb-2 opacity-0 group-hover/view:opacity-100 transition-all duration-200 translate-y-1 group-hover/view:translate-y-0">
                        <div className="px-2 py-1 text-xs font-medium text-white bg-gray-900 rounded-lg shadow-lg whitespace-nowrap">
                          View Client
                        </div>
                      </div>
                    </button>
                    </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ClientsPage;