import React, { useState, useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';

const ActivitiesGridPage = () => {
  const { projectId } = useParams();
  
  // Initial activities data
  const [activities, setActivities] = useState([
    {
      id: '1',
      code: 'F-101',
      description: 'Shell Course Fit-Up',
      component: 'Shell Course 1',
      quantity: 1,
      unit: 'nos',
      baseHours: 8.5,
      factor: 1.2,
      totalHours: 10.2,
      crew: 4,
      days: 1.3,
      weldProcess: '-'
    },
    {
      id: '2',
      code: 'W-201',
      description: 'Longitudinal Seam Weld',
      component: 'Shell Course 1',
      quantity: 1,
      unit: 'nos',
      baseHours: 12.5,
      factor: 1.25,
      totalHours: 18.4,
      crew: 3,
      days: 2.3,
      weldProcess: 'SMAW+SAW'
    },
    {
      id: '3',
      code: 'W-301',
      description: 'Nozzle Set-On Weld',
      component: 'Inlet Nozzle',
      quantity: 2,
      unit: 'nos',
      baseHours: 4.2,
      factor: 1.5,
      totalHours: 15.8,
      crew: 2,
      days: 2.0,
      weldProcess: 'GTAW+SMAW'
    },
    {
      id: '4',
      code: 'W-302',
      description: 'Nozzle Set-On Weld',
      component: 'Outlet Nozzle',
      quantity: 1,
      unit: 'nos',
      baseHours: 4.2,
      factor: 1.5,
      totalHours: 7.9,
      crew: 2,
      days: 1.0,
      weldProcess: 'GTAW+SMAW'
    }
  ]);

  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({});

  const factors = [0.5, 0.75, 1.0, 1.25, 1.5, 2.0];
  const weldingProcesses = ['-', 'SMAW', 'GTAW', 'SMAW+SAW', 'GTAW+SMAW', 'FCAW'];

  // Calculate totals
  const totals = useMemo(() => {
    return activities.reduce((acc, activity) => ({
      totalActivities: activities.length,
      baseHours: acc.baseHours + (activity.baseHours * activity.quantity),
      totalHours: acc.totalHours + activity.totalHours,
      crew: acc.crew + activity.crew,
      days: Math.max(acc.days, activity.days)
    }), { totalActivities: 0, baseHours: 0, totalHours: 0, crew: 0, days: 0 });
  }, [activities]);

  const handleEdit = (activity) => {
    setEditingId(activity.id);
    setEditData({ ...activity });
  };

  const handleSave = () => {
    setActivities(prev => prev.map(a => 
      a.id === editingId ? { ...editData } : a
    ));
    setEditingId(null);
    setEditData({});
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditData({});
  };

  const handleChange = (field, value) => {
    setEditData(prev => {
      const updated = { ...prev, [field]: value };
      // Recalculate total hours
      if (['quantity', 'baseHours', 'factor'].includes(field)) {
        const qty = parseFloat(updated.quantity) || 0;
        const base = parseFloat(updated.baseHours) || 0;
        const factor = parseFloat(updated.factor) || 1;
        updated.totalHours = parseFloat((qty * base * factor).toFixed(1));
      }
      // Recalculate days
      if (field === 'crew' || ['quantity', 'baseHours', 'factor'].includes(field)) {
        const totalHours = parseFloat(updated.totalHours) || 0;
        const crew = parseInt(updated.crew) || 1;
        updated.days = parseFloat((totalHours / (crew * 8)).toFixed(1));
      }
      return updated;
    });
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this activity?')) {
      setActivities(prev => prev.filter(a => a.id !== id));
    }
  };

  const handleAddActivity = () => {
    const newId = (activities.length + 1).toString();
    const newActivity = {
      id: newId,
      code: `ACT-${100 + parseInt(newId)}`,
      description: 'New Activity',
      component: '-',
      quantity: 1,
      unit: 'nos',
      baseHours: 0,
      factor: 1.0,
      totalHours: 0,
      crew: 2,
      days: 0,
      weldProcess: '-'
    };
    setActivities(prev => [...prev, newActivity]);
    handleEdit(newActivity);
  };

  const renderCell = (activity, field, type = 'text', options = null) => {
    const isEditing = editingId === activity.id;

    if (!isEditing) {
      return <span>{activity[field]}</span>;
    }

    if (type === 'select') {
      return (
        <select
          value={editData[field] || ''}
          onChange={(e) => handleChange(field, e.target.value)}
          className="w-full px-1 py-1 border border-gray-300 rounded text-sm"
        >
          {options.map(opt => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
      );
    }

    return (
      <input
        type={type}
        value={editData[field] || ''}
        onChange={(e) => handleChange(field, e.target.value)}
        className="w-full px-1 py-1 border border-gray-300 rounded text-sm"
        step={type === 'number' ? '0.1' : undefined}
      />
    );
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
              <div className="flex items-center text-blue-600">
                <span className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">4</span>
                <span className="ml-2 font-medium">Activities</span>
              </div>
              <div className="w-16 h-0.5 bg-gray-300 mx-2"></div>
              <div className="flex items-center text-gray-400">
                <span className="w-8 h-8 bg-gray-200 text-gray-600 rounded-full flex items-center justify-center text-sm font-bold">5</span>
                <span className="ml-2 font-medium">Results</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Activities & Calculations</h1>
          <div className="space-x-2">
            <button 
              onClick={handleAddActivity}
              className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm font-medium transition"
            >
              + Add Activity
            </button>
            <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50 transition">
              Recalculate All
            </button>
          </div>
        </div>

        {/* Summary Bar */}
        <div className="bg-blue-50 rounded-lg p-4 mb-6 flex justify-between items-center">
          <div className="flex space-x-8">
            <div>
              <p className="text-sm text-gray-600">Total Activities</p>
              <p className="text-xl font-bold text-gray-800">{totals.totalActivities}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Base Hours</p>
              <p className="text-xl font-bold text-gray-800">{totals.baseHours.toFixed(1)}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Hours</p>
              <p className="text-xl font-bold text-blue-600">{totals.totalHours.toFixed(1)}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Est. Duration</p>
              <p className="text-xl font-bold text-gray-800">{Math.ceil(totals.days * 10) / 10} days</p>
            </div>
          </div>
          <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition">
            Save Changes
          </button>
        </div>

        {/* Activities Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-3 py-3 text-left font-medium text-gray-500">Code</th>
                  <th className="px-3 py-3 text-left font-medium text-gray-500">Description</th>
                  <th className="px-3 py-3 text-left font-medium text-gray-500">Component</th>
                  <th className="px-3 py-3 text-center font-medium text-gray-500">Qty</th>
                  <th className="px-3 py-3 text-left font-medium text-gray-500">Unit</th>
                  <th className="px-3 py-3 text-right font-medium text-gray-500">Base Hrs</th>
                  <th className="px-3 py-3 text-center font-medium text-gray-500">Factor</th>
                  <th className="px-3 py-3 text-right font-medium text-gray-500">Total Hrs</th>
                  <th className="px-3 py-3 text-center font-medium text-gray-500">Crew</th>
                  <th className="px-3 py-3 text-right font-medium text-gray-500">Days</th>
                  <th className="px-3 py-3 text-left font-medium text-gray-500">Weld Process</th>
                  <th className="px-3 py-3 text-center font-medium text-gray-500">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {activities.map((activity) => (
                  <tr key={activity.id} className={`hover:bg-gray-50 ${editingId === activity.id ? 'bg-yellow-50' : ''}`}>
                    <td className="px-3 py-2 font-medium text-gray-900">{activity.code}</td>
                    <td className="px-3 py-2">
                      {editingId === activity.id ? (
                        <input
                          type="text"
                          value={editData.description || ''}
                          onChange={(e) => handleChange('description', e.target.value)}
                          className="w-full px-1 py-1 border border-gray-300 rounded text-sm"
                        />
                      ) : (
                        activity.description
                      )}
                    </td>
                    <td className="px-3 py-2 text-gray-500">{activity.component}</td>
                    <td className="px-3 py-2 text-center">
                      {renderCell(activity, 'quantity', 'number')}
                    </td>
                    <td className="px-3 py-2 text-gray-500">{activity.unit}</td>
                    <td className="px-3 py-2 text-right">
                      {renderCell(activity, 'baseHours', 'number')}
                    </td>
                    <td className="px-3 py-2 text-center">
                      {renderCell(activity, 'factor', 'select', factors)}
                    </td>
                    <td className="px-3 py-2 text-right font-medium text-blue-600">
                      {activity.totalHours.toFixed(1)}
                    </td>
                    <td className="px-3 py-2 text-center">
                      {renderCell(activity, 'crew', 'number')}
                    </td>
                    <td className="px-3 py-2 text-right">{activity.days.toFixed(1)}</td>
                    <td className="px-3 py-2">
                      {renderCell(activity, 'weldProcess', 'select', weldingProcesses)}
                    </td>
                    <td className="px-3 py-2 text-center">
                      {editingId === activity.id ? (
                        <div className="space-x-1">
                          <button 
                            onClick={handleSave}
                            className="text-green-600 hover:text-green-800"
                            title="Save"
                          >
                            ✓
                          </button>
                          <button 
                            onClick={handleCancel}
                            className="text-red-600 hover:text-red-800"
                            title="Cancel"
                          >
                            ✕
                          </button>
                        </div>
                      ) : (
                        <div className="space-x-1">
                          <button 
                            onClick={() => handleEdit(activity)}
                            className="text-blue-600 hover:text-blue-800"
                            title="Edit"
                          >
                            ✎
                          </button>
                          <button 
                            onClick={() => handleDelete(activity.id)}
                            className="text-red-600 hover:text-red-800"
                            title="Delete"
                          >
                            🗑
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot className="bg-gray-100 font-medium">
                <tr>
                  <td colSpan="5" className="px-3 py-3 text-right">Totals:</td>
                  <td className="px-3 py-3 text-right">{totals.baseHours.toFixed(1)}</td>
                  <td className="px-3 py-3"></td>
                  <td className="px-3 py-3 text-right text-blue-600 text-lg">{totals.totalHours.toFixed(1)}</td>
                  <td className="px-3 py-3 text-center">{totals.crew}</td>
                  <td className="px-3 py-3 text-right">{totals.days.toFixed(1)}</td>
                  <td colSpan="2"></td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between items-center mt-8">
          <Link to={`/project/${projectId}/scope`} className="text-gray-600 hover:text-gray-800 transition">
            ← Back
          </Link>
          <div className="space-x-4">
            <button className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition">
              Save Draft
            </button>
            <Link 
              to={`/project/${projectId}/results`}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition inline-block"
            >
              View Results →
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ActivitiesGridPage;
