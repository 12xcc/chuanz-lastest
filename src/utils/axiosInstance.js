import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: '', // 设置基础 URL
    // baseURL: 'http://43.138.213.55:8080/', // 设置基础 URL
    timeout: 300000, // 设置请求超时
});

// 添加请求拦截器
axiosInstance.interceptors.request.use(
    (config) => {
      // 在请求头中添加 Authorization
      const token = "eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX3R5cGUiOiJhZG1pbiIsInVzZXJfaWQiOiIxMzgiLCJleHAiOjE4MDAyNzYxODd9.m3mnq_xPvQ8GIgleyzSC-XQQCW-ZwfSJSrEqifwSdTQ"; // 永久token
  
      if (token) {
        // 添加 Authorization 头部
        config.headers["Authorization"] = token; 
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  
  export default axiosInstance;