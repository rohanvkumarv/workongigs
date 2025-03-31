
// "use client"

// import React, { useEffect, useState } from 'react';
// import { 
//   User, FileText, Phone, Mail, ArrowUpRight, Copy, Send, 
//   PlusCircle, X, Calendar, Clock, Filter, Bell, HelpCircle
// } from 'lucide-react';
// import { useAuth } from '@/context/authContext';
// import Link from 'next/link';
// import { useNotification } from "@/components/NotificationProvider";
// import NotificationBell from './NotificationBell';

// const DashboardContent = () => {
//   const { freelancerId } = useAuth();
//   const [data, setData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [copySuccess, setCopySuccess] = useState('');
//   const [showWithdrawModal, setShowWithdrawModal] = useState(false);
//   const [showUnpaidClientsModal, setShowUnpaidClientsModal] = useState(false);
//   const [statsTimeFilter, setStatsTimeFilter] = useState('30days');
//   const { showNotification } = useNotification();

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         if (!freelancerId) return;
//         const res = await fetch(`/api/get-dashboard-details?freelancerId=${freelancerId}&timeFrame=${statsTimeFilter}`);
//         if (!res.ok) throw new Error('Failed to fetch data');
//         const jsonData = await res.json();
//         setData(jsonData);
//       } catch (err) {
//         console.error('Error fetching dashboard data:', err);
//         showNotification('Failed to load dashboard data', 'error');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [freelancerId, statsTimeFilter]);

//   const sendReminderToAll = async () => {
//     try {
//       const res = await fetch('/api/send-bulk-reminder', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ unpaidDeliveries: data.unpaidDeliveries })
//       });
//       if (!res.ok) throw new Error('Failed to send reminders');
//       showNotification('Payment reminders sent to all clients', 'success');
//     } catch (err) {
//       console.error('Error sending reminders:', err);
//       showNotification('Failed to send reminders', 'error');
//     }
//   };

//   const sendSingleReminder = async (deliveryId, clientId) => {
//     try {
//       const res = await fetch('/api/send-single-reminder', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ deliveryId, clientId })
//       });
//       if (!res.ok) throw new Error('Failed to send reminder');
//       showNotification('Payment reminder sent successfully', 'success');
//     } catch (err) {
//       console.error('Error sending reminder:', err);
//       showNotification('Failed to send reminder', 'error');
//     }
//   };

//   const copyPreviewLink = async (deliveryId) => {
//     const link = `${window.location.origin}/preview/${deliveryId}`;
//     try {
//       await navigator.clipboard.writeText(link);
//       setCopySuccess(deliveryId);
//       showNotification('Preview link copied to clipboard', 'success');
//       setTimeout(() => setCopySuccess(''), 2000);
//     } catch (err) {
//       console.error('Failed to copy:', err);
//       showNotification('Failed to copy link', 'error');
//     }
//   };

//   const WithdrawModal = () => (
//     <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
//       <div className="bg-white rounded-2xl p-6 max-w-md w-full mx-4">
//         <div className="flex justify-between items-center mb-4">
//           <h3 className="text-xl font-semibold">Withdraw Funds</h3>
//           <button 
//             onClick={() => setShowWithdrawModal(false)}
//             className="text-gray-500 hover:text-gray-700"
//           >
//             <X className="w-5 h-5" />
//           </button>
//         </div>
//         <div className="text-center space-y-4">
//           <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
//             <Phone className="w-8 h-8 text-blue-500" />
//           </div>
//           <p className="text-lg font-medium">Coming Soon!</p>
//           <p className="text-gray-600">
//             This feature is currently under development. For immediate assistance, please contact us:
//           </p>
//           <p className="text-blue-500 font-medium">+1 (555) 123-4567</p>
//         </div>
//       </div>
//     </div>
//   );

