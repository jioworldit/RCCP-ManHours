import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ProjectEntry = () => {
  const [formData, setFormData] = useState({
    projectNumber: 'RCCP-2026-004',
    projectName: '',
    customerName: '',
    location: '',
    productType: '',
    description: '',
    shellThickness: '',
    materialGrade: 'Carbon Steel (CS)',
    diameter: '',
    length: '',
    numberOfNozzles: '',
    weldLength: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Navigate to components
    window.location.href = '/project/RCCP-2026-004/components';
  };

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
              <Link to="/dashboard" style={{ color: '#4b5563', textDecoration: 'none', fontSize: '14px' }}>← Back to Dashboard</Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main style={{ maxWidth: '896px', margin: '0 auto', padding: '32px 24px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 'bold', color: '#1f2937', marginBottom: '24px' }}>New Project</h1>

        <form onSubmit={handleSubmit} style={{ backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', padding: '24px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* Project Information */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '8px' }}>Project Number *</label>
              <input
                type="text"
                name="projectNumber"
                value={formData.projectNumber}
                readOnly
                style={{ width: '100%', padding: '10px 16px', border: '1px solid #d1d5db', borderRadius: '8px', fontSize: '14px', backgroundColor: '#f3f4f6' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '8px' }}>Project Name *</label>
              <input
                type="text"
                name="projectName"
                placeholder="Enter project name"
                value={formData.projectName}
                onChange={handleChange}
                style={{ width: '100%', padding: '10px 16px', border: '1px solid #d1d5db', borderRadius: '8px', fontSize: '14px', outline: 'none' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '8px' }}>Customer Name *</label>
              <input
                type="text"
                name="customerName"
                placeholder="Customer company name"
                value={formData.customerName}
                onChange={handleChange}
                style={{ width: '100%', padding: '10px 16px', border: '1px solid #d1d5db', borderRadius: '8px', fontSize: '14px', outline: 'none' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '8px' }}>Location</label>
              <input
                type="text"
                name="location"
                placeholder="Project location"
                value={formData.location}
                onChange={handleChange}
                style={{ width: '100%', padding: '10px 16px', border: '1px solid #d1d5db', borderRadius: '8px', fontSize: '14px', outline: 'none' }}
              />
            </div>
          </div>

          {/* Product Type */}
          <div>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '8px' }}>Product Type *</label>
            <select
              name="productType"
              value={formData.productType}
              onChange={handleChange}
              style={{ width: '100%', padding: '10px 16px', border: '1px solid #d1d5db', borderRadius: '8px', fontSize: '14px', outline: 'none' }}
            >
              <option value="">Select product type...</option>
              <option value="vessel">Pressure Vessel</option>
              <option value="skid">Process Skid</option>
              <option value="ehouse">E-House</option>
              <option value="structure">Structural Steel</option>
              <option value="other">Other Fabricated Items</option>
            </select>
          </div>

          {/* Description */}
          <div>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '8px' }}>Description</label>
            <textarea
              name="description"
              rows={3}
              placeholder="Project description and notes..."
              value={formData.description}
              onChange={handleChange}
              style={{ width: '100%', padding: '10px 16px', border: '1px solid #d1d5db', borderRadius: '8px', fontSize: '14px', outline: 'none', resize: 'vertical' }}
            />
          </div>

          {/* Technical Parameters */}
          <div style={{ borderTop: '1px solid #e5e7eb', paddingTop: '24px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: '500', color: '#1f2937', marginBottom: '16px' }}>Technical Parameters</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '8px' }}>Shell Thickness (mm)</label>
                <input
                  type="number"
                  name="shellThickness"
                  placeholder="25"
                  value={formData.shellThickness}
                  onChange={handleChange}
                  style={{ width: '100%', padding: '10px 16px', border: '1px solid #d1d5db', borderRadius: '8px', fontSize: '14px', outline: 'none' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '8px' }}>Material Grade</label>
                <select
                  name="materialGrade"
                  value={formData.materialGrade}
                  onChange={handleChange}
                  style={{ width: '100%', padding: '10px 16px', border: '1px solid #d1d5db', borderRadius: '8px', fontSize: '14px', outline: 'none' }}
                >
                  <option>Carbon Steel (CS)</option>
                  <option>SS 304</option>
                  <option>SS 316</option>
                  <option>SS 316L</option>
                  <option>Chrome-Moly Alloy</option>
                  <option>Duplex Stainless</option>
                </select>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '8px' }}>Diameter (mm)</label>
                <input
                  type="number"
                  name="diameter"
                  placeholder="2000"
                  value={formData.diameter}
                  onChange={handleChange}
                  style={{ width: '100%', padding: '10px 16px', border: '1px solid #d1d5db', borderRadius: '8px', fontSize: '14px', outline: 'none' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '8px' }}>Length (mm)</label>
                <input
                  type="number"
                  name="length"
                  placeholder="6000"
                  value={formData.length}
                  onChange={handleChange}
                  style={{ width: '100%', padding: '10px 16px', border: '1px solid #d1d5db', borderRadius: '8px', fontSize: '14px', outline: 'none' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '8px' }}>Number of Nozzles</label>
                <input
                  type="number"
                  name="numberOfNozzles"
                  placeholder="8"
                  value={formData.numberOfNozzles}
                  onChange={handleChange}
                  style={{ width: '100%', padding: '10px 16px', border: '1px solid #d1d5db', borderRadius: '8px', fontSize: '14px', outline: 'none' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '8px' }}>Weld Length (m)</label>
                <input
                  type="number"
                  name="weldLength"
                  placeholder="45.5"
                  value={formData.weldLength}
                  onChange={handleChange}
                  style={{ width: '100%', padding: '10px 16px', border: '1px solid #d1d5db', borderRadius: '8px', fontSize: '14px', outline: 'none' }}
                />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '16px', paddingTop: '24px', borderTop: '1px solid #e5e7eb' }}>
            <Link to="/dashboard" style={{ padding: '10px 24px', border: '1px solid #d1d5db', borderRadius: '8px', color: '#374151', textDecoration: 'none', fontSize: '14px' }}>Cancel</Link>
            <button type="submit" style={{ padding: '10px 24px', backgroundColor: '#2563eb', color: 'white', borderRadius: '8px', border: 'none', fontSize: '14px', fontWeight: '500', cursor: 'pointer' }}>Save & Continue →</button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default ProjectEntry;
