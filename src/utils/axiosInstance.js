import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: '', // 设置基础 URL
    timeout: 300000, // 设置请求超时
});

// 添加请求拦截器
axiosInstance.interceptors.request.use(
    (config) => {
      const user = JSON.parse(localStorage.getItem("user")); // 从 localStorage 获取用户数据
      const token = user ? user.token : null; // 获取 token
      
      if (token) {
        config.headers["Authorization"] = token; // 添加 Authorization 头部
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
);

export default axiosInstance;
