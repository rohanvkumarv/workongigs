'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/authContext';
import { AlertCircle, BookPlus, MessageSquare, HelpCircle, Clock, CheckCircle, Loader2, ChevronLeft, ChevronRight ,X } from 'lucide-react';
import Link from 'next/link';

const FeedbackPage = () => {
  const { freelancerId } = useAuth();
  const [activeTab, setActiveTab] = useState('create');
  const [feedbackType, setFeedbackType] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [feedbackHistory, setFeedbackHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedFeedback, setSelectedFeedback] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);

  // Fetch feedback history on component mount
  useEffect(() => {
    const fetchFeedbackHistory = async () => {
      if (!freelancerId) return;
      
      try {
        setLoading(true);
        const response = await fetch(`/api/freelancer-feedback?freelancerId=${freelancerId}`);
        if (response.ok) {
          const data = await response.json();
          setFeedbackHistory(data.feedback || []);
        }
      } catch (error) {
        console.error('Error fetching feedback history:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeedbackHistory();
  }, [freelancerId, submitSuccess]);

  const handleTypeSelection = (type) => {
    setFeedbackType(type);
    // Reset priority when changing type
    setFormData({ ...formData, priority: '' });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!feedbackType || !formData.title || !formData.description) {
      alert('Please fill in all required fields');
      return;
    }
    
    // Check if priority is required and provided
    if (['bug', 'feature_request', 'support'].includes(feedbackType) && !formData.priority) {
      alert('Please select a priority level');
      return;
    }
    
    try {
      setIsSubmitting(true);
      
      const response = await fetch('/api/freelancer-feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          freelancerId,
          type: feedbackType,
          title: formData.title,
          description: formData.description,
          priority: formData.priority || null,
        }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to submit feedback');
      }
      
      // Reset form on successful submission
      setFormData({
        title: '',
        description: '',
        priority: ''
      });
      setFeedbackType('');
      setSubmitSuccess(true);
      
      // Switch to history tab after submission
      setTimeout(() => {
        setActiveTab('history');
        setSubmitSuccess(false);
      }, 2000);
      
    } catch (error) {
      console.error('Error submitting feedback:', error);
      alert('Failed to submit feedback. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const viewFeedbackDetail = (feedback) => {
    setSelectedFeedback(feedback);
    setShowDetailModal(true);
  };

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
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Support & Feedback Center</h1>
          {/* <Link href="/freelancer/dashboard" className="text-blue-500 hover:text-blue-700 flex items-center">
            <ChevronLeft className="w-4 h-4 mr-1" />
            Back to Dashboard
          </Link> */}
        </div>
        
        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-md mb-6">
          <div className="flex border-b">
            <button
              className={`flex-1 py-4 font-medium text-sm text-center relative ${
                activeTab === 'create' ? 'text-black' : 'text-gray-500 hover:text-gray-900'
              }`}
              onClick={() => setActiveTab('create')}
            >
              Create Feedback
              {activeTab === 'create' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-black"></div>
              )}
            </button>
            <button
              className={`flex-1 py-4 font-medium text-sm text-center relative ${
                activeTab === 'history' ? 'text-black' : 'text-gray-500 hover:text-gray-900'
              }`}
              onClick={() => setActiveTab('history')}
            >
              Feedback History
              {activeTab === 'history' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-black"></div>
              )}
            </button>
          </div>
        </div>
        
        {/* Create Feedback Form */}
        {activeTab === 'create' && (
          <div className="bg-white rounded-xl shadow-md p-6">
            {submitSuccess ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-green-500" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Feedback Submitted!</h3>
                <p className="text-gray-600 mb-6">Thank you for your feedback. We'll review it soon.</p>
                <button
                  onClick={() => {
                    setSubmitSuccess(false);
                    setActiveTab('history');
                  }}
                  className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
                >
                  View Your Feedback
                </button>
              </div>
            ) : (
              <>
                {!feedbackType ? (
                  // Step 1: Select feedback type
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-6">What kind of feedback would you like to provide?</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <button
                        onClick={() => handleTypeSelection('bug')}
                        className="p-6 border border-gray-200 rounded-xl hover:border-gray-300 hover:shadow-md transition-all text-left"
                      >
                        <div className="flex items-start gap-4">
                          <div className="p-2 bg-red-100 rounded-lg">
                            <AlertCircle className="w-6 h-6 text-red-500" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900 mb-1">Report a Bug</h3>
                            <p className="text-sm text-gray-600">Let us know about issues you're experiencing with the platform</p>
                          </div>
                        </div>
                      </button>
                      
                      <button
                        onClick={() => handleTypeSelection('feature_request')}
                        className="p-6 border border-gray-200 rounded-xl hover:border-gray-300 hover:shadow-md transition-all text-left"
                      >
                        <div className="flex items-start gap-4">
                          <div className="p-2 bg-purple-100 rounded-lg">
                            <BookPlus className="w-6 h-6 text-purple-500" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900 mb-1">Request a Feature</h3>
                            <p className="text-sm text-gray-600">Suggest new features or improvements to enhance your experience</p>
                          </div>
                        </div>
                      </button>
                      
                      <button
                        onClick={() => handleTypeSelection('general_feedback')}
                        className="p-6 border border-gray-200 rounded-xl hover:border-gray-300 hover:shadow-md transition-all text-left"
                      >
                        <div className="flex items-start gap-4">
                          <div className="p-2 bg-blue-100 rounded-lg">
                            <MessageSquare className="w-6 h-6 text-blue-500" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900 mb-1">General Feedback</h3>
                            <p className="text-sm text-gray-600">Share your thoughts about our platform</p>
                          </div>
                        </div>
                      </button>
                      
                      <button
                        onClick={() => handleTypeSelection('support')}
                        className="p-6 border border-gray-200 rounded-xl hover:border-gray-300 hover:shadow-md transition-all text-left"
                      >
                        <div className="flex items-start gap-4">
                          <div className="p-2 bg-green-100 rounded-lg">
                            <HelpCircle className="w-6 h-6 text-green-500" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900 mb-1">Get Support</h3>
                            <p className="text-sm text-gray-600">Ask for help with any issues you're facing</p>
                          </div>
                        </div>
                      </button>
                    </div>
                  </div>
                ) : (
                  // Step 2: Fill out feedback form
                  <form onSubmit={handleSubmit}>
                    <div className="mb-6">
                      <div className="flex items-center gap-2 mb-6">
                        <button
                          type="button"
                          onClick={() => setFeedbackType('')}
                          className="text-gray-500 hover:text-gray-700"
                        >
                          <ChevronLeft className="w-5 h-5" />
                        </button>
                        <h2 className="text-xl font-semibold text-gray-900">
                          {getTypeLabel(feedbackType)}
                        </h2>
                      </div>
                      
                      <div className="space-y-4">
                        {/* Title field */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            {feedbackType === 'bug' && "What issue are you experiencing?"}
                            {feedbackType === 'feature_request' && "What feature would you like to see?"}
                            {feedbackType === 'general_feedback' && "Feedback subject"}
                            {feedbackType === 'support' && "What do you need help with?"}
                          </label>
                          <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-black focus:ring-1 focus:ring-black transition-colors"
                            placeholder="Enter a title"
                          />
                        </div>
                        
                        {/* Description field */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            {feedbackType === 'bug' && "Please describe the bug in detail"}
                            {feedbackType === 'feature_request' && "Please describe the feature in detail"}
                            {feedbackType === 'general_feedback' && "Please share your thoughts about our platform"}
                            {feedbackType === 'support' && "Please describe your issue in detail"}
                          </label>
                          <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleInputChange}
                            required
                            rows={6}
                            className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-black focus:ring-1 focus:ring-black transition-colors resize-none"
                            placeholder="Provide details here..."
                          />
                        </div>
                        
                        {/* Priority field (not for general feedback) */}
                        {feedbackType !== 'general_feedback' && (
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Priority
                            </label>
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                              {feedbackType === 'bug' && (
                                <>
                                  <button
                                    type="button"
                                    onClick={() => setFormData({...formData, priority: 'low'})}
                                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors
                                      ${formData.priority === 'low' 
                                        ? 'bg-green-100 text-green-800 border border-green-300' 
                                        : 'bg-gray-50 text-gray-700 border border-gray-200 hover:bg-gray-100'}`}
                                  >
                                    Minor inconvenience
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => setFormData({...formData, priority: 'medium'})}
                                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors
                                      ${formData.priority === 'medium' 
                                        ? 'bg-yellow-100 text-yellow-800 border border-yellow-300' 
                                        : 'bg-gray-50 text-gray-700 border border-gray-200 hover:bg-gray-100'}`}
                                  >
                                    Affects my workflow
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => setFormData({...formData, priority: 'high'})}
                                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors
                                      ${formData.priority === 'high' 
                                        ? 'bg-orange-100 text-orange-800 border border-orange-300' 
                                        : 'bg-gray-50 text-gray-700 border border-gray-200 hover:bg-gray-100'}`}
                                  >
                                    Prevents completing tasks
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => setFormData({...formData, priority: 'critical'})}
                                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors
                                      ${formData.priority === 'critical' 
                                        ? 'bg-red-100 text-red-800 border border-red-300' 
                                        : 'bg-gray-50 text-gray-700 border border-gray-200 hover:bg-gray-100'}`}
                                  >
                                    Cannot use platform
                                  </button>
                                </>
                              )}
                              {feedbackType === 'feature_request' && (
                                <>
                                  <button
                                    type="button"
                                    onClick={() => setFormData({...formData, priority: 'low'})}
                                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors
                                      ${formData.priority === 'low' 
                                        ? 'bg-green-100 text-green-800 border border-green-300' 
                                        : 'bg-gray-50 text-gray-700 border border-gray-200 hover:bg-gray-100'}`}
                                  >
                                    Nice to have
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => setFormData({...formData, priority: 'medium'})}
                                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors
                                      ${formData.priority === 'medium' 
                                        ? 'bg-yellow-100 text-yellow-800 border border-yellow-300' 
                                        : 'bg-gray-50 text-gray-700 border border-gray-200 hover:bg-gray-100'}`}
                                  >
                                    Would improve experience
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => setFormData({...formData, priority: 'high'})}
                                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors
                                      ${formData.priority === 'high' 
                                        ? 'bg-orange-100 text-orange-800 border border-orange-300' 
                                        : 'bg-gray-50 text-gray-700 border border-gray-200 hover:bg-gray-100'}`}
                                  >
                                    Significant improvement
                                  </button>
                                </>
                              )}
                              {feedbackType === 'support' && (
                                <>
                                  <button
                                    type="button"
                                    onClick={() => setFormData({...formData, priority: 'low'})}
                                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors
                                      ${formData.priority === 'low' 
                                        ? 'bg-green-100 text-green-800 border border-green-300' 
                                        : 'bg-gray-50 text-gray-700 border border-gray-200 hover:bg-gray-100'}`}
                                  >
                                    No rush
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => setFormData({...formData, priority: 'medium'})}
                                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors
                                      ${formData.priority === 'medium' 
                                        ? 'bg-yellow-100 text-yellow-800 border border-yellow-300' 
                                        : 'bg-gray-50 text-gray-700 border border-gray-200 hover:bg-gray-100'}`}
                                  >
                                    Need help soon
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => setFormData({...formData, priority: 'high'})}
                                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors
                                      ${formData.priority === 'high' 
                                        ? 'bg-orange-100 text-orange-800 border border-orange-300' 
                                        : 'bg-gray-50 text-gray-700 border border-gray-200 hover:bg-gray-100'}`}
                                  >
                                    Urgent - blocking work
                                  </button>
                                </>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex justify-end gap-3">
                      <button
                        type="button"
                        onClick={() => setFeedbackType('')}
                        className="px-6 py-2 border border-gray-200 text-gray-600 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        Back
                      </button>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors disabled:bg-gray-400 flex items-center"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Submitting...
                          </>
                        ) : (
                          'Submit Feedback'
                        )}
                      </button>
                    </div>
                  </form>
                )}
              </>
            )}
          </div>
        )}
        
        {/* Feedback History List */}
        {activeTab === 'history' && (
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            {loading ? (
              <div className="p-8 text-center">
                <Loader2 className="w-8 h-8 text-gray-500 animate-spin mx-auto mb-4" />
                <p className="text-gray-600">Loading your feedback history...</p>
              </div>
            ) : feedbackHistory.length === 0 ? (
              <div className="p-8 text-center">
                <MessageSquare className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No feedback yet</h3>
                <p className="text-gray-600 mb-6">You haven't submitted any feedback yet.</p>
                <button
                  onClick={() => setActiveTab('create')}
                  className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
                >
                  Create Your First Feedback
                </button>
              </div>
            ) : (
              <div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Title</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Priority</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {feedbackHistory.map((feedback) => (
                        <tr key={feedback.id} className="hover:bg-gray-50">
                          <td className="px-4 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              {getTypeIcon(feedback.type)}
                              <span className="ml-2 text-sm font-medium text-gray-900">
                                {getTypeLabel(feedback.type)}
                              </span>
                            </div>
                          </td>
                          <td className="px-4 py-4 text-sm text-gray-900">
                            {feedback.title}
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap">
                            {feedback.priority ? (
                              <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(feedback.priority)}`}>
                                {feedback.priority}
                              </span>
                            ) : (
                              <span className="text-gray-500 text-sm">-</span>
                            )}
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <span className={`flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(feedback.status)}`}>
                                {getStatusIcon(feedback.status)}
                                {feedback.status === 'in_review' ? 'In Review' : 
                                  feedback.status.charAt(0).toUpperCase() + feedback.status.slice(1)}
                              </span>
                            </div>
                          </td>
                          <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">
                            {new Date(feedback.createdAt).toLocaleDateString()}
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap">
                            <button
                              onClick={() => viewFeedbackDetail(feedback)}
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
              </div>
            )}
          </div>
        )}
      </div>
      
      {/* Feedback Detail Modal */}
      {showDetailModal && selectedFeedback && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
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
            
            <div className="p-6">
            <div className="mb-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-2">{selectedFeedback.title}</h4>
                <div className="flex gap-3 mb-4">
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
                <div className="bg-gray-50 p-4 rounded-lg text-gray-700 mb-4">
                  {selectedFeedback.description}
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
                  <p className="text-gray-500 text-sm">No responses yet. Our team will review your feedback soon.</p>
                )}
              </div>
              
              {/* Status Changes */}
              {selectedFeedback.statusChanges && selectedFeedback.statusChanges.length > 0 && (
                <div>
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
            
            <div className="p-4 bg-gray-50 border-t border-gray-200 flex justify-end">
              <button
                onClick={() => setShowDetailModal(false)}
                className="px-4 py-2 text-gray-700 font-medium hover:text-gray-900"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FeedbackPage;