import { Link, useLocation } from 'react-router-dom';
import { useUserStore } from '../stores/userStore';
import { Music, Home, Search, Library, LogIn } from 'lucide-react';

const Navbar = () => {
  const location = useLocation();
  const { isAuthenticated, logout } = useUserStore();

  const isActive = (path: string) => {
    return location.pathname === path ? 'bg-gray-800' : '';
  };

  return (
    <nav className="bg-black text-white w-64 min-h-screen fixed left-0 top-0 z-10">
      <div className="p-6">
        <Link to="/" className="flex items-center gap-2 mb-8">
          <Music className="h-8 w-8 text-green-500" />
          <span className="text-xl font-bold">Musify</span>
        </Link>

        <ul className="space-y-4">
          <li>
            <Link
              to="/"
              className={`flex items-center gap-3 p-2 rounded-md hover:bg-gray-800 transition-colors ${isActive('/')}`}
            >
              <Home className="h-5 w-5" />
              <span>Ana Sayfa</span>
            </Link>
          </li>
          <li>
            <Link
              to="/search"
              className={`flex items-center gap-3 p-2 rounded-md hover:bg-gray-800 transition-colors ${isActive('/search')}`}
            >
              <Search className="h-5 w-5" />
              <span>Arama</span>
            </Link>
          </li>
          <li>
            <Link
              to="/favorites"
              className={`flex items-center gap-3 p-2 rounded-md hover:bg-gray-800 transition-colors ${isActive('/favorites')}`}
            >
              <Library className="h-5 w-5" />
              <span>Kütüphaneniz</span>
            </Link>
          </li>
        </ul>
      </div>

      <div className="absolute bottom-0 left-0 w-full p-6 border-t border-gray-800">
        {isAuthenticated ? (
          <button
            onClick={logout}
            className="w-full py-2 px-4 bg-transparent hover:bg-gray-800 transition-colors rounded-md text-center"
          >
            Çıkış Yap
          </button>
        ) : (
          <Link
            to="/login"
            className="flex items-center justify-center gap-2 w-full py-2 px-4 bg-white text-black hover:bg-gray-200 transition-colors rounded-md"
          >
            <LogIn className="h-4 w-4" />
            <span>Giriş Yap</span>
          </Link>
        )}
        {!isAuthenticated && (
          <Link
            to="/register"
            className="block mt-2 text-center text-sm text-gray-400 hover:text-white transition-colors"
          >
            Kayıt Ol
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar; 