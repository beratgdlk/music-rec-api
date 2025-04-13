import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, TrendingUp, Star, Clock, Headphones } from 'lucide-react';
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
    <div className="pb-24 text-white">
      {/* Hero alanı */}
      <div className="relative overflow-hidden rounded-2xl mb-12">
        <div className="absolute -inset-40 bg-gradient-to-r from-blue-600 to-purple-600 opacity-30 blur-3xl -z-10"></div>
        <div className="bg-white/5 backdrop-blur-md rounded-2xl p-12 border border-white/10">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Müzik Deneyiminizi Keşfedin
              </h1>
              <p className="text-lg text-gray-300 mb-8 leading-relaxed">
                Size özel müzik önerilerini keşfedin, yeni sanatçılar bulun ve en sevdiğiniz parçaları favorilerinize ekleyin.
              </p>
              <div className="flex flex-wrap gap-4">
                <button 
                  className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full font-medium hover:from-blue-600 hover:to-purple-600 transition-all hover:shadow-lg hover:shadow-blue-500/25 text-white flex items-center gap-2"
                  onClick={() => fetchRecommendations()}
                >
                  <TrendingUp size={18} />
                  <span>Önerileri Keşfet</span>
                </button>
                <Link to="/favorites" 
                  className="px-6 py-3 bg-white/10 rounded-full font-medium hover:bg-white/20 transition-all text-white flex items-center gap-2"
                >
                  <Headphones size={18} />
                  <span>Müzik Koleksiyonum</span>
                </Link>
              </div>
            </div>
            <div className="hidden md:flex justify-end">
              <div className="relative w-80 h-80">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full opacity-20 animate-pulse"></div>
                <div className="absolute inset-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                  <div className="text-6xl text-white">
                    <Headphones size={100} strokeWidth={1} className="opacity-80" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* İstatistikler */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 flex items-center gap-4">
          <div className="bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl p-3">
            <Star className="h-6 w-6 text-white" />
          </div>
          <div>
            <p className="text-gray-400 text-sm">En Çok Dinlenenler</p>
            <p className="text-2xl font-bold">10,000+</p>
          </div>
        </div>
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 flex items-center gap-4">
          <div className="bg-gradient-to-br from-purple-500 to-purple-700 rounded-xl p-3">
            <TrendingUp className="h-6 w-6 text-white" />
          </div>
          <div>
            <p className="text-gray-400 text-sm">Haftanın Trendleri</p>
            <p className="text-2xl font-bold">250+ Şarkı</p>
          </div>
        </div>
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 flex items-center gap-4">
          <div className="bg-gradient-to-br from-pink-500 to-pink-700 rounded-xl p-3">
            <Clock className="h-6 w-6 text-white" />
          </div>
          <div>
            <p className="text-gray-400 text-sm">Yeni Eklenenler</p>
            <p className="text-2xl font-bold">Bu Hafta 148</p>
          </div>
        </div>
      </div>
      
      {/* Son çalınanlar */}
      <section className="mb-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Son Çalınanlar</h2>
          <Link to="/history" className="text-gray-400 hover:text-white flex items-center group">
            <span>Tümünü Gör</span>
            <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {sampleSongs.map(song => (
            <SongCard key={song.id} song={song} onPlay={handlePlaySong} />
          ))}
        </div>
      </section>
      
      {/* Popüler çalma listeleri */}
      <section className="mb-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Popüler Çalma Listeleri</h2>
          <Link to="/playlists" className="text-gray-400 hover:text-white flex items-center group">
            <span>Tümünü Gör</span>
            <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {samplePlaylists.map(playlist => (
            <PlaylistCard key={playlist.id} playlist={playlist} onPlay={handlePlayPlaylist} />
          ))}
        </div>
      </section>
      
      {/* Yeni çıkanlar */}
      <section>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Yeni Çıkanlar</h2>
          <Link to="/new-releases" className="text-gray-400 hover:text-white flex items-center group">
            <span>Tümünü Gör</span>
            <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {newReleases.map(song => (
            <SongCard key={song.id} song={song} onPlay={handlePlaySong} />
          ))}
        </div>
      </section>
      
      {/* Music Player */}
      <MusicPlayer currentSong={currentSong || undefined} />
    </div>
  );
};

export default HomePage; 