"use client "
// import React from 'react';
// import { CircleDollarSign, FileText, Clock, Sparkles, Zap, Shield, Trophy, Star } from 'lucide-react';

// const DashboardContent = () => {
//   // Sample data for recent projects
//   const recentProjects = [
//     {
//       id: 1,
//       name: "E-commerce Website Redesign",
//       status: "pending",
//       price: 2500,
//       priority: "high",
//       client: "TechCorp Inc.",
//       progress: 65
//     },
//     {
//       id: 2,
//       name: "Mobile App Development",
//       status: "in_progress",
//       price: 4000,
//       priority: "medium",
//       client: "StartUp Labs",
//       progress: 35
//     },
//     {
//       id: 3,
//       name: "Brand Identity Design",
//       status: "completed",
//       price: 1800,
//       priority: "low",
//       client: "Design Studio",
//       progress: 100
//     }
//   ];

//   return (
//     <div className="min-h-screen bg-gray-50/50">
//       {/* Stats Row */}
//       <div className="grid grid-cols-4 gap-6 p-6">
//         {/* Unpaid Projects Card */}
//         <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-rose-500 to-orange-400 p-6 text-white shadow-lg">
//           <div className="absolute top-0 right-0 -mt-4 -mr-4 h-24 w-24 rounded-full bg-white/10 blur-2xl" />
//           <div className="relative">
//             <div className="flex items-center justify-between">
//               <p className="text-sm font-medium text-rose-100">Unpaid Projects</p>
//               <div className="rounded-full bg-white/20 p-2">
//                 <Shield className="h-4 w-4" />
//               </div>
//             </div>
//             <h3 className="mt-4 text-3xl font-bold">05</h3>
//             <div className="mt-2 flex items-center text-sm">
//               <Zap className="mr-1 h-4 w-4" />
//               <span>Requires attention</span>
//             </div>
//           </div>
//         </div>

//         {/* Total Projects Card */}
//         <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-violet-500 to-purple-500 p-6 text-white shadow-lg">
//           <div className="absolute top-0 right-0 -mt-4 -mr-4 h-24 w-24 rounded-full bg-white/10 blur-2xl" />
//           <div className="relative">
//             <div className="flex items-center justify-between">
//               <p className="text-sm font-medium text-violet-100">Total Projects</p>
//               <div className="rounded-full bg-white/20 p-2">
//                 <Trophy className="h-4 w-4" />
//               </div>
//             </div>
//             <h3 className="mt-4 text-3xl font-bold">12</h3>
//             <div className="mt-2 flex items-center text-sm">
//               <Star className="mr-1 h-4 w-4" />
//               <span>All time best</span>
//             </div>
//           </div>
//         </div>

//         {/* Amount to Withdraw Card */}
//         <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 p-6 text-white shadow-lg">
//           <div className="absolute top-0 right-0 -mt-4 -mr-4 h-24 w-24 rounded-full bg-white/10 blur-2xl" />
//           <div className="relative">
//             <div className="flex items-center justify-between">
//               <p className="text-sm font-medium text-emerald-100">Available Balance</p>
//               <div className="rounded-full bg-white/20 p-2">
//                 <CircleDollarSign className="h-4 w-4" />
//               </div>
//             </div>
//             <h3 className="mt-4 text-3xl font-bold">$3,250</h3>
//             <div className="mt-2 flex items-center text-sm">
//               <Sparkles className="mr-1 h-4 w-4" />
//               <span>Ready to withdraw</span>
//             </div>
//           </div>
//         </div>

//         {/* Add New Project Card */}
//         <div className="group relative overflow-hidden rounded-2xl bg-black p-6 text-white shadow-lg cursor-pointer hover:scale-[1.02] transition-all">
//           <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black transition-all group-hover:scale-105" />
//           <div className="relative flex h-full flex-col items-center justify-center text-center">
//             <div className="rounded-full bg-white/10 p-3 mb-3">
//               <FileText className="h-6 w-6" />
//             </div>
//             <p className="text-lg font-semibold">Add New Project</p>
//             <p className="text-sm text-gray-400 mt-1">Click to create</p>
//           </div>
//         </div>
//       </div>

