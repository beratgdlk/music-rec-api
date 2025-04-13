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
    <div className="fixed bottom-0 left-0 right-0 bg-black/60 backdrop-blur-xl border-t border-white/10 text-white pl-64 z-50">
      <div className="max-w-7xl mx-auto">
        {/* İlerleme çubuğu - üstte */}
        <div className="h-1 w-full relative">
          <div className="absolute inset-0 bg-gray-700/50">
            <div 
              className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-sm"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
        
        <div className="p-4 flex items-center gap-4">
          {/* Şarkı bilgisi */}
          <div className="flex items-center gap-4 w-1/4">
            <div className="relative group">
              <img 
                src={currentSong.imageUrl || 'https://via.placeholder.com/40'} 
                alt={currentSong.title} 
                className="w-14 h-14 object-cover rounded-md shadow-lg group-hover:shadow-blue-500/20"
              />
              <div className="absolute inset-0 bg-black/40 rounded-md opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all">
                <button className="text-white">
                  {isPlaying ? 
                    <Pause size={20} className="animate-glow-white" /> : 
                    <Play size={20} className="animate-glow-white" />
                  }
                </button>
              </div>
            </div>
            
            <div className="overflow-hidden">
              <h4 className="text-sm font-medium truncate">{currentSong.title}</h4>
              <p className="text-xs text-gray-400 truncate">{currentSong.artist}</p>
            </div>
            
            <button 
              className={`transform transition-all hover:scale-110 ${isFavorite ? 'text-red-500' : 'text-gray-400 hover:text-red-400'}`}
              onClick={() => setIsFavorite(!isFavorite)}
            >
              <Heart size={18} fill={isFavorite ? 'currentColor' : 'none'} className="animate-glow" />
            </button>
          </div>
          
          {/* Oynatma kontrolleri */}
          <div className="flex-1 max-w-2xl">
            <div className="flex justify-center items-center gap-6">
              <button className="text-gray-400 hover:text-white transform transition-all hover:scale-110">
                <Shuffle size={18} className="animate-glow" />
              </button>
              <button className="text-gray-400 hover:text-white transform transition-all hover:scale-110">
                <SkipBack size={20} className="animate-glow" />
              </button>
              <button 
                className="bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full p-3 hover:shadow-lg hover:shadow-blue-500/30 transform transition-all hover:scale-110"
                onClick={() => setIsPlaying(!isPlaying)}
              >
                {isPlaying ? 
                  <Pause size={22} className="animate-glow-white" /> : 
                  <Play size={22} fill="white" className="animate-glow-white ml-0.5" />}
              </button>
              <button className="text-gray-400 hover:text-white transform transition-all hover:scale-110">
                <SkipForward size={20} className="animate-glow" />
              </button>
              <button className="text-gray-400 hover:text-white transform transition-all hover:scale-110">
                <Repeat size={18} className="animate-glow" />
              </button>
            </div>
            
            {/* İlerleme bilgisi */}
            <div className="flex items-center text-xs mt-2 gap-2">
              <span className="text-gray-400">{formatTime(currentTime)}</span>
              <div className="flex-1">
                <input 
                  type="range" 
                  value={progress}
                  onChange={(e) => {
                    const newProgress = Number(e.target.value);
                    setProgress(newProgress);
                    setCurrentTime((newProgress / 100) * (currentSong.duration || 0));
                  }}
                  className="w-full h-1 appearance-none bg-transparent cursor-pointer [&::-webkit-slider-runnable-track]:rounded-full [&::-webkit-slider-runnable-track]:bg-gray-700/50 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:shadow-md"
                  min="0"
                  max="100"
                  step="0.1"
                />
              </div>
              <span className="text-gray-400">{formatTime(currentSong.duration)}</span>
            </div>
          </div>
          
          {/* Ekstra kontroller */}
          <div className="w-1/4 flex justify-end items-center gap-4">
            <button className="text-gray-400 hover:text-white transform transition-all hover:scale-110">
              <ListMusic size={18} className="animate-glow" />
            </button>
            
            <div className="flex items-center gap-2 group">
              <Volume2 size={18} className="text-gray-400 group-hover:text-white animate-glow" />
              <div className="w-20">
                <input 
                  type="range" 
                  value={volume}
                  onChange={(e) => setVolume(Number(e.target.value))}
                  className="w-full h-1 appearance-none bg-transparent cursor-pointer [&::-webkit-slider-runnable-track]:rounded-full [&::-webkit-slider-runnable-track]:bg-gray-700/50 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-2.5 [&::-webkit-slider-thumb]:w-2.5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:shadow-md"
                  min="0"
                  max="100"
                  step="1"
                />
              </div>
            </div>
            
            <button className="text-gray-400 hover:text-white transform transition-all hover:scale-110">
              <Maximize2 size={18} className="animate-glow" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MusicPlayer; 