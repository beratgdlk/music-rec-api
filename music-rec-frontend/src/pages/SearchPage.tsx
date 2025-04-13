import { useState } from 'react';
import SearchBar from '../components/SearchBar';
import SongCard from '../components/SongCard';
import MusicPlayer from '../components/MusicPlayer';

// Örnek kategoriler
const popularCategories = [
  { id: '1', name: 'Hip Hop', color: 'from-purple-500 to-blue-500' },
  { id: '2', name: 'Rock', color: 'from-red-500 to-orange-500' },
  { id: '3', name: 'Chill', color: 'from-green-500 to-emerald-500' },
  { id: '4', name: 'Workout', color: 'from-yellow-500 to-amber-500' },
  { id: '5', name: 'Party', color: 'from-pink-500 to-rose-500' },
  { id: '6', name: 'Jazz', color: 'from-blue-500 to-indigo-500' },
  { id: '7', name: 'Classical', color: 'from-gray-500 to-slate-500' },
  { id: '8', name: 'Electronic', color: 'from-teal-500 to-cyan-500' },
];

// Örnek şarkı verisi (normalde API'dan gelecek)
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

const SearchPage = () => {
  const [searchResults, setSearchResults] = useState<typeof sampleSongs>([]);
  const [searching, setSearching] = useState(false);
  const [currentSong, setCurrentSong] = useState<typeof sampleSongs[0] | null>(null);
  
  const handleSearch = (query: string) => {
    setSearching(true);
    
    // API araması simule edildi
    setTimeout(() => {
      // Gerçek projede burada API çağrısı yapılacak
      const results = sampleSongs.filter(song => 
        song.title.toLowerCase().includes(query.toLowerCase()) || 
        song.artist.toLowerCase().includes(query.toLowerCase())
      );
      
      setSearchResults(results);
      setSearching(false);
    }, 500);
  };
  
  const handlePlaySong = (song: typeof sampleSongs[0]) => {
    setCurrentSong(song);
  };

  return (
    <div className="pl-64 pb-24 bg-black min-h-screen text-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Ara</h1>
        
        <SearchBar 
          onSearch={handleSearch} 
          placeholder="Şarkılar, sanatçılar veya albümler için arama yapın..." 
          className="mb-8"
        />
        
        {/* Arama sonuçları */}
        {searching ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-green-500 mb-4"></div>
            <p>Aranıyor...</p>
          </div>
        ) : searchResults.length > 0 ? (
          <div>
            <h2 className="text-2xl font-bold mb-4">Arama Sonuçları</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
              {searchResults.map(song => (
                <SongCard key={song.id} song={song} onPlay={handlePlaySong} />
              ))}
            </div>
          </div>
        ) : (
          <>
            {/* Popüler aramalar */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-4">Popüler Aramalar</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {popularCategories.map(category => (
                  <button
                    key={category.id}
                    className={`bg-gradient-to-r ${category.color} rounded-lg p-6 text-lg font-bold hover:opacity-90 transition-opacity`}
                    onClick={() => handleSearch(category.name)}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Senin için önerilen */}
            <div>
              <h2 className="text-2xl font-bold mb-4">Senin İçin Önerilen</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {sampleSongs.map(song => (
                  <SongCard key={song.id} song={song} onPlay={handlePlaySong} />
                ))}
              </div>
            </div>
          </>
        )}
      </div>
      
      {/* Music Player */}
      <MusicPlayer currentSong={currentSong || undefined} />
    </div>
  );
};

export default SearchPage; 