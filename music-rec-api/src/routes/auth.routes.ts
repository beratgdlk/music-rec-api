import express from 'express';
import { register, login, getProfile } from '../controllers/auth.controller';
import { authenticate } from '../middlewares/auth.middleware';

const router = express.Router();

// User registration
router.post('/register', register);

// User login
router.post('/login', login);

// Get user profile - requires authentication
router.get('/profile', authenticate, getProfile);

export default router; 