import { Link, useLocation } from 'react-router-dom';
import { useUserStore } from '../stores/userStore';
import { Home, Search, TrendingUp, PlusSquare, Heart, User } from 'lucide-react';

const Navbar = () => {
  const location = useLocation();
  const { isAuthenticated, user } = useUserStore();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className="bg-[#000000] text-white w-64 min-h-screen fixed left-0 top-0 z-10 flex flex-col">
      {/* Logo */}
      <div className="p-6">
        <Link to="/" className="flex items-center gap-2">
          <div className="bg-[#1db954] p-2 rounded-full w-8 h-8 flex items-center justify-center">
            <span className="font-bold text-sm">M</span>
          </div>
          <span className="text-lg font-bold">
            MüzikApp
          </span>
        </Link>
      </div>

      {/* Ana menü */}
      <div className="px-2">
        <h2 className="uppercase text-xs font-bold px-4 mb-2 text-gray-500">MENU</h2>
        <ul>
          <li>
            <Link
              to="/"
              className={`flex items-center gap-3 px-4 py-3 rounded-md transition-colors ${
                isActive('/') ? 'bg-[#282828] text-white' : 'text-gray-300 hover:text-white'
              }`}
            >
              <Home size={20} />
              <span>Ana Sayfa</span>
            </Link>
          </li>
          <li>
            <Link
              to="/search"
              className={`flex items-center gap-3 px-4 py-3 rounded-md transition-colors ${
                isActive('/search') ? 'bg-[#282828] text-white' : 'text-gray-300 hover:text-white'
              }`}
            >
              <Search size={20} />
              <span>Ara</span>
            </Link>
          </li>
          <li>
            <Link
              to="/recommendations"
              className={`flex items-center gap-3 px-4 py-3 rounded-md transition-colors ${
                isActive('/recommendations') ? 'bg-[#282828] text-white' : 'text-gray-300 hover:text-white'
              }`}
            >
              <TrendingUp size={20} />
              <span>Öneriler</span>
            </Link>
          </li>
        </ul>
      </div>

      {/* Çalma listeleri */}
      <div className="px-2 mt-6">
        <h2 className="uppercase text-xs font-bold px-4 mb-2 text-gray-500">ÇALMA LİSTELERİ</h2>
        <div className="bg-[#121212] rounded-md p-4">
          <Link to="/playlists/create" className="flex items-center gap-2 text-gray-300 hover:text-white mb-4">
            <PlusSquare size={20} />
            <span>Yeni Çalma Listesi</span>
          </Link>
          
          <div className="max-h-[180px] overflow-y-auto space-y-1 pr-1 scrollbar-thin">
            <Link to="/favorites" className={`flex items-center gap-2 px-2 py-2 rounded-md transition-colors ${
              isActive('/favorites') ? 'bg-[#282828] text-white' : 'text-gray-300 hover:text-white'
            }`}>
              <Heart size={16} />
              <span className="truncate">Favori Şarkılarım</span>
            </Link>
            <Link to="/playlists/1" className="flex items-center gap-2 px-2 py-2 rounded-md text-gray-300 hover:text-white">
              <span className="truncate">Yeni Çalma Listesi</span>
            </Link>
            <Link to="/playlists/2" className="flex items-center gap-2 px-2 py-2 rounded-md text-gray-300 hover:text-white">
              <span className="truncate">2023 En İyileri</span>
            </Link>
            <Link to="/playlists/3" className="flex items-center gap-2 px-2 py-2 rounded-md text-gray-300 hover:text-white">
              <span className="truncate">Çalışma Müzikleri</span>
            </Link>
            <Link to="/playlists/4" className="flex items-center gap-2 px-2 py-2 rounded-md text-gray-300 hover:text-white">
              <span className="truncate">Parti Zamanı</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Kullanıcı bilgisi / login */}
      <div className="mt-auto p-4">
        {isAuthenticated ? (
          <Link to="/profile" className={`flex items-center gap-2 p-2 rounded-md transition-colors ${
            isActive('/profile') ? 'bg-[#282828] text-white' : 'text-gray-300 hover:text-white'
          }`}>
            <div className="bg-[#535353] rounded-full w-8 h-8 flex items-center justify-center">
              <User size={16} className="text-white" />
            </div>
            <span className="font-medium">{user?.username || 'Kullanıcı'}</span>
          </Link>
        ) : (
          <Link to="/login" className="flex items-center justify-center gap-2 w-full py-2.5 px-4 bg-white hover:scale-105 text-black rounded-full font-medium transition-transform">
            <span>Giriş Yap</span>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar; 