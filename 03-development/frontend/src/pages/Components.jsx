import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Components() {
  const [activeTab, setActiveTab] = useState('Pressure Vessel');
  const [components, setComponents] = useState([
    { id: 1, name: 'Shell Course 1', qty: 1, thickness: 25, material: 'SS 316', dimensions: '⌀2000 × 2000mm' },
    { id: 2, name: 'Top Dish Head', qty: 1, thickness: 25, material: 'SS 316', dimensions: '⌀2000mm Ellipsoidal' },
    { id: 3, name: 'Inlet Nozzle', qty: 2, thickness: 12, material: 'SS 316', dimensions: '4 inch, 300#' },
  ]);

  const tabs = ['Pressure Vessel', 'Process Skid', 'E-House', 'Structure', 'Other'];

  const handleAddComponent = () => {
    const newId = components.length + 1;
    setComponents([...components, { id: newId, name: '', qty: 1, thickness: '', material: 'SS 316', dimensions: '' }]);
  };

  const handleDeleteComponent = (id) => {
    setComponents(components.filter(c => c.id !== id));
  };

  const updateComponent = (id, field, value) => {
    setComponents(components.map(c => c.id === id ? { ...c, [field]: value } : c));
  };

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
              <div className="flex items-center text-blue-600">
                <span className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">2</span>
                <span className="ml-2 font-medium">Components</span>
              </div>
              <div className="w-16 h-0.5 bg-gray-300 mx-2"></div>
              <div className="flex items-center text-gray-400">
                <span className="w-8 h-8 bg-gray-200 text-gray-600 rounded-full flex items-center justify-center text-sm font-bold">3</span>
                <span className="ml-2 font-medium">Scope</span>
              </div>
              <div className="w-16 h-0.5 bg-gray-300 mx-2"></div>
              <div className="flex items-center text-gray-400">
                <span className="w-8 h-8 bg-gray-200 text-gray-600 rounded-full flex items-center justify-center text-sm font-bold">4</span>
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
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Components</h1>

        {/* Product Type Tabs */}
        <div className="bg-white rounded-t-lg shadow border-b">
          <div className="flex">
            {tabs.map((tab) => (
              <button 
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 font-medium ${activeTab === tab ? 'tab-active border-b-2 border-blue-600 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Components Table */}
        <div className="bg-white rounded-b-lg shadow p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium text-gray-800">Pressure Vessel Components</h3>
            <button 
              onClick={handleAddComponent}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition"
            >
              + Add Component
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Component</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Qty</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Thickness (mm)</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Material</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Dimensions</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {components.map((component) => (
                  <tr key={component.id}>
                    <td className="px-4 py-3">
                      <input 
                        type="text" 
                        value={component.name}
                        onChange={(e) => updateComponent(component.id, 'name', e.target.value)}
                        className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                      />
                    </td>
                    <td className="px-4 py-3">
                      <input 
                        type="number" 
                        value={component.qty}
                        onChange={(e) => updateComponent(component.id, 'qty', parseInt(e.target.value) || 0)}
                        className="w-16 px-2 py-1 border border-gray-300 rounded text-sm"
                      />
                    </td>
                    <td className="px-4 py-3">
                      <input 
                        type="number" 
                        value={component.thickness}
                        onChange={(e) => updateComponent(component.id, 'thickness', e.target.value)}
                        className="w-20 px-2 py-1 border border-gray-300 rounded text-sm"
                      />
                    </td>
                    <td className="px-4 py-3">
                      <select 
                        value={component.material}
                        onChange={(e) => updateComponent(component.id, 'material', e.target.value)}
                        className="w-32 px-2 py-1 border border-gray-300 rounded text-sm"
                      >
                        <option>SS 316</option>
                        <option>SS 304</option>
                        <option>CS</option>
                        <option>Alloy</option>
                      </select>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-500">{component.dimensions}</td>
                    <td className="px-4 py-3">
                      <button 
                        onClick={() => handleDeleteComponent(component.id)}
                        className="text-red-600 hover:text-red-800 text-sm"
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
          <div className="flex justify-between items-center mt-6 pt-6 border-t">
            <Link to="/projects/new" className="text-gray-600 hover:text-gray-800">← Back</Link>
            <div className="space-x-4">
              <button className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">Save Draft</button>
              <Link to="/projects/1/scope" className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 inline-block">Continue →</Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
