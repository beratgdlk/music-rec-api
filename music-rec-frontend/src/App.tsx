import { useEffect, useState, ReactNode } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useUserStore } from './stores/userStore'
import Navbar from './components/Navbar'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import RecommendationsPage from './pages/RecommendationsPage'
import FavoritesPage from './pages/FavoritesPage'
import ProfilePage from './pages/ProfilePage'
import NotFoundPage from './pages/NotFoundPage'
import SearchPage from './pages/SearchPage'
import MusicPlayer from './components/MusicPlayer'

// Örnek aktif şarkı
const currentPlayingSong = {
  id: '1',
  title: 'Şu An Çalan Şarkı',
  artist: 'Sanatçı Adı',
  duration: 180
};

// Korumalı rota bileşeni
const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated, isLoading } = useUserStore();
  
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-[#121212]">
        <div className="p-8 rounded-xl flex flex-col items-center">
          <div className="w-12 h-12 border-t-2 border-b-2 border-[#1db954] rounded-full animate-spin mb-4"></div>
          <p className="text-white">Yükleniyor...</p>
        </div>
      </div>
    );
  }
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  return <>{children}</>;
};

function App() {
  const { fetchUser } = useUserStore();
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Sayfa yüklendiğinde kullanıcı bilgilerini getir
    const loadApp = async () => {
      await fetchUser();
      setTimeout(() => setIsLoading(false), 800); // Sayfa geçişi için küçük bir gecikme
    };
    
    loadApp();
  }, [fetchUser]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-[#121212]">
        <div className="p-8 rounded-xl flex flex-col items-center">
          <div className="w-16 h-16 relative">
            <div className="w-16 h-16 border-4 border-[#535353] border-t-[#1db954] rounded-full animate-spin"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-8 h-8 bg-[#1db954] rounded-full"></div>
            </div>
          </div>
          <h1 className="text-2xl font-bold mt-4 text-white">
            MüzikApp
          </h1>
          <p className="text-gray-400 mt-2">Müzik deneyiminiz yükleniyor...</p>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-[#121212] text-white">
        <Navbar />
        <main className="flex-1 pl-64 pb-20">
          <div className="px-6 py-4">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/search" element={<SearchPage />} />
              <Route 
                path="/recommendations" 
                element={
                  <ProtectedRoute>
                    <RecommendationsPage />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/favorites" 
                element={
                  <ProtectedRoute>
                    <FavoritesPage />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/profile" 
                element={
                  <ProtectedRoute>
                    <ProfilePage />
                  </ProtectedRoute>
                } 
              />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </div>
        </main>
        <MusicPlayer currentSong={currentPlayingSong} />
      </div>
    </Router>
  )
}

export default App
