import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuthContext } from "../../context/AuthContext";

// Logo bileşeni
const LogoIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12Z" fill="#18181B" stroke="white" strokeWidth="2"/>
    <path d="M15 12L10.5 15V9L15 12Z" fill="white"/>
  </svg>
);

const LoginFormPage = () => {
  const navigate = useNavigate();
  const { login, loading: authLoading } = useAuthContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  
  // Form gönderme işlemi
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    try {
      // AuthContext'in login fonksiyonunu kullanarak giriş yapıyoruz
      const success = await login(email, password);
      
      if (success) {
        navigate("/");
      } else {
        setErrorMessage("Giriş bilgilerinizi kontrol edin ve tekrar deneyin.");
      }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      setErrorMessage("Giriş bilgilerinizi kontrol edin ve tekrar deneyin.");
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* Header */}
      <header className="p-5 flex items-center justify-between">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center"
        >
          <Link to="/" className="flex items-center">
            <LogoIcon />
            <span className="ml-2 text-lg font-semibold">TuneIn</span>
          </Link>
        </motion.div>
      </header>

      {/* Ana içerik */}
      <div className="flex-1 flex flex-col items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md bg-[#121212] p-8 rounded-lg border border-[#333333]"
        >
          <h1 className="text-2xl font-bold mb-6 text-center">Giriş Yap</h1>
          
          {errorMessage && (
            <div className="bg-red-900/50 border border-red-500 text-red-200 px-4 py-2 rounded-md mb-6">
              {errorMessage}
            </div>
          )}
          
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium mb-1">
                E-posta
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input w-full bg-[#1F1F1F] border border-[#333333] rounded-md px-4 py-2 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#D97706] focus:border-transparent"
                placeholder="ornek@email.com"
                required
              />
            </div>

            <div className="mb-6">
              <div className="flex justify-between items-center mb-1">
                <label htmlFor="password" className="block text-sm font-medium">
                  Şifre
                </label>
                <Link to="/auth/forgot-password" className="text-xs text-[#D97706] hover:underline">
                  Şifremi Unuttum
                </Link>
              </div>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input w-full bg-[#1F1F1F] border border-[#333333] rounded-md px-4 py-2 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#D97706] focus:border-transparent"
                placeholder="••••••••"
                required
              />
            </div>

            <button
              type="submit"
              className="btn-primary w-full py-2 px-4 bg-[#D97706] text-black font-medium rounded-md hover:bg-[#F59E0B] transition focus:outline-none focus:ring-2 focus:ring-[#F59E0B] focus:ring-offset-2 focus:ring-offset-black disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {authLoading ? "Giriş Yapılıyor..." : "Giriş Yap"}
            </button>

            <div className="mt-4 text-center">
              <span className="text-sm text-gray-400">Hesabınız yok mu? </span>
              <Link to="/auth/register-form" className="text-sm text-[#D97706] hover:underline">
                Kayıt Ol
              </Link>
            </div>
          </form>
        </motion.div>
      </div>

      {/* Footer */}
      <footer className="py-4 text-center text-xs text-gray-500">
        <p>© 2025 TuneIn. Tüm hakları saklıdır.</p>
      </footer>
    </div>
  );
};

export default LoginFormPage; 