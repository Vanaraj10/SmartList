import axios from 'axios';

const api = axios.create({
  baseURL: '/api', // Use relative URL - Vite proxy will handle routing to localhost:8080
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for logging
api.interceptors.request.use(
  (config) => {
    console.log(`🚀 Making ${config.method?.toUpperCase()} request to ${config.url}`);
    return config;
  },
  (error) => {
    console.error('❌ Request error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => {
    console.log(`✅ Response received from ${response.config.url}`);
    return response;
  },
  (error) => {
    console.error('❌ Response error:', error.response?.data || error.message);
    
    // Handle specific error cases
    if (error.response?.status === 409) {
      // Conflict - duplicate entry
      error.message = 'This roll number has already been submitted.';
    } else if (error.response?.status === 404) {
      // Not found
      error.message = 'The requested resource was not found.';
    } else if (error.response?.status >= 500) {
      // Server error
      error.message = 'Server error. Please try again later.';
    }
    
    return Promise.reject(error);
  }
);

export default api;
