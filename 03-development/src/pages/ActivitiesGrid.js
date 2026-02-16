import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ActivitiesGrid = () => {
  const [activities, setActivities] = useState([
    { id: 1, code: 'F-101', description: 'Shell Course Fit-Up', component: 'Shell Course 1', qty: 1, unit: 'nos', baseHours: 8.5, factor: 1.2, totalHours: 10.2, crew: 4, days: 1.3, weldProcess: '-', isNew: false },
    { id: 2, code: 'W-201', description: 'Longitudinal Seam Weld', component: 'Shell Course 1', qty: 1, unit: 'nos', baseHours: 12.5, factor: 1.25, totalHours: 18.4, crew: 3, days: 2.3, weldProcess: 'SMAW+SAW', isNew: false },
    { id: 3, code: 'W-301', description: 'Nozzle Set-On Weld', component: 'Inlet Nozzle', qty: 2, unit: 'nos', baseHours: 4.2, factor: 1.5, totalHours: 15.8, crew: 2, days: 2.0, weldProcess: 'GTAW+SMAW', isNew: false },
    { id: 4, code: 'W-302', description: 'Nozzle Set-On Weld', component: 'Outlet Nozzle', qty: 1, unit: 'nos', baseHours: 4.2, factor: 1.5, totalHours: 7.9, crew: 2, days: 1.0, weldProcess: 'GTAW+SMAW', isNew: true }
  ]);

  const factors = [0.5, 0.75, 1.0, 1.25, 1.5, 2.0];
  const weldProcesses = ['SMAW', 'GTAW', 'SMAW+SAW', 'GTAW+SMAW', 'FCAW'];

  const handleActivityChange = (id, field, value) => {
    setActivities(activities.map(act => {
      if (act.id === id) {
        const updated = { ...act, [field]: value };
        if (field === 'qty' || field === 'baseHours' || field === 'factor') {
          updated.totalHours = (updated.qty * updated.baseHours * updated.factor).toFixed(1);
          updated.days = (updated.totalHours / (updated.crew * 8)).toFixed(1);
        }
        return updated;
      }
      return act;
    }));
  };

  const handleDelete = (id) => {
    setActivities(activities.filter(act => act.id !== id));
  };

  const handleAddActivity = () => {
    const newId = activities.length > 0 ? Math.max(...activities.map(a => a.id)) + 1 : 1;
    setActivities([...activities, {
      id: newId,
      code: '',
      description: '',
      component: '',
      qty: 1,
      unit: 'nos',
      baseHours: 0,
      factor: 1.0,
      totalHours: 0,
      crew: 1,
      days: 0,
      weldProcess: '-',
      isNew: true
    }]);
  };

  const totals = activities.reduce((acc, act) => ({
    baseHours: acc.baseHours + (act.baseHours * act.qty),
    totalHours: acc.totalHours + parseFloat(act.totalHours),
    crew: acc.crew + act.crew
  }), { baseHours: 0, totalHours: 0, crew: 0 });

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
            {/* Step 4 - Current */}
            <div style={{ display: 'flex', alignItems: 'center', color: '#2563eb' }}>
              <span style={{ width: '32px', height: '32px', backgroundColor: '#2563eb', color: 'white', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', fontWeight: 'bold' }}>4</span>
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
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <h1 style={{ fontSize: '24px', fontWeight: 'bold', color: '#1f2937' }}>Activities & Calculations</h1>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button onClick={handleAddActivity} style={{ padding: '8px 16px', backgroundColor: '#16a34a', color: 'white', borderRadius: '8px', border: 'none', fontSize: '14px', fontWeight: '500', cursor: 'pointer' }}>+ Add Activity</button>
            <button style={{ padding: '8px 16px', border: '1px solid #d1d5db', borderRadius: '8px', fontSize: '14px', cursor: 'pointer' }}>Recalculate All</button>
          </div>
        </div>

        {/* Summary Bar */}
        <div style={{ backgroundColor: '#eff6ff', borderRadius: '8px', padding: '16px', marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', gap: '32px' }}>
            <div>
              <p style={{ fontSize: '14px', color: '#6b7280' }}>Total Activities</p>
              <p style={{ fontSize: '20px', fontWeight: 'bold', color: '#1f2937' }}>{activities.length}</p>
            </div>
            <div>
              <p style={{ fontSize: '14px', color: '#6b7280' }}>Base Hours</p>
              <p style={{ fontSize: '20px', fontWeight: 'bold', color: '#1f2937' }}>{totals.baseHours.toFixed(1)}</p>
            </div>
            <div>
              <p style={{ fontSize: '14px', color: '#6b7280' }}>Total Hours</p>
              <p style={{ fontSize: '20px', fontWeight: 'bold', color: '#2563eb' }}>{totals.totalHours.toFixed(1)}</p>
            </div>
            <div>
              <p style={{ fontSize: '14px', color: '#6b7280' }}>Est. Duration</p>
              <p style={{ fontSize: '20px', fontWeight: 'bold', color: '#1f2937' }}>{Math.ceil(totals.totalHours / 8)} days</p>
            </div>
          </div>
          <button style={{ padding: '8px 16px', backgroundColor: '#2563eb', color: 'white', borderRadius: '8px', border: 'none', fontSize: '14px', cursor: 'pointer' }}>Save Changes</button>
        </div>

        {/* Activities Table */}
        <div style={{ backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
              <thead style={{ backgroundColor: '#f9fafb' }}>
                <tr>
                  <th style={{ padding: '12px', textAlign: 'left', fontWeight: '500', color: '#6b7280' }}>Code</th>
                  <th style={{ padding: '12px', textAlign: 'left', fontWeight: '500', color: '#6b7280' }}>Description</th>
                  <th style={{ padding: '12px', textAlign: 'left', fontWeight: '500', color: '#6b7280' }}>Component</th>
                  <th style={{ padding: '12px', textAlign: 'center', fontWeight: '500', color: '#6b7280' }}>Qty</th>
                  <th style={{ padding: '12px', textAlign: 'left', fontWeight: '500', color: '#6b7280' }}>Unit</th>
                  <th style={{ padding: '12px', textAlign: 'right', fontWeight: '500', color: '#6b7280' }}>Base Hrs</th>
                  <th style={{ padding: '12px', textAlign: 'center', fontWeight: '500', color: '#6b7280' }}>Factor</th>
                  <th style={{ padding: '12px', textAlign: 'right', fontWeight: '500', color: '#6b7280' }}>Total Hrs</th>
                  <th style={{ padding: '12px', textAlign: 'center', fontWeight: '500', color: '#6b7280' }}>Crew</th>
                  <th style={{ padding: '12px', textAlign: 'right', fontWeight: '500', color: '#6b7280' }}>Days</th>
                  <th style={{ padding: '12px', textAlign: 'left', fontWeight: '500', color: '#6b7280' }}>Weld Process</th>
                  <th style={{ padding: '12px', textAlign: 'center', fontWeight: '500', color: '#6b7280' }}>Actions</th>
                </tr>
              </thead>
              <tbody style={{ borderTop: '1px solid #e5e7eb' }}>
                {activities.map((activity) => (
                  <tr key={activity.id} style={{ borderTop: '1px solid #e5e7eb', backgroundColor: activity.isNew ? '#fefce8' : 'transparent' }}>
                    <td style={{ padding: '8px 12px', fontWeight: '500', color: '#111827' }}>{activity.code}</td>
                    <td style={{ padding: '8px 12px' }}>{activity.description}</td>
                    <td style={{ padding: '8px 12px', color: '#6b7280' }}>{activity.component}</td>
                    <td style={{ padding: '8px 12px', textAlign: 'center' }}>
                      <input
                        type="number"
                        value={activity.qty}
                        onChange={(e) => handleActivityChange(activity.id, 'qty', parseInt(e.target.value) || 0)}
                        style={{ width: '48px', padding: '4px', border: '1px solid #d1d5db', borderRadius: '4px', textAlign: 'center' }}
                      />
                    </td>
                    <td style={{ padding: '8px 12px', color: '#6b7280' }}>{activity.unit}</td>
                    <td style={{ padding: '8px 12px', textAlign: 'right' }}>
                      <input
                        type="number"
                        value={activity.baseHours}
                        onChange={(e) => handleActivityChange(activity.id, 'baseHours', parseFloat(e.target.value) || 0)}
                        style={{ width: '64px', padding: '4px', border: '1px solid #d1d5db', borderRadius: '4px', textAlign: 'right' }}
                      />
                    </td>
                    <td style={{ padding: '8px 12px', textAlign: 'center' }}>
                      <select
                        value={activity.factor}
                        onChange={(e) => handleActivityChange(activity.id, 'factor', parseFloat(e.target.value))}
                        style={{ width: '64px', padding: '4px', border: '1px solid #d1d5db', borderRadius: '4px', fontSize: '12px' }}
                      >
                        {factors.map(f => <option key={f} value={f}>{f}</option>)}
                      </select>
                    </td>
                    <td style={{ padding: '8px 12px', textAlign: 'right', fontWeight: '500', color: '#2563eb' }}>{activity.totalHours}</td>
                    <td style={{ padding: '8px 12px', textAlign: 'center' }}>
                      <input
                        type="number"
                        value={activity.crew}
                        onChange={(e) => handleActivityChange(activity.id, 'crew', parseInt(e.target.value) || 1)}
                        style={{ width: '48px', padding: '4px', border: '1px solid #d1d5db', borderRadius: '4px', textAlign: 'center' }}
                      />
                    </td>
                    <td style={{ padding: '8px 12px', textAlign: 'right' }}>{activity.days}</td>
                    <td style={{ padding: '8px 12px' }}>
                      {activity.weldProcess === '-' ? (
                        <span style={{ color: '#6b7280' }}>-</span>
                      ) : (
                        <select
                          value={activity.weldProcess}
                          onChange={(e) => handleActivityChange(activity.id, 'weldProcess', e.target.value)}
                          style={{ width: '96px', padding: '4px', border: '1px solid #d1d5db', borderRadius: '4px', fontSize: '12px' }}
                        >
                          {weldProcesses.map(p => <option key={p} value={p}>{p}</option>)}
                        </select>
                      )}
                    </td>
                    <td style={{ padding: '8px 12px', textAlign: 'center' }}>
                      <button onClick={() => handleDelete(activity.id)} style={{ color: '#dc2626', border: 'none', backgroundColor: 'transparent', cursor: 'pointer' }}>🗑</button>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot style={{ backgroundColor: '#f3f4f6', fontWeight: '500' }}>
                <tr>
                  <td colSpan="5" style={{ padding: '12px', textAlign: 'right' }}>Totals:</td>
                  <td style={{ padding: '12px', textAlign: 'right' }}>{totals.baseHours.toFixed(1)}</td>
                  <td style={{ padding: '12px' }}></td>
                  <td style={{ padding: '12px', textAlign: 'right', color: '#2563eb', fontSize: '18px' }}>{totals.totalHours.toFixed(1)}</td>
                  <td style={{ padding: '12px', textAlign: 'center' }}>{activities.reduce((a, b) => a + b.crew, 0)}</td>
                  <td style={{ padding: '12px', textAlign: 'right' }}>{(totals.totalHours / 8).toFixed(1)}</td>
                  <td colSpan="2" style={{ padding: '12px' }}></td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '32px' }}>
          <Link to="/project/RCCP-2026-001/scope" style={{ color: '#4b5563', textDecoration: 'none', fontSize: '14px' }}>← Back</Link>
          <div style={{ display: 'flex', gap: '16px' }}>
            <button style={{ padding: '10px 24px', border: '1px solid #d1d5db', borderRadius: '8px', color: '#374151', fontSize: '14px', cursor: 'pointer' }}>Save Draft</button>
            <Link to="/project/RCCP-2026-001/results" style={{ padding: '10px 24px', backgroundColor: '#2563eb', color: 'white', borderRadius: '8px', textDecoration: 'none', fontSize: '14px' }}>View Results →</Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ActivitiesGrid;