//   const UnpaidClientsModal = () => (
//     <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
//       <div className="bg-white rounded-2xl p-6 max-w-3xl w-full mx-4 max-h-[80vh] flex flex-col">
//         <div className="flex justify-between items-center mb-4">
//           <h3 className="text-xl font-semibold">Clients with Unpaid Deliveries</h3>
//           <button 
//             onClick={() => setShowUnpaidClientsModal(false)}
//             className="text-gray-500 hover:text-gray-700"
//           >
//             <X className="w-5 h-5" />
//           </button>
//         </div>
//         <div className="overflow-y-auto flex-1">
//           <div className="overflow-x-auto">
//             <table className="w-full">
//               <thead className="bg-gray-50 sticky top-0">
//                 <tr>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Client Name</th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Number of Deliveries</th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total Amount</th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Action</th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-gray-200">
//                 {data.clientsWithUnpaidDeliveries.map((client) => (
//                   <tr key={client.id} className="hover:bg-gray-50">
//                     <td className="px-6 py-4">{client.name}</td>
//                     <td className="px-6 py-4">{client.deliveriesCount}</td>
//                     <td className="px-6 py-4">₹{client.totalAmount}</td>
//                     <td className="px-6 py-4">
//                       <button
//                         onClick={() => sendSingleReminder(client.deliveryIds[0], client.id)}
//                         className="px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 text-xs flex items-center"
//                       >
//                         <Send className="w-3 h-3 mr-1" /> Send Reminder
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>
//     </div>
//   );

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
//       </div>
//     );
//   }

//   if (!data) return null;

//   const { freelancer, stats, unpaidDeliveries, recentDeliveries } = data;

//   return (
//     <>
//       {/* Header with Profile Info */}
//       <div className="bg-white border-b border-gray-200 sticky top-0 z-20">
//         <div className="max-w-7xl mx-auto px-4">
//           <div className="flex justify-between items-center h-16">
//             <div className="flex items-center space-x-4">
//               <h1 className="text-xl font-semibold text-gray-900">WorkOnGigs Dashboard</h1>
//             </div>
//             <div className="flex items-center space-x-4">
//               <div className="flex items-center space-x-3">
//                 <div className="flex items-center space-x-2">
//                   <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center overflow-hidden">
//                     <img src={freelancer.profileImage} className="object-cover h-8 w-8" alt={freelancer.name} />
//                   </div>
//                   <span className="font-medium text-sm">{freelancer.name || 'Update Profile'}</span>
//                 </div>
//                 <Link 
//                   href="/freelancer/profile" 
//                   className="text-blue-500 hover:text-blue-600 text-sm flex items-center"
//                 >
//                   View Profile <ArrowUpRight className="w-3 h-3 ml-1" />
//                 </Link>
//               </div>
//               <NotificationBell />
//             </div>
//           </div>
//         </div>
//       </div>
    
//       <div className="min-h-screen bg-gray-50 p-6">
//         {showWithdrawModal && <WithdrawModal />}
//         {showUnpaidClientsModal && <UnpaidClientsModal />}
        
//         {/* Main Content Layout */}
//         <div className="flex flex-col lg:flex-row gap-6">
//           {/* Main Content (Recent Deliveries) - 70% */}
//           <div className="lg:w-[70%]">
//             {/* Recent Deliveries Table */}
//             <div className="bg-white rounded-2xl shadow-lg border border-gray-200 mb-6">
//               <div className="p-6 border-b border-gray-200">
//                 <h2 className="text-xl font-semibold">Recent Deliveries</h2>
//               </div>
//               <div className="overflow-x-auto">
//                 <table className="w-full">
//                   <thead className="bg-gray-50">
//                     <tr>
//                       <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
//                       <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Client</th>
//                       <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
//                       <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
//                       <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
//                       <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
//                     </tr>
//                   </thead>
//                   <tbody className="divide-y divide-gray-200">
//                     {recentDeliveries.map((delivery) => (
//                       <tr key={delivery.id} className="hover:bg-gray-50">
//                         <td className="px-6 py-4">{delivery.name}</td>
//                         <td className="px-6 py-4">{delivery.client.name}</td>
//                         <td className="px-6 py-4">₹{delivery.amount}</td>
//                         <td className="px-6 py-4">
//                           {new Date(delivery.createdAt).toLocaleDateString()}
//                         </td>
//                         <td className="px-6 py-4">
//                           <span className={`px-2 py-1 rounded-full text-xs ${
//                             delivery.status === 'Paid' 
//                               ? 'bg-green-100 text-green-800' 
//                               : 'bg-yellow-100 text-yellow-800'
//                           }`}>
//                             {delivery.status}
//                           </span>
//                         </td>
//                         <td className="px-6 py-4">
//                           {delivery.status === 'Not Paid' && (
//                             <div className="flex space-x-2">
//                               <button
//                                 onClick={() => sendSingleReminder(delivery.id, delivery.client.id)}
//                                 className="text-blue-500 hover:text-blue-600 transition-colors"
//                                 title="Send reminder"
//                               >
//                                 <Send className="w-4 h-4" />
//                               </button>
//                               <button
//                                 onClick={() => copyPreviewLink(delivery.id)}
//                                 className="text-gray-500 hover:text-gray-700 transition-colors"
//                                 title="Copy preview link"
//                               >
//                                 <Copy className="w-4 h-4" />
//                               </button>
//                               {copySuccess === delivery.id && (
//                                 <span className="text-green-500 text-xs">Copied!</span>
//                               )}
//                             </div>
//                           )}
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//           </div>