//       {/* Recent Projects Section */}
//       <div className="p-6">
//         <div className="rounded-2xl bg-white shadow-lg border border-gray-100">
//           <div className="flex items-center justify-between border-b border-gray-100 p-6">
//             <h2 className="text-xl font-semibold text-gray-900">Recent Projects</h2>
//             <button className="inline-flex items-center rounded-lg bg-black px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-gray-900">
//               View All Projects
//             </button>
//           </div>

//           <div className="space-y-1 p-1">
//             {recentProjects.map((project) => (
//               <div
//                 key={project.id}
//                 className="group relative m-4 rounded-xl bg-gradient-to-br from-gray-50 to-gray-100/50 p-6 transition-all hover:shadow-md"
//               >
//                 <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
//                 <div className="relative flex items-center justify-between">
//                   <div className="flex items-center space-x-6">
//                     {/* Project Icon & Name */}
//                     <div className="flex-shrink-0">
//                       <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-black text-white shadow-lg">
//                         <FileText className="h-8 w-8" />
//                       </div>
//                     </div>
//                     <div>
//                       <h3 className="text-lg font-semibold text-gray-900">{project.name}</h3>
//                       <div className="mt-1 flex items-center gap-4">
//                         <span className="flex items-center text-sm text-gray-500">
//                           <Clock className="mr-1 h-4 w-4" />
//                           {project.client}
//                         </span>
//                         <div className="h-1 w-1 rounded-full bg-gray-300" />
//                         <div className="flex items-center">
//                           <div className="h-2 w-20 overflow-hidden rounded-full bg-gray-200">
//                             <div
//                               className="h-full rounded-full bg-black transition-all"
//                               style={{ width: `${project.progress}%` }}
//                             />
//                           </div>
//                           <span className="ml-2 text-sm text-gray-600">{project.progress}%</span>
//                         </div>
//                       </div>
//                     </div>
//                   </div>

//                   {/* Price & Status */}
//                   <div className="text-right">
//                     <p className="text-2xl font-bold text-gray-900">
//                       ${project.price.toLocaleString()}
//                     </p>
//                     <div className="mt-1 flex items-center justify-end gap-2">
//                       <span className={`inline-block h-2 w-2 rounded-full ${
//                         project.status === 'completed' ? 'bg-green-500' :
//                         project.status === 'in_progress' ? 'bg-blue-500' : 'bg-amber-500'
//                       }`} />
//                       <span className="text-sm text-gray-500">
//                         {project.status === 'completed' ? 'Completed' :
//                          project.status === 'in_progress' ? 'In Progress' : 'Pending'}
//                       </span>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DashboardContent;

import React from 'react';
import { User, Edit2, FileText, CircleDollarSign, PlusCircle, ArrowUpRight, Phone, Mail, ExternalLink } from 'lucide-react';
// import { Link } from 'react-router-dom';

