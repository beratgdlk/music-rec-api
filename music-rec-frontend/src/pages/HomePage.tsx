import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Play, Heart, Search, Home, Library, Plus, SkipBack, SkipForward, Pause, Shuffle, Repeat, Menu, X, Volume2 } from 'lucide-react';
import { useMusicStore } from '../stores/musicStore';
import logo from '../assets/logo.svg';

// Bileşenlerle uyumlu arayüzler
interface Song {
  id: string;
  title: string;
  artist: string;
  album?: string;
  imageUrl?: string;
  duration: number;
}

interface Playlist {
  id: string;
  title: string;
  description?: string;
  imageUrl?: string;
  songCount?: number;
}

// Örnek veriler
const dailySongs: Song[] = [
  {
    id: '1',
    title: 'Günün Şarkısı #1',
    artist: 'Sanatçı Adı',
    album: 'Albüm Adı',
    imageUrl: 'https://via.placeholder.com/300/111/fff?text=Günün+Şarkısı+1',
    duration: 200
  },
  {
    id: '2',
    title: 'Günün Şarkısı #2',
    artist: 'Sanatçı Adı',
    album: 'Albüm Adı',
    imageUrl: 'https://via.placeholder.com/300/222/fff?text=Günün+Şarkısı+2',
    duration: 180
  },
  {
    id: '3',
    title: 'Günün Şarkısı #3',
    artist: 'Sanatçı Adı',
    album: 'Albüm Adı',
    imageUrl: 'https://via.placeholder.com/300/333/fff?text=Günün+Şarkısı+3',
    duration: 220
  },
  {
    id: '4',
    title: 'Günün Şarkısı #4',
    artist: 'Sanatçı Adı',
    album: 'Albüm Adı',
    imageUrl: 'https://via.placeholder.com/300/444/fff?text=Günün+Şarkısı+4',
    duration: 210
  },
  {
    id: '5',
    title: 'Günün Şarkısı #5',
    artist: 'Sanatçı Adı',
    album: 'Albüm Adı',
    imageUrl: 'https://via.placeholder.com/300/555/fff?text=Günün+Şarkısı+5',
    duration: 195
  },
  {
    id: '6',
    title: 'Günün Şarkısı #6',
    artist: 'Sanatçı Adı',
    album: 'Albüm Adı',
    imageUrl: 'https://via.placeholder.com/300/666/fff?text=Günün+Şarkısı+6',
    duration: 230
  }
];

const recentlyPlayedSongs: Song[] = [
  {
    id: '7',
    title: 'Popüler Şarkı İsmi #1',
    artist: 'Sanatçı Adı',
    album: 'Albüm Adı',
    imageUrl: 'https://via.placeholder.com/300/111/fff?text=Popüler+1',
    duration: 200
  },
  {
    id: '8',
    title: 'Popüler Şarkı İsmi #2',
    artist: 'Sanatçı Adı',
    album: 'Albüm Adı',
    imageUrl: 'https://via.placeholder.com/300/222/fff?text=Popüler+2',
    duration: 180
  },
  {
    id: '9',
    title: 'Popüler Şarkı İsmi #3',
    artist: 'Sanatçı Adı',
    album: 'Albüm Adı',
    imageUrl: 'https://via.placeholder.com/300/333/fff?text=Popüler+3',
    duration: 220
  },
  {
    id: '10',
    title: 'Popüler Şarkı İsmi #4',
    artist: 'Sanatçı Adı',
    album: 'Albüm Adı',
    imageUrl: 'https://via.placeholder.com/300/444/fff?text=Popüler+4',
    duration: 210
  }
];

const playlists: Playlist[] = [
  {
    id: '1',
    title: 'Hot Hits Türkiye',
    description: 'Şu anda Türkiye\'de en çok dinlenen şarkılar!',
    imageUrl: 'https://via.placeholder.com/300/f05/fff?text=Hot+Hits+TR',
    songCount: 50
  },
  {
    id: '2',
    title: 'Türkçe Pop',
    description: 'En sevilen Türkçe pop şarkıları dinle!',
    imageUrl: 'https://via.placeholder.com/300/50f/fff?text=Türkçe+Pop',
    songCount: 80
  },
  {
    id: '3',
    title: 'Rap Caviar',
    description: 'Dünyanın en çok dinlenen rap parçaları',
    imageUrl: 'https://via.placeholder.com/300/f50/fff?text=Rap+Caviar',
    songCount: 60
  },
  {
    id: '4',
    title: 'Chill Mix',
    description: 'Rahatlatan müziklerle dinlenme zamanı',
    imageUrl: 'https://via.placeholder.com/300/0f5/fff?text=Chill+Mix',
    songCount: 45
  }
];

