
"use client"

import React, { useState, useEffect } from 'react';
import { 
  Search, Filter, ArrowUpDown, Check, X, ExternalLink, 
  Calendar, Users, Package, MessageCircle, RefreshCw,
  Clock, Mail, ChevronDown, ChevronUp, CheckCircle, 
  XCircle, AlertCircle, Pencil, Send, Trash, Menu
} from 'lucide-react';
import Link from 'next/link';
import { useAuth } from '@/context/authContext';

// Status Badge Component
const StatusBadge = ({ status }) => {
  const getStatusColor = () => {
    switch (status.toLowerCase()) {
      case 'completed':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'accepted':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'rejected':
        return 'bg-red-100 text-red-700 border-red-200';
      default: // pending
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
    }
  };

  const getStatusIcon = () => {
    switch (status.toLowerCase()) {
      case 'completed':
        return <CheckCircle className="w-4 h-4" />;
      case 'accepted':
        return <Clock className="w-4 h-4" />;
      case 'rejected':
        return <XCircle className="w-4 h-4" />;
      default: // pending
        return <AlertCircle className="w-4 h-4" />;
    }
  };

  return (
    <span className={`px-2.5 py-1 rounded-full text-xs font-medium 
                    flex items-center gap-1.5 border ${getStatusColor()}`}>
      {getStatusIcon()}
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};

// Revision Card Component for Mobile View
const RevisionCard = ({ revision, onManage }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 mb-3">
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="font-medium text-gray-900">{revision.clientName}</h3>
          <p className="text-xs text-gray-500">{revision.deliveryName}</p>
        </div>
        <StatusBadge status={revision.status} />
      </div>
      
      <p className="text-sm text-gray-600 mb-3 line-clamp-2">{revision.message}</p>
      
      <div className="flex justify-between items-center">
        <div className="text-xs text-gray-500">
          {new Date(revision.createdAt).toLocaleDateString()}
        </div>
        <button
          onClick={() => onManage(revision)}
          className="px-3 py-1.5 bg-blue-100 text-blue-700 rounded-lg
                  text-xs font-medium hover:bg-blue-200 transition-colors"
        >
          Manage
        </button>
      </div>
    </div>
  );
};

