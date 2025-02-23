
"use client"


import React, { useEffect, useState } from 'react';
import { User, FileText, Phone, Mail, ArrowUpRight, Copy, Send, PlusCircle, X } from 'lucide-react';
import { useAuth } from '@/context/authContext';
import Link from 'next/link';
import { useNotification } from "@/components/NotificationProvider";



const DashboardContent = () => {
  const { freelancerId } = useAuth();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [copySuccess, setCopySuccess] = useState('');
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const { showNotification } = useNotification();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!freelancerId) return;
        const res = await fetch(`/api/get-dashboard-details?freelancerId=${freelancerId}`);
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
  }, [freelancerId]);

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

  const copyPreviewLink = async (deliveryId) => {
    const link = `${window.location.origin}/preview/${deliveryId}`;
    try {
      await navigator.clipboard.writeText(link);
      setCopySuccess(deliveryId);
      showNotification('Preview link copied to clipboard', 'success');
      setTimeout(() => setCopySuccess(''), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
      showNotification('Failed to copy link', 'error');
    }
  };

  const WithdrawModal = () => (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 max-w-md w-full mx-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold">Withdraw Funds</h3>
          <button 
            onClick={() => setShowWithdrawModal(false)}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
            <Phone className="w-8 h-8 text-blue-500" />
          </div>
          <p className="text-lg font-medium">Coming Soon!</p>
          <p className="text-gray-600">
            This feature is currently under development. For immediate assistance, please contact us:
          </p>
          <p className="text-blue-500 font-medium">+1 (555) 123-4567</p>
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

  const { freelancer, stats, unpaidDeliveries } = data;

  return (
    <div className="min-h-screen bg-gray-50 p-6 space-y-6">
      {showWithdrawModal && <WithdrawModal />}
      
      {/* Top Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Profile Card */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-black rounded-xl flex items-center justify-center">
              <User className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-black">
              {freelancer.name || 'Update Profile'}
            </h3>
          </div>
          <div className="space-y-2 mb-4">
            <div className="flex items-center text-sm text-gray-600">
              <Phone className="w-4 h-4 mr-2" />
              {freelancer.mobile || 'Add phone number'}
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <Mail className="w-4 h-4 mr-2" />
              {freelancer.email}
            </div>
          </div>
          <Link 
            href="/freelancer/profile" 
            className="flex items-center text-blue-500 hover:text-blue-600 text-sm"
          >
            View Profile <ArrowUpRight className="w-4 h-4 ml-1" />
          </Link>
        </div>

        {/* Active Clients Card */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
          <h3 className="text-sm font-medium text-gray-600 mb-4">Active Clients</h3>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-5xl font-bold">{stats.activeClientsWithUnpaidDeliveries}</span>
            <span className="text-3xl">/</span>
            <span className="text-4xl text-gray-500">{stats.totalClients}</span>
          </div>
          <p className="mt-4 text-base text-gray-500">with unpaid deliveries</p>
        </div>

        {/* Amount on Hold Card */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
          <h3 className="text-sm font-medium text-gray-600 mb-4">Amount on Hold</h3>
          <p className="text-3xl font-bold mb-4">${stats.amountOnHold}</p>
          <button 
            onClick={sendReminderToAll}
            className="w-full mt-6 bg-black text-white rounded-lg py-2 font-medium hover:bg-gray-900 transition-colors shadow-lg"
          >
            <span className="flex items-center justify-center">
              Send Reminder to All
              <span className="ml-2 animate-pulse">
                <Send className="w-4 h-4" />
              </span>
            </span>
          </button>
        </div>

        {/* Earnings Card */}
        <div className="bg-black rounded-2xl p-6 shadow-lg">
          <h3 className="text-sm font-medium text-gray-300 mb-4">Earnings</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Available to withdraw</span>
              <span className="text-white font-bold">${stats.availableToWithdraw}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Total amount earned</span>
              <span className="text-white font-bold">${stats.totalPaidAmount}</span>
            </div>
            <button 
              onClick={() => setShowWithdrawModal(true)}
              className="w-full bg-white text-black rounded-lg py-2 font-medium hover:bg-gray-100 transition-colors"
            >
              Withdraw ${stats.availableToWithdraw}
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Deliveries Table Section */}
       
        <div className="lg:w-[70%] space-y-6">
  <div className="bg-white rounded-2xl shadow-lg border border-gray-200">
    <div className="p-6 border-b border-gray-200">
      <h2 className="text-xl font-semibold">Unpaid Deliveries</h2>
    </div>
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Payment Reminder</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Preview Copy</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {unpaidDeliveries.map((delivery) => (
            <tr key={delivery.id} className="hover:bg-gray-50">
              <td className="px-6 py-4">{delivery.name}</td>
              <td className="px-6 py-4">₹{delivery.amount}</td>
              <td className="px-6 py-4">
                {new Date(delivery.createdAt).toLocaleDateString()}
              </td>
              <td className="px-6 py-4">
                <button
                  onClick={() => sendSingleReminder(delivery.id, delivery.client.id)}
                  className="text-blue-500 hover:text-blue-600 transition-colors"
                  title="Send reminder"
                >
                  <Send className="w-4 h-4" />
                </button>
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => copyPreviewLink(delivery.id)}
                    className="text-gray-500 hover:text-gray-700 transition-colors"
                    title="Copy preview link"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                  {copySuccess === delivery.id && (
                    <span className="text-green-500 text-xs">Copied!</span>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
</div>

     {/* Right Sidebar */}
     <div className="lg:w-[30%] space-y-6">
       {/* Add New Client Button */}
       <Link 
         href="/freelancer/add_new"
         className="block bg-black rounded-2xl p-6 shadow-lg hover:bg-black/90 transition-all group"
       >
         <div className="flex items-center justify-between">
           <div>
             <h3 className="text-lg font-semibold text-white mb-1">Add New Client</h3>
             <p className="text-sm text-gray-400">Create a new client profile</p>
           </div>
           <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center group-hover:bg-white/20 transition-colors">
             <PlusCircle className="w-6 h-6 text-white" />
           </div>
         </div>
       </Link>

       {/* Quick Stats Card */}
       <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
         <h3 className="text-lg font-semibold mb-6">Quick Stats</h3>
         <div className="space-y-6">
           {/* Payment Success Rate */}
           <div>
             <div className="flex justify-between items-center mb-2">
               <span className="text-gray-600">Payment Success Rate</span>
               <span className="font-semibold">
                 {Math.round((stats.totalPaidAmount / (stats.totalPaidAmount + stats.amountOnHold)) * 100)}%
               </span>
             </div>
             <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
               <div 
                 className="h-full bg-green-500 rounded-full"
                 style={{ 
                   width: `${Math.round((stats.totalPaidAmount / (stats.totalPaidAmount + stats.amountOnHold)) * 100)}%` 
                 }}
               />
             </div>
           </div>

           {/* Average Delivery Value */}
           <div className="flex justify-between items-center pb-4 border-b border-gray-200">
             <span className="text-gray-600">Avg. Delivery Value</span>
             <span className="font-semibold">
               ${Math.round((stats.totalPaidAmount + stats.amountOnHold) / 
                 (stats.activeClientsWithUnpaidDeliveries + 1)).toLocaleString()}
             </span>
           </div>

           {/* Total Pending Amount */}
           <div className="flex justify-between items-center pb-4 border-b border-gray-200">
             <span className="text-gray-600">Total Pending</span>
             <span className="font-semibold text-red-500">
               ${stats.amountOnHold.toLocaleString()}
             </span>
           </div>

           {/* Active vs Total Clients */}
           <div className="flex justify-between items-center">
             <span className="text-gray-600">Active/Total Clients</span>
             <span className="font-semibold">
               {stats.activeClientsWithUnpaidDeliveries}/{stats.totalClients}
             </span>
           </div>
         </div>
       </div>

       
     </div>
   </div>
 </div>
);
};

export default DashboardContent;