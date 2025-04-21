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
  popularSongs: Song[];
  favorites: Song[];
  isLoading: boolean;
  error: string | null;
  fetchRecommendations: () => Promise<void>;
  fetchPopularSongs: () => Promise<void>;
  fetchFavorites: () => Promise<void>;
  addToFavorites: (songId: string) => Promise<void>;
  removeFromFavorites: (songId: string) => Promise<void>;
}

export const useMusicStore = create<MusicState>((set, get) => ({
  recommendations: [],
  popularSongs: [],
  favorites: [],
  isLoading: false,
  error: null,

  // Müzik önerilerini getir
  fetchRecommendations: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await api.get('/api/recommendations');
      set({
        recommendations: response.data.data || [],
        isLoading: false
      });
    } catch (error: any) {
      set({
        error: error.response?.data?.message || 'Öneriler yüklenemedi',
        isLoading: false
      });
    }
  },

  // Popüler şarkıları getir
  fetchPopularSongs: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await api.get('/api/recommendations/popular');
      set({
        popularSongs: response.data.data || [],
        isLoading: false
      });
    } catch (error: any) {
      set({
        error: error.response?.data?.message || 'Popüler şarkılar yüklenemedi',
        isLoading: false
      });
    }
  },

  // Favori müzikleri getir
  fetchFavorites: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await api.get('/api/tracks/liked');
      set({
        favorites: response.data.data || [],
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
      await api.post(`/api/tracks/${songId}/like`);
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
      await api.delete(`/api/tracks/${songId}/like`);
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