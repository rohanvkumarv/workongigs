
// // "use client"
// // import React, { useState, useEffect } from 'react';
// // import { Plus, Eye } from 'lucide-react';
// // import { useParams } from 'next/navigation';
// // import Link from 'next/link';
// // import { useAuth } from '@/context/authContext';
// // import NewInstanceForm from '../../_components/NewInstanceForm';

// // const ProjectDetailsPage = () => {
// //   const [isFormOpen, setIsFormOpen] = useState(false);
// //   const [project, setProject] = useState(null);
// //   const [loading, setLoading] = useState(true);
  
// //   const params = useParams();
// //   const projectId = params.id;
// //   const { freelancerId } = useAuth();

// //   useEffect(() => {
// //     const fetchProjectDetails = async () => {
// //       try {
// //         const response = await fetch(`/api/get-project-details`, {
// //           method: 'POST',
// //           headers: { 'Content-Type': 'application/json' },
// //           body: JSON.stringify({ projectId })
// //         });
        
// //         const data = await response.json();
// //         if (!response.ok) throw new Error(data.error || 'Failed to fetch project');
// //         setProject(data);
// //       } catch (error) {
// //         console.error('Error:', error);
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     if (projectId) fetchProjectDetails();
// //   }, [projectId]);

// //   const calculatePaidAmount = (files) => {
// //     return files
// //       .filter(file => file.PaymentStatus === 'Paid')
// //       .reduce((sum, file) => sum + file.cost, 0);
// //   };

// //   if (loading) {
// //     return (
// //       <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8 flex items-center justify-center">
// //         Loading...
// //       </div>
// //     );
// //   }

// //   if (!project) {
// //     return (
// //       <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8 flex items-center justify-center">
// //         Project not found
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
// //                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
// //                 </svg>
// //               </div>
// //               <div>
// //                 <h1 className="text-xl font-semibold text-gray-900">{project.name}</h1>
// //                 <div className="flex items-center gap-2 mt-1 flex-wrap">
// //                   <span className="bg-blue-50 px-2 py-0.5 rounded-md text-xs font-medium text-blue-600 border border-blue-100">
// //                     {project.paymentMode}
// //                   </span>
// //                   <span className="bg-gray-50 px-2 py-0.5 rounded-md text-xs font-medium text-gray-600 border border-gray-100">
// //                     {project.status}
// //                   </span>
// //                   <Link 
// //                     href={`${projectId}/preview`}
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
// //                     ₹{calculatePaidAmount(project.files).toLocaleString()}
// //                   </p>
// //                   <p className="text-sm text-gray-500">
// //                     / ₹{project.files.reduce((sum, file) => sum + file.cost, 0).toLocaleString()}
// //                   </p>
// //                 </div>
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       </div>

// //       {/* Files Section */}
// //       <div className="max-w-7xl mx-auto">
// //         <div className="bg-white rounded-2xl shadow-xl border border-gray-200/50 backdrop-blur-sm overflow-hidden">
// //           {/* Mobile View */}
// //           <div className="block md:hidden">
// //             {project.files.map((file, index) => (
// //               <div key={index} className="p-4 border-b border-gray-200 last:border-b-0">
// //                 <div className="flex items-center justify-between mb-2">
// //                   <div className="font-medium text-gray-900">{file.instance}</div>
// //                   <span className={`px-3 py-1 rounded-full text-sm font-medium ${
// //                     file.PaymentStatus === 'Not Paid' 
// //                       ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
// //                       : 'bg-gray-50 text-gray-700 border border-gray-200'
// //                   }`}>
// //                     {file.status}
// //                   </span>
// //                 </div>
// //                 <div className="space-y-1 text-sm">
// //                   <div className="flex justify-between">
// //                     <span className="text-gray-600">Files:</span>
// //                     <span>{file.noOfFiles} files</span>
// //                   </div>
// //                   <div className="flex justify-between">
// //                     <span className="text-gray-600">Date:</span>
// //                     <span>{new Date(file.date).toLocaleDateString()}</span>
// //                   </div>
// //                   <div className="flex justify-between">
// //                     <span className="text-gray-600">Cost:</span>
// //                     <span className="font-medium">₹{file.cost.toLocaleString()}</span>
// //                   </div>
// //                   <div className="flex justify-end mt-2">
// //                     <Link 
// //                       href={`/freelancer/${freelancerId}/projects/${projectId}/preview`}
// //                       className="text-sm text-gray-600 hover:text-gray-900 transition-colors flex items-center gap-1"
// //                     >
// //                       <Eye className="w-4 h-4" />
// //                       Preview
// //                     </Link>
// //                   </div>
// //                 </div>
// //               </div>
// //             ))}
// //           </div>

