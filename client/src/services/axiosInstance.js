import axios from 'axios';
import { getToken } from '../utils/getToken';

const API_URL = 'http://localhost:8000/api/v1/task'; 
const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});
axiosInstance.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      console.error('Token invalid or expired, redirecting to login...');
      window.location.href = '/login';  
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
