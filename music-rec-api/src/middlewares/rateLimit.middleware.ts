import rateLimit from 'express-rate-limit';

// Genel API rate limiter
export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 dakika
  max: 100, // IP başına maksimum istek sayısı
  message: 'Çok fazla istek gönderdiniz, lütfen daha sonra tekrar deneyin.'
});

// Kimlik doğrulama rate limiter
export const authLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 saat
  max: 5, // IP başına maksimum başarısız giriş denemesi
  message: 'Çok fazla başarısız giriş denemesi, lütfen daha sonra tekrar deneyin.'
});

// Admin rate limiter
export const adminLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 dakika
  max: 30, // IP başına maksimum istek sayısı
  message: 'Çok fazla admin isteği gönderdiniz, lütfen daha sonra tekrar deneyin.'
}); 