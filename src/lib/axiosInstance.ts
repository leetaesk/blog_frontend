import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000',
  withCredentials: true, // 향후 인증을 위해 쿠키를 주고받을 필요가 있을 때를 위함
});

export default axiosInstance;
