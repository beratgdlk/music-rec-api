import express from 'express';
import { 
  createPlaylist,
  getPlaylists,
  getPlaylistById,
  updatePlaylist,
  deletePlaylist,
  addSongToPlaylist,
  removeSongFromPlaylist,
  getUserPlaylists,
  getFeaturedPlaylists
} from '../controllers/playlist.controller';
import { authenticate, authorizePlaylistOwner } from '../middlewares/auth.middleware';

const router = express.Router();

// All routes require authentication
router.use(authenticate);

// Create a new playlist
router.post('/', createPlaylist);

// Get all public playlists
router.get('/', getPlaylists);

// Get featured playlists
router.get('/featured', getFeaturedPlaylists);

// Get user's playlists
router.get('/me', getUserPlaylists);

// Get playlist by ID
router.get('/:id', getPlaylistById);

// Update playlist - only owner
router.put('/:id', authorizePlaylistOwner, updatePlaylist);

// Delete playlist - only owner
router.delete('/:id', authorizePlaylistOwner, deletePlaylist);

// Add song to playlist - only owner
router.post('/:id/songs', authorizePlaylistOwner, addSongToPlaylist);

// Remove song from playlist - only owner
router.delete('/:id/songs/:songId', authorizePlaylistOwner, removeSongFromPlaylist);

export default router; 