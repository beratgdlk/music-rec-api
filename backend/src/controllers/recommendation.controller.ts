import { Request, Response } from 'express';
import { RecommendationService } from '../services/recommendation.service';
import logger from '../utils/logger.utils';

/**
 * Kullanıcı için şarkı önerileri al
 */
export const getRecommendations = async (req: Request, res: Response) => {
  try {
    const userId = req.userId;
    const { limit = '10' } = req.query;
    
    logger.info(`RecommendationController: userId=${userId}, auth header: ${req.headers.authorization}`);
    
    if (!userId) {
      return res.status(401).json({ error: 'Yetkilendirme hatası' });
    }
    
    // Parametreyi sayıya dönüştür
    const limitNum = parseInt(limit as string);
    
    const recommendations = await RecommendationService.getRecommendationsForUser(userId, limitNum);
    
    res.json({
      data: recommendations,
      meta: {
        count: recommendations.length
      }
    });
  } catch (error: any) {
    logger.error(`Öneri getirme hatası: ${error.message}`);
    res.status(error.statusCode || 500).json({ error: error.message || 'Sunucu hatası' });
  }
};

/**
 * Popüler şarkılar - herkese açık
 */
export const getPopular = async (req: Request, res: Response) => {
  try {
    const { limit = '10' } = req.query;
    
    // Parametreyi sayıya dönüştür
    const limitNum = parseInt(limit as string);
    
    const popularSongs = await RecommendationService.getPopularSongs(limitNum);
    
    res.json({
      data: popularSongs,
      meta: {
        count: popularSongs.length
      }
    });
  } catch (error: any) {
    logger.error(`Popüler şarkıları getirme hatası: ${error.message}`);
    res.status(error.statusCode || 500).json({ error: error.message || 'Sunucu hatası' });
  }
}; 