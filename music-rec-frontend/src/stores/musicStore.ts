import { create } from 'zustand';
import { api } from '../services/api';

interface Song {
  id: string;
  title: string;
  artist: string;
  album?: string;
  genre?: string;
  year?: number;
  imageUrl?: string;
}

interface MusicState {
  recommendations: Song[];
  favorites: Song[];
  isLoading: boolean;
  error: string | null;
  fetchRecommendations: () => Promise<void>;
  fetchFavorites: () => Promise<void>;
  addToFavorites: (songId: string) => Promise<void>;
  removeFromFavorites: (songId: string) => Promise<void>;
}

export const useMusicStore = create<MusicState>((set, get) => ({
  recommendations: [],
  favorites: [],
  isLoading: false,
  error: null,

  // Müzik önerilerini getir
  fetchRecommendations: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await api.get('/recommendations');
      set({
        recommendations: response.data,
        isLoading: false
      });
    } catch (error: any) {
      set({
        error: error.response?.data?.message || 'Öneriler yüklenemedi',
        isLoading: false
      });
    }
  },

  // Favori müzikleri getir
  fetchFavorites: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await api.get('/favorites');
      set({
        favorites: response.data,
        isLoading: false
      });
    } catch (error: any) {
      set({
        error: error.response?.data?.message || 'Favoriler yüklenemedi',
        isLoading: false
      });
    }
  },

  // Favorilere ekle
  addToFavorites: async (songId: string) => {
    set({ isLoading: true, error: null });
    try {
      await api.post('/favorites', { songId });
      // Favorileri güncel tut
      await get().fetchFavorites();
    } catch (error: any) {
      set({
        error: error.response?.data?.message || 'Favorilere eklenemedi',
        isLoading: false
      });
    }
  },

  // Favorilerden çıkar
  removeFromFavorites: async (songId: string) => {
    set({ isLoading: true, error: null });
    try {
      await api.delete(`/favorites/${songId}`);
      // Favorileri güncel tut
      await get().fetchFavorites();
    } catch (error: any) {
      set({
        error: error.response?.data?.message || 'Favorilerden çıkarılamadı',
        isLoading: false
      });
    }
  }
})); 