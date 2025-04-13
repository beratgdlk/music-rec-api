import { useState, useEffect } from 'react';
import { 
  Play, Pause, SkipBack, SkipForward, Repeat, Shuffle, 
  Heart, Volume2, Maximize2, ListMusic 
} from 'lucide-react';

interface Song {
  id: string;
  title: string;
  artist: string;
  album?: string;
  imageUrl?: string;
  duration: number;
}

interface MusicPlayerProps {
  currentSong?: Song;
}

const MusicPlayer = ({ currentSong }: MusicPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  
  // Şarkı değiştiğinde progressi sıfırla
  useEffect(() => {
    setProgress(0);
    setCurrentTime(0);
    setIsPlaying(false);
  }, [currentSong]);
  
  // Şarkı oynatma simülasyonu
  useEffect(() => {
    let interval: number | null = null;
    
    if (isPlaying && currentSong) {
      interval = window.setInterval(() => {
        setCurrentTime((prevTime) => {
          const newTime = prevTime + 1;
          if (newTime >= currentSong.duration) {
            setIsPlaying(false);
            return currentSong.duration;
          }
          return newTime;
        });
        
        setProgress((prevProgress) => {
          if (currentSong.duration === 0) return 0;
          const newProgress = (currentTime / currentSong.duration) * 100;
          return newProgress > 100 ? 100 : newProgress;
        });
      }, 1000);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying, currentSong, currentTime]);
  
  // Zamanı formatlama
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };
  
  // Şarkı olmaması durumunda gösterme
  if (!currentSong) {
    return null;
  }
  
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-900 border-t border-gray-800 text-white p-3 flex items-center z-50">
      {/* Şarkı bilgisi */}
      <div className="flex items-center w-1/4">
        <img 
          src={currentSong.imageUrl || 'https://via.placeholder.com/40'} 
          alt={currentSong.title} 
          className="w-12 h-12 object-cover mr-3"
        />
        <div>
          <h4 className="text-sm font-medium truncate">{currentSong.title}</h4>
          <p className="text-xs text-gray-400 truncate">{currentSong.artist}</p>
        </div>
        <button 
          className={`ml-4 ${isFavorite ? 'text-red-500' : 'text-gray-400 hover:text-white'}`}
          onClick={() => setIsFavorite(!isFavorite)}
        >
          <Heart size={18} fill={isFavorite ? 'currentColor' : 'none'} />
        </button>
      </div>
      
      {/* Oynatma kontrolleri */}
      <div className="flex-1 max-w-2xl mx-auto">
        <div className="flex justify-center items-center space-x-4 mb-1">
          <button className="text-gray-400 hover:text-white">
            <Shuffle size={18} />
          </button>
          <button className="text-gray-400 hover:text-white">
            <SkipBack size={20} />
          </button>
          <button 
            className="bg-white text-black rounded-full p-2 hover:scale-105 transition-transform"
            onClick={() => setIsPlaying(!isPlaying)}
          >
            {isPlaying ? <Pause size={20} /> : <Play size={20} />}
          </button>
          <button className="text-gray-400 hover:text-white">
            <SkipForward size={20} />
          </button>
          <button className="text-gray-400 hover:text-white">
            <Repeat size={18} />
          </button>
        </div>
        
        {/* İlerleme çubuğu */}
        <div className="flex items-center text-xs space-x-2">
          <span className="text-gray-400">{formatTime(currentTime)}</span>
          <div className="flex-1 h-1 bg-gray-700 rounded-full overflow-hidden">
            <div 
              className="h-full bg-green-500 rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className="text-gray-400">{formatTime(currentSong.duration)}</span>
        </div>
      </div>
      
      {/* Ekstra kontroller */}
      <div className="w-1/4 flex justify-end items-center space-x-3">
        <button className="text-gray-400 hover:text-white">
          <ListMusic size={18} />
        </button>
        <button className="text-gray-400 hover:text-white">
          <Volume2 size={18} />
        </button>
        <button className="text-gray-400 hover:text-white">
          <Maximize2 size={18} />
        </button>
      </div>
    </div>
  );
};

export default MusicPlayer; 