
// // "use client"
// // import React, { useState, useEffect } from 'react';
// // import { Plus } from 'lucide-react';
// // import { useParams, useRouter } from 'next/navigation';
// // import Link from 'next/link';
// // import { useAuth } from '@/context/authContext';

// // const ClientDetailsPage = () => {
// //   const [client, setClient] = useState(null);
// //   const [loading, setLoading] = useState(true);
// //   const router = useRouter();
  
// //   const params = useParams();
// //   const clientId = params.id;
// //   const { freelancerId } = useAuth();

// //   useEffect(() => {
// //     const fetchClientDetails = async () => {
// //       try {
// //         const response = await fetch(`/api/get-client-details`, {
// //           method: 'POST',
// //           headers: { 'Content-Type': 'application/json' },
// //           body: JSON.stringify({ clientId })
// //         });
        
// //         const data = await response.json();
// //         if (!response.ok) throw new Error(data.error || 'Failed to fetch client');
// //         setClient(data);
// //       } catch (error) {
// //         console.error('Error:', error);
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     if (clientId) fetchClientDetails();
// //   }, [clientId]);

// //   const calculatePaidAmount = (deliveries) => {
// //     return deliveries
// //       .filter(delivery => delivery.PaymentStatus === 'Paid')
// //       .reduce((sum, delivery) => sum + delivery.cost, 0);
// //   };

// //   if (loading) {
// //     return (
// //       <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8 flex items-center justify-center">
// //         Loading...
// //       </div>
// //     );
// //   }

// //   if (!client) {
// //     return (
// //       <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8 flex items-center justify-center">
// //         Client not found
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-8 relative">
// //       {/* Header Card */}
// //       <div className="max-w-7xl mx-auto mb-6">
// //         <div className="bg-white rounded-2xl shadow-xl border border-gray-200/50 backdrop-blur-sm p-4 md:p-6">
// //           <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
// //             <div className="flex items-center gap-4">
// //               <div className="w-12 h-12 bg-black rounded-xl flex items-center justify-center shadow-lg">
// //                 <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
// //                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
// //                 </svg>
// //               </div>
// //               <div>
// //                 <h1 className="text-xl font-semibold text-gray-900">{client.name}</h1>
// //                 <div className="flex items-center gap-2 mt-1 flex-wrap">
// //                   <span className="bg-blue-50 px-2 py-0.5 rounded-md text-xs font-medium text-blue-600 border border-blue-100">
// //                     {client.modeOfPay}
// //                   </span>
// //                   <span className="bg-gray-50 px-2 py-0.5 rounded-md text-xs font-medium text-gray-600 border border-gray-100">
// //                     {client.status}
// //                   </span>
// //                   {client.email && (
// //                     <span className="bg-purple-50 px-2 py-0.5 rounded-md text-xs font-medium text-purple-600 border border-purple-100">
// //                       {client.email}
// //                     </span>
// //                   )}
// //                   {client.phone && (
// //                     <span className="bg-emerald-50 px-2 py-0.5 rounded-md text-xs font-medium text-emerald-600 border border-emerald-100">
// //                       {client.phone}
// //                     </span>
// //                   )}
// //                   <Link 
// //                     href={`/${clientId}/preview`}
// //                     className="bg-black text-white px-2 py-0.5 rounded-md text-xs font-medium hover:bg-gray-800 transition-colors"
// //                   >
// //                     Open Preview
// //                   </Link>
// //                 </div>
// //               </div>
// //             </div>

// //             <div className="flex items-center gap-4 md:gap-8">
// //               <div className="text-left md:text-right">
// //                 <p className="text-sm text-gray-500">Amount (Paid/Total)</p>
// //                 <div className="flex items-baseline gap-2">
// //                   <p className="text-lg font-semibold text-emerald-600">
// //                     ₹{calculatePaidAmount(client.deliveries).toLocaleString()}
// //                   </p>
// //                   <p className="text-sm text-gray-500">
// //                     / ₹{client.deliveries.reduce((sum, delivery) => sum + delivery.cost, 0).toLocaleString()}
// //                   </p>
// //                 </div>
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       </div>

