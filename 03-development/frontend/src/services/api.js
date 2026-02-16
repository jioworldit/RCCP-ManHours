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

// Activity API calls - Updated to match backend routes
export const activityApi = {
  // Get all activities for a project
  getActivities: (projectId) => api.get(`/activities/project/${projectId}`),
  
  // Generate activities using calculation engine
  generateActivities: (projectId) => api.post(`/activities/generate/${projectId}`),
  
  // Update a single activity (backend uses PUT, not PATCH)
  updateActivity: (activityId, data) => api.put(`/activities/${activityId}`, data),
  
  // Bulk update activities
  bulkUpdateActivities: (projectId, activityUpdates) => 
    api.put(`/activities/project/${projectId}/bulk`, { activityUpdates }),
  
  // Add manual activity
  addActivity: (projectId, data) => api.post(`/activities/project/${projectId}/manual`, data),
  
  // Delete activity
  deleteActivity: (activityId) => api.delete(`/activities/${activityId}`),
  
  // Calculate total hours (client-side calculation endpoint)
  calculateHours: (data) => api.post('/calculations/hours', data)
};

// Reference data API calls - Updated to match backend routes
export const referenceApi = {
  getWeldingProcesses: () => api.get('/reference/welding-processes'),
  getScopeTypes: () => api.get('/reference/scope-types'),
  getMaterialGrades: () => api.get('/reference/material-grades')
};

export default api;
