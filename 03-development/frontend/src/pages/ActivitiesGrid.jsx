import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function ActivitiesGrid() {
  const [activities, setActivities] = useState([
    { id: 1, code: 'F-101', description: 'Shell Course Fit-Up', component: 'Shell Course 1', qty: 1, unit: 'nos', baseHrs: 8.5, factor: '1.0', totalHrs: 10.2, crew: 4, days: 1.3, weldProcess: '-' },
    { id: 2, code: 'W-201', description: 'Longitudinal Seam Weld', component: 'Shell Course 1', qty: 1, unit: 'nos', baseHrs: 12.5, factor: '1.25', totalHrs: 18.4, crew: 3, days: 2.3, weldProcess: 'SMAW+SAW' },
    { id: 3, code: 'W-301', description: 'Nozzle Set-On Weld', component: 'Inlet Nozzle', qty: 2, unit: 'nos', baseHrs: 4.2, factor: '1.5', totalHrs: 15.8, crew: 2, days: 2.0, weldProcess: 'GTAW+SMAW' },
    { id: 4, code: 'W-302', description: 'Nozzle Set-On Weld', component: 'Outlet Nozzle', qty: 1, unit: 'nos', baseHrs: 4.2, factor: '1.5', totalHrs: 7.9, crew: 2, days: 1.0, weldProcess: 'GTAW+SMAW', highlight: true },
  ]);

  const updateActivity = (id, field, value) => {
    setActivities(activities.map(a => a.id === id ? { ...a, [field]: value } : a));
  };

  const handleDelete = (id) => {
    setActivities(activities.filter(a => a.id !== id));
  };

  const handleAddActivity = () => {
    const newId = activities.length + 1;
    setActivities([...activities, { 
      id: newId, 
      code: '', 
      description: '', 
      component: '', 
      qty: 1, 
      unit: 'nos', 
      baseHrs: 0, 
      factor: '1.0', 
      totalHrs: 0, 
      crew: 1, 
      days: 0, 
      weldProcess: '-' 
    }]);
  };

  const totalBaseHrs = activities.reduce((acc, a) => acc + parseFloat(a.baseHrs || 0), 0);
  const totalHrs = activities.reduce((acc, a) => acc + parseFloat(a.totalHrs || 0), 0);
  const totalDays = activities.reduce((acc, a) => acc + parseFloat(a.days || 0), 0);
  const totalCrew = activities.reduce((acc, a) => acc + parseInt(a.crew || 0), 0);

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link to="/dashboard" className="text-2xl font-bold text-blue-600">RCCP</Link>
              <span className="ml-2 text-gray-600">Man-Hours</span>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-500">Project: RCCP-2026-001</span>
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
            <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50">Recalculate All</button>
          </div>
        </div>

        {/* Summary Bar */}
        <div className="bg-blue-50 rounded-lg p-4 mb-6 flex justify-between items-center">
          <div className="flex space-x-8">
            <div>
              <p className="text-sm text-gray-600">Total Activities</p>
              <p className="text-xl font-bold text-gray-800">{activities.length}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Base Hours</p>
              <p className="text-xl font-bold text-gray-800">{totalBaseHrs.toFixed(1)}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Hours</p>
              <p className="text-xl font-bold text-blue-600">{totalHrs.toFixed(1)}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Est. Duration</p>
              <p className="text-xl font-bold text-gray-800">{Math.ceil(totalDays)} days</p>
            </div>
          </div>
          <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium">Save Changes</button>
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
                  <tr key={activity.id} className={`hover:bg-gray-50 ${activity.highlight ? 'bg-yellow-50' : ''}`}>
                    <td className="px-3 py-2 font-medium text-gray-900">{activity.code}</td>
                    <td className="px-3 py-2">{activity.description}</td>
                    <td className="px-3 py-2 text-gray-500">{activity.component}</td>
                    <td className="px-3 py-2 text-center">
                      <input 
                        type="number" 
                        value={activity.qty}
                        onChange={(e) => updateActivity(activity.id, 'qty', parseInt(e.target.value) || 0)}
                        className="w-12 px-1 py-1 border border-gray-300 rounded text-center"
                      />
                    </td>
                    <td className="px-3 py-2 text-gray-500">{activity.unit}</td>
                    <td className="px-3 py-2 text-right">
                      <input 
                        type="number" 
                        value={activity.baseHrs}
                        onChange={(e) => updateActivity(activity.id, 'baseHrs', parseFloat(e.target.value) || 0)}
                        className="w-16 px-1 py-1 border border-gray-300 rounded text-right"
                      />
                    </td>
                    <td className="px-3 py-2 text-center">
                      <select 
                        value={activity.factor}
                        onChange={(e) => updateActivity(activity.id, 'factor', e.target.value)}
                        className="w-16 px-1 py-1 border border-gray-300 rounded text-sm"
                      >
                        <option>0.5</option>
                        <option>0.75</option>
                        <option>1.0</option>
                        <option>1.25</option>
                        <option>1.5</option>
                        <option>2.0</option>
                      </select>
                    </td>
                    <td className="px-3 py-2 text-right font-medium text-blue-600">{activity.totalHrs}</td>
                    <td className="px-3 py-2 text-center">
                      <input 
                        type="number" 
                        value={activity.crew}
                        onChange={(e) => updateActivity(activity.id, 'crew', parseInt(e.target.value) || 1)}
                        className="w-12 px-1 py-1 border border-gray-300 rounded text-center"
                      />
                    </td>
                    <td className="px-3 py-2 text-right">{activity.days}</td>
                    <td className="px-3 py-2">
                      {activity.weldProcess === '-' ? (
                        <span className="text-gray-500">-</span>
                      ) : (
                        <select 
                          value={activity.weldProcess}
                          onChange={(e) => updateActivity(activity.id, 'weldProcess', e.target.value)}
                          className="w-24 px-1 py-1 border border-gray-300 rounded text-xs"
                        >
                          <option>SMAW</option>
                          <option>GTAW</option>
                          <option>SMAW+SAW</option>
                          <option>GTAW+SMAW</option>
                          <option>FCAW</option>
                        </select>
                      )}
                    </td>
                    <td className="px-3 py-2 text-center">
                      <button 
                        onClick={() => handleDelete(activity.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        🗑
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot className="bg-gray-100 font-medium">
                <tr>
                  <td colSpan="5" className="px-3 py-3 text-right">Totals:</td>
                  <td className="px-3 py-3 text-right">{totalBaseHrs.toFixed(1)}</td>
                  <td className="px-3 py-3"></td>
                  <td className="px-3 py-3 text-right text-blue-600 text-lg">{totalHrs.toFixed(1)}</td>
                  <td className="px-3 py-3 text-center">{totalCrew}</td>
                  <td className="px-3 py-3 text-right">{totalDays.toFixed(1)}</td>
                  <td colSpan="2"></td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between items-center mt-8">
          <Link to="/projects/1/scope" className="text-gray-600 hover:text-gray-800">← Back</Link>
          <div className="space-x-4">
            <button className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">Save Draft</button>
            <Link to="/projects/1/results" className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 inline-block">View Results →</Link>
          </div>
        </div>
      </main>
    </div>
  );
}
