import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Components = () => {
  const [activeTab, setActiveTab] = useState('vessel');
  const [components, setComponents] = useState([
    { id: 1, name: 'Shell Course 1', qty: 1, thickness: 25, material: 'SS 316', dimensions: '⌀2000 × 2000mm' },
    { id: 2, name: 'Top Dish Head', qty: 1, thickness: 25, material: 'SS 316', dimensions: '⌀2000mm Ellipsoidal' },
    { id: 3, name: 'Inlet Nozzle', qty: 2, thickness: 12, material: 'SS 316', dimensions: '4 inch, 300#' }
  ]);

  const productTypes = [
    { id: 'vessel', label: 'Pressure Vessel' },
    { id: 'skid', label: 'Process Skid' },
    { id: 'ehouse', label: 'E-House' },
    { id: 'structure', label: 'Structure' },
    { id: 'other', label: 'Other' }
  ];

  const materials = ['SS 316', 'SS 304', 'CS', 'Alloy'];

  const handleAddComponent = () => {
    const newId = components.length > 0 ? Math.max(...components.map(c => c.id)) + 1 : 1;
    setComponents([...components, { id: newId, name: '', qty: 1, thickness: '', material: 'SS 316', dimensions: '' }]);
  };

  const handleDeleteComponent = (id) => {
    setComponents(components.filter(c => c.id !== id));
  };

  const handleComponentChange = (id, field, value) => {
    setComponents(components.map(c => c.id === id ? { ...c, [field]: value } : c));
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
            {/* Step 2 - Current */}
            <div style={{ display: 'flex', alignItems: 'center', color: '#2563eb' }}>
              <span style={{ width: '32px', height: '32px', backgroundColor: '#2563eb', color: 'white', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', fontWeight: 'bold' }}>2</span>
              <span style={{ marginLeft: '8px', fontWeight: '500', fontSize: '14px' }}>Components</span>
            </div>
            <div style={{ width: '64px', height: '2px', backgroundColor: '#d1d5db', margin: '0 8px' }}></div>
            {/* Step 3 */}
            <div style={{ display: 'flex', alignItems: 'center', color: '#9ca3af' }}>
              <span style={{ width: '32px', height: '32px', backgroundColor: '#e5e7eb', color: '#4b5563', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', fontWeight: 'bold' }}>3</span>
              <span style={{ marginLeft: '8px', fontWeight: '500', fontSize: '14px' }}>Scope</span>
            </div>
            <div style={{ width: '64px', height: '2px', backgroundColor: '#d1d5db', margin: '0 8px' }}></div>
            {/* Step 4 */}
            <div style={{ display: 'flex', alignItems: 'center', color: '#9ca3af' }}>
              <span style={{ width: '32px', height: '32px', backgroundColor: '#e5e7eb', color: '#4b5563', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', fontWeight: 'bold' }}>4</span>
              <span style={{ marginLeft: '8px', fontWeight: '500', fontSize: '14px' }}>Activities</span>
            </div>
            <div style={{ width: '64px', height: '2px', backgroundColor: '#d1d5db', margin: '0 8px' }}></div>
            {/* Step 5 */}
            <div style={{ display: 'flex', alignItems: 'center', color: '#9ca3af' }}>
              <span style={{ width: '32px', height: '32px', backgroundColor: '#e5e7eb', color: '#4b5563', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', fontWeight: 'bold' }}>5</span>
              <span style={{ marginLeft: '8px', fontWeight: '500', fontSize: '14px' }}>Results</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main style={{ maxWidth: '1280px', margin: '0 auto', padding: '32px 24px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 'bold', color: '#1f2937', marginBottom: '24px' }}>Components</h1>

        {/* Product Type Tabs */}
        <div style={{ backgroundColor: 'white', borderRadius: '8px 8px 0 0', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', borderBottom: '1px solid #e5e7eb' }}>
          <div style={{ display: 'flex' }}>
            {productTypes.map((type) => (
              <button
                key={type.id}
                onClick={() => setActiveTab(type.id)}
                style={{
                  padding: '12px 24px',
                  fontWeight: '500',
                  fontSize: '14px',
                  border: 'none',
                  backgroundColor: 'transparent',
                  cursor: 'pointer',
                  borderBottom: activeTab === type.id ? '2px solid #2563eb' : 'none',
                  color: activeTab === type.id ? '#2563eb' : '#6b7280'
                }}
              >
                {type.label}
              </button>
            ))}
          </div>
        </div>

        {/* Components Table */}
        <div style={{ backgroundColor: 'white', borderRadius: '0 0 8px 8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', padding: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: '500', color: '#1f2937' }}>Pressure Vessel Components</h3>
            <button
              onClick={handleAddComponent}
              style={{ backgroundColor: '#2563eb', color: 'white', padding: '8px 16px', borderRadius: '8px', border: 'none', fontSize: '14px', fontWeight: '500', cursor: 'pointer' }}
            >
              + Add Component
            </button>
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ backgroundColor: '#f9fafb' }}>
                  <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '12px', fontWeight: '500', color: '#6b7280', textTransform: 'uppercase' }}>Component</th>
                  <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '12px', fontWeight: '500', color: '#6b7280', textTransform: 'uppercase' }}>Qty</th>
                  <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '12px', fontWeight: '500', color: '#6b7280', textTransform: 'uppercase' }}>Thickness (mm)</th>
                  <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '12px', fontWeight: '500', color: '#6b7280', textTransform: 'uppercase' }}>Material</th>
                  <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '12px', fontWeight: '500', color: '#6b7280', textTransform: 'uppercase' }}>Dimensions</th>
                  <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '12px', fontWeight: '500', color: '#6b7280', textTransform: 'uppercase' }}>Actions</th>
                </tr>
              </thead>
              <tbody style={{ borderTop: '1px solid #e5e7eb' }}>
                {components.map((component) => (
                  <tr key={component.id} style={{ borderTop: '1px solid #e5e7eb' }}>
                    <td style={{ padding: '12px 16px' }}>
                      <input
                        type="text"
                        value={component.name}
                        onChange={(e) => handleComponentChange(component.id, 'name', e.target.value)}
                        style={{ width: '100%', padding: '4px 8px', border: '1px solid #d1d5db', borderRadius: '4px', fontSize: '14px' }}
                      />
                    </td>
                    <td style={{ padding: '12px 16px' }}>
                      <input
                        type="number"
                        value={component.qty}
                        onChange={(e) => handleComponentChange(component.id, 'qty', parseInt(e.target.value) || 0)}
                        style={{ width: '64px', padding: '4px 8px', border: '1px solid #d1d5db', borderRadius: '4px', fontSize: '14px' }}
                      />
                    </td>
                    <td style={{ padding: '12px 16px' }}>
                      <input
                        type="number"
                        value={component.thickness}
                        onChange={(e) => handleComponentChange(component.id, 'thickness', parseFloat(e.target.value) || 0)}
                        style={{ width: '80px', padding: '4px 8px', border: '1px solid #d1d5db', borderRadius: '4px', fontSize: '14px' }}
                      />
                    </td>
                    <td style={{ padding: '12px 16px' }}>
                      <select
                        value={component.material}
                        onChange={(e) => handleComponentChange(component.id, 'material', e.target.value)}
                        style={{ width: '128px', padding: '4px 8px', border: '1px solid #d1d5db', borderRadius: '4px', fontSize: '14px' }}
                      >
                        {materials.map(m => <option key={m} value={m}>{m}</option>)}
                      </select>
                    </td>
                    <td style={{ padding: '12px 16px', fontSize: '14px', color: '#6b7280' }}>
                      {component.dimensions}
                    </td>
                    <td style={{ padding: '12px 16px' }}>
                      <button
                        onClick={() => handleDeleteComponent(component.id)}
                        style={{ color: '#dc2626', fontSize: '14px', border: 'none', backgroundColor: 'transparent', cursor: 'pointer' }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Action Buttons */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '24px', paddingTop: '24px', borderTop: '1px solid #e5e7eb' }}>
            <Link to="/project/new" style={{ color: '#4b5563', textDecoration: 'none', fontSize: '14px' }}>← Back</Link>
            <div style={{ display: 'flex', gap: '16px' }}>
              <button style={{ padding: '10px 24px', border: '1px solid #d1d5db', borderRadius: '8px', color: '#374151', fontSize: '14px', cursor: 'pointer' }}>Save Draft</button>
              <Link to="/project/RCCP-2026-001/scope" style={{ padding: '10px 24px', backgroundColor: '#2563eb', color: 'white', borderRadius: '8px', textDecoration: 'none', fontSize: '14px' }}>Continue →</Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Components;
