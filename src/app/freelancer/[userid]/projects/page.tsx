"use client"
// import React, { useState } from 'react';
// import { FileText, Calendar, ArrowUpDown, Search, Filter, Download, ExternalLink, ChevronRight } from 'lucide-react';

// const ProjectsPage = () => {
//   const [activeFilter, setActiveFilter] = useState('all');

//   const filters = [
//     { id: 'all', label: 'All Projects' },
//     { id: 'active', label: 'Active' },
//     { id: 'completed', label: 'Completed' },
//     { id: 'pending', label: 'Pending Payment' }
//   ];

//   const projects = [
//     {
//       id: 1,
//       name: 'E-commerce Website',
//       client: 'TechCorp Inc.',
//       filesCount: 12,
//       date: '2024-12-15',
//       price: 2500,
//       status: 'completed',
//       progress: 100
//     },
//     {
//       id: 2,
//       name: 'Mobile App Design',
//       client: 'StartUp Labs',
//       filesCount: 8,
//       date: '2024-12-14',
//       price: 1800,
//       status: 'active',
//       progress: 65
//     },
//     {
//       id: 3,
//       name: 'Brand Identity',
//       client: 'Creative Studio',
//       filesCount: 15,
//       date: '2024-12-13',
//       price: 3200,
//       status: 'pending',
//       progress: 90
//     }
//   ];

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100/50 p-8">
//       <div className="max-w-7xl mx-auto space-y-8">
//         {/* Header Strip */}
//         <div className="bg-white rounded-2xl shadow-lg border border-black/5 p-6">
//           <div className="flex items-center justify-between mb-6">
//             <div className="flex items-center gap-4">
//               <div className="w-12 h-12 bg-black rounded-xl flex items-center justify-center">
//                 <FileText className="w-6 h-6 text-white" />
//               </div>
//               <div>
//                 <h1 className="text-2xl font-bold text-gray-900">Your Projects</h1>
//                 <p className="text-sm text-gray-500">Manage and track your ongoing projects</p>
//               </div>
//             </div>
//             <div className="flex items-center gap-3">
//               <div className="relative">
//                 <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
//                 <input 
//                   type="text"
//                   placeholder="Search projects..."
//                   className="pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-black transition-colors w-64"
//                 />
//               </div>
//               <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
//                 <Filter className="w-5 h-5 text-gray-600" />
//               </button>
//             </div>
//           </div>

//           {/* Filter Pills */}
//           <div className="flex items-center gap-2">
//             {filters.map(filter => (
//               <button
//                 key={filter.id}
//                 onClick={() => setActiveFilter(filter.id)}
//                 className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
//                   activeFilter === filter.id 
//                     ? 'bg-black text-white shadow-lg hover:bg-gray-900' 
//                     : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
//                 }`}
//               >
//                 {filter.label}
//               </button>
//             ))}
//           </div>
//         </div>

//         {/* Projects Grid */}
//         <div className="grid grid-cols-1 gap-4">
//           {projects.map((project) => (
//             <div 
//               key={project.id}
//               className="group bg-white rounded-2xl border border-black/5 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
//             >
//               <div className="p-6 flex items-center justify-between relative">
//                 {/* Left Section */}
//                 <div className="flex items-center gap-6">
//                   <div className="relative">
//                     <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
//                       <FileText className="w-8 h-8 text-gray-500" />
//                     </div>
//                     <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-black text-white flex items-center justify-center text-xs font-medium">
//                       {project.filesCount}
//                     </div>
//                   </div>
//                   <div>
//                     <h3 className="text-lg font-semibold text-gray-900 mb-1">{project.name}</h3>
//                     <div className="flex items-center gap-4">
//                       <span className="text-sm text-gray-500">{project.client}</span>
//                       <div className="w-1 h-1 rounded-full bg-gray-300" />
//                       <span className="text-sm text-gray-500">
//                         {new Date(project.date).toLocaleDateString()}
//                       </span>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Right Section */}
//                 <div className="flex items-center gap-8">
//                   {/* Progress Bar */}
//                   <div className="flex items-center gap-4">
//                     <div className="w-32 h-2 rounded-full bg-gray-100 overflow-hidden">
//                       <div 
//                         className={`h-full rounded-full transition-all duration-500 ${
//                           project.status === 'completed' ? 'bg-green-500' :
//                           project.status === 'active' ? 'bg-blue-500' :
//                           'bg-amber-500'
//                         }`}
//                         style={{ width: `${project.progress}%` }}
//                       />
//                     </div>
//                     <span className="text-sm font-medium text-gray-600">
//                       {project.progress}%
//                     </span>
//                   </div>

