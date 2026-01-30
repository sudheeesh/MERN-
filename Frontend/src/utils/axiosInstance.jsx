import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://mern-ecommerce-gxhk.onrender.com/api/v1', // Vite proxy will forward this to backend
  withCredentials: true, // needed if using cookies/JWT
});

axiosInstance.interceptors.request.use(
  (config) => {
    let token = localStorage.getItem('authToken');

    // Fallback: try reading from userInfo
    if (!token) {
      const userInfo = localStorage.getItem('userInfo');
      if (userInfo) {
        try {
          const parsed = JSON.parse(userInfo);
          token = parsed.token;
        } catch (e) {
          console.error("Error parsing userInfo", e);
        }
      }
    }

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
