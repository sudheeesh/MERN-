import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://mern-ecommerce-gxhk.onrender.com/api/v1', // Vite proxy will forward this to backend
  withCredentials: true, // needed if using cookies/JWT
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    console.log('🔥 Interceptor - Sending token:', token);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
); 

export default axiosInstance;
