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
exports.getPopular = exports.getRecommendations = void 0;
const recommendation_service_1 = require("../services/recommendation.service");
const logger_utils_1 = __importDefault(require("../utils/logger.utils"));
/**
 * Kullanıcı için şarkı önerileri al
 */
const getRecommendations = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.userId;
        const { limit = '10' } = req.query;
        logger_utils_1.default.info(`RecommendationController: userId=${userId}, auth header: ${req.headers.authorization}`);
        if (!userId) {
            return res.status(401).json({ error: 'Yetkilendirme hatası' });
        }
        // Parametreyi sayıya dönüştür
        const limitNum = parseInt(limit);
        const recommendations = yield recommendation_service_1.RecommendationService.getRecommendationsForUser(userId, limitNum);
        res.json({
            data: recommendations,
            meta: {
                count: recommendations.length
            }
        });
    }
    catch (error) {
        logger_utils_1.default.error(`Öneri getirme hatası: ${error.message}`);
        res.status(error.statusCode || 500).json({ error: error.message || 'Sunucu hatası' });
    }
});
exports.getRecommendations = getRecommendations;
/**
 * Popüler şarkılar - herkese açık
 */
const getPopular = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { limit = '10' } = req.query;
        // Parametreyi sayıya dönüştür
        const limitNum = parseInt(limit);
        const popularSongs = yield recommendation_service_1.RecommendationService.getPopularSongs(limitNum);
        res.json({
            data: popularSongs,
            meta: {
                count: popularSongs.length
            }
        });
    }
    catch (error) {
        logger_utils_1.default.error(`Popüler şarkıları getirme hatası: ${error.message}`);
        res.status(error.statusCode || 500).json({ error: error.message || 'Sunucu hatası' });
    }
});
exports.getPopular = getPopular;
