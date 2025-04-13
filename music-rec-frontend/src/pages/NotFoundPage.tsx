import { Link } from 'react-router-dom';
import { Music, Home } from 'lucide-react';

const NotFoundPage = () => {
  return (
    <div className="pl-64 flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-gray-900 to-black text-white text-center px-4">
      <Music className="w-24 h-24 text-green-500 mb-6" />
      <h1 className="text-5xl font-bold mb-4">404</h1>
      <h2 className="text-2xl font-semibold mb-8">Sayfa Bulunamadı</h2>
      <p className="text-gray-400 max-w-md mb-8">
        Aradığınız sayfa mevcut değil veya kaldırılmış olabilir. 
        Lütfen ana sayfaya dönün ve tekrar deneyin.
      </p>
      <Link 
        to="/" 
        className="bg-green-500 text-black font-bold py-3 px-6 rounded-full flex items-center gap-2 hover:bg-green-400 transition-colors"
      >
        <Home size={20} />
        <span>Ana Sayfaya Dön</span>
      </Link>
    </div>
  );
};

export default NotFoundPage; 