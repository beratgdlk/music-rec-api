import { useState, FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Music, ArrowRight } from 'lucide-react';
import { useUserStore } from '../stores/userStore';

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  
  const { register, isLoading, error } = useUserStore();
  const navigate = useNavigate();
  
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!username || !email || !password) {
      setErrorMessage('Lütfen tüm alanları doldurun');
      return;
    }
    
    if (password !== confirmPassword) {
      setErrorMessage('Şifreler eşleşmiyor');
      return;
    }
    
    try {
      await register(username, email, password);
      if (!error) {
        navigate('/');
      }
    } catch (err) {
      setErrorMessage('Kayıt olurken bir hata oluştu');
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
          <p className="text-gray-400">Hesap oluşturun</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <h2 className="text-2xl font-bold mb-6 text-center">Hesap Oluştur</h2>
          
          {(error || errorMessage) && (
            <div className="bg-red-500 bg-opacity-20 border border-red-500 text-red-500 px-4 py-3 rounded">
              {error || errorMessage}
            </div>
          )}
          
          <div>
            <label htmlFor="username" className="block text-sm font-medium mb-2">
              Kullanıcı Adı
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="kullaniciadi"
              required
            />
          </div>
          
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
            <label htmlFor="password" className="block text-sm font-medium mb-2">
              Şifre
            </label>
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
          
          <div>
            <label htmlFor="confirm-password" className="block text-sm font-medium mb-2">
              Şifreyi Onayla
            </label>
            <input
              id="confirm-password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
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
            {isLoading ? 'Kayıt Yapılıyor...' : (
              <>
                <span>Hesap Oluştur</span>
                <ArrowRight size={18} />
              </>
            )}
          </button>
        </form>
        
        <p className="mt-6 text-center text-gray-400">
          Zaten hesabınız var mı?{' '}
          <Link to="/login" className="text-green-500 hover:underline">
            Giriş yap
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage; 