// //           {/* Desktop View */}
// //           <div className="hidden md:block">
// //             <div className="px-8 py-4 border-b border-gray-200 bg-gray-50">
// //               <div className="grid grid-cols-6 gap-4">
// //                 <div className="text-sm font-medium text-gray-500">Instance</div>
// //                 <div className="text-sm font-medium text-gray-500">Files</div>
// //                 <div className="text-sm font-medium text-gray-500">Date</div>
// //                 <div className="text-sm font-medium text-gray-500">Status</div>
// //                 <div className="text-sm font-medium text-gray-500">Cost</div>
// //                 <div className="text-sm font-medium text-gray-500 text-right">Actions</div>
// //               </div>
// //             </div>

// //             <div className="divide-y divide-gray-200">
// //               {project.files.map((file, index) => (
// //                 <div key={index} className="px-8 py-4 hover:bg-gray-50/50 transition-all">
// //                   <div className="grid grid-cols-6 gap-4 items-center">
// //                     <div className="font-medium text-gray-900">{file.instance}</div>
// //                     <div className="text-gray-600">{file.noOfFiles} files</div>
// //                     <div className="text-gray-600">
// //                       {new Date(file.date).toLocaleDateString()}
// //                     </div>
// //                     <div>
// //                       <span className={`px-3 py-1 rounded-full text-sm font-medium ${
// //                         file.PaymentStatus === 'Not Paid' 
// //                           ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
// //                           : 'bg-gray-50 text-gray-700 border border-gray-200'
// //                       }`}>
// //                         {file.status}
// //                       </span>
// //                     </div>
// //                     <div className="text-gray-900 font-medium">
// //                       ₹{file.cost.toLocaleString()}
// //                     </div>
// //                     <div className="flex items-center justify-end gap-3">
// //                       <Link 
// //                         href={`/freelancer/${freelancerId}/projects/${projectId}/preview`}
// //                         className="text-gray-600 hover:text-gray-900 transition-colors flex items-center gap-1"
// //                       >
// //                         <Eye className="w-4 h-4" />
// //                         Preview
// //                       </Link>
// //                     </div>
// //                   </div>
// //                 </div>
// //               ))}
// //             </div>
// //           </div>
// //         </div>
// //       </div>

// //       {/* Instance Form Modal */}
// //       {isFormOpen && (
// //         <NewInstanceForm
// //           projectId={projectId}
// //           onClose={() => setIsFormOpen(false)}
// //         />
// //       )}

// //       {/* Floating Action Button */}
// //       <button
// //         onClick={() => setIsFormOpen(true)}
// //         className="fixed bottom-4 right-4 md:bottom-8 md:right-8 w-14 h-14 bg-black text-white rounded-full shadow-lg 
// //                  hover:shadow-xl transition-all flex items-center justify-center group z-40"
// //       >
// //         <Plus className="w-6 h-6 group-hover:rotate-90 transition-transform duration-200" />
// //       </button>
// //     </div>
// //   );
// // };

// // export default ProjectDetailsPage;
// "use client"
// import React, { useState, useEffect } from 'react';
// import { Plus, Eye } from 'lucide-react';
// import { useParams } from 'next/navigation';
// import Link from 'next/link';
// import { useAuth } from '@/context/authContext';
// import NewInstanceForm from '../../_components/NewInstanceForm';
// const ClientDetailsPage = () => {
//   const [isFormOpen, setIsFormOpen] = useState(false);
//   const [client, setClient] = useState(null);
//   const [loading, setLoading] = useState(true);
  
//   const params = useParams();
//   const clientId = params.id;
//   const { freelancerId } = useAuth();

//   useEffect(() => {
//     const fetchClientDetails = async () => {
//       try {
//         const response = await fetch(`/api/get-client-details`, {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify({ clientId })
//         });
        
