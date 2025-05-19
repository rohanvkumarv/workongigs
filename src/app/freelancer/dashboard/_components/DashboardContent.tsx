
"use client"

import React, { useEffect, useState } from 'react';
import { 
  User, FileText, Phone, Mail, ArrowUpRight, Copy, Send, 
  PlusCircle, X, Calendar, Clock, Filter, Bell, HelpCircle,
  Menu, ChevronDown, ChevronRight, MoreVertical
} from 'lucide-react';
import { useAuth } from '@/context/authContext';
import Link from 'next/link';
import { useNotification } from "@/components/NotificationProvider";
import NotificationBell from './NotificationBell';

// Delivery Card component for mobile view
const DeliveryCard = ({ delivery, onSendReminder, onCopyPreviewLink }) => {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4 mb-3 shadow-sm">
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="font-medium text-gray-900">{delivery.name}</h3>
          <p className="text-sm text-gray-500">{delivery.client.name}</p>
        </div>
        <span className={`px-2 py-1 rounded-full text-xs ${
          delivery.status === 'Paid' 
            ? 'bg-green-100 text-green-800' 
            : 'bg-yellow-100 text-yellow-800'
        }`}>
          {delivery.status}
        </span>
      </div>
      
      <div className="flex justify-between text-sm mb-3">
        <div className="flex items-center">
          <Calendar className="w-4 h-4 text-gray-400 mr-1" />
          <span className="text-gray-600">{new Date(delivery.createdAt).toLocaleDateString()}</span>
        </div>
        <div className="font-medium">
          ₹{delivery.amount}
        </div>
      </div>
      
      {delivery.status === 'Not Paid' && (
        <div className="flex justify-end space-x-3">
          <button
            onClick={() => onSendReminder(delivery.id, delivery.client.id)}
            className="flex items-center gap-1 px-3 py-1.5 bg-blue-50 text-blue-600 rounded-lg text-xs font-medium"
          >
            <Send className="w-3 h-3" /> Remind
          </button>
          <button
            onClick={() => onCopyPreviewLink(delivery.client.id, delivery.name)}
            className="flex items-center gap-1 px-3 py-1.5 bg-gray-50 text-gray-600 rounded-lg text-xs font-medium"
          >
            <Copy className="w-3 h-3" /> Copy Link
          </button>
        </div>
      )}
    </div>
  );
};

// Unpaid Client Card for mobile
const UnpaidClientCard = ({ client, onSendReminder }) => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 mb-3">
      <div className="mb-2">
        <h3 className="font-medium text-gray-900">{client.name}</h3>
      </div>
      <div className="flex justify-between text-sm mb-3">
        <div className="text-gray-600">
          {client.deliveriesCount} deliveries
        </div>
        <div className="font-medium text-gray-900">
          ₹{client.totalAmount}
        </div>
      </div>
      <div className="flex justify-end">
        <button
          onClick={() => onSendReminder(client.deliveryIds[0], client.id)}
          className="flex items-center gap-1 px-3 py-1.5 bg-blue-500 text-white rounded-lg text-xs font-medium"
        >
          <Send className="w-3 h-3" /> Send Reminder
        </button>
      </div>
    </div>
  );
};

