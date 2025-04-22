// import rateLimit from 'express-rate-limit';
import { Request, Response, NextFunction } from 'express';
import logger from '../utils/logger.utils';

interface RequestHandler {
  (req: Request, res: Response, next: NextFunction): void;
}

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

// Basic rate limit middleware
function createRateLimit(options: { windowMs: number, max: number, message: string }): RequestHandler {
  const requests = new Map<string, { count: number, resetTime: number }>();
  
  return (req: Request, res: Response, next: NextFunction) => {
    const ip = req.ip || req.socket.remoteAddress || '';
    const now = Date.now();
    const resetTime = now + options.windowMs;
    
    if (!requests.has(ip)) {
      requests.set(ip, { count: 1, resetTime });
    } else {
      const request = requests.get(ip)!;
      
      // Reset if time expired
      if (now > request.resetTime) {
        request.count = 1;
        request.resetTime = resetTime;
      } else {
        request.count++;
      }
      
      if (request.count > options.max) {
        return res.status(429).json({ message: options.message });
      }
    }
    
    next();
  };
}

// API Rate Limiting
export const apiLimiter = createRateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again after 15 minutes',
});

// Login Rate Limiting
export const loginLimiter = createRateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 5, // limit each IP to 5 login requests per hour
  message: 'Too many login attempts from this IP, please try again after an hour',
});

// Register Rate Limiting
export const registerLimiter = createRateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 3, // limit each IP to 3 register attempts per hour
  message: 'Too many register attempts from this IP, please try again after an hour',
});

// Password Reset Rate Limiting
export const passwordResetLimiter = createRateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 3, // limit each IP to 3 password reset attempts per hour
  message: 'Too many password reset attempts from this IP, please try again after an hour',
});

// Kimlik doğrulama endpoint'leri için daha sıkı limit
export const authLimiter = createRateLimit({
  windowMs: 15 * 60 * 1000, // 15 dakika
  max: 50, // IP başına maksimum istek sayısı
  message: 'Çok fazla giriş denemesi, lütfen daha sonra tekrar deneyin',
});

// Arama endpoint'leri için özel limit
export const searchLimiter = createRateLimit({
  windowMs: 5 * 60 * 1000, // 5 dakika
  max: 200, // IP başına maksimum istek sayısı
  message: 'Çok fazla arama yaptınız, lütfen daha sonra tekrar deneyin',
});

// Kaynak tüketen API çağrıları için özel limit
export const heavyRequestLimiter = createRateLimit({
  windowMs: 10 * 60 * 1000, // 10 dakika
  max: 100, // IP başına maksimum istek sayısı
  message: 'Çok fazla istek yaptınız, lütfen daha sonra tekrar deneyin',
}); 