//         const data = await response.json();
//         if (!response.ok) throw new Error(data.error || 'Failed to fetch client');
//         setClient(data);
//       } catch (error) {
//         console.error('Error:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (clientId) fetchClientDetails();
//   }, [clientId]);

//   const calculatePaidAmount = (deliveries) => {
//     return deliveries
//       .filter(delivery => delivery.PaymentStatus === 'Paid')
//       .reduce((sum, delivery) => sum + delivery.cost, 0);
//   };

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
//       {/* Header Card */}
//       <div className="max-w-7xl mx-auto mb-6">
//         <div className="bg-white rounded-2xl shadow-xl border border-gray-200/50 backdrop-blur-sm p-4 md:p-6">
//           <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
//             <div className="flex items-center gap-4">
//               <div className="w-12 h-12 bg-black rounded-xl flex items-center justify-center shadow-lg">
//                 <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
//                 </svg>
//               </div>
//               <div>
//                 <h1 className="text-xl font-semibold text-gray-900">{client.name}</h1>
//                 <div className="flex items-center gap-2 mt-1 flex-wrap">
//                   <span className="bg-blue-50 px-2 py-0.5 rounded-md text-xs font-medium text-blue-600 border border-blue-100">
//                     {client.modeOfPay}
//                   </span>
//                   <span className="bg-gray-50 px-2 py-0.5 rounded-md text-xs font-medium text-gray-600 border border-gray-100">
//                     {client.status}
//                   </span>
//                   {client.email && (
//                     <span className="bg-purple-50 px-2 py-0.5 rounded-md text-xs font-medium text-purple-600 border border-purple-100">
//                       {client.email}
//                     </span>
//                   )}
//                   {client.phone && (
//                     <span className="bg-emerald-50 px-2 py-0.5 rounded-md text-xs font-medium text-emerald-600 border border-emerald-100">
//                       {client.phone}
//                     </span>
//                   )}
//                   <Link 
//                     href={`/${clientId}/preview`}
//                     className="bg-black text-white px-2 py-0.5 rounded-md text-xs font-medium hover:bg-gray-800 transition-colors"
//                   >
//                     Open Preview
//                   </Link>
//                 </div>
//               </div>
//             </div>

//             <div className="flex items-center gap-4 md:gap-8">
//               <div className="text-left md:text-right">
//                 <p className="text-sm text-gray-500">Amount (Paid/Total)</p>
//                 <div className="flex items-baseline gap-2">
//                   <p className="text-lg font-semibold text-emerald-600">
//                     ₹{calculatePaidAmount(client.deliveries).toLocaleString()}
//                   </p>
//                   <p className="text-sm text-gray-500">
//                     / ₹{client.deliveries.reduce((sum, delivery) => sum + delivery.cost, 0).toLocaleString()}
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Deliveries Section */}
//       <div className="max-w-7xl mx-auto">
//         <div className="bg-white rounded-2xl shadow-xl border border-gray-200/50 backdrop-blur-sm overflow-hidden">
//           {/* Mobile View */}
//           <div className="block md:hidden">
//             {client.deliveries.map((delivery, index) => (
//               <div key={index} className="p-4 border-b border-gray-200 last:border-b-0">
//                 <div className="flex items-center justify-between mb-2">
//                   <div className="font-medium text-gray-900">{delivery.name}</div>
//                   <span className={`px-3 py-1 rounded-full text-sm font-medium ${
//                     delivery.PaymentStatus === 'Not Paid' 
//                       ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
//                       : 'bg-gray-50 text-gray-700 border border-gray-200'
//                   }`}>
//                     {delivery.PaymentStatus}
//                   </span>
//                 </div>
//                 <div className="space-y-1 text-sm">
//                   <div className="flex justify-between">
//                     <span className="text-gray-600">Files:</span>
//                     <span>{delivery.files?.length || 0} files</span>
//                   </div>
//                   <div className="flex justify-between">
//                     <span className="text-gray-600">Date:</span>
//                     <span>{new Date(delivery.createdAt).toLocaleDateString()}</span>
//                   </div>
//                   <div className="flex justify-between">
//                     <span className="text-gray-600">Cost:</span>
//                     <span className="font-medium">₹{delivery.cost.toLocaleString()}</span>
//                   </div>
//                   <div className="flex justify-between">
//                     <span className="text-gray-600">Description:</span>
//                     <span className="text-right flex-1 ml-4">{delivery.desc}</span>
//                   </div>
//                   {/* <div className="flex justify-end mt-2">
//                     <Link 
//                       href={`${clientId}/preview`}
//                       className="text-sm text-gray-600 hover:text-gray-900 transition-colors flex items-center gap-1"
//                     >
//                       <Eye className="w-4 h-4" />
//                       Preview
//                     </Link>
//                   </div> */}
//                 </div>
//               </div>
//             ))}
//           </div>

