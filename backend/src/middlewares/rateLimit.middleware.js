"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.heavyRequestLimiter = exports.searchLimiter = exports.authLimiter = exports.apiLimiter = void 0;
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const logger_utils_1 = __importDefault(require("../utils/logger.utils"));
// IP adresi kontrol fonksiyonu
const getClientIp = (req) => {
    return (req.headers['x-forwarded-for'] ||
        req.socket.remoteAddress ||
        'unknown-ip');
};
// Rate limit aşımında loglama
const handleRateLimitExceeded = (req, res) => {
    const ip = getClientIp(req);
    logger_utils_1.default.warn(`Rate limit exceeded for IP: ${ip}, Route: ${req.originalUrl}, Method: ${req.method}`);
};
// Genel API limiti
exports.apiLimiter = (0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000, // 15 dakika
    max: 1000, // IP başına maksimum istek sayısı
    standardHeaders: true,
    legacyHeaders: false,
    message: 'Çok fazla istek yaptınız, lütfen daha sonra tekrar deneyin',
    handler: (req, res) => {
        handleRateLimitExceeded(req, res);
        res.status(429).json({
            error: 'Çok fazla istek yaptınız, lütfen daha sonra tekrar deneyin',
        });
    },
});
// Kimlik doğrulama endpoint'leri için daha sıkı limit
exports.authLimiter = (0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000, // 15 dakika
    max: 50, // IP başına maksimum istek sayısı
    standardHeaders: true,
    legacyHeaders: false,
    message: 'Çok fazla giriş denemesi, lütfen daha sonra tekrar deneyin',
    handler: (req, res) => {
        handleRateLimitExceeded(req, res);
        res.status(429).json({
            error: 'Çok fazla giriş denemesi, lütfen daha sonra tekrar deneyin',
        });
    },
});
// Arama endpoint'leri için özel limit
exports.searchLimiter = (0, express_rate_limit_1.default)({
    windowMs: 5 * 60 * 1000, // 5 dakika
    max: 200, // IP başına maksimum istek sayısı
    standardHeaders: true,
    legacyHeaders: false,
    message: 'Çok fazla arama yaptınız, lütfen daha sonra tekrar deneyin',
    handler: (req, res) => {
        handleRateLimitExceeded(req, res);
        res.status(429).json({
            error: 'Çok fazla arama yaptınız, lütfen daha sonra tekrar deneyin',
        });
    },
});
// Kaynak tüketen API çağrıları için özel limit
exports.heavyRequestLimiter = (0, express_rate_limit_1.default)({
    windowMs: 10 * 60 * 1000, // 10 dakika
    max: 100, // IP başına maksimum istek sayısı
    standardHeaders: true,
    legacyHeaders: false,
    message: 'Çok fazla istek yaptınız, lütfen daha sonra tekrar deneyin',
    handler: (req, res) => {
        handleRateLimitExceeded(req, res);
        res.status(429).json({
            error: 'Çok fazla istek yaptınız, lütfen daha sonra tekrar deneyin',
        });
    },
});
