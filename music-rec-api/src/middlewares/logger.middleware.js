"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestLogger = void 0;
const logger_utils_1 = __importDefault(require("../utils/logger.utils"));
/**
 * HTTP isteklerini loglama middleware'i
 */
const requestLogger = (req, res, next) => {
    // İsteği logla
    logger_utils_1.default.http(`${req.method} ${req.originalUrl} [${req.ip}]`);
    // İstek başlama zamanını kaydet
    const start = Date.now();
    // Yanıt tamamlandığında
    res.on('finish', () => {
        // Geçen süreyi hesapla
        const duration = Date.now() - start;
        // Yanıtı logla
        const logMessage = `${req.method} ${req.originalUrl} ${res.statusCode} - ${duration}ms`;
        if (res.statusCode >= 400) {
            // Hata durumunda warn seviyesinde logla
            logger_utils_1.default.warn(logMessage);
        }
        else {
            // Normal yanıtları http seviyesinde logla
            logger_utils_1.default.http(logMessage);
        }
    });
    next();
};
exports.requestLogger = requestLogger;