//           {/* Desktop View */}
//           <div className="hidden md:block">
//             <div className="px-8 py-4 border-b border-gray-200 bg-gray-50">
//               <div className="grid grid-cols-7 gap-4">
//                 <div className="text-sm font-medium text-gray-500">Name</div>
//                 <div className="text-sm font-medium text-gray-500">Files</div>
//                 <div className="text-sm font-medium text-gray-500">Description</div>
//                 <div className="text-sm font-medium text-gray-500">Date</div>
//                 <div className="text-sm font-medium text-gray-500">Payment Status</div>
//                 <div className="text-sm font-medium text-gray-500">Cost</div>
//                 {/* <div className="text-sm font-medium text-gray-500 text-right">Actions</div> */}
//               </div>
//             </div>

//             <div className="divide-y divide-gray-200">
//               {client.deliveries.map((delivery, index) => (
//                 <div key={index} className="px-8 py-4 hover:bg-gray-50/50 transition-all">
//                   <div className="grid grid-cols-7 gap-4 items-center">
//                     <div className="font-medium text-gray-900">{delivery.name}</div>
//                     <div className="text-gray-600">{delivery.files?.length || 0} files</div>
//                     <div className="text-gray-600 truncate" title={delivery.desc}>
//                       {delivery.desc}
//                     </div>
//                     <div className="text-gray-600">
//                       {new Date(delivery.createdAt).toLocaleDateString()}
//                     </div>
//                     <div>
//                       <span className={`px-3 py-1 rounded-full text-sm font-medium ${
//                         delivery.PaymentStatus === 'Not Paid' 
//                           ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
//                           : 'bg-gray-50 text-gray-700 border border-gray-200'
//                       }`}>
//                         {delivery.PaymentStatus}
//                       </span>
//                     </div>
//                     <div className="text-gray-900 font-medium">
//                       ₹{delivery.cost.toLocaleString()}
//                     </div>
//                     {/* <div className="flex items-center justify-end gap-3">
//                       <Link 
//                         href={`${clientId}/preview`}
//                         className="text-gray-600 hover:text-gray-900 transition-colors flex items-center gap-1"
//                       >
//                         <Eye className="w-4 h-4" />
//                         Preview
//                       </Link>
//                     </div> */}
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Delivery Form Modal */}
//       {isFormOpen && (
//         <NewInstanceForm
//           projectId={clientId}
//           onClose={() => setIsFormOpen(false)}
//         />
//       )}

//       {/* Floating Action Button */}
//       <button
//         onClick={() => setIsFormOpen(true)}
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
import { Plus } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/context/authContext';

const ClientDetailsPage = () => {
  const [client, setClient] = useState(null);
  const [loading, setLoading] = useState(true);
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
                </div>
              </div>
            ))}
          </div>

          {/* Desktop View */}
          <div className="hidden md:block">
            <div className="px-8 py-4 border-b border-gray-200 bg-gray-50">
              <div className="grid grid-cols-6 gap-4">
                <div className="text-sm font-medium text-gray-500">Name</div>
                <div className="text-sm font-medium text-gray-500">Files</div>
                <div className="text-sm font-medium text-gray-500">Description</div>
                <div className="text-sm font-medium text-gray-500">Date</div>
                <div className="text-sm font-medium text-gray-500">Payment Status</div>
                <div className="text-sm font-medium text-gray-500">Cost</div>
              </div>
            </div>

            <div className="divide-y divide-gray-200">
              {client.deliveries.map((delivery, index) => (
                <div key={index} className="px-8 py-4 hover:bg-gray-50/50 transition-all">
                  <div className="grid grid-cols-6 gap-4 items-center">
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