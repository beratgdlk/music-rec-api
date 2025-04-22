import { Request, Response, NextFunction } from 'express-serve-static-core';
import logger from '../utils/logger.utils';

/**
 * HTTP isteklerini loglama middleware'i
 */
export const requestLogger = (req: Request, res: Response, next: NextFunction) => {
  // İsteği logla
  logger.http(
    `${req.method} ${req.originalUrl} [${req.ip}]`
  );
  
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
      logger.warn(logMessage);
    } else {
      // Normal yanıtları http seviyesinde logla
      logger.http(logMessage);
    }
  });
  
  next();
}; 