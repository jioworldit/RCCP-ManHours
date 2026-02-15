import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { activityApi } from '../services/api';
import './ActivitiesGrid.css';

const ActivitiesGrid = ({ projectId }) => {
  // State
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({});
  const [saving, setSaving] = useState(false);

  // Reference data
  const units = ['nos', 'm', 'm2', 'kg', 'hours'];
  const factors = [0.5, 0.75, 1.0, 1.25, 1.5, 2.0];
  const components = ['Shell', 'Nozzle', 'Dish End', 'Flange', 'Pipe', 'Support', 'Platform', 'Ladder', 'Tray', 'Internal'];
  const weldingProcesses = [
    'SMAW', 'GTAW', 'GMAW', 'FCAW', 'SAW',
    'SMAW+SAW', 'GTAW+SMAW', 'GTAW+SAW', 'SMAW+FCAW'
  ];

  // Calculate totals
  const totals = useMemo(() => {
    return activities.reduce((acc, activity) => ({
      activities: activities.length,
      baseHours: acc.baseHours + (parseFloat(activity.baseHours) * parseFloat(activity.quantity || 1)),
      totalHours: acc.totalHours + parseFloat(activity.totalHours || 0),
      crewSize: acc.crewSize + parseInt(activity.crewSize || 0)
    }), { activities: 0, baseHours: 0, totalHours: 0, crewSize: 0 });
  }, [activities]);

  // Fetch activities on mount
  useEffect(() => {
    if (projectId) {
      fetchActivities();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectId]);

  const fetchActivities = async () => {
    if (!projectId) {
      setLoading(false);
      return;
    }
    
    try {
      setLoading(true);
      const response = await activityApi.getActivities(projectId);
      setActivities(response.data.activities || []);
      setError(null);
    } catch (err) {
      setError('Failed to load activities. Please try again.');
      console.error('Error fetching activities:', err);
    } finally {
      setLoading(false);
    }
  };

  // Real-time calculation
  const calculateTotalHours = useCallback((baseHours, quantity, difficultyFactor, efficiencyFactor) => {
    const base = parseFloat(baseHours) || 0;
    const qty = parseFloat(quantity) || 1;
    const diff = parseFloat(difficultyFactor) || 1;
    const eff = parseFloat(efficiencyFactor) || 1;
    return (base * qty * diff) / eff;
  }, []);

  const calculateDuration = useCallback((totalHours, crewSize) => {
    const hours = parseFloat(totalHours) || 0;
    const crew = parseInt(crewSize) || 1;
    return hours / (crew * 8);
  }, []);

  // Double-click to edit
  const handleDoubleClick = (activity) => {
    if (editingId) return; // Prevent editing multiple rows
    
    setEditingId(activity.id);
    setEditData({
      ...activity,
      quantity: activity.quantity || 1,
      baseHours: activity.baseHours || 0,
      difficultyFactor: activity.difficultyFactor || 1,
      efficiencyFactor: activity.efficiencyFactor || 1,
      crewSize: activity.crewSize || 1
    });
  };

  // Handle inline edit changes with real-time calculation
  const handleEditChange = (field, value) => {
    const updatedData = { ...editData, [field]: value };
    
    // Recalculate total hours if relevant fields change
    if (['baseHours', 'quantity', 'difficultyFactor', 'efficiencyFactor'].includes(field)) {
      const newTotalHours = calculateTotalHours(
        updatedData.baseHours,
        updatedData.quantity,
        updatedData.difficultyFactor,
        updatedData.efficiencyFactor
      );
      updatedData.totalHours = newTotalHours;
      
      // Recalculate duration
      updatedData.durationDays = calculateDuration(newTotalHours, updatedData.crewSize);
    }
    
    // Recalculate duration if crew size changes
    if (field === 'crewSize') {
      updatedData.durationDays = calculateDuration(updatedData.totalHours, value);
    }
    
    setEditData(updatedData);
  };

  // Save edited row
  const handleSave = async () => {
    try {
      setSaving(true);
      
      const updateData = {
        difficultyFactor: parseFloat(editData.difficultyFactor),
        efficiencyFactor: parseFloat(editData.efficiencyFactor),
        crewSize: parseInt(editData.crewSize),
        notes: editData.notes
      };

      // If total hours was manually edited
      if (editData.manualOverrideHours) {
        updateData.manualOverrideHours = parseFloat(editData.totalHours);
      }

      await activityApi.updateActivity(editData.id, updateData);
      
      // Update local state
      setActivities(prev => prev.map(a => 
        a.id === editData.id ? { ...editData } : a
      ));
      
      setEditingId(null);
      setEditData({});
    } catch (err) {
      setError('Failed to save activity. Please try again.');
      console.error('Error saving activity:', err);
    } finally {
      setSaving(false);
    }
  };

  // Cancel edit
  const handleCancel = () => {
    setEditingId(null);
    setEditData({});
  };

  // Delete row
  const handleDelete = async (activityId) => {
    if (!window.confirm('Are you sure you want to delete this activity?')) {
      return;
    }

    try {
      await activityApi.deleteActivity(activityId);
      setActivities(prev => prev.filter(a => a.id !== activityId));
    } catch (err) {
      setError('Failed to delete activity. Please try again.');
      console.error('Error deleting activity:', err);
    }
  };

  // Add new row
  const handleAddRow = async () => {
    try {
      const newActivity = {
        activityCode: `MANUAL-${Date.now()}`,
        description: 'New Activity',
        scopeTypeCode: 'WELDING',
        quantity: 1,
        unit: 'nos',
        baseHours: 0,
        difficultyFactor: 1.0,
        efficiencyFactor: 1.0,
        crewSize: 2,
        weldingProcessCode: 'SMAW',
        notes: ''
      };

      const response = await activityApi.addActivity(projectId, newActivity);
      const createdActivity = response.data.activity;
      
      setActivities(prev => [...prev, createdActivity]);
      
      // Auto-start editing the new row
      setEditingId(createdActivity.id);
      setEditData(createdActivity);
    } catch (err) {
      setError('Failed to add activity. Please try again.');
      console.error('Error adding activity:', err);
    }
  };

  // Bulk save all changes
  const handleSaveAll = async () => {
    try {
      setSaving(true);
      
      const activityUpdates = activities.map(activity => ({
        activityId: activity.id,
        difficultyFactor: activity.difficultyFactor,
        efficiencyFactor: activity.efficiencyFactor,
        crewSize: activity.crewSize,
        notes: activity.notes
      }));

      await activityApi.bulkUpdateActivities(projectId, activityUpdates);
      
      // Show success feedback
      alert('All activities saved successfully!');
    } catch (err) {
      setError('Failed to save activities. Please try again.');
      console.error('Error saving activities:', err);
    } finally {
      setSaving(false);
    }
  };

  // Generate activities from calculation engine
  const handleGenerate = async () => {
    try {
      setLoading(true);
      const response = await activityApi.generateActivities(projectId);
      setActivities(response.data.activities || []);
      alert(`Generated ${response.data.count} activities successfully!`);
    } catch (err) {
      setError('Failed to generate activities. Please try again.');
      console.error('Error generating activities:', err);
    } finally {
      setLoading(false);
    }
  };

  // Render editable cell
  const renderEditableCell = (activity, field, type = 'text', options = null) => {
    const isEditing = editingId === activity.id;
    
    if (!isEditing) {
      return <span onDoubleClick={() => handleDoubleClick(activity)}>{activity[field]}</span>;
    }

    if (type === 'select') {
      return (
        <select
          value={editData[field] || ''}
          onChange={(e) => handleEditChange(field, e.target.value)}
          className="inline-select"
          autoFocus
        >
          {options.map(opt => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
      );
    }

    if (type === 'number') {
      return (
        <input
          type="number"
          value={editData[field] || 0}
          onChange={(e) => handleEditChange(field, e.target.value)}
          className="inline-input"
          step={field === 'quantity' ? '0.01' : '0.1'}
          min="0"
          autoFocus
        />
      );
    }

    return (
      <input
        type="text"
        value={editData[field] || ''}
        onChange={(e) => handleEditChange(field, e.target.value)}
        className="inline-input"
        autoFocus
      />
    );
  };

  if (loading) {
    return (
      <div className="activities-grid-container">
        <div className="loading-spinner">Loading activities...</div>
      </div>
    );
  }

  return (
    <div className="activities-grid-container">
      {/* Header */}
      <div className="grid-header">
        <h1>📋 Activities Grid</h1>
        <div className="header-actions">
          <button 
            className="btn btn-secondary" 
            onClick={handleGenerate}
            disabled={saving || !projectId}
          >
            🔄 Generate
          </button>
          <button 
            className="btn btn-primary" 
            onClick={handleAddRow}
            disabled={saving || !projectId || editingId !== null}
          >
            + Add Row
          </button>
          <button 
            className="btn btn-success" 
            onClick={handleSaveAll}
            disabled={saving || !projectId}
          >
            {saving ? '💾 Saving...' : '💾 Save All'}
          </button>
        </div>
      </div>

      {/* Error message */}
      {error && (
        <div className="error-message">
          {error}
          <button onClick={() => setError(null)}>×</button>
        </div>
      )}

      {/* Table */}
      <div className="table-wrapper">
        <table className="activities-table">
          <thead>
            <tr>
              <th style={{width: '100px'}}>Activity Code</th>
              <th style={{width: '200px'}}>Description</th>
              <th style={{width: '100px'}}>Component</th>
              <th style={{width: '70px'}}>Qty</th>
              <th style={{width: '70px'}}>Unit</th>
              <th style={{width: '90px'}}>Base Hours</th>
              <th style={{width: '80px'}}>Difficulty</th>
              <th style={{width: '80px'}}>Efficiency</th>
              <th style={{width: '90px'}}>Total Hours</th>
              <th style={{width: '80px'}}>Crew Size</th>
              <th style={{width: '90px'}}>Duration (days)</th>
              <th style={{width: '120px'}}>Welding Process</th>
              <th style={{width: '100px'}}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {activities.length === 0 ? (
              <tr>
                <td colSpan="13" className="empty-state">
                  <div className="empty-content">
                    <span className="empty-icon">📊</span>
                    <p>No activities found.</p>
                    <p>Click "Generate" to auto-create from scope, or "Add Row" to manually add.</p>
                  </div>
                </td>
              </tr>
            ) : (
              activities.map((activity) => (
                <tr 
                  key={activity.id}
                  className={editingId === activity.id ? 'editing' : ''}
                  onDoubleClick={() => handleDoubleClick(activity)}
                >
                  <td>
                    <span className="code-badge">{activity.activityCode}</span>
                  </td>
                  <td>{renderEditableCell(activity, 'description', 'text')}</td>
                  <td>{renderEditableCell(activity, 'scopeTypeCode', 'select', components)}</td>
                  <td className="numeric">{renderEditableCell(activity, 'quantity', 'number')}</td>
                  <td>{renderEditableCell(activity, 'unit', 'select', units)}</td>
                  <td className="numeric">{renderEditableCell(activity, 'baseHours', 'number')}</td>
                  <td className="numeric">{renderEditableCell(activity, 'difficultyFactor', 'select', factors)}</td>
                  <td className="numeric">{renderEditableCell(activity, 'efficiencyFactor', 'select', factors)}</td>
                  <td className="numeric total-hours">
                    {parseFloat(activity.totalHours || 0).toFixed(2)}
                  </td>
                  <td className="numeric">{renderEditableCell(activity, 'crewSize', 'number')}</td>
                  <td className="numeric">
                    {parseFloat(activity.durationDays || 0).toFixed(2)}
                  </td>
                  <td>{renderEditableCell(activity, 'weldingProcessCode', 'select', weldingProcesses)}</td>
                  <td>
                    {editingId === activity.id ? (
                      <div className="action-btns">
                        <button 
                          className="icon-btn save-btn" 
                          onClick={handleSave}
                          disabled={saving}
                          title="Save"
                        >
                          ✓
                        </button>
                        <button 
                          className="icon-btn cancel-btn" 
                          onClick={handleCancel}
                          disabled={saving}
                          title="Cancel"
                        >
                          ✕
                        </button>
                      </div>
                    ) : (
                      <div className="action-btns">
                        <button 
                          className="icon-btn edit-btn" 
                          onClick={() => handleDoubleClick(activity)}
                          title="Edit"
                        >
                          ✎
                        </button>
                        <button 
                          className="icon-btn delete-btn" 
                          onClick={() => handleDelete(activity.id)}
                          title="Delete"
                        >
                          🗑
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Footer with totals */}
      <div className="grid-footer">
        <div className="totals">
          <div className="total-item">
            <span className="total-label">Total Activities:</span>
            <span className="total-value">{totals.activities}</span>
          </div>
          <div className="total-item">
            <span className="total-label">Total Base Hours:</span>
            <span className="total-value">{totals.baseHours.toFixed(2)}</span>
          </div>
          <div className="total-item">
            <span className="total-label">Total Hours:</span>
            <span className="total-value highlight">{totals.totalHours.toFixed(2)}</span>
          </div>
          <div className="total-item">
            <span className="total-label">Total Crew:</span>
            <span className="total-value">{totals.crewSize}</span>
          </div>
        </div>
        <div className="footer-hint">
          Double-click any cell to edit inline
        </div>
      </div>
    </div>
  );
};

export default ActivitiesGrid;
