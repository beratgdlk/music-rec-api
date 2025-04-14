import { Request, Response } from 'express';
import prisma from '../config/database';

// Tüm şarkıları getir
export const getTracks = async (req: Request, res: Response) => {
  try {
    const { limit = '10', page = '1', genre } = req.query;
    
    // Parametreleri sayıya dönüştür
    const limitNum = parseInt(limit as string);
    const pageNum = parseInt(page as string);
    
    if (isNaN(limitNum) || isNaN(pageNum) || limitNum < 1 || pageNum < 1) {
      return res.status(400).json({ error: 'Geçersiz limit veya sayfa numarası' });
    }
    
    const skip = (pageNum - 1) * limitNum;
    
    // Tür filtresi ekleme
    const where = genre 
      ? {
          album: {
            genres: {
              some: {
                genre: {
                  name: {
                    equals: genre as string,
                    mode: 'insensitive' as const
                  }
                }
              }
            }
          }
        } 
      : {};
    
    const [songs, total] = await Promise.all([
      prisma.song.findMany({
        where,
        include: {
          artist: {
            select: {
              id: true,
              name: true
            }
          },
          album: {
            select: {
              id: true,
              title: true,
              coverImage: true
            }
          },
          _count: {
            select: {
              likedBy: true,
              reviews: true
            }
          }
        },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limitNum
      }),
      prisma.song.count({ where })
    ]);
    
    const totalPages = Math.ceil(total / limitNum);
    
    res.json({
      data: songs,
      meta: {
        total,
        page: pageNum,
        limit: limitNum,
        totalPages
      }
    });
  } catch (error) {
    console.error('Şarkıları getirme hatası:', error);
    res.status(500).json({ error: 'Sunucu hatası' });
  }
};

// Belirli bir şarkıyı getir
export const getTrackById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    // ID'nin sayı olduğundan emin ol
    const numericId = parseInt(id);
    if (isNaN(numericId)) {
      return res.status(400).json({ error: 'Geçersiz şarkı ID formatı' });
    }
    
    const song = await prisma.song.findUnique({
      where: { id: numericId },
      include: {
        artist: true,
        album: {
          include: {
            genres: {
              include: {
                genre: true
              }
            }
          }
        },
        _count: {
          select: {
            likedBy: true,
            reviews: true,
            playlists: true
          }
        }
      }
    });
    
    if (!song) {
      return res.status(404).json({ error: 'Şarkı bulunamadı' });
    }
    
    res.json(song);
  } catch (error) {
    console.error('Şarkı getirme hatası:', error);
    res.status(500).json({ error: 'Sunucu hatası' });
  }
};

// Şarkı ara
export const searchTracks = async (req: Request, res: Response) => {
  try {
    const { query, limit = '10', page = '1' } = req.query;
    
    if (!query) {
      return res.status(400).json({ error: 'Arama sorgusu gerekli' });
    }
    
    // Parametreleri sayıya dönüştür
    const limitNum = parseInt(limit as string);
    const pageNum = parseInt(page as string);
    
    if (isNaN(limitNum) || isNaN(pageNum) || limitNum < 1 || pageNum < 1) {
      return res.status(400).json({ error: 'Geçersiz limit veya sayfa numarası' });
    }
    
    const skip = (pageNum - 1) * limitNum;
    
    const searchQuery = {
      OR: [
        { title: { contains: query as string, mode: 'insensitive' as const } },
        { artist: { name: { contains: query as string, mode: 'insensitive' as const } } },
        { album: { title: { contains: query as string, mode: 'insensitive' as const } } }
      ]
    };
    
    const [songs, total] = await Promise.all([
      prisma.song.findMany({
        where: searchQuery,
        include: {
          artist: {
            select: {
              id: true,
              name: true
            }
          },
          album: {
            select: {
              id: true,
              title: true,
              coverImage: true
            }
          }
        },
        orderBy: { title: 'asc' },
        skip,
        take: limitNum
      }),
      prisma.song.count({ where: searchQuery })
    ]);
    
    const totalPages = Math.ceil(total / limitNum);
    
    res.json({
      data: songs,
      meta: {
        total,
        page: pageNum,
        limit: limitNum,
        totalPages,
        query
      }
    });
  } catch (error) {
    console.error('Şarkı arama hatası:', error);
    res.status(500).json({ error: 'Sunucu hatası' });
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
    const numericId = parseInt(id);
    if (isNaN(numericId)) {
      return res.status(400).json({ error: 'Geçersiz şarkı ID formatı' });
    }
    
    // Şarkının var olduğunu kontrol et
    const song = await prisma.song.findUnique({
      where: { id: numericId }
    });
    
    if (!song) {
      return res.status(404).json({ error: 'Şarkı bulunamadı' });
    }
    
    // Şarkının zaten beğenilip beğenilmediğini kontrol et
    const existingLike = await prisma.likedSong.findUnique({
      where: {
        userId_songId: {
          userId,
          songId: numericId
        }
      }
    });
    
    if (existingLike) {
      return res.status(400).json({ error: 'Bu şarkıyı zaten beğendiniz' });
    }
    
    // Beğeniyi oluştur
    await prisma.likedSong.create({
      data: {
        user: { connect: { id: userId } },
        song: { connect: { id: numericId } }
      }
    });
    
    res.status(201).json({ message: 'Şarkı başarıyla beğenildi' });
  } catch (error) {
    console.error('Şarkı beğenme hatası:', error);
    res.status(500).json({ error: 'Sunucu hatası' });
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
    const numericId = parseInt(id);
    if (isNaN(numericId)) {
      return res.status(400).json({ error: 'Geçersiz şarkı ID formatı' });
    }
    
    // Beğeninin var olup olmadığını kontrol et
    const existingLike = await prisma.likedSong.findUnique({
      where: {
        userId_songId: {
          userId,
          songId: numericId
        }
      }
    });
    
    if (!existingLike) {
      return res.status(404).json({ error: 'Bu şarkıyı beğenmediniz' });
    }
    
    // Beğeniyi kaldır
    await prisma.likedSong.delete({
      where: {
        userId_songId: {
          userId,
          songId: numericId
        }
      }
    });
    
    res.json({ message: 'Şarkı beğenisi başarıyla kaldırıldı' });
  } catch (error) {
    console.error('Şarkı beğenisini kaldırma hatası:', error);
    res.status(500).json({ error: 'Sunucu hatası' });
  }
};

