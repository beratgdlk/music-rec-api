import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import prisma from '../config/database';

// Tüm kullanıcıları getir
export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        username: true,
        name: true,
        profileImage: true,
        isAdmin: true,
        createdAt: true,
        updatedAt: true,
        // İlişkili verilerin sayısını getir
        _count: {
          select: {
            playlists: true,
            likedSongs: true,
            friends: true
          }
        }
      }
    });
    
    res.json(users);
  } catch (error) {
    console.error('Kullanıcıları getirme hatası:', error);
    res.status(500).json({ error: 'Sunucu hatası' });
  }
};

// Belirli bir kullanıcıyı getir
export const getUserById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId = req.userId; // Auth middleware'den gelen kullanıcı ID'si
    
    if (!userId) {
      return res.status(401).json({ error: 'Yetkilendirme hatası' });
    }
    
    // ID'nin sayı olduğundan emin ol
    const numericId = parseInt(id);
    if (isNaN(numericId)) {
      return res.status(400).json({ error: 'Geçersiz kullanıcı ID formatı' });
    }
    
    const user = await prisma.user.findUnique({
      where: { id: numericId },
      select: {
        id: true,
        email: true,
        username: true,
        name: true,
        profileImage: true,
        isAdmin: true,
        createdAt: true,
        updatedAt: true,
        // İlişkili veriler
        playlists: {
          where: { isPublic: true },
          select: {
            id: true,
            name: true,
            description: true,
            coverImage: true
          }
        },
        // Diğer ilişkili verilerin sayıları
        _count: {
          select: {
            likedSongs: true,
            friends: true
          }
        }
      }
    });
    
    if (!user) {
      return res.status(404).json({ error: 'Kullanıcı bulunamadı' });
    }
    
    res.json(user);
  } catch (error) {
    console.error('Kullanıcı getirme hatası:', error);
    res.status(500).json({ error: 'Sunucu hatası' });
  }
};

// Kullanıcıyı güncelle (sadece kullanıcının kendisi veya admin)
export const updateUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId = req.userId; // Auth middleware'den gelen kullanıcı ID'si
    
    if (!userId) {
      return res.status(401).json({ error: 'Yetkilendirme hatası' });
    }
    
    // ID'nin sayı olduğundan emin ol
    const numericId = parseInt(id);
    if (isNaN(numericId)) {
      return res.status(400).json({ error: 'Geçersiz kullanıcı ID formatı' });
    }
    
    // Sadece kendi profilini veya admin ise güncelleme yapabilir
    const currentUser = await prisma.user.findUnique({
      where: { id: userId },
      select: { isAdmin: true }
    });
    
    if (userId !== numericId && !currentUser?.isAdmin) {
      return res.status(403).json({ error: 'Bu işlem için yetkiniz yok' });
    }
    
    // Güncellenecek alanları al
    const { username, name, email, profileImage, password } = req.body;
    
    // Güncellenecek veri objesi
    const updateData: any = {};
    
    if (username) updateData.username = username;
    if (name) updateData.name = name;
    if (email) updateData.email = email;
    if (profileImage) updateData.profileImage = profileImage;
    
    // Şifre varsa hashle
    if (password) {
      updateData.password = await bcrypt.hash(password, 10);
    }
    
    // Kullanıcıyı güncelle
    const updatedUser = await prisma.user.update({
      where: { id: numericId },
      data: updateData,
      select: {
        id: true,
        email: true,
        username: true,
        name: true,
        profileImage: true,
        isAdmin: true,
        createdAt: true,
        updatedAt: true
      }
    });
    
    res.json({
      message: 'Kullanıcı başarıyla güncellendi',
      user: updatedUser
    });
  } catch (error) {
    console.error('Kullanıcı güncelleme hatası:', error);
    
    // Tekrar eden anahtar (unique) hatası kontrolü
    if (error && typeof error === 'object' && 'code' in error && error.code === 'P2002') {
      // Prisma hatası olduğundan emin olduktan sonra meta özelliğine erişebiliriz
      const prismaError = error as any;
      return res.status(400).json({ 
        error: `Bu ${prismaError.meta?.target?.[0]} zaten kullanılıyor` 
      });
    }
    
    res.status(500).json({ error: 'Sunucu hatası' });
  }
};

// Kullanıcıyı sil (sadece kullanıcının kendisi veya admin)
export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId = req.userId; // Auth middleware'den gelen kullanıcı ID'si
    
    if (!userId) {
      return res.status(401).json({ error: 'Yetkilendirme hatası' });
    }
    
    // ID'nin sayı olduğundan emin ol
    const numericId = parseInt(id);
    if (isNaN(numericId)) {
      return res.status(400).json({ error: 'Geçersiz kullanıcı ID formatı' });
    }
    
    // Sadece kendi profilini veya admin ise silebilir
    const currentUser = await prisma.user.findUnique({
      where: { id: userId },
      select: { isAdmin: true }
    });
    
    if (userId !== numericId && !currentUser?.isAdmin) {
      return res.status(403).json({ error: 'Bu işlem için yetkiniz yok' });
    }
    
    // Kullanıcıyı sil - cascade ilişkileri prisma şemasında tanımlanmış olmalı
    await prisma.user.delete({
      where: { id: numericId }
    });
    
    res.json({ message: 'Kullanıcı başarıyla silindi' });
  } catch (error) {
    console.error('Kullanıcı silme hatası:', error);
    res.status(500).json({ error: 'Sunucu hatası' });
  }
}; 