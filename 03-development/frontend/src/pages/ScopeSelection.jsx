import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function ScopeSelection() {
  const [scopeItems, setScopeItems] = useState({
    materialHandling: {
      checked: true,
      expanded: true,
      children: {
        receiptInspection: true,
        storage: true,
        issueProduction: false,
      }
    },
    markingCutting: {
      checked: true,
      expanded: true,
      children: {
        layoutMarking: true,
        plasmaCutting: true,
        oxyFuelCutting: false,
        machining: false,
      }
    },
    fitUpAssembly: {
      checked: true,
      expanded: true,
      children: {
        componentFitUp: true,
        tackWelding: true,
        alignmentCheck: false,
      }
    },
    weldingOperations: {
      checked: true,
      expanded: true,
      children: {
        rootPass: true,
        fillPass: true,
        capPass: true,
        postWeldCleaning: true,
      }
    },
    ndt: {
      checked: false,
      expanded: false,
      children: {}
    },
    heatTreatment: {
      checked: false,
      expanded: false,
      children: {}
    },
    hydrostaticTesting: {
      checked: true,
      expanded: true,
      children: {
        testSetup: true,
        filling: true,
        holdPeriod: true,
        inspection: true,
        draining: false,
      }
    },
  });

  const toggleCategory = (category) => {
    setScopeItems({
      ...scopeItems,
      [category]: {
        ...scopeItems[category],
        expanded: !scopeItems[category].expanded
      }
    });
  };

  const toggleCategoryChecked = (category) => {
    setScopeItems({
      ...scopeItems,
      [category]: {
        ...scopeItems[category],
        checked: !scopeItems[category].checked
      }
    });
  };

  const toggleChildChecked = (category, child) => {
    setScopeItems({
      ...scopeItems,
      [category]: {
        ...scopeItems[category],
        children: {
          ...scopeItems[category].children,
          [child]: !scopeItems[category].children[child]
        }
      }
    });
  };

  const categoryLabels = {
    materialHandling: 'Material Handling',
    markingCutting: 'Marking & Cutting',
    fitUpAssembly: 'Fit-Up Assembly',
    weldingOperations: 'Welding Operations',
    ndt: 'NDT (Non-Destructive Testing)',
    heatTreatment: 'Heat Treatment',
    hydrostaticTesting: 'Hydrostatic Testing',
  };

  const childLabels = {
    receiptInspection: 'Receipt & Inspection',
    storage: 'Storage',
    issueProduction: 'Issue to Production',
    layoutMarking: 'Layout & Marking',
    plasmaCutting: 'Plasma Cutting',
    oxyFuelCutting: 'Oxy-Fuel Cutting',
    machining: 'Machining',
    componentFitUp: 'Component Fit-Up',
    tackWelding: 'Tack Welding',
    alignmentCheck: 'Alignment Check',
    rootPass: 'Root Pass',
    fillPass: 'Fill Pass',
    capPass: 'Cap Pass',
    postWeldCleaning: 'Post-Weld Cleaning',
    testSetup: 'Test Setup',
    filling: 'Filling',
    holdPeriod: 'Hold Period',
    inspection: 'Inspection',
    draining: 'Draining',
  };

  const countSelected = (category) => {
    const children = scopeItems[category].children;
    const selected = Object.values(children).filter(v => v).length;
    const total = Object.keys(children).length;
    return { selected, total };
  };

  const totalSelected = Object.values(scopeItems).reduce((acc, cat) => {
    return acc + Object.values(cat.children).filter(v => v).length;
  }, 0);

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
            <span className="text-sm text-gray-600">Selected: <span className="font-bold text-blue-600">12/33</span></span>
            <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm">
              <option>Load Template...</option>
              <option>Standard Vessel</option>
              <option>Standard Skid</option>
            </select>
            <button className="px-3 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50">Save as Template</button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Scope Checklist */}
          <div className="lg:col-span-2 bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-medium text-gray-800">Select Activities</h3>
              <div className="space-x-2">
                <button className="text-sm text-blue-600 hover:text-blue-800">Expand All</button>
                <button className="text-sm text-blue-600 hover:text-blue-800">Collapse All</button>
              </div>
            </div>

            {Object.entries(scopeItems).map(([key, item]) => (
              <div key={key} className="mb-4">
                <div className="flex items-center mb-2">
                  <input 
                    type="checkbox" 
                    checked={item.checked}
                    onChange={() => toggleCategoryChecked(key)}
                    className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                  />
                  <span className="ml-2 font-medium text-gray-800">{categoryLabels[key]}</span>
                  <button 
                    onClick={() => toggleCategory(key)}
                    className="ml-2 text-gray-400 hover:text-gray-600"
                  >
                    {item.expanded ? '▼' : '▶'}
                  </button>
                </div>
                {item.expanded && Object.keys(item.children).length > 0 && (
                  <div className="ml-6 space-y-2">
                    {Object.entries(item.children).map(([childKey, checked]) => (
                      <label key={childKey} className="flex items-center">
                        <input 
                          type="checkbox" 
                          checked={checked}
                          onChange={() => toggleChildChecked(key, childKey)}
                          className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                        />
                        <span className="ml-2 text-gray-600">{childLabels[childKey]}</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="font-medium text-gray-800 mb-4">Scope Summary</h3>
            <div className="space-y-3">
              {Object.entries(scopeItems).filter(([key]) => Object.keys(scopeItems[key].children).length > 0).map(([key]) => {
                const { selected, total } = countSelected(key);
                return (
                  <div key={key} className="flex justify-between text-sm">
                    <span className="text-gray-600">{categoryLabels[key]}</span>
                    <span className="font-medium">{selected}/{total}</span>
                  </div>
                );
              })}
            </div>
            <div className="mt-6 pt-4 border-t">
              <div className="flex justify-between font-medium">
                <span>Total Selected</span>
                <span className="text-blue-600">{totalSelected} items</span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between items-center mt-8">
          <Link to="/projects/1/components" className="text-gray-600 hover:text-gray-800">← Back</Link>
          <div className="space-x-4">
            <button className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">Save Draft</button>
            <Link to="/projects/1/activities" className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 inline-block">Generate Activities →</Link>
          </div>
        </div>
      </main>
    </div>
  );
}
