import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User } from '../types';

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  loading: boolean;
}

export function useAuth() {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    user: null,
    loading: true,
  });
  
  const navigate = useNavigate();

  useEffect(() => {
    // localStorage'dan kullanıcı bilgilerini al
    const checkAuth = () => {
      const userStr = localStorage.getItem('user');
      
      if (userStr) {
        try {
          const user = JSON.parse(userStr);
          setAuthState({
            isAuthenticated: true,
            user,
            loading: false,
          });
        } catch (error) {
          console.error('Kullanıcı bilgileri çözümlenemedi', error);
          setAuthState({
            isAuthenticated: false,
            user: null,
            loading: false,
          });
        }
      } else {
        setAuthState({
          isAuthenticated: false,
          user: null,
          loading: false,
        });
      }
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Yükleniyor durumunu ayarla
    setAuthState(prev => ({ ...prev, loading: true }));

    try {
      // Burada gerçek bir API çağrısı yapılabilir
      // Örnek için basit bir simülasyon:
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Giriş başarılı olduğunda
      const user: User = { email };
      localStorage.setItem('user', JSON.stringify(user));
      
      setAuthState({
        isAuthenticated: true,
        user,
        loading: false,
      });
      
      return true;
    } catch (error) {
      console.error('Giriş başarısız', error);
      setAuthState(prev => ({ ...prev, loading: false }));
      return false;
    }
  };

  const register = async (email: string, password: string): Promise<boolean> => {
    // Yükleniyor durumunu ayarla
    setAuthState(prev => ({ ...prev, loading: true }));

    try {
      // Burada gerçek bir API çağrısı yapılabilir
      // Örnek için basit bir simülasyon:
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Kayıt başarılı olduğunda
      const user: User = { email };
      localStorage.setItem('user', JSON.stringify(user));
      
      setAuthState({
        isAuthenticated: true,
        user,
        loading: false,
      });
      
      return true;
    } catch (error) {
      console.error('Kayıt başarısız', error);
      setAuthState(prev => ({ ...prev, loading: false }));
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('user');
    setAuthState({
      isAuthenticated: false,
      user: null,
      loading: false,
    });
    navigate('/auth/login');
  };

  return {
    ...authState,
    login,
    register,
    logout,
  };
} 