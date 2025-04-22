"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const track_controller_1 = require("../controllers/track.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const rateLimit_middleware_1 = require("../middlewares/rateLimit.middleware");
const router = express_1.default.Router();
// Get all tracks - public
router.get('/', track_controller_1.getTracks);
// Search tracks - public with rate limiting
router.get('/search', rateLimit_middleware_1.searchLimiter, track_controller_1.searchTracks);
// Get user's liked tracks - requires authentication
router.get('/liked', auth_middleware_1.authenticate, track_controller_1.getLikedTracks);
// Get track by ID - public
router.get('/:id', track_controller_1.getTrackById);
// Like/unlike track - requires authentication
router.post('/:id/like', auth_middleware_1.authenticate, track_controller_1.likeTrack);
router.delete('/:id/like', auth_middleware_1.authenticate, track_controller_1.unlikeTrack);
// Track reviews - requires authentication for adding
router.get('/:id/reviews', track_controller_1.getTrackReviews);
router.post('/:id/reviews', auth_middleware_1.authenticate, track_controller_1.addTrackReview);
exports.default = router;