// Revision Modal Component
const RevisionModal = ({ revision, onClose, onUpdateStatus, onAddResponse, freelancerId }) => {
  const [newStatus, setNewStatus] = useState(revision.status);
  const [response, setResponse] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!revision) return null;

  const handleStatusChange = (e) => {
    setNewStatus(e.target.value);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      if (newStatus !== revision.status) {
        await onUpdateStatus(revision.id, newStatus, freelancerId);
      }
      
      if (response.trim()) {
        await onAddResponse(revision.id, response, freelancerId);
        setResponse('');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-3 md:p-4">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        <div className="p-3 md:p-4 border-b flex items-center justify-between bg-gray-50">
          <h3 className="text-base md:text-lg font-semibold text-gray-800">Revision Details</h3>
          <button 
            onClick={onClose}
            className="p-1 rounded-full hover:bg-gray-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="p-4 md:p-5 overflow-y-auto flex-1">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
            <div>
              <span className="text-xs text-gray-500 block mb-1">Client</span>
              <span className="font-medium">{revision.clientName}</span>
            </div>
            <div>
              <span className="text-xs text-gray-500 block mb-1">Delivery</span>
              <span className="font-medium">{revision.deliveryName}</span>
            </div>
            <div>
              <span className="text-xs text-gray-500 block mb-1">Requested</span>
              <span className="font-medium">{new Date(revision.createdAt).toLocaleDateString()}</span>
            </div>
            <div>
              <span className="text-xs text-gray-500 block mb-1">Status</span>
              <StatusBadge status={revision.status} />
            </div>
          </div>
          
          <div className="mb-5">
            <h4 className="text-sm font-semibold mb-2 text-gray-700">Revision Request</h4>
            <div className="p-3 bg-gray-50 rounded-lg border border-gray-200 text-gray-800">
              {revision.message}
            </div>
          </div>
          
          {revision.responses && revision.responses.length > 0 && (
            <div className="mb-5">
              <h4 className="text-sm font-semibold mb-2 text-gray-700">Your Responses</h4>
              <div className="space-y-3">
                {revision.responses.map((res, idx) => (
                  <div key={idx} className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="flex justify-between items-start mb-1">
                      <span className="text-xs text-gray-500">
                        {new Date(res.createdAt).toLocaleString()}
                      </span>
                    </div>
                    <p className="text-gray-700">{res.message}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Update Status
              </label>
              <select 
                value={newStatus} 
                onChange={handleStatusChange}
                className="w-full p-2.5 border border-gray-300 rounded-lg bg-white
                         focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="pending">Pending</option>
                <option value="accepted">Accepted</option>
                <option value="completed">Completed</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Add Response
              </label>
              <textarea
                value={response}
                onChange={(e) => setResponse(e.target.value)}
                placeholder="Reply to client's revision request..."
                className="w-full p-3 border border-gray-300 rounded-lg h-24 md:h-32
                         focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
        </div>
        
        <div className="p-3 md:p-4 border-t flex flex-col sm:flex-row justify-end gap-3 bg-gray-50">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 hover:bg-gray-200 rounded-lg w-full sm:w-auto text-center"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700
                     flex items-center justify-center gap-2 disabled:bg-blue-400 w-full sm:w-auto"
          >
            {isSubmitting ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                Save Changes
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

// Main Revisions Dashboard Component
const FreelancerRevisionsDashboard = () => {
  // Use auth context to get freelancer ID
  const { freelancerId, email, isAuthenticated } = useAuth();
  
  // States
  const [revisions, setRevisions] = useState([]);
  const [filteredRevisions, setFilteredRevisions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [timeframeFilter, setTimeframeFilter] = useState('all');
  const [sortFilter, setSortFilter] = useState('newest');
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    completed: 0,
    accepted: 0,
    rejected: 0
  });
  const [activeRevision, setActiveRevision] = useState(null);
  const [showStatusFilter, setShowStatusFilter] = useState(false);
  const [showTimeframeFilter, setShowTimeframeFilter] = useState(false);
  const [showSortFilter, setShowSortFilter] = useState(false);

  // Fetch all revisions for the freelancer
  useEffect(() => {
    const fetchRevisions = async () => {
      if (!freelancerId || !isAuthenticated) return;
      
      try {
        setIsLoading(true);
        const response = await fetch('/api/freelancer/revisions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ freelancerId }),
        });
        
        if (!response.ok) {
          throw new Error('Failed to fetch revisions');
        }
        
        const data = await response.json();
        setRevisions(data.revisions);
        setFilteredRevisions(data.revisions);
        
        // Calculate stats
        const stats = {
          total: data.revisions.length,
          pending: data.revisions.filter(r => r.status.toLowerCase() === 'pending').length,
          completed: data.revisions.filter(r => r.status.toLowerCase() === 'completed').length,
          accepted: data.revisions.filter(r => r.status.toLowerCase() === 'accepted').length,
          rejected: data.revisions.filter(r => r.status.toLowerCase() === 'rejected').length
        };
        
        setStats(stats);
      } catch (err) {
        console.error('Error fetching revisions:', err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRevisions();
  }, [freelancerId, isAuthenticated]);

  // Apply filters and search
  useEffect(() => {
    let result = [...revisions];
    
    // Filter by status
    if (statusFilter !== 'all') {
      result = result.filter(
        revision => revision.status.toLowerCase() === statusFilter.toLowerCase()
      );
    }
    
    // Filter by timeframe
    if (timeframeFilter !== 'all') {
      const now = new Date();
      const pastDate = new Date();
      
      switch (timeframeFilter) {
        case 'today':
          pastDate.setDate(now.getDate() - 1);
          break;
        case 'week':
          pastDate.setDate(now.getDate() - 7);
          break;
        case 'month':
          pastDate.setMonth(now.getMonth() - 1);
          break;
        default:
          break;
      }
      
      result = result.filter(
        revision => new Date(revision.createdAt) >= pastDate
      );
    }
    
    // Apply search
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        revision => 
          revision.clientName.toLowerCase().includes(term) ||
          revision.deliveryName.toLowerCase().includes(term) ||
          revision.message.toLowerCase().includes(term)
      );
    }
    
    // Apply sort
    if (sortFilter === 'newest') {
      result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else if (sortFilter === 'oldest') {
      result.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    }
    
    setFilteredRevisions(result);
  }, [revisions, statusFilter, timeframeFilter, sortFilter, searchTerm]);

  // Handle updating revision status
  const handleUpdateStatus = async (revisionId, newStatus) => {
    try {
      const response = await fetch('/api/freelancer/update-revision-status', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          revisionId,
          status: newStatus,
          freelancerId
        }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to update revision status');
      }
      
      // Update local state
      setRevisions(prevRevisions => 
        prevRevisions.map(rev => 
          rev.id === revisionId ? { ...rev, status: newStatus } : rev
        )
      );
      
      if (activeRevision && activeRevision.id === revisionId) {
        setActiveRevision(prev => ({ ...prev, status: newStatus }));
      }
      
      return true;
    } catch (error) {
      console.error('Error updating revision status:', error);
      return false;
    }
  };

  // Handle adding a response to a revision
  const handleAddResponse = async (revisionId, message) => {
    try {
      const response = await fetch('/api/freelancer/add-revision-response', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          revisionId,
          message,
          freelancerId
        }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to add revision response');
      }
      
      const { revisionResponse } = await response.json();
      
      // Update local state
      setRevisions(prevRevisions => 
        prevRevisions.map(rev => {
          if (rev.id === revisionId) {
            const updatedResponses = [...(rev.responses || []), revisionResponse];
            return { ...rev, responses: updatedResponses };
          }
          return rev;
        })
      );
      
      if (activeRevision && activeRevision.id === revisionId) {
        const updatedResponses = [...(activeRevision.responses || []), revisionResponse];
        setActiveRevision(prev => ({ ...prev, responses: updatedResponses }));
      }
      
      return true;
    } catch (error) {
      console.error('Error adding revision response:', error);
      return false;
    }
  };

  // Reset all filters
  const resetFilters = () => {
    setStatusFilter('all');
    setTimeframeFilter('all');
    setSortFilter('newest');
    setSearchTerm('');
    setShowStatusFilter(false);
    setShowTimeframeFilter(false);
    setShowSortFilter(false);
  };

  if (!isAuthenticated) {
    return (
      <div className="p-4 md:p-8 max-w-7xl mx-auto">
        <div className="bg-yellow-50 p-6 rounded-xl text-center">
          <AlertCircle className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-yellow-700 mb-2">Authentication Required</h2>
          <p className="text-yellow-600">Please log in to view your revision requests.</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 md:p-8 max-w-7xl mx-auto">
        <div className="bg-red-50 p-6 rounded-xl text-center">
          <X className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-red-700 mb-2">Error Loading Revisions</h2>
          <p className="text-red-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto">
      <div className="mb-6 md:mb-8">
        <h1 className="text-xl md:text-3xl font-bold text-gray-900 mb-2">
          Revision Requests
        </h1>
        <p className="text-gray-600">
          Manage and respond to client revision requests
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3 md:gap-4 mb-6 md:mb-8">
        <div className="bg-white rounded-xl p-3 md:p-4 shadow-sm border border-gray-100">
          <span className="text-xs text-gray-500 block mb-1">Total</span>
          <div className="flex items-center gap-2">
            <MessageCircle className="w-4 h-4 text-gray-400" />
            <span className="text-xl md:text-2xl font-bold">{stats.total}</span>
          </div>
        </div>
        <div className="bg-white rounded-xl p-3 md:p-4 shadow-sm border border-gray-100">
          <span className="text-xs text-gray-500 block mb-1">Pending</span>
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-yellow-400" />
            <span className="text-xl md:text-2xl font-bold">{stats.pending}</span>
          </div>
        </div>
        <div className="bg-white rounded-xl p-3 md:p-4 shadow-sm border border-gray-100">
          <span className="text-xs text-gray-500 block mb-1">Accepted</span>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-blue-400" />
            <span className="text-xl md:text-2xl font-bold">{stats.accepted}</span>
          </div>
        </div>
        <div className="bg-white rounded-xl p-3 md:p-4 shadow-sm border border-gray-100">
          <span className="text-xs text-gray-500 block mb-1">Completed</span>
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-green-400" />
            <span className="text-xl md:text-2xl font-bold">{stats.completed}</span>
          </div>
        </div>
        <div className="bg-white rounded-xl p-3 md:p-4 shadow-sm border border-gray-100">
          <span className="text-xs text-gray-500 block mb-1">Rejected</span>
          <div className="flex items-center gap-2">
            <XCircle className="w-4 h-4 text-red-400" />
            <span className="text-xl md:text-2xl font-bold">{stats.rejected}</span>
          </div>
        </div>
      </div>

      {/* Search and Filter Bar */}
      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 mb-6">
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search revisions..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg
                       focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="flex gap-3">
            <button
              onClick={resetFilters}
              className="px-4 py-2 text-gray-700 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2 flex-shrink-0"
            >
              <RefreshCw className="w-4 h-4" />
              <span className="hidden sm:inline">Reset Filters</span>
            </button>
          </div>
        </div>
        
        {/* Filter Options - Mobile Version */}
        <div className="flex flex-wrap gap-3 md:hidden">
          {/* Status Filter Dropdown */}
          <div className="relative">
            <button 
              onClick={() => {
                setShowStatusFilter(!showStatusFilter);
                setShowTimeframeFilter(false);
                setShowSortFilter(false);
              }}
              className="flex items-center justify-between w-full px-3 py-2 text-sm bg-gray-100 rounded-lg"
            >
              <span>{statusFilter === 'all' ? 'All Status' : statusFilter.charAt(0).toUpperCase() + statusFilter.slice(1)}</span>
              {showStatusFilter ? <ChevronUp className="w-4 h-4 ml-2" /> : <ChevronDown className="w-4 h-4 ml-2" />}
            </button>
            
            {showStatusFilter && (
              <div className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg">
                <button
                  onClick={() => { setStatusFilter('all'); setShowStatusFilter(false); }}
                  className="block w-full px-4 py-2 text-left text-sm hover:bg-gray-50 border-b border-gray-100"
                >
                  All Status
                </button>
                <button
                  onClick={() => { setStatusFilter('pending'); setShowStatusFilter(false); }}
                  className="block w-full px-4 py-2 text-left text-sm hover:bg-gray-50 border-b border-gray-100"
                >
                  Pending
                </button>
                <button
                  onClick={() => { setStatusFilter('accepted'); setShowStatusFilter(false); }}
                  className="block w-full px-4 py-2 text-left text-sm hover:bg-gray-50 border-b border-gray-100"
                >
                  Accepted
                </button>
                <button
                  onClick={() => { setStatusFilter('completed'); setShowStatusFilter(false); }}
                  className="block w-full px-4 py-2 text-left text-sm hover:bg-gray-50 border-b border-gray-100"
                >
                  Completed
                </button>
                <button
                  onClick={() => { setStatusFilter('rejected'); setShowStatusFilter(false); }}
                  className="block w-full px-4 py-2 text-left text-sm hover:bg-gray-50"
                >
                  Rejected
                </button>
              </div>
            )}
          </div>
          
          {/* Timeframe Filter Dropdown */}
          <div className="relative">
            <button 
              onClick={() => {
                setShowTimeframeFilter(!showTimeframeFilter);
                setShowStatusFilter(false);
                setShowSortFilter(false);
              }}
              className="flex items-center justify-between w-full px-3 py-2 text-sm bg-gray-100 rounded-lg"
            >
              <span>
                {timeframeFilter === 'all' ? 'All Time' : 
                 timeframeFilter === 'today' ? 'Last 24 Hours' :
                 timeframeFilter === 'week' ? 'Last 7 Days' : 'Last 30 Days'}
              </span>
              {showTimeframeFilter ? <ChevronUp className="w-4 h-4 ml-2" /> : <ChevronDown className="w-4 h-4 ml-2" />}
            </button>
            
            {showTimeframeFilter && (
              <div className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg">
                <button
                  onClick={() => { setTimeframeFilter('all'); setShowTimeframeFilter(false); }}
                  className="block w-full px-4 py-2 text-left text-sm hover:bg-gray-50 border-b border-gray-100"
                >
                  All Time
                </button>
                <button
                  onClick={() => { setTimeframeFilter('today'); setShowTimeframeFilter(false); }}
                  className="block w-full px-4 py-2 text-left text-sm hover:bg-gray-50 border-b border-gray-100"
                >
                  Last 24 Hours
                </button>
                <button
                  onClick={() => { setTimeframeFilter('week'); setShowTimeframeFilter(false); }}
                  className="block w-full px-4 py-2 text-left text-sm hover:bg-gray-50 border-b border-gray-100"
                >
                  Last 7 Days
                </button>
                <button
                  onClick={() => { setTimeframeFilter('month'); setShowTimeframeFilter(false); }}
                  className="block w-full px-4 py-2 text-left text-sm hover:bg-gray-50"
                >
                  Last 30 Days
                </button>
              </div>
            )}
          </div>
          
          {/* Sort Filter Dropdown */}
          <div className="relative">
            <button 
              onClick={() => {
                setShowSortFilter(!showSortFilter);
                setShowStatusFilter(false);
                setShowTimeframeFilter(false);
              }}
              className="flex items-center justify-between w-full px-3 py-2 text-sm bg-gray-100 rounded-lg"
            >
              <span>{sortFilter === 'newest' ? 'Newest First' : 'Oldest First'}</span>
              {showSortFilter ? <ChevronUp className="w-4 h-4 ml-2" /> : <ChevronDown className="w-4 h-4 ml-2" />}
            </button>
            
            {showSortFilter && (
              <div className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg">
                <button
                  onClick={() => { setSortFilter('newest'); setShowSortFilter(false); }}
                  className="block w-full px-4 py-2 text-left text-sm hover:bg-gray-50 border-b border-gray-100"
                >
                  Newest First
                </button>
                <button
                  onClick={() => { setSortFilter('oldest'); setShowSortFilter(false); }}
                  className="block w-full px-4 py-2 text-left text-sm hover:bg-gray-50"
                >
                  Oldest First
                </button>
              </div>
            )}
          </div>
        </div>
        
        {/* Filter Options - Desktop Version */}
        <div className="hidden md:flex flex-wrap gap-3">
          {/* Status Filter */}
          <div className="flex items-center space-x-1 bg-gray-100 p-1 rounded-lg">
            <button
              onClick={() => setStatusFilter('all')}
              className={`px-3 py-1 text-sm rounded-md ${statusFilter === 'all' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-700'}`}
            >
              All Status
            </button>
            <button
              onClick={() => setStatusFilter('pending')}
              className={`px-3 py-1 text-sm rounded-md ${statusFilter === 'pending' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-700'}`}
            >
              Pending
            </button>
            <button
              onClick={() => setStatusFilter('accepted')}
              className={`px-3 py-1 text-sm rounded-md ${statusFilter === 'accepted' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-700'}`}
            >
              Accepted
            </button>
            <button
              onClick={() => setStatusFilter('completed')}
              className={`px-3 py-1 text-sm rounded-md ${statusFilter === 'completed' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-700'}`}
            >
              Completed
            </button>
            <button
              onClick={() => setStatusFilter('rejected')}
              className={`px-3 py-1 text-sm rounded-md ${statusFilter === 'rejected' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-700'}`}
            >
              Rejected
            </button>
          </div>
          
          {/* Timeframe Filter */}
          <div className="flex items-center space-x-1 bg-gray-100 p-1 rounded-lg">
            <button
              onClick={() => setTimeframeFilter('all')}
              className={`px-3 py-1 text-sm rounded-md ${timeframeFilter === 'all' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-700'}`}
            >
              All Time
            </button>
            <button
              onClick={() => setTimeframeFilter('today')}
              className={`px-3 py-1 text-sm rounded-md ${timeframeFilter === 'today' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-700'}`}
            >
              Last 24 Hours
            </button>
            <button
              onClick={() => setTimeframeFilter('week')}
              className={`px-3 py-1 text-sm rounded-md ${timeframeFilter === 'week' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-700'}`}
            >
              Last 7 Days
            </button>
            <button
              onClick={() => setTimeframeFilter('month')}
              className={`px-3 py-1 text-sm rounded-md ${timeframeFilter === 'month' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-700'}`}
            >
              Last 30 Days
            </button>
          </div>
          
          {/* Sort Filter */}
          <div className="flex items-center space-x-1 bg-gray-100 p-1 rounded-lg">
            <button
              onClick={() => setSortFilter('newest')}
              className={`px-3 py-1 text-sm rounded-md ${sortFilter === 'newest' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-700'}`}
            >
              Newest First
            </button>
            <button
              onClick={() => setSortFilter('oldest')}
              className={`px-3 py-1 text-sm rounded-md ${sortFilter === 'oldest' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-700'}`}
            >
              Oldest First
            </button>
          </div>
        </div>
      </div>

      {/* Revisions List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {isLoading ? (
          <div className="flex items-center justify-center p-12">
            <div className="w-12 h-12 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin" />
          </div>
        ) : filteredRevisions.length === 0 ? (
          <div className="text-center p-8 md:p-12">
            <MessageCircle className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Revisions Found</h3>
            <p className="text-gray-600 max-w-md mx-auto">
              {searchTerm || statusFilter !== 'all' || timeframeFilter !== 'all' 
                ? "Try adjusting your filters or search term to see more results."
                : "You haven't received any revision requests yet."}
            </p>
            {(searchTerm || statusFilter !== 'all' || timeframeFilter !== 'all') && (
              <button
                onClick={resetFilters}
                className="mt-4 px-4 py-2 text-blue-600 hover:text-blue-800"
              >
                Clear Filters
              </button>
            )}
          </div>
        ) : (
          <>
            {/* Mobile View - Card Layout */}
            <div className="md:hidden p-4">
              {filteredRevisions.map((revision) => (
                <RevisionCard 
                  key={revision.id} 
                  revision={revision} 
                  onManage={setActiveRevision}
                />
              ))}
              
              <div className="text-center text-sm text-gray-500 mt-4">
                Showing {filteredRevisions.length} of {revisions.length} revisions
              </div>
            </div>
            
            {/* Desktop View - Table Layout */}
            <div className="hidden md:block">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-200">
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Client / Delivery
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Request
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {filteredRevisions.map((revision) => (
                      <tr 
                        key={revision.id}
                        className="hover:bg-gray-50 transition-colors"
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex flex-col">
                            <div className="text-sm font-medium text-gray-900 mb-1">
                              {revision.clientName}
                            </div>
                            <div className="text-xs text-gray-500">
                              {revision.deliveryName}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-600 line-clamp-2">
                            {revision.message}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">
                            {new Date(revision.createdAt).toLocaleDateString()}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <StatusBadge status={revision.status} />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right">
                          <button
                            onClick={() => setActiveRevision(revision)}
                            className="px-3 py-1.5 bg-blue-100 text-blue-700 rounded-lg
                                     text-xs font-medium hover:bg-blue-200 transition-colors"
                          >
                            Manage
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 text-sm text-gray-500">
                Showing {filteredRevisions.length} of {revisions.length} revisions
              </div>
            </div>
          </>
        )}
      </div>

      {/* Revision Detail Modal */}
      {activeRevision && (
        <RevisionModal
          revision={activeRevision}
          onClose={() => setActiveRevision(null)}
          onUpdateStatus={handleUpdateStatus}
          onAddResponse={handleAddResponse}
          freelancerId={freelancerId}
        />
      )}
    </div>
  );
};

export default FreelancerRevisionsDashboard;