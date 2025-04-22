import prisma from '../config/database';
import {
  UserData,
  UserRegisterInput,
  UserUpdateInput
} from '../models/user.model';
import { hashPassword } from '../utils/auth.utils';
import { NotFoundError, BadRequestError } from '../utils/error.utils';

/**
 * Kullanıcı servisi
 */
export const UserService = {
  /**
   * Tüm kullanıcıları getir
   */
  async getAllUsers(): Promise<UserData[]> {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        username: true,
        email: true,
        name: true,
        profileImage: true,
        isAdmin: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    return users;
  },

  /**
   * ID'ye göre kullanıcı getir
   */
  async getUserById(id: number): Promise<UserData> {
    const user = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        username: true,
        email: true,
        name: true,
        profileImage: true,
        isAdmin: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!user) {
      throw new NotFoundError('Kullanıcı bulunamadı');
    }

    return user;
  },

  /**
   * Email ile kullanıcı getir (kimlik doğrulama için)
   */
  async getUserByEmail(email: string) {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    return user;
  },

  /**
   * Yeni kullanıcı oluştur
   */
  async createUser(userData: UserRegisterInput): Promise<UserData> {
    // Email veya kullanıcı adının kullanımda olup olmadığını kontrol et
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [
          { email: userData.email },
          { username: userData.username },
        ],
      },
    });

    if (existingUser) {
      if (existingUser.email === userData.email) {
        throw new BadRequestError('Bu e-posta adresi zaten kullanımda');
      }
      if (existingUser.username === userData.username) {
        throw new BadRequestError('Bu kullanıcı adı zaten kullanımda');
      }
    }

    // Şifreyi hashle
    const hashedPassword = await hashPassword(userData.password);

    // Kullanıcı oluştur
    const newUser = await prisma.user.create({
      data: {
        ...userData,
        password: hashedPassword,
      },
      select: {
        id: true,
        username: true,
        email: true,
        name: true,
        profileImage: true,
        isAdmin: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return newUser;
  },

  /**
   * Kullanıcı bilgilerini güncelle
   */
  async updateUser(id: number, updateData: UserUpdateInput): Promise<UserData> {
    // Şifre varsa hashle
    if (updateData.password) {
      updateData.password = await hashPassword(updateData.password);
    }

    // Kullanıcı güncelle
    try {
      const updatedUser = await prisma.user.update({
        where: { id },
        data: updateData,
        select: {
          id: true,
          username: true,
          email: true,
          name: true,
          profileImage: true,
          isAdmin: true,
          createdAt: true,
          updatedAt: true,
        },
      });

      return updatedUser;
    } catch (error) {
      throw new NotFoundError('Kullanıcı bulunamadı');
    }
  },

  /**
   * Kullanıcı sil
   */
  async deleteUser(id: number): Promise<void> {
    try {
      await prisma.user.delete({
        where: { id },
      });
    } catch (error) {
      throw new NotFoundError('Kullanıcı bulunamadı');
    }
  },
}; 