import { Play } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

interface Playlist {
  id: string;
  title: string;
  description?: string;
  imageUrl?: string;
  songCount?: number;
}

interface PlaylistCardProps {
  playlist: Playlist;
  onPlay: (playlist: Playlist) => void;
}

const PlaylistCard = ({ playlist, onPlay }: PlaylistCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link
      to={`/playlist/${playlist.id}`}
      className="bg-gray-800 bg-opacity-40 p-4 rounded-md transition-all duration-300 hover:bg-gray-700 group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative mb-4">
        <img
          src={playlist.imageUrl || 'https://via.placeholder.com/200'}
          alt={playlist.title}
          className="w-full aspect-square object-cover rounded-md shadow-lg"
        />
        {isHovered && (
          <button
            className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-md"
            onClick={(e) => {
              e.preventDefault();
              onPlay(playlist);
            }}
          >
            <div className="bg-green-500 rounded-full p-3 shadow-xl transition-transform transform hover:scale-110">
              <Play className="h-6 w-6 text-black" fill="black" />
            </div>
          </button>
        )}
      </div>
      <h3 className="font-semibold text-white truncate">{playlist.title}</h3>
      {playlist.description && (
        <p className="text-sm text-gray-400 line-clamp-2">{playlist.description}</p>
      )}
      {playlist.songCount !== undefined && (
        <p className="text-xs text-gray-500 mt-1">{playlist.songCount} şarkı</p>
      )}
    </Link>
  );
};

export default PlaylistCard; 