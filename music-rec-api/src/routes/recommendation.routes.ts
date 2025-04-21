import express from 'express';
import { getRecommendations, getPopular } from '../controllers/recommendation.controller';
import { authenticate } from '../middlewares/auth.middleware';

const router = express.Router();

// Kişiselleştirilmiş öneriler - kimlik doğrulama gerekiyor
router.get('/', authenticate, getRecommendations);

// Popüler şarkılar - herkes erişebilir
router.get('/popular', getPopular);

export default router; 