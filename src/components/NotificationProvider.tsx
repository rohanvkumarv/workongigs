import React, { useState, useEffect } from 'react';
import { Check, X, AlertCircle } from 'lucide-react';

const NotificationTypes = {
  SUCCESS: 'success',
  ERROR: 'error',
  INFO: 'info'
};

export const NotificationContext = React.createContext({
  showNotification: () => {},
});

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  const showNotification = (message, type = NotificationTypes.INFO) => {
    const id = Date.now();
    setNotifications(prev => [...prev, { id, message, type }]);

    // Auto remove after 3 seconds
    setTimeout(() => {
      setNotifications(prev => prev.filter(notification => notification.id !== id));
    }, 3000);
  };

  return (
    <NotificationContext.Provider value={{ showNotification }}>
      <div className="fixed top-4 right-4 z-50 space-y-2">
        {notifications.map(notification => (
          <Notification
            key={notification.id}
            type={notification.type}
            message={notification.message}
            onClose={() => {
              setNotifications(prev => 
                prev.filter(n => n.id !== notification.id)
              );
            }}
          />
        ))}
      </div>
      {children}
    </NotificationContext.Provider>
  );
};

const Notification = ({ type, message, onClose }) => {
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // Start exit animation after 2.7 seconds
    const timeout = setTimeout(() => setIsExiting(true), 2700);
    return () => clearTimeout(timeout);
  }, []);

  const baseStyles = "flex items-center gap-3 min-w-[300px] px-4 py-3 rounded-lg text-white transform transition-all duration-300 ease-in-out shadow-lg";
  
  const typeStyles = {
    [NotificationTypes.SUCCESS]: "bg-green-500",
    [NotificationTypes.ERROR]: "bg-red-500",
    [NotificationTypes.INFO]: "bg-blue-500"
  };

  const icons = {
    [NotificationTypes.SUCCESS]: <Check className="w-5 h-5" />,
    [NotificationTypes.ERROR]: <X className="w-5 h-5" />,
    [NotificationTypes.INFO]: <AlertCircle className="w-5 h-5" />
  };

  return (
    <div 
      className={`
        ${baseStyles} 
        ${typeStyles[type]}
        ${isExiting ? 'opacity-0 translate-x-full' : 'opacity-100 translate-x-0'}
      `}
    >
      <div className="shrink-0">
        {icons[type]}
      </div>
      <p className="flex-1">{message}</p>
      <button 
        onClick={onClose}
        className="text-white/80 hover:text-white transition-colors"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};

export const useNotification = () => {
  const context = React.useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
};