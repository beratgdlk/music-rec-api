import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { AuthProvider } from './context/AuthContext';
import { PlayerProvider } from './context/PlayerContext';

// Auth sayfaları
import LoginPage from './pages/auth/LoginPage';
import LoginFormPage from './pages/auth/LoginFormPage';
import RegisterFormPage from './pages/auth/RegisterFormPage';
// import ForgotPassword from './pages/auth/ForgotPassword';

// Ana sayfalar
import HomePage from './pages/home/HomePage';
// import ExplorePage from './pages/explore/ExplorePage';
// import ProfilePage from './pages/profile/ProfilePage';

function App() {
  // Kullanıcının oturum durumunu kontrol eden bir durum
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  // Uygulama yüklendiğinde localStorage'dan oturum durumunu kontrol et
  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <Router>
      <AuthProvider>
        <PlayerProvider>
          <div className="min-h-screen bg-black text-white">
            <Routes>
              {/* Giriş/Kayıt sayfaları */}
              <Route path="/auth/login" element={<LoginPage />} />
              <Route path="/auth/login-form" element={<LoginFormPage />} />
              <Route path="/auth/register-form" element={<RegisterFormPage />} />
              {/* <Route path="/auth/forgot-password" element={<ForgotPassword />} /> */}

              {/* Ana Sayfalar */}
              <Route path="/" element={isAuthenticated ? <HomePage /> : <Navigate to="/auth/login" />} />
              {/* <Route path="/explore" element={isAuthenticated ? <ExplorePage /> : <Navigate to="/auth/login" />} />
              <Route path="/profile" element={isAuthenticated ? <ProfilePage /> : <Navigate to="/auth/login" />} /> */}

              {/* Varsayılan yönlendirme */}
              <Route path="*" element={<Navigate to={isAuthenticated ? "/" : "/auth/login"} />} />
            </Routes>
          </div>
        </PlayerProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
