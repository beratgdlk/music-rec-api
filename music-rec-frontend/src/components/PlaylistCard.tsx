import { Play, Music, ListMusic } from 'lucide-react';
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
    <div
      className="group bg-white/5 backdrop-blur-sm rounded-xl overflow-hidden transition-all duration-300 hover:bg-white/10 hover:shadow-lg hover:shadow-blue-500/5 border border-white/10"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link to={`/playlist/${playlist.id}`} className="block">
        <div className="relative aspect-video">
          <img
            src={playlist.imageUrl || 'https://via.placeholder.com/400x225'}
            alt={playlist.title}
            className="w-full h-full object-cover shadow-md group-hover:shadow-xl transition-all duration-300 group-hover:scale-105 transform-gpu"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-80"></div>
          
          <div className="absolute bottom-0 left-0 p-4">
            <div className="flex items-center gap-2 mb-1">
              <div className="bg-blue-500/80 backdrop-blur-sm text-white rounded-full p-1 text-xs flex items-center">
                <Music className="h-3 w-3 mr-1" />
                <span>{playlist.songCount || 0} şarkı</span>
              </div>
            </div>
            <h3 className="font-bold text-white text-xl">{playlist.title}</h3>
          </div>
          
          {isHovered && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm transition-opacity">
              <button
                className="transform transition-all duration-300 hover:scale-110"
                onClick={(e) => {
                  e.preventDefault();
                  onPlay(playlist);
                }}
              >
                <div className="bg-gradient-to-br from-blue-500 to-purple-500 rounded-full p-4 shadow-xl hover:shadow-blue-500/50">
                  <Play className="h-8 w-8 text-white" fill="white" />
                </div>
              </button>
            </div>
          )}
        </div>
        
        <div className="p-4">
          <div className="flex justify-between items-start">
            <div>
              {playlist.description && (
                <p className="text-sm text-gray-400 line-clamp-2 mb-2">{playlist.description}</p>
              )}
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <ListMusic className="h-3 w-3" />
                <span>Çalma Listesi</span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default PlaylistCard; 