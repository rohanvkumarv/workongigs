import React, { useState, useEffect, useRef } from 'react';
import { Bell, Info, AlertTriangle, CheckCircle, X } from 'lucide-react';
import { useAuth } from '@/context/authContext';
import Link from 'next/link';

const NotificationBell = () => {
  const { freelancerId } = useAuth();
  const [notifications, setNotifications] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const dropdownRef = useRef(null);
  
  // Track the last viewed notification timestamp
  const [lastViewedTimestamp, setLastViewedTimestamp] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('lastViewedNotificationTimestamp') || '0';
    }
    return '0';
  });

  useEffect(() => {
    const fetchNotifications = async () => {
      if (!freelancerId) return;
      
      try {
        const response = await fetch(`/api/admin/freelancers/notifications?freelancerId=${freelancerId}`);
        if (response.ok) {
          const data = await response.json();
          setNotifications(data.notifications || []);
          
          // Count notifications that are newer than the last viewed timestamp
          const newCount = data.notifications.filter(notification => {
            const notificationTime = new Date(notification.createdAt).getTime();
            return notificationTime > parseInt(lastViewedTimestamp);
          }).length;
          
          setUnreadCount(newCount);
        }
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };
    
    fetchNotifications();
    
    // Check for new notifications periodically
    const interval = setInterval(fetchNotifications, 60000); // Check every minute
    
    return () => clearInterval(interval);
  }, [freelancerId, lastViewedTimestamp]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Function to get the icon based on notification type
  const getTypeIcon = (type) => {
    switch(type) {
      case 'warning':
        return <AlertTriangle className="w-4 h-4 text-yellow-500" />;
      case 'error':
        return <X className="w-4 h-4 text-red-500" />;
      case 'success':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'info':
      default:
        return <Info className="w-4 h-4 text-blue-500" />;
    }
  };

  // When bell is clicked
  const handleBellClick = () => {
    setIsOpen(!isOpen);
    
    // When opening the dropdown, update the last viewed timestamp
    if (!isOpen && notifications.length > 0) {
      // Find the newest notification timestamp
      const newestNotification = notifications.reduce((newest, notification) => {
        const notificationTime = new Date(notification.createdAt).getTime();
        return notificationTime > newest ? notificationTime : newest;
      }, 0);
      
      // Update lastViewedTimestamp to the current time
      const currentTime = Date.now();
      setLastViewedTimestamp(currentTime.toString());
      localStorage.setItem('lastViewedNotificationTimestamp', currentTime.toString());
      
      // Reset unread count
      setUnreadCount(0);
    }
  };
  
  return (
    <div className="relative" ref={dropdownRef}>
      {/* Bell Icon with Badge */}
      <button 
        className="relative p-2 rounded-full hover:bg-gray-100 transition-colors"
        onClick={handleBellClick}
      >
        <Bell className="w-6 h-6 text-gray-700" />
        
        {/* Notification Badge - show whenever there are unread notifications */}
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 h-5 w-5 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>
      
      {/* Dropdown Panel */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-gray-200 z-50">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-100">
            <h3 className="font-semibold text-gray-900">Notifications</h3>
            <button 
              className="text-gray-500 hover:text-gray-700"
              onClick={() => setIsOpen(false)}
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          
          {/* Notification List */}
          <div className="max-h-96 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                <Bell className="w-12 h-12 text-gray-300 mx-auto mb-2" />
                <p>No notifications yet</p>
              </div>
            ) : (
              notifications.map((notification) => {
                const isNew = new Date(notification.createdAt).getTime() > parseInt(lastViewedTimestamp);
                
                return (
                  <div 
                    key={notification.id} 
                    className={`p-4 border-b border-gray-100 hover:bg-gray-50 ${isNew ? 'bg-blue-50' : ''}`}
                  >
                    <div className="flex gap-3">
                      <div className="mt-0.5">{getTypeIcon(notification.type || 'info')}</div>
                      <div>
                        <div className="flex items-center">
                          <h4 className="font-medium text-gray-900">{notification.title}</h4>
                          {isNew && (
                            <span className="ml-2 px-1.5 py-0.5 bg-blue-100 text-blue-800 text-xs rounded-full">
                              New
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 mt-1 line-clamp-2">{notification.message}</p>
                        <p className="text-xs text-gray-500 mt-2">
                          {new Date(notification.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
          
          {/* Footer */}
          {/* <div className="p-3 text-center border-t border-gray-100">
            <Link 
              href="/freelancer/notifications"
              onClick={() => setIsOpen(false)}
              className="text-sm text-blue-500 hover:text-blue-700 font-medium"
            >
              View All Notifications
            </Link>
          </div> */}
        </div>
      )}
    </div>
  );
};

export default NotificationBell;