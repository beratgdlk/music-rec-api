import express from 'express';
import { register, login, getProfile, refreshToken, logout } from '../controllers/auth.controller';
import { authenticate } from '../middlewares/auth.middleware';
import { validate } from '../middlewares/validation.middleware';
import { registerValidation, loginValidation } from '../validators/auth.validator';

const router = express.Router();

// User registration with validation
router.post('/register', validate(registerValidation), register);

// User login with validation
router.post('/login', validate(loginValidation), login);

// Refresh token
router.post('/refresh-token', refreshToken);

// Logout
router.post('/logout', logout);

// Get user profile - requires authentication
router.get('/profile', authenticate, getProfile);

export default router; 