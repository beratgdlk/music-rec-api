import axios from 'axios';

const API_URL = 'http://localhost:3000'; // Backend API adresi

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // CORS için cookie göndermeyi sağlar
});

// İstek interceptor'ı - isteği göndermeden önce token ekler
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Yanıt interceptor'ı - hata durumlarını yönetir
api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    // 401 durumunda oturum sonlandırma
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
); 