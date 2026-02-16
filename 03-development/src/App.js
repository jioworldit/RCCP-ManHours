import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import ProjectEntry from './pages/ProjectEntry';
import Components from './pages/Components';
import ScopeSelection from './pages/ScopeSelection';
import ActivitiesGrid from './pages/ActivitiesGrid';
import Results from './pages/Results';
import './index.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/project/new" element={<ProjectEntry />} />
        <Route path="/project/:id/components" element={<Components />} />
        <Route path="/project/:id/scope" element={<ScopeSelection />} />
        <Route path="/project/:id/activities" element={<ActivitiesGrid />} />
        <Route path="/project/:id/results" element={<Results />} />
        <Route path="/" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;