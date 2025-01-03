import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: '/api',  // This will use the proxy configured in vite.config.ts
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance; 