//                   {/* Price */}
//                   <div className="text-right">
//                     <p className="text-2xl font-bold text-gray-900">
//                       ${project.price.toLocaleString()}
//                     </p>
//                     <p className="text-sm text-gray-500">Project Value</p>
//                   </div>

//                   {/* Actions */}
//                   <div className="flex items-center gap-2">
//                     <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
//                       <ExternalLink className="w-5 h-5 text-gray-600" />
//                     </button>
//                     <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
//                       <Download className="w-5 h-5 text-gray-600" />
//                     </button>
//                     <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
//                       <ChevronRight className="w-5 h-5 text-gray-600" />
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProjectsPage;

// import React, { useState } from 'react';
// import { Search, Eye, Download, ExternalLink, Filter } from 'lucide-react';

// const ProjectsPage = () => {
//   const [searchTerm, setSearchTerm] = useState('');
//   const [activeFilter, setActiveFilter] = useState('all');

//   const filters = [
//     { id: 'all', label: 'All Projects' },
//     { id: 'active', label: 'Active' },
//     { id: 'completed', label: 'Completed' },
//     { id: 'pending', label: 'Pending' }
//   ];

//   const projects = [
//     {
//       id: 1,
//       name: 'E-commerce Website',
//       instance: 'Instance #1249',
//       files: 12,
//       date: '2024-12-15',
//       price: 2500,
//       status: 'Completed',
//       previewUrl: 'https://preview.project1.com',
//       downloadUrl: 'https://download.project1.com',
//       projectUrl: 'https://project1.com'
//     },
//     {
//       id: 2,
//       name: 'Mobile App Design',
//       instance: 'Instance #1250',
//       files: 8,
//       date: '2024-12-14',
//       price: 1800,
//       status: 'Active',
//       previewUrl: 'https://preview.project2.com',
//       downloadUrl: 'https://download.project2.com',
//       projectUrl: 'https://project2.com'
//     },
//     {
//       id: 3,
//       name: 'Brand Identity',
//       instance: 'Instance #1251',
//       files: 15,
//       date: '2024-12-13',
//       price: 3200,
//       status: 'Pending',
//       previewUrl: 'https://preview.project3.com',
//       downloadUrl: 'https://download.project3.com',
//       projectUrl: 'https://project3.com'
//     }
//   ];

//   const getStatusColor = (status) => {
//     switch (status.toLowerCase()) {
//       case 'completed': return 'bg-emerald-50 text-emerald-700 border-emerald-200';
//       case 'active': return 'bg-blue-50 text-blue-700 border-blue-200';
//       case 'pending': return 'bg-amber-50 text-amber-700 border-amber-200';
//       default: return 'bg-gray-50 text-gray-700 border-gray-200';
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8 space-y-6">
//       {/* Top Strip */}
//       <div className="bg-white rounded-2xl shadow-xl border border-gray-200/50 backdrop-blur-sm">
//         <div className="max-w-7xl mx-auto px-8 py-6">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center gap-4">
//               <div className="w-12 h-12 bg-black rounded-xl flex items-center justify-center shadow-lg">
//                 <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
//                 </svg>
//               </div>
//               <div>
//                 <h1 className="text-2xl font-semibold text-gray-900">Your Projects</h1>
//                 <p className="text-sm text-gray-500">View and manage all your projects</p>
//               </div>
//             </div>
//             <div className="flex items-center gap-4">
//               <div className="relative">
//                 <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
//                 <input 
//                   type="text"
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                   placeholder="Search projects..."
//                   className="pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all w-64 shadow-sm"
//                 />
//               </div>
//               <button className="p-2.5 bg-white hover:bg-gray-50 rounded-xl transition-colors border border-gray-200 shadow-sm">
//                 <Filter className="w-5 h-5 text-gray-600" />
//               </button>
//             </div>
//           </div>

