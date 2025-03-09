// client/src/services/api.ts
import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to add the auth token to every request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle token expiration
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle 401 (Unauthorized) responses
    if (error.response && error.response.status === 401) {
      // Clear local storage
      localStorage.removeItem('token');
      
      // Redirect to login page if not already there
      const currentPath = window.location.pathname;
      if (currentPath !== '/login') {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default api;

// Example API methods for resources
export const resourceApi = {
  // Get all resources
  getResources: () => api.get('/api/v1/resources'),
  
  // Get a single resource by ID
  getResource: (id: string) => api.get(`/api/v1/resources/${id}`),
  
  // Get resources by user
  getUserResources: () => api.get('/api/v1/resources/user'),
  
  // Create new resource
  createResource: (formData: FormData) => 
    api.post('/api/v1/resources', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }),
  
  // Update a resource
  updateResource: (id: string, formData: FormData) =>
    api.put(`/api/v1/resources/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }),
  
  // Delete a resource
  deleteResource: (id: string) => api.delete(`/api/v1/resources/${id}`),
  
  // Rate a resource
  rateResource: (id: string, rating: number, review?: string) =>
    api.post(`/api/v1/resources/${id}/ratings`, { rating, review }),
};

// Example API methods for study groups
export const studyGroupApi = {
  // Get all study groups
  getStudyGroups: () => api.get('/api/v1/studygroups'),
  
  // Get a single study group by ID
  getStudyGroup: (id: string) => api.get(`/api/v1/studygroups/${id}`),
  
  // Get study groups by user
  getUserStudyGroups: () => api.get('/api/v1/studygroups/user'),
  
  // Create new study group
  createStudyGroup: (data: any) => api.post('/api/v1/studygroups', data),
  
  // Update a study group
  updateStudyGroup: (id: string, data: any) => api.put(`/api/v1/studygroups/${id}`, data),
  
  // Delete a study group
  deleteStudyGroup: (id: string) => api.delete(`/api/v1/studygroups/${id}`),
  
  // Join a study group
  joinStudyGroup: (id: string) => api.post(`/api/v1/studygroups/${id}/join`),
  
  // Leave a study group
  leaveStudyGroup: (id: string) => api.delete(`/api/v1/studygroups/${id}/leave`),
  
  // Create a new session in a study group
  createSession: (id: string, data: any) => api.post(`/api/v1/studygroups/${id}/sessions`, data),
  
  // Get upcoming sessions
  getUpcomingSessions: () => api.get('/api/v1/studygroups/sessions/upcoming'),
};

// Example API methods for user profile
export const userApi = {
  // Get user profile
  getProfile: () => api.get('/api/v1/auth/me'),
  
  // Update user profile
  updateProfile: (data: any) => api.put('/api/v1/auth/updatedetails', data),
  
  // Update password
  updatePassword: (currentPassword: string, newPassword: string) =>
    api.put('/api/v1/auth/updatepassword', { currentPassword, newPassword }),
  
  // Upload profile image
  uploadProfileImage: (formData: FormData) =>
    api.put('/api/v1/auth/photo', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }),
};