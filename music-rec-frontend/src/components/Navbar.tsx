import { Link, useLocation } from 'react-router-dom';
import { useUserStore } from '../stores/userStore';
import { Music, Home, Search, LogIn, Heart, User, TrendingUp } from 'lucide-react';

const Navbar = () => {
  const location = useLocation();
  const { isAuthenticated, logout, user } = useUserStore();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className="bg-black bg-opacity-80 backdrop-blur-lg text-white w-64 min-h-screen fixed left-0 top-0 z-10 border-r border-gray-800/40">
      <div className="p-6">
        <Link to="/" className="flex items-center gap-2 mb-10">
          <div className="bg-gradient-to-r from-purple-500 to-blue-500 p-2 rounded-full">
            <Music className="h-6 w-6 text-white" />
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            Musify
          </span>
        </Link>

        <div className="mb-8">
          <h2 className="text-xs uppercase tracking-widest text-gray-400 mb-4 px-2">Menu</h2>
          <ul className="space-y-2">
            <li>
              <Link
                to="/"
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${
                  isActive('/') 
                    ? 'bg-gradient-to-r from-blue-600/30 to-purple-600/30 font-medium text-white'
                    : 'hover:bg-white/10 text-gray-300'
                }`}
              >
                <Home className={`h-5 w-5 ${isActive('/') ? 'text-blue-400' : ''}`} />
                <span>Ana Sayfa</span>
              </Link>
            </li>
            <li>
              <Link
                to="/search"
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${
                  isActive('/search') 
                    ? 'bg-gradient-to-r from-blue-600/30 to-purple-600/30 font-medium text-white'
                    : 'hover:bg-white/10 text-gray-300'
                }`}
              >
                <Search className={`h-5 w-5 ${isActive('/search') ? 'text-blue-400' : ''}`} />
                <span>Arama</span>
              </Link>
            </li>
            <li>
              <Link
                to="/recommendations"
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${
                  isActive('/recommendations') 
                    ? 'bg-gradient-to-r from-blue-600/30 to-purple-600/30 font-medium text-white'
                    : 'hover:bg-white/10 text-gray-300'
                }`}
              >
                <TrendingUp className={`h-5 w-5 ${isActive('/recommendations') ? 'text-blue-400' : ''}`} />
                <span>Öneriler</span>
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-xs uppercase tracking-widest text-gray-400 mb-4 px-2">Kütüphane</h2>
          <ul className="space-y-2">
            <li>
              <Link
                to="/favorites"
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${
                  isActive('/favorites') 
                    ? 'bg-gradient-to-r from-blue-600/30 to-purple-600/30 font-medium text-white'
                    : 'hover:bg-white/10 text-gray-300'
                }`}
              >
                <Heart className={`h-5 w-5 ${isActive('/favorites') ? 'text-blue-400' : ''}`} />
                <span>Beğendiklerim</span>
              </Link>
            </li>
            {isAuthenticated && (
              <li>
                <Link
                  to="/profile"
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${
                    isActive('/profile') 
                      ? 'bg-gradient-to-r from-blue-600/30 to-purple-600/30 font-medium text-white'
                      : 'hover:bg-white/10 text-gray-300'
                  }`}
                >
                  <User className={`h-5 w-5 ${isActive('/profile') ? 'text-blue-400' : ''}`} />
                  <span>Profilim</span>
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-full p-6 border-t border-gray-800/40">
        {isAuthenticated ? (
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="bg-gradient-to-r from-blue-500 to-purple-500 w-8 h-8 rounded-full flex items-center justify-center text-white font-bold">
                {user?.username?.charAt(0).toUpperCase() || 'U'}
              </div>
              <div className="text-sm overflow-hidden">
                <p className="truncate font-medium">{user?.username || 'Kullanıcı'}</p>
                <p className="text-gray-400 truncate text-xs">{user?.email}</p>
              </div>
            </div>
            <button
              onClick={logout}
              className="w-full py-2 px-4 text-sm bg-white/10 hover:bg-white/20 transition-colors rounded-lg text-center font-medium"
            >
              Çıkış Yap
            </button>
          </div>
        ) : (
          <div>
            <Link
              to="/login"
              className="flex items-center justify-center gap-2 w-full py-2.5 px-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600 transition-colors rounded-lg font-medium"
            >
              <LogIn className="h-4 w-4" />
              <span>Giriş Yap</span>
            </Link>
            {!isAuthenticated && (
              <Link
                to="/register"
                className="block mt-3 text-center text-sm text-gray-400 hover:text-white transition-colors"
              >
                Hesabınız yok mu? <span className="text-blue-400">Kayıt olun</span>
              </Link>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar; 