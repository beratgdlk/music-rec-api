import { useState } from 'react';
import { motion } from 'framer-motion';
import AppLayout from '../../components/layout/AppLayout';
import { usePlayerContext } from '../../context/PlayerContext';
import { Album, Track, Playlist, RadioStation, Podcast } from '../../types';
import { formatNumber } from '../../utils/formatters';
import CardGrid from '../../components/ui/CardGrid';
import MediaCard from '../../components/ui/MediaCard';
import TrackList from '../../components/ui/TrackList';

// Örnek veri
const albums: Album[] = [
  {
    id: 1,
    title: 'Midnight Vibes',
    artist: 'Chill Master',
    cover: 'https://source.unsplash.com/random/300x300/?music',
  },
  {
    id: 2,
    title: 'Summer Beats',
    artist: 'Beach Boys',
    cover: 'https://source.unsplash.com/random/300x300/?summer',
  },
  {
    id: 3,
    title: 'Urban Stories',
    artist: 'City Sounds',
    cover: 'https://source.unsplash.com/random/300x300/?urban',
  },
  {
    id: 4,
    title: 'Acoustic Sessions',
    artist: 'Guitar Heroes',
    cover: 'https://source.unsplash.com/random/300x300/?guitar',
  },
  {
    id: 5,
    title: 'Electronic Dreams',
    artist: 'Synth Masters',
    cover: 'https://source.unsplash.com/random/300x300/?electronic',
  },
  {
    id: 6,
    title: 'Jazz Collection',
    artist: 'Blue Notes',
    cover: 'https://source.unsplash.com/random/300x300/?jazz',
  },
];

const tracks: Track[] = [
  {
    id: 1,
    title: 'Summer Nights',
    artist: 'Chill Master',
    album: 'Midnight Vibes',
    duration: '3:45',
    cover: 'https://source.unsplash.com/random/60x60/?music',
  },
  {
    id: 2,
    title: 'Ocean Waves',
    artist: 'Beach Boys',
    album: 'Summer Beats',
    duration: '4:20',
    cover: 'https://source.unsplash.com/random/60x60/?waves',
  },
  {
    id: 3,
    title: 'City Lights',
    artist: 'City Sounds',
    album: 'Urban Stories',
    duration: '3:55',
    cover: 'https://source.unsplash.com/random/60x60/?city',
  },
  {
    id: 4,
    title: 'Moonlight Sonata',
    artist: 'Guitar Heroes',
    album: 'Acoustic Sessions',
    duration: '5:12',
    cover: 'https://source.unsplash.com/random/60x60/?moon',
  },
  {
    id: 5,
    title: 'Electric Dreams',
    artist: 'Synth Masters',
    album: 'Electronic Dreams',
    duration: '4:05',
    cover: 'https://source.unsplash.com/random/60x60/?electronic',
  },
];

const playlists: Playlist[] = [
  { id: 1, name: 'Morning Motivation', count: 18, cover: 'https://source.unsplash.com/random/80x80/?morning' },
  { id: 2, name: 'Workout Mix', count: 24, cover: 'https://source.unsplash.com/random/80x80/?workout' },
  { id: 3, name: 'Chill Vibes', count: 32, cover: 'https://source.unsplash.com/random/80x80/?chill' },
  { id: 4, name: 'Party Hits', count: 45, cover: 'https://source.unsplash.com/random/80x80/?party' },
];

const radioStations: RadioStation[] = [
  { id: 1, name: "Pop Hit Radio", genre: "Pop", listeners: 24560, cover: "https://source.unsplash.com/random/240x240/?radio" },
  { id: 2, name: "Rock Nation", genre: "Rock", listeners: 18234, cover: "https://source.unsplash.com/random/240x240/?rock" },
  { id: 3, name: "Jazz Lounge", genre: "Jazz", listeners: 8762, cover: "https://source.unsplash.com/random/240x240/?jazz" },
  { id: 4, name: "Classical Harmony", genre: "Classical", listeners: 12980, cover: "https://source.unsplash.com/random/240x240/?classical" },
];

const podcasts: Podcast[] = [
  { id: 1, title: "Teknoloji Dünyası", author: "Tech Guru", cover: "https://source.unsplash.com/random/240x240/?tech" },
  { id: 2, title: "Bilim ve Yaşam", author: "Prof. Ahmet Yılmaz", cover: "https://source.unsplash.com/random/240x240/?science" },
  { id: 3, title: "Günlük Spor", author: "Spor Akademi", cover: "https://source.unsplash.com/random/240x240/?sport" },
  { id: 4, title: "Tarih Sohbetleri", author: "Tarih Araştırmaları", cover: "https://source.unsplash.com/random/240x240/?history" },
];

