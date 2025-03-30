// File: /app/admin/withdrawals/page.tsx
"use client"

import React, { useState, useEffect } from 'react';
import { 
  CheckCircle, XCircle, ChevronDown, ChevronUp, 
  Search, Filter, Download, RefreshCw, ArrowLeft
} from 'lucide-react';
import Link from 'next/link';

interface Delivery {
  id: string;
  name: string;
  cost: number;
  createdAt: string;
  client: {
    id: string;
    name: string;
  };
}

interface Freelancer {
  id: string;
  name: string;
  email: string;
  profileImage: string | null;
}

interface Withdrawal {
  id: string;
  amount: number;
  status: string;
  note: string | null;
  freelancerId: string;
  freelancer: Freelancer;
  deliveryIds: string[];
  deliveries: Delivery[];
  createdAt: string;
  updatedAt: string;
}

const AdminWithdrawalPanel = () => {
  const [withdrawals, setWithdrawals] = useState<Withdrawal[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [processingId, setProcessingId] = useState<string | null>(null);
  
  useEffect(() => {
    fetchWithdrawals();
  }, [statusFilter]);
  
  const fetchWithdrawals = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/withdrawals?status=${statusFilter}`);
      if (!res.ok) throw new Error('Failed to fetch withdrawals');
      const data = await res.json();
      setWithdrawals(data.withdrawals);
    } catch (error) {
      console.error('Error fetching withdrawals:', error);
    } finally {
      setLoading(false);
    }
  };
  
  const toggleDetails = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };
  
  const handleStatusChange = async (withdrawalId: string, newStatus: string, note: string = '') => {
    setProcessingId(withdrawalId);
    try {
      const res = await fetch('/api/admin/update-withdrawal-status', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ withdrawalId, status: newStatus, note })
      });
      
      if (!res.ok) throw new Error('Failed to update status');
      
      // Refresh withdrawal list
      fetchWithdrawals();
    } catch (error) {
      console.error('Error updating withdrawal status:', error);
    } finally {
      setProcessingId(null);
    }
  };
  
  const filteredWithdrawals = withdrawals.filter(withdrawal => {
    const matchesSearch = 
      (withdrawal.freelancer.name?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
      (withdrawal.freelancer.email?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
      withdrawal.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesSearch;
  });
  
  const handleDownloadReport = () => {
    // Logic to generate and download CSV/Excel report
    alert('Download functionality will be implemented based on your export requirements');
  };
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }
  
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/admin/dashboard" className="text-gray-500 hover:text-gray-700 mr-4">
                <ArrowLeft className="w-5 h-5" />
              </Link>
              <h1 className="text-lg font-semibold">Withdrawal Requests</h1>
            </div>
          </div>
        </div>
      </header>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters and Search */}
        <div className="flex flex-col md:flex-row justify-between mb-6 gap-4">
          <div className="relative max-w-xs">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search by name or email"
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex gap-3">
            <div className="relative">
              <select
                className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
                <option value="rejected">Rejected</option>
              </select>
              <Filter className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
            </div>
            
            <button 
              onClick={fetchWithdrawals}
              className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-2 rounded-lg"
            >
              <RefreshCw size={18} />
            </button>
            
            <button 
              onClick={handleDownloadReport}
              className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-2 rounded-lg"
            >
              <Download size={18} />
            </button>
          </div>
        </div>
        
        {/* Withdrawals Table */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Freelancer
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date Requested
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredWithdrawals.length > 0 ? (
                  filteredWithdrawals.map((withdrawal) => (
                    <React.Fragment key={withdrawal.id}>
                      <tr className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10">
                              <img 
                                className="h-10 w-10 rounded-full" 
                                src={withdrawal.freelancer.profileImage || '/default-avatar.png'} 
                                alt={withdrawal.freelancer.name} 
                              />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">
                                {withdrawal.freelancer.name}
                              </div>
                              <div className="text-sm text-gray-500">
                                {withdrawal.freelancer.email}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">₹{withdrawal.amount}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {new Date(withdrawal.createdAt).toLocaleDateString()}
                          </div>
                          <div className="text-xs text-gray-500">
                            {new Date(withdrawal.createdAt).toLocaleTimeString()}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            withdrawal.status === 'completed' 
                              ? 'bg-green-100 text-green-800' 
                              : withdrawal.status === 'rejected'
                                ? 'bg-red-100 text-red-800'
                                : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {withdrawal.status.charAt(0).toUpperCase() + withdrawal.status.slice(1)}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-2">
                            {withdrawal.status === 'pending' && (
                              <>
                                <button 
                                  onClick={() => handleStatusChange(withdrawal.id, 'completed')}
                                  className="text-green-600 hover:text-green-900"
                                  disabled={processingId === withdrawal.id}
                                >
                                  <CheckCircle size={18} />
                                </button>
                                <button 
                                  onClick={() => handleStatusChange(withdrawal.id, 'rejected')}
                                  className="text-red-600 hover:text-red-900"
                                  disabled={processingId === withdrawal.id}
                                >
                                  <XCircle size={18} />
                                </button>
                              </>
                            )}
                            <button 
                              onClick={() => toggleDetails(withdrawal.id)}
                              className="text-gray-500 hover:text-gray-700"
                            >
                              {expandedId === withdrawal.id ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                            </button>
                          </div>
                        </td>
                      </tr>
                      
                      {/* Expanded Details Row */}
                      {expandedId === withdrawal.id && (
                        <tr>
                          <td colSpan={5} className="px-6 py-4 bg-gray-50">
                            <div className="space-y-4">
                              <div>
                                <h4 className="font-medium text-gray-700 mb-2">Selected Deliveries</h4>
                                <div className="bg-white rounded-lg border border-gray-200">
                                  <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                      <tr>
                                        <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                                          Delivery Name
                                        </th>
                                        <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                                          Client
                                        </th>
                                        <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                                          Date
                                        </th>
                                        <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                                          Amount
                                        </th>
                                      </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200">
                                      {withdrawal.deliveries.map((delivery) => (
                                        <tr key={delivery.id} className="hover:bg-gray-50">
                                          <td className="px-4 py-2 text-sm">{delivery.name}</td>
                                          <td className="px-4 py-2 text-sm">{delivery.client?.name || "N/A"}</td>
                                          <td className="px-4 py-2 text-sm">{new Date(delivery.createdAt).toLocaleDateString()}</td>
                                          <td className="px-4 py-2 text-sm">₹{delivery.cost}</td>
                                        </tr>
                                      ))}
                                    </tbody>
                                  </table>
                                </div>
                              </div>
                              
                              {withdrawal.status !== 'pending' && (
                                <div>
                                  <h4 className="font-medium text-gray-700 mb-2">Processing Details</h4>
                                  <div className="bg-white p-3 rounded-lg border border-gray-200">
                                    <div className="grid grid-cols-2 gap-4">
                                      <div>
                                        <p className="text-xs text-gray-500">Processed On</p>
                                        <p className="text-sm">
                                          {new Date(withdrawal.updatedAt).toLocaleDateString()}
                                        </p>
                                      </div>
                                      {withdrawal.note && (
                                        <div className="col-span-2">
                                          <p className="text-xs text-gray-500">Admin Note</p>
                                          <p className="text-sm">{withdrawal.note}</p>
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              )}
                              
                              {withdrawal.status === 'pending' && (
                                <div>
                                  <h4 className="font-medium text-gray-700 mb-2">Add Note</h4>
                                  <div className="flex">
                                    <input
                                      type="text"
                                      className="flex-1 border border-gray-300 rounded-l-lg px-3 py-2 text-sm"
                                      placeholder="Optional note for this withdrawal"
                                      id={`note-${withdrawal.id}`}
                                    />
                                    <button
                                      onClick={() => {
                                        const noteInput = document.getElementById(`note-${withdrawal.id}`) as HTMLInputElement;
                                        const note = noteInput?.value || '';
                                        handleStatusChange(withdrawal.id, 'completed', note);
                                      }}
                                      className="bg-green-500 text-white px-3 py-2 rounded-r-lg text-sm"
                                      disabled={processingId === withdrawal.id}
                                    >
                                      Approve
                                    </button>
                                  </div>
                                </div>
                              )}
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="px-6 py-4 text-center text-gray-500">
                      No withdrawal requests found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminWithdrawalPanel;