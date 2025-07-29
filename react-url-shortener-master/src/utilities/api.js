import axios from 'axios';
import { toast } from 'react-toastify';

// Centralized axios instance with middleware-like interceptors and logging
const BASEURL = 'http://www.td.coffee';

const api = axios.create({
  baseURL: BASEURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor: attach JWT token and log request details
api.interceptors.request.use(
  (config) => {
    const token = global?.auth?.getToken?.();
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    console.log(`[Request] ${config.method?.toUpperCase()} ${config.url}`, config);
    return config;
  },
  (error) => {
    console.error('[Request Error]', error);
    return Promise.reject(error);
  }
);

// Response interceptor: log responses and handle errors globally
api.interceptors.response.use(
  (response) => {
    console.log('[Response]', response);
    return response;
  },
  (error) => {
    console.error('[Response Error]', error);
    // Show user-friendly toast message
    if (error?.response?.data?.message) {
      toast.error(error.response.data.message);
    } else {
      toast.error('Network error, please try again.');
    }
    return Promise.reject(error);
  }
);

export default api;
