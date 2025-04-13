import { useEffect } from 'react'
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

// Korumalı rota bileşeni
const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { isAuthenticated, isLoading } = useUserStore();
  
  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">Yükleniyor...</div>;
  }
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  return children;
};

function App() {
  const { fetchUser } = useUserStore();
  
  useEffect(() => {
    // Sayfa yüklendiğinde kullanıcı bilgilerini getir
    fetchUser();
  }, [fetchUser]);

  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 container mx-auto px-4 py-8">
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
        </main>
        <footer className="bg-gray-800 text-white py-4">
          <div className="container mx-auto px-4 text-center">
            &copy; {new Date().getFullYear()} Müzik Öneri Uygulaması
          </div>
        </footer>
      </div>
    </Router>
  )
}

export default App
