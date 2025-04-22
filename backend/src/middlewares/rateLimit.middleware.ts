import rateLimit from 'express-rate-limit';
import { Request, Response } from 'express-serve-static-core';
import logger from '../utils/logger.utils';

// IP adresi kontrol fonksiyonu
const getClientIp = (req: Request): string => {
  return (
    req.headers['x-forwarded-for'] as string ||
    req.socket.remoteAddress ||
    'unknown-ip'
  );
};

// Rate limit aşımında loglama
const handleRateLimitExceeded = (req: Request, res: Response): void => {
  const ip = getClientIp(req);
  logger.warn(`Rate limit exceeded for IP: ${ip}, Route: ${req.originalUrl}, Method: ${req.method}`);
};

// Genel API limiti
export const apiLimiter = rateLimit({
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
export const authLimiter = rateLimit({
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
export const searchLimiter = rateLimit({
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
export const heavyRequestLimiter = rateLimit({
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