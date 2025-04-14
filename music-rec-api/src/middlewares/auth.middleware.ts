import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import prisma from '../config/database';

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
    return res.status(401).json({ error: 'Authentication token required' });
  }
  
  const token = authHeader.split(' ')[1];
  
  try {
    // Token'ı doğrula
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret-key') as { userId: number };
    
    // Kullanıcı ID'sini request'e ekle
    req.userId = decoded.userId;
    
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
};

// Çalma listesi sahibini doğrulayan middleware
export const authorizePlaylistOwner = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const userId = req.userId;
    
    if (!userId) {
      return res.status(401).json({ error: 'Authentication required' });
    }
    
    // ID'nin sayı olduğundan emin ol
    const playlistId = parseInt(id);
    if (isNaN(playlistId)) {
      return res.status(400).json({ error: 'Invalid playlist ID format' });
    }

    // Çalma listesinin sahibi olduğunu kontrol et
    const playlist = await prisma.playlist.findUnique({
      where: { id: playlistId },
      select: { ownerId: true }
    });

    if (!playlist) {
      return res.status(404).json({ error: 'Playlist not found' });
    }

    if (playlist.ownerId !== userId) {
      return res.status(403).json({ error: 'You do not have permission to modify this playlist' });
    }

    next();
  } catch (error) {
    console.error('Authorization error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Admin kullanıcıyı doğrulayan middleware
export const authorizeAdmin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.userId;
    
    if (!userId) {
      return res.status(401).json({ error: 'Authentication required' });
    }
    
    // Kullanıcının admin olup olmadığını kontrol et
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { isAdmin: true }
    });

    if (!user || !user.isAdmin) {
      return res.status(403).json({ error: 'Admin privileges required' });
    }

    next();
  } catch (error) {
    console.error('Admin authorization error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Kullanıcının kendisi veya admin olduğunu doğrulayan middleware
export const authorizeUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const userId = req.userId;
    
    if (!userId) {
      return res.status(401).json({ error: 'Authentication required' });
    }
    
    // ID'nin sayı olduğundan emin ol
    const targetUserId = parseInt(id);
    if (isNaN(targetUserId)) {
      return res.status(400).json({ error: 'Invalid user ID format' });
    }

    // Kullanıcının kendisi veya admin olup olmadığını kontrol et
    if (userId !== targetUserId) {
      const user = await prisma.user.findUnique({
        where: { id: userId },
        select: { isAdmin: true }
      });

      if (!user || !user.isAdmin) {
        return res.status(403).json({ error: 'You do not have permission to perform this action' });
      }
    }

    next();
  } catch (error) {
    console.error('User authorization error:', error);
    res.status(500).json({ error: 'Server error' });
  }
}; 