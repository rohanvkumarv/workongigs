
"use client"

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Search, Eye, Download, ExternalLink, Filter, ChevronDown } from 'lucide-react';

const ProjectsPage = () => {
  // const params = useParams();
  // const freelancerId = params.userid;

  // useEffect(() => {
  //   const freelancerId = localStorage.getItem("freelancerId");
  //   console.log(freelancerId);
  //   if (freelancerId) {
  //     fetchProjects();
  //   }
  // }, []);

  const [freelancerId, setFreelancerId] = useState(null); 

  useEffect(() => {
    const id = localStorage.getItem("freelancerId");
    console.log("FreelancerId from localStorage:", id);
    
    if (id) {
      setFreelancerId(id);  // Store in state
      console.log("About to fetch projects");
      fetchProjects(id);  // Pass the id directly to fetchProjects
    } else {
      console.log("No freelancerId found in localStorage");
    }
  }, []);


  const [allProjects, setAllProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [isLoading, setIsLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);

  const filters = [
    { id: 'all', label: 'All Projects' },
    { id: 'active', label: 'Active' },
    { id: 'completed', label: 'Completed' },
    { id: 'pending', label: 'Pending' }
  ];

    
      useEffect(() => {
        filterProjects();
      }, [searchTerm, activeFilter, allProjects]);
    
      // const fetchProjects = async () => {
      //   try {
      //     setIsLoading(true);
      //     const response = await fetch('/api/get-freelancer-projects', {
      //       method: 'POST',
      //       headers: {
      //         'Content-Type': 'application/json'
      //       },
      //       body: JSON.stringify({ freelancerId })
      //     });
      //     const data = await response.json();
      //     if (!response.ok) throw new Error(data.error);
      //     setAllProjects(data);
      //     setFilteredProjects(data);
      //   } catch (error) {
      //     console.error('Error fetching projects:', error);
      //   } finally {
      //     setIsLoading(false);
      //   }
      // };
      const fetchProjects = async (id) => {  // Accept id as parameter
        try {
          setIsLoading(true);
          const response = await fetch('/api/get-freelancer-projects', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ freelancerId: id })  // Use the passed id
          });
          const data = await response.json();
          if (!response.ok) throw new Error(data.error);
          setAllProjects(data);
          setFilteredProjects(data);
        } catch (error) {
          console.error('Error fetching projects:', error);
        } finally {
          setIsLoading(false);
        }
      };
      const filterProjects = () => {
        let filtered = [...allProjects];
    
        if (searchTerm) {
          filtered = filtered.filter(project => 
            project.name.toLowerCase().includes(searchTerm.toLowerCase())
          );
        }
    
        if (activeFilter !== 'all') {
          filtered = filtered.filter(project => 
            project.status.toLowerCase() === activeFilter.toLowerCase()
          );
        }
    
        setFilteredProjects(filtered);
      };
    
  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'completed': return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'active': return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'pending': return 'bg-amber-50 text-amber-700 border-amber-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  return (
    // <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-8 space-y-4 md:space-y-6">
    // <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-8 space-y-4 md:space-y-6 mt-[57px] md:mt-0">  {/* Added margin-top */}
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-8 space-y-4 md:space-y-6 mt-[57px] md:mt-0 relative z-[1]">
      {/* Top Strip */}
      <div className="bg-white rounded-xl md:rounded-2xl shadow-xl border border-gray-200/50 backdrop-blur-sm relative z-[2]">
        {/* ... rest of your top strip content ... */}
      {/* <div className="bg-white rounded-xl md:rounded-2xl shadow-xl border border-gray-200/50 backdrop-blur-sm"> */}
        <div className="px-4 md:px-8 py-4 md:py-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-black rounded-xl flex items-center justify-center shadow-lg">
                <svg className="w-5 h-5 md:w-6 md:h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div>
                <h1 className="text-xl md:text-2xl font-semibold text-gray-900">Your Projects</h1>
                <p className="text-sm text-gray-500">View and manage all your projects</p>
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row items-stretch md:items-center gap-4">
              <div className="relative flex-1 md:flex-none">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input 
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search projects..."
                  className="w-full md:w-64 pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all shadow-sm"
                />
              </div>
              <button 
                onClick={() => setShowFilters(!showFilters)}
                className="md:hidden p-2.5 bg-white hover:bg-gray-50 rounded-xl transition-colors border border-gray-200 shadow-sm flex items-center justify-center gap-2"
              >
                <Filter className="w-5 h-5 text-gray-600" />
                <span className="text-sm text-gray-600">Filters</span>
                <ChevronDown className={`w-4 h-4 text-gray-600 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
              </button>
              <button className="hidden md:block p-2.5 bg-white hover:bg-gray-50 rounded-xl transition-colors border border-gray-200 shadow-sm">
                <Filter className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>

          {/* Filter Pills */}
          <div className={`flex flex-wrap gap-2 mt-4 ${!showFilters && 'hidden md:flex'}`}>
            {filters.map(filter => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`flex-1 md:flex-none px-4 py-2 rounded-xl text-sm font-medium transition-all shadow-sm ${
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
      <div className="bg-white rounded-xl md:rounded-2xl shadow-xl border border-gray-200/50 backdrop-blur-sm relative z-[1]">
      {/* <div className="bg-white rounded-xl md:rounded-2xl shadow-xl border border-gray-200/50 backdrop-blur-sm"> */}
        {/* Project Labels - Hidden on mobile */}
        <div className="hidden md:block px-6 py-4 border-b border-gray-200">
          <div className="grid grid-cols-6 gap-4">
            <div className="text-sm font-medium text-gray-500">Project Name</div>
            <div className="text-sm font-medium text-gray-500">Instances</div>
            <div className="text-sm font-medium text-gray-500">Date</div>
            <div className="text-sm font-medium text-gray-500">Total Price</div>
            <div className="text-sm font-medium text-gray-500">Status</div>
            <div className="text-sm font-medium text-gray-500 text-right">Actions</div>
          </div>
        </div>

        {/* Projects List */}
        <div className="divide-y divide-gray-200">
          {isLoading ? (
            <div className="px-4 md:px-6 py-8 text-center text-gray-500">Loading projects...</div>
          ) : filteredProjects.length === 0 ? (
            <div className="px-4 md:px-6 py-8 text-center text-gray-500">No projects found</div>
          ) : (
            filteredProjects.map((project) => (
              <div 
                key={project.id}
                className="px-4 md:px-6 py-4 hover:bg-gray-50/50 transition-all group"
              >
                {/* Mobile Layout */}
                <div className="md:hidden space-y-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium text-gray-900">{project.name}</h3>
                      <p className="text-sm text-gray-600 mt-1">
                        {project.instanceCount} instances • {new Date(project.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(project.status)}`}>
                      {project.status}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="font-medium text-gray-900">₹{project.totalCost.toLocaleString()}</div>
                    <button 
                      onClick={() => window.location.href = `/freelancer/${freelancerId}/projects/${project.id}`}
                      className="p-2 bg-white hover:bg-gray-50 rounded-lg transition-all border border-gray-200 shadow-sm"
                    >
                      <Eye className="w-4 h-4 text-gray-600" />
                    </button>
                  </div>
                </div>

                {/* Desktop Layout */}
                <div className="hidden md:grid grid-cols-6 gap-4 items-center">
                  <div>
                    <h3 className="font-medium text-gray-900">{project.name}</h3>
                  </div>
                  <div className="text-gray-600">
                    {project.instanceCount} instances
                  </div>
                  <div className="text-gray-600">
                    {new Date(project.createdAt).toLocaleDateString()}
                  </div>
                  <div className="font-medium text-gray-900">
                    ₹{project.totalCost.toLocaleString()}
                  </div>
                  <div>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(project.status)}`}>
                      {project.status}
                    </span>
                  </div>
                  <div className="flex items-center justify-end gap-2">
                    <button 
                      onClick={() => window.location.href = `/freelancer/${freelancerId}/projects/${project.id}`}
                      className="p-2 bg-white hover:bg-gray-50 rounded-lg transition-all relative border border-gray-200 shadow-sm group/button"
                    >
                      <Eye className="w-4 h-4 text-gray-600 transform transition-transform group-hover/button:scale-110" />
                      <div className="absolute bottom-full right-0 mb-2 opacity-0 group-hover/button:opacity-100 transition-all duration-200 translate-y-1 group-hover/button:translate-y-0">
                        <div className="px-2 py-1 text-xs font-medium text-white bg-gray-900 rounded-lg shadow-lg whitespace-nowrap">
                          View Project
                        </div>
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectsPage;