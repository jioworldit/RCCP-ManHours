import React from 'react';
import ActivitiesGrid from './components/ActivitiesGrid';
import './App.css';

function App() {
  // Get project ID from URL query param or use default for development
  const urlParams = new URLSearchParams(window.location.search);
  const projectId = urlParams.get('projectId') || 'demo-project-id';

  return (
    <div className="App">
      <ActivitiesGrid projectId={projectId} />
    </div>
  );
}

export default App;