//           {/* Filter Pills */}
//           <div className="flex items-center gap-2 mt-6">
//             {filters.map(filter => (
//               <button
//                 key={filter.id}
//                 onClick={() => setActiveFilter(filter.id)}
//                 className={`px-4 py-2 rounded-xl text-sm font-medium transition-all shadow-sm ${
//                   activeFilter === filter.id 
//                     ? 'bg-gray-900 text-white shadow-lg hover:bg-gray-800' 
//                     : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
//                 }`}
//               >
//                 {filter.label}
//               </button>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="bg-white rounded-2xl shadow-xl border border-gray-200/50 backdrop-blur-sm">
//         {/* Project Labels */}
//         <div className="px-6 py-4 border-b border-gray-200">
//           <div className="grid grid-cols-7 gap-4">
//             <div className="text-sm font-medium text-gray-500">Project Name</div>
//             <div className="text-sm font-medium text-gray-500">Files</div>
//             <div className="text-sm font-medium text-gray-500">Date</div>
//             <div className="text-sm font-medium text-gray-500">Price</div>
//             <div className="text-sm font-medium text-gray-500">Status</div>
//             <div className="text-sm font-medium text-gray-500">Instance</div>
//             <div className="text-sm font-medium text-gray-500 text-right">Actions</div>
//           </div>
//         </div>

//         {/* Projects List */}
//         <div className="divide-y divide-gray-200">
//           {projects.map((project) => (
//             <div 
//               key={project.id}
//               className="px-6 py-4 hover:bg-gray-50/50 transition-all group"
//             >
//               <div className="grid grid-cols-7 gap-4 items-center">
//                 <div>
//                   <h3 className="font-medium text-gray-900">{project.name}</h3>
//                 </div>
//                 <div className="text-gray-600">{project.files} files</div>
//                 <div className="text-gray-600">
//                   {new Date(project.date).toLocaleDateString()}
//                 </div>
//                 <div className="font-medium text-gray-900">
//                   ${project.price.toLocaleString()}
//                 </div>
//                 <div>
//                   <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(project.status)}`}>
//                     {project.status}
//                   </span>
//                 </div>
//                 <div className="text-gray-600">{project.instance}</div>
//                 <div className="flex items-center justify-end gap-2">
//                   <button 
//                     className="p-2 bg-white hover:bg-gray-50 rounded-lg transition-all group relative border border-gray-200 shadow-sm"
//                     title="Preview Project"
//                   >
//                     <Eye className="w-4 h-4 text-gray-600" />
//                     <span className="absolute bottom-full right-0 mb-2 px-2 py-1 text-xs font-medium text-white bg-gray-900 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-lg">
//                       Preview Project
//                     </span>
//                   </button>
//                   <button 
//                     className="p-2 bg-white hover:bg-gray-50 rounded-lg transition-all group relative border border-gray-200 shadow-sm"
//                     title="Download Files"
//                   >
//                     <Download className="w-4 h-4 text-gray-600" />
//                     <span className="absolute bottom-full right-0 mb-2 px-2 py-1 text-xs font-medium text-white bg-gray-900 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-lg">
//                       Download Files
//                     </span>
//                   </button>
//                   <button 
//                     className="p-2 bg-white hover:bg-gray-50 rounded-lg transition-all group relative border border-gray-200 shadow-sm"
//                     title="Open Project"
//                   >
//                     <ExternalLink className="w-4 h-4 text-gray-600" />
//                     <span className="absolute bottom-full right-0 mb-2 px-2 py-1 text-xs font-medium text-white bg-gray-900 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-lg">
//                       Open Project
//                     </span>
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProjectsPage;
// import React, { useState } from 'react';
// import { Search, Eye, Download, ExternalLink, Filter } from 'lucide-react';

// const ProjectsPage = () => {
//   const [searchTerm, setSearchTerm] = useState('');
//   const [activeFilter, setActiveFilter] = useState('all');

//   const filters = [
//     { id: 'all', label: 'All Projects' },
//     { id: 'active', label: 'Active' },
//     { id: 'completed', label: 'Completed' },
//     { id: 'pending', label: 'Pending' }
//   ];