// Kullanıcının beğendiği şarkıları getir
export const getLikedTracks = async (req: Request, res: Response) => {
  try {
    const userId = req.userId;
    
    if (!userId) {
      return res.status(401).json({ error: 'Yetkilendirme hatası' });
    }
    
    const likedSongs = await prisma.likedSong.findMany({
      where: { userId },
      include: {
        song: {
          include: {
            artist: {
              select: {
                id: true,
                name: true
              }
            },
            album: {
              select: {
                id: true,
                title: true,
                coverImage: true
              }
            }
          }
        }
      },
      orderBy: { likedAt: 'desc' }
    });
    
    // Daha temiz bir yanıt formatı oluştur
    const formattedSongs = likedSongs.map((like: any) => ({
      ...like.song,
      likedAt: like.likedAt
    }));
    
    res.json(formattedSongs);
  } catch (error) {
    console.error('Beğenilen şarkıları getirme hatası:', error);
    res.status(500).json({ error: 'Sunucu hatası' });
  }
};

// Şarkıya yorum ekle
export const addTrackReview = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId = req.userId;
    const { content } = req.body;
    
    if (!content || content.trim() === '') {
      return res.status(400).json({ error: 'Yorum içeriği gereklidir' });
    }
    
    // ID'nin sayı olduğundan emin ol
    const numericId = parseInt(id);
    if (isNaN(numericId)) {
      return res.status(400).json({ error: 'Geçersiz şarkı ID formatı' });
    }
    
    // Şarkının var olduğunu kontrol et
    const song = await prisma.song.findUnique({
      where: { id: numericId }
    });
    
    if (!song) {
      return res.status(404).json({ error: 'Şarkı bulunamadı' });
    }
    
    // Kullanıcının zaten bu şarkıya yorum yapıp yapmadığını kontrol et
    const existingReview = await prisma.review.findFirst({
      where: {
        userId,
        songId: numericId
      }
    });
    
    if (existingReview) {
      // Varolan yorumu güncelle
      const updatedReview = await prisma.review.update({
        where: { id: existingReview.id },
        data: { content },
        include: {
          user: {
            select: {
              id: true,
              username: true,
              name: true,
              profileImage: true
            }
          }
        }
      });
      
      return res.json({
        message: 'Yorum başarıyla güncellendi',
        review: updatedReview
      });
    }
    
    // Yeni yorum oluştur
    const review = await prisma.review.create({
      data: {
        content,
        user: { connect: { id: userId } },
        song: { connect: { id: numericId } }
      },
      include: {
        user: {
          select: {
            id: true,
            username: true,
            name: true,
            profileImage: true
          }
        }
      }
    });
    
    res.status(201).json({
      message: 'Yorum başarıyla eklendi',
      review
    });
  } catch (error) {
    console.error('Yorum ekleme hatası:', error);
    res.status(500).json({ error: 'Sunucu hatası' });
  }
};

// Şarkı yorumlarını getir
export const getTrackReviews = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    // ID'nin sayı olduğundan emin ol
    const numericId = parseInt(id);
    if (isNaN(numericId)) {
      return res.status(400).json({ error: 'Geçersiz şarkı ID formatı' });
    }
    
    // Şarkının var olduğunu kontrol et
    const song = await prisma.song.findUnique({
      where: { id: numericId }
    });
    
    if (!song) {
      return res.status(404).json({ error: 'Şarkı bulunamadı' });
    }
    
    const reviews = await prisma.review.findMany({
      where: { songId: numericId },
      include: {
        user: {
          select: {
            id: true,
            username: true,
            name: true,
            profileImage: true
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    });
    
    res.json(reviews);
  } catch (error) {
    console.error('Yorumları getirme hatası:', error);
    res.status(500).json({ error: 'Sunucu hatası' });
  }
}; 