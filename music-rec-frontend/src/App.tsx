import { useEffect, useState, ReactNode } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useUserStore } from './stores/userStore'
import Navbar from './components/Navbar'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
// import RegisterPage from './pages/RegisterPage'
import RecommendationsPage from './pages/RecommendationsPage'
import FavoritesPage from './pages/FavoritesPage'
import ProfilePage from './pages/ProfilePage'
import NotFoundPage from './pages/NotFoundPage'

// RegisterPage modülünü dinamik olarak import ediyoruz
const RegisterPage = () => {
  return <div className="flex justify-center items-center h-screen">Kayıt Sayfası Yükleniyor...</div>;
};

// Korumalı rota bileşeni
const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated, isLoading } = useUserStore();
  
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-b from-gray-900 to-black">
        <div className="bg-white/5 backdrop-blur-lg p-8 rounded-2xl flex flex-col items-center">
          <div className="w-12 h-12 border-t-2 border-b-2 border-blue-500 rounded-full animate-spin mb-4"></div>
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
      <div className="flex justify-center items-center h-screen bg-gradient-to-b from-gray-900 to-black">
        <div className="bg-white/5 backdrop-blur-lg p-8 rounded-2xl flex flex-col items-center">
          <div className="w-16 h-16 relative">
            <div className="w-16 h-16 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full"></div>
            </div>
          </div>
          <h1 className="text-2xl font-bold mt-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Musify
          </h1>
          <p className="text-gray-400 mt-2">Müzik deneyiminiz yükleniyor...</p>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-900 to-black">
        <Navbar />
        <main className="flex-1 pl-64">
          <div className="max-w-7xl mx-auto px-6 py-8">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
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
        <footer className="bg-gray-900/50 backdrop-blur-lg border-t border-gray-800/40 text-white py-6 pl-64">
          <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
            <div>
              <p className="text-gray-400">&copy; {new Date().getFullYear()} Müzik Öneri Uygulaması</p>
            </div>
            <div className="flex gap-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Hakkımızda</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Gizlilik</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Şartlar</a>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  )
}

export default App