// Yeni koleksiyonlar (Spotify'daki kartlar gibi)
const collections = [
  { id: '1', title: 'Meksika Ağması 3.0', imageUrl: 'https://picsum.photos/seed/1234/300/300' },
  { id: '2', title: 'rock anthems', imageUrl: 'https://picsum.photos/seed/2345/300/300' },
  { id: '3', title: 'sage', imageUrl: 'https://picsum.photos/seed/3456/300/300' },
  { id: '4', title: 'elaturca', imageUrl: 'https://picsum.photos/seed/4567/300/300' },
  { id: '5', title: 'the forgotten', imageUrl: 'https://picsum.photos/seed/5678/300/300' },
  { id: '6', title: 'babuza', imageUrl: 'https://picsum.photos/seed/6789/300/300' },
  { id: '7', title: 'Alternative 60s', imageUrl: 'https://picsum.photos/seed/7890/300/300' },
  { id: '8', title: 'Discover Weekly', imageUrl: 'https://picsum.photos/seed/8901/300/300' },
];

// Daily Mix başlıkları
const dailyMixes = [
  {
    id: 'mix1',
    title: 'Daily Mix 1',
    description: 'Kalabrese, Auntie Flo, Ernest Gonzales ve daha fazlası',
    coverImages: [
      'https://picsum.photos/seed/mix1a/300/300',
      'https://picsum.photos/seed/mix1b/300/300',
      'https://picsum.photos/seed/mix1c/300/300',
    ]
  },
  {
    id: 'mix2',
    title: 'Daily Mix 2',
    description: 'All India Radio, Emapea, Aluddnation ve daha fazlası',
    coverImages: [
      'https://picsum.photos/seed/mix2a/300/300',
      'https://picsum.photos/seed/mix2b/300/300',
      'https://picsum.photos/seed/mix2c/300/300',
    ]
  },
  {
    id: 'mix3',
    title: 'Daily Mix 3',
    description: 'Rigopolar, Tom Bro, SSIEGE ve daha fazlası',
    coverImages: [
      'https://picsum.photos/seed/mix3a/300/300',
      'https://picsum.photos/seed/mix3b/300/300',
      'https://picsum.photos/seed/mix3c/300/300',
    ]
  },
  {
    id: 'mix4',
    title: 'Daily Mix 4',
    description: 'Senin için seçilen parçalar ve sanatçılar',
    coverImages: [
      'https://picsum.photos/seed/mix4a/300/300',
      'https://picsum.photos/seed/mix4b/300/300',
      'https://picsum.photos/seed/mix4c/300/300',
    ]
  }
];

