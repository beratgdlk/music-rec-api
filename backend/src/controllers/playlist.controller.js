"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFeaturedPlaylists = exports.removeSongFromPlaylist = exports.addSongToPlaylist = exports.deletePlaylist = exports.updatePlaylist = exports.getPlaylistById = exports.getUserPlaylists = exports.getPlaylists = exports.createPlaylist = void 0;
const playlist_service_1 = require("../services/playlist.service");
const logger_utils_1 = __importDefault(require("../utils/logger.utils"));
// Yeni çalma listesi oluştur
const createPlaylist = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.userId;
        if (!userId) {
            return res.status(401).json({ error: "Yetkilendirme hatası" });
        }
        const { name, description, isPublic, coverImage } = req.body;
        const playlist = yield playlist_service_1.PlaylistService.createPlaylist(userId, {
            name,
            description,
            isPublic,
            coverImage
        });
        res.status(201).json({
            message: "Çalma listesi başarıyla oluşturuldu",
            playlist,
        });
    }
    catch (error) {
        logger_utils_1.default.error(`Çalma listesi oluşturma hatası: ${error.message}`);
        res.status(error.statusCode || 500).json({ error: error.message || "Sunucu hatası" });
    }
});
exports.createPlaylist = createPlaylist;
// Tüm çalma listelerini getir (sadece herkese açık olanlar)
const getPlaylists = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const playlists = yield playlist_service_1.PlaylistService.getPublicPlaylists();
        res.json(playlists);
    }
    catch (error) {
        logger_utils_1.default.error(`Çalma listelerini getirme hatası: ${error.message}`);
        res.status(error.statusCode || 500).json({ error: error.message || "Sunucu hatası" });
    }
});
exports.getPlaylists = getPlaylists;
// Kullanıcının kendi çalma listelerini getir
const getUserPlaylists = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.userId;
        if (!userId) {
            return res.status(401).json({ error: "Authentication required" });
        }
        const playlists = yield playlist_service_1.PlaylistService.getUserPlaylists(userId);
        res.json(playlists);
    }
    catch (error) {
        logger_utils_1.default.error(`Error fetching user playlists: ${error.message}`);
        res.status(error.statusCode || 500).json({ error: error.message || "Server error" });
    }
});
exports.getUserPlaylists = getUserPlaylists;
// Belirli bir çalma listesini getir
const getPlaylistById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const userId = req.userId;
        if (!userId) {
            return res.status(401).json({ error: "Yetkilendirme hatası" });
        }
        // ID'nin sayı olduğundan emin ol
        const numericId = parseInt(id);
        const playlist = yield playlist_service_1.PlaylistService.getPlaylistById(numericId, userId);
        res.json(playlist);
    }
    catch (error) {
        logger_utils_1.default.error(`Çalma listesi getirme hatası: ${error.message}`);
        res.status(error.statusCode || 500).json({ error: error.message || "Sunucu hatası" });
    }
});
exports.getPlaylistById = getPlaylistById;
// Çalma listesini güncelle
const updatePlaylist = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const userId = req.userId;
        if (!userId) {
            return res.status(401).json({ error: "Yetkilendirme hatası" });
        }
        // ID'nin sayı olduğundan emin ol
        const numericId = parseInt(id);
        const { name, description, isPublic, coverImage } = req.body;
        const updatedPlaylist = yield playlist_service_1.PlaylistService.updatePlaylist(numericId, userId, {
            name,
            description,
            isPublic,
            coverImage
        });
        res.json({
            message: "Çalma listesi başarıyla güncellendi",
            playlist: updatedPlaylist,
        });
    }
    catch (error) {
        logger_utils_1.default.error(`Çalma listesi güncelleme hatası: ${error.message}`);
        res.status(error.statusCode || 500).json({ error: error.message || "Sunucu hatası" });
    }
});
exports.updatePlaylist = updatePlaylist;
// Çalma listesini sil
const deletePlaylist = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const userId = req.userId;
        if (!userId) {
            return res.status(401).json({ error: "Yetkilendirme hatası" });
        }
        // ID'nin sayı olduğundan emin ol
        const numericId = parseInt(id);
        yield playlist_service_1.PlaylistService.deletePlaylist(numericId, userId);
        res.json({ message: "Çalma listesi başarıyla silindi" });
    }
    catch (error) {
        logger_utils_1.default.error(`Çalma listesi silme hatası: ${error.message}`);
        res.status(error.statusCode || 500).json({ error: error.message || "Sunucu hatası" });
    }
});
exports.deletePlaylist = deletePlaylist;
// Çalma listesine şarkı ekle
const addSongToPlaylist = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { songId } = req.body;
        const userId = req.userId;
        if (!userId) {
            return res.status(401).json({ error: "Yetkilendirme hatası" });
        }
        // ID'lerin sayı olduğundan emin ol
        const playlistId = parseInt(id);
        const songIdNum = parseInt(songId);
        const result = yield playlist_service_1.PlaylistService.addSongToPlaylist(playlistId, songIdNum, userId);
        res.status(201).json({
            message: "Şarkı çalma listesine başarıyla eklendi",
            playlistSong: result,
        });
    }
    catch (error) {
        logger_utils_1.default.error(`Çalma listesine şarkı ekleme hatası: ${error.message}`);
        res.status(error.statusCode || 500).json({ error: error.message || "Sunucu hatası" });
    }
});
exports.addSongToPlaylist = addSongToPlaylist;
// Çalma listesinden şarkı kaldır
const removeSongFromPlaylist = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id, songId } = req.params;
        const userId = req.userId;
        if (!userId) {
            return res.status(401).json({ error: "Yetkilendirme hatası" });
        }
        // ID'lerin sayı olduğundan emin ol
        const playlistId = parseInt(id);
        const songIdNum = parseInt(songId);
        yield playlist_service_1.PlaylistService.removeSongFromPlaylist(playlistId, songIdNum, userId);
        res.json({ message: "Şarkı çalma listesinden başarıyla kaldırıldı" });
    }
    catch (error) {
        logger_utils_1.default.error(`Çalma listesinden şarkı kaldırma hatası: ${error.message}`);
        res.status(error.statusCode || 500).json({ error: error.message || "Sunucu hatası" });
    }
});
exports.removeSongFromPlaylist = removeSongFromPlaylist;
// Öne çıkan çalma listelerini getir
const getFeaturedPlaylists = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const featuredPlaylists = yield playlist_service_1.PlaylistService.getFeaturedPlaylists();
        res.json(featuredPlaylists);
    }
    catch (error) {
        logger_utils_1.default.error(`Öne çıkan çalma listelerini getirme hatası: ${error.message}`);
        res.status(error.statusCode || 500).json({ error: error.message || "Sunucu hatası" });
    }
});
exports.getFeaturedPlaylists = getFeaturedPlaylists;
