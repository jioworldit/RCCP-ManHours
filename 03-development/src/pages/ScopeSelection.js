import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ScopeSelection = () => {
  const [scopeData, setScopeData] = useState({
    materialHandling: { checked: true, expanded: true, items: { receipt: true, storage: true, issue: false } },
    markingCutting: { checked: true, expanded: true, items: { layout: true, plasma: true, oxyfuel: false, machining: false } },
    fitUp: { checked: true, expanded: true, items: { componentFit: true, tackWeld: true, alignment: false } },
    welding: { checked: true, expanded: true, items: { root: true, fill: true, cap: true, cleaning: true } },
    ndt: { checked: false, expanded: false, items: {} },
    heatTreatment: { checked: false, expanded: false, items: {} },
    hydrostatic: { checked: true, expanded: true, items: { setup: true, filling: true, hold: true, inspection: true, draining: false } }
  });

  const toggleCategory = (category) => {
    setScopeData(prev => ({
      ...prev,
      [category]: { ...prev[category], expanded: !prev[category].expanded }
    }));
  };

  const toggleCategoryChecked = (category) => {
    setScopeData(prev => ({
      ...prev,
      [category]: { ...prev[category], checked: !prev[category].checked }
    }));
  };

  const toggleItem = (category, item) => {
    setScopeData(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        items: { ...prev[category].items, [item]: !prev[category].items[item] }
      }
    }));
  };

  const calculateSelected = () => {
    let total = 0;
    Object.values(scopeData).forEach(cat => {
      Object.values(cat.items).forEach(item => {
        if (item) total++;
      });
    });
    return total;
  };

  const categoryStats = [
    { name: 'Material Handling', key: 'materialHandling', total: 3 },
    { name: 'Marking & Cutting', key: 'markingCutting', total: 4 },
    { name: 'Fit-Up Assembly', key: 'fitUp', total: 3 },
    { name: 'Welding Operations', key: 'welding', total: 4 },
    { name: 'Hydrostatic Testing', key: 'hydrostatic', total: 5 }
  ];

  const getCategorySelected = (key) => {
    return Object.values(scopeData[key].items).filter(v => v).length;
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
            {/* Step 2 - Completed */}
            <div style={{ display: 'flex', alignItems: 'center', color: '#16a34a' }}>
              <span style={{ width: '32px', height: '32px', backgroundColor: '#16a34a', color: 'white', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', fontWeight: 'bold' }}>✓</span>
              <span style={{ marginLeft: '8px', fontWeight: '500', fontSize: '14px' }}>Components</span>
            </div>
            <div style={{ width: '64px', height: '2px', backgroundColor: '#16a34a', margin: '0 8px' }}></div>
            {/* Step 3 - Current */}
            <div style={{ display: 'flex', alignItems: 'center', color: '#2563eb' }}>
              <span style={{ width: '32px', height: '32px', backgroundColor: '#2563eb', color: 'white', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', fontWeight: 'bold' }}>3</span>
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
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <h1 style={{ fontSize: '24px', fontWeight: 'bold', color: '#1f2937' }}>Scope of Work</h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <span style={{ fontSize: '14px', color: '#4b5563' }}>Selected: <strong style={{ color: '#2563eb' }}>{calculateSelected()}/33</strong></span>
            <select style={{ padding: '8px 12px', border: '1px solid #d1d5db', borderRadius: '8px', fontSize: '14px' }}>
              <option>Load Template...</option>
              <option>Standard Vessel</option>
              <option>Standard Skid</option>
            </select>
            <button style={{ padding: '8px 12px', border: '1px solid #d1d5db', borderRadius: '8px', fontSize: '14px', cursor: 'pointer' }}>Save as Template</button>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px' }}>
          {/* Scope Checklist */}
          <div style={{ backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', padding: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 style={{ fontWeight: '500', color: '#1f2937' }}>Select Activities</h3>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button style={{ fontSize: '14px', color: '#2563eb', border: 'none', backgroundColor: 'transparent', cursor: 'pointer' }}>Expand All</button>
                <button style={{ fontSize: '14px', color: '#2563eb', border: 'none', backgroundColor: 'transparent', cursor: 'pointer' }}>Collapse All</button>
              </div>
            </div>

            {/* Material Handling */}
            <div style={{ marginBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                <input
                  type="checkbox"
                  checked={scopeData.materialHandling.checked}
                  onChange={() => toggleCategoryChecked('materialHandling')}
                  style={{ width: '16px', height: '16px', cursor: 'pointer' }}
                />
                <span style={{ marginLeft: '8px', fontWeight: '500', color: '#1f2937' }}>Material Handling</span>
                <button onClick={() => toggleCategory('materialHandling')} style={{ marginLeft: '8px', color: '#9ca3af', border: 'none', backgroundColor: 'transparent', cursor: 'pointer' }}>
                  {scopeData.materialHandling.expanded ? '▼' : '▶'}
                </button>
              </div>
              {scopeData.materialHandling.expanded && (
                <div style={{ marginLeft: '24px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                    <input type="checkbox" checked={scopeData.materialHandling.items.receipt} onChange={() => toggleItem('materialHandling', 'receipt')} style={{ width: '16px', height: '16px' }} />
                    <span style={{ marginLeft: '8px', color: '#4b5563' }}>Receipt & Inspection</span>
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                    <input type="checkbox" checked={scopeData.materialHandling.items.storage} onChange={() => toggleItem('materialHandling', 'storage')} style={{ width: '16px', height: '16px' }} />
                    <span style={{ marginLeft: '8px', color: '#4b5563' }}>Storage</span>
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                    <input type="checkbox" checked={scopeData.materialHandling.items.issue} onChange={() => toggleItem('materialHandling', 'issue')} style={{ width: '16px', height: '16px' }} />
                    <span style={{ marginLeft: '8px', color: '#4b5563' }}>Issue to Production</span>
                  </label>
                </div>
              )}
            </div>

            {/* Marking & Cutting */}
            <div style={{ marginBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                <input
                  type="checkbox"
                  checked={scopeData.markingCutting.checked}
                  onChange={() => toggleCategoryChecked('markingCutting')}
                  style={{ width: '16px', height: '16px', cursor: 'pointer' }}
                />
                <span style={{ marginLeft: '8px', fontWeight: '500', color: '#1f2937' }}>Marking & Cutting</span>
                <button onClick={() => toggleCategory('markingCutting')} style={{ marginLeft: '8px', color: '#9ca3af', border: 'none', backgroundColor: 'transparent', cursor: 'pointer' }}>
                  {scopeData.markingCutting.expanded ? '▼' : '▶'}
                </button>
              </div>
              {scopeData.markingCutting.expanded && (
                <div style={{ marginLeft: '24px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                    <input type="checkbox" checked={scopeData.markingCutting.items.layout} onChange={() => toggleItem('markingCutting', 'layout')} style={{ width: '16px', height: '16px' }} />
                    <span style={{ marginLeft: '8px', color: '#4b5563' }}>Layout & Marking</span>
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                    <input type="checkbox" checked={scopeData.markingCutting.items.plasma} onChange={() => toggleItem('markingCutting', 'plasma')} style={{ width: '16px', height: '16px' }} />
                    <span style={{ marginLeft: '8px', color: '#4b5563' }}>Plasma Cutting</span>
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                    <input type="checkbox" checked={scopeData.markingCutting.items.oxyfuel} onChange={() => toggleItem('markingCutting', 'oxyfuel')} style={{ width: '16px', height: '16px' }} />
                    <span style={{ marginLeft: '8px', color: '#4b5563' }}>Oxy-Fuel Cutting</span>
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                    <input type="checkbox" checked={scopeData.markingCutting.items.machining} onChange={() => toggleItem('markingCutting', 'machining')} style={{ width: '16px', height: '16px' }} />
                    <span style={{ marginLeft: '8px', color: '#4b5563' }}>Machining</span>
                  </label>
                </div>
              )}
            </div>

            {/* Fit-Up */}
            <div style={{ marginBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                <input
                  type="checkbox"
                  checked={scopeData.fitUp.checked}
                  onChange={() => toggleCategoryChecked('fitUp')}
                  style={{ width: '16px', height: '16px', cursor: 'pointer' }}
                />
                <span style={{ marginLeft: '8px', fontWeight: '500', color: '#1f2937' }}>Fit-Up Assembly</span>
                <button onClick={() => toggleCategory('fitUp')} style={{ marginLeft: '8px', color: '#9ca3af', border: 'none', backgroundColor: 'transparent', cursor: 'pointer' }}>
                  {scopeData.fitUp.expanded ? '▼' : '▶'}
                </button>
              </div>
              {scopeData.fitUp.expanded && (
                <div style={{ marginLeft: '24px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                    <input type="checkbox" checked={scopeData.fitUp.items.componentFit} onChange={() => toggleItem('fitUp', 'componentFit')} style={{ width: '16px', height: '16px' }} />
                    <span style={{ marginLeft: '8px', color: '#4b5563' }}>Component Fit-Up</span>
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                    <input type="checkbox" checked={scopeData.fitUp.items.tackWeld} onChange={() => toggleItem('fitUp', 'tackWeld')} style={{ width: '16px', height: '16px' }} />
                    <span style={{ marginLeft: '8px', color: '#4b5563' }}>Tack Welding</span>
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                    <input type="checkbox" checked={scopeData.fitUp.items.alignment} onChange={() => toggleItem('fitUp', 'alignment')} style={{ width: '16px', height: '16px' }} />
                    <span style={{ marginLeft: '8px', color: '#4b5563' }}>Alignment Check</span>
                  </label>
                </div>
              )}
            </div>

            {/* Welding */}
            <div style={{ marginBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                <input
                  type="checkbox"
                  checked={scopeData.welding.checked}
                  onChange={() => toggleCategoryChecked('welding')}
                  style={{ width: '16px', height: '16px', cursor: 'pointer' }}
                />
                <span style={{ marginLeft: '8px', fontWeight: '500', color: '#1f2937' }}>Welding Operations</span>
                <button onClick={() => toggleCategory('welding')} style={{ marginLeft: '8px', color: '#9ca3af', border: 'none', backgroundColor: 'transparent', cursor: 'pointer' }}>
                  {scopeData.welding.expanded ? '▼' : '▶'}
                </button>
              </div>
              {scopeData.welding.expanded && (
                <div style={{ marginLeft: '24px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                    <input type="checkbox" checked={scopeData.welding.items.root} onChange={() => toggleItem('welding', 'root')} style={{ width: '16px', height: '16px' }} />
                    <span style={{ marginLeft: '8px', color: '#4b5563' }}>Root Pass</span>
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                    <input type="checkbox" checked={scopeData.welding.items.fill} onChange={() => toggleItem('welding', 'fill')} style={{ width: '16px', height: '16px' }} />
                    <span style={{ marginLeft: '8px', color: '#4b5563' }}>Fill Pass</span>
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                    <input type="checkbox" checked={scopeData.welding.items.cap} onChange={() => toggleItem('welding', 'cap')} style={{ width: '16px', height: '16px' }} />
                    <span style={{ marginLeft: '8px', color: '#4b5563' }}>Cap Pass</span>
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                    <input type="checkbox" checked={scopeData.welding.items.cleaning} onChange={() => toggleItem('welding', 'cleaning')} style={{ width: '16px', height: '16px' }} />
                    <span style={{ marginLeft: '8px', color: '#4b5563' }}>Post-Weld Cleaning</span>
                  </label>
                </div>
              )}
            </div>

            {/* NDT */}
            <div style={{ marginBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <input
                  type="checkbox"
                  checked={scopeData.ndt.checked}
                  onChange={() => toggleCategoryChecked('ndt')}
                  style={{ width: '16px', height: '16px', cursor: 'pointer' }}
                />
                <span style={{ marginLeft: '8px', fontWeight: '500', color: '#1f2937' }}>NDT (Non-Destructive Testing)</span>
                <button onClick={() => toggleCategory('ndt')} style={{ marginLeft: '8px', color: '#9ca3af', border: 'none', backgroundColor: 'transparent', cursor: 'pointer' }}>
                  {scopeData.ndt.expanded ? '▼' : '▶'}
                </button>
              </div>
            </div>

            {/* Heat Treatment */}
            <div style={{ marginBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <input
                  type="checkbox"
                  checked={scopeData.heatTreatment.checked}
                  onChange={() => toggleCategoryChecked('heatTreatment')}
                  style={{ width: '16px', height: '16px', cursor: 'pointer' }}
                />
                <span style={{ marginLeft: '8px', fontWeight: '500', color: '#1f2937' }}>Heat Treatment</span>
                <button onClick={() => toggleCategory('heatTreatment')} style={{ marginLeft: '8px', color: '#9ca3af', border: 'none', backgroundColor: 'transparent', cursor: 'pointer' }}>
                  {scopeData.heatTreatment.expanded ? '▼' : '▶'}
                </button>
              </div>
            </div>

            {/* Hydrostatic Testing */}
            <div style={{ marginBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                <input
                  type="checkbox"
                  checked={scopeData.hydrostatic.checked}
                  onChange={() => toggleCategoryChecked('hydrostatic')}
                  style={{ width: '16px', height: '16px', cursor: 'pointer' }}
                />
                <span style={{ marginLeft: '8px', fontWeight: '500', color: '#1f2937' }}>Hydrostatic Testing</span>
                <button onClick={() => toggleCategory('hydrostatic')} style={{ marginLeft: '8px', color: '#9ca3af', border: 'none', backgroundColor: 'transparent', cursor: 'pointer' }}>
                  {scopeData.hydrostatic.expanded ? '▼' : '▶'}
                </button>
              </div>
              {scopeData.hydrostatic.expanded && (
                <div style={{ marginLeft: '24px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                    <input type="checkbox" checked={scopeData.hydrostatic.items.setup} onChange={() => toggleItem('hydrostatic', 'setup')} style={{ width: '16px', height: '16px' }} />
                    <span style={{ marginLeft: '8px', color: '#4b5563' }}>Test Setup</span>
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                    <input type="checkbox" checked={scopeData.hydrostatic.items.filling} onChange={() => toggleItem('hydrostatic', 'filling')} style={{ width: '16px', height: '16px' }} />
                    <span style={{ marginLeft: '8px', color: '#4b5563' }}>Filling</span>
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                    <input type="checkbox" checked={scopeData.hydrostatic.items.hold} onChange={() => toggleItem('hydrostatic', 'hold')} style={{ width: '16px', height: '16px' }} />
                    <span style={{ marginLeft: '8px', color: '#4b5563' }}>Hold Period</span>
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                    <input type="checkbox" checked={scopeData.hydrostatic.items.inspection} onChange={() => toggleItem('hydrostatic', 'inspection')} style={{ width: '16px', height: '16px' }} />
                    <span style={{ marginLeft: '8px', color: '#4b5563' }}>Inspection</span>
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                    <input type="checkbox" checked={scopeData.hydrostatic.items.draining} onChange={() => toggleItem('hydrostatic', 'draining')} style={{ width: '16px', height: '16px' }} />
                    <span style={{ marginLeft: '8px', color: '#4b5563' }}>Draining</span>
                  </label>
                </div>
              )}
            </div>
          </div>

          {/* Summary */}
          <div style={{ backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', padding: '24px', height: 'fit-content' }}>
            <h3 style={{ fontWeight: '500', color: '#1f2937', marginBottom: '16px' }}>Scope Summary</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {categoryStats.map((stat) => (
                <div key={stat.key} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
                  <span style={{ color: '#6b7280' }}>{stat.name}</span>
                  <span style={{ fontWeight: '500' }}>{getCategorySelected(stat.key)}/{stat.total}</span>
                </div>
              ))}
            </div>
            <div style={{ marginTop: '24px', paddingTop: '16px', borderTop: '1px solid #e5e7eb' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: '500' }}>
                <span>Total Selected</span>
                <span style={{ color: '#2563eb' }}>{calculateSelected()} items</span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '32px' }}>
          <Link to="/project/RCCP-2026-001/components" style={{ color: '#4b5563', textDecoration: 'none', fontSize: '14px' }}>← Back</Link>
          <div style={{ display: 'flex', gap: '16px' }}>
            <button style={{ padding: '10px 24px', border: '1px solid #d1d5db', borderRadius: '8px', color: '#374151', fontSize: '14px', cursor: 'pointer' }}>Save Draft</button>
            <Link to="/project/RCCP-2026-001/activities" style={{ padding: '10px 24px', backgroundColor: '#2563eb', color: 'white', borderRadius: '8px', textDecoration: 'none', fontSize: '14px' }}>Generate Activities →</Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ScopeSelection;
