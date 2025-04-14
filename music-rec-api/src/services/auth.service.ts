import prisma from "@db";
import {
  AuthResponse,
  RefreshTokenRequest,
  TokenResponse,
  UserLoginInput,
  UserRegisterInput
} from '../models/user.model';
import {
  comparePassword,
  generateRefreshToken,
  generateToken,
  getRefreshTokenExpiry
} from '../utils/auth.utils';
import { UnauthorizedError } from '../utils/error.utils';
import { UserService } from "./user.service";

/**
 * Kimlik doğrulama servisi
 */
export const AuthService = {
  /**
   * Kullanıcı kaydı
   */
  async register(userData: UserRegisterInput): Promise<AuthResponse> {
    // UserService'i kullanarak kullanıcı oluştur
    const newUser = await UserService.createUser(userData);
    
    // Tokenları oluştur
    const accessToken = generateToken(newUser.id);
    const refreshToken = generateRefreshToken();
    
    // Refresh token'ı veritabanına kaydet
    await prisma.refreshToken.create({
      data: {
        token: refreshToken,
        userId: newUser.id,
        expiresAt: getRefreshTokenExpiry()
      }
    });
    
    return {
      user: newUser,
      accessToken,
      refreshToken
    };
  },
  
  /**
   * Kullanıcı girişi
   */
  async login(loginData: UserLoginInput): Promise<AuthResponse> {
    // Email ile kullanıcıyı bul
    const user = await UserService.getUserByEmail(loginData.email);
    
    // Kullanıcı bulunamadıysa
    if (!user) {
      throw new UnauthorizedError('Geçersiz e-posta veya şifre');
    }
    
    // Şifre kontrolü
    const isPasswordValid = await comparePassword(
      loginData.password,
      user.password
    );
    
    if (!isPasswordValid) {
      throw new UnauthorizedError('Geçersiz e-posta veya şifre');
    }
    
    // Tokenları oluştur
    const accessToken = generateToken(user.id);
    const refreshToken = generateRefreshToken();
    
    // Refresh token'ı veritabanına kaydet
    await prisma.refreshToken.create({
      data: {
        token: refreshToken,
        userId: user.id,
        expiresAt: getRefreshTokenExpiry()
      }
    });
    
    // Password hariç kullanıcı bilgilerini döndür
    const { password, ...userWithoutPassword } = user;
    
    return {
      user: userWithoutPassword,
      accessToken,
      refreshToken
    };
  },

  /**
   * Refresh token ile yeni access token al
   */
  async refreshToken(refreshData: RefreshTokenRequest): Promise<TokenResponse> {
    const { refreshToken } = refreshData;

    // Refresh token'ı veritabanında ara
    const tokenRecord = await prisma.refreshToken.findUnique({
      where: { token: refreshToken },
      include: { user: true }
    });

    // Token bulunamadıysa veya iptal edildiyse
    if (!tokenRecord || tokenRecord.revoked) {
      throw new UnauthorizedError('Geçersiz refresh token');
    }

    // Token süresi dolduysa
    if (new Date() > tokenRecord.expiresAt) {
      // Süresi dolmuş token'ı iptal et
      await prisma.refreshToken.update({
        where: { id: tokenRecord.id },
        data: { revoked: true }
      });
      throw new UnauthorizedError('Refresh token süresi dolmuş');
    }

    // Eski token'ı iptal et
    await prisma.refreshToken.update({
      where: { id: tokenRecord.id },
      data: { revoked: true }
    });

    // Yeni tokenlar oluştur
    const accessToken = generateToken(tokenRecord.user.id);
    const newRefreshToken = generateRefreshToken();

    // Yeni refresh token'ı veritabanına kaydet
    await prisma.refreshToken.create({
      data: {
        token: newRefreshToken,
        userId: tokenRecord.user.id,
        expiresAt: getRefreshTokenExpiry()
      }
    });

    return {
      accessToken,
      refreshToken: newRefreshToken
    };
  },

  /**
   * Çıkış yap (refresh token'ı iptal et)
   */
  async logout(refreshToken: string): Promise<void> {
    if (!refreshToken) {
      return; // Token yoksa sessizce devam et
    }

    // Token'ı bul ve iptal et
    try {
      await prisma.refreshToken.updateMany({
        where: { token: refreshToken },
        data: { revoked: true }
      });
    } catch (error) {
      // Hata durumunda sessizce devam et
    }
  }
};