import React, { useState, useEffect } from 'react';
import { 
  Send, Bell, Search, Filter, Users, User, ChevronDown, 
  AlertTriangle, Info, CheckCircle, X, Plus, RefreshCw
} from 'lucide-react';

const NotificationsPage = () => {
  // State management
  const [isCreating, setIsCreating] = useState(false);
  const [freelancers, setFreelancers] = useState([]);
  const [selectedFreelancers, setSelectedFreelancers] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    message: '',
    type: 'info',
    targetType: 'all' // 'all' or 'specific'
  });

  // Fetch data on load
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        // Fetch notifications
        const notificationsRes = await fetch('/api/admin/notifications');
        const notificationsData = await notificationsRes.json();
        
        // Fetch freelancers for selection
        const freelancersRes = await fetch('/api/admin/notifications/freelancers');
        const freelancersData = await freelancersRes.json();
        
        setNotifications(notificationsData.notifications || []);
        setFreelancers(freelancersData.freelancers || []);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, []);

  // Filter notifications based on search term
  const filteredNotifications = notifications.filter(notification => 
    notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    notification.message.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Group notifications by target (all vs specific)
  const groupedNotifications = {
    all: filteredNotifications.filter(n => n.freelancerId === null),
    specific: filteredNotifications.filter(n => n.freelancerId !== null)
  };

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handle freelancer selection
  const toggleFreelancerSelection = (freelancerId) => {
    setSelectedFreelancers(prev => 
      prev.includes(freelancerId)
        ? prev.filter(id => id !== freelancerId)
        : [...prev, freelancerId]
    );
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const payload = {
        title: formData.title,
        message: formData.message,
        type: formData.type,
        freelancerIds: formData.targetType === 'all' ? null : selectedFreelancers
      };
      
      const response = await fetch('/api/admin/notifications', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
      
      if (!response.ok) {
        throw new Error('Failed to create notification');
      }
      
      // Refresh notifications list
      const result = await response.json();
      setNotifications(prev => [result.notification, ...prev]);
      
      // Reset form
      setFormData({
        title: '',
        message: '',
        type: 'info',
        targetType: 'all'
      });
      setSelectedFreelancers([]);
      setIsCreating(false);
      
      // Show success message
      alert('Notification sent successfully!');
      
    } catch (error) {
      console.error('Error sending notification:', error);
      alert('Failed to send notification. Please try again.');
    }
  };

  // Function to get the icon based on notification type
  const getTypeIcon = (type) => {
    switch(type) {
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
      case 'error':
        return <X className="w-5 h-5 text-red-500" />;
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'info':
      default:
        return <Info className="w-5 h-5 text-blue-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Notifications</h1>
            <p className="text-gray-600">Manage and send notifications to freelancers</p>
          </div>
          <button
            onClick={() => setIsCreating(true)}
            className="px-4 py-2 bg-black text-white rounded-lg flex items-center gap-2 hover:bg-gray-800 transition-colors"
          >
            <Plus className="w-4 h-4" />
            New Notification
          </button>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search notifications..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:border-black focus:ring-1 focus:ring-black transition-colors"
              />
            </div>
            <button 
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg flex items-center gap-2 hover:bg-gray-200 transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
              Refresh
            </button>
          </div>
        </div>

        {/* Main content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* All Freelancers Notifications */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
            <div className="p-4 border-b border-gray-200 bg-gray-50 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-gray-700" />
                <h2 className="font-semibold text-gray-900">All Freelancers</h2>
              </div>
              <span className="px-2 py-1 bg-gray-200 text-gray-700 rounded-full text-xs font-medium">
                {groupedNotifications.all.length} notifications
              </span>
            </div>
            
            {isLoading ? (
              <div className="p-6 text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
                <p className="mt-2 text-gray-600">Loading notifications...</p>
              </div>
            ) : groupedNotifications.all.length === 0 ? (
              <div className="p-6 text-center">
                <Bell className="w-12 h-12 text-gray-300 mx-auto mb-2" />
                <p className="text-gray-500">No notifications sent to all freelancers yet</p>
              </div>
            ) : (
              <div className="overflow-y-auto max-h-[600px]">
                {groupedNotifications.all.map((notification) => (
                  <div key={notification.id} className="p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <div className="flex items-start gap-3">
                      <div className="mt-1">{getTypeIcon(notification.type)}</div>
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900">{notification.title}</h3>
                        <p className="text-gray-600 text-sm mt-1">{notification.message}</p>
                        <div className="mt-2 flex items-center gap-2 text-xs text-gray-500">
                          <span>{new Date(notification.createdAt).toLocaleDateString()}</span>
                          <span>•</span>
                          <span>{new Date(notification.createdAt).toLocaleTimeString()}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Specific Freelancers Notifications */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
            <div className="p-4 border-b border-gray-200 bg-gray-50 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <User className="w-5 h-5 text-gray-700" />
                <h2 className="font-semibold text-gray-900">Specific Freelancers</h2>
              </div>
              <span className="px-2 py-1 bg-gray-200 text-gray-700 rounded-full text-xs font-medium">
                {groupedNotifications.specific.length} notifications
              </span>
            </div>
            
            {isLoading ? (
              <div className="p-6 text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
                <p className="mt-2 text-gray-600">Loading notifications...</p>
              </div>
            ) : groupedNotifications.specific.length === 0 ? (
              <div className="p-6 text-center">
                <User className="w-12 h-12 text-gray-300 mx-auto mb-2" />
                <p className="text-gray-500">No notifications sent to specific freelancers yet</p>
              </div>
            ) : (
              <div className="overflow-y-auto max-h-[600px]">
                {groupedNotifications.specific.map((notification) => (
                  <div key={notification.id} className="p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <div className="flex items-start gap-3">
                      <div className="mt-1">{getTypeIcon(notification.type)}</div>
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900">{notification.title}</h3>
                        <p className="text-gray-600 text-sm mt-1">{notification.message}</p>
                        <div className="mt-2 flex items-center gap-2 text-xs text-gray-500">
                          <span>To: {notification.freelancerName || 'Freelancer'}</span>
                          <span>•</span>
                          <span>{new Date(notification.createdAt).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Create Notification Modal */}
      {isCreating && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-900">Create New Notification</h2>
                <button
                  onClick={() => setIsCreating(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6">
              <div className="space-y-6">
                {/* Notification Title */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Notification Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-black focus:ring-1 focus:ring-black transition-colors"
                    placeholder="Enter notification title"
                  />
                </div>
                
                {/* Notification Message */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={4}
                    className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-black focus:ring-1 focus:ring-black transition-colors resize-none"
                    placeholder="Enter notification message"
                  />
                </div>
                
                {/* Notification Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Notification Type
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {['info', 'success', 'warning', 'error'].map((type) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setFormData({...formData, type})}
                        className={`px-4 py-3 rounded-lg border text-sm font-medium transition-colors flex items-center justify-center gap-2
                          ${formData.type === type 
                            ? 'border-black bg-black text-white' 
                            : 'border-gray-200 text-gray-700 hover:border-gray-300'}`}
                      >
                        {type === 'info' && <Info className="w-4 h-4" />}
                        {type === 'success' && <CheckCircle className="w-4 h-4" />}
                        {type === 'warning' && <AlertTriangle className="w-4 h-4" />}
                        {type === 'error' && <X className="w-4 h-4" />}
                        {type.charAt(0).toUpperCase() + type.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>
                
                {/* Target Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Send To
                  </label>
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <button
                      type="button"
                      onClick={() => setFormData({...formData, targetType: 'all'})}
                      className={`px-4 py-3 rounded-lg border text-sm font-medium transition-colors flex items-center justify-center gap-2
                        ${formData.targetType === 'all' 
                          ? 'border-black bg-black text-white' 
                          : 'border-gray-200 text-gray-700 hover:border-gray-300'}`}
                    >
                      <Users className="w-4 h-4" />
                      All Freelancers
                    </button>
                    <button
                      type="button"
                      onClick={() => setFormData({...formData, targetType: 'specific'})}
                      className={`px-4 py-3 rounded-lg border text-sm font-medium transition-colors flex items-center justify-center gap-2
                        ${formData.targetType === 'specific' 
                          ? 'border-black bg-black text-white' 
                          : 'border-gray-200 text-gray-700 hover:border-gray-300'}`}
                    >
                      <User className="w-4 h-4" />
                      Specific Freelancers
                    </button>
                  </div>
                  
                  {/* Freelancer Selection */}
                  {formData.targetType === 'specific' && (
                    <div className="border border-gray-200 rounded-lg p-3 max-h-48 overflow-y-auto">
                      <div className="mb-2 text-sm text-gray-500">
                        Select freelancers ({selectedFreelancers.length} selected)
                      </div>
                      {freelancers.length === 0 ? (
                        <div className="text-center py-4 text-gray-500">
                          No freelancers found
                        </div>
                      ) : (
                        <div className="space-y-2">
                          {freelancers.map((freelancer) => (
                            <div 
                              key={freelancer.id} 
                              className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded-lg cursor-pointer"
                              onClick={() => toggleFreelancerSelection(freelancer.id)}
                            >
                              <input
                                type="checkbox"
                                checked={selectedFreelancers.includes(freelancer.id)}
                                onChange={() => {}}
                                className="rounded border-gray-300 text-black focus:ring-black"
                              />
                              <div className="flex-1">
                                <div className="font-medium">{freelancer.name || 'Unnamed Freelancer'}</div>
                                <div className="text-xs text-gray-500">{freelancer.email}</div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
                
                {/* Footer Actions */}
                <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                  <button
                    type="button"
                    onClick={() => setIsCreating(false)}
                    className="px-6 py-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 rounded-lg bg-black text-white hover:bg-gray-900 transition-colors flex items-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    Send Notification
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationsPage;