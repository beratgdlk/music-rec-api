import { UserService } from './user.service';
import { comparePassword, generateToken } from '../utils/auth.utils';
import { 
  UserRegisterInput, 
  UserLoginInput, 
  AuthResponse 
} from '../models/user.model';
import { UnauthorizedError, BadRequestError } from '../utils/error.utils';

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
    
    // JWT token oluştur
    const token = generateToken(newUser.id);
    
    return {
      user: newUser,
      token,
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
    
    // JWT token oluştur
    const token = generateToken(user.id);
    
    // Password hariç kullanıcı bilgilerini döndür
    const { password, ...userWithoutPassword } = user;
    
    return {
      user: userWithoutPassword,
      token,
    };
  },
};