// //       {/* Deliveries Section */}
// //       <div className="max-w-7xl mx-auto">
// //         <div className="bg-white rounded-2xl shadow-xl border border-gray-200/50 backdrop-blur-sm overflow-hidden">
// //           {/* Mobile View */}
// //           <div className="block md:hidden">
// //             {client.deliveries.map((delivery, index) => (
// //               <div key={index} className="p-4 border-b border-gray-200 last:border-b-0">
// //                 <div className="flex items-center justify-between mb-2">
// //                   <div className="font-medium text-gray-900">{delivery.name}</div>
// //                   <span className={`px-3 py-1 rounded-full text-sm font-medium ${
// //                     delivery.PaymentStatus === 'Not Paid' 
// //                       ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
// //                       : 'bg-gray-50 text-gray-700 border border-gray-200'
// //                   }`}>
// //                     {delivery.PaymentStatus}
// //                   </span>
// //                 </div>
// //                 <div className="space-y-1 text-sm">
// //                   <div className="flex justify-between">
// //                     <span className="text-gray-600">Files:</span>
// //                     <span>{delivery.files?.length || 0} files</span>
// //                   </div>
// //                   <div className="flex justify-between">
// //                     <span className="text-gray-600">Date:</span>
// //                     <span>{new Date(delivery.createdAt).toLocaleDateString()}</span>
// //                   </div>
// //                   <div className="flex justify-between">
// //                     <span className="text-gray-600">Cost:</span>
// //                     <span className="font-medium">₹{delivery.cost.toLocaleString()}</span>
// //                   </div>
// //                   <div className="flex justify-between">
// //                     <span className="text-gray-600">Description:</span>
// //                     <span className="text-right flex-1 ml-4 group relative">
// //                       {delivery.desc}
// //                       <span className="absolute bottom-full right-0 mb-2 w-48 p-2 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-50">
// //                         {delivery.desc}
// //                       </span>
// //                     </span>
// //                   </div>
// //                 </div>
// //               </div>
// //             ))}
// //           </div>

// //           {/* Desktop View */}
// //           <div className="hidden md:block">
// //             <div className="px-8 py-4 border-b border-gray-200 bg-gray-50">
// //               <div className="grid grid-cols-6 gap-4">
// //                 <div className="text-sm font-medium text-gray-500">Name</div>
// //                 <div className="text-sm font-medium text-gray-500">Files</div>
// //                 <div className="text-sm font-medium text-gray-500">Description</div>
// //                 <div className="text-sm font-medium text-gray-500">Date</div>
// //                 <div className="text-sm font-medium text-gray-500">Payment Status</div>
// //                 <div className="text-sm font-medium text-gray-500">Cost</div>
// //               </div>
// //             </div>

// //             <div className="divide-y divide-gray-200">
// //               {client.deliveries.map((delivery, index) => (
// //                 <div key={index} className="px-8 py-4 hover:bg-gray-50/50 transition-all">
// //                   <div className="grid grid-cols-6 gap-4 items-center">
// //                     <div className="font-medium text-gray-900">{delivery.name}</div>
// //                     <div className="text-gray-600">{delivery.files?.length || 0} files</div>
// //                     <div className="text-gray-600 truncate group relative" title={delivery.desc}>
// //                       {delivery.desc}
// //                       <span className="absolute bottom-full left-0 mb-2 w-64 p-2 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-50 whitespace-normal">
// //                         {delivery.desc}
// //                       </span>
// //                     </div>
// //                     <div className="text-gray-600">
// //                       {new Date(delivery.createdAt).toLocaleDateString()}
// //                     </div>
// //                     <div>
// //                       <span className={`px-3 py-1 rounded-full text-sm font-medium ${
// //                         delivery.PaymentStatus === 'Not Paid' 
// //                           ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
// //                           : 'bg-gray-50 text-gray-700 border border-gray-200'
// //                       }`}>
// //                         {delivery.PaymentStatus}
// //                       </span>
// //                     </div>
// //                     <div className="text-gray-900 font-medium">
// //                       ₹{delivery.cost.toLocaleString()}
// //                     </div>
// //                   </div>
// //                 </div>
// //               ))}
// //             </div>
// //           </div>
// //         </div>
// //       </div>

