import { create } from 'zustand';
import { api } from '../services/api';

interface User {
  id: string;
  username: string;
  email: string;
}

interface UserState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (username: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  fetchUser: () => Promise<void>;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,

  // Kullanıcı girişi
  login: async (email: string, password: string) => {
    set({ isLoading: true, error: null });
    try {
      const response = await api.post('/auth/login', { email, password });
      const { token, user } = response.data;
      
      localStorage.setItem('token', token);
      
      set({
        user,
        isAuthenticated: true,
        isLoading: false
      });
    } catch (error: any) {
      set({
        error: error.response?.data?.message || 'Giriş başarısız',
        isLoading: false
      });
    }
  },

  // Kullanıcı kaydı
  register: async (username: string, email: string, password: string) => {
    set({ isLoading: true, error: null });
    try {
      const response = await api.post('/auth/register', { username, email, password });
      const { token, user } = response.data;
      
      localStorage.setItem('token', token);
      
      set({
        user,
        isAuthenticated: true,
        isLoading: false
      });
    } catch (error: any) {
      set({
        error: error.response?.data?.message || 'Kayıt başarısız',
        isLoading: false
      });
    }
  },

  // Çıkış yapma
  logout: () => {
    localStorage.removeItem('token');
    set({
      user: null,
      isAuthenticated: false
    });
  },

  // Kullanıcı bilgilerini getirme
  fetchUser: async () => {
    const token = localStorage.getItem('token');
    if (!token) return;
    
    set({ isLoading: true });
    try {
      const response = await api.get('/auth/me');
      set({
        user: response.data,
        isAuthenticated: true,
        isLoading: false
      });
    } catch (error) {
      localStorage.removeItem('token');
      set({
        user: null,
        isAuthenticated: false,
        isLoading: false
      });
    }
  }
})); 