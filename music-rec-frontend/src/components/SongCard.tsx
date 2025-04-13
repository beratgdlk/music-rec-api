import { Play, Heart } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMusicStore } from '../stores/musicStore';

interface Song {
  id: string;
  title: string;
  artist: string;
  album?: string;
  imageUrl?: string;
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
    <Link
      to={`/song/${song.id}`}
      className="bg-gray-800 bg-opacity-40 p-4 rounded-md transition-all duration-300 hover:bg-gray-700 group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative mb-4">
        <img
          src={song.imageUrl || 'https://via.placeholder.com/200'}
          alt={song.title}
          className="w-full aspect-square object-cover rounded-md shadow-lg"
        />
        {isHovered && (
          <button
            className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-md"
            onClick={(e) => {
              e.preventDefault();
              onPlay(song);
            }}
          >
            <div className="bg-green-500 rounded-full p-3 shadow-xl transition-transform transform hover:scale-110">
              <Play className="h-6 w-6 text-black" fill="black" />
            </div>
          </button>
        )}
        <button
          className={`absolute bottom-2 right-2 p-2 rounded-full ${
            isFavorite ? 'text-red-500' : 'text-white opacity-0 group-hover:opacity-100'
          } transition-opacity`}
          onClick={handleFavorite}
        >
          <Heart size={20} fill={isFavorite ? 'currentColor' : 'none'} />
        </button>
      </div>
      <h3 className="font-semibold text-white truncate">{song.title}</h3>
      <p className="text-sm text-gray-400 truncate">{song.artist}</p>
    </Link>
  );
};

export default SongCard; 