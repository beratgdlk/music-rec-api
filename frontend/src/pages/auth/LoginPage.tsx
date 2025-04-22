import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

// SVG İkonlar
const LogoIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12Z" fill="#18181B" stroke="white" strokeWidth="2"/>
    <path d="M15 12L10.5 15V9L15 12Z" fill="white"/>
  </svg>
);

// Özellik İkonları
const PlaylistIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M19.5 3.5L18 2H8L6.5 3.5M19.5 3.5V20.5L18 22H8L6.5 20.5V3.5M19.5 3.5H6.5M13 8.5V15.5L9 12L13 8.5Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const RadioIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M5.636 18.364C9.15097 21.8789 14.849 21.8789 18.364 18.364C21.8789 14.849 21.8789 9.15097 18.364 5.636C14.849 2.12109 9.15097 2.12109 5.636 5.636C2.12109 9.15097 2.12109 14.849 5.636 18.364Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12 12V16" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12 8V8.01" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const PodcastIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M18 8H17.5C15.567 8 14.6 8 13.954 8.327C13.3849 8.615 12.9168 9.08545 12.6302 9.65491C12.3 10.3 12.3 11.3 12.3 13V16" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M18 12H17.5C15.567 12 14.6 12 13.954 12.327C13.3849 12.615 12.9168 13.0854 12.6302 13.6549C12.3 14.3 12.3 15.3 12.3 17V20" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M18 16H17.5C15.567 16 14.6 16 13.954 16.327C13.3849 16.615 12.9168 17.0854 12.6302 17.6549C12.3 18.3 12.3 19.3 12.3 21V22" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M9.5 8.5C9.5 6.567 7.933 5 6 5C4.067 5 2.5 6.567 2.5 8.5C2.5 10.433 4.067 12 6 12" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M9.5 8.5C9.5 10.433 7.933 12 6 12C4.067 12 2.5 10.433 2.5 8.5" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M6 12V22" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const LoginPage = () => {
  // Ana konteyner için animasyon varyantları
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  };

  // Alt öğeler için animasyon varyantları
  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  // Görsel grid için varyantlar
  const gridVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.4
      }
    }
  };

  // Grid öğesi için varyantlar
  const gridItemVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5 }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black to-gray-900 text-white flex flex-col">
      {/* Header */}
      <header className="p-5 flex items-center">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center"
        >
          <LogoIcon />
          <span className="ml-2 text-lg font-semibold bg-clip-text text-transparent bg-gradient-to-r from-amber-500 to-amber-300">TuneIn</span>
        </motion.div>
      </header>

      {/* Ana içerik */}
      <motion.main
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="flex-1 flex flex-col items-center justify-center max-w-5xl mx-auto w-full px-4"
      >
        <div className="w-full relative">
          {/* Arkaplan dekoratif öğe */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 0.15, scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="absolute -top-40 -right-20 w-96 h-96 rounded-full bg-gradient-to-r from-amber-500 to-amber-300 blur-3xl"
          />
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 0.1, scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
            className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 blur-3xl"
          />
          
          {/* Ana başlık */}
          <motion.h1
            variants={itemVariants}
            className="text-4xl sm:text-5xl md:text-6xl font-bold text-center mb-4 bg-clip-text text-transparent bg-gradient-to-r from-amber-500 to-amber-300"
          >
            Discover new music with TuneIn
          </motion.h1>
          
          <motion.p
            variants={itemVariants}
            className="text-xl text-center text-gray-300 mb-8 max-w-2xl mx-auto"
          >
            Unlimited access to millions of songs, podcasts, and playlists.
          </motion.p>

          {/* Giriş butonları */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row justify-center gap-4 mb-8"
          >
            <Link to="/auth/login-form">
              <button className="py-3 px-8 bg-[#D97706] text-black rounded-full hover:bg-amber-500 transition-all shadow-lg hover:shadow-amber-500/20 font-semibold text-center w-full sm:w-auto">
                Giriş Yap
              </button>
            </Link>
            <Link to="/auth/register-form">
              <button className="py-3 px-8 bg-transparent border border-white/20 text-white rounded-full hover:bg-white/10 transition-all shadow-lg font-semibold text-center w-full sm:w-auto">
                Kayıt Ol
              </button>
            </Link>
          </motion.div>

          {/* Gizlilik metni */}
          <motion.p
            variants={itemVariants}
            className="text-xs text-gray-500 text-center mb-16"
          >
            Giriş yaparak, kullanım koşullarımızı ve gizlilik politikamızı kabul etmiş olursunuz
          </motion.p>

          {/* Özellikler başlığı */}
          <motion.h2
            variants={itemVariants}
            className="text-2xl font-semibold mb-8 text-center"
          >
            Kulaklarınız için müzik
          </motion.h2>

          {/* Özellik kartları */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
          >
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-2xl border border-gray-700 shadow-lg transform transition-all hover:-translate-y-2 hover:shadow-xl">
              <div className="flex flex-col items-start">
                <div className="w-12 h-12 flex items-center justify-center bg-amber-500/20 rounded-lg mb-4">
                  <PlaylistIcon />
                </div>
                <h3 className="text-xl font-semibold mb-2">Hazırlanmış çalma listeleri</h3>
                <p className="text-gray-400 text-sm">Her gün yeni çalma listeleri</p>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-2xl border border-gray-700 shadow-lg transform transition-all hover:-translate-y-2 hover:shadow-xl">
              <div className="flex flex-col items-start">
                <div className="w-12 h-12 flex items-center justify-center bg-amber-500/20 rounded-lg mb-4">
                  <RadioIcon />
                </div>
                <h3 className="text-xl font-semibold mb-2">Radyo istasyonları</h3>
                <p className="text-gray-400 text-sm">1M+ radyo istasyonu</p>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-2xl border border-gray-700 shadow-lg transform transition-all hover:-translate-y-2 hover:shadow-xl">
              <div className="flex flex-col items-start">
                <div className="w-12 h-12 flex items-center justify-center bg-amber-500/20 rounded-lg mb-4">
                  <PodcastIcon />
                </div>
                <h3 className="text-xl font-semibold mb-2">Podcastler</h3>
                <p className="text-gray-400 text-sm">Orijinal dizi ve programlar</p>
              </div>
            </div>
          </motion.div>

          {/* Görsel grid */}
          <motion.div
            variants={gridVariants}
            className="grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            {/* Görsel 1 */}
            <motion.div variants={gridItemVariants} className="aspect-square relative group overflow-hidden rounded-2xl shadow-lg">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-70 transition-opacity group-hover:opacity-80"></div>
              <img src="https://source.unsplash.com/random/300x300/?concert" alt="Music" className="w-full h-full object-cover" />
              <div className="absolute bottom-3 left-3 right-3">
                <p className="text-sm font-semibold">Live Concerts</p>
                <p className="text-xs text-gray-400">20+ new shows</p>
              </div>
            </motion.div>

            {/* Görsel 2 */}
            <motion.div variants={gridItemVariants} className="aspect-square relative group overflow-hidden rounded-2xl shadow-lg">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-70 transition-opacity group-hover:opacity-80"></div>
              <img src="https://source.unsplash.com/random/300x300/?dj" alt="Music" className="w-full h-full object-cover" />
              <div className="absolute bottom-3 left-3 right-3">
                <p className="text-sm font-semibold">DJ Sets</p>
                <p className="text-xs text-gray-400">Top charts</p>
              </div>
            </motion.div>

            {/* Görsel 3 */}
            <motion.div variants={gridItemVariants} className="aspect-square relative group overflow-hidden rounded-2xl shadow-lg">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-70 transition-opacity group-hover:opacity-80"></div>
              <img src="https://source.unsplash.com/random/300x300/?vinyl" alt="Music" className="w-full h-full object-cover" />
              <div className="absolute bottom-3 left-3 right-3">
                <p className="text-sm font-semibold">Classics</p>
                <p className="text-xs text-gray-400">Vintage collection</p>
              </div>
            </motion.div>

            {/* Görsel 4 */}
            <motion.div variants={gridItemVariants} className="aspect-square relative group overflow-hidden rounded-2xl shadow-lg">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-70 transition-opacity group-hover:opacity-80"></div>
              <img src="https://source.unsplash.com/random/300x300/?podcast" alt="Music" className="w-full h-full object-cover" />
              <div className="absolute bottom-3 left-3 right-3">
                <p className="text-sm font-semibold">New Releases</p>
                <p className="text-xs text-gray-400">Updated weekly</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.main>
      
      {/* Footer */}
      <footer className="py-6 px-4 text-center text-gray-500 text-sm">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center border-t border-gray-800 pt-6">
            <div className="flex items-center mb-4 md:mb-0">
              <LogoIcon />
              <span className="ml-2 font-medium">TuneIn</span>
            </div>
            <div className="flex space-x-4 mb-4 md:mb-0">
              <a href="#" className="text-gray-400 hover:text-amber-500 transition-colors">Hakkımızda</a>
              <a href="#" className="text-gray-400 hover:text-amber-500 transition-colors">Blog</a>
              <a href="#" className="text-gray-400 hover:text-amber-500 transition-colors">Destek</a>
              <a href="#" className="text-gray-400 hover:text-amber-500 transition-colors">İletişim</a>
            </div>
            <p>© 2025 TuneIn. Tüm hakları saklıdır.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LoginPage; 