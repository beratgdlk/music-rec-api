import React, { useState, ReactNode } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuthContext } from '../../context/AuthContext';
import { usePlayerContext } from '../../context/PlayerContext';
import { formatDuration } from '../../utils/formatters';
import { Track } from '../../types';

// İconlar
const LogoIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12Z" fill="#18181B" stroke="white" strokeWidth="2"/>
    <path d="M15 12L10.5 15V9L15 12Z" fill="white"/>
  </svg>
);

interface AppLayoutProps {
  children: ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const { logout, user } = useAuthContext();
  const navigate = useNavigate();
  const location = useLocation();
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  
  const player = usePlayerContext();
  
  // Menü açma/kapama
  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };
  
  // Aktif sayfa kontrolü
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  // Çıkış yap
  const handleLogout = () => {
    logout();
    navigate('/auth/login');
  };

  return (
    <div className="flex flex-col h-screen bg-black text-white">
      {/* Sidebar */}
      <div className="flex h-full">
        <motion.aside 
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="w-64 bg-[#121212] h-full fixed left-0 top-0 bottom-20 overflow-y-auto z-10"
        >
          {/* Logo */}
          <div className="p-6">
            <Link to="/" className="flex items-center">
              <LogoIcon />
              <span className="ml-2 text-xl font-bold">TuneIn</span>
            </Link>
          </div>
          
          {/* Ana Menü */}
          <nav className="px-4 mt-4">
            <ul className="space-y-2">
              <li>
                <Link 
                  to="/"
                  className={`flex items-center px-4 py-3 rounded-md transition-colors ${
                    isActive('/') 
                      ? 'bg-[#D97706] text-white' 
                      : 'hover:bg-[#1F1F1F] text-gray-300'
                  }`}
                >
                  <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
                  </svg>
                  <span>Anasayfa</span>
                </Link>
              </li>
              <li>
                <Link 
                  to="/discover"
                  className={`flex items-center px-4 py-3 rounded-md transition-colors ${
                    isActive('/discover') 
                      ? 'bg-[#D97706] text-white' 
                      : 'hover:bg-[#1F1F1F] text-gray-300'
                  }`}
                >
                  <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                  </svg>
                  <span>Keşfet</span>
                </Link>
              </li>
              <li>
                <Link 
                  to="/radio"
                  className={`flex items-center px-4 py-3 rounded-md transition-colors ${
                    isActive('/radio') 
                      ? 'bg-[#D97706] text-white' 
                      : 'hover:bg-[#1F1F1F] text-gray-300'
                  }`}
                >
                  <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"></path>
                  </svg>
                  <span>Radyo</span>
                </Link>
              </li>
              <li>
                <Link 
                  to="/podcasts"
                  className={`flex items-center px-4 py-3 rounded-md transition-colors ${
                    isActive('/podcasts') 
                      ? 'bg-[#D97706] text-white' 
                      : 'hover:bg-[#1F1F1F] text-gray-300'
                  }`}
                >
                  <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15.536a5 5 0 007.072 0m-9.9-2.828a9 9 0 0112.728 0"></path>
                  </svg>
                  <span>Podcastler</span>
                </Link>
              </li>
            </ul>
          </nav>
          
          {/* Kütüphane Başlığı */}
          <div className="px-8 mt-8 mb-4">
            <h2 className="text-gray-400 text-sm font-medium">KÜTÜPHANENİZ</h2>
          </div>
          
          {/* Kütüphane */}
          <nav className="px-4">
            <ul className="space-y-2">
              <li>
                <Link 
                  to="/library/playlists"
                  className={`flex items-center px-4 py-3 rounded-md transition-colors ${
                    isActive('/library/playlists') 
                      ? 'bg-[#1F1F1F] text-white' 
                      : 'hover:bg-[#1F1F1F] text-gray-300'
                  }`}
                >
                  <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"></path>
                  </svg>
                  <span>Çalma Listeleri</span>
                </Link>
              </li>
              <li>
                <Link 
                  to="/library/liked"
                  className={`flex items-center px-4 py-3 rounded-md transition-colors ${
                    isActive('/library/liked') 
                      ? 'bg-[#1F1F1F] text-white' 
                      : 'hover:bg-[#1F1F1F] text-gray-300'
                  }`}
                >
                  <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"></path>
                  </svg>
                  <span>Beğenilen Şarkılar</span>
                </Link>
              </li>
              <li>
                <Link 
                  to="/library/albums"
                  className={`flex items-center px-4 py-3 rounded-md transition-colors ${
                    isActive('/library/albums') 
                      ? 'bg-[#1F1F1F] text-white' 
                      : 'hover:bg-[#1F1F1F] text-gray-300'
                  }`}
                >
                  <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
                  </svg>
                  <span>Albümler</span>
                </Link>
              </li>
            </ul>
          </nav>
        </motion.aside>

        {/* Ana İçerik */}
        <main className="ml-64 flex-1 overflow-y-auto pb-28">
          {/* Üst Çubuk */}
          <header className="bg-[#121212] sticky top-0 z-10 p-4 flex items-center justify-between border-b border-[#333333]">
            <div className="flex gap-4">
              {/* Gezinme Düğmeleri */}
              <div className="flex space-x-2">
                <button 
                  onClick={() => navigate(-1)}
                  className="bg-black p-2 rounded-full hover:bg-[#1F1F1F] transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
                  </svg>
                </button>
                <button
                  onClick={() => navigate(1)}
                  className="bg-black p-2 rounded-full hover:bg-[#1F1F1F] transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                </button>
              </div>
            </div>
            
            {/* Kullanıcı Menüsü */}
            <div className="relative">
              <button 
                onClick={toggleUserMenu}
                className="flex items-center space-x-2 bg-black rounded-full py-1 px-2 hover:bg-[#1F1F1F] transition-colors"
              >
                <div className="w-8 h-8 rounded-full bg-[#D97706] flex items-center justify-center text-black font-bold">
                  {user?.email?.substring(0, 1)?.toUpperCase() || 'U'}
                </div>
                <span className="text-sm">{user?.email || 'Kullanıcı'}</span>
                <svg 
                  className={`w-4 h-4 transition-transform ${isUserMenuOpen ? 'rotate-180' : ''}`} 
                  fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>
              
              {/* Kullanıcı Menüsü Dropdown */}
              <AnimatePresence>
                {isUserMenuOpen && (
                  <motion.div 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-2 w-48 bg-[#1F1F1F] rounded-md shadow-lg py-1 z-20"
                  >
                    <Link to="/profile" className="block px-4 py-2 text-sm hover:bg-[#333333] transition-colors">
                      Profil
                    </Link>
                    <Link to="/settings" className="block px-4 py-2 text-sm hover:bg-[#333333] transition-colors">
                      Ayarlar
                    </Link>
                    <hr className="border-[#333333] my-1" />
                    <button 
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm hover:bg-[#333333] transition-colors text-red-400"
                    >
                      Çıkış Yap
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </header>
          
          {/* Sayfa İçeriği */}
          <div className="p-8">
            {children}
          </div>
        </main>
      </div>
      
      {/* Çalar */}
      {player.currentTrack && (
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="fixed bottom-0 left-0 right-0 bg-[#1A1A1A] border-t border-[#333333] h-20 flex items-center px-4 z-50"
        >
          {/* Şarkı Bilgisi */}
          <div className="flex items-center w-1/4">
            <img 
              src={player.currentTrack.cover} 
              alt={player.currentTrack.title}
              className="w-14 h-14 object-cover rounded-md mr-4" 
            />
            <div>
              <h4 className="text-white text-sm font-medium">{player.currentTrack.title}</h4>
              <p className="text-gray-400 text-xs">{player.currentTrack.artist}</p>
            </div>
            <button className="ml-4 text-gray-400 hover:text-white transition-colors">
              <svg className="w-5 h-5" fill={player.currentTrack.liked ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
              </svg>
            </button>
          </div>
          
          {/* Oynatıcı Kontrolleri */}
          <div className="flex-1 flex flex-col items-center">
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => player.toggleShuffle()}
                className={`text-sm ${player.shuffle ? 'text-[#D97706]' : 'text-gray-400'} hover:text-white transition-colors`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"></path>
                </svg>
              </button>
              <button 
                onClick={() => player.playPrevTrack()}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
                </svg>
              </button>
              <button 
                onClick={() => player.togglePlay()}
                className="bg-white text-black rounded-full p-2 hover:bg-gray-200 transition-colors"
              >
                {player.isPlaying ? (
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"></path>
                  </svg>
                ) : (
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8 5v14l11-7z"></path>
                  </svg>
                )}
              </button>
              <button 
                onClick={() => player.playNextTrack()}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </button>
              <button 
                onClick={() => player.toggleRepeat()}
                className={`text-sm ${player.repeat !== 'off' ? 'text-[#D97706]' : 'text-gray-400'} hover:text-white transition-colors`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                </svg>
              </button>
            </div>
            
            {/* İlerleme Çubuğu */}
            <div className="w-full mt-2 flex items-center text-xs">
              <span className="text-gray-400 mr-2">{formatDuration(player.currentTime)}</span>
              <div className="flex-1 h-1 bg-[#333333] rounded-full overflow-hidden">
                <div 
                  className="h-full bg-white hover:bg-[#D97706] transition-colors"
                  style={{ width: `${(player.currentTime / player.duration) * 100}%` }}
                ></div>
              </div>
              <span className="text-gray-400 ml-2">{formatDuration(player.duration)}</span>
            </div>
          </div>
          
          {/* Ses Kontrolü */}
          <div className="w-1/4 flex justify-end items-center space-x-3">
            <button className="text-gray-400 hover:text-white transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15.536a5 5 0 007.072 0m-9.9-2.828a9 9 0 0112.728 0"></path>
              </svg>
            </button>
            <div className="w-24 h-1 bg-[#333333] rounded-full overflow-hidden">
              <div 
                className="h-full bg-white hover:bg-[#D97706] transition-colors"
                style={{ width: `${player.volume * 100}%` }}
              ></div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default AppLayout; 