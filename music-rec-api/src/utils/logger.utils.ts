import winston from 'winston';
import path from 'path';
import fs from 'fs';
import { NODE_ENV } from '../config/env';

// Log dizini oluştur (yoksa)
const logDir = path.resolve(process.cwd(), 'logs');
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir, { recursive: true });
}

// Log seviyelerini tanımla
const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
};

// Çalışma ortamına göre log seviyesini belirle
const level = () => {
  return NODE_ENV === 'development' ? 'debug' : 'warn';
};

// Tarih ve saat formatını tanımla
const format = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  winston.format.printf(
    (info) => `${info.timestamp} ${info.level}: ${info.message}`
  )
);

// Transport'ları tanımla (nereye log yazılacak)
const transports = [
  // Konsola yazma
  new winston.transports.Console(),
  
  // Tüm loglar için dosya
  new winston.transports.File({ 
    filename: path.join(logDir, 'all.log')
  }),
  
  // Sadece hatalar için ayrı dosya
  new winston.transports.File({ 
    filename: path.join(logDir, 'error.log'),
    level: 'error' 
  }),
];

// Winston logger'ı oluştur
const logger = winston.createLogger({
  level: level(),
  levels,
  format,
  transports,
});

export default logger; 