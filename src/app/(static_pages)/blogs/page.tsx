"use client"
import React, { useState, useEffect } from 'react';
import { Book, ArrowRight, Calendar, Clock, Search } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

const BlogListing = () => {
  const [blogs, setBlogs] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        // Using your existing API endpoint without publishedOnly parameter
        const response = await fetch(`/api/get-published-blogs?page=${page}&limit=10`);
        
        if (!response.ok) {
          throw new Error(`Error fetching blogs: ${response.status}`);
        }
        
        const data = await response.json();
        setBlogs(data.blogs || []);
        setTotalPages(data.pagination.pages);
      } catch (err) {
        console.error('Failed to fetch blogs:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, [page]);

  // Client-side filtering based on search term
  const filteredBlogs = blogs && blogs.filter(blog => 
    blog.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  // Estimate read time (rough calculation - 200 words per minute)
  const calculateReadTime = (content) => {
    if (!content) return 1;
    const wordsPerMinute = 200;
    const wordCount = content.trim().split(/\s+/).length;
    const readTime = Math.ceil(wordCount / wordsPerMinute);
    return readTime < 1 ? 1 : readTime;
  };

  // Navigate to blog post
  const navigateToBlog = (blogId) => {
    window.location.href = `/blog/${blogId}`;
  };

  return (
    <div className="relative bg-white min-h-screen py-4 sm:py-4 md:py-4">
      {/* Premium Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000008_1px,transparent_1px),linear-gradient(to_bottom,#00000008_1px,transparent_1px)] bg-[size:24px_24px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/[0.02] to-transparent" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center gap-2 text-sm font-medium 
                       bg-black/5 text-black/80 px-4 py-2 rounded-full mb-4">
            <Book className="w-4 h-4" />
            OUR BLOG
            <Book className="w-4 h-4" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Latest Insights & Stories
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore our collection of articles, tutorials, and industry insights to help you stay informed and inspired.
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="relative">
            <input
              type="text"
              placeholder="Search articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full py-3 px-12 rounded-xl border border-gray-200 focus:border-black 
                        focus:outline-none focus:ring-1 focus:ring-black transition-all"
            />
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          </div>
        </div>

        {/* Blog Listing */}
        <div className="max-w-5xl mx-auto">
          {loading ? (
            <div className="flex justify-center items-center min-h-[300px]">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black"></div>
            </div>
          ) : error ? (
            <div className="text-center py-16">
              <h3 className="text-xl font-semibold text-gray-800">Error loading blogs</h3>
              <p className="text-gray-600 mt-2">{error}</p>
            </div>
          ) : (
            <>
              {!filteredBlogs || filteredBlogs.length === 0 ? (
                <div className="text-center py-16">
                  <h3 className="text-xl font-semibold text-gray-800">No blogs found</h3>
                  <p className="text-gray-600 mt-2">Try adjusting your search or check back later for new content.</p>
                </div>
              ) : (
                <>
                  <div className="grid md:grid-cols-2 gap-8">
                    {filteredBlogs.map((blog, index) => (
                    <div
                      key={blog.id}
                      className="group cursor-pointer"
                      onClick={() => navigateToBlog(blog.id)}
                    >
                      <div className="bg-white rounded-2xl shadow-[0_4px_20px_rgb(0,0,0,0.08)] 
                                border border-gray-100 overflow-hidden transition-all 
                                hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:border-gray-200">
                        {/* Blog Image */}
                        <div className="relative h-48 w-full overflow-hidden bg-gray-100">
                          {blog.bannerImage ? (
                            <Image
                              src={blog.bannerImage}
                              alt={blog.title}
                              fill
                              className="object-cover transition-transform group-hover:scale-105"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-black/5">
                              <Book className="w-12 h-12 text-gray-400" />
                            </div>
                          )}
                        </div>
                        
                        {/* Blog Content */}
                        <div className="p-6">
                          <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                            <div className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              <span>{formatDate(blog.publishedAt || blog.createdAt)}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              <span>{calculateReadTime(blog.content)} min read</span>
                            </div>
                          </div>

                          <h3 className="text-xl font-semibold text-gray-900 mb-3 
                                     transition-colors group-hover:text-black">
                            {blog.title}
                          </h3>
                          
                          <div className="flex items-center mt-4 text-gray-900 font-medium">
                            <span>Read article</span>
                            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  </div>
                  
                  {/* Pagination Controls */}
                  {totalPages > 1 && (
                    <div className="flex justify-center items-center mt-12 space-x-2">
                      <button 
                        onClick={() => setPage(prev => Math.max(prev - 1, 1))}
                        disabled={page === 1}
                        className="px-4 py-2 rounded-lg border border-gray-200 disabled:opacity-50 
                               hover:bg-black/5 transition-colors"
                      >
                        Previous
                      </button>
                      
                      <div className="flex space-x-1">
                        {[...Array(totalPages)].map((_, i) => (
                          <button
                            key={i}
                            onClick={() => setPage(i + 1)}
                            className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors
                                     ${page === i + 1 
                                       ? 'bg-black text-white' 
                                       : 'hover:bg-black/5'}`}
                          >
                            {i + 1}
                          </button>
                        ))}
                      </div>
                      
                      <button
                        onClick={() => setPage(prev => Math.min(prev + 1, totalPages))}
                        disabled={page === totalPages}
                        className="px-4 py-2 rounded-lg border border-gray-200 disabled:opacity-50 
                               hover:bg-black/5 transition-colors"
                      >
                        Next
                      </button>
                    </div>
                  )}
                </>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogListing;