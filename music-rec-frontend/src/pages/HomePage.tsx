import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import SongCard from '../components/SongCard';
import PlaylistCard from '../components/PlaylistCard';
import MusicPlayer from '../components/MusicPlayer';
import { useMusicStore } from '../stores/musicStore';

// Örnek veriler (API entegrasyonu yapılana kadar)
const sampleSongs = [
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
  }
];

const samplePlaylists = [
  {
    id: '1',
    title: 'Günün En Çok Dinlenenleri',
    description: 'The Weeknd bugün en çok dinlenenler arasında 1 numara!',
    imageUrl: 'https://via.placeholder.com/300/222/fff?text=Top+Hits',
    songCount: 50
  },
  {
    id: '2',
    title: 'Chill Vibes',
    description: 'Rahatlayın ve en iyi chill parçaları dinleyin',
    imageUrl: 'https://via.placeholder.com/300/335/fff?text=Chill+Vibes',
    songCount: 40
  },
  {
    id: '3',
    title: 'Workout Mix',
    description: 'Egzersiziniz için enerji dolu şarkılar',
    imageUrl: 'https://via.placeholder.com/300/553/fff?text=Workout+Mix',
    songCount: 35
  }
];

const newReleases = [
  {
    id: '5',
    title: 'Midnight City',
    artist: 'M83',
    album: 'Hurry Up, We\'re Dreaming',
    imageUrl: 'https://via.placeholder.com/300/11a/fff?text=Midnight+City',
    duration: 240
  },
  {
    id: '6',
    title: 'Heat Waves',
    artist: 'Glass Animals',
    album: 'Dreamland',
    imageUrl: 'https://via.placeholder.com/300/a1a/fff?text=Heat+Waves',
    duration: 235
  },
  {
    id: '7',
    title: 'Glimpse of Us',
    artist: 'Joji',
    album: 'Smithereens',
    imageUrl: 'https://via.placeholder.com/300/a11/fff?text=Glimpse+of+Us',
    duration: 215
  }
];

const HomePage = () => {
  const [currentSong, setCurrentSong] = useState<typeof sampleSongs[0] | null>(null);
  const { fetchRecommendations } = useMusicStore();
  
  useEffect(() => {
    // API entegrasyonu yapıldığında gerçek veri çekilecek
    fetchRecommendations();
  }, [fetchRecommendations]);
  
  const handlePlaySong = (song: typeof sampleSongs[0]) => {
    setCurrentSong(song);
  };
  
  const handlePlayPlaylist = (playlist: typeof samplePlaylists[0]) => {
    // İlk şarkıyı çal
    if (sampleSongs.length > 0) {
      setCurrentSong(sampleSongs[0]);
    }
  };

  return (
    <div className="pl-64 pb-24 bg-gradient-to-b from-gray-900 to-black min-h-screen text-white">
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Hero alanı */}
        <div className="bg-gradient-to-r from-indigo-800 to-purple-800 rounded-xl p-8 mb-8">
          <h1 className="text-4xl font-bold mb-2">Hoş Geldiniz</h1>
          <p className="text-lg text-gray-200 mb-6">
            Size özel müzik önerilerini keşfedin ve en sevdiğiniz parçaları favorilerinize ekleyin.
          </p>
          <button 
            className="bg-green-500 text-black font-semibold py-3 px-6 rounded-full hover:bg-green-400 transition-colors"
            onClick={() => fetchRecommendations()}
          >
            Önerileri Keşfet
          </button>
        </div>
        
        {/* Son çalınanlar */}
        <section className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Son Çalınanlar</h2>
            <Link to="/history" className="text-gray-400 hover:text-white flex items-center">
              <span>Tümünü Gör</span>
              <ChevronRight size={20} />
            </Link>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {sampleSongs.map(song => (
              <SongCard key={song.id} song={song} onPlay={handlePlaySong} />
            ))}
          </div>
        </section>
        
        {/* Popüler çalma listeleri */}
        <section className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Popüler Çalma Listeleri</h2>
            <Link to="/playlists" className="text-gray-400 hover:text-white flex items-center">
              <span>Tümünü Gör</span>
              <ChevronRight size={20} />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {samplePlaylists.map(playlist => (
              <PlaylistCard key={playlist.id} playlist={playlist} onPlay={handlePlayPlaylist} />
            ))}
          </div>
        </section>
        
        {/* Yeni çıkanlar */}
        <section>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Yeni Çıkanlar</h2>
            <Link to="/new-releases" className="text-gray-400 hover:text-white flex items-center">
              <span>Tümünü Gör</span>
              <ChevronRight size={20} />
            </Link>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {newReleases.map(song => (
              <SongCard key={song.id} song={song} onPlay={handlePlaySong} />
            ))}
          </div>
        </section>
      </div>
      
      {/* Music Player */}
      <MusicPlayer currentSong={currentSong || undefined} />
    </div>
  );
};

export default HomePage; 