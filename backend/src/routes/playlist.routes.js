"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const playlist_controller_1 = require("../controllers/playlist.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const router = express_1.default.Router();
// All routes require authentication
router.use(auth_middleware_1.authenticate);
// Create a new playlist
router.post("/", playlist_controller_1.createPlaylist);
// Get all public playlists
router.get("/", playlist_controller_1.getPlaylists);
// Get featured playlists
router.get("/featured", playlist_controller_1.getFeaturedPlaylists);
// Get user's playlists
router.get("/me", playlist_controller_1.getUserPlaylists);
// Get playlist by ID
router.get("/:id", playlist_controller_1.getPlaylistById);
// Update playlist - only owner
router.put("/:id", auth_middleware_1.authorizePlaylistOwner, playlist_controller_1.updatePlaylist);
// Delete playlist - only owner
router.delete("/:id", auth_middleware_1.authorizePlaylistOwner, playlist_controller_1.deletePlaylist);
// Add song to playlist - only owner
router.post("/:id/songs", auth_middleware_1.authorizePlaylistOwner, playlist_controller_1.addSongToPlaylist);
// Remove song from playlist - only owner
router.delete("/:id/songs/:songId", auth_middleware_1.authorizePlaylistOwner, playlist_controller_1.removeSongFromPlaylist);
exports.default = router;
