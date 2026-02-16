import React from 'react';
import { Link } from 'react-router-dom';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { Clock, Calendar, Users, DollarSign } from 'lucide-react';

const Results = () => {
  const chartData = [
    { name: 'Welding', value: 32, color: '#2563eb' },
    { name: 'Cutting', value: 16, color: '#22c55e' },
    { name: 'Fit-Up', value: 14, color: '#eab308' },
    { name: 'Material', value: 12, color: '#a855f7' },
    { name: 'NDT', value: 10, color: '#ec4899' },
    { name: 'Other', value: 16, color: '#9ca3af' }
  ];

  const categoryData = [
    { name: 'Welding Operations', hours: 400.0, percent: 32.0, crew: 4, duration: 12.5, color: '#2563eb' },
    { name: 'Marking & Cutting', hours: 200.0, percent: 16.0, crew: 3, duration: 8.3, color: '#22c55e' },
    { name: 'Fit-Up Assembly', hours: 180.0, percent: 14.4, crew: 4, duration: 5.6, color: '#eab308' },
    { name: 'Material Handling', hours: 150.0, percent: 12.0, crew: 2, duration: 9.4, color: '#a855f7' },
    { name: 'NDT', hours: 120.0, percent: 9.6, crew: 2, duration: 7.5, color: '#ec4899' },
    { name: 'Hydrostatic Testing', hours: 80.0, percent: 6.4, crew: 3, duration: 3.3, color: '#14b8a6' },
    { name: 'Painting & Coating', hours: 70.0, percent: 5.6, crew: 2, duration: 4.4, color: '#f97316' },
    { name: 'Other', hours: 50.5, percent: 4.0, crew: 2, duration: 3.2, color: '#9ca3af' }
  ];

  const summaryCards = [
    { title: 'Total Man-Hours', value: '1,250.5', icon: Clock, color: '#2563eb', bgColor: '#dbeafe' },
    { title: 'Duration', value: '45 days', icon: Calendar, color: '#16a34a', bgColor: '#dcfce7' },
    { title: 'Manpower Required', value: '850 shifts', icon: Users, color: '#a855f7', bgColor: '#f3e8ff' },
    { title: 'Est. Cost', value: '$45,000', icon: DollarSign, color: '#eab308', bgColor: '#fef3c7' }
  ];

  return (
    <div style={{ backgroundColor: '#f3f4f6', minHeight: '100vh' }}>
      {/* Header */}
      <header style={{ backgroundColor: 'white', borderBottom: '1px solid #e5e7eb', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '64px' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Link to="/dashboard" style={{ fontSize: '24px', fontWeight: 'bold', color: '#2563eb', textDecoration: 'none' }}>RCCP</Link>
              <span style={{ marginLeft: '8px', fontSize: '18px', color: '#4b5563' }}>Man-Hours</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <span style={{ fontSize: '14px', color: '#6b7280' }}>Project: RCCP-2026-001</span>
              <Link to="/dashboard" style={{ color: '#4b5563', textDecoration: 'none', fontSize: '14px' }}>Exit</Link>
            </div>
          </div>
        </div>
      </header>

      {/* Progress Stepper */}
      <div style={{ backgroundColor: 'white', borderBottom: '1px solid #e5e7eb' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '16px 24px' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            {/* Step 1 - Completed */}
            <div style={{ display: 'flex', alignItems: 'center', color: '#16a34a' }}>
              <span style={{ width: '32px', height: '32px', backgroundColor: '#16a34a', color: 'white', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', fontWeight: 'bold' }}>✓</span>
              <span style={{ marginLeft: '8px', fontWeight: '500', fontSize: '14px' }}>Project</span>
            </div>
            <div style={{ width: '64px', height: '2px', backgroundColor: '#16a34a', margin: '0 8px' }}></div>
            {/* Step 2 - Completed */}
            <div style={{ display: 'flex', alignItems: 'center', color: '#16a34a' }}>
              <span style={{ width: '32px', height: '32px', backgroundColor: '#16a34a', color: 'white', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', fontWeight: 'bold' }}>✓</span>
              <span style={{ marginLeft: '8px', fontWeight: '500', fontSize: '14px' }}>Components</span>
            </div>
            <div style={{ width: '64px', height: '2px', backgroundColor: '#16a34a', margin: '0 8px' }}></div>
            {/* Step 3 - Completed */}
            <div style={{ display: 'flex', alignItems: 'center', color: '#16a34a' }}>
              <span style={{ width: '32px', height: '32px', backgroundColor: '#16a34a', color: 'white', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', fontWeight: 'bold' }}>✓</span>
              <span style={{ marginLeft: '8px', fontWeight: '500', fontSize: '14px' }}>Scope</span>
            </div>
            <div style={{ width: '64px', height: '2px', backgroundColor: '#16a34a', margin: '0 8px' }}></div>
            {/* Step 4 - Completed */}
            <div style={{ display: 'flex', alignItems: 'center', color: '#16a34a' }}>
              <span style={{ width: '32px', height: '32px', backgroundColor: '#16a34a', color: 'white', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', fontWeight: 'bold' }}>✓</span>
              <span style={{ marginLeft: '8px', fontWeight: '500', fontSize: '14px' }}>Activities</span>
            </div>
            <div style={{ width: '64px', height: '2px', backgroundColor: '#16a34a', margin: '0 8px' }}></div>
            {/* Step 5 - Current */}
            <div style={{ display: 'flex', alignItems: 'center', color: '#2563eb' }}>
              <span style={{ width: '32px', height: '32px', backgroundColor: '#2563eb', color: 'white', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', fontWeight: 'bold' }}>5</span>
              <span style={{ marginLeft: '8px', fontWeight: '500', fontSize: '14px' }}>Results</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main style={{ maxWidth: '1280px', margin: '0 auto', padding: '32px 24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <h1 style={{ fontSize: '24px', fontWeight: 'bold', color: '#1f2937' }}>Project Results</h1>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button style={{ padding: '8px 16px', backgroundColor: '#16a34a', color: 'white', borderRadius: '8px', border: 'none', fontSize: '14px', fontWeight: '500', cursor: 'pointer' }}>📄 Export CSV</button>
            <button style={{ padding: '8px 16px', backgroundColor: '#dc2626', color: 'white', borderRadius: '8px', border: 'none', fontSize: '14px', fontWeight: '500', cursor: 'pointer' }}>📑 Export PDF</button>
            <button style={{ padding: '8px 16px', backgroundColor: '#2563eb', color: 'white', borderRadius: '8px', border: 'none', fontSize: '14px', fontWeight: '500', cursor: 'pointer' }}>📊 Export Excel</button>
            <button style={{ padding: '8px 16px', border: '1px solid #d1d5db', borderRadius: '8px', fontSize: '14px', cursor: 'pointer' }}>🖨️ Print</button>
          </div>
        </div>

        {/* Summary Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px', marginBottom: '32px' }}>
          {summaryCards.map((card, index) => (
            <div key={index} style={{ backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', padding: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{ padding: '12px', borderRadius: '50%', backgroundColor: card.bgColor, color: card.color }}>
                  <card.icon size={32} />
                </div>
                <div style={{ marginLeft: '16px' }}>
                  <p style={{ fontSize: '14px', color: '#6b7280' }}>{card.title}</p>
                  <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#1f2937' }}>{card.value}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Charts & Breakdown */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '24px', marginBottom: '32px' }}>
          {/* Activity Distribution Chart */}
          <div style={{ backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', padding: '24px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: '500', color: '#1f2937', marginBottom: '16px' }}>Activity Distribution</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  dataKey="value"
                  label
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Hours by Category */}
          <div style={{ backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', padding: '24px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: '500', color: '#1f2937', marginBottom: '16px' }}>Hours by Category</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {categoryData.slice(0, 6).map((cat, index) => (
                <div key={index}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', marginBottom: '4px' }}>
                    <span style={{ color: '#6b7280' }}>{cat.name}</span>
                    <span style={{ fontWeight: '500' }}>{cat.hours} hrs ({cat.percent}%)</span>
                  </div>
                  <div style={{ width: '100%', backgroundColor: '#e5e7eb', borderRadius: '9999px', height: '8px' }}>
                    <div style={{ height: '8px', borderRadius: '9999px', backgroundColor: cat.color, width: `${cat.percent}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Detailed Breakdown Table */}
        <div style={{ backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
          <div style={{ padding: '16px 24px', borderBottom: '1px solid #e5e7eb' }}>
            <h3 style={{ fontSize: '18px', fontWeight: '500', color: '#1f2937' }}>Detailed Breakdown</h3>
          </div>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
              <thead style={{ backgroundColor: '#f9fafb' }}>
                <tr>
                  <th style={{ padding: '12px 24px', textAlign: 'left', fontWeight: '500', color: '#6b7280' }}>Activity Type</th>
                  <th style={{ padding: '12px 24px', textAlign: 'right', fontWeight: '500', color: '#6b7280' }}>Hours</th>
                  <th style={{ padding: '12px 24px', textAlign: 'right', fontWeight: '500', color: '#6b7280' }}>%</th>
                  <th style={{ padding: '12px 24px', textAlign: 'center', fontWeight: '500', color: '#6b7280' }}>Crew</th>
                  <th style={{ padding: '12px 24px', textAlign: 'right', fontWeight: '500', color: '#6b7280' }}>Duration</th>
                </tr>
              </thead>
              <tbody style={{ borderTop: '1px solid #e5e7eb' }}>
                {categoryData.map((cat, index) => (
                  <tr key={index} style={{ borderTop: '1px solid #e5e7eb' }}>
                    <td style={{ padding: '12px 24px', fontWeight: '500', color: '#111827' }}>{cat.name}</td>
                    <td style={{ padding: '12px 24px', textAlign: 'right' }}>{cat.hours.toFixed(1)}</td>
                    <td style={{ padding: '12px 24px', textAlign: 'right' }}>{cat.percent.toFixed(1)}%</td>
                    <td style={{ padding: '12px 24px', textAlign: 'center' }}>{cat.crew}</td>
                    <td style={{ padding: '12px 24px', textAlign: 'right' }}>{cat.duration.toFixed(1)} days</td>
                  </tr>
                ))}
              </tbody>
              <tfoot style={{ backgroundColor: '#f3f4f6', fontWeight: 'bold' }}>
                <tr>
                  <td style={{ padding: '12px 24px' }}>TOTAL</td>
                  <td style={{ padding: '12px 24px', textAlign: 'right', color: '#2563eb' }}>1,250.5</td>
                  <td style={{ padding: '12px 24px', textAlign: 'right' }}>100%</td>
                  <td style={{ padding: '12px 24px', textAlign: 'center' }}>-</td>
                  <td style={{ padding: '12px 24px', textAlign: 'right' }}>45.0 days</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '32px' }}>
          <Link to="/project/RCCP-2026-001/activities" style={{ color: '#4b5563', textDecoration: 'none', fontSize: '14px' }}>← Back to Activities</Link>
          <Link to="/dashboard" style={{ padding: '10px 24px', backgroundColor: '#16a34a', color: 'white', borderRadius: '8px', textDecoration: 'none', fontSize: '14px' }}>✓ Complete Project</Link>
        </div>
      </main>
    </div>
  );
};

export default Results;
