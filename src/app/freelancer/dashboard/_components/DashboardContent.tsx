
// // "use client"


// // import React, { useEffect, useState } from 'react';
// // import { User, FileText, Phone, Mail, ArrowUpRight, Copy, Send, PlusCircle, X } from 'lucide-react';
// // import { useAuth } from '@/context/authContext';
// // import Link from 'next/link';
// // import { useNotification } from "@/components/NotificationProvider";



// // const DashboardContent = () => {
// //   const { freelancerId } = useAuth();
// //   const [data, setData] = useState(null);
// //   const [loading, setLoading] = useState(true);
// //   const [copySuccess, setCopySuccess] = useState('');
// //   const [showWithdrawModal, setShowWithdrawModal] = useState(false);
// //   const { showNotification } = useNotification();

// //   useEffect(() => {
// //     const fetchData = async () => {
// //       try {
// //         if (!freelancerId) return;
// //         const res = await fetch(`/api/get-dashboard-details?freelancerId=${freelancerId}`);
// //         if (!res.ok) throw new Error('Failed to fetch data');
// //         const jsonData = await res.json();
// //         setData(jsonData);
// //       } catch (err) {
// //         console.error('Error fetching dashboard data:', err);
// //         showNotification('Failed to load dashboard data', 'error');
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     fetchData();
// //   }, [freelancerId]);

// //   const sendReminderToAll = async () => {
// //     try {
// //       const res = await fetch('/api/send-bulk-reminder', {
// //         method: 'POST',
// //         headers: { 'Content-Type': 'application/json' },
// //         body: JSON.stringify({ unpaidDeliveries: data.unpaidDeliveries })
// //       });
// //       if (!res.ok) throw new Error('Failed to send reminders');
// //       showNotification('Payment reminders sent to all clients', 'success');
// //     } catch (err) {
// //       console.error('Error sending reminders:', err);
// //       showNotification('Failed to send reminders', 'error');
// //     }
// //   };

// //   const sendSingleReminder = async (deliveryId, clientId) => {
// //     try {
// //       const res = await fetch('/api/send-single-reminder', {
// //         method: 'POST',
// //         headers: { 'Content-Type': 'application/json' },
// //         body: JSON.stringify({ deliveryId, clientId })
// //       });
// //       if (!res.ok) throw new Error('Failed to send reminder');
// //       showNotification('Payment reminder sent successfully', 'success');
// //     } catch (err) {
// //       console.error('Error sending reminder:', err);
// //       showNotification('Failed to send reminder', 'error');
// //     }
// //   };

// //   const copyPreviewLink = async (deliveryId) => {
// //     const link = `${window.location.origin}/preview/${deliveryId}`;
// //     try {
// //       await navigator.clipboard.writeText(link);
// //       setCopySuccess(deliveryId);
// //       showNotification('Preview link copied to clipboard', 'success');
// //       setTimeout(() => setCopySuccess(''), 2000);
// //     } catch (err) {
// //       console.error('Failed to copy:', err);
// //       showNotification('Failed to copy link', 'error');
// //     }
// //   };

// //   const WithdrawModal = () => (
// //     <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
// //       <div className="bg-white rounded-2xl p-6 max-w-md w-full mx-4">
// //         <div className="flex justify-between items-center mb-4">
// //           <h3 className="text-xl font-semibold">Withdraw Funds</h3>
// //           <button 
// //             onClick={() => setShowWithdrawModal(false)}
// //             className="text-gray-500 hover:text-gray-700"
// //           >
// //             <X className="w-5 h-5" />
// //           </button>
// //         </div>
// //         <div className="text-center space-y-4">
// //           <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
// //             <Phone className="w-8 h-8 text-blue-500" />
// //           </div>
// //           <p className="text-lg font-medium">Coming Soon!</p>
// //           <p className="text-gray-600">
// //             This feature is currently under development. For immediate assistance, please contact us:
// //           </p>
// //           <p className="text-blue-500 font-medium">+1 (555) 123-4567</p>
// //         </div>
// //       </div>
// //     </div>
// //   );

// //   if (loading) {
// //     return (
// //       <div className="min-h-screen flex items-center justify-center">
// //         <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
// //       </div>
// //     );
// //   }

// //   if (!data) return null;

// //   const { freelancer, stats, unpaidDeliveries } = data;

// //   return (
// //     <div className="min-h-screen bg-gray-50 p-6 space-y-6">
// //       {showWithdrawModal && <WithdrawModal />}
      
// //       {/* Top Stats Row */}
// //       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
// //         {/* Profile Card */}
// //         <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
// //           <div className="flex items-center justify-between mb-4">
// //             <div className="w-12 h-12 bg-black rounded-xl flex items-center justify-center overflow-hidden">
            
// //               <img src={freelancer.profileImage} className='object-cover h-12 w-12'/>
// //             </div>
           
// //           </div>
// //           <div className="space-y-2 mb-4">
          
           
// //             <h3 className="text-lg font-semibold text-black">
// //               {freelancer.name || 'Update Profile'}
// //             </h3>
// //             <div className="flex items-center"><Phone className="w-4 h-4 mr-2" />{freelancer.mobile || 'Add phone number'}</div>
// //             </div>
          
// //           <Link 
// //             href="/freelancer/profile" 
// //             className="flex items-center text-blue-500 hover:text-blue-600 text-sm"
// //           >
// //             View Profile <ArrowUpRight className="w-4 h-4 ml-1" />
// //           </Link>
// //         </div>

// //         {/* Active Clients Card */}
// //         <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
// //           <h3 className="text-sm font-medium text-gray-600 mb-4">Active Clients</h3>
// //           <div className="flex items-center gap-2 mb-2">
// //             <span className="text-5xl font-bold">{stats.activeClientsWithUnpaidDeliveries}</span>
// //             <span className="text-3xl">/</span>
// //             <span className="text-4xl text-gray-500">{stats.totalClients}</span>
// //           </div>
// //           <p className="mt-4 text-base text-gray-500">with unpaid deliveries</p>
// //         </div>

// //         {/* Amount on Hold Card */}
// //         <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
// //           <h3 className="text-sm font-medium text-gray-600 mb-4">Unpaid  Amount</h3>
// //           <p className="text-3xl font-bold mb-4">${stats.amountOnHold}</p>

          
// //           <p className="mt-4 text-base text-gray-500">{stats.activeClientsWithUnpaidDeliveries}/{stats.totalClients}  with unpaid deliveries</p>


// //           <button 
// //             onClick={sendReminderToAll}
// //             className="w-full mt-6 bg-black text-white rounded-lg py-2 font-medium hover:bg-gray-900 transition-colors shadow-lg"
// //           >
            
// //             <span className="flex items-center justify-center">
// //               Send Reminder to All
// //               <span className="ml-2 animate-pulse">
// //                 <Send className="w-4 h-4" />
// //               </span>
// //             </span>
// //           </button>
// //         </div>

// //         {/* Earnings Card */}
// //         <div className="bg-black rounded-2xl p-6 shadow-lg">
// //           <h3 className="text-sm font-medium text-gray-300 mb-4">Earnings</h3>
// //           <div className="space-y-4">
// //             <div className="flex justify-between items-center">
// //               <span className="text-gray-400">Available to withdraw</span>
// //               <span className="text-white font-bold">${stats.availableToWithdraw}</span>
// //             </div>
// //             <div className="flex justify-between items-center">
// //               <span className="text-gray-400">Total amount earned</span>
// //               <span className="text-white font-bold">${stats.totalPaidAmount}</span>
// //             </div>
// //             <button 
// //               onClick={() => setShowWithdrawModal(true)}
// //               className="w-full bg-white text-black rounded-lg py-2 font-medium hover:bg-gray-100 transition-colors"
// //             >
// //               Withdraw ${stats.availableToWithdraw}
// //             </button>
// //           </div>
// //         </div>
// //       </div>

// //       {/* Main Content Area */}
// //       <div className="flex flex-col lg:flex-row gap-6">
// //         {/* Deliveries Table Section */}
       
