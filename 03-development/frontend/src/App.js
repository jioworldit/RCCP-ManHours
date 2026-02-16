import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';

// Pages
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import ProjectEntry from './pages/ProjectEntry';
import Components from './pages/Components';
import ScopeSelection from './pages/ScopeSelection';
import ActivitiesGrid from './pages/ActivitiesGrid';
import Results from './pages/Results';

import './App.css';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-lg text-gray-600">Loading...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

// Public Route Component (redirects to dashboard if authenticated)
const PublicRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-lg text-gray-600">Loading...</div>
      </div>
    );
  }

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

// App Routes Component
const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route 
        path="/login" 
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        } 
      />
      <Route 
        path="/signup" 
        element={
          <PublicRoute>
            <Signup />
          </PublicRoute>
        } 
      />

      {/* Protected Routes */}
      <Route 
        path="/dashboard" 
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } 
      />
      
      {/* Project Routes */}
      <Route 
        path="/project/new" 
        element={
          <ProtectedRoute>
            <ProjectEntry />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/project/:projectId" 
        element={
          <ProtectedRoute>
            <Components />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/project/:projectId/components" 
        element={
          <ProtectedRoute>
            <Components />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/project/:projectId/scope" 
        element={
          <ProtectedRoute>
            <ScopeSelection />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/project/:projectId/activities" 
        element={
          <ProtectedRoute>
            <ActivitiesGrid />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/project/:projectId/results" 
        element={
          <ProtectedRoute>
            <Results />
          </ProtectedRoute>
        } 
      />

      {/* Default Routes */}
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
};

// Main App Component
function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <AppRoutes />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