//           {/* Right Sidebar - 30% */}
//           <div className="lg:w-[30%] space-y-6">
//             {/* Earnings Card (First) */}
//             <div className="bg-black rounded-2xl p-6 shadow-lg">
//               <h3 className="text-sm font-medium text-gray-300 mb-4">Earnings</h3>
//               <div className="space-y-4">
//                 <div className="flex justify-between items-center">
//                   <span className="text-gray-400">Available to withdraw</span>
//                   <span className="text-white font-bold">₹{stats.availableToWithdraw}</span>
//                 </div>
//                 <div className="flex justify-between items-center">
//                   <span className="text-gray-400">Total amount earned</span>
//                   <span className="text-white font-bold">₹{stats.totalPaidAmount}</span>
//                 </div>
//                 <button 
//                   onClick={() => setShowWithdrawModal(true)}
//                   className="w-full bg-white text-black rounded-lg py-2 font-medium hover:bg-gray-100 transition-colors"
//                 >
//                   Withdraw ₹{stats.availableToWithdraw}
//                 </button>
//               </div>
//             </div>
            
//             {/* Support and Contact Card (Second) */}
//             <Link 
//               href="/freelancer/support"
//               className="block bg-black rounded-2xl p-6 shadow-lg hover:bg-black/90 transition-all group"
//             >
//               <div className="flex items-center justify-between">
//                 <div>
//                   <h3 className="text-lg font-semibold text-white mb-1">Support and Contact Us</h3>
//                   <p className="text-sm text-gray-400">Get help and assistance</p>
//                 </div>
//                 <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center group-hover:bg-white/20 transition-colors">
//                   <HelpCircle className="w-6 h-6 text-white" />
//                 </div>
//               </div>
//             </Link>

//             {/* Quick Stats Card (Third) */}
//             <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
//               <div className="flex justify-between items-center mb-6">
//                 <h3 className="text-lg font-semibold">Quick Stats</h3>
//                 <div className="flex items-center bg-gray-100 rounded-lg p-1 text-xs">
//                   <button 
//                     onClick={() => setStatsTimeFilter('24h')}
//                     className={`px-2 py-1 rounded-md ${statsTimeFilter === '24h' ? 'bg-white shadow-sm' : ''}`}
//                   >
//                     24h
//                   </button>
//                   <button 
//                     onClick={() => setStatsTimeFilter('7days')}
//                     className={`px-2 py-1 rounded-md ${statsTimeFilter === '7days' ? 'bg-white shadow-sm' : ''}`}
//                   >
//                     7d
//                   </button>
//                   <button 
//                     onClick={() => setStatsTimeFilter('30days')}
//                     className={`px-2 py-1 rounded-md ${statsTimeFilter === '30days' ? 'bg-white shadow-sm' : ''}`}
//                   >
//                     30d
//                   </button>
//                   <button 
//                     onClick={() => setStatsTimeFilter('3months')}
//                     className={`px-2 py-1 rounded-md ${statsTimeFilter === '3months' ? 'bg-white shadow-sm' : ''}`}
//                   >
//                     3m
//                   </button>
//                 </div>
//               </div>
              
//               <div className="space-y-6">
//                 {/* Total Deliveries */}
//                 <div className="flex justify-between items-center pb-4 border-b border-gray-200">
//                   <span className="text-gray-600">Total Deliveries</span>
//                   <span className="font-semibold">{stats.totalDeliveries}</span>
//                 </div>
                
//                 {/* Payment Success Rate */}
//                 <div>
//                   <div className="flex justify-between items-center mb-2">
//                     <span className="text-gray-600">Payment Success Rate</span>
//                     <span className="font-semibold">
//                       {Math.round((stats.totalPaidAmount / (stats.totalPaidAmount + stats.amountOnHold || 1)) * 100)}%
//                     </span>
//                   </div>
//                   <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
//                     <div 
//                       className="h-full bg-green-500 rounded-full"
//                       style={{ 
//                         width: `${Math.round((stats.totalPaidAmount / (stats.totalPaidAmount + stats.amountOnHold || 1)) * 100)}%` 
//                       }}
//                     />
//                   </div>
//                 </div>

