"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.notFound = exports.errorHandler = void 0;
const error_utils_1 = require("../utils/error.utils");
const env_1 = require("../config/env");
const logger_utils_1 = __importDefault(require("../utils/logger.utils"));
/**
 * Global error handling middleware
 */
const errorHandler = (err, req, res, next) => {
    // Hatayı logla
    logger_utils_1.default.error(`${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
    if (err.stack) {
        logger_utils_1.default.debug(err.stack);
    }
    // Default error
    let statusCode = 500;
    let message = 'Sunucu hatası';
    let stack = err.stack;
    // If known API error
    if (err instanceof error_utils_1.ApiError) {
        statusCode = err.statusCode;
        message = err.message;
    }
    // Send error response
    res.status(statusCode).json({
        success: false,
        error: Object.assign({ message }, (env_1.NODE_ENV === 'development' && { stack })),
    });
};
exports.errorHandler = errorHandler;
/**
 * 404 Not Found handler for undefined routes
 */
const notFound = (req, res, next) => {
    logger_utils_1.default.warn(`404 - ${req.originalUrl} - ${req.method} - ${req.ip}`);
    const error = new error_utils_1.ApiError(`Bulunamadı - ${req.originalUrl}`, 404);
    next(error);
};
exports.notFound = notFound;
