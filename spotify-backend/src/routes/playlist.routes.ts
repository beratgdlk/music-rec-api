import express from 'express';
import { 
  createPlaylist,
  getPlaylists,
  getPlaylistById,
  updatePlaylist,
  deletePlaylist,
  addSongToPlaylist,
  removeSongFromPlaylist,
  getUserPlaylists
} from '../controllers/playlist.controller';
import { authenticate } from '../middlewares/auth.middleware';

const router = express.Router();

// Tüm rotalar yetkilendirme gerektirir
router.use(authenticate);

// Çalma listeleri oluşturma ve listeleme
router.post('/', createPlaylist);
router.get('/', getPlaylists);
router.get('/user/:userId', getUserPlaylists);

// Belirli çalma listesi işlemleri
router.get('/:id', getPlaylistById);
router.put('/:id', updatePlaylist);
router.delete('/:id', deletePlaylist);

// Çalma listesine şarkı ekleme ve çıkarma
router.post('/:id/songs', addSongToPlaylist);
router.delete('/:id/songs/:songId', removeSongFromPlaylist);

export default router; 