// //       {/* Floating Action Button */}
// //       <button
// //         onClick={() => router.push('/freelancer/create_new_delivery')}
// //         className="fixed bottom-4 right-4 md:bottom-8 md:right-8 w-14 h-14 bg-black text-white rounded-full shadow-lg 
// //                  hover:shadow-xl transition-all flex items-center justify-center group z-40"
// //       >
// //         <Plus className="w-6 h-6 group-hover:rotate-90 transition-transform duration-200" />
// //       </button>
// //     </div>
// //   );
// // };

// // export default ClientDetailsPage;
// "use client"
// import React, { useState, useEffect } from 'react';
// import { Plus, Copy } from 'lucide-react';
// import { useParams, useRouter } from 'next/navigation';
// import Link from 'next/link';
// import { useAuth } from '@/context/authContext';
// import Alert from '@/components/Alert';

// const ClientDetailsPage = () => {
//   const [client, setClient] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [alert, setAlert] = useState({ show: false, message: '', type: 'success' });
//   const router = useRouter();
  
//   const params = useParams();
//   const clientId = params.id;
//   const { freelancerId } = useAuth();

//   // ... rest of your state and effects remain the same ...

//   const copyPreviewLink = (deliveryName) => {
//     const previewLink = `${window.location.origin}/${clientId}/preview?delivery=${encodeURIComponent(deliveryName)}`;
//     navigator.clipboard.writeText(previewLink);
//     setAlert({
//       show: true,
//       message: 'Preview link copied to clipboard!',
//       type: 'success'
//     });
//     setTimeout(() => setAlert({ ...alert, show: false }), 3000);
//   };

//   // Update the mobile view delivery item
//   const MobileDeliveryItem = ({ delivery }) => (
//     <div className="p-4 border-b border-gray-200 last:border-b-0">
//       <div className="flex items-center justify-between mb-2">
//         <div className="font-medium text-gray-900">{delivery.name}</div>
//         <span className={`px-3 py-1 rounded-full text-sm font-medium ${
//           delivery.PaymentStatus === 'Not Paid' 
//             ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
//             : 'bg-gray-50 text-gray-700 border border-gray-200'
//         }`}>
//           {delivery.PaymentStatus}
//         </span>
//       </div>
//       <div className="space-y-1 text-sm">
//         <div className="flex justify-between">
//           <span className="text-gray-600">Files:</span>
//           <span>{delivery.files?.length || 0} files</span>
//         </div>
//         <div className="flex justify-between">
//           <span className="text-gray-600">Date:</span>
//           <span>{new Date(delivery.createdAt).toLocaleDateString()}</span>
//         </div>
//         <div className="flex justify-between">
//           <span className="text-gray-600">Cost:</span>
//           <span className="font-medium">₹{delivery.cost.toLocaleString()}</span>
//         </div>
//         <div className="flex justify-between">
//           <span className="text-gray-600">Description:</span>
//           <span className="text-right flex-1 ml-4 group relative">
//             {delivery.desc}
//             <span className="absolute bottom-full right-0 mb-2 w-48 p-2 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-50">
//               {delivery.desc}
//             </span>
//           </span>
//         </div>
//         <div className="mt-3 flex justify-end">
//           <button
//             onClick={() => copyPreviewLink(delivery.name)}
//             className="p-2 bg-white hover:bg-gray-50 rounded-lg transition-all border border-gray-200 shadow-sm"
//           >
//             <Copy className="w-4 h-4 text-gray-600" />
//           </button>
//         </div>
//       </div>
//     </div>
//   );