// //         <div className="lg:w-[70%] space-y-6">
// //   <div className="bg-white rounded-2xl shadow-lg border border-gray-200">
// //     <div className="p-6 border-b border-gray-200">
// //       <h2 className="text-xl font-semibold">Unpaid Deliveries</h2>
// //     </div>
// //     <div className="overflow-x-auto">
// //       <table className="w-full">
// //         <thead className="bg-gray-50">
// //           <tr>
// //             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
// //             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
// //             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
// //             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Payment Reminder</th>
// //             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Preview Copy</th>
// //           </tr>
// //         </thead>
// //         <tbody className="divide-y divide-gray-200">
// //           {unpaidDeliveries.map((delivery) => (
// //             <tr key={delivery.id} className="hover:bg-gray-50">
// //               <td className="px-6 py-4">{delivery.name}</td>
// //               <td className="px-6 py-4">₹{delivery.amount}</td>
// //               <td className="px-6 py-4">
// //                 {new Date(delivery.createdAt).toLocaleDateString()}
// //               </td>
// //               <td className="px-6 py-4">
// //                 <button
// //                   onClick={() => sendSingleReminder(delivery.id, delivery.client.id)}
// //                   className="text-blue-500 hover:text-blue-600 transition-colors"
// //                   title="Send reminder"
// //                 >
// //                   <Send className="w-4 h-4" />
// //                 </button>
// //               </td>
// //               <td className="px-6 py-4">
// //                 <div className="flex items-center gap-2">
// //                   <button
// //                     onClick={() => copyPreviewLink(delivery.id)}
// //                     className="text-gray-500 hover:text-gray-700 transition-colors"
// //                     title="Copy preview link"
// //                   >
// //                     <Copy className="w-4 h-4" />
// //                   </button>
// //                   {copySuccess === delivery.id && (
// //                     <span className="text-green-500 text-xs">Copied!</span>
// //                   )}
// //                 </div>
// //               </td>
// //             </tr>
// //           ))}
// //         </tbody>
// //       </table>
// //     </div>
// //   </div>
// // </div>

// //      {/* Right Sidebar */}
// //      <div className="lg:w-[30%] space-y-6">
// //        {/* Add New Client Button */}
// //        <Link 
// //          href="/freelancer/add_new"
// //          className="block bg-black rounded-2xl p-6 shadow-lg hover:bg-black/90 transition-all group"
// //        >
// //          <div className="flex items-center justify-between">
// //            <div>
// //              <h3 className="text-lg font-semibold text-white mb-1">Add New Client</h3>
// //              <p className="text-sm text-gray-400">Create a new client profile</p>
// //            </div>
// //            <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center group-hover:bg-white/20 transition-colors">
// //              <PlusCircle className="w-6 h-6 text-white" />
// //            </div>
// //          </div>
// //        </Link>

// //        {/* Quick Stats Card */}
// //        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
// //          <h3 className="text-lg font-semibold mb-6">Quick Stats</h3>
// //          <div className="space-y-6">
// //            {/* Payment Success Rate */}
// //            <div>
// //              <div className="flex justify-between items-center mb-2">
// //                <span className="text-gray-600">Payment Success Rate</span>
// //                <span className="font-semibold">
// //                  {Math.round((stats.totalPaidAmount / (stats.totalPaidAmount + stats.amountOnHold)) * 100)}%
// //                </span>
// //              </div>
// //              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
// //                <div 
// //                  className="h-full bg-green-500 rounded-full"
// //                  style={{ 
// //                    width: `${Math.round((stats.totalPaidAmount / (stats.totalPaidAmount + stats.amountOnHold)) * 100)}%` 
// //                  }}
// //                />
// //              </div>
// //            </div>

// //            {/* Average Delivery Value */}
// //            <div className="flex justify-between items-center pb-4 border-b border-gray-200">
// //              <span className="text-gray-600">Avg. Delivery Value</span>
// //              <span className="font-semibold">
// //                ${Math.round((stats.totalPaidAmount + stats.amountOnHold) / 
// //                  (stats.activeClientsWithUnpaidDeliveries + 1)).toLocaleString()}
// //              </span>
// //            </div>

// //            {/* Total Pending Amount */}
// //            <div className="flex justify-between items-center pb-4 border-b border-gray-200">
// //              <span className="text-gray-600">Total Pending</span>
// //              <span className="font-semibold text-red-500">
// //                ${stats.amountOnHold.toLocaleString()}
// //              </span>
// //            </div>

// //            {/* Active vs Total Clients */}
// //            <div className="flex justify-between items-center">
// //              <span className="text-gray-600">Active/Total Clients</span>
// //              <span className="font-semibold">
// //                {stats.activeClientsWithUnpaidDeliveries}/{stats.totalClients}
// //              </span>
// //            </div>
// //          </div>
// //        </div>

       
// //      </div>
// //    </div>
// //  </div>
// // );
// // };

// // export default DashboardContent;
// "use client"

