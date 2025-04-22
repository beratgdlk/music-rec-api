import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Track, PlayerState } from '../types';
import { usePlayer } from '../hooks/usePlayer';

interface PlayerContextType extends PlayerState {
  playTrack: (track: Track) => void;
  togglePlay: () => void;
  playNextTrack: () => void;
  playPrevTrack: () => void;
  setVolume: (volume: number) => void;
  seekTo: (time: number) => void;
  toggleRepeat: () => void;
  toggleShuffle: () => void;
  addToQueue: (track: Track) => void;
  clearQueue: () => void;
  setQueue: (tracks: Track[]) => void;
}

const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

export function PlayerProvider({ children }: { children: ReactNode }) {
  const player = usePlayer();

  return (
    <PlayerContext.Provider value={player}>
      {children}
    </PlayerContext.Provider>
  );
}

export function usePlayerContext() {
  const context = useContext(PlayerContext);
  
  if (context === undefined) {
    throw new Error('usePlayerContext must be used within a PlayerProvider');
  }
  
  return context;
} 