//   const projects = [
//     {
//       id: 1,
//       name: 'E-commerce Website',
//       instance: 'Instance #1249',
//       date: '2024-12-15',
//       price: 2500,
//       status: 'Completed',
//       previewUrl: 'https://preview.project1.com',
//       downloadUrl: 'https://download.project1.com',
//       projectUrl: 'https://project1.com'
//     },
//     {
//       id: 2,
//       name: 'Mobile App Design',
//       instance: 'Instance #1250',
//       date: '2024-12-14',
//       price: 1800,
//       status: 'Active',
//       previewUrl: 'https://preview.project2.com',
//       downloadUrl: 'https://download.project2.com',
//       projectUrl: 'https://project2.com'
//     },
//     {
//       id: 3,
//       name: 'Brand Identity',
//       instance: 'Instance #1251',
//       date: '2024-12-13',
//       price: 3200,
//       status: 'Pending',
//       previewUrl: 'https://preview.project3.com',
//       downloadUrl: 'https://download.project3.com',
//       projectUrl: 'https://project3.com'
//     }
//   ];

//   const getStatusColor = (status) => {
//     switch (status.toLowerCase()) {
//       case 'completed': return 'bg-emerald-50 text-emerald-700 border-emerald-200';
//       case 'active': return 'bg-blue-50 text-blue-700 border-blue-200';
//       case 'pending': return 'bg-amber-50 text-amber-700 border-amber-200';
//       default: return 'bg-gray-50 text-gray-700 border-gray-200';
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8 space-y-6">
//       {/* Top Strip */}
//       <div className="bg-white rounded-2xl shadow-xl border border-gray-200/50 backdrop-blur-sm">
//         <div className="max-w-7xl mx-auto px-8 py-6">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center gap-4">
//               <div className="w-12 h-12 bg-black rounded-xl flex items-center justify-center shadow-lg">
//                 <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
//                 </svg>
//               </div>
//               <div>
//                 <h1 className="text-2xl font-semibold text-gray-900">Your Projects</h1>
//                 <p className="text-sm text-gray-500">View and manage all your projects</p>
//               </div>
//             </div>
//             <div className="flex items-center gap-4">
//               <div className="relative">
//                 <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
//                 <input 
//                   type="text"
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                   placeholder="Search projects..."
//                   className="pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all w-64 shadow-sm"
//                 />
//               </div>
//               <button className="p-2.5 bg-white hover:bg-gray-50 rounded-xl transition-colors border border-gray-200 shadow-sm">
//                 <Filter className="w-5 h-5 text-gray-600" />
//               </button>
//             </div>
//           </div>

//           {/* Filter Pills */}
//           <div className="flex items-center gap-2 mt-6">
//             {filters.map(filter => (
//               <button
//                 key={filter.id}
//                 onClick={() => setActiveFilter(filter.id)}
//                 className={`px-4 py-2 rounded-xl text-sm font-medium transition-all shadow-sm ${
//                   activeFilter === filter.id 
//                     ? 'bg-gray-900 text-white shadow-lg hover:bg-gray-800' 
//                     : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
//                 }`}
//               >
//                 {filter.label}
//               </button>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="bg-white rounded-2xl shadow-xl border border-gray-200/50 backdrop-blur-sm">
//         {/* Project Labels */}
//         <div className="px-6 py-4 border-b border-gray-200">
//           <div className="grid grid-cols-6 gap-4">
//             <div className="text-sm font-medium text-gray-500">Project Name</div>
//             <div className="text-sm font-medium text-gray-500">Instance</div>
//             <div className="text-sm font-medium text-gray-500">Date</div>
//             <div className="text-sm font-medium text-gray-500">Price</div>
//             <div className="text-sm font-medium text-gray-500">Status</div>
//             <div className="text-sm font-medium text-gray-500 text-right">Actions</div>
//           </div>
//         </div>

