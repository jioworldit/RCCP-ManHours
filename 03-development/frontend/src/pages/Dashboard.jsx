import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [typeFilter, setTypeFilter] = useState('All Types');

  const projects = [
    {
      id: 'RCCP-2026-001',
      name: 'Pressure Vessel PV-101',
      customer: 'OilCo International',
      type: 'Vessel',
      hours: 1250,
      status: 'Active'
    },
    {
      id: 'RCCP-2026-002',
      name: 'Process Skid PS-205',
      customer: 'PetroChem Ltd',
      type: 'Skid',
      hours: 2100,
      status: 'In Progress'
    },
    {
      id: 'RCCP-2026-003',
      name: 'E-House EH-301',
      customer: 'PowerGen Corp',
      type: 'E-House',
      hours: 890,
      status: 'Draft'
    }
  ];

  const getStatusBadge = (status) => {
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
    <div style={{backgroundColor: '#f3f4f6', minHeight: '100vh'}}>
      {/* Header */}
      <header style={{backgroundColor: 'white', boxShadow: '0 1px 3px rgba(0,0,0,0.1)'}}>
        <div style={{maxWidth: '1280px', margin: '0 auto', padding: '0 16px'}}>
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '64px'}}>
            <div style={{display: 'flex', alignItems: 'center'}}>
              <span style={{fontSize: '24px', fontWeight: 'bold', color: '#2563eb'}}>RCCP</span>
              <span style={{marginLeft: '8px', color: '#4b5563'}}>Man-Hours</span>
            </div>
            <div style={{display: 'flex', alignItems: 'center', gap: '16px'}}>
              <span style={{color: '#4b5563'}}>Welcome, John Doe</span>
              <button 
                onClick={handleLogout} 
                style={{color: '#4b5563', background: 'none', border: 'none', cursor: 'pointer'}}
                onMouseEnter={(e) => e.target.style.color = '#1f2937'}
                onMouseLeave={(e) => e.target.style.color = '#4b5563'}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main style={{maxWidth: '1280px', margin: '0 auto', padding: '32px 16px'}}>
        {/* Page Header */}
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px'}}>
          <h1 style={{fontSize: '24px', fontWeight: 'bold', color: '#1f2937'}}>Projects</h1>
          <Link 
            to="/project/new" 
            style={{
              backgroundColor: '#2563eb', 
              color: 'white', 
              padding: '8px 16px', 
              borderRadius: '8px',
              textDecoration: 'none'
            }}
          >
            + New Project
          </Link>
        </div>

        {/* Stats Cards */}
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '24px'}}>
          <div style={{backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', padding: '16px'}}>
            <p style={{fontSize: '14px', color: '#6b7280'}}>Total Projects</p>
            <p style={{fontSize: '24px', fontWeight: 'bold', color: '#1f2937'}}>12</p>
          </div>
          <div style={{backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', padding: '16px'}}>
            <p style={{fontSize: '14px', color: '#6b7280'}}>Active</p>
            <p style={{fontSize: '24px', fontWeight: 'bold', color: '#2563eb'}}>8</p>
          </div>
          <div style={{backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', padding: '16px'}}>
            <p style={{fontSize: '14px', color: '#6b7280'}}>Completed</p>
            <p style={{fontSize: '24px', fontWeight: 'bold', color: '#16a34a'}}>4</p>
          </div>
          <div style={{backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', padding: '16px'}}>
            <p style={{fontSize: '14px', color: '#6b7280'}}>Total Hours</p>
            <p style={{fontSize: '24px', fontWeight: 'bold', color: '#1f2937'}}>3,450</p>
          </div>
        </div>

        {/* Search & Filter */}
        <div style={{backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', padding: '16px', marginBottom: '24px'}}>
          <div style={{display: 'flex', flexWrap: 'wrap', gap: '16px'}}>
            <input
              type="text"
              placeholder="Search projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                flex: '1', 
                minWidth: '200px', 
                padding: '8px 16px', 
                border: '1px solid #d1d5db', 
                borderRadius: '8px'
              }}
            />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              style={{padding: '8px 16px', border: '1px solid #d1d5db', borderRadius: '8px'}}
            >
              <option>All Status</option>
              <option>Active</option>
              <option>Completed</option>
              <option>Draft</option>
            </select>
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              style={{padding: '8px 16px', border: '1px solid #d1d5db', borderRadius: '8px'}}
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
        <div style={{backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', overflow: 'hidden'}}>
          <table style={{minWidth: '100%', borderCollapse: 'collapse'}}>
            <thead style={{backgroundColor: '#f9fafb'}}>
              <tr>
                <th style={{padding: '12px 24px', textAlign: 'left', fontSize: '12px', fontWeight: '500', color: '#6b7280', textTransform: 'uppercase'}}>Project #</th>
                <th style={{padding: '12px 24px', textAlign: 'left', fontSize: '12px', fontWeight: '500', color: '#6b7280', textTransform: 'uppercase'}}>Name</th>
                <th style={{padding: '12px 24px', textAlign: 'left', fontSize: '12px', fontWeight: '500', color: '#6b7280', textTransform: 'uppercase'}}>Customer</th>
                <th style={{padding: '12px 24px', textAlign: 'left', fontSize: '12px', fontWeight: '500', color: '#6b7280', textTransform: 'uppercase'}}>Type</th>
                <th style={{padding: '12px 24px', textAlign: 'left', fontSize: '12px', fontWeight: '500', color: '#6b7280', textTransform: 'uppercase'}}>Hours</th>
                <th style={{padding: '12px 24px', textAlign: 'left', fontSize: '12px', fontWeight: '500', color: '#6b7280', textTransform: 'uppercase'}}>Status</th>
                <th style={{padding: '12px 24px', textAlign: 'left', fontSize: '12px', fontWeight: '500', color: '#6b7280', textTransform: 'uppercase'}}>Actions</th>
              </tr>
            </thead>
            <tbody style={{borderTop: '1px solid #e5e7eb'}}>
              {projects.map((project) => (
                <tr key={project.id} style={{borderBottom: '1px solid #e5e7eb'}}>
                  <td style={{padding: '16px 24px', fontSize: '14px', color: '#111827'}}>{project.id}</td>
                  <td style={{padding: '16px 24px', fontSize: '14px', color: '#111827'}}>{project.name}</td>
                  <td style={{padding: '16px 24px', fontSize: '14px', color: '#6b7280'}}>{project.customer}</td>
                  <td style={{padding: '16px 24px', fontSize: '14px', color: '#6b7280'}}>{project.type}</td>
                  <td style={{padding: '16px 24px', fontSize: '14px', color: '#111827'}}>{project.hours.toLocaleString()}</td>
                  <td style={{padding: '16px 24px'}}>
                    <span style={{
                      padding: '4px 8px', 
                      fontSize: '12px', 
                      fontWeight: '600', 
                      borderRadius: '9999px',
                      ...getStatusBadge(project.status)
                    }}>
                      {project.status}
                    </span>
                  </td>
                  <td style={{padding: '16px 24px', fontSize: '14px'}}>
                    <Link to={`/project/${project.id}/components`} style={{color: '#2563eb', textDecoration: 'underline'}}>View</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '16px'}}>
          <p style={{fontSize: '14px', color: '#6b7280'}}>Showing 1-3 of 12 projects</p>
          <div style={{display: 'flex', gap: '8px'}}>
            <button style={{padding: '4px 12px', border: '1px solid #d1d5db', borderRadius: '4px'}} disabled>Previous</button>
            <button style={{padding: '4px 12px', backgroundColor: '#2563eb', color: 'white', borderRadius: '4px'}}>1</button>
            <button style={{padding: '4px 12px', border: '1px solid #d1d5db', borderRadius: '4px'}}>2</button>
            <button style={{padding: '4px 12px', border: '1px solid #d1d5db', borderRadius: '4px'}}>Next</button>
          </div>
        </div>
      </main>
    </div>
  );
}