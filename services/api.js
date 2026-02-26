import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || "https://task-managment-server-production.up.railway.app/api";

console.log('Using API Base URL:', API_BASE_URL);

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

// Response interceptor to always return response.data
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    // Handle errors
    if (error.response?.status === 401) {
      // Unauthorized - redirect handled by AuthContext
    }
    return Promise.reject(error);
  }
);

export default api;
