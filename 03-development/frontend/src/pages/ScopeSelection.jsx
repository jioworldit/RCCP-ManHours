import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';

const ScopeSelection = () => {
  const { projectId } = useParams();
  const [template, setTemplate] = useState('');
  const [expandedCategories, setExpandedCategories] = useState({
    materialHandling: true,
    markingCutting: true,
    fitUp: true,
    welding: true,
    hydrostatic: true
  });

  // Scope state with hierarchical structure
  const [scope, setScope] = useState({
    materialHandling: {
      checked: true,
      items: {
        receiptInspection: true,
        storage: true,
        issueToProduction: false
      }
    },
    markingCutting: {
      checked: true,
      items: {
        layoutMarking: true,
        plasmaCutting: true,
        oxyFuelCutting: false,
        machining: false
      }
    },
    fitUp: {
      checked: true,
      items: {
        componentFitUp: true,
        tackWelding: true,
        alignmentCheck: false
      }
    },
    welding: {
      checked: true,
      items: {
        rootPass: true,
        fillPass: true,
        capPass: true,
        postWeldCleaning: true
      }
    },
    ndt: {
      checked: false,
      items: {}
    },
    heatTreatment: {
      checked: false,
      items: {}
    },
    hydrostatic: {
      checked: true,
      items: {
        testSetup: true,
        filling: true,
        holdPeriod: true,
        inspection: true,
        draining: false
      }
    }
  });

  const toggleCategory = (category) => {
    setExpandedCategories(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };

  const handleCategoryChange = (category) => {
    setScope(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        checked: !prev[category].checked
      }
    }));
  };

  const handleItemChange = (category, item) => {
    setScope(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        items: {
          ...prev[category].items,
          [item]: !prev[category].items[item]
        }
      }
    }));
  };

  const expandAll = () => {
    setExpandedCategories({
      materialHandling: true,
      markingCutting: true,
      fitUp: true,
      welding: true,
      hydrostatic: true
    });
  };

  const collapseAll = () => {
    setExpandedCategories({
      materialHandling: false,
      markingCutting: false,
      fitUp: false,
      welding: false,
      hydrostatic: false
    });
  };

  // Calculate selected counts
  const getSelectedCount = (category) => {
    const items = scope[category].items;
    const selected = Object.values(items).filter(Boolean).length;
    const total = Object.keys(items).length;
    return `${selected}/${total}`;
  };

  const getTotalSelected = () => {
    let total = 0;
    Object.values(scope).forEach(category => {
      total += Object.values(category.items).filter(Boolean).length;
    });
    return total;
  };

  const getGrandTotal = () => {
    let total = 0;
    Object.values(scope).forEach(category => {
      total += Object.keys(category.items).length;
    });
    return total;
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
              <div className="flex items-center text-blue-600">
                <span className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">3</span>
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
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Scope of Work</h1>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600">
              Selected: <span className="font-bold text-blue-600">{getTotalSelected()}/{getGrandTotal()}</span>
            </span>
            <select
              value={template}
              onChange={(e) => setTemplate(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Load Template...</option>
              <option value="standardVessel">Standard Vessel</option>
              <option value="standardSkid">Standard Skid</option>
            </select>
            <button className="px-3 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50 transition">
              Save as Template
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Scope Checklist */}
          <div className="lg:col-span-2 bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-medium text-gray-800">Select Activities</h3>
              <div className="space-x-2">
                <button 
                  onClick={expandAll}
                  className="text-sm text-blue-600 hover:text-blue-800 transition"
                >
                  Expand All
                </button>
                <button 
                  onClick={collapseAll}
                  className="text-sm text-blue-600 hover:text-blue-800 transition"
                >
                  Collapse All
                </button>
              </div>
            </div>

            {/* Material Handling */}
            <div className="mb-4">
              <div className="flex items-center mb-2">
                <input
                  type="checkbox"
                  checked={scope.materialHandling.checked}
                  onChange={() => handleCategoryChange('materialHandling')}
                  className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500 cursor-pointer"
                />
                <span className="ml-2 font-medium text-gray-800">Material Handling</span>
                <button 
                  onClick={() => toggleCategory('materialHandling')}
                  className="ml-2 text-gray-400 hover:text-gray-600 transition"
                >
                  {expandedCategories.materialHandling ? '▼' : '▶'}
                </button>
              </div>
              {expandedCategories.materialHandling && (
                <div className="ml-6 space-y-2">
                  {Object.entries(scope.materialHandling.items).map(([key, checked]) => (
                    <label key={key} className="flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => handleItemChange('materialHandling', key)}
                        className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                      />
                      <span className="ml-2 text-gray-600">
                        {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                      </span>
                    </label>
                  ))}
                </div>
              )}
            </div>

            {/* Marking & Cutting */}
            <div className="mb-4">
              <div className="flex items-center mb-2">
                <input
                  type="checkbox"
                  checked={scope.markingCutting.checked}
                  onChange={() => handleCategoryChange('markingCutting')}
                  className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500 cursor-pointer"
                />
                <span className="ml-2 font-medium text-gray-800">Marking & Cutting</span>
                <button 
                  onClick={() => toggleCategory('markingCutting')}
                  className="ml-2 text-gray-400 hover:text-gray-600 transition"
                >
                  {expandedCategories.markingCutting ? '▼' : '▶'}
                </button>
              </div>
              {expandedCategories.markingCutting && (
                <div className="ml-6 space-y-2">
                  {Object.entries(scope.markingCutting.items).map(([key, checked]) => (
                    <label key={key} className="flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => handleItemChange('markingCutting', key)}
                        className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                      />
                      <span className="ml-2 text-gray-600">
                        {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                      </span>
                    </label>
                  ))}
                </div>
              )}
            </div>

            {/* Fit-Up */}
            <div className="mb-4">
              <div className="flex items-center mb-2">
                <input
                  type="checkbox"
                  checked={scope.fitUp.checked}
                  onChange={() => handleCategoryChange('fitUp')}
                  className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500 cursor-pointer"
                />
                <span className="ml-2 font-medium text-gray-800">Fit-Up Assembly</span>
                <button 
                  onClick={() => toggleCategory('fitUp')}
                  className="ml-2 text-gray-400 hover:text-gray-600 transition"
                >
                  {expandedCategories.fitUp ? '▼' : '▶'}
                </button>
              </div>
              {expandedCategories.fitUp && (
                <div className="ml-6 space-y-2">
                  {Object.entries(scope.fitUp.items).map(([key, checked]) => (
                    <label key={key} className="flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => handleItemChange('fitUp', key)}
                        className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                      />
                      <span className="ml-2 text-gray-600">
                        {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                      </span>
                    </label>
                  ))}
                </div>
              )}
            </div>

            {/* Welding */}
            <div className="mb-4">
              <div className="flex items-center mb-2">
                <input
                  type="checkbox"
                  checked={scope.welding.checked}
                  onChange={() => handleCategoryChange('welding')}
                  className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500 cursor-pointer"
                />
                <span className="ml-2 font-medium text-gray-800">Welding Operations</span>
                <button 
                  onClick={() => toggleCategory('welding')}
                  className="ml-2 text-gray-400 hover:text-gray-600 transition"
                >
                  {expandedCategories.welding ? '▼' : '▶'}
                </button>
              </div>
              {expandedCategories.welding && (
                <div className="ml-6 space-y-2">
                  {Object.entries(scope.welding.items).map(([key, checked]) => (
                    <label key={key} className="flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => handleItemChange('welding', key)}
                        className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                      />
                      <span className="ml-2 text-gray-600">
                        {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                      </span>
                    </label>
                  ))}
                </div>
              )}
            </div>

            {/* NDT - Collapsed */}
            <div className="mb-4">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={scope.ndt.checked}
                  onChange={() => handleCategoryChange('ndt')}
                  className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500 cursor-pointer"
                />
                <span className="ml-2 font-medium text-gray-800">NDT (Non-Destructive Testing)</span>
                <button className="ml-2 text-gray-400 hover:text-gray-600 transition">▶</button>
              </div>
            </div>

            {/* Heat Treatment - Collapsed */}
            <div className="mb-4">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={scope.heatTreatment.checked}
                  onChange={() => handleCategoryChange('heatTreatment')}
                  className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500 cursor-pointer"
                />
                <span className="ml-2 font-medium text-gray-800">Heat Treatment</span>
                <button className="ml-2 text-gray-400 hover:text-gray-600 transition">▶</button>
              </div>
            </div>

            {/* Hydrostatic Testing */}
            <div className="mb-4">
              <div className="flex items-center mb-2">
                <input
                  type="checkbox"
                  checked={scope.hydrostatic.checked}
                  onChange={() => handleCategoryChange('hydrostatic')}
                  className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500 cursor-pointer"
                />
                <span className="ml-2 font-medium text-gray-800">Hydrostatic Testing</span>
                <button 
                  onClick={() => toggleCategory('hydrostatic')}
                  className="ml-2 text-gray-400 hover:text-gray-600 transition"
                >
                  {expandedCategories.hydrostatic ? '▼' : '▶'}
                </button>
              </div>
              {expandedCategories.hydrostatic && (
                <div className="ml-6 space-y-2">
                  {Object.entries(scope.hydrostatic.items).map(([key, checked]) => (
                    <label key={key} className="flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => handleItemChange('hydrostatic', key)}
                        className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                      />
                      <span className="ml-2 text-gray-600">
                        {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                      </span>
                    </label>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Summary */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="font-medium text-gray-800 mb-4">Scope Summary</h3>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Material Handling</span>
                <span className="font-medium">{getSelectedCount('materialHandling')}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Marking & Cutting</span>
                <span className="font-medium">{getSelectedCount('markingCutting')}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Fit-Up Assembly</span>
                <span className="font-medium">{getSelectedCount('fitUp')}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Welding Operations</span>
                <span className="font-medium">{getSelectedCount('welding')}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Hydrostatic Testing</span>
                <span className="font-medium">{getSelectedCount('hydrostatic')}</span>
              </div>
            </div>
            <div className="mt-6 pt-4 border-t">
              <div className="flex justify-between font-medium">
                <span>Total Selected</span>
                <span className="text-blue-600">{getTotalSelected()} items</span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between items-center mt-8">
          <Link to={`/project/${projectId}/components`} className="text-gray-600 hover:text-gray-800 transition">
            ← Back
          </Link>
          <div className="space-x-4">
            <button className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition">
              Save Draft
            </button>
            <Link 
              to={`/project/${projectId}/activities`}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition inline-block"
            >
              Generate Activities →
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ScopeSelection;
