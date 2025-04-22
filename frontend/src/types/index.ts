// Kullanıcı tipi
export interface User {
  id?: string;
  email: string;
  username?: string;
  profilePicture?: string;
}

// Playlist tipi
export interface Playlist {
  id: number | string;
  name: string;
  description?: string;
  cover: string;
  count?: number;
  tracks?: Track[];
  createdBy?: string;
}

// Şarkı/Track tipi
export interface Track {
  id: number | string;
  title: string;
  artist: string;
  album?: string;
  cover: string;
  duration: string;
  audioUrl?: string;
  liked?: boolean;
}

// Albüm tipi
export interface Album {
  id: number | string;
  title: string;
  artist: string;
  cover: string;
  releaseYear?: number;
  tracks?: Track[];
}

// Radyo İstasyonu tipi
export interface RadioStation {
  id: number | string;
  name: string;
  genre?: string;
  cover: string;
  streamUrl?: string;
  listeners?: number;
}

// Podcast tipi
export interface Podcast {
  id: number | string;
  title: string;
  author: string;
  cover: string;
  description?: string;
  episodes?: PodcastEpisode[];
}

// Podcast Bölümü tipi
export interface PodcastEpisode {
  id: number | string;
  title: string;
  duration: string;
  publishDate: string;
  audioUrl?: string;
  description?: string;
}

// Bildirim tipi
export interface Notification {
  id: number | string;
  type: 'info' | 'success' | 'warning' | 'error';
  message: string;
  read: boolean;
  date: string;
}

// Oynatma Durumu tipi
export interface PlayerState {
  currentTrack: Track | null;
  isPlaying: boolean;
  volume: number;
  currentTime: number;
  duration: number;
  repeat: 'off' | 'one' | 'all';
  shuffle: boolean;
  queue: Track[];
} 