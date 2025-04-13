import { Request, Response } from 'express-serve-static-core';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import logger from '../utils/logger.utils';

// User registration
export const register = async (req: Request, res: Response) => {
  try {
    const { email, password, username, name, profileImage } = req.body;
    
    const authResult = await AuthService.register({
      email,
      password,
      username,
      name,
      profileImage
    });

    // Set HTTP-only cookie for refresh token
    res.cookie('refreshToken', authResult.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
      path: '/api/auth/refresh-token'
    });

    res.status(201).json({ 
      message: 'Kullanıcı başarıyla oluşturuldu',
      user: authResult.user,
      accessToken: authResult.accessToken
    });
  } catch (error: any) {
    logger.error(`Registration error: ${error.message}`);
    res.status(error.statusCode || 500).json({ 
      error: error.message || 'Sunucu hatası'
    });
  }
};

// User login
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    
    const authResult = await AuthService.login({
      email,
      password
    });

    // Set HTTP-only cookie for refresh token
    res.cookie('refreshToken', authResult.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
      path: '/api/auth/refresh-token'
    });

    res.json({
      message: 'Giriş başarılı',
      user: authResult.user,
      accessToken: authResult.accessToken
    });
  } catch (error: any) {
    logger.error(`Login error: ${error.message}`);
    res.status(error.statusCode || 500).json({ 
      error: error.message || 'Sunucu hatası'
    });
  }
};

// Refresh access token
export const refreshToken = async (req: Request, res: Response) => {
  try {
    // Refresh token'ı cookie'den veya body'den al
    const refreshToken = req.cookies?.refreshToken || req.body.refreshToken;
    
    if (!refreshToken) {
      return res.status(401).json({ error: 'Refresh token gerekiyor' });
    }
    
    const tokens = await AuthService.refreshToken({ refreshToken });

    // Set HTTP-only cookie for new refresh token
    res.cookie('refreshToken', tokens.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
      path: '/api/auth/refresh-token'
    });

    res.json({
      accessToken: tokens.accessToken
    });
  } catch (error: any) {
    logger.error(`Refresh token error: ${error.message}`);
    res.status(error.statusCode || 401).json({ 
      error: error.message || 'Geçersiz token'
    });
  }
};

// User logout
export const logout = async (req: Request, res: Response) => {
  try {
    // Refresh token'ı cookie'den veya body'den al
    const refreshToken = req.cookies?.refreshToken || req.body.refreshToken;
    
    if (refreshToken) {
      await AuthService.logout(refreshToken);
    }
    
    // Clear refresh token cookie
    res.clearCookie('refreshToken', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      path: '/api/auth/refresh-token'
    });

    res.json({ message: 'Çıkış başarılı' });
  } catch (error: any) {
    logger.error(`Logout error: ${error.message}`);
    res.status(500).json({ error: 'Çıkış yapılırken bir hata oluştu' });
  }
};

// Get user profile
export const getProfile = async (req: Request, res: Response) => {
  try {
    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({ error: 'Kimlik doğrulama hatası' });
    }

    // Use the user service instead of directly using prisma
    const user = await UserService.getUserById(userId);

    res.json(user);
  } catch (error: any) {
    logger.error(`Profile error: ${error.message}`);
    res.status(error.statusCode || 500).json({ 
      error: error.message || 'Sunucu hatası'
    });
  }
}; 