//   // Update the desktop view table header
//   const DesktopHeader = () => (
//     <div className="px-8 py-4 border-b border-gray-200 bg-gray-50">
//       <div className="grid grid-cols-7 gap-4">
//         <div className="text-sm font-medium text-gray-500">Name</div>
//         <div className="text-sm font-medium text-gray-500">Files</div>
//         <div className="text-sm font-medium text-gray-500">Description</div>
//         <div className="text-sm font-medium text-gray-500">Date</div>
//         <div className="text-sm font-medium text-gray-500">Payment Status</div>
//         <div className="text-sm font-medium text-gray-500">Cost</div>
//         <div className="text-sm font-medium text-gray-500 text-center">Preview Link</div>
//       </div>
//     </div>
//   );

//   // Update the desktop view delivery row
//   const DesktopDeliveryRow = ({ delivery }) => (
//     <div className="px-8 py-4 hover:bg-gray-50/50 transition-all">
//       <div className="grid grid-cols-7 gap-4 items-center">
//         <div className="font-medium text-gray-900">{delivery.name}</div>
//         <div className="text-gray-600">{delivery.files?.length || 0} files</div>
//         <div className="text-gray-600 truncate group relative" title={delivery.desc}>
//           {delivery.desc}
//           <span className="absolute bottom-full left-0 mb-2 w-64 p-2 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-50 whitespace-normal">
//             {delivery.desc}
//           </span>
//         </div>
//         <div className="text-gray-600">
//           {new Date(delivery.createdAt).toLocaleDateString()}
//         </div>
//         <div>
//           <span className={`px-3 py-1 rounded-full text-sm font-medium ${
//             delivery.PaymentStatus === 'Not Paid' 
//               ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
//               : 'bg-gray-50 text-gray-700 border border-gray-200'
//           }`}>
//             {delivery.PaymentStatus}
//           </span>
//         </div>
//         <div className="text-gray-900 font-medium">
//           ₹{delivery.cost.toLocaleString()}
//         </div>
//         <div className="flex items-center justify-center">
//           <button
//             onClick={() => copyPreviewLink(delivery.name)}
//             className="p-2 bg-white hover:bg-gray-50 rounded-lg transition-all relative border border-gray-200 shadow-sm group/copy"
//           >
//             <Copy className="w-4 h-4 text-gray-600 transform transition-transform group-hover/copy:scale-110" />
//             <div className="absolute bottom-full right-0 mb-2 opacity-0 group-hover/copy:opacity-100 transition-all duration-200 translate-y-1 group-hover/copy:translate-y-0">
//               <div className="px-2 py-1 text-xs font-medium text-white bg-gray-900 rounded-lg shadow-lg whitespace-nowrap">
//                 Copy Preview Link
//               </div>
//             </div>
//           </button>
//         </div>
//       </div>
//     </div>
//   );

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8 flex items-center justify-center">
//         Loading...
//       </div>
//     );
//   }

//   if (!client) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8 flex items-center justify-center">
//         Client not found
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-8 relative">
//       {alert.show && (
//         <Alert
//           message={alert.message}
//           type={alert.type}
//           onClose={() => setAlert({ ...alert, show: false })}
//         />
//       )}

//       {/* Rest of your JSX... */}
//       {/* Header Card section remains the same */}

//       {/* Deliveries Section */}
//       <div className="max-w-7xl mx-auto">
//         <div className="bg-white rounded-2xl shadow-xl border border-gray-200/50 backdrop-blur-sm overflow-hidden">
//           {/* Mobile View */}
//           <div className="block md:hidden">
//             {client.deliveries.map((delivery, index) => (
//               <MobileDeliveryItem key={index} delivery={delivery} />
//             ))}
//           </div>

//           {/* Desktop View */}
//           <div className="hidden md:block">
//             <DesktopHeader />
//             <div className="divide-y divide-gray-200">
//               {client.deliveries.map((delivery, index) => (
//                 <DesktopDeliveryRow key={index} delivery={delivery} />
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Floating Action Button */}
//       <button
//         onClick={() => router.push('/freelancer/create_new_delivery')}
//         className="fixed bottom-4 right-4 md:bottom-8 md:right-8 w-14 h-14 bg-black text-white rounded-full shadow-lg 
//                  hover:shadow-xl transition-all flex items-center justify-center group z-40"
//       >
//         <Plus className="w-6 h-6 group-hover:rotate-90 transition-transform duration-200" />
//       </button>
//     </div>
//   );
// };