const DashboardContent = () => {
  return (
    <div className="min-h-screen bg-black/[0.02] p-6 space-y-6">
      {/* Top Row */}
      <div className="grid grid-cols-4 gap-6">
        {/* User Details Card */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-black/5 relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-black/[0.02] to-transparent" />
          <div className="relative">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-black rounded-xl flex items-center justify-center">
                <User className="w-6 h-6 text-white" />
              </div>
              <a
                href="/profile"
                className="text-xs text-black/60 hover:text-black flex items-center gap-1 transition-colors"
              >
                <Edit2 className="w-4 h-4" />
                Edit Profile
              </a>
            </div>
            <h3 className="text-lg font-semibold text-black mb-4">John Doe</h3>
            <div className="space-y-2">
              <div className="flex items-center text-sm text-black/60">
                <Phone className="w-4 h-4 mr-2" />
                +1 234 567 8900
              </div>
              <div className="flex items-center text-sm text-black/60">
                <Mail className="w-4 h-4 mr-2" />
                john.doe@email.com
              </div>
            </div>
          </div>
        </div>

        {/* Unpaid Projects Card */}
        {/* <div className="bg-white rounded-2xl overflow-hidden shadow-lg border border-black/5">
          <div className="h-1 bg-red-500 w-full" />
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-black/60">Unpaid Projects</h3>
              <span className="text-xs text-red-500 font-medium">Attention Required</span>
            </div>
            <div className="flex items-end justify-between">
              <div className="space-y-1">
                <p className="text-3xl font-bold text-black">05</p>
                <p className="text-xs text-black/40">Projects pending payment</p>
              </div>
              <div className="w-16 h-16 relative">
                <div className="absolute inset-0 bg-red-500/10 rounded-full animate-ping" />
                <div className="relative w-full h-full rounded-full bg-red-500/20 flex items-center justify-center">
                  <FileText className="w-6 h-6 text-red-500" />
                </div>
              </div>
            </div>
          </div>
        </div>

       
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-black/5 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full -mr-16 -mt-16 blur-2xl" />
          <div className="relative">
            <h3 className="text-sm font-medium text-black/60 mb-4">Total Projects</h3>
            <div className="flex items-end justify-between">
              <div className="space-y-1">
                <p className="text-3xl font-bold text-black">12</p>
                <p className="text-xs text-black/40">Active projects</p>
              </div>
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full flex items-center justify-center">
                <FileText className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>
        </div> */}
        {/* Unpaid Projects Card */}
<div className="bg-white rounded-2xl overflow-hidden shadow-lg border border-black/5">
  <div className="h-1 bg-red-500 w-full" />
  <div className="p-6">
    <div className="flex items-center justify-between mb-4">
      <h3 className="text-sm font-medium text-black/60">Unpaid Projects</h3>
      <span className="text-xs text-red-500 font-medium">Attention Required</span>
    </div>
    <div className="flex items-end justify-between">
      <div className="space-y-1">
        <p className="text-3xl font-bold text-black">05</p>
        <p className="text-xs text-black/40">Projects pending payment</p>
      </div>
      <div className="w-16 h-16 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-red-500/20 to-orange-500/20 rounded-full transform rotate-45">
          <div className="absolute inset-0.5 rounded-full bg-white/40 backdrop-blur-sm"></div>
        </div>
        <div className="absolute inset-2 rounded-full bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center shadow-lg">
          <FileText className="w-6 h-6 text-white" />
        </div>
      </div>
    </div>
  </div>
</div>

{/* Total Projects Card */}
<div className="bg-white rounded-2xl p-6 shadow-lg border border-black/5 relative overflow-hidden">
  <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full -mr-16 -mt-16 blur-2xl" />
  <div className="relative">
    <h3 className="text-sm font-medium text-black/60 mb-4">Total Projects</h3>
    <div className="flex items-end justify-between">
      <div className="space-y-1">
        <p className="text-3xl font-bold text-black">12</p>
        <p className="text-xs text-black/40">Active projects</p>
      </div>
      <div className="w-16 h-16 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-indigo-600/20 rounded-full transform rotate-45">
          <div className="absolute inset-0.5 rounded-full bg-white/40 backdrop-blur-sm"></div>
        </div>
        <div className="absolute inset-2 rounded-full bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center shadow-lg">
          <FileText className="w-6 h-6 text-white" />
        </div>
      </div>
    </div>
  </div>
</div>

        {/* Amount to Withdraw Card */}
        <div className="bg-black rounded-2xl p-6 shadow-lg relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-green-500/20 to-transparent" />
          <div className="relative">
            <h3 className="text-sm font-medium text-white/60 mb-4">Available to Withdraw</h3>
            <div className="space-y-4">
              <div className="space-y-1">
                <p className="text-3xl font-bold text-white">$3,250</p>
                <p className="text-xs text-white/40">Total balance</p>
              </div>
              <button className="w-full py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg text-sm font-medium transition-colors">
                Withdraw Funds
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="flex gap-6">
        {/* Recent Projects Section - 70% width */}
        <div className="w-[70%] bg-white rounded-2xl shadow-lg border border-black/5 overflow-hidden">
          <div className="border-b border-black/5">
            <div className="p-6 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-black">Recent Projects</h2>
              <div className="flex items-center gap-2">
                <span className="text-sm text-black/40">View all</span>
                <ArrowUpRight className="w-4 h-4 text-black/40" />
              </div>
            </div>
          </div>
          <div className="p-6 space-y-4">
            {[1, 2, 3].map((project) => (
              <div key={project} className="flex items-center justify-between p-4 rounded-xl border border-black/5 hover:border-black/10 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-black/5 rounded-lg flex items-center justify-center">
                    <FileText className="w-6 h-6 text-black/40" />
                  </div>
                  <div>
                    <h3 className="font-medium text-black">Project Name Here</h3>
                    <p className="text-sm text-black/40">Client Name • Due in 3 days</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-semibold text-black">$2,500</p>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    In Progress
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side Column - 30% width */}
        <div className="w-[30%] space-y-6">
          {/* Add New Project Card */}
          <a 
            href="/add-new"
            className="block bg-black rounded-2xl p-6 shadow-lg relative overflow-hidden group hover:shadow-xl transition-all"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-white mb-1">Add New Project</h3>
                <p className="text-sm text-white/60">Create a new project</p>
              </div>
              <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center">
                <PlusCircle className="w-6 h-6 text-white" />
              </div>
            </div>
          </a>

          {/* Empty Space for Future Content */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-black/5 h-64">
            {/* Future content area */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardContent;
// import React from 'react';
// import { User, Edit2, FileText, CircleDollarSign, PlusCircle, ArrowUpRight, Phone, Mail, ExternalLink } from 'lucide-react';
// // import { Link } from 'react-router-dom';

// const DashboardContent = () => {
//   return (
//     <div className="min-h-screen bg-black/[0.02] p-6 space-y-6">
//       {/* Top Row */}
//       <div className="grid grid-cols-4 gap-6">
//         {/* User Details Card */}
//         <div className="bg-white rounded-2xl p-6 shadow-lg border border-black/5 relative overflow-hidden group">
//           <div className="absolute inset-0 bg-gradient-to-br from-black/[0.02] to-transparent" />
//           <div className="relative">
//             <div className="flex items-center justify-between mb-4">
//               <div className="w-12 h-12 bg-black rounded-xl flex items-center justify-center">
//                 <User className="w-6 h-6 text-white" />
//               </div>
//               <a
//                 href="/profile"
//                 className="text-xs text-black/60 hover:text-black flex items-center gap-1 transition-colors"
//               >
//                 <Edit2 className="w-4 h-4" />
//                 Edit Profile
//               </a>
//             </div>
//             <h3 className="text-lg font-semibold text-black mb-4">John Doe</h3>
//             <div className="space-y-2">
//               <div className="flex items-center text-sm text-black/60">
//                 <Phone className="w-4 h-4 mr-2" />
//                 +1 234 567 8900
//               </div>
//               <div className="flex items-center text-sm text-black/60">
//                 <Mail className="w-4 h-4 mr-2" />
//                 john.doe@email.com
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Unpaid Projects Card */}
//         <div className="bg-white rounded-2xl overflow-hidden shadow-lg border border-black/5">
//           <div className="h-1 bg-red-500 w-full" />
//           <div className="p-6">
//             <div className="flex items-center justify-between mb-4">
//               <h3 className="text-sm font-medium text-black/60">Unpaid Projects</h3>
//               <span className="text-xs text-red-500 font-medium">Attention Required</span>
//             </div>
//             <div className="flex items-end justify-between">
//               <div className="space-y-1">
//                 <p className="text-3xl font-bold text-black">05</p>
//                 <p className="text-xs text-black/40">Projects pending payment</p>
//               </div>
//               <div className="w-16 h-16 relative">
//                 <div className="absolute inset-0 bg-gradient-to-br from-red-500/20 to-orange-500/20 rounded-full transform rotate-45">
//                   <div className="absolute inset-0.5 rounded-full bg-white/40 backdrop-blur-sm"></div>
//                 </div>
//                 <div className="absolute inset-2 rounded-full bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center shadow-lg">
//                   <FileText className="w-6 h-6 text-white" />
//                 </div>
//             </div>
//           </div>
//         </div>

//         {/* Total Projects Card */}
//         <div className="bg-white rounded-2xl p-6 shadow-lg border border-black/5 relative overflow-hidden">
//           <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full -mr-16 -mt-16 blur-2xl" />
//           <div className="relative">
//             <h3 className="text-sm font-medium text-black/60 mb-4">Total Projects</h3>
//             <div className="flex items-end justify-between">
//               <div className="space-y-1">
//                 <p className="text-3xl font-bold text-black">12</p>
//                 <p className="text-xs text-black/40">Active projects</p>
//               </div>
//               <div className="w-16 h-16 relative">
//                 <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-indigo-600/20 rounded-full transform rotate-45">
//                   <div className="absolute inset-0.5 rounded-full bg-white/40 backdrop-blur-sm"></div>
//                 </div>
//                 <div className="absolute inset-2 rounded-full bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center shadow-lg">
//                   <FileText className="w-6 h-6 text-white" />
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Amount to Withdraw Card */}
//         <div className="bg-gradient-to-br from-indigo-900 via-indigo-800 to-blue-900 rounded-2xl p-6 shadow-lg relative overflow-hidden group">
//           <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
//           <div className="absolute -right-8 -top-8 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
//           <div className="relative">
//             <h3 className="text-sm font-medium text-indigo-200 mb-4">Available to Withdraw</h3>
//             <div className="space-y-4">
//               <div className="space-y-1">
//                 <p className="text-3xl font-bold text-white">$3,250</p>
//                 <p className="text-xs text-indigo-200/70">Total balance</p>
//               </div>
//               <button className="w-full py-2.5 bg-white/20 hover:bg-white/30 text-white rounded-lg text-sm font-medium transition-all duration-200 backdrop-blur-sm hover:scale-[1.02] active:scale-[0.98]">
//                 Withdraw Funds
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Bottom Row */}
//       <div className="flex gap-6">
//         {/* Recent Projects Section - 70% width */}
//         <div className="w-[70%] bg-white rounded-2xl shadow-lg border border-black/5 overflow-hidden">
//           <div className="border-b border-black/5">
//             <div className="p-6 flex items-center justify-between">
//               <h2 className="text-xl font-semibold text-black">Recent Projects</h2>
//               <div className="flex items-center gap-2">
//                 <span className="text-sm text-black/40">View all</span>
//                 <ArrowUpRight className="w-4 h-4 text-black/40" />
//               </div>
//             </div>
//           </div>
//           <div className="p-6 space-y-4">
//             {[1, 2, 3].map((project) => (
//               <div key={project} className="flex items-center justify-between p-4 rounded-xl border border-black/5 hover:border-black/10 transition-colors">
//                 <div className="flex items-center gap-4">
//                   <div className="w-12 h-12 bg-black/5 rounded-lg flex items-center justify-center">
//                     <FileText className="w-6 h-6 text-black/40" />
//                   </div>
//                   <div>
//                     <h3 className="font-medium text-black">Project Name Here</h3>
//                     <p className="text-sm text-black/40">Client Name • Due in 3 days</p>
//                   </div>
//                 </div>
//                 <div className="text-right">
//                   <p className="text-lg font-semibold text-black">$2,500</p>
//                   <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
//                     In Progress
//                   </span>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Right Side Column - 30% width */}
//         <div className="w-[30%] space-y-6">
//           {/* Add New Project Card */}
//           <a
//             href="/add-new"
//             className="block bg-black rounded-2xl p-6 shadow-lg relative overflow-hidden group hover:shadow-xl transition-all"
//           >
//             <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity" />
//             <div className="relative flex items-center justify-between">
//               <div>
//                 <h3 className="text-lg font-semibold text-white mb-1">Add New Project</h3>
//                 <p className="text-sm text-white/60">Create a new project</p>
//               </div>
//               <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center">
//                 <PlusCircle className="w-6 h-6 text-white" />
//               </div>
//             </div>
//           </a>

//           {/* Empty Space for Future Content */}
//           <div className="bg-white rounded-2xl p-6 shadow-lg border border-black/5 h-64">
//             {/* Future content area */}
//           </div>
//         </div>
//       </div>
//     </div>
//     </div>
//   );
// };

// export default DashboardContent;