// import React, { useEffect, useState } from 'react';
// import { User, FileText, Phone, Mail, ArrowUpRight, Copy, Send, PlusCircle, X, Calendar, Clock, Filter } from 'lucide-react';
// import { useAuth } from '@/context/authContext';
// import Link from 'next/link';
// import { useNotification } from "@/components/NotificationProvider";

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
//       <div className="bg-white rounded-2xl p-6 max-w-3xl w-full mx-4">
//         <div className="flex justify-between items-center mb-4">
//           <h3 className="text-xl font-semibold">Clients with Unpaid Deliveries</h3>
//           <button 
//             onClick={() => setShowUnpaidClientsModal(false)}
//             className="text-gray-500 hover:text-gray-700"
//           >
//             <X className="w-5 h-5" />
//           </button>
//         </div>
//         <div className="overflow-x-auto">
//           <table className="w-full">
//             <thead className="bg-gray-50">
//               <tr>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Client Name</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Number of Deliveries</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total Amount</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Action</th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-gray-200">
//               {data.clientsWithUnpaidDeliveries.map((client) => (
//                 <tr key={client.id} className="hover:bg-gray-50">
//                   <td className="px-6 py-4">{client.name}</td>
//                   <td className="px-6 py-4">{client.deliveriesCount}</td>
//                   <td className="px-6 py-4">₹{client.totalAmount}</td>
//                   <td className="px-6 py-4">
//                     <button
//                       onClick={() => sendSingleReminder(client.deliveryIds[0], client.id)}
//                       className="px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 text-xs flex items-center"
//                     >
//                       <Send className="w-3 h-3 mr-1" /> Send Reminder
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
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
//     <div className="min-h-screen bg-gray-50 p-6 space-y-6">
//       {showWithdrawModal && <WithdrawModal />}
//       {showUnpaidClientsModal && <UnpaidClientsModal />}
      
//       {/* Top Stats Row */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//         {/* Profile Card */}
//         <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
//           <div className="flex items-center justify-between mb-4">
//             <div className="w-12 h-12 bg-black rounded-xl flex items-center justify-center overflow-hidden">
//               <img src={freelancer.profileImage} className='object-cover h-12 w-12'/>
//             </div>
//           </div>
//           <div className="space-y-2 mb-4">
//             <h3 className="text-lg font-semibold text-black">
//               {freelancer.name || 'Update Profile'}
//             </h3>
//             <div className="flex items-center"><Phone className="w-4 h-4 mr-2" />{freelancer.mobile || 'Add phone number'}</div>
//           </div>
          
//           <Link 
//             href="/freelancer/profile" 
//             className="flex items-center text-blue-500 hover:text-blue-600 text-sm"
//           >
//             View Profile <ArrowUpRight className="w-4 h-4 ml-1" />
//           </Link>
//         </div>

//         {/* Repeated Clients Card */}
//         <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
//           <h3 className="text-sm font-medium text-gray-600 mb-4">Clients</h3>
//           <div className="flex items-center gap-2 mb-2">
//             <span className="text-5xl font-bold">{stats.repeatedClients}</span>
//             <span className="text-3xl">/</span>
//             <span className="text-4xl text-gray-500">{stats.totalClients}</span>
//           </div>
//           <p className="mt-4 text-base text-gray-500">repeated clients/total clients</p>
//         </div>

//         {/* Unpaid Amount Card */}
//         <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
//           <h3 className="text-sm font-medium text-gray-600 mb-4">Unpaid Amount</h3>
//           <p className="text-3xl font-bold mb-4">₹{stats.amountOnHold}</p>
          
//           <p className="mt-4 text-base text-gray-500">
//             {stats.activeClientsWithUnpaidDeliveries}/{stats.totalClients} clients with unpaid deliveries
//           </p>

//             <div className="flex gap-2 mt-6">
//               <button 
//                 onClick={sendReminderToAll}
//                 className="bg-black text-white rounded-lg p-3 font-medium hover:bg-gray-900 transition-colors shadow-lg text-sm"
//               >
//                 <span className="flex items-center justify-center">
//                   Send Reminder
//                   <span className="ml-1 animate-pulse">
//                     <Send className="w-3 h-3" />
//                   </span>
//                 </span>
//               </button>
              
//               <button 
//                 onClick={() => setShowUnpaidClientsModal(true)}
//                 className="bg-gray-200 text-gray-800 rounded-lg p-3 font-medium hover:bg-gray-300 transition-colors text-sm"
//               >
//                 View All
//               </button>
//             </div>
//         </div>

