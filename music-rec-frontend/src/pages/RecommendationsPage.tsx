import { useState, useEffect } from 'react';
import { useMusicStore } from '../stores/musicStore';
import SongCard from '../components/SongCard';
import MusicPlayer from '../components/MusicPlayer';
import { RefreshCw } from 'lucide-react';

// Örnek şarkı verisi
const sampleRecommendations = [
  {
    id: '1',
    title: 'Blinding Lights',
    artist: 'The Weeknd',
    album: 'After Hours',
    imageUrl: 'https://via.placeholder.com/300/111/fff?text=Blinding+Lights',
    duration: 200
  },
  {
    id: '2',
    title: 'As It Was',
    artist: 'Harry Styles',
    album: 'Harry\'s House',
    imageUrl: 'https://via.placeholder.com/300/222/fff?text=As+It+Was',
    duration: 180
  },
  {
    id: '3',
    title: 'Bad Habit',
    artist: 'Steve Lacy',
    album: 'Gemini Rights',
    imageUrl: 'https://via.placeholder.com/300/333/fff?text=Bad+Habit',
    duration: 220
  },
  {
    id: '4',
    title: 'Shivers',
    artist: 'Ed Sheeran',
    album: '=',
    imageUrl: 'https://via.placeholder.com/300/444/fff?text=Shivers',
    duration: 210
  },
  {
    id: '5',
    title: 'Glimpse of Us',
    artist: 'Joji',
    album: 'Smithereens',
    imageUrl: 'https://via.placeholder.com/300/555/fff?text=Glimpse+of+Us',
    duration: 215
  },
  {
    id: '6',
    title: 'Heat Waves',
    artist: 'Glass Animals',
    album: 'Dreamland',
    imageUrl: 'https://via.placeholder.com/300/666/fff?text=Heat+Waves',
    duration: 235
  },
  {
    id: '7',
    title: 'Unholy',
    artist: 'Sam Smith & Kim Petras',
    album: 'Gloria',
    imageUrl: 'https://via.placeholder.com/300/777/fff?text=Unholy',
    duration: 190
  },
  {
    id: '8',
    title: 'Calm Down',
    artist: 'Rema & Selena Gomez',
    album: 'Rave & Roses',
    imageUrl: 'https://via.placeholder.com/300/888/fff?text=Calm+Down',
    duration: 225
  }
];

const RecommendationsPage = () => {
  const [currentSong, setCurrentSong] = useState<typeof sampleRecommendations[0] | null>(null);
  const { fetchRecommendations, isLoading, recommendations } = useMusicStore();
  
  useEffect(() => {
    fetchRecommendations();
  }, [fetchRecommendations]);
  
  const handlePlaySong = (song: typeof sampleRecommendations[0]) => {
    setCurrentSong(song);
  };
  
  // Örnek veriler kullanılıyor (gerçek projede API'dan gelen veriler kullanılacak)
  const displayRecommendations = recommendations.length > 0 ? recommendations : sampleRecommendations;

  return (
    <div className="pl-64 pb-24 bg-gradient-to-b from-indigo-900 to-black min-h-screen text-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Sizin için Öneriler</h1>
            <p className="text-gray-400">
              Dinleme alışkanlıklarınız ve beğenileriniz doğrultusunda özel olarak seçildi
            </p>
          </div>
          <button 
            className="bg-green-500 text-black flex items-center gap-2 font-semibold py-2 px-4 rounded-full hover:bg-green-400 transition-colors"
            onClick={() => fetchRecommendations()}
            disabled={isLoading}
          >
            <RefreshCw size={18} className={isLoading ? 'animate-spin' : ''} />
            <span>Yenile</span>
          </button>
        </div>
        
        {isLoading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-green-500 mb-4"></div>
            <p>Öneriler yükleniyor...</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {displayRecommendations.map(song => (
              <SongCard key={song.id} song={song} onPlay={handlePlaySong} />
            ))}
          </div>
        )}
        
        {/* Özelleştirilmiş öneriler */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">İlginizi Çekebilecek Türler</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gradient-to-r from-purple-800 to-indigo-800 rounded-xl p-6 hover:opacity-90 transition-opacity cursor-pointer">
              <h3 className="text-xl font-bold mb-2">Pop</h3>
              <p className="text-gray-300">En popüler parçalarla güncel kalın</p>
            </div>
            <div className="bg-gradient-to-r from-red-800 to-pink-800 rounded-xl p-6 hover:opacity-90 transition-opacity cursor-pointer">
              <h3 className="text-xl font-bold mb-2">Rock</h3>
              <p className="text-gray-300">Enerjinizi yüksek tutun</p>
            </div>
            <div className="bg-gradient-to-r from-blue-800 to-cyan-800 rounded-xl p-6 hover:opacity-90 transition-opacity cursor-pointer">
              <h3 className="text-xl font-bold mb-2">Elektronik</h3>
              <p className="text-gray-300">Ritim ve melodilerin dünyasına dalın</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Music Player */}
      <MusicPlayer currentSong={currentSong || undefined} />
    </div>
  );
};

export default RecommendationsPage; 