//                 {/* Average Order Value */}
//                 <div className="flex justify-between items-center pb-4 border-b border-gray-200">
//                   <span className="text-gray-600">Avg. Order Value</span>
//                   <span className="font-semibold">
//                     ₹{stats.avgOrderValue || 0}
//                   </span>
//                 </div>

//                 {/* New Clients Onboarded */}
//                 <div className="flex justify-between items-center pb-4 border-b border-gray-200">
//                   <span className="text-gray-600">New Clients Onboarded</span>
//                   <span className="font-semibold">
//                     {stats.newClientsOnboarded}
//                   </span>
//                 </div>
                
//                 {/* Repeated Clients (From second card) */}
//                 <div className="flex justify-between items-center pb-4 border-b border-gray-200">
//                   <span className="text-gray-600">Repeated Clients</span>
//                   <span className="font-semibold">
//                     {stats.repeatedClients}/{stats.totalClients}
//                   </span>
//                 </div>
                
//                 {/* Unpaid Amount (From third card) */}
//                 <div className="flex justify-between items-center">
//                   <span className="text-gray-600">Unpaid Amount</span>
//                   <div className="flex flex-col items-end">
//                     <span className="font-semibold">₹{stats.amountOnHold}</span>
//                     <div className="flex mt-2">
//                       <button 
//                         onClick={sendReminderToAll}
//                         className="bg-black text-white rounded-lg px-3 py-1 font-medium hover:bg-gray-900 transition-colors shadow-sm text-xs mr-2"
//                       >
//                         <span className="flex items-center justify-center">
//                           Send Reminder
//                           <Send className="w-3 h-3 ml-1" />
//                         </span>
//                       </button>
                      
//                       <button 
//                         onClick={() => setShowUnpaidClientsModal(true)}
//                         className="bg-gray-200 text-gray-800 rounded-lg px-3 py-1 font-medium hover:bg-gray-300 transition-colors text-xs"
//                       >
//                         View All
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default DashboardContent;

"use client"

import React, { useEffect, useState } from 'react';
import { 
  User, FileText, Phone, Mail, ArrowUpRight, Copy, Send, 
  PlusCircle, X, Calendar, Clock, Filter, Bell, HelpCircle
} from 'lucide-react';
import { useAuth } from '@/context/authContext';
import Link from 'next/link';
import { useNotification } from "@/components/NotificationProvider";
import NotificationBell from './NotificationBell';

const DashboardContent = () => {
  const { freelancerId } = useAuth();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [copySuccess, setCopySuccess] = useState('');
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [showUnpaidClientsModal, setShowUnpaidClientsModal] = useState(false);
  const [statsTimeFilter, setStatsTimeFilter] = useState('30days');
  const { showNotification } = useNotification();

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

  // const copyPreviewLink = async (deliveryId) => {
  //   const link = `${window.location.origin}/preview/${deliveryId}`;
  //   try {
  //     await navigator.clipboard.writeText(link);
  //     setCopySuccess(deliveryId);
  //     showNotification('Preview link copied to clipboard', 'success');
  //     setTimeout(() => setCopySuccess(''), 2000);
  //   } catch (err) {
  //     console.error('Failed to copy:', err);
  //     showNotification('Failed to copy link', 'error');
  //   }
  // };

  // const copyPreviewLink = (clientId, deliveryName) => {
  //   const previewLink = `${window.location.origin}/${clientId}/preview?delivery=${encodeURIComponent(deliveryName)}`;
  //   navigator.clipboard.writeText(previewLink);
  //   showNotification('Preview link copied to clipboard', 'success');
  // };
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
    
    if (isLoading) {
      return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full mx-4">
            <div className="flex justify-center items-center h-32">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
          </div>
        </div>
      );
    }
    
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div className="bg-white rounded-2xl p-6 max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold">Withdraw Funds</h3>
            <button 
              onClick={() => setShowWithdrawModal(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <div className="space-y-6">
            {/* Selected Amount */}
            <div className="bg-gray-100 p-4 rounded-xl">
              <p className="text-gray-600 text-sm">Selected for withdrawal</p>
              <p className="text-2xl font-semibold">₹{getTotalSelectedAmount().toFixed(2)}</p>
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
                <div className="border border-gray-200 rounded-lg overflow-hidden">
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
              <div className="mt-6">
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
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 max-w-3xl w-full mx-4 max-h-[80vh] flex flex-col">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold">Clients with Unpaid Deliveries</h3>
          <button 
            onClick={() => setShowUnpaidClientsModal(false)}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="overflow-y-auto flex-1">
          <div className="overflow-x-auto">
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
            <div className="flex items-center space-x-4">
              <h1 className="text-xl font-semibold text-gray-900">WorkOnGigs Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center overflow-hidden">
                    <img src={freelancer.profileImage} className="object-cover h-8 w-8" alt={freelancer.name} />
                  </div>
                  <span className="font-medium text-sm">{freelancer.name || 'Update Profile'}</span>
                </div>
                <Link 
                  href="/freelancer/profile" 
                  className="text-blue-500 hover:text-blue-600 text-sm flex items-center"
                >
                  View Profile <ArrowUpRight className="w-3 h-3 ml-1" />
                </Link>
              </div>
              <NotificationBell />
            </div>
          </div>
        </div>
      </div>
    
      <div className="min-h-screen bg-gray-50 p-6">
        {showWithdrawModal && <WithdrawModal />}
        {showUnpaidClientsModal && <UnpaidClientsModal />}
        
        {/* Main Content Layout */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Main Content (Recent Deliveries) - 70% */}
          <div className="lg:w-[70%]">
            {/* Recent Deliveries Table */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 mb-6">
              <div className="p-6 border-b border-gray-200 flex justify-between items-center">
                <h2 className="text-xl font-semibold">Recent Deliveries</h2>
                
                  <a 
                  href="/freelancer/chat"
                  className="bg-black hover:bg-gray-700 text-white text-sm py-2 px-4 rounded-lg">Add New Client</a>
              </div>
              <div className="overflow-x-auto">
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
                              {/* <button
                                // onClick={() => copyPreviewLink(delivery.id)}
                                 onClick={() => copyPreviewLink(selectedClient.id, delivery.name)}
                                className="text-gray-500 hover:text-gray-700 transition-colors"
                                title="Copy preview link"
                              >
                                <Copy className="w-4 h-4" />
                              </button> */}
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
          <div className="lg:w-[30%] space-y-6">
            {/* Earnings Card (First) */}
            <div className="bg-black rounded-2xl p-6 shadow-lg">
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
              className="block bg-black rounded-2xl p-6 shadow-lg hover:bg-black/90 transition-all group"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-1">Support and Contact Us</h3>
                  <p className="text-sm text-gray-400">Get help and assistance</p>
                </div>
                <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center group-hover:bg-white/20 transition-colors">
                  <HelpCircle className="w-6 h-6 text-white" />
                </div>
              </div>
            </Link>

            {/* Quick Stats Card (Third) */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold">Quick Stats</h3>
                <div className="flex items-center bg-gray-100 rounded-lg p-1 text-xs">
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
              
              <div className="space-y-6">
                {/* Total Deliveries */}
                <div className="flex justify-between items-center pb-4 border-b border-gray-200">
                  <span className="text-gray-600">Total Deliveries</span>
                  <span className="font-semibold">{stats.totalDeliveries}</span>
                </div>
                
                {/* Payment Success Rate */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-600">Payment Success Rate</span>
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
                <div className="flex justify-between items-center pb-4 border-b border-gray-200">
                  <span className="text-gray-600">Avg. Order Value</span>
                  <span className="font-semibold">
                    ₹{stats.avgOrderValue || 0}
                  </span>
                </div>

                {/* New Clients Onboarded */}
                <div className="flex justify-between items-center pb-4 border-b border-gray-200">
                  <span className="text-gray-600">New Clients Onboarded</span>
                  <span className="font-semibold">
                    {stats.newClientsOnboarded}
                  </span>
                </div>
                
                {/* Repeated Clients (From second card) */}
                <div className="flex justify-between items-center pb-4 border-b border-gray-200">
                  <span className="text-gray-600">Repeated Clients</span>
                  <span className="font-semibold">
                    {stats.repeatedClients}/{stats.totalClients}
                  </span>
                </div>
                
                {/* Unpaid Amount (From third card) */}
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Unpaid Amount</span>
                  <div className="flex flex-col items-end">
                    <span className="font-semibold">₹{stats.amountOnHold}</span>
                    <div className="flex mt-2">
                      <button 
                        onClick={sendReminderToAll}
                        className="bg-black text-white rounded-lg px-3 py-1 font-medium hover:bg-gray-900 transition-colors shadow-sm text-xs mr-2"
                      >
                        <span className="flex items-center justify-center">
                          Send Reminder
                          <Send className="w-3 h-3 ml-1" />
                        </span>
                      </button>
                      
                      <button 
                        onClick={() => setShowUnpaidClientsModal(true)}
                        className="bg-gray-200 text-gray-800 rounded-lg px-3 py-1 font-medium hover:bg-gray-300 transition-colors text-xs"
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