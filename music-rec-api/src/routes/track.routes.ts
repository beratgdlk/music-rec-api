import express from 'express';
import {
  /* addReview,
  getAllTracks, */
  getLikedTracks,
  /* getRelatedTracks, */
  getTrackById,
  getTrackReviews,
  likeTrack,
  searchTracks,
  unlikeTrack
} from '../controllers/track.controller';
import { authenticate } from '../middlewares/auth.middleware';
import { searchLimiter } from '../middlewares/rateLimit.middleware';

const router = express.Router();

// Get all tracks - public
/* router.get('/', getAllTracks); */

// Search tracks - public with rate limiting
router.get('/search', searchLimiter, searchTracks);

// Get user's liked tracks - requires authentication
router.get('/liked', authenticate, getLikedTracks);

// Get related tracks - public
/* router.get('/:id/related', getRelatedTracks); */

// Get track by ID - public
router.get('/:id', getTrackById);

// Like/unlike track - requires authentication
router.post('/:id/like', authenticate, likeTrack);
router.delete('/:id/like', authenticate, unlikeTrack);

// Track reviews - requires authentication for adding
router.get('/:id/reviews', getTrackReviews);
/* router.post('/:id/reviews', authenticate, addReview); */

export default router; 