const HomePage = () => {
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { fetchRecommendations } = useMusicStore();
  
  useEffect(() => {
    // API entegrasyonu yapıldığında gerçek veri çekilecek
    fetchRecommendations();
  }, [fetchRecommendations]);
  
  const handlePlaySong = (song: Song) => {
    setCurrentSong(song);
    setIsPlaying(true);
  };
  
  const handlePlayCollection = () => {
    // Örnek uygulamada ilk şarkıyı çalıyoruz
    if (dailySongs.length > 0) {
      setCurrentSong(dailySongs[0]);
      setIsPlaying(true);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-black text-white overflow-hidden">
      {/* Main Grid Layout */}
      <div className="flex h-[calc(100vh-90px)]">
        {/* Sidebar */}
        <aside className={`bg-[#121212] flex-shrink-0 transition-all duration-300 ${sidebarOpen ? 'w-64' : 'w-0 -ml-5 overflow-hidden'}`}>
          <div className="flex flex-col h-full p-4">
            {/* Logo */}
            <div className="py-4 px-2">
              <div className="flex items-center gap-2">
                <img src={logo} alt="MusicApp Logo" className="w-10 h-10" />
                <h1 className="text-xl font-bold">MusicApp</h1>
              </div>
            </div>
            
            {/* Main Navigation */}
            <nav className="mt-6">
              <ul className="space-y-2">
                <li>
                  <Link to="/" className="flex items-center gap-3 px-3 py-2 text-gray-200 rounded-md hover:bg-[#282828] transition-colors">
                    <Home size={24} />
                    <span>Ana Sayfa</span>
                  </Link>
                </li>
                <li>
                  <Link to="/search" className="flex items-center gap-3 px-3 py-2 text-gray-400 rounded-md hover:bg-[#282828] transition-colors">
                    <Search size={24} />
                    <span>Ara</span>
                  </Link>
                </li>
                <li>
                  <Link to="/library" className="flex items-center gap-3 px-3 py-2 text-gray-400 rounded-md hover:bg-[#282828] transition-colors">
                    <Library size={24} />
                    <span>Kitaplığın</span>
                  </Link>
                </li>
              </ul>
            </nav>
            
            {/* Playlists Section */}
            <div className="mt-8">
              <div className="flex items-center justify-between px-3 mb-4">
                <button className="flex items-center gap-1 text-gray-400 hover:text-white transition-colors">
                  <Plus size={22} />
                  <span>Çalma Listesi Oluştur</span>
                </button>
              </div>
              
              {/* Playlist categories */}
              <div className="px-3 mb-2">
                <span className="px-3 py-1 text-xs rounded-full bg-[#333333] text-white">Çalma Listeleri</span>
              </div>
              
              {/* Playlists */}
              <div className="mt-2 space-y-1 max-h-[calc(100vh-300px)] overflow-y-auto pr-2 custom-scrollbar">
                {playlists.map(playlist => (
                  <Link 
                    key={playlist.id}
                    to={`/playlist/${playlist.id}`}
                    className="flex items-center gap-3 px-3 py-2 text-gray-400 hover:text-white rounded-md hover:bg-[#282828] transition-colors text-sm"
                  >
                    <span className="truncate">{playlist.title}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </aside>
        
        {/* Main Content */}
        <main className="flex-1 overflow-y-auto bg-gradient-to-b from-[#121212] via-[#181818] to-[#121212]">
          {/* Top Bar */}
          <div className="sticky top-0 z-10 bg-[#121212]/75 backdrop-blur-md p-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button 
                className="p-2 rounded-full bg-black text-white" 
                onClick={() => setSidebarOpen(!sidebarOpen)}
              >
                {sidebarOpen ? <X size={18} /> : <Menu size={18} />}
              </button>
              
              <div className="flex gap-2">
                <button className="p-2 rounded-full bg-[#0a0a0a] hover:bg-[#282828] transition-colors">
                  <ChevronRight className="h-4 w-4 rotate-180" />
                </button>
                <button className="p-2 rounded-full bg-[#0a0a0a] hover:bg-[#282828] transition-colors">
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
            
            <div className="relative w-80">
              <input
                type="text"
                placeholder="Ne dinlemek istiyorsun?"
                className="w-full bg-[#242424] rounded-full py-2 px-10 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white"
              />
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            </div>
            
            <div className="flex items-center gap-4">
              <button className="text-sm font-medium bg-black hover:bg-[#282828] px-4 py-2 rounded-full border border-gray-700 transition-colors">Yükselt</button>
              <div className="h-8 w-8 rounded-full bg-[#282828] flex items-center justify-center">
                <span className="text-sm font-medium">K</span>
              </div>
            </div>
          </div>
          
          {/* Content */}
          <div className="p-6">
            {/* Collections Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
              {collections.map(collection => (
                <Link 
                  key={collection.id} 
                  to={`/collection/${collection.id}`}
                  className="bg-[#181818] hover:bg-[#282828] transition-colors group rounded-md overflow-hidden flex items-center"
                >
                  <img 
                    src={collection.imageUrl} 
                    alt={collection.title} 
                    className="w-16 h-16 object-cover shadow-lg"
                  />
                  <span className="font-bold px-4">{collection.title}</span>
                  <div className="ml-auto mr-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button 
                      className="bg-[#1DB954] rounded-full w-10 h-10 flex items-center justify-center shadow-lg hover:scale-105 transition-transform"
                      onClick={(e) => {
                        e.preventDefault();
                        handlePlayCollection();
                      }}
                    >
                      <Play fill="black" size={20} className="ml-1" />
                    </button>
                  </div>
                </Link>
              ))}
            </div>
            
            {/* Picked For You */}
            <section className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Senin İçin Seçtiklerimiz</h2>
                <Link to="/featured" className="text-sm text-gray-400 hover:text-white transition-colors">
                  Tümünü gör
                </Link>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-7 gap-5">
                {dailySongs.slice(0, 7).map((song) => (
                  <div key={song.id} className="bg-[#181818] hover:bg-[#282828] transition-all p-4 rounded-md group">
                    <div className="relative mb-4">
                      <img 
                        src={song.imageUrl || `https://picsum.photos/seed/${song.id}/300/300`} 
                        alt={song.title}
                        className="w-full aspect-square object-cover rounded-md shadow-lg"
                      />
                      <button 
                        className="absolute bottom-2 right-2 bg-[#1DB954] rounded-full w-10 h-10 flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all hover:scale-105"
                        onClick={() => handlePlaySong(song)}
                      >
                        <Play fill="black" size={20} className="ml-1" />
                      </button>
                    </div>
                    <h3 className="font-semibold truncate">{song.title}</h3>
                    <p className="text-gray-400 text-sm truncate">{song.artist}</p>
                  </div>
                ))}
              </div>
            </section>
            
            {/* Made For You */}
            <section className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Senin İçin Hazırlandı</h2>
                <Link to="/made-for-you" className="text-sm text-gray-400 hover:text-white transition-colors">
                  Tümünü gör
                </Link>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {dailyMixes.map(mix => (
                  <div key={mix.id} className="bg-[#181818] p-5 rounded-lg hover:bg-[#282828] transition-colors group">
                    <div className="relative pb-6">
                      <div className="flex">
                        <div className="grid grid-cols-2 gap-1 w-full">
                          {mix.coverImages.map((img, i) => (
                            <img
                              key={i}
                              src={img}
                              alt=""
                              className={`object-cover shadow-md ${i === 0 ? 'col-span-2 h-32' : 'h-16'}`}
                            />
                          ))}
                        </div>
                      </div>
                      <button 
                        className="absolute bottom-0 right-2 bg-[#1DB954] rounded-full w-12 h-12 flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all hover:scale-105 hover:bg-[#1ed760]"
                        onClick={() => handlePlayCollection()}
                      >
                        <Play fill="black" size={24} className="ml-1" />
                      </button>
                    </div>
                    <h3 className="text-xl font-bold mt-4 mb-1">{mix.title}</h3>
                    <p className="text-gray-400 text-sm">{mix.description}</p>
                  </div>
                ))}
              </div>
            </section>
            
            {/* Recently Played */}
            <section className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Yakında Çalınanlar</h2>
                <Link to="/history" className="text-sm text-gray-400 hover:text-white transition-colors">
                  Tümünü gör
                </Link>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-7 gap-5">
                {recentlyPlayedSongs.map((song) => (
                  <div key={song.id} className="bg-[#181818] hover:bg-[#282828] transition-all p-4 rounded-md group">
                    <div className="relative mb-4">
                      <img 
                        src={song.imageUrl || `https://picsum.photos/seed/${song.id + 'recent'}/300/300`} 
                        alt={song.title}
                        className="w-full aspect-square object-cover rounded-md shadow-lg"
                      />
                      <button 
                        className="absolute bottom-2 right-2 bg-[#1DB954] rounded-full w-10 h-10 flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all hover:scale-105"
                        onClick={() => handlePlaySong(song)}
                      >
                        <Play fill="black" size={20} className="ml-1" />
                      </button>
                    </div>
                    <h3 className="font-semibold truncate">{song.title}</h3>
                    <p className="text-gray-400 text-sm truncate">{song.artist}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </main>
      </div>
      
      {/* Player Bar */}
      <div className="h-[90px] bg-[#181818] border-t border-[#282828] flex items-center px-4">
        {currentSong ? (
          <div className="w-full grid grid-cols-3 items-center">
            {/* Left - Track Info */}
            <div className="flex items-center gap-3">
              <img 
                src={currentSong.imageUrl || `https://picsum.photos/seed/${currentSong.id + 'player'}/300/300`} 
                alt={currentSong.title}
                className="w-14 h-14 object-cover"
              />
              <div>
                <h4 className="text-sm font-medium hover:underline cursor-pointer">{currentSong.title}</h4>
                <p className="text-xs text-gray-400 hover:text-white hover:underline cursor-pointer">{currentSong.artist}</p>
              </div>
              <button className="ml-5 text-gray-400 hover:text-white transition-colors">
                <Heart size={16} />
              </button>
            </div>
            
            {/* Center - Controls */}
            <div className="flex flex-col items-center">
              <div className="flex items-center gap-5 mb-1">
                <button className="text-gray-400 hover:text-white transition-colors">
                  <Shuffle size={16} />
                </button>
                <button className="text-gray-400 hover:text-white transition-colors">
                  <SkipBack size={18} />
                </button>
                <button 
                  className="bg-white rounded-full w-8 h-8 flex items-center justify-center hover:scale-105 transition-transform"
                  onClick={() => setIsPlaying(!isPlaying)}
                >
                  {isPlaying ? 
                    <Pause size={16} className="text-black" /> : 
                    <Play size={16} className="text-black ml-0.5" />
                  }
                </button>
                <button className="text-gray-400 hover:text-white transition-colors">
                  <SkipForward size={18} />
                </button>
                <button className="text-gray-400 hover:text-white transition-colors">
                  <Repeat size={16} />
                </button>
              </div>
              <div className="flex items-center gap-2 w-full max-w-md">
                <span className="text-xs text-gray-400 w-10 text-right">0:52</span>
                <div className="relative flex-1 h-1 bg-[#5E5E5E] rounded-full overflow-hidden group cursor-pointer">
                  <div className="absolute inset-y-0 left-0 bg-white w-1/4 rounded-full group-hover:bg-[#1DB954]"></div>
                  <div className="absolute inset-y-0 left-[23%] w-3 h-3 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity -translate-y-1/4"></div>
                </div>
                <span className="text-xs text-gray-400 w-10">{Math.floor(currentSong.duration / 60)}:{(currentSong.duration % 60).toString().padStart(2, '0')}</span>
              </div>
            </div>
            
            {/* Right - Volume */}
            <div className="flex items-center justify-end gap-3">
              <button className="text-gray-400 hover:text-white transition-colors">
                <svg width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M13.426 2.574a2.831 2.831 0 00-4.797 1.55l3.247 3.247a2.831 2.831 0 001.55-4.797zM10.5 8.5l-2-2-5.584 5.584a1.414 1.414 0 102 2L10.5 8.5zm1.414-1.414L10.5 5.672l-2 2 1.414 1.414 2-2z" />
                </svg>
              </button>
              <button className="text-gray-400 hover:text-white transition-colors">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M11.196 8 6 4.633v6.734L11.196 8Zm.803-1.6L5.6 2.15A1 1 0 0 0 4 3v10a1 1 0 0 0 1.6.85l6.4-4.25a1 1 0 0 0 0-1.7Z" />
                </svg>
              </button>
              <div className="flex items-center gap-2 group w-24">
                <Volume2 size={16} className="text-gray-400 group-hover:text-white transition-colors" />
                <div className="relative flex-1 h-1 bg-[#5E5E5E] rounded-full overflow-hidden cursor-pointer">
                  <div className="absolute inset-y-0 left-0 bg-gray-400 group-hover:bg-white w-3/4 rounded-full transition-colors"></div>
                  <div className="absolute inset-y-0 left-[74%] w-3 h-3 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity -translate-y-1/4"></div>
                </div>
              </div>
              <button className="text-gray-400 hover:text-white transition-colors p-1">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1.5 3.5a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-9a2 2 0 0 1-2-2v-9ZM3.5 1a2.5 2.5 0 0 0-2.5 2.5v9A2.5 2.5 0 0 0 3.5 15h9a2.5 2.5 0 0 0 2.5-2.5v-9A2.5 2.5 0 0 0 12.5 1h-9Z" />
                </svg>
              </button>
            </div>
          </div>
        ) : (
          <div className="w-full text-center text-gray-400">
            <p>Çalan müzik yok</p>
            <p className="text-sm">Dinlemek için bir şarkı seçin</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage; 