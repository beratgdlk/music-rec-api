import { Play, Heart, MoreHorizontal } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMusicStore } from '../stores/musicStore';

interface Song {
  id: string;
  title: string;
  artist: string;
  album?: string;
  imageUrl?: string;
  duration: number;
}

interface SongCardProps {
  song: Song;
  onPlay: (song: Song) => void;
}

const SongCard = ({ song, onPlay }: SongCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const { favorites, addToFavorites, removeFromFavorites } = useMusicStore();
  
  const isFavorite = favorites.some(fav => fav.id === song.id);
  
  const handleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isFavorite) {
      removeFromFavorites(song.id);
    } else {
      addToFavorites(song.id);
    }
  };

  return (
    <div
      className="group relative bg-white/5 backdrop-blur-sm rounded-xl overflow-hidden transition-all duration-300 hover:bg-white/10 hover:shadow-lg hover:shadow-blue-500/5"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link to={`/song/${song.id}`} className="block">
        <div className="relative aspect-square mb-3">
          <img
            src={song.imageUrl || 'https://via.placeholder.com/200'}
            alt={song.title}
            className="w-full h-full object-cover rounded-lg shadow-md group-hover:shadow-xl transition-all duration-300 group-hover:scale-105 transform-gpu"
          />
          {isHovered && (
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center rounded-lg transition-opacity">
              <button
                className="transform transition-all duration-300 hover:scale-110"
                onClick={(e) => {
                  e.preventDefault();
                  onPlay(song);
                }}
              >
                <div className="bg-gradient-to-br from-blue-500 to-purple-500 rounded-full p-3 shadow-xl hover:shadow-blue-500/50">
                  <Play className="h-8 w-8 text-white" fill="white" />
                </div>
              </button>
            </div>
          )}
        </div>
        
        <div className="px-2 pb-4">
          <h3 className="font-semibold text-white truncate">{song.title}</h3>
          <p className="text-sm text-gray-400 truncate mt-1">{song.artist}</p>
        </div>
      </Link>
      
      <div className="absolute top-2 right-2 flex gap-1">
        <button
          className={`p-2 rounded-full bg-black/20 backdrop-blur-md transition-all ${
            isFavorite ? 'text-red-500 opacity-100' : 'text-white opacity-0 group-hover:opacity-100'
          }`}
          onClick={handleFavorite}
        >
          <Heart size={16} fill={isFavorite ? 'currentColor' : 'none'} className="transition-transform hover:scale-110" />
        </button>
        
        <button className="p-2 rounded-full bg-black/20 backdrop-blur-md text-white opacity-0 group-hover:opacity-100 transition-all">
          <MoreHorizontal size={16} className="transition-transform hover:scale-110" />
        </button>
      </div>
    </div>
  );
};

export default SongCard; 