import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Plus, Folder, Activity, CheckCircle, Clock, LogOut } from 'lucide-react';

const Dashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [typeFilter, setTypeFilter] = useState('All Types');

  const projects = [
    { id: 'RCCP-2026-001', name: 'Pressure Vessel PV-101', customer: 'OilCo International', type: 'Vessel', hours: 1250, status: 'Active' },
    { id: 'RCCP-2026-002', name: 'Process Skid PS-205', customer: 'PetroChem Ltd', type: 'Skid', hours: 2100, status: 'In Progress' },
    { id: 'RCCP-2026-003', name: 'E-House EH-301', customer: 'PowerGen Corp', type: 'E-House', hours: 890, status: 'Draft' }
  ];

  const getStatusStyle = (status) => {
    const styles = {
      'Active': { backgroundColor: '#dcfce7', color: '#166534' },
      'In Progress': { backgroundColor: '#dbeafe', color: '#1e40af' },
      'Draft': { backgroundColor: '#f3f4f6', color: '#374151' },
      'Completed': { backgroundColor: '#dcfce7', color: '#166534' }
    };
    return styles[status] || { backgroundColor: '#f3f4f6', color: '#374151' };
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    window.location.href = '/login';
  };

  return (
    <div style={{ backgroundColor: '#f3f4f6', minHeight: '100vh' }}>
      {/* Header */}
      <header style={{ backgroundColor: 'white', borderBottom: '1px solid #e5e7eb', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '64px' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <span style={{ fontSize: '24px', fontWeight: 'bold', color: '#2563eb' }}>RCCP</span>
              <span style={{ marginLeft: '8px', fontSize: '18px', color: '#4b5563' }}>Man-Hours</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
              <span style={{ color: '#4b5563' }}>Welcome, John Doe</span>
              <button 
                onClick={handleLogout}
                style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#4b5563', background: 'none', border: 'none', cursor: 'pointer' }}
              >
                <LogOut size={18} />
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main style={{ maxWidth: '1280px', margin: '0 auto', padding: '32px 24px' }}>
        {/* Page Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <h1 style={{ fontSize: '28px', fontWeight: 'bold', color: '#111827' }}>Projects</h1>
          <Link 
            to="/project/new" 
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              backgroundColor: '#2563eb',
              color: 'white',
              padding: '10px 20px',
              borderRadius: '8px',
              textDecoration: 'none',
              fontWeight: '500'
            }}
          >
            <Plus size={20} />
            New Project
          </Link>
        </div>

        {/* Stats Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px', marginBottom: '24px' }}>
          <div style={{ backgroundColor: 'white', borderRadius: '8px', padding: '20px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Folder style={{ color: '#6b7280' }} />
              <div>
                <p style={{ fontSize: '14px', color: '#6b7280' }}>Total Projects</p>
                <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#111827' }}>12</p>
              </div>
            </div>
          </div>
          <div style={{ backgroundColor: 'white', borderRadius: '8px', padding: '20px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Activity style={{ color: '#2563eb' }} />
              <div>
                <p style={{ fontSize: '14px', color: '#6b7280' }}>Active</p>
                <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#2563eb' }}>8</p>
              </div>
            </div>
          </div>
          <div style={{ backgroundColor: 'white', borderRadius: '8px', padding: '20px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <CheckCircle style={{ color: '#16a34a' }} />
              <div>
                <p style={{ fontSize: '14px', color: '#6b7280' }}>Completed</p>
                <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#16a34a' }}>4</p>
              </div>
            </div>
          </div>
          <div style={{ backgroundColor: 'white', borderRadius: '8px', padding: '20px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Clock style={{ color: '#6b7280' }} />
              <div>
                <p style={{ fontSize: '14px', color: '#6b7280' }}>Total Hours</p>
                <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#111827' }}>3,450</p>
              </div>
            </div>
          </div>
        </div>

        {/* Search & Filter */}
        <div style={{ backgroundColor: 'white', borderRadius: '8px', padding: '16px', marginBottom: '24px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
            <div style={{ position: 'relative', flex: 1, minWidth: '240px' }}>
              <Search style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af', width: '20px' }} />
              <input
                type="text"
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ width: '100%', padding: '10px 12px 10px 40px', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '14px' }}
              />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              style={{ padding: '10px 16px', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '14px' }}
            >
              <option>All Status</option>
              <option>Active</option>
              <option>Completed</option>
              <option>Draft</option>
            </select>
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              style={{ padding: '10px 16px', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '14px' }}
            >
              <option>All Types</option>
              <option>Pressure Vessel</option>
              <option>Process Skid</option>
              <option>E-House</option>
              <option>Structure</option>
            </select>
          </div>
        </div>

        {/* Projects Table */}
        <div style={{ backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ backgroundColor: '#f9fafb' }}>
                <th style={{ padding: '12px 24px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase' }}>Project #</th>
                <th style={{ padding: '12px 24px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase' }}>Name</th>
                <th style={{ padding: '12px 24px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase' }}>Customer</th>
                <th style={{ padding: '12px 24px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase' }}>Type</th>
                <th style={{ padding: '12px 24px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase' }}>Hours</th>
                <th style={{ padding: '12px 24px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase' }}>Status</th>
                <th style={{ padding: '12px 24px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project) => (
                <tr key={project.id} style={{ borderTop: '1px solid #e5e7eb' }}>
                  <td style={{ padding: '16px 24px', fontSize: '14px', color: '#111827', fontWeight: '500' }}>{project.id}</td>
                  <td style={{ padding: '16px 24px', fontSize: '14px', color: '#111827' }}>{project.name}</td>
                  <td style={{ padding: '16px 24px', fontSize: '14px', color: '#6b7280' }}>{project.customer}</td>
                  <td style={{ padding: '16px 24px', fontSize: '14px', color: '#6b7280' }}>{project.type}</td>
                  <td style={{ padding: '16px 24px', fontSize: '14px', color: '#111827' }}>{project.hours.toLocaleString()}</td>
                  <td style={{ padding: '16px 24px' }}>
                    <span style={{ padding: '4px 12px', borderRadius: '9999px', fontSize: '12px', fontWeight: '600', ...getStatusStyle(project.status) }}>
                      {project.status}
                    </span>
                  </td>
                  <td style={{ padding: '16px 24px' }}>
                    <Link to={`/project/${project.id}/components`} style={{ color: '#2563eb', fontSize: '14px', textDecoration: 'none' }}>View</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;