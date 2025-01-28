"use client "

import React from 'react';
import { User, Edit2, FileText, CircleDollarSign, PlusCircle, ArrowUpRight, Phone, Mail, ExternalLink } from 'lucide-react';
import { useAuth } from '@/context/authContext';


const DashboardContent = () => {
  const { freelancerId, email, isAuthenticated, isLoading, logout } = useAuth();
  
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
