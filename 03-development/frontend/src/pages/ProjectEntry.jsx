import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function ProjectEntry() {
  const [projectNumber] = useState('RCCP-2026-004');
  const [projectName, setProjectName] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [location, setLocation] = useState('');
  const [productType, setProductType] = useState('');
  const [description, setDescription] = useState('');
  const [shellThickness, setShellThickness] = useState('');
  const [materialGrade, setMaterialGrade] = useState('Carbon Steel (CS)');
  const [diameter, setDiameter] = useState('');
  const [length, setLength] = useState('');
  const [nozzleCount, setNozzleCount] = useState('');
  const [weldLength, setWeldLength] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle save logic
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
              <Link to="/dashboard" className="text-gray-600 hover:text-gray-800">← Back to Dashboard</Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">New Project</h1>

        <form className="bg-white rounded-lg shadow p-6 space-y-6" onSubmit={handleSubmit}>
          {/* Project Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Project Number *</label>
              <input 
                type="text" 
                value={projectNumber}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50" 
                readOnly
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Project Name *</label>
              <input 
                type="text" 
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                placeholder="Enter project name" 
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Customer Name *</label>
              <input 
                type="text" 
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="Customer company name" 
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
              <input 
                type="text" 
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Project location" 
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Product Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Product Type *</label>
            <select 
              value={productType}
              onChange={(e) => setProductType(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <textarea 
              rows="3" 
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Project description and notes..." 
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </div>

          {/* Technical Parameters */}
          <div className="border-t pt-6">
            <h3 className="text-lg font-medium text-gray-800 mb-4">Technical Parameters</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Shell Thickness (mm)</label>
                <input 
                  type="number" 
                  value={shellThickness}
                  onChange={(e) => setShellThickness(e.target.value)}
                  placeholder="25" 
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Material Grade</label>
                <select 
                  value={materialGrade}
                  onChange={(e) => setMaterialGrade(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                <label className="block text-sm font-medium text-gray-700 mb-2">Diameter (mm)</label>
                <input 
                  type="number" 
                  value={diameter}
                  onChange={(e) => setDiameter(e.target.value)}
                  placeholder="2000" 
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Length (mm)</label>
                <input 
                  type="number" 
                  value={length}
                  onChange={(e) => setLength(e.target.value)}
                  placeholder="6000" 
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Number of Nozzles</label>
                <input 
                  type="number" 
                  value={nozzleCount}
                  onChange={(e) => setNozzleCount(e.target.value)}
                  placeholder="8" 
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Weld Length (m)</label>
                <input 
                  type="number" 
                  value={weldLength}
                  onChange={(e) => setWeldLength(e.target.value)}
                  placeholder="45.5" 
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-4 pt-6 border-t">
            <Link to="/dashboard" className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">Cancel</Link>
            <button type="submit" className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Save & Continue →</button>
          </div>
        </form>
      </main>
    </div>
  );
}
