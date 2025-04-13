import { useState, useEffect } from 'react';
import { useMusicStore } from '../stores/musicStore';
import { useUserStore } from '../stores/userStore';
import SongCard from '../components/SongCard';
import MusicPlayer from '../components/MusicPlayer';
import { Music } from 'lucide-react';

// Örnek şarkı verisi
const sampleFavorites = [
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
  }
];

const FavoritesPage = () => {
  const [currentSong, setCurrentSong] = useState<typeof sampleFavorites[0] | null>(null);
  const { fetchFavorites, isLoading, favorites } = useMusicStore();
  const { user } = useUserStore();
  
  useEffect(() => {
    fetchFavorites();
  }, [fetchFavorites]);
  
  const handlePlaySong = (song: typeof sampleFavorites[0]) => {
    setCurrentSong(song);
  };
  
  // Örnek veriler kullanılıyor (gerçek projede API'dan gelen veriler kullanılacak)
  const displayFavorites = favorites.length > 0 ? favorites : sampleFavorites;

  return (
    <div className="pl-64 pb-24 bg-gradient-to-b from-purple-900 to-black min-h-screen text-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center mb-8">
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 w-40 h-40 flex items-center justify-center rounded-md shadow-lg mr-6">
            <Music className="w-20 h-20 text-white" />
          </div>
          <div>
            <p className="text-sm uppercase tracking-wider text-gray-400 mb-1">Çalma Listesi</p>
            <h1 className="text-5xl font-bold mb-4">Favorilerim</h1>
            <p className="text-gray-400">
              {user?.username || 'Kullanıcı'} • {displayFavorites.length} şarkı
            </p>
          </div>
        </div>
        
        {isLoading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-green-500 mb-4"></div>
            <p>Favoriler yükleniyor...</p>
          </div>
        ) : displayFavorites.length === 0 ? (
          <div className="text-center py-12 bg-gray-900 bg-opacity-30 rounded-lg">
            <Music className="w-16 h-16 text-gray-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">Henüz favori şarkınız yok</h2>
            <p className="text-gray-400 mb-6">
              Beğendiğiniz şarkıları kalp simgesine tıklayarak favorilerinize ekleyin
            </p>
            <button 
              className="bg-green-500 text-black font-semibold py-3 px-6 rounded-full hover:bg-green-400 transition-colors"
              onClick={() => window.location.href = '/'}
            >
              Önerilere Göz At
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {displayFavorites.map(song => (
              <SongCard key={song.id} song={song} onPlay={handlePlaySong} />
            ))}
          </div>
        )}
      </div>
      
      {/* Music Player */}
      <MusicPlayer currentSong={currentSong || undefined} />
    </div>
  );
};

export default FavoritesPage; 