const HomePage = () => {
  const [currentTab, setCurrentTab] = useState('önerilen');
  const [likedTracks, setLikedTracks] = useState<number[]>([]);
  const player = usePlayerContext();

  // Tab değişimi işleyicisi
  const handleTabChange = (tab: string) => {
    setCurrentTab(tab);
  };

  // Şarkı beğenme işlevi
  const toggleLike = (trackId: number | string) => {
    if (typeof trackId === 'number') {
      if (likedTracks.includes(trackId)) {
        setLikedTracks(likedTracks.filter(id => id !== trackId));
      } else {
        setLikedTracks([...likedTracks, trackId]);
      }
    }
  };

  // Şarkı oynatma işlevi
  const handlePlayTrack = (track: Track) => {
    // Eğer şarkı çalarsa ve tıklanan şarkı ise, durdur/oynat değiştir
    if (player.currentTrack && player.currentTrack.id === track.id) {
      player.togglePlay();
    } else {
      player.setQueue(tracks);
      player.playTrack(track);
    }
  };

  // Albüm oynatma işlevi
  const handlePlayAlbum = (album: Album) => {
    const albumTracks = tracks.filter(track => track.album === album.title);
    if (albumTracks.length > 0) {
      player.setQueue(albumTracks);
      player.playTrack(albumTracks[0]);
    }
  };

  // Radyo oynatma işlevi
  const playRadioStation = (station: RadioStation) => {
    // Gerçek bir uygulamada burada radyo stream'ini başlatırdık
    alert(`${station.name} çalınıyor...`);
  };

  return (
    <AppLayout>
      {/* Ana İçerik */}
      <section>
        {/* Hoşgeldin Mesajı ve Üst Kısım */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <h1 className="text-4xl font-bold text-white mb-2">Merhaba!</h1>
          <p className="text-gray-400">Bugün ne dinlemek istersiniz?</p>
        </motion.div>

        {/* Kategori Seçimi Tabları */}
        <div className="border-b border-[#333333] mb-8">
          <nav className="flex space-x-8">
            <button
              onClick={() => handleTabChange('önerilen')}
              className={`pb-4 px-1 text-sm font-medium relative ${
                currentTab === 'önerilen' 
                  ? 'text-white' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Önerilen
              {currentTab === 'önerilen' && (
                <motion.div 
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 right-0 h-1 bg-[#D97706]" 
                />
              )}
            </button>
            <button
              onClick={() => handleTabChange('çalma-listeleri')}
              className={`pb-4 px-1 text-sm font-medium relative ${
                currentTab === 'çalma-listeleri' 
                  ? 'text-white' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Çalma Listeleri
              {currentTab === 'çalma-listeleri' && (
                <motion.div 
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 right-0 h-1 bg-[#D97706]" 
                />
              )}
            </button>
            <button
              onClick={() => handleTabChange('radyo')}
              className={`pb-4 px-1 text-sm font-medium relative ${
                currentTab === 'radyo' 
                  ? 'text-white' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Radyo
              {currentTab === 'radyo' && (
                <motion.div 
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 right-0 h-1 bg-[#D97706]" 
                />
              )}
            </button>
            <button
              onClick={() => handleTabChange('podcast')}
              className={`pb-4 px-1 text-sm font-medium relative ${
                currentTab === 'podcast' 
                  ? 'text-white' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Podcast
              {currentTab === 'podcast' && (
                <motion.div 
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 right-0 h-1 bg-[#D97706]" 
                />
              )}
            </button>
          </nav>
        </div>

        {/* Tab İçerikleri */}
        <div className="mt-8">
          {/* Önerilen Tab İçeriği */}
          {currentTab === 'önerilen' && (
            <>
              {/* Popüler Albümler */}
              <section className="mb-10">
                <h2 className="text-xl font-bold text-white mb-6">Popüler Albümler</h2>
                <CardGrid
                  items={albums}
                  renderItem={(album) => (
                    <MediaCard
                      title={album.title}
                      subtitle={album.artist}
                      cover={album.cover}
                      onClick={() => handlePlayAlbum(album)}
                    />
                  )}
                />
              </section>

              {/* Son Çalınanlar */}
              <section className="mb-10">
                <h2 className="text-xl font-bold text-white mb-6">Son Çalınanlar</h2>
                <TrackList
                  tracks={tracks}
                  onPlay={handlePlayTrack}
                  onLike={toggleLike}
                  likedTracks={likedTracks}
                  currentPlayingId={player.currentTrack?.id}
                  isPlaying={player.isPlaying}
                />
              </section>
            </>
          )}

          {/* Çalma Listeleri Tab İçeriği */}
          {currentTab === 'çalma-listeleri' && (
            <section>
              <h2 className="text-xl font-bold text-white mb-6">Özel Çalma Listeleri</h2>
              <CardGrid
                items={playlists}
                gridClassName="grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6"
                renderItem={(playlist) => (
                  <MediaCard
                    title={playlist.name}
                    subtitle={`${playlist.count} şarkı`}
                    cover={playlist.cover}
                  />
                )}
              />
            </section>
          )}

          {/* Radyo Tab İçeriği */}
          {currentTab === 'radyo' && (
            <section>
              <h2 className="text-xl font-bold text-white mb-6">Popüler Radyo İstasyonları</h2>
              <CardGrid
                items={radioStations}
                gridClassName="grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6"
                renderItem={(station) => (
                  <MediaCard
                    title={station.name}
                    subtitle={`${station.genre} • ${formatNumber(station.listeners || 0)} dinleyici`}
                    cover={station.cover}
                    onClick={() => playRadioStation(station)}
                  />
                )}
              />
            </section>
          )}

          {/* Podcast Tab İçeriği */}
          {currentTab === 'podcast' && (
            <section>
              <h2 className="text-xl font-bold text-white mb-6">Öne Çıkan Podcastler</h2>
              <CardGrid
                items={podcasts}
                gridClassName="grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6"
                renderItem={(podcast) => (
                  <MediaCard
                    title={podcast.title}
                    subtitle={podcast.author}
                    cover={podcast.cover}
                  />
                )}
              />
            </section>
          )}
        </div>
      </section>
    </AppLayout>
  );
};

export default HomePage; 