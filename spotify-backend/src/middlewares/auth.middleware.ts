import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// Request tipini genişlet
declare global {
  namespace Express {
    interface Request {
      userId?: number;
    }
  }
}

// JWT token'ı doğrulayan middleware
export const authenticate = (req: Request, res: Response, next: NextFunction) => {
  // Header'dan token al
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Yetkilendirme token\'ı gerekli' });
  }
  
  const token = authHeader.split(' ')[1];
  
  try {
    // Token'ı doğrula
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'gizli-anahtar') as { userId: number };
    
    // Kullanıcı ID'sini request'e ekle
    req.userId = decoded.userId;
    
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Geçersiz veya süresi dolmuş token' });
  }
}; 