'use client';

import React, { useState, useEffect } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  UserPlus, 
  Package, 
  Briefcase, 
  DollarSign, 
  CreditCard, 
  Calendar, 
  ArrowUpRight, 
  ArrowDownRight,
  Award,
  Clock,
  ChevronRight
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell, Legend } from 'recharts';

export default function Analytics() {
  const [timeFrame, setTimeFrame] = useState('30days');
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`/api/admin/analytics?timeFrame=${timeFrame}`);
        if (!response.ok) {
          throw new Error('Failed to fetch analytics data');
        }
        const result = await response.json();
        setData(result);
        setError(null);
      } catch (err) {
        console.error('Error fetching analytics:', err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, [timeFrame]);

  const handleTimeFrameChange = (newTimeFrame) => {
    setTimeFrame(newTimeFrame);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-600"></div>
          <p className="mt-4 text-gray-600">Loading analytics data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="bg-white p-8 rounded-xl shadow-lg text-center max-w-md border border-gray-200">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Error Loading Analytics</h3>
          <p className="text-gray-600 mb-6">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!data) return null;

  // Format number with commas
  const formatNumber = (num) => {
    return new Intl.NumberFormat('en-IN').format(num);
  };

  // Color variables
  const colors = {
    primary: '#8b5cf6',    // Purple
    secondary: '#2dd4bf',  // Teal
    tertiary: '#f97316',   // Orange
    quaternary: '#06b6d4', // Cyan
    success: '#10b981',    // Green
    danger: '#f43f5e',     // Red
    warning: '#f59e0b',    // Amber
    info: '#3b82f6',       // Blue
  };

  // Format daily stats data for charts
  const formattedDailyStats = data.charts.dailyStats.map(stat => ({
    ...stat,
    date: new Date(stat.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  }));
  
  // Payment stats for pie chart
  const paymentData = [
    { name: 'Paid', value: data.payments.totalPaid },
    { name: 'Unpaid', value: data.payments.totalUnpaid }
  ];
  
  const COLORS = [colors.success, colors.danger];

  // Custom tooltip styles
  const customTooltipStyle = {
    backgroundColor: 'white',
    border: '1px solid #e2e8f0',
    borderRadius: '0.5rem',
    padding: '0.75rem',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-full px-6 py-8">
        {/* Header with Time Filter */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h1>
            <p className="text-gray-600">Comprehensive overview of your platform's performance</p>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-1.5 flex space-x-2 border border-gray-100">
            <button 
              onClick={() => handleTimeFrameChange('24h')}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                timeFrame === '24h' ? 'bg-purple-600 text-white' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              24h
            </button>
            <button 
              onClick={() => handleTimeFrameChange('7days')}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                timeFrame === '7days' ? 'bg-purple-600 text-white' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              7d
            </button>
            <button 
              onClick={() => handleTimeFrameChange('30days')}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                timeFrame === '30days' ? 'bg-purple-600 text-white' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              30d
            </button>
            <button 
              onClick={() => handleTimeFrameChange('3months')}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                timeFrame === '3months' ? 'bg-purple-600 text-white' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              3m
            </button>
            <button 
              onClick={() => handleTimeFrameChange('1year')}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                timeFrame === '1year' ? 'bg-purple-600 text-white' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              1y
            </button>
          </div>
        </div>

        {/* Stats Cards - First Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Freelancers Card */}
          <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <p className="text-sm font-medium text-gray-500">Freelancers</p>
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                  <Users className="w-5 h-5 text-purple-600" />
                </div>
              </div>
              <h3 className="text-4xl font-bold text-gray-900 mb-2">{formatNumber(data.freelancers.total)}</h3>
              <div className="flex items-center mb-4">
                <div className={`flex items-center text-sm ${parseFloat(data.freelancers.growth) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {parseFloat(data.freelancers.growth) >= 0 ? 
                    <ArrowUpRight className="w-4 h-4 mr-1" /> : 
                    <ArrowDownRight className="w-4 h-4 mr-1" />
                  }
                  {Math.abs(parseFloat(data.freelancers.growth))}%
                </div>
                <span className="text-gray-500 text-sm ml-2">vs previous</span>
              </div>
            </div>
            <div className="bg-gray-50 px-6 py-4 border-t border-gray-100">
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-600">New freelancers</span>
                <span className="font-medium text-gray-900">{formatNumber(data.freelancers.new)}</span>
              </div>
            </div>
          </div>

          {/* Clients Card */}
          <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <p className="text-sm font-medium text-gray-500">Clients</p>
                <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center">
                  <Briefcase className="w-5 h-5 text-teal-600" />
                </div>
              </div>
              <h3 className="text-4xl font-bold text-gray-900 mb-2">{formatNumber(data.clients.total)}</h3>
              <div className="flex items-center mb-4">
                <div className={`flex items-center text-sm ${parseFloat(data.clients.growth) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {parseFloat(data.clients.growth) >= 0 ? 
                    <ArrowUpRight className="w-4 h-4 mr-1" /> : 
                    <ArrowDownRight className="w-4 h-4 mr-1" />
                  }
                  {Math.abs(parseFloat(data.clients.growth))}%
                </div>
                <span className="text-gray-500 text-sm ml-2">vs previous</span>
              </div>
            </div>
            <div className="bg-gray-50 px-6 py-4 border-t border-gray-100 space-y-2">
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-600">Active clients</span>
                <span className="font-medium text-gray-900">{formatNumber(data.clients.active)}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-600">New clients</span>
                <span className="font-medium text-gray-900">{formatNumber(data.clients.new)}</span>
              </div>
            </div>
          </div>

          {/* Deliveries Card */}
          <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <p className="text-sm font-medium text-gray-500">Deliveries</p>
                <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                  <Package className="w-5 h-5 text-orange-600" />
                </div>
              </div>
              <h3 className="text-4xl font-bold text-gray-900 mb-2">{formatNumber(data.deliveries.total)}</h3>
              <div className="flex items-center mb-4">
                <div className={`flex items-center text-sm ${parseFloat(data.deliveries.growth) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {parseFloat(data.deliveries.growth) >= 0 ? 
                    <ArrowUpRight className="w-4 h-4 mr-1" /> : 
                    <ArrowDownRight className="w-4 h-4 mr-1" />
                  }
                  {Math.abs(parseFloat(data.deliveries.growth))}%
                </div>
                <span className="text-gray-500 text-sm ml-2">vs previous</span>
              </div>
            </div>
            <div className="bg-gray-50 px-6 py-4 border-t border-gray-100 space-y-2">
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-600">New deliveries</span>
                <span className="font-medium text-gray-900">{formatNumber(data.deliveries.new)}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-600">Avg. order value</span>
                <span className="font-medium text-gray-900">₹{formatNumber(parseFloat(data.payments.avgOrderValue))}</span>
              </div>
            </div>
          </div>

          {/* Revenue Card */}
          <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <p className="text-sm font-medium text-gray-500">Revenue</p>
                <div className="w-10 h-10 bg-cyan-100 rounded-full flex items-center justify-center">
                  <DollarSign className="w-5 h-5 text-cyan-600" />
                </div>
              </div>
              <h3 className="text-4xl font-bold text-gray-900 mb-2">₹{formatNumber(data.payments.totalPaid)}</h3>
              <div className="flex items-center mb-4">
                <div className={`flex items-center text-sm ${parseFloat(data.payments.growth) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {parseFloat(data.payments.growth) >= 0 ? 
                    <ArrowUpRight className="w-4 h-4 mr-1" /> : 
                    <ArrowDownRight className="w-4 h-4 mr-1" />
                  }
                  {Math.abs(parseFloat(data.payments.growth))}%
                </div>
                <span className="text-gray-500 text-sm ml-2">vs previous</span>
              </div>
            </div>
            <div className="bg-gray-50 px-6 py-4 border-t border-gray-100 space-y-2">
           
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-600">Unpaid amount</span>
                <span className="font-medium text-gray-900">₹{formatNumber(data.payments.totalUnpaid)}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-600">Payment success rate</span>
                <span className="font-medium text-gray-900">{parseFloat(data.payments.successRate)}%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Charts Section - Row 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Daily Activity Line Chart */}
          <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-900">Daily Activity</h3>
              <div className="flex gap-2">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-purple-500 mr-1.5"></div>
                  <span className="text-xs text-gray-600">Freelancers</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-teal-500 mr-1.5"></div>
                  <span className="text-xs text-gray-600">Clients</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-orange-500 mr-1.5"></div>
                  <span className="text-xs text-gray-600">Deliveries</span>
                </div>
              </div>
            </div>
            <div className="p-6">
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={formattedDailyStats}
                    margin={{ top: 10, right: 10, left: 0, bottom: 10 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                    <XAxis 
                      dataKey="date" 
                      tick={{ fontSize: 12 }}
                      tickLine={false}
                      axisLine={{ stroke: '#e5e7eb' }}
                    />
                    <YAxis 
                      tick={{ fontSize: 12 }}
                      tickLine={false}
                      axisLine={{ stroke: '#e5e7eb' }}
                    />
                    <Tooltip 
                      contentStyle={customTooltipStyle}
                    />
                    <Line
                      type="monotone"
                      dataKey="freelancers"
                      name="New Freelancers"
                      stroke={colors.primary}
                      strokeWidth={2}
                      dot={{ r: 2, fill: colors.primary }}
                      activeDot={{ r: 4 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="clients"
                      name="New Clients"
                      stroke={colors.secondary}
                      strokeWidth={2}
                      dot={{ r: 2, fill: colors.secondary }}
                      activeDot={{ r: 4 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="deliveries"
                      name="New Deliveries"
                      stroke={colors.tertiary}
                      strokeWidth={2}
                      dot={{ r: 2, fill: colors.tertiary }}
                      activeDot={{ r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Revenue Chart */}
          <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900">Revenue Trend</h3>
            </div>
            <div className="p-6">
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={formattedDailyStats}
                    margin={{ top: 10, right: 10, left: 0, bottom: 10 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                    <XAxis 
                      dataKey="date" 
                      tick={{ fontSize: 12 }}
                      tickLine={false}
                      axisLine={{ stroke: '#e5e7eb' }}
                    />
                    <YAxis 
                      tick={{ fontSize: 12 }}
                      tickLine={false}
                      axisLine={{ stroke: '#e5e7eb' }}
                      tickFormatter={(value) => `₹${value}`}
                    />
                    <Tooltip 
                      formatter={(value) => [`₹${formatNumber(value)}`, 'Revenue']}
                      contentStyle={customTooltipStyle}
                    />
                    <Bar 
                      dataKey="revenue" 
                      name="Revenue" 
                      fill={colors.quaternary} 
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>

        {/* Charts Section - Row 2 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Payment Distribution */}
          <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900">Payment Distribution</h3>
            </div>
            <div className="p-6">
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={paymentData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      fill="#8884d8"
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {paymentData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip 
                      formatter={(value) => [`₹${formatNumber(value)}`, 'Amount']}
                      contentStyle={customTooltipStyle}
                    />
                    <Legend 
                      layout="vertical" 
                      verticalAlign="middle" 
                      align="right"
                      formatter={(value, entry, index) => (
                        <span className="text-sm">{value}</span>
                      )}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 space-y-3">
                <div className="flex justify-between items-center text-sm">
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
                    <span>Total Requested</span>
                  </div>
                  <span className="font-medium"> ₹{formatNumber(data.payments.totalPaid + data.payments.totalUnpaid)}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                    <span>Paid</span>
                  </div>
                  <span className="font-medium">₹{formatNumber(data.payments.totalPaid)}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                    <span>Unpaid</span>
                  </div>
                  <span className="font-medium">₹{formatNumber(data.payments.totalUnpaid)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Top Freelancers */}
          <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-900">Top Performing Freelancers</h3>
              <button className="text-sm text-purple-600 hover:text-purple-700 flex items-center">
                View All <ChevronRight className="w-4 h-4 ml-1" />
              </button>
            </div>
            <div className="divide-y divide-gray-100">
              {data.insights.topFreelancers.map((freelancer, index) => (
                <div key={freelancer.id} className="flex items-center p-4 hover:bg-gray-50">
                  <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center mr-3 text-sm font-medium text-purple-600">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-medium text-gray-900">{freelancer.name}</h4>
                    <p className="text-xs text-gray-500">{freelancer.deliveries} deliveries</p>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-medium text-gray-900">₹{formatNumber(freelancer.earnings)}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Most Active Clients */}
          <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-900">Most Active Clients</h3>
              <button className="text-sm text-purple-600 hover:text-purple-700 flex items-center">
                View All <ChevronRight className="w-4 h-4 ml-1" />
              </button>
            </div>
            <div className="divide-y divide-gray-100">
              {data.insights.mostActiveClients.map((client, index) => (
                <div key={client.id} className="flex items-center p-4 hover:bg-gray-50">
                  <div className="w-8 h-8 rounded-full bg-teal-100 flex items-center justify-center mr-3 text-sm font-medium text-teal-600">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-medium text-gray-900">{client.name}</h4>
                    <p className="text-xs text-gray-500">{client.deliveriesCount} deliveries</p>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-medium text-gray-900">₹{formatNumber(client.totalSpent)}</span>
                    <p className="text-xs text-gray-500">{client.paymentRate}% paid</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Additional Insights Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Payment Success Rate */}
          <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow">
            <div className="p-6">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center mr-4">
                  <TrendingUp className="w-5 h-5 text-indigo-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Payment Success Rate</h3>
              </div>
              <div className="flex items-end justify-between mb-3">
                <p className="text-3xl font-bold text-gray-900">{parseFloat(data.payments.successRate)}%</p>
                <div className={`flex items-center text-sm ${parseFloat(data.payments.successRate) > 50 ? 'text-green-600' : 'text-yellow-600'}`}>
                  {parseFloat(data.payments.successRate) > 50 ? 'Good' : 'Needs Improvement'}
                </div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5 mb-1">
                <div 
                  className="bg-indigo-600 h-2.5 rounded-full" 
                  style={{ width: `${parseFloat(data.payments.successRate)}%` }}
                ></div>
              </div>
              <p className="text-xs text-gray-500 mt-2">Percentage of paid vs. total deliveries</p>
            </div>
          </div>

          {/* Average Order Value */}
          <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow">
            <div className="p-6">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center mr-4">
                  <CreditCard className="w-5 h-5 text-emerald-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Avg. Order Value</h3>
              </div>
              <p className="text-3xl font-bold text-gray-900 mb-3">₹{formatNumber(parseFloat(data.payments.avgOrderValue))}</p>
              <div className="flex items-center text-sm text-gray-500">
                <span>Calculated across {formatNumber(data.deliveries.total)} deliveries</span>
              </div>
            </div>
          </div>

          {/* New User Onboarding */}
          <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow">
            <div className="p-6">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center mr-4">
                  <UserPlus className="w-5 h-5 text-amber-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">New User Onboarding</h3>
              </div>
              <div className="flex items-center justify-between mb-3">
                <div>
                  <p className="text-3xl font-bold text-gray-900">{formatNumber(data.freelancers.new)}</p>
                  <p className="text-sm text-gray-500">Freelancers</p>
                </div>
                <div className="text-xl text-gray-300 font-bold">/</div>
                <div>
                  <p className="text-3xl font-bold text-gray-900">{formatNumber(data.clients.new)}</p>
                  <p className="text-sm text-gray-500">Clients</p>
                </div>
              </div>
              <div className="mt-2 flex items-center gap-1 text-sm">
                <div className="h-2 w-2 rounded-full bg-purple-500"></div>
                <span className="text-gray-600">New registrations this period</span>
              </div>
            </div>
          </div>

          {/* Active Users */}
          <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow">
            <div className="p-6">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                  <Users className="w-5 h-5 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Active Users</h3>
              </div>
              <div className="flex items-end justify-between mb-3">
                <div>
                  <p className="text-sm text-gray-500">Active Clients</p>
                  <p className="text-3xl font-bold text-gray-900">{formatNumber(data.clients.active)}</p>
                </div>
                <div className={`flex items-center text-sm ${(data.clients.active / data.clients.total) > 0.7 ? 'text-green-600' : 'text-yellow-600'}`}>
                  {((data.clients.active / data.clients.total) * 100).toFixed(0)}% of total
                </div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5 mb-1">
                <div 
                  className="bg-blue-600 h-2.5 rounded-full" 
                  style={{ width: `${(data.clients.active / data.clients.total) * 100}%` }}
                ></div>
              </div>
              <p className="text-xs text-gray-500 mt-2">Actively engaged clients in current period</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}