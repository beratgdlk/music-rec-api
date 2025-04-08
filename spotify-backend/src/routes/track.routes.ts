import express from 'express';
import { 
  getTracks,
  getTrackById,
  searchTracks,
  likeTrack,
  unlikeTrack,
  getLikedTracks,
  addTrackReview,
  getTrackReviews
} from '../controllers/track.controller';
import { authenticate } from '../middlewares/auth.middleware';

const router = express.Router();

// Herkese açık rotalar
router.get('/', getTracks);
router.get('/search', searchTracks);
router.get('/:id', getTrackById);
router.get('/:id/reviews', getTrackReviews);

// Yetkilendirme gerektiren rotalar - bunları authenticate ile koruyoruz
router.post('/:id/like', authenticate, likeTrack);
router.delete('/:id/like', authenticate, unlikeTrack);
router.get('/user/liked', authenticate, getLikedTracks);
router.post('/:id/reviews', authenticate, addTrackReview);

export default router; 