const DashboardContent = () => {
  const { freelancerId } = useAuth();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [copySuccess, setCopySuccess] = useState('');
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [showUnpaidClientsModal, setShowUnpaidClientsModal] = useState(false);
  const [statsTimeFilter, setStatsTimeFilter] = useState('30days');
  const { showNotification } = useNotification();
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showTimeFilterDropdown, setShowTimeFilterDropdown] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!freelancerId) return;
        const res = await fetch(`/api/get-dashboard-details?freelancerId=${freelancerId}&timeFrame=${statsTimeFilter}`);
        if (!res.ok) throw new Error('Failed to fetch data');
        const jsonData = await res.json();
        setData(jsonData);
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
        showNotification('Failed to load dashboard data', 'error');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [freelancerId, statsTimeFilter]);

  const sendReminderToAll = async () => {
    try {
      const res = await fetch('/api/send-bulk-reminder', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ unpaidDeliveries: data.unpaidDeliveries })
      });
      if (!res.ok) throw new Error('Failed to send reminders');
      showNotification('Payment reminders sent to all clients', 'success');
    } catch (err) {
      console.error('Error sending reminders:', err);
      showNotification('Failed to send reminders', 'error');
    }
  };

  const sendSingleReminder = async (deliveryId, clientId) => {
    try {
      const res = await fetch('/api/send-single-reminder', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ deliveryId, clientId })
      });
      if (!res.ok) throw new Error('Failed to send reminder');
      showNotification('Payment reminder sent successfully', 'success');
    } catch (err) {
      console.error('Error sending reminder:', err);
      showNotification('Failed to send reminder', 'error');
    }
  };

 
  const copyPreviewLink = (clientId, deliveryName) => {
    const previewLink = `${window.location.origin}/${clientId}/preview?delivery=${encodeURIComponent(deliveryName)}`;
    navigator.clipboard.writeText(previewLink);
    showNotification('Preview link copied to clipboard', 'success');
  };
  

  // New WithdrawModal implementation
  const WithdrawModal = () => {
    const [selectedDeliveries, setSelectedDeliveries] = useState([]);
    const [paidDeliveries, setPaidDeliveries] = useState([]);
    const [withdrawalHistory, setWithdrawalHistory] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');
    
    useEffect(() => {
      // Fetch paid deliveries and withdrawal history when modal opens
      const fetchData = async () => {
        setIsLoading(true);
        try {
          // Fetch paid deliveries
          const deliveriesRes = await fetch(`/api/get-paid-deliveries?freelancerId=${freelancerId}`);
          if (!deliveriesRes.ok) throw new Error('Failed to fetch deliveries');
          const deliveriesData = await deliveriesRes.json();
          setPaidDeliveries(deliveriesData.paidDeliveries);
          
          // Fetch withdrawal history
          const historyRes = await fetch(`/api/get-withdrawal-history?freelancerId=${freelancerId}`);
          if (!historyRes.ok) throw new Error('Failed to fetch withdrawal history');
          const historyData = await historyRes.json();
          setWithdrawalHistory(historyData.withdrawalHistory);
        } catch (err) {
          console.error('Error fetching data:', err);
          setError('Failed to load data');
        } finally {
          setIsLoading(false);
        }
      };
      
      fetchData();
    }, []);
    
    const handleSelectDelivery = (deliveryId) => {
      if (selectedDeliveries.includes(deliveryId)) {
        setSelectedDeliveries(selectedDeliveries.filter(id => id !== deliveryId));
      } else {
        setSelectedDeliveries([...selectedDeliveries, deliveryId]);
      }
    };
    
    const handleSelectAll = () => {
      if (selectedDeliveries.length === paidDeliveries.length) {
        setSelectedDeliveries([]);
      } else {
        setSelectedDeliveries(paidDeliveries.map(delivery => delivery.id));
      }
    };
    
    const getTotalSelectedAmount = () => {
      return paidDeliveries
        .filter(delivery => selectedDeliveries.includes(delivery.id))
        .reduce((sum, delivery) => sum + delivery.cost, 0);
    };
    
    const handleWithdraw = async () => {
      if (selectedDeliveries.length === 0) {
        setError('Please select at least one delivery');
        return;
      }
      
      setIsSubmitting(true);
      setError('');
      
      try {
        const res = await fetch('/api/request-withdrawal', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            freelancerId,
            deliveryIds: selectedDeliveries,
            amount: getTotalSelectedAmount()
          })
        });
        
        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.message || 'Failed to submit withdrawal request');
        }
        
        showNotification('Withdrawal request submitted successfully', 'success');
        
        // Refresh the dashboard data to update available amount
        const updatedDashboard = await fetch(`/api/get-dashboard-details?freelancerId=${freelancerId}&timeFrame=${statsTimeFilter}`);
        const updatedData = await updatedDashboard.json();
        setData(updatedData);
        
        setShowWithdrawModal(false);
      } catch (err) {
        console.error('Error processing withdrawal:', err);
        setError(err.message || 'Failed to process withdrawal');
      } finally {
        setIsSubmitting(false);
      }
    };
    
    // Mobile view deliveries card
    const DeliverySelectionCard = ({ delivery }) => {
      const isSelected = selectedDeliveries.includes(delivery.id);
      
      return (
        <div 
          className={`border border-gray-200 rounded-lg p-3 mb-2 ${isSelected ? 'bg-blue-50 border-blue-200' : 'bg-white'}`}
          onClick={() => handleSelectDelivery(delivery.id)}
        >
          <div className="flex items-center">
            <input 
              type="checkbox"
              checked={isSelected}
              onChange={() => handleSelectDelivery(delivery.id)}
              onClick={(e) => e.stopPropagation()}
              className="rounded text-blue-600 focus:ring-blue-500 mr-3"
            />
            <div className="flex-1">
              <p className="font-medium text-gray-900">{delivery.name}</p>
              <div className="flex justify-between mt-1">
                <p className="text-sm text-gray-600">{delivery.client.name}</p>
                <p className="text-sm font-medium">₹{delivery.cost}</p>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                {new Date(delivery.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
      );
    };
    
    if (isLoading) {
      return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-4 sm:p-6 max-w-md w-full mx-4">
            <div className="flex justify-center items-center h-32">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
          </div>
        </div>
      );
    }
    
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-3">
        <div className="bg-white rounded-2xl p-4 sm:p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg sm:text-xl font-semibold">Withdraw Funds</h3>
            <button 
              onClick={() => setShowWithdrawModal(false)}
              className="text-gray-500 hover:text-gray-700 p-1 rounded-full"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <div className="space-y-5">
            {/* Selected Amount */}
            <div className="bg-gray-100 p-4 rounded-xl">
              <p className="text-gray-600 text-sm">Selected for withdrawal</p>
              <p className="text-xl sm:text-2xl font-semibold">₹{getTotalSelectedAmount().toFixed(2)}</p>
            </div>
            
            {/* Deliveries Selection */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-medium text-gray-900">Select Deliveries to Withdraw</h4>
                <button 
                  onClick={handleSelectAll}
                  className="text-sm text-blue-600 hover:text-blue-800"
                >
                  {selectedDeliveries.length === paidDeliveries.length ? 'Deselect All' : 'Select All'}
                </button>
              </div>
              
              {paidDeliveries.length === 0 ? (
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-center text-gray-500">
                  No paid deliveries available for withdrawal
                </div>
              ) : (
                <>
                  {/* Mobile view */}
                  <div className="block sm:hidden">
                    {paidDeliveries.map((delivery) => (
                      <DeliverySelectionCard key={delivery.id} delivery={delivery} />
                    ))}
                  </div>
                  
                  {/* Desktop view */}
                  <div className="hidden sm:block border border-gray-200 rounded-lg overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                            <input 
                              type="checkbox"
                              checked={selectedDeliveries.length === paidDeliveries.length && paidDeliveries.length > 0}
                              onChange={handleSelectAll}
                              className="rounded text-blue-600 focus:ring-blue-500"
                            />
                          </th>
                          <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Delivery</th>
                          <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Client</th>
                          <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                          <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {paidDeliveries.map((delivery) => (
                          <tr 
                            key={delivery.id} 
                            className={`hover:bg-gray-50 ${selectedDeliveries.includes(delivery.id) ? 'bg-blue-50' : ''}`}
                            onClick={() => handleSelectDelivery(delivery.id)}
                          >
                            <td className="px-4 py-3 whitespace-nowrap">
                              <input 
                                type="checkbox"
                                checked={selectedDeliveries.includes(delivery.id)}
                                onChange={() => handleSelectDelivery(delivery.id)}
                                onClick={(e) => e.stopPropagation()}
                                className="rounded text-blue-600 focus:ring-blue-500"
                              />
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap">{delivery.name}</td>
                            <td className="px-4 py-3 whitespace-nowrap">{delivery.client.name}</td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                              {new Date(delivery.createdAt).toLocaleDateString()}
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap font-medium">₹{delivery.cost}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </>
              )}
            </div>
            
            {/* Error message */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm">
                {error}
              </div>
            )}
            
            {/* Submit button */}
            <button
              onClick={handleWithdraw}
              disabled={isSubmitting || selectedDeliveries.length === 0}
              className="w-full bg-blue-600 text-white rounded-lg py-2 font-medium hover:bg-blue-700 transition-colors disabled:bg-blue-300"
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Processing...
                </span>
              ) : (
                `Request Withdrawal (₹${getTotalSelectedAmount().toFixed(2)})`
              )}
            </button>
            
            {/* Withdrawal History */}
            {withdrawalHistory.length > 0 && (
              <div className="mt-4">
                <h4 className="font-medium text-gray-900 mb-3">Withdrawal History</h4>
                <div className="space-y-3">
                  {withdrawalHistory.map((withdrawal) => (
                    <div 
                      key={withdrawal.id} 
                      className="border border-gray-200 rounded-lg p-3"
                    >
                      <div className="flex justify-between items-center mb-2">
                        <p className="font-medium">₹{withdrawal.amount}</p>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          withdrawal.status === 'completed' 
                            ? 'bg-green-100 text-green-800' 
                            : withdrawal.status === 'rejected'
                              ? 'bg-red-100 text-red-800'
                              : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {withdrawal.status.charAt(0).toUpperCase() + withdrawal.status.slice(1)}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500">
                        {new Date(withdrawal.createdAt).toLocaleDateString()} • 
                        {new Date(withdrawal.createdAt).toLocaleTimeString()}
                      </p>
                      {withdrawal.note && (
                        <p className="mt-2 text-sm border-t pt-2 border-gray-100 text-gray-600">
                          {withdrawal.note}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  const UnpaidClientsModal = () => (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-3">
      <div className="bg-white rounded-2xl p-4 sm:p-6 w-full max-w-3xl max-h-[90vh] flex flex-col">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg sm:text-xl font-semibold">Clients with Unpaid Deliveries</h3>
          <button 
            onClick={() => setShowUnpaidClientsModal(false)}
            className="text-gray-500 hover:text-gray-700 p-1 rounded-full"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="overflow-y-auto flex-1">
          {/* Mobile View */}
          <div className="sm:hidden">
            {data.clientsWithUnpaidDeliveries.map((client) => (
              <UnpaidClientCard
                key={client.id}
                client={client}
                onSendReminder={sendSingleReminder}
              />
            ))}
          </div>
          
          {/* Desktop View */}
          <div className="hidden sm:block overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 sticky top-0">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Client Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Number of Deliveries</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total Amount</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {data.clientsWithUnpaidDeliveries.map((client) => (
                  <tr key={client.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">{client.name}</td>
                    <td className="px-6 py-4">{client.deliveriesCount}</td>
                    <td className="px-6 py-4">₹{client.totalAmount}</td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => sendSingleReminder(client.deliveryIds[0], client.id)}
                        className="px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 text-xs flex items-center"
                      >
                        <Send className="w-3 h-3 mr-1" /> Send Reminder
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (!data) return null;

  const { freelancer, stats, unpaidDeliveries, recentDeliveries } = data;

  return (
    <>
      {/* Header with Profile Info */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2 sm:space-x-4">
              {/* Mobile menu button */}
              <button 
                className="p-1.5 rounded-lg text-gray-500 hover:bg-gray-100 sm:hidden"
                onClick={() => setShowMobileMenu(!showMobileMenu)}
              >
                <Menu className="w-5 h-5" />
              </button>
              <h1 className="text-base sm:text-xl font-semibold text-gray-900 truncate">WorkOnGigs Dashboard</h1>
            </div>
            <div className="flex items-center space-x-2 sm:space-x-4">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center overflow-hidden">
                  <img src={freelancer.profileImage} className="object-cover h-8 w-8" alt={freelancer.name} />
                </div>
                <span className="font-medium text-sm ml-2 hidden sm:inline-block">{freelancer.name || 'Update Profile'}</span>
                <Link 
                  href="/freelancer/profile" 
                  className="text-blue-500 hover:text-blue-600 text-sm items-center ml-2 hidden sm:flex"
                >
                  View Profile <ArrowUpRight className="w-3 h-3 ml-1" />
                </Link>
              </div>
              <NotificationBell />
            </div>
          </div>
        </div>
      </div>
    
      <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
        {showWithdrawModal && <WithdrawModal />}
        {showUnpaidClientsModal && <UnpaidClientsModal />}
        
        {/* Main Content Layout */}
        <div className="flex flex-col lg:flex-row gap-4 sm:gap-6">
          {/* Main Content (Recent Deliveries) - 70% */}
          <div className="lg:w-[70%]">
            {/* Recent Deliveries Table */}
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg border border-gray-200 mb-6">
              <div className="p-4 sm:p-6 border-b border-gray-200 flex justify-between items-center">
                <h2 className="text-lg sm:text-xl font-semibold">Recent Deliveries</h2>
                
                <a 
                  href="/freelancer/clients"
                  className="bg-black hover:bg-gray-700 text-white text-xs sm:text-sm py-2 px-3 sm:px-4 rounded-lg flex items-center"
                >
                  Add New Delivery
                </a>
              </div>
              
              {/* Mobile View: Card Layout */}
              <div className="p-4 sm:hidden">
                {recentDeliveries.map((delivery) => (
                  <DeliveryCard 
                    key={delivery.id}
                    delivery={delivery}
                    onSendReminder={sendSingleReminder}
                    onCopyPreviewLink={copyPreviewLink}
                  />
                ))}
              </div>
              
              {/* Desktop View: Table Layout */}
              <div className="hidden sm:block overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Client</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {recentDeliveries.map((delivery) => (
                      <tr key={delivery.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4">{delivery.name}</td>
                        <td className="px-6 py-4">{delivery.client.name}</td>
                        <td className="px-6 py-4">₹{delivery.amount}</td>
                        <td className="px-6 py-4">
                          {new Date(delivery.createdAt).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            delivery.status === 'Paid' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {delivery.status}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          {delivery.status === 'Not Paid' && (
                            <div className="flex space-x-2">
                              <button
                                onClick={() => sendSingleReminder(delivery.id, delivery.client.id)}
                                className="text-blue-500 hover:text-blue-600 transition-colors"
                                title="Send reminder"
                              >
                                <Send className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => copyPreviewLink(delivery.client.id, delivery.name)}
                                className="text-gray-500 hover:text-gray-700 transition-colors"
                                title="Copy preview link"
                              >
                                <Copy className="w-4 h-4" />
                              </button>
                              {copySuccess === delivery.id && (
                                <span className="text-green-500 text-xs">Copied!</span>
                              )}
                            </div>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Right Sidebar - 30% */}
          <div className="lg:w-[30%] space-y-5">
            {/* Earnings Card (First) */}
            <div className="bg-black rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg">
              <h3 className="text-sm font-medium text-gray-300 mb-4">Earnings</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Available to withdraw</span>
                  <span className="text-white font-bold">₹{stats.availableToWithdraw}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Total amount earned</span>
                  <span className="text-white font-bold">₹{stats.totalPaidAmount}</span>
                </div>
                <button 
                  onClick={() => setShowWithdrawModal(true)}
                  className="w-full bg-white text-black rounded-lg py-2 font-medium hover:bg-gray-100 transition-colors"
                >
                  Withdraw ₹{stats.availableToWithdraw}
                </button>
              </div>
            </div>
            
            {/* Support and Contact Card (Second) */}
            <Link 
              href="/freelancer/support"
              className="block bg-black rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg hover:bg-black/90 transition-all group"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base sm:text-lg font-semibold text-white mb-1">Support and Contact Us</h3>
                  <p className="text-sm text-gray-400">Get help and assistance</p>
                </div>
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/10 rounded-xl flex items-center justify-center group-hover:bg-white/20 transition-colors">
                  <HelpCircle className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
              </div>
            </Link>

            {/* Quick Stats Card (Third) */}
            <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg border border-gray-200">
              <div className="flex justify-between items-center mb-4 sm:mb-6">
                <h3 className="text-base sm:text-lg font-semibold">Quick Stats</h3>
                {/* Mobile time filter dropdown */}
                <div className="relative sm:hidden">
                  <button 
                    onClick={() => setShowTimeFilterDropdown(!showTimeFilterDropdown)}
                    className="flex items-center gap-1 px-2 py-1 bg-gray-100 rounded-lg text-xs font-medium"
                  >
                    {statsTimeFilter === '24h' ? '24h' : 
                     statsTimeFilter === '7days' ? '7d' : 
                     statsTimeFilter === '30days' ? '30d' : '3m'}
                    <ChevronDown className="w-3 h-3" />
                  </button>
                  
                  {showTimeFilterDropdown && (
                    <div className="absolute right-0 mt-1 w-24 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
                      <button 
                        onClick={() => {setStatsTimeFilter('24h'); setShowTimeFilterDropdown(false);}}
                        className="block w-full text-left px-3 py-1.5 text-xs hover:bg-gray-100 border-b border-gray-100"
                      >
                        24 Hours
                      </button>
                      <button 
                        onClick={() => {setStatsTimeFilter('7days'); setShowTimeFilterDropdown(false);}}
                        className="block w-full text-left px-3 py-1.5 text-xs hover:bg-gray-100 border-b border-gray-100"
                      >
                        7 Days
                      </button>
                      <button 
                        onClick={() => {setStatsTimeFilter('30days'); setShowTimeFilterDropdown(false);}}
                        className="block w-full text-left px-3 py-1.5 text-xs hover:bg-gray-100 border-b border-gray-100"
                      >
                        30 Days
                      </button>
                      <button 
                        onClick={() => {setStatsTimeFilter('3months'); setShowTimeFilterDropdown(false);}}
                        className="block w-full text-left px-3 py-1.5 text-xs hover:bg-gray-100"
                      >
                        3 Months
                      </button>
                    </div>
                  )}
                </div>
                
                {/* Desktop time filter */}
                <div className="hidden sm:flex items-center bg-gray-100 rounded-lg p-1 text-xs">
                  <button 
                    onClick={() => setStatsTimeFilter('24h')}
                    className={`px-2 py-1 rounded-md ${statsTimeFilter === '24h' ? 'bg-white shadow-sm' : ''}`}
                  >
                    24h
                  </button>
                  <button 
                    onClick={() => setStatsTimeFilter('7days')}
                    className={`px-2 py-1 rounded-md ${statsTimeFilter === '7days' ? 'bg-white shadow-sm' : ''}`}
                  >
                    7d
                  </button>
                  <button 
                    onClick={() => setStatsTimeFilter('30days')}
                    className={`px-2 py-1 rounded-md ${statsTimeFilter === '30days' ? 'bg-white shadow-sm' : ''}`}
                  >
                    30d
                  </button>
                  <button 
                    onClick={() => setStatsTimeFilter('3months')}
                    className={`px-2 py-1 rounded-md ${statsTimeFilter === '3months' ? 'bg-white shadow-sm' : ''}`}
                  >
                    3m
                  </button>
                </div>
              </div>
              
              <div className="space-y-5 sm:space-y-6">
                {/* Total Deliveries */}
                <div className="flex justify-between items-center pb-3 sm:pb-4 border-b border-gray-200">
                  <span className="text-gray-600 text-sm">Total Deliveries</span>
                  <span className="font-semibold">{stats.totalDeliveries}</span>
                </div>
                
                {/* Payment Success Rate */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-600 text-sm">Payment Success Rate</span>
                    <span className="font-semibold">
                      {Math.round((stats.totalPaidAmount / (stats.totalPaidAmount + stats.amountOnHold || 1)) * 100)}%
                    </span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-green-500 rounded-full"
                      style={{ 
                        width: `${Math.round((stats.totalPaidAmount / (stats.totalPaidAmount + stats.amountOnHold || 1)) * 100)}%` 
                      }}
                    />
                  </div>
                </div>

                {/* Average Order Value */}
                <div className="flex justify-between items-center pb-3 sm:pb-4 border-b border-gray-200">
                  <span className="text-gray-600 text-sm">Avg. Order Value</span>
                  <span className="font-semibold">
                    ₹{stats.avgOrderValue || 0}
                  </span>
                </div>

                {/* New Clients Onboarded */}
                <div className="flex justify-between items-center pb-3 sm:pb-4 border-b border-gray-200">
                  <span className="text-gray-600 text-sm">New Clients Onboarded</span>
                  <span className="font-semibold">
                    {stats.newClientsOnboarded}
                  </span>
                </div>
                
                {/* Repeated Clients (From second card) */}
                <div className="flex justify-between items-center pb-3 sm:pb-4 border-b border-gray-200">
                  <span className="text-gray-600 text-sm">Repeated Clients</span>
                  <span className="font-semibold">
                    {stats.repeatedClients}/{stats.totalClients}
                  </span>
                </div>
                
                {/* Unpaid Amount (From third card) */}
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 text-sm">Unpaid Amount</span>
                  <div className="flex flex-col items-end">
                    <span className="font-semibold">₹{stats.amountOnHold}</span>
                    <div className="flex mt-2">
                      <button 
                        onClick={sendReminderToAll}
                        className="bg-black text-white rounded-lg px-2 sm:px-3 py-1 font-medium hover:bg-gray-900 transition-colors shadow-sm text-xs mr-2"
                      >
                        <span className="flex items-center justify-center">
                          Send Reminder
                          <Send className="w-3 h-3 ml-1" />
                        </span>
                      </button>
                      
                      <button 
                        onClick={() => setShowUnpaidClientsModal(true)}
                        className="bg-gray-200 text-gray-800 rounded-lg px-2 sm:px-3 py-1 font-medium hover:bg-gray-300 transition-colors text-xs"
                      >
                        View All
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardContent;