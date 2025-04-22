import { useState, useEffect, useRef } from 'react';
import { Track, PlayerState } from '../types';

export function usePlayer() {
  const [playerState, setPlayerState] = useState<PlayerState>({
    currentTrack: null,
    isPlaying: false,
    volume: 0.7,
    currentTime: 0,
    duration: 0,
    repeat: 'off',
    shuffle: false,
    queue: [],
  });
  
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  // Audio nesnesini oluştur
  useEffect(() => {
    audioRef.current = new Audio();
    
    // Event listener'ları ekle
    if (audioRef.current) {
      const audio = audioRef.current;
      
      // Ses seviyesini ayarla
      audio.volume = playerState.volume;
      
      // Event listener'ları ekle
      audio.addEventListener('timeupdate', handleTimeUpdate);
      audio.addEventListener('loadedmetadata', handleMetadataLoaded);
      audio.addEventListener('ended', handleTrackEnded);
    }
    
    // Temizlik fonksiyonu
    return () => {
      if (audioRef.current) {
        const audio = audioRef.current;
        audio.pause();
        audio.removeEventListener('timeupdate', handleTimeUpdate);
        audio.removeEventListener('loadedmetadata', handleMetadataLoaded);
        audio.removeEventListener('ended', handleTrackEnded);
      }
    };
  }, []);
  
  // Şarkı değiştiğinde
  useEffect(() => {
    if (playerState.currentTrack && audioRef.current) {
      const audio = audioRef.current;
      
      // Eğer şarkının URL'i varsa ayarla
      if (playerState.currentTrack.audioUrl) {
        audio.src = playerState.currentTrack.audioUrl;
        audio.load();
        
        if (playerState.isPlaying) {
          audio.play().catch(error => {
            console.error('Şarkı oynatılamadı:', error);
          });
        }
      } else {
        // Gerçek bir audio URL yoksa simüle et
        setPlayerState(prev => ({
          ...prev,
          duration: 250, // Örnek süre: 4:10
          currentTime: 0,
        }));
      }
    }
  }, [playerState.currentTrack]);
  
  // Oynatma durumu değiştiğinde
  useEffect(() => {
    if (audioRef.current) {
      const audio = audioRef.current;
      
      if (playerState.isPlaying) {
        audio.play().catch(error => {
          console.error('Şarkı oynatılamadı:', error);
        });
      } else {
        audio.pause();
      }
    }
  }, [playerState.isPlaying]);
  
  // Ses seviyesi değiştiğinde
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = playerState.volume;
    }
  }, [playerState.volume]);
  
  // Event handler'lar
  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setPlayerState(prev => ({
        ...prev,
        currentTime: audioRef.current!.currentTime,
      }));
    }
  };
  
  const handleMetadataLoaded = () => {
    if (audioRef.current) {
      setPlayerState(prev => ({
        ...prev,
        duration: audioRef.current!.duration,
      }));
    }
  };
  
  const handleTrackEnded = () => {
    if (playerState.repeat === 'one') {
      // Şarkıyı tekrar oynat
      playTrack(playerState.currentTrack!);
    } else {
      // Sonraki şarkıya geç
      playNextTrack();
    }
  };
  
  // Oynatıcı kontrolleri
  const playTrack = (track: Track) => {
    setPlayerState(prev => ({
      ...prev,
      currentTrack: track,
      isPlaying: true,
    }));
  };
  
  const togglePlay = () => {
    setPlayerState(prev => ({
      ...prev,
      isPlaying: !prev.isPlaying,
    }));
  };
  
  const playNextTrack = () => {
    const { queue, currentTrack, shuffle } = playerState;
    
    if (queue.length === 0) return;
    
    let nextIndex = 0;
    
    // Mevcut şarkının indeksini bul
    if (currentTrack) {
      const currentIndex = queue.findIndex(track => 
        track.id === currentTrack.id
      );
      
      if (shuffle) {
        // Rastgele şarkı seç
        nextIndex = Math.floor(Math.random() * queue.length);
        // Aynı şarkıyı tekrar seçmemek için kontrol
        if (nextIndex === currentIndex && queue.length > 1) {
          nextIndex = (nextIndex + 1) % queue.length;
        }
      } else {
        // Sıradaki şarkıya geç
        nextIndex = (currentIndex + 1) % queue.length;
      }
    }
    
    // Bir sonraki şarkıyı oynat
    playTrack(queue[nextIndex]);
  };
  
  const playPrevTrack = () => {
    const { queue, currentTrack } = playerState;
    
    if (queue.length === 0 || !currentTrack) return;
    
    // Mevcut şarkının indeksini bul
    const currentIndex = queue.findIndex(track => 
      track.id === currentTrack.id
    );
    
    // Eğer şarkı 3 saniyeden fazla çalınmışsa, başa sar
    if (playerState.currentTime > 3) {
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
      }
      return;
    }
    
    // Önceki şarkıya geç
    const prevIndex = (currentIndex - 1 + queue.length) % queue.length;
    playTrack(queue[prevIndex]);
  };
  
  const setVolume = (volume: number) => {
    setPlayerState(prev => ({
      ...prev,
      volume: Math.max(0, Math.min(1, volume)),
    }));
  };
  
  const seekTo = (time: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time;
    }
    
    setPlayerState(prev => ({
      ...prev,
      currentTime: time,
    }));
  };
  
  const toggleRepeat = () => {
    setPlayerState(prev => ({
      ...prev,
      repeat: prev.repeat === 'off' ? 'all' : prev.repeat === 'all' ? 'one' : 'off',
    }));
  };
  
  const toggleShuffle = () => {
    setPlayerState(prev => ({
      ...prev,
      shuffle: !prev.shuffle,
    }));
  };
  
  const addToQueue = (track: Track) => {
    setPlayerState(prev => ({
      ...prev,
      queue: [...prev.queue, track],
    }));
  };
  
  const clearQueue = () => {
    setPlayerState(prev => ({
      ...prev,
      queue: [],
    }));
  };
  
  const setQueue = (tracks: Track[]) => {
    setPlayerState(prev => ({
      ...prev,
      queue: tracks,
    }));
  };

  return {
    ...playerState,
    playTrack,
    togglePlay,
    playNextTrack,
    playPrevTrack,
    setVolume,
    seekTo,
    toggleRepeat,
    toggleShuffle,
    addToQueue,
    clearQueue,
    setQueue,
  };
} 