//         {/* Earnings Card */}
//         <div className="bg-black rounded-2xl p-6 shadow-lg">
//           <h3 className="text-sm font-medium text-gray-300 mb-4">Earnings</h3>
//           <div className="space-y-4">
//             <div className="flex justify-between items-center">
//               <span className="text-gray-400">Available to withdraw</span>
//               <span className="text-white font-bold">₹{stats.availableToWithdraw}</span>
//             </div>
//             <div className="flex justify-between items-center">
//               <span className="text-gray-400">Total amount earned</span>
//               <span className="text-white font-bold">₹{stats.totalPaidAmount}</span>
//             </div>
//             <button 
//               onClick={() => setShowWithdrawModal(true)}
//               className="w-full bg-white text-black rounded-lg py-2 font-medium hover:bg-gray-100 transition-colors"
//             >
//               Withdraw ₹{stats.availableToWithdraw}
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Main Content Area */}
//       <div className="flex flex-col lg:flex-row gap-6">
//         {/* Recent Deliveries Table Section */}
//         <div className="lg:w-[70%] space-y-6">
//           <div className="bg-white rounded-2xl shadow-lg border border-gray-200">
//             <div className="p-6 border-b border-gray-200">
//               <h2 className="text-xl font-semibold">Recent Deliveries</h2>
//             </div>
//             <div className="overflow-x-auto">
//               <table className="w-full">
//                 <thead className="bg-gray-50">
//                   <tr>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Client</th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody className="divide-y divide-gray-200">
//                   {recentDeliveries.map((delivery) => (
//                     <tr key={delivery.id} className="hover:bg-gray-50">
//                       <td className="px-6 py-4">{delivery.name}</td>
//                       <td className="px-6 py-4">{delivery.client.name}</td>
//                       <td className="px-6 py-4">₹{delivery.amount}</td>
//                       <td className="px-6 py-4">
//                         {new Date(delivery.createdAt).toLocaleDateString()}
//                       </td>
//                       <td className="px-6 py-4">
//                         <span className={`px-2 py-1 rounded-full text-xs ${
//                           delivery.status === 'Paid' 
//                             ? 'bg-green-100 text-green-800' 
//                             : 'bg-yellow-100 text-yellow-800'
//                         }`}>
//                           {delivery.status}
//                         </span>
//                       </td>
//                       <td className="px-6 py-4">
//                         {delivery.status === 'Not Paid' && (
//                           <div className="flex space-x-2">
//                             <button
//                               onClick={() => sendSingleReminder(delivery.id, delivery.client.id)}
//                               className="text-blue-500 hover:text-blue-600 transition-colors"
//                               title="Send reminder"
//                             >
//                               <Send className="w-4 h-4" />
//                             </button>
//                             <button
//                               onClick={() => copyPreviewLink(delivery.id)}
//                               className="text-gray-500 hover:text-gray-700 transition-colors"
//                               title="Copy preview link"
//                             >
//                               <Copy className="w-4 h-4" />
//                             </button>
//                             {copySuccess === delivery.id && (
//                               <span className="text-green-500 text-xs">Copied!</span>
//                             )}
//                           </div>
//                         )}
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         </div>

//         {/* Right Sidebar */}
//         <div className="lg:w-[30%] space-y-6">
//           {/* Add New Client Button */}
//           <Link 
//             href="/freelancer/add_new"
//             className="block bg-black rounded-2xl p-6 shadow-lg hover:bg-black/90 transition-all group"
//           >
//             <div className="flex items-center justify-between">
//               <div>
//                 <h3 className="text-lg font-semibold text-white mb-1">Add New Client</h3>
//                 <p className="text-sm text-gray-400">Create a new client profile</p>
//               </div>
//               <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center group-hover:bg-white/20 transition-colors">
//                 <PlusCircle className="w-6 h-6 text-white" />
//               </div>
//             </div>
//           </Link>

//           {/* Quick Stats Card */}
//           <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
//             <div className="flex justify-between items-center mb-6">
//               <h3 className="text-lg font-semibold">Quick Stats</h3>
//               <div className="flex items-center bg-gray-100 rounded-lg p-1 text-xs">
//                 <button 
//                   onClick={() => setStatsTimeFilter('24h')}
//                   className={`px-2 py-1 rounded-md ${statsTimeFilter === '24h' ? 'bg-white shadow-sm' : ''}`}
//                 >
//                   24h
//                 </button>
//                 <button 
//                   onClick={() => setStatsTimeFilter('7days')}
//                   className={`px-2 py-1 rounded-md ${statsTimeFilter === '7days' ? 'bg-white shadow-sm' : ''}`}
//                 >
//                   7d
//                 </button>
//                 <button 
//                   onClick={() => setStatsTimeFilter('30days')}
//                   className={`px-2 py-1 rounded-md ${statsTimeFilter === '30days' ? 'bg-white shadow-sm' : ''}`}
//                 >
//                   30d
//                 </button>
//                 <button 
//                   onClick={() => setStatsTimeFilter('3months')}
//                   className={`px-2 py-1 rounded-md ${statsTimeFilter === '3months' ? 'bg-white shadow-sm' : ''}`}
//                 >
//                   3m
//                 </button>
//               </div>
//             </div>
            