//         {/* Projects List */}
//         <div className="divide-y divide-gray-200">
//           {projects.map((project) => (
//             <div 
//               key={project.id}
//               className="px-6 py-4 hover:bg-gray-50/50 transition-all group"
//             >
//               <div className="grid grid-cols-6 gap-4 items-center">
//                 <div>
//                   <h3 className="font-medium text-gray-900">{project.name}</h3>
//                 </div>
//                 <div className="text-gray-600">{project.instance}</div>
//                 <div className="text-gray-600">
//                   {new Date(project.date).toLocaleDateString()}
//                 </div>
//                 <div className="font-medium text-gray-900">
//                   ${project.price.toLocaleString()}
//                 </div>
//                 <div>
//                   <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(project.status)}`}>
//                     {project.status}
//                   </span>
//                 </div>
//                 <div className="flex items-center justify-end gap-2">
//                   <button 
//                     className="p-2 bg-white hover:bg-gray-50 rounded-lg transition-all relative border border-gray-200 shadow-sm group/button"
//                   >
//                     <Eye className="w-4 h-4 text-gray-600 transform transition-transform group-hover/button:scale-110" />
//                     <div className="absolute bottom-full right-0 mb-2 opacity-0 group-hover/button:opacity-100 transition-all duration-200 translate-y-1 group-hover/button:translate-y-0">
//                       <div className="px-2 py-1 text-xs font-medium text-white bg-gray-900 rounded-lg shadow-lg whitespace-nowrap">
//                         Preview Project
//                       </div>
//                     </div>
//                   </button>
//                   <button 
//                     className="p-2 bg-white hover:bg-gray-50 rounded-lg transition-all relative border border-gray-200 shadow-sm group/button"
//                   >
//                     <Download className="w-4 h-4 text-gray-600 transform transition-transform group-hover/button:scale-110" />
//                     <div className="absolute bottom-full right-0 mb-2 opacity-0 group-hover/button:opacity-100 transition-all duration-200 translate-y-1 group-hover/button:translate-y-0">
//                       <div className="px-2 py-1 text-xs font-medium text-white bg-gray-900 rounded-lg shadow-lg whitespace-nowrap">
//                         Download Files
//                       </div>
//                     </div>
//                   </button>
//                   <button 
//                     className="p-2 bg-white hover:bg-gray-50 rounded-lg transition-all relative border border-gray-200 shadow-sm group/button"
//                   >
//                     <ExternalLink className="w-4 h-4 text-gray-600 transform transition-transform group-hover/button:scale-110" />
//                     <div className="absolute bottom-full right-0 mb-2 opacity-0 group-hover/button:opacity-100 transition-all duration-200 translate-y-1 group-hover/button:translate-y-0">
//                       <div className="px-2 py-1 text-xs font-medium text-white bg-gray-900 rounded-lg shadow-lg whitespace-nowrap">
//                         Open Project
//                       </div>
//                     </div>
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProjectsPage;
import React, { useState } from 'react';
import { Search, Eye, Download, ExternalLink, Filter } from 'lucide-react';

const ProjectsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');

  const filters = [
    { id: 'all', label: 'All Projects' },
    { id: 'active', label: 'Active' },
    { id: 'completed', label: 'Completed' },
    { id: 'pending', label: 'Pending' }
  ];

  const projects = [
    {
      id: 1,
      name: 'E-commerce Website',
      instance: 'Instance #1249',
      date: '2024-12-15',
      price: 2500,
      status: 'Completed',
      previewUrl: 'https://preview.project1.com',
      downloadUrl: 'https://download.project1.com',
      projectUrl: 'https://project1.com'
    },
    {
      id: 2,
      name: 'Mobile App Design',
      instance: 'Instance #1250',
      date: '2024-12-14',
      price: 1800,
      status: 'Active',
      previewUrl: 'https://preview.project2.com',
      downloadUrl: 'https://download.project2.com',
      projectUrl: 'https://project2.com'
    },
    {
      id: 3,
      name: 'Brand Identity',
      instance: 'Instance #1251',
      date: '2024-12-13',
      price: 3200,
      status: 'Pending',
      previewUrl: 'https://preview.project3.com',
      downloadUrl: 'https://download.project3.com',
      projectUrl: 'https://project3.com'
    }
  ];

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'completed': return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'active': return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'pending': return 'bg-amber-50 text-amber-700 border-amber-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8 space-y-6">
      {/* Top Strip */}
      <div className="bg-white rounded-2xl shadow-xl border border-gray-200/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-black rounded-xl flex items-center justify-center shadow-lg">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div>
                <h1 className="text-2xl font-semibold text-gray-900">Your Projects</h1>
                <p className="text-sm text-gray-500">View and manage all your projects</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input 
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search projects..."
                  className="pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all w-64 shadow-sm"
                />
              </div>
              <button className="p-2.5 bg-white hover:bg-gray-50 rounded-xl transition-colors border border-gray-200 shadow-sm">
                <Filter className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-2 mt-6">
            {filters.map(filter => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all shadow-sm ${
                  activeFilter === filter.id 
                    ? 'bg-gray-900 text-white shadow-lg hover:bg-gray-800' 
                    : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-white rounded-2xl shadow-xl border border-gray-200/50 backdrop-blur-sm">
        {/* Project Labels */}
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="grid grid-cols-6 gap-4">
            <div className="text-sm font-medium text-gray-500">Project Name</div>
            <div className="text-sm font-medium text-gray-500">Instance</div>
            <div className="text-sm font-medium text-gray-500">Date</div>
            <div className="text-sm font-medium text-gray-500">Price</div>
            <div className="text-sm font-medium text-gray-500">Status</div>
            <div className="text-sm font-medium text-gray-500 text-right">Actions</div>
          </div>
        </div>

        {/* Projects List */}
        <div className="divide-y divide-gray-200">
          {projects.map((project) => (
            <div 
              key={project.id}
              className="px-6 py-4 hover:bg-gray-50/50 transition-all group"
            >
              <div className="grid grid-cols-6 gap-4 items-center">
                <div>
                  <h3 className="font-medium text-gray-900">{project.name}</h3>
                </div>
                <div className="text-gray-600">{project.instance}</div>
                <div className="text-gray-600">
                  {new Date(project.date).toLocaleDateString()}
                </div>
                <div className="font-medium text-gray-900">
                  ${project.price.toLocaleString()}
                </div>
                <div>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(project.status)}`}>
                    {project.status}
                  </span>
                </div>
                <div className="flex items-center justify-end gap-2">
                  <a 
                    href={project.previewUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-white hover:bg-gray-50 rounded-lg transition-all relative border border-gray-200 shadow-sm group/button"
                  >
                    <Eye className="w-4 h-4 text-gray-600 transform transition-transform group-hover/button:scale-110" />
                    <div className="absolute bottom-full right-0 mb-2 opacity-0 group-hover/button:opacity-100 transition-all duration-200 translate-y-1 group-hover/button:translate-y-0">
                      <div className="px-2 py-1 text-xs font-medium text-white bg-gray-900 rounded-lg shadow-lg whitespace-nowrap">
                        Preview URL
                      </div>
                    </div>
                  </a>
                  <a 
                    href={project.downloadUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-white hover:bg-gray-50 rounded-lg transition-all relative border border-gray-200 shadow-sm group/button"
                  >
                    <ExternalLink className="w-4 h-4 text-gray-600 transform transition-transform group-hover/button:scale-110" />
                    <div className="absolute bottom-full right-0 mb-2 opacity-0 group-hover/button:opacity-100 transition-all duration-200 translate-y-1 group-hover/button:translate-y-0">
                      <div className="px-2 py-1 text-xs font-medium text-white bg-gray-900 rounded-lg shadow-lg whitespace-nowrap">
                        Download URL
                      </div>
                    </div>
                  </a>
                  <a 
                    href={project.projectUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-white hover:bg-gray-50 rounded-lg transition-all relative border border-gray-200 shadow-sm group/button"
                  >
                    <ExternalLink className="w-4 h-4 text-gray-600 transform transition-transform group-hover/button:scale-110" />
                    <div className="absolute bottom-full right-0 mb-2 opacity-0 group-hover/button:opacity-100 transition-all duration-200 translate-y-1 group-hover/button:translate-y-0">
                      <div className="px-2 py-1 text-xs font-medium text-white bg-gray-900 rounded-lg shadow-lg whitespace-nowrap">
                        Open Project
                      </div>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectsPage;