'use client';

import React, { useState, useEffect } from 'react';
import { AlertCircle, BookPlus, MessageSquare, HelpCircle, Clock, CheckCircle, Loader2, X, Filter, Search, Send, ChevronDown } from 'lucide-react';

const AdminFeedbackPage = () => {
  const [feedback, setFeedback] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedFeedback, setSelectedFeedback] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [responseText, setResponseText] = useState('');
  const [sendingResponse, setSendingResponse] = useState(false);
  
  // Filters
  const [typeFilter, setTypeFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  useEffect(() => {
    fetchFeedback();
  }, []);

  const fetchFeedback = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/admin/feedback');
      if (response.ok) {
        const data = await response.json();
        setFeedback(data.feedback || []);
      }
    } catch (error) {
      console.error('Error fetching feedback:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (newStatus) => {
    if (!selectedFeedback) return;
    
    try {
      const response = await fetch(`/api/admin/feedback/${selectedFeedback.id}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          newStatus,
          adminId: 'admin123', // Replace with actual admin ID
        }),
      });
      
      if (response.ok) {
        // Update the feedback in the local state
        setFeedback(feedback.map(item => 
          item.id === selectedFeedback.id 
            ? { ...item, status: newStatus } 
            : item
        ));
        
        // Update the selected feedback
        setSelectedFeedback({ ...selectedFeedback, status: newStatus });
        
        // Fetch the updated feedback to get the new status changes
        fetchFeedback();
      }
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const handleSendResponse = async () => {
    if (!selectedFeedback || !responseText.trim()) return;
    
    try {
      setSendingResponse(true);
      
      const response = await fetch(`/api/admin/feedback/${selectedFeedback.id}/response`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: responseText,
          adminId: 'admin123', // Replace with actual admin ID
        }),
      });
      
      if (response.ok) {
        const result = await response.json();
        
        // Update the selected feedback with the new response
        if (selectedFeedback.adminResponses) {
          setSelectedFeedback({
            ...selectedFeedback,
            adminResponses: [...selectedFeedback.adminResponses, result.response]
          });
        } else {
          setSelectedFeedback({
            ...selectedFeedback,
            adminResponses: [result.response]
          });
        }
        
        // Clear the response text
        setResponseText('');
        
        // Refresh the feedback list
        fetchFeedback();
      }
    } catch (error) {
      console.error('Error sending response:', error);
    } finally {
      setSendingResponse(false);
    }
  };

  // Filter feedback based on current filters
  const filteredFeedback = feedback.filter(item => {
    // Type filter
    if (typeFilter !== 'all' && item.type !== typeFilter) return false;
    
    // Status filter
    if (statusFilter !== 'all' && item.status !== statusFilter) return false;
    
    // Priority filter
    if (priorityFilter !== 'all' && item.priority !== priorityFilter) return false;
    
    // Search query (in title or description)
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        item.title.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query)
      );
    }
    
    return true;
  });

  // Function to get priority badge color
  const getPriorityColor = (priority) => {
    switch (priority?.toLowerCase()) {
      case 'low':
        return 'bg-green-100 text-green-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'high':
        return 'bg-orange-100 text-orange-800';
      case 'critical':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Function to get status badge color
  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'in_review':
        return 'bg-blue-100 text-blue-800';
      case 'resolved':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Function to get type icon
  const getTypeIcon = (type) => {
    switch (type) {
      case 'bug':
        return <AlertCircle className="w-5 h-5 text-red-500" />;
      case 'feature_request':
        return <BookPlus className="w-5 h-5 text-purple-500" />;
      case 'general_feedback':
        return <MessageSquare className="w-5 h-5 text-blue-500" />;
      case 'support':
        return <HelpCircle className="w-5 h-5 text-green-500" />;
      default:
        return <MessageSquare className="w-5 h-5 text-gray-500" />;
    }
  };

  // Function to get type label
  const getTypeLabel = (type) => {
    switch (type) {
      case 'bug':
        return 'Bug Report';
      case 'feature_request':
        return 'Feature Request';
      case 'general_feedback':
        return 'General Feedback';
      case 'support':
        return 'Support Request';
      default:
        return type;
    }
  };

  // Function to get status icon
  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-4 h-4" />;
      case 'in_review':
        return <Loader2 className="w-4 h-4" />;
      case 'resolved':
        return <CheckCircle className="w-4 h-4" />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Feedback Management</h1>
        
        {/* Filters */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search feedback by description"
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:border-black focus:ring-1 focus:ring-black transition-colors"
                />
              </div>
            </div>
            
            <div className="flex gap-3">
              <button
                onClick={() => fetchFeedback()}
                className="px-4 py-2 text-gray-700 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2"
              >
                <Loader2 className="w-4 h-4" />
                Refresh
              </button>
              
              <div className="relative">
                <button
                  className="px-4 py-2 text-gray-700 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2"
                >
                  <Filter className="w-4 h-4" />
                  Filters
                  <ChevronDown className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-3">
            {/* Type Filter */}
            <div className="flex items-center space-x-1 bg-gray-100 p-1 rounded-lg">
              <button
                onClick={() => setTypeFilter('all')}
                className={`px-3 py-1 text-sm rounded-md ${typeFilter === 'all' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-700'}`}
              >
                All Types
              </button>
              <button
                onClick={() => setTypeFilter('bug')}
                className={`px-3 py-1 text-sm rounded-md ${typeFilter === 'bug' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-700'}`}
              >
                Bugs
              </button>
              <button
                onClick={() => setTypeFilter('feature_request')}
                className={`px-3 py-1 text-sm rounded-md ${typeFilter === 'feature_request' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-700'}`}
              >
                Features
              </button>
              <button
                onClick={() => setTypeFilter('general_feedback')}
                className={`px-3 py-1 text-sm rounded-md ${typeFilter === 'general_feedback' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-700'}`}
              >
                General
              </button>
              <button
                onClick={() => setTypeFilter('support')}
                className={`px-3 py-1 text-sm rounded-md ${typeFilter === 'support' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-700'}`}
              >
                Support
              </button>
            </div>
            
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
                onClick={() => setStatusFilter('in_review')}
                className={`px-3 py-1 text-sm rounded-md ${statusFilter === 'in_review' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-700'}`}
              >
                In Review
              </button>
              <button
                onClick={() => setStatusFilter('resolved')}
                className={`px-3 py-1 text-sm rounded-md ${statusFilter === 'resolved' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-700'}`}
              >
                Resolved
              </button>
            </div>
            
            {/* Priority Filter */}
            <div className="flex items-center space-x-1 bg-gray-100 p-1 rounded-lg">
              <button
                onClick={() => setPriorityFilter('all')}
                className={`px-3 py-1 text-sm rounded-md ${priorityFilter === 'all' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-700'}`}
              >
                All Priorities
              </button>
              <button
                onClick={() => setPriorityFilter('low')}
                className={`px-3 py-1 text-sm rounded-md ${priorityFilter === 'low' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-700'}`}
              >
                Low
              </button>
              <button
                onClick={() => setPriorityFilter('medium')}
                className={`px-3 py-1 text-sm rounded-md ${priorityFilter === 'medium' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-700'}`}
              >
                Medium
              </button>
              <button
                onClick={() => setPriorityFilter('high')}
                className={`px-3 py-1 text-sm rounded-md ${priorityFilter === 'high' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-700'}`}
              >
                High
              </button>
              <button
                onClick={() => setPriorityFilter('critical')}
                className={`px-3 py-1 text-sm rounded-md ${priorityFilter === 'critical' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-700'}`}
              >
                Critical
              </button>
            </div>
          </div>
        </div>
        
        {/* Feedback Table */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          {loading ? (
            <div className="p-8 text-center">
              <Loader2 className="w-8 h-8 text-gray-500 animate-spin mx-auto mb-4" />
              <p className="text-gray-600">Loading feedback...</p>
            </div>
          ) : filteredFeedback.length === 0 ? (
            <div className="p-8 text-center">
              <MessageSquare className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No feedback found</h3>
              <p className="text-gray-600">No feedback matches your current filters.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Title</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Freelancer</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Priority</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredFeedback.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          {getTypeIcon(item.type)}
                          <span className="ml-2 text-sm font-medium text-gray-900">
                            {getTypeLabel(item.type)}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        {item.title}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {item.freelancer?.name || "-"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {item.priority ? (
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(item.priority)}`}>
                            {item.priority}
                          </span>
                        ) : (
                          <span className="text-gray-500 text-sm">-</span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <span className={`flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(item.status)}`}>
                            {getStatusIcon(item.status)}
                            {item.status === 'in_review' ? 'In Review' : 
                              item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                        {new Date(item.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button
                          onClick={() => {
                            setSelectedFeedback(item);
                            setShowDetailModal(true);
                          }}
                          className="text-blue-500 hover:text-blue-700 font-medium text-sm"
                        >
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
      
      {/* Feedback Detail Modal */}
      {showDetailModal && selectedFeedback && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl w-full max-w-3xl max-h-[90vh] flex flex-col">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  {getTypeIcon(selectedFeedback.type)}
                  <h3 className="text-xl font-semibold text-gray-900">
                    {getTypeLabel(selectedFeedback.type)}
                  </h3>
                </div>
                <button
                  onClick={() => setShowDetailModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6">
              <div className="mb-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-2">{selectedFeedback.title}</h4>
                <div className="flex flex-wrap gap-3 mb-4">
                  {selectedFeedback.priority && (
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(selectedFeedback.priority)}`}>
                      Priority: {selectedFeedback.priority}
                    </span>
                  )}
                  <span className={`flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(selectedFeedback.status)}`}>
                    {getStatusIcon(selectedFeedback.status)}
                    Status: {selectedFeedback.status === 'in_review' ? 'In Review' : 
                      selectedFeedback.status.charAt(0).toUpperCase() + selectedFeedback.status.slice(1)}
                  </span>
                  <span className="px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-700">
                    {new Date(selectedFeedback.createdAt).toLocaleString()}
                  </span>
                </div>
                
                {/* Freelancer info */}
                <div className="bg-gray-50 p-4 rounded-lg mb-4">
                  <h5 className="font-medium text-gray-900 mb-2">Freelancer Information</h5>
                  <p className="text-gray-700">
                    <span className="font-medium">Name:</span> {selectedFeedback.freelancer?.name || 'Not available'}
                  </p>
                  <p className="text-gray-700">
                    <span className="font-medium">Email:</span> {selectedFeedback.freelancer?.email || 'Not available'}
                  </p>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg text-gray-700 mb-4">
                  <h5 className="font-medium text-gray-900 mb-2">Description</h5>
                  <p>{selectedFeedback.description}</p>
                </div>
              </div>
              
              {/* Admin Responses */}
              <div className="mb-6">
                <h5 className="font-semibold text-gray-900 mb-3">Responses</h5>
                {selectedFeedback.adminResponses && selectedFeedback.adminResponses.length > 0 ? (
                  <div className="space-y-4">
                    {selectedFeedback.adminResponses.map((response) => (
                      <div key={response.id} className="bg-blue-50 p-4 rounded-lg">
                        <div className="flex justify-between mb-2">
                          <span className="font-medium text-blue-700">Admin Response</span>
                          <span className="text-sm text-gray-500">
                            {new Date(response.createdAt).toLocaleString()}
                          </span>
                        </div>
                        <p className="text-gray-700">{response.message}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-sm">No responses yet.</p>
                )}
              </div>
              
              {/* Status Changes */}
              {selectedFeedback.statusChanges && selectedFeedback.statusChanges.length > 0 && (
                <div className="mb-6">
                  <h5 className="font-semibold text-gray-900 mb-3">Status History</h5>
                  <div className="space-y-2">
                    {selectedFeedback.statusChanges.map((change) => (
                      <div key={change.id} className="flex items-center text-sm">
                        <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center mr-3">
                          {getStatusIcon(change.newStatus)}
                        </div>
                        <div>
                          <p className="text-gray-700">
                            Status changed from <span className="font-medium">{change.oldStatus}</span> to <span className="font-medium">{change.newStatus}</span>
                          </p>
                          <p className="text-gray-500 text-xs">
                            {new Date(change.createdAt).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            <div className="p-6 border-t border-gray-200">
              {/* Response Form */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Add Response</label>
                <textarea
                  value={responseText}
                  onChange={(e) => setResponseText(e.target.value)}
                  rows={3}
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-black focus:ring-1 focus:ring-black transition-colors resize-none"
                  placeholder="Type your response here..."
                />
              </div>
              
              <div className="flex justify-between">
                <div className="space-x-2">
                  {selectedFeedback.status !== 'in_review' && (
                    <button
                      onClick={() => handleStatusChange('in_review')}
                      className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
                    >
                      Mark as In Review
                    </button>
                  )}
                 {selectedFeedback.status !== 'resolved' && (
                    <button
                      onClick={() => handleStatusChange('resolved')}
                      className="px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors"
                    >
                      Mark as Resolved
                    </button>
                  )}
                </div>
                
                <button
                  onClick={handleSendResponse}
                  disabled={!responseText.trim() || sendingResponse}
                  className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors disabled:bg-gray-400 flex items-center"
                >
                  {sendingResponse ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Send Response
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminFeedbackPage;