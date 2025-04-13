import { useState, FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Music, ArrowRight } from 'lucide-react';
import { useUserStore } from '../stores/userStore';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  
  const { login, isLoading, error } = useUserStore();
  const navigate = useNavigate();
  
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      setErrorMessage('Lütfen email ve şifrenizi girin');
      return;
    }
    
    try {
      await login(email, password);
      if (!error) {
        navigate('/');
      }
    } catch (err) {
      setErrorMessage('Giriş yapılırken bir hata oluştu');
    }
  };
  
  return (
    <div className="flex items-center justify-center min-h-screen bg-black text-white">
      <div className="max-w-md w-full px-6 py-12">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <Music className="h-12 w-12 text-green-500" />
          </div>
          <h1 className="text-3xl font-bold mb-1">Musify</h1>
          <p className="text-gray-400">Tekrar hoş geldiniz</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <h2 className="text-2xl font-bold mb-6 text-center">Giriş Yap</h2>
          
          {(error || errorMessage) && (
            <div className="bg-red-500 bg-opacity-20 border border-red-500 text-red-500 px-4 py-3 rounded">
              {error || errorMessage}
            </div>
          )}
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-2">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="isim@example.com"
              required
            />
          </div>
          
          <div>
            <div className="flex items-center justify-between mb-2">
              <label htmlFor="password" className="block text-sm font-medium">
                Şifre
              </label>
              <Link to="/forgot-password" className="text-sm text-green-500 hover:underline">
                Şifremi Unuttum
              </Link>
            </div>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="••••••••"
              required
            />
          </div>
          
          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-2 bg-green-500 text-black font-bold py-3 px-4 rounded-md hover:bg-green-400 transition-colors"
          >
            {isLoading ? 'Giriş Yapılıyor...' : (
              <>
                <span>Giriş Yap</span>
                <ArrowRight size={18} />
              </>
            )}
          </button>
        </form>
        
        <p className="mt-6 text-center text-gray-400">
          Hesabınız yok mu?{' '}
          <Link to="/register" className="text-green-500 hover:underline">
            Şimdi kaydol
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage; 