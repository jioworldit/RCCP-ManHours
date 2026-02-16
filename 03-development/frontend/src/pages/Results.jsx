import React, { useState, useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend 
} from 'recharts';

const Results = () => {
  const { projectId } = useParams();
  
  // Results data
  const results = {
    totalManHours: 1250.5,
    duration: 45,
    manpowerRequired: 850,
    estimatedCost: 45000
  };

  // Activity distribution data for charts
  const activityData = [
    { name: 'Welding', value: 400, percentage: 32, color: '#2563eb' },
    { name: 'Cutting', value: 200, percentage: 16, color: '#22c55e' },
    { name: 'Fit-Up', value: 180, percentage: 14.4, color: '#eab308' },
    { name: 'Material', value: 150, percentage: 12, color: '#a855f7' },
    { name: 'NDT', value: 120, percentage: 9.6, color: '#ec4899' },
    { name: 'Other', value: 200.5, percentage: 16, color: '#9ca3af' }
  ];

  // Detailed breakdown data
  const breakdownData = [
    { type: 'Welding Operations', hours: 400.0, percentage: 32.0, crew: 4, duration: 12.5 },
    { type: 'Marking & Cutting', hours: 200.0, percentage: 16.0, crew: 3, duration: 8.3 },
    { type: 'Fit-Up Assembly', hours: 180.0, percentage: 14.4, crew: 4, duration: 5.6 },
    { type: 'Material Handling', hours: 150.0, percentage: 12.0, crew: 2, duration: 9.4 },
    { type: 'NDT', hours: 120.0, percentage: 9.6, crew: 2, duration: 7.5 },
    { type: 'Hydrostatic Testing', hours: 80.0, percentage: 6.4, crew: 3, duration: 3.3 },
    { type: 'Painting & Coating', hours: 70.0, percentage: 5.6, crew: 2, duration: 4.4 },
    { type: 'Other', hours: 50.5, percentage: 4.0, crew: 2, duration: 3.2 }
  ];

  const handleExportCSV = () => {
    const headers = ['Activity Type', 'Hours', 'Percentage', 'Crew', 'Duration'];
    const rows = breakdownData.map(row => [row.type, row.hours, row.percentage, row.crew, row.duration]);
    const csvContent = [headers, ...rows].map(e => e.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `RCCP-${projectId || 'project'}-results.csv`;
    a.click();
  };

  const handleExportPDF = () => {
    alert('PDF export functionality would be implemented here');
  };

  const handleExportExcel = () => {
    alert('Excel export functionality would be implemented here');
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link to="/dashboard" className="text-2xl font-bold text-blue-600">RCCP</Link>
              <span className="ml-2 text-gray-600">Man-Hours</span>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-500">Project: {projectId || 'RCCP-2026-001'}</span>
              <Link to="/dashboard" className="text-gray-600 hover:text-gray-800">Exit</Link>
            </div>
          </div>
        </div>
      </header>

      {/* Progress Stepper */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="flex items-center text-green-600">
                <span className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold">✓</span>
                <span className="ml-2 font-medium">Project</span>
              </div>
              <div className="w-16 h-0.5 bg-green-600 mx-2"></div>
              <div className="flex items-center text-green-600">
                <span className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold">✓</span>
                <span className="ml-2 font-medium">Components</span>
              </div>
              <div className="w-16 h-0.5 bg-green-600 mx-2"></div>
              <div className="flex items-center text-green-600">
                <span className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold">✓</span>
                <span className="ml-2 font-medium">Scope</span>
              </div>
              <div className="w-16 h-0.5 bg-green-600 mx-2"></div>
              <div className="flex items-center text-green-600">
                <span className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold">✓</span>
                <span className="ml-2 font-medium">Activities</span>
              </div>
              <div className="w-16 h-0.5 bg-green-600 mx-2"></div>
              <div className="flex items-center text-blue-600">
                <span className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">5</span>
                <span className="ml-2 font-medium">Results</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Project Results</h1>
          <div className="space-x-2">
            <button 
              onClick={handleExportCSV}
              className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm font-medium transition"
            >
              📄 Export CSV
            </button>
            <button 
              onClick={handleExportPDF}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-medium transition"
            >
              📑 Export PDF
            </button>
            <button 
              onClick={handleExportExcel}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition"
            >
              📊 Export Excel
            </button>
            <button 
              onClick={handlePrint}
              className="px-4 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50 transition"
            >
              🖨️ Print
            </button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-blue-100 text-blue-600">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-500">Total Man-Hours</p>
                <p className="text-2xl font-bold text-gray-800">{results.totalManHours.toLocaleString()}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-green-100 text-green-600">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-500">Duration</p>
                <p className="text-2xl font-bold text-gray-800">{results.duration} days</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-purple-100 text-purple-600">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-500">Manpower Required</p>
                <p className="text-2xl font-bold text-gray-800">{results.manpowerRequired} shifts</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-yellow-100 text-yellow-600">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-500">Est. Cost</p>
                <p className="text-2xl font-bold text-gray-800">${results.estimatedCost.toLocaleString()}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Charts & Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Activity Distribution Chart */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-gray-800 mb-4">Activity Distribution</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={activityData}
                    cx="50%"
                    cy="50%"
                    labelLine={true}
                    label={({ name, percentage }) => `${name}: ${percentage}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {activityData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value} hrs`, 'Hours']} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Hours by Category */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-gray-800 mb-4">Hours by Category</h3>
            <div className="space-y-4">
              {activityData.map((item, index) => (
                <div key={index}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">{item.name}</span>
                    <span className="font-medium">{item.value} hrs ({item.percentage}%)</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="h-2 rounded-full transition-all duration-500" 
                      style={{ width: `${item.percentage}%`, backgroundColor: item.color }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Detailed Breakdown Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 border-b">
            <h3 className="text-lg font-medium text-gray-800">Detailed Breakdown</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left font-medium text-gray-500">Activity Type</th>
                  <th className="px-6 py-3 text-right font-medium text-gray-500">Hours</th>
                  <th className="px-6 py-3 text-right font-medium text-gray-500">%</th>
                  <th className="px-6 py-3 text-center font-medium text-gray-500">Crew</th>
                  <th className="px-6 py-3 text-right font-medium text-gray-500">Duration</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {breakdownData.map((row, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-3 font-medium text-gray-900">{row.type}</td>
                    <td className="px-6 py-3 text-right">{row.hours.toFixed(1)}</td>
                    <td className="px-6 py-3 text-right">{row.percentage.toFixed(1)}%</td>
                    <td className="px-6 py-3 text-center">{row.crew}</td>
                    <td className="px-6 py-3 text-right">{row.duration.toFixed(1)} days</td>
                  </tr>
                ))}
              </tbody>
              <tfoot className="bg-gray-100 font-bold">
                <tr>
                  <td className="px-6 py-3">TOTAL</td>
                  <td className="px-6 py-3 text-right text-blue-600">{results.totalManHours.toFixed(1)}</td>
                  <td className="px-6 py-3 text-right">100%</td>
                  <td className="px-6 py-3 text-center">-</td>
                  <td className="px-6 py-3 text-right">{results.duration.toFixed(1)} days</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between items-center mt-8">
          <Link to={`/project/${projectId}/activities`} className="text-gray-600 hover:text-gray-800 transition">
            ← Back to Activities
          </Link>
          <div className="space-x-4">
            <Link 
              to="/dashboard"
              className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition inline-block"
            >
              ✓ Complete Project
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Results;