//             <div className="space-y-6">
//               {/* Total Deliveries */}
//               <div className="flex justify-between items-center pb-4 border-b border-gray-200">
//                 <span className="text-gray-600">Total Deliveries</span>
//                 <span className="font-semibold">{stats.totalDeliveries}</span>
//               </div>
              
//               {/* Payment Success Rate */}
//               <div>
//                 <div className="flex justify-between items-center mb-2">
//                   <span className="text-gray-600">Payment Success Rate</span>
//                   <span className="font-semibold">
//                     {Math.round((stats.totalPaidAmount / (stats.totalPaidAmount + stats.amountOnHold || 1)) * 100)}%
//                   </span>
//                 </div>
//                 <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
//                   <div 
//                     className="h-full bg-green-500 rounded-full"
//                     style={{ 
//                       width: `${Math.round((stats.totalPaidAmount / (stats.totalPaidAmount + stats.amountOnHold || 1)) * 100)}%` 
//                     }}
//                   />
//                 </div>
//               </div>

//               {/* Average Order Value */}
//               <div className="flex justify-between items-center pb-4 border-b border-gray-200">
//                 <span className="text-gray-600">Avg. Order Value</span>
//                 <span className="font-semibold">
//                   ₹{stats.avgOrderValue || 0}
//                 </span>
//               </div>

//               {/* New Clients Onboarded */}
//               <div className="flex justify-between items-center">
//                 <span className="text-gray-600">New Clients Onboarded</span>
//                 <span className="font-semibold">
//                   {stats.newClientsOnboarded}
//                 </span>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DashboardContent;
// "use client"

// import React, { useEffect, useState } from 'react';
// import { 
//   User, FileText, Phone, Mail, ArrowUpRight, Copy, Send, 
//   PlusCircle, X, Calendar, Clock, Filter, Bell, Search
// } from 'lucide-react';
// import { useAuth } from '@/context/authContext';
// import Link from 'next/link';
// import { useNotification } from "@/components/NotificationProvider";
// import NotificationBell from './NotificationBell'
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
//       <div className="bg-white rounded-2xl p-6 max-w-3xl w-full mx-4">
//         <div className="flex justify-between items-center mb-4">
//           <h3 className="text-xl font-semibold">Clients with Unpaid Deliveries</h3>
//           <button 
//             onClick={() => setShowUnpaidClientsModal(false)}
//             className="text-gray-500 hover:text-gray-700"
//           >
//             <X className="w-5 h-5" />
//           </button>
//         </div>
//         <div className="overflow-x-auto">
//           <table className="w-full">
//             <thead className="bg-gray-50">
//               <tr>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Client Name</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Number of Deliveries</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total Amount</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Action</th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-gray-200">
//               {data.clientsWithUnpaidDeliveries.map((client) => (
//                 <tr key={client.id} className="hover:bg-gray-50">
//                   <td className="px-6 py-4">{client.name}</td>
//                   <td className="px-6 py-4">{client.deliveriesCount}</td>
//                   <td className="px-6 py-4">₹{client.totalAmount}</td>
//                   <td className="px-6 py-4">
//                     <button
//                       onClick={() => sendSingleReminder(client.deliveryIds[0], client.id)}
//                       className="px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 text-xs flex items-center"
//                     >
//                       <Send className="w-3 h-3 mr-1" /> Send Reminder
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
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
//     <div className="min-h-screen bg-gray-50">
//       {showWithdrawModal && <WithdrawModal />}
//       {showUnpaidClientsModal && <UnpaidClientsModal />}
      
//       {/* Header Section with Notification Bell */}
//       <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="py-4 flex items-center justify-between">
//             <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
            
//             <div className="flex items-center space-x-4">
//               {/* Search Bar */}
//               <div className="relative hidden md:block">
//                 <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
//                 <input
//                   type="text"
//                   placeholder="Search..."
//                   className="pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:border-black focus:ring-1 focus:ring-black transition-colors text-sm w-60"
//                 />
//               </div>
              
//               {/* Notification Bell Component */}
//               <NotificationBell />
              
//               {/* Profile */}
//               <div className="flex items-center space-x-3">
//                 <div className="w-10 h-10 bg-black rounded-xl flex items-center justify-center overflow-hidden">
//                   <img src={freelancer.profileImage} className='object-cover h-10 w-10' alt={freelancer.name || 'Profile'} />
//                 </div>
//                 <div className="hidden md:block">
//                   <p className="text-sm font-medium text-gray-900">{freelancer.name || 'Update Profile'}</p>
//                   <Link 
//                     href="/freelancer/profile"
//                     className="text-xs text-gray-500 hover:text-black transition-colors"
//                   >
//                     View Profile
//                   </Link>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
      
//       {/* Main Content */}
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
//         {/* Stats Cards */}
//         <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
//           {/* Clients Card */}
//           <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
//             <h3 className="text-sm font-medium text-gray-600 mb-4">Clients</h3>
//             <div className="flex items-center gap-2 mb-2">
//               <span className="text-4xl font-bold">{stats.repeatedClients}</span>
//               <span className="text-2xl">/</span>
//               <span className="text-3xl text-gray-500">{stats.totalClients}</span>
//             </div>
//             <p className="mt-2 text-sm text-gray-500">repeated/total clients</p>
//           </div>

//           {/* Unpaid Amount Card */}
//           <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
//             <h3 className="text-sm font-medium text-gray-600 mb-4">Unpaid Amount</h3>
//             <p className="text-3xl font-bold mb-2">₹{stats.amountOnHold}</p>
//             <p className="text-sm text-gray-500">
//               {stats.activeClientsWithUnpaidDeliveries}/{stats.totalClients} clients with unpaid deliveries
//             </p>
//             <div className="flex gap-2 mt-4">
//               <button 
//                 onClick={sendReminderToAll}
//                 className="bg-black text-white rounded-lg p-2 text-sm font-medium hover:bg-gray-900 transition-colors flex items-center"
//               >
//                 <Send className="w-3 h-3 mr-1" /> Send All
//               </button>
//               <button 
//                 onClick={() => setShowUnpaidClientsModal(true)}
//                 className="bg-gray-100 text-gray-800 rounded-lg p-2 text-sm font-medium hover:bg-gray-200 transition-colors"
//               >
//                 View
//               </button>
//             </div>
//           </div>

//           {/* Earnings Card */}
//           <div className="bg-black rounded-2xl p-6 shadow-lg">
//             <h3 className="text-sm font-medium text-gray-300 mb-4">Earnings</h3>
//             <p className="text-3xl font-bold text-white mb-2">₹{stats.totalPaidAmount}</p>
//             <div className="flex justify-between text-sm text-gray-400">
//               <span>Available:</span>
//               <span className="text-white">₹{stats.availableToWithdraw}</span>
//             </div>
//             <button 
//               onClick={() => setShowWithdrawModal(true)}
//               className="w-full mt-4 bg-white text-black rounded-lg py-2 text-sm font-medium hover:bg-gray-100 transition-colors"
//             >
//               Withdraw
//             </button>
//           </div>

//           {/* Quick Stats Card */}
//           <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
//             <div className="flex justify-between items-center mb-4">
//               <h3 className="text-sm font-medium text-gray-600">Quick Stats</h3>
//               <div className="flex items-center bg-gray-100 rounded-lg p-1 text-xs">
//                 <button 
//                   onClick={() => setStatsTimeFilter('30days')}
//                   className={`px-2 py-1 rounded-md ${statsTimeFilter === '30days' ? 'bg-white shadow-sm' : ''}`}
//                 >
//                   30d
//                 </button>
//                 <button 
//                   onClick={() => setStatsTimeFilter('3months')}
//                   className={`px-2 py-1 rounded-md ${statsTimeFilter === '3months' ? 'bg-white shadow-sm' : ''}`}
//                 >
//                   3m
//                 </button>
//               </div>
//             </div>
//             <div className="grid grid-cols-2 gap-4 text-sm">
//               <div className="bg-gray-50 rounded-lg p-3">
//                 <p className="text-gray-500">Deliveries</p>
//                 <p className="text-2xl font-bold">{stats.totalDeliveries}</p>
//               </div>
//               <div className="bg-gray-50 rounded-lg p-3">
//                 <p className="text-gray-500">Avg. Order</p>
//                 <p className="text-2xl font-bold">₹{stats.avgOrderValue || 0}</p>
//               </div>
//               <div className="bg-gray-50 rounded-lg p-3">
//                 <p className="text-gray-500">Success Rate</p>
//                 <p className="text-2xl font-bold">
//                   {Math.round((stats.totalPaidAmount / (stats.totalPaidAmount + stats.amountOnHold || 1)) * 100)}%
//                 </p>
//               </div>
//               <div className="bg-gray-50 rounded-lg p-3">
//                 <p className="text-gray-500">New Clients</p>
//                 <p className="text-2xl font-bold">{stats.newClientsOnboarded}</p>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Quick Actions */}
//         <div className="flex flex-wrap gap-4">
//           <Link 
//             href="/freelancer/add_new"
//             className="bg-black text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-gray-900 transition-colors"
//           >
//             <PlusCircle className="w-4 h-4" /> New Client
//           </Link>
//           <Link 
//             href="/freelancer/add_delivery"
//             className="bg-white border border-gray-200 text-gray-800 px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-gray-50 transition-colors"
//           >
//             <FileText className="w-4 h-4" /> New Delivery
//           </Link>
//         </div>

//         {/* Main Content Area */}
//         <div className="flex flex-col lg:flex-row gap-6">
//           {/* Recent Deliveries Table Section */}
//           <div className="w-full">
//             <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
//               <div className="p-6 border-b border-gray-200 flex justify-between items-center">
//                 <h2 className="text-xl font-semibold">Recent Deliveries</h2>
//                 <Link
//                   href="/freelancer/deliveries"
//                   className="text-sm text-blue-500 hover:text-blue-700"
//                 >
//                   View All
//                 </Link>
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
//                     {recentDeliveries.slice(0, 5).map((delivery) => (
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
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DashboardContent;
"use client"

import React, { useEffect, useState } from 'react';
import { 
  User, FileText, Phone, Mail, ArrowUpRight, Copy, Send, 
  PlusCircle, X, Calendar, Clock, Filter, Bell  ,HelpCircle
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
      {/* Simple Header with Notification Bell */}
      <div className="bg-white border-b border-gray-200 mb-6 sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-xl font-semibold text-gray-900">WorkOnGigs Dashboard</h1>
            <div className="flex items-center space-x-4">
              <NotificationBell />
            </div>
          </div>
        </div>
      </div>
    
      <div className="min-h-screen bg-gray-50 p-6 space-y-6">
        {showWithdrawModal && <WithdrawModal />}
        {showUnpaidClientsModal && <UnpaidClientsModal />}
        
        {/* Top Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Profile Card */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-black rounded-xl flex items-center justify-center overflow-hidden">
                <img src={freelancer.profileImage} className='object-cover h-12 w-12'/>
              </div>
            </div>
            <div className="space-y-2 mb-4">
              <h3 className="text-lg font-semibold text-black">
                {freelancer.name || 'Update Profile'}
              </h3>
              <div className="flex items-center"><Phone className="w-4 h-4 mr-2" />{freelancer.mobile || 'Add phone number'}</div>
            </div>
            
            <Link 
              href="/freelancer/profile" 
              className="flex items-center text-blue-500 hover:text-blue-600 text-sm"
            >
              View Profile <ArrowUpRight className="w-4 h-4 ml-1" />
            </Link>
          </div>

          {/* Repeated Clients Card */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
            <h3 className="text-sm font-medium text-gray-600 mb-4">Clients</h3>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-5xl font-bold">{stats.repeatedClients}</span>
              <span className="text-3xl">/</span>
              <span className="text-4xl text-gray-500">{stats.totalClients}</span>
            </div>
            <p className="mt-4 text-base text-gray-500">repeated clients/total clients</p>
          </div>

          {/* Unpaid Amount Card */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
            <h3 className="text-sm font-medium text-gray-600 mb-4">Unpaid Amount</h3>
            <p className="text-3xl font-bold mb-4">₹{stats.amountOnHold}</p>
            
            <p className="mt-4 text-base text-gray-500">
              {stats.activeClientsWithUnpaidDeliveries}/{stats.totalClients} clients with unpaid deliveries
            </p>

              <div className="flex gap-2 mt-6">
                <button 
                  onClick={sendReminderToAll}
                  className="bg-black text-white rounded-lg p-3 font-medium hover:bg-gray-900 transition-colors shadow-lg text-sm"
                >
                  <span className="flex items-center justify-center">
                    Send Reminder
                    <span className="ml-1 animate-pulse">
                      <Send className="w-3 h-3" />
                    </span>
                  </span>
                </button>
                
                <button 
                  onClick={() => setShowUnpaidClientsModal(true)}
                  className="bg-gray-200 text-gray-800 rounded-lg p-3 font-medium hover:bg-gray-300 transition-colors text-sm"
                >
                  View All
                </button>
              </div>
          </div>

          {/* Earnings Card */}
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
        </div>

        {/* Main Content Area */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Recent Deliveries Table Section */}
          <div className="lg:w-[70%] space-y-6">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold">Recent Deliveries</h2>
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
                          )}
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

            {/* Quick Stats Card */}
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
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">New Clients Onboarded</span>
                  <span className="font-semibold">
                    {stats.newClientsOnboarded}
                  </span>
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