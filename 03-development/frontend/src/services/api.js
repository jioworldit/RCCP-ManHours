import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Activity API calls
export const activityApi = {
  // Get all activities for a project
  getActivities: (projectId) => api.get(`/projects/${projectId}/activities`),
  
  // Generate activities using calculation engine
  generateActivities: (projectId) => api.post(`/projects/${projectId}/activities/generate`),
  
  // Update a single activity
  updateActivity: (activityId, data) => api.patch(`/activities/${activityId}`, data),
  
  // Bulk update activities
  bulkUpdateActivities: (projectId, activityUpdates) => 
    api.patch(`/projects/${projectId}/activities`, { activityUpdates }),
  
  // Add manual activity
  addActivity: (projectId, data) => api.post(`/projects/${projectId}/activities`, data),
  
  // Delete activity
  deleteActivity: (activityId) => api.delete(`/activities/${activityId}`),
  
  // Calculate total hours (client-side calculation endpoint)
  calculateHours: (data) => api.post('/calculations/hours', data)
};

// Reference data API calls
export const referenceApi = {
  getWeldingProcesses: () => api.get('/references/welding-processes'),
  getScopeTypes: () => api.get('/references/scope-types'),
  getMaterialGrades: () => api.get('/references/material-grades')
};

export default api;
