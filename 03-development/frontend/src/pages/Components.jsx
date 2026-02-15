import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = '/api';

const TABS = [
  { id: 'PV', label: 'PV' },
  { id: 'SKIDS', label: 'Skids' },
  { id: 'EHOUSE', label: 'E-House' },
  { id: 'STRUCTURE', label: 'Structure' },
  { id: 'OTHER', label: 'Other' }
];

const Components = ({ projectId }) => {
  const [activeTab, setActiveTab] = useState('PV');
  const [components, setComponents] = useState({});
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  // Initialize empty arrays for each category
  useEffect(() => {
    const initialComponents = {};
    TABS.forEach(tab => {
      initialComponents[tab.id] = [];
    });
    setComponents(initialComponents);
  }, []);

  // Fetch components on mount
  useEffect(() => {
    if (projectId) {
      fetchComponents();
    }
  }, [projectId]);

  const fetchComponents = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${API_URL}/projects/${projectId}/components`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      const fetchedComponents = response.data.data.components;
      
      // Organize by category
      const organized = {};
      TABS.forEach(tab => {
        organized[tab.id] = fetchedComponents.filter(c => c.category === tab.id);
      });
      
      setComponents(organized);
    } catch (error) {
      console.error('Error fetching components:', error);
      setMessage('Error loading components');
    } finally {
      setLoading(false);
    }
  };

  const addRow = () => {
    setComponents(prev => ({
      ...prev,
      [activeTab]: [
        ...prev[activeTab],
        { id: `temp-${Date.now()}`, name: '', quantity: 1, thicknessMm: '', material: '', isNew: true }
      ]
    }));
  };

  const deleteRow = (index) => {
    setComponents(prev => ({
      ...prev,
      [activeTab]: prev[activeTab].filter((_, i) => i !== index)
    }));
  };

  const updateRow = (index, field, value) => {
    setComponents(prev => ({
      ...prev,
      [activeTab]: prev[activeTab].map((row, i) => 
        i === index ? { ...row, [field]: value } : row
      )
    }));
  };

  const saveComponents = async () => {
    setSaving(true);
    setMessage('');
    
    try {
      const token = localStorage.getItem('token');
      
      // Flatten all components from all categories
      const allComponents = [];
      Object.entries(components).forEach(([category, items]) => {
        items.forEach(item => {
          allComponents.push({
            name: item.name,
            category: category,
            quantity: parseInt(item.quantity) || 1,
            thicknessMm: item.thicknessMm ? parseFloat(item.thicknessMm) : null,
            material: item.material
          });
        });
      });

      await axios.post(
        `${API_URL}/projects/${projectId}/components/batch`,
        { components: allComponents },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setMessage('Components saved successfully!');
      fetchComponents(); // Refresh to get proper IDs
    } catch (error) {
      console.error('Error saving components:', error);
      setMessage('Error saving components');
    } finally {
      setSaving(false);
    }
  };

  const styles = {
    container: {
      padding: '20px',
      fontFamily: 'Arial, sans-serif',
      maxWidth: '1200px',
      margin: '0 auto'
    },
    header: {
      marginBottom: '20px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    title: {
      fontSize: '24px',
      fontWeight: 'bold',
      margin: 0
    },
    tabs: {
      display: 'flex',
      borderBottom: '2px solid #ddd',
      marginBottom: '20px'
    },
    tab: {
      padding: '12px 24px',
      cursor: 'pointer',
      border: 'none',
      background: 'none',
      fontSize: '14px',
      fontWeight: '500',
      color: '#666',
      borderBottom: '2px solid transparent',
      marginBottom: '-2px',
      transition: 'all 0.2s'
    },
    tabActive: {
      color: '#1976d2',
      borderBottom: '2px solid #1976d2'
    },
    tableContainer: {
      backgroundColor: '#fff',
      borderRadius: '8px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      overflow: 'hidden'
    },
    table: {
      width: '100%',
      borderCollapse: 'collapse'
    },
    th: {
      backgroundColor: '#f5f5f5',
      padding: '12px 16px',
      textAlign: 'left',
      fontWeight: '600',
      color: '#333',
      borderBottom: '2px solid #ddd',
      fontSize: '14px'
    },
    td: {
      padding: '12px 16px',
      borderBottom: '1px solid #eee',
      fontSize: '14px'
    },
    input: {
      width: '100%',
      padding: '8px 12px',
      border: '1px solid #ddd',
      borderRadius: '4px',
      fontSize: '14px',
      boxSizing: 'border-box'
    },
    button: {
      padding: '10px 20px',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      fontSize: '14px',
      fontWeight: '500',
      transition: 'all 0.2s'
    },
    buttonPrimary: {
      backgroundColor: '#1976d2',
      color: 'white'
    },
    buttonDanger: {
      backgroundColor: '#dc3545',
      color: 'white',
      padding: '6px 12px',
      fontSize: '12px'
    },
    buttonSuccess: {
      backgroundColor: '#28a745',
      color: 'white'
    },
    actions: {
      display: 'flex',
      gap: '10px',
      marginTop: '20px',
      justifyContent: 'flex-end'
    },
    message: {
      padding: '12px 16px',
      borderRadius: '4px',
      marginBottom: '16px',
      fontSize: '14px'
    },
    messageSuccess: {
      backgroundColor: '#d4edda',
      color: '#155724',
      border: '1px solid #c3e6cb'
    },
    messageError: {
      backgroundColor: '#f8d7da',
      color: '#721c24',
      border: '1px solid #f5c6cb'
    },
    emptyState: {
      textAlign: 'center',
      padding: '40px',
      color: '#666'
    },
    rowNumber: {
      width: '50px',
      color: '#666',
      fontSize: '12px'
    }
  };

  const currentComponents = components[activeTab] || [];

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>Components</h1>
      </div>

      {message && (
        <div style={{
          ...styles.message,
          ...(message.includes('success') ? styles.messageSuccess : styles.messageError)
        }}>
          {message}
        </div>
      )}

      <div style={styles.tabs}>
        {TABS.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              ...styles.tab,
              ...(activeTab === tab.id ? styles.tabActive : {})
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div style={styles.tableContainer}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={{...styles.th, width: '50px'}}>#</th>
              <th style={styles.th}>Component Name</th>
              <th style={{...styles.th, width: '100px'}}>Qty</th>
              <th style={{...styles.th, width: '120px'}}>Thickness (mm)</th>
              <th style={styles.th}>Material</th>
              <th style={{...styles.th, width: '100px'}}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentComponents.length === 0 ? (
              <tr>
                <td colSpan="6" style={styles.emptyState}>
                  No components added. Click "Add Row" to add components.
                </td>
              </tr>
            ) : (
              currentComponents.map((row, index) => (
                <tr key={row.id || index}>
                  <td style={{...styles.td, ...styles.rowNumber}}>{index + 1}</td>
                  <td style={styles.td}>
                    <input
                      type="text"
                      value={row.name}
                      onChange={(e) => updateRow(index, 'name', e.target.value)}
                      placeholder="Enter component name"
                      style={styles.input}
                    />
                  </td>
                  <td style={styles.td}>
                    <input
                      type="number"
                      value={row.quantity}
                      onChange={(e) => updateRow(index, 'quantity', e.target.value)}
                      min="1"
                      style={{...styles.input, textAlign: 'center'}}
                    />
                  </td>
                  <td style={styles.td}>
                    <input
                      type="number"
                      value={row.thicknessMm || ''}
                      onChange={(e) => updateRow(index, 'thicknessMm', e.target.value)}
                      placeholder="mm"
                      step="0.1"
                      style={{...styles.input, textAlign: 'center'}}
                    />
                  </td>
                  <td style={styles.td}>
                    <input
                      type="text"
                      value={row.material || ''}
                      onChange={(e) => updateRow(index, 'material', e.target.value)}
                      placeholder="e.g. Carbon Steel"
                      style={styles.input}
                    />
                  </td>
                  <td style={styles.td}>
                    <button
                      onClick={() => deleteRow(index)}
                      style={{...styles.button, ...styles.buttonDanger}}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div style={styles.actions}>
        <button
          onClick={addRow}
          style={{...styles.button, ...styles.buttonPrimary}}
        >
          + Add Row
        </button>
        <button
          onClick={saveComponents}
          disabled={saving}
          style={{
            ...styles.button,
            ...styles.buttonSuccess,
            opacity: saving ? 0.7 : 1
          }}
        >
          {saving ? 'Saving...' : 'Save All'}
        </button>
      </div>
    </div>
  );
};

export default Components;