// export default ClientDetailsPage;
"use client"

import React, { useState, useEffect } from 'react';
import { Plus, Copy } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/context/authContext';
import Alert from '@/components/Alert';

const ClientDetailsPage = () => {
  const [client, setClient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState({ show: false, message: '', type: 'success' });
  const router = useRouter();
  
  const params = useParams();
  const clientId = params.id;
  const { freelancerId } = useAuth();

  useEffect(() => {
    const fetchClientDetails = async () => {
      try {
        const response = await fetch(`/api/get-client-details`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ clientId })
        });
        
        const data = await response.json();
        if (!response.ok) throw new Error(data.error || 'Failed to fetch client');
        setClient(data);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    if (clientId) fetchClientDetails();
  }, [clientId]);

  const calculatePaidAmount = (deliveries) => {
    return deliveries
      .filter(delivery => delivery.PaymentStatus === 'Paid')
      .reduce((sum, delivery) => sum + delivery.cost, 0);
  };

  const copyPreviewLink = (deliveryName) => {
    const previewLink = `${window.location.origin}/${clientId}/preview?delivery=${encodeURIComponent(deliveryName)}`;
    navigator.clipboard.writeText(previewLink);
    setAlert({
      show: true,
      message: 'Preview link copied to clipboard!',
      type: 'success'
    });
    setTimeout(() => setAlert({ ...alert, show: false }), 3000);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8 flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!client) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8 flex items-center justify-center">
        Client not found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-8 relative">
      {alert.show && (
        <Alert
          message={alert.message}
          type={alert.type}
          onClose={() => setAlert({ ...alert, show: false })}
        />
      )}

      {/* Header Card */}
      <div className="max-w-7xl mx-auto mb-6">
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200/50 backdrop-blur-sm p-4 md:p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-black rounded-xl flex items-center justify-center shadow-lg">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">{client.name}</h1>
                <div className="flex items-center gap-2 mt-1 flex-wrap">
                  <span className="bg-blue-50 px-2 py-0.5 rounded-md text-xs font-medium text-blue-600 border border-blue-100">
                    {client.modeOfPay}
                  </span>
                  <span className="bg-gray-50 px-2 py-0.5 rounded-md text-xs font-medium text-gray-600 border border-gray-100">
                    {client.status}
                  </span>
                  {client.email && (
                    <span className="bg-purple-50 px-2 py-0.5 rounded-md text-xs font-medium text-purple-600 border border-purple-100">
                      {client.email}
                    </span>
                  )}
                  {client.phone && (
                    <span className="bg-emerald-50 px-2 py-0.5 rounded-md text-xs font-medium text-emerald-600 border border-emerald-100">
                      {client.phone}
                    </span>
                  )}
                  <Link 
                    href={`/${clientId}/preview`}
                    className="bg-black text-white px-2 py-0.5 rounded-md text-xs font-medium hover:bg-gray-800 transition-colors"
                  >
                    Open Preview
                  </Link>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4 md:gap-8">
              <div className="text-left md:text-right">
                <p className="text-sm text-gray-500">Amount (Paid/Total)</p>
                <div className="flex items-baseline gap-2">
                  <p className="text-lg font-semibold text-emerald-600">
                    ₹{calculatePaidAmount(client.deliveries).toLocaleString()}
                  </p>
                  <p className="text-sm text-gray-500">
                    / ₹{client.deliveries.reduce((sum, delivery) => sum + delivery.cost, 0).toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Deliveries Section */}
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200/50 backdrop-blur-sm overflow-hidden">
          {/* Mobile View */}
          <div className="block md:hidden">
            {client.deliveries.map((delivery, index) => (
              <div key={index} className="p-4 border-b border-gray-200 last:border-b-0">
                <div className="flex items-center justify-between mb-2">
                  <div className="font-medium text-gray-900">{delivery.name}</div>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    delivery.PaymentStatus === 'Not Paid' 
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      : 'bg-gray-50 text-gray-700 border border-gray-200'
                  }`}>
                    {delivery.PaymentStatus}
                  </span>
                </div>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Files:</span>
                    <span>{delivery.files?.length || 0} files</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Date:</span>
                    <span>{new Date(delivery.createdAt).toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Cost:</span>
                    <span className="font-medium">₹{delivery.cost.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Description:</span>
                    <span className="text-right flex-1 ml-4 group relative">
                      {delivery.desc}
                      <span className="absolute bottom-full right-0 mb-2 w-48 p-2 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-50">
                        {delivery.desc}
                      </span>
                    </span>
                  </div>
                  <div className="mt-3 flex justify-end">
                    <button
                      onClick={() => copyPreviewLink(delivery.name)}
                      className="p-2 bg-white hover:bg-gray-50 rounded-lg transition-all border border-gray-200 shadow-sm"
                    >
                      <Copy className="w-4 h-4 text-gray-600" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop View */}
          <div className="hidden md:block">
            <div className="px-8 py-4 border-b border-gray-200 bg-gray-50">
              <div className="grid grid-cols-7 gap-4">
                <div className="text-sm font-medium text-gray-500">Name</div>
                <div className="text-sm font-medium text-gray-500">Files</div>
                <div className="text-sm font-medium text-gray-500">Description</div>
                <div className="text-sm font-medium text-gray-500">Date</div>
                <div className="text-sm font-medium text-gray-500">Payment Status</div>
                <div className="text-sm font-medium text-gray-500">Cost</div>
                <div className="text-sm font-medium text-gray-500 text-center">Preview Link</div>
              </div>
            </div>

            <div className="divide-y divide-gray-200">
              {client.deliveries.map((delivery, index) => (
                <div key={index} className="px-8 py-4 hover:bg-gray-50/50 transition-all">
                  <div className="grid grid-cols-7 gap-4 items-center">
                    <div className="font-medium text-gray-900">{delivery.name}</div>
                    <div className="text-gray-600">{delivery.files?.length || 0} files</div>
                    <div className="text-gray-600 truncate group relative" title={delivery.desc}>
                      {delivery.desc}
                      <span className="absolute bottom-full left-0 mb-2 w-64 p-2 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-50 whitespace-normal">
                        {delivery.desc}
                      </span>
                    </div>
                    <div className="text-gray-600">
                      {new Date(delivery.createdAt).toLocaleDateString()}
                    </div>
                    <div>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        delivery.PaymentStatus === 'Not Paid' 
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : 'bg-gray-50 text-gray-700 border border-gray-200'
                      }`}>
                        {delivery.PaymentStatus}
                      </span>
                    </div>
                    <div className="text-gray-900 font-medium">
                      ₹{delivery.cost.toLocaleString()}
                    </div>
                    <div className="flex items-center justify-center">
                      <button
                        onClick={() => copyPreviewLink(delivery.name)}
                        className="p-2 bg-white hover:bg-gray-50 rounded-lg transition-all relative border border-gray-200 shadow-sm group/copy"
                      >
                        <Copy className="w-4 h-4 text-gray-600 transform transition-transform group-hover/copy:scale-110" />
                        <div className="absolute bottom-full right-0 mb-2 opacity-0 group-hover/copy:opacity-100 transition-all duration-200 translate-y-1 group-hover/copy:translate-y-0">
                          <div className="px-2 py-1 text-xs font-medium text-white bg-gray-900 rounded-lg shadow-lg whitespace-nowrap">
                            Copy Preview Link
                          </div>
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Floating Action Button */}
      <button
        onClick={() => router.push('/freelancer/create_new_delivery')}
        className="fixed bottom-4 right-4 md:bottom-8 md:right-8 w-14 h-14 bg-black text-white rounded-full shadow-lg 
                 hover:shadow-xl transition-all flex items-center justify-center group z-40"
      >
        <Plus className="w-6 h-6 group-hover:rotate-90 transition-transform duration-200" />
      </button>
    </div>
  );
};

export default ClientDetailsPage;