import { useState, useEffect } from 'react';
import { 
  Play, Pause, SkipBack, SkipForward, Repeat, Shuffle, 
  Heart, Volume2, ListMusic 
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
  const [volume, setVolume] = useState(80);
  
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
    <div className="fixed bottom-0 left-0 right-0 bg-[#181818] border-t border-[#282828] text-white z-50">
      <div className="h-1 w-full">
        <div className="relative h-full">
          <div className="absolute inset-0 bg-[#535353]">
            <div 
              className="h-full bg-[#1db954] hover:bg-[#1ed760]"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>
      
      <div className="flex items-center justify-between px-4 h-20">
        {/* Sol - Şarkı Bilgisi */}
        <div className="flex items-center gap-3 w-[30%]">
          <img 
            src={currentSong.imageUrl || 'https://via.placeholder.com/40'} 
            alt={currentSong.title}
            className="h-14 w-14 object-cover"
          />
          <div>
            <p className="text-sm font-medium">{currentSong.title}</p>
            <p className="text-xs text-gray-400">{currentSong.artist}</p>
          </div>
          <button 
            className={`ml-3 ${isFavorite ? 'text-[#1db954]' : 'text-gray-400 hover:text-white'}`}
            onClick={() => setIsFavorite(!isFavorite)}
          >
            <Heart size={16} fill={isFavorite ? 'currentColor' : 'none'} />
          </button>
        </div>
        
        {/* Orta - Oynatma Kontrolleri */}
        <div className="flex flex-col items-center w-[40%]">
          <div className="flex justify-center items-center gap-5 mb-2">
            <button className="text-gray-400 hover:text-white">
              <Shuffle size={16} />
            </button>
            <button className="text-gray-400 hover:text-white">
              <SkipBack size={20} />
            </button>
            <button 
              className="bg-white text-black rounded-full w-8 h-8 flex items-center justify-center hover:scale-105 transition-transform"
              onClick={() => setIsPlaying(!isPlaying)}
            >
              {isPlaying ? <Pause size={16} /> : <Play size={16} className="ml-0.5" />}
            </button>
            <button className="text-gray-400 hover:text-white">
              <SkipForward size={20} />
            </button>
            <button className="text-gray-400 hover:text-white">
              <Repeat size={16} />
            </button>
          </div>
          
          <div className="flex items-center gap-2 w-full">
            <span className="text-xs text-gray-400 w-10 text-right">{formatTime(currentTime)}</span>
            <div className="flex-1 group">
              <input 
                type="range" 
                value={progress}
                onChange={(e) => {
                  const newProgress = Number(e.target.value);
                  setProgress(newProgress);
                  setCurrentTime((newProgress / 100) * (currentSong.duration || 0));
                }}
                className="w-full h-1 appearance-none bg-transparent cursor-pointer [&::-webkit-slider-runnable-track]:rounded-full [&::-webkit-slider-runnable-track]:bg-[#535353] [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:opacity-0 group-hover:[&::-webkit-slider-thumb]:opacity-100"
                min="0"
                max="100"
                step="0.1"
              />
            </div>
            <span className="text-xs text-gray-400 w-10">{formatTime(currentSong.duration)}</span>
          </div>
        </div>
        
        {/* Sağ - Ses */}
        <div className="flex items-center gap-3 justify-end w-[30%]">
          <button className="text-gray-400 hover:text-white">
            <ListMusic size={16} />
          </button>
          <div className="flex items-center gap-1 group max-w-[125px]">
            <Volume2 size={16} className="text-gray-400 group-hover:text-white" />
            <div className="w-full">
              <input 
                type="range" 
                value={volume}
                onChange={(e) => setVolume(Number(e.target.value))}
                className="w-full h-1 appearance-none bg-transparent cursor-pointer [&::-webkit-slider-runnable-track]:rounded-full [&::-webkit-slider-runnable-track]:bg-[#535353] [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:opacity-0 group-hover:[&::-webkit-slider-thumb]:opacity-100"
                min="0"
                max="100"
                step="1"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MusicPlayer; 