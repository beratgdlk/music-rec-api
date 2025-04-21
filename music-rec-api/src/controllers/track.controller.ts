import { Request, Response } from 'express';
import { TrackService } from '../services/track.service';
import logger from '../utils/logger.utils';

// Tüm şarkıları getir
export const getTracks = async (req: Request, res: Response) => {
  try {
    const { limit = '10', page = '1', genre } = req.query;
    
    // Parametreleri sayıya dönüştür
    const limitNum = parseInt(limit as string);
    const pageNum = parseInt(page as string);
    
    const result = await TrackService.getTracks(limitNum, pageNum, genre as string);
    
    res.json(result);
  } catch (error: any) {
    logger.error(`Şarkıları getirme hatası: ${error.message}`);
    res.status(error.statusCode || 500).json({ error: error.message || 'Sunucu hatası' });
  }
};

// Belirli bir şarkıyı getir
export const getTrackById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    // ID'nin sayı olduğundan emin ol
    const numericId = parseInt(id);
    
    const song = await TrackService.getTrackById(numericId);
    
    res.json(song);
  } catch (error: any) {
    logger.error(`Şarkı getirme hatası: ${error.message}`);
    res.status(error.statusCode || 500).json({ error: error.message || 'Sunucu hatası' });
  }
};

// Şarkı ara
export const searchTracks = async (req: Request, res: Response) => {
  try {
    const { query, limit = '10', page = '1' } = req.query;
    
    // Parametreleri sayıya dönüştür
    const limitNum = parseInt(limit as string);
    const pageNum = parseInt(page as string);
    
    const result = await TrackService.searchTracks(query as string, limitNum, pageNum);
    
    res.json(result);
  } catch (error: any) {
    logger.error(`Şarkı arama hatası: ${error.message}`);
    res.status(error.statusCode || 500).json({ error: error.message || 'Sunucu hatası' });
  }
};

// Şarkıyı beğen
export const likeTrack = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId = req.userId;
    
    if (!userId) {
      return res.status(401).json({ error: 'Yetkilendirme hatası' });
    }
    
    // ID'nin sayı olduğundan emin ol
    const trackId = parseInt(id);
    
    await TrackService.likeTrack(userId, trackId);
    
    res.status(200).json({ message: 'Şarkı beğenildi' });
  } catch (error: any) {
    logger.error(`Şarkı beğenme hatası: ${error.message}`);
    res.status(error.statusCode || 500).json({ error: error.message || 'Sunucu hatası' });
  }
};

// Şarkı beğenisini kaldır
export const unlikeTrack = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId = req.userId;
    
    if (!userId) {
      return res.status(401).json({ error: 'Yetkilendirme hatası' });
    }
    
    // ID'nin sayı olduğundan emin ol
    const trackId = parseInt(id);
    
    await TrackService.unlikeTrack(userId, trackId);
    
    res.status(200).json({ message: 'Şarkı beğenisi kaldırıldı' });
  } catch (error: any) {
    logger.error(`Şarkı beğeni kaldırma hatası: ${error.message}`);
    res.status(error.statusCode || 500).json({ error: error.message || 'Sunucu hatası' });
  }
};

// Beğenilen şarkıları getir
export const getLikedTracks = async (req: Request, res: Response) => {
  try {
    const userId = req.userId;
    const { limit = '20', page = '1' } = req.query;
    
    if (!userId) {
      return res.status(401).json({ error: 'Yetkilendirme hatası' });
    }
    
    // Parametreleri sayıya dönüştür
    const limitNum = parseInt(limit as string);
    const pageNum = parseInt(page as string);
    
    const result = await TrackService.getLikedTracks(userId, limitNum, pageNum);
    
    res.json(result);
  } catch (error: any) {
    logger.error(`Beğenilen şarkıları getirme hatası: ${error.message}`);
    res.status(error.statusCode || 500).json({ error: error.message || 'Sunucu hatası' });
  }
};

// Şarkı değerlendirmesi ekle
export const addTrackReview = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { content, rating } = req.body;
    const userId = req.userId;
    
    if (!userId) {
      return res.status(401).json({ error: 'Yetkilendirme hatası' });
    }
    
    if (!content) {
      return res.status(400).json({ error: 'Değerlendirme içeriği gerekli' });
    }
    
    // ID'nin sayı olduğundan emin ol
    const trackId = parseInt(id);
    
    const review = await TrackService.addTrackReview(userId, {
      trackId,
      content,
      rating
    });
    
    res.status(201).json({
      message: 'Değerlendirme başarıyla eklendi',
      review
    });
  } catch (error: any) {
    logger.error(`Şarkı değerlendirme ekleme hatası: ${error.message}`);
    res.status(error.statusCode || 500).json({ error: error.message || 'Sunucu hatası' });
  }
};

// Şarkı değerlendirmelerini getir
export const getTrackReviews = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    // ID'nin sayı olduğundan emin ol
    const trackId = parseInt(id);
    
    const reviews = await TrackService.getTrackReviews(trackId);
    
    res.json(reviews);
  } catch (error: any) {
    logger.error(`Şarkı değerlendirmelerini getirme hatası: ${error.message}`);
    res.status(error.statusCode || 500).json({ error: error.message || 'Sunucu hatası' });
  }
}; 