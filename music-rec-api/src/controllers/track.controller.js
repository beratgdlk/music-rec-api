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
exports.getTrackReviews = exports.addTrackReview = exports.getLikedTracks = exports.unlikeTrack = exports.likeTrack = exports.searchTracks = exports.getTrackById = exports.getTracks = void 0;
const track_service_1 = require("../services/track.service");
const logger_utils_1 = __importDefault(require("../utils/logger.utils"));
// Tüm şarkıları getir
const getTracks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { limit = '10', page = '1', genre } = req.query;
        // Parametreleri sayıya dönüştür
        const limitNum = parseInt(limit);
        const pageNum = parseInt(page);
        const result = yield track_service_1.TrackService.getTracks(limitNum, pageNum, genre);
        res.json(result);
    }
    catch (error) {
        logger_utils_1.default.error(`Şarkıları getirme hatası: ${error.message}`);
        res.status(error.statusCode || 500).json({ error: error.message || 'Sunucu hatası' });
    }
});
exports.getTracks = getTracks;
// Belirli bir şarkıyı getir
const getTrackById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        // ID'nin sayı olduğundan emin ol
        const numericId = parseInt(id);
        const song = yield track_service_1.TrackService.getTrackById(numericId);
        res.json(song);
    }
    catch (error) {
        logger_utils_1.default.error(`Şarkı getirme hatası: ${error.message}`);
        res.status(error.statusCode || 500).json({ error: error.message || 'Sunucu hatası' });
    }
});
exports.getTrackById = getTrackById;
// Şarkı ara
const searchTracks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { query, limit = '10', page = '1' } = req.query;
        // Parametreleri sayıya dönüştür
        const limitNum = parseInt(limit);
        const pageNum = parseInt(page);
        const result = yield track_service_1.TrackService.searchTracks(query, limitNum, pageNum);
        res.json(result);
    }
    catch (error) {
        logger_utils_1.default.error(`Şarkı arama hatası: ${error.message}`);
        res.status(error.statusCode || 500).json({ error: error.message || 'Sunucu hatası' });
    }
});
exports.searchTracks = searchTracks;
// Şarkıyı beğen
const likeTrack = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const userId = req.userId;
        if (!userId) {
            return res.status(401).json({ error: 'Yetkilendirme hatası' });
        }
        // ID'nin sayı olduğundan emin ol
        const trackId = parseInt(id);
        yield track_service_1.TrackService.likeTrack(userId, trackId);
        res.status(200).json({ message: 'Şarkı beğenildi' });
    }
    catch (error) {
        logger_utils_1.default.error(`Şarkı beğenme hatası: ${error.message}`);
        res.status(error.statusCode || 500).json({ error: error.message || 'Sunucu hatası' });
    }
});
exports.likeTrack = likeTrack;
// Şarkı beğenisini kaldır
const unlikeTrack = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const userId = req.userId;
        if (!userId) {
            return res.status(401).json({ error: 'Yetkilendirme hatası' });
        }
        // ID'nin sayı olduğundan emin ol
        const trackId = parseInt(id);
        yield track_service_1.TrackService.unlikeTrack(userId, trackId);
        res.status(200).json({ message: 'Şarkı beğenisi kaldırıldı' });
    }
    catch (error) {
        logger_utils_1.default.error(`Şarkı beğeni kaldırma hatası: ${error.message}`);
        res.status(error.statusCode || 500).json({ error: error.message || 'Sunucu hatası' });
    }
});
exports.unlikeTrack = unlikeTrack;
// Beğenilen şarkıları getir
const getLikedTracks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.userId;
        const { limit = '20', page = '1' } = req.query;
        if (!userId) {
            return res.status(401).json({ error: 'Yetkilendirme hatası' });
        }
        // Parametreleri sayıya dönüştür
        const limitNum = parseInt(limit);
        const pageNum = parseInt(page);
        const result = yield track_service_1.TrackService.getLikedTracks(userId, limitNum, pageNum);
        res.json(result);
    }
    catch (error) {
        logger_utils_1.default.error(`Beğenilen şarkıları getirme hatası: ${error.message}`);
        res.status(error.statusCode || 500).json({ error: error.message || 'Sunucu hatası' });
    }
});
exports.getLikedTracks = getLikedTracks;
// Şarkı değerlendirmesi ekle
const addTrackReview = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { content, rating } = req.body;
        const userId = req.userId;
        if (!userId) {
            return res.status(401).json({ error: 'Yetkilendirme hatası' });
        }
        if (!content) {
            return res.status(400).json({ error: 'Değerlendirme içeriği gerekli' });
        }
        // ID'nin sayı olduğundan emin ol
        const trackId = parseInt(id);
        const review = yield track_service_1.TrackService.addTrackReview(userId, {
            trackId,
            content,
            rating
        });
        res.status(201).json({
            message: 'Değerlendirme başarıyla eklendi',
            review
        });
    }
    catch (error) {
        logger_utils_1.default.error(`Şarkı değerlendirme ekleme hatası: ${error.message}`);
        res.status(error.statusCode || 500).json({ error: error.message || 'Sunucu hatası' });
    }
});
exports.addTrackReview = addTrackReview;
// Şarkı değerlendirmelerini getir
const getTrackReviews = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        // ID'nin sayı olduğundan emin ol
        const trackId = parseInt(id);
        const reviews = yield track_service_1.TrackService.getTrackReviews(trackId);
        res.json(reviews);
    }
    catch (error) {
        logger_utils_1.default.error(`Şarkı değerlendirmelerini getirme hatası: ${error.message}`);
        res.status(error.statusCode || 500).json({ error: error.message || 'Sunucu hatası' });
    }
});
exports.getTrackReviews = getTrackReviews;
