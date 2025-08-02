import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://mern-ecommerce-gxhk.onrender.com/api/v1', // Vite proxy will forward this to backend
  withCredentials: true, // needed if using cookies/JWT
});

export default axiosInstance;
