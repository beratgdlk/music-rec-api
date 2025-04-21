import prisma from '../config/database';
import { BadRequestError, NotFoundError } from '../utils/error.utils';
import { TrackQueryParams, TrackReviewInput } from '../models/track.model';
import logger from '../utils/logger.utils';

/**
 * Parça servisi
 */
export const TrackService = {
  /**
   * Tüm parçaları getir
   */
  async getTracks(limit: number = 10, page: number = 1, genre?: string) {
    // Parametrelerin geçerli olduğundan emin ol
    if (isNaN(limit) || isNaN(page) || limit < 1 || page < 1) {
      throw new BadRequestError('Geçersiz limit veya sayfa numarası');
    }
    
    const skip = (page - 1) * limit;
    
    // Tür filtresi ekleme
    const where = genre 
      ? {
          album: {
            genres: {
              some: {
                genre: {
                  name: {
                    equals: genre,
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
        take: limit
      }),
      prisma.song.count({ where })
    ]);
    
    const totalPages = Math.ceil(total / limit);
    
    return {
      data: songs,
      meta: {
        total,
        page,
        limit,
        totalPages
      }
    };
  },
  
  /**
   * Belirli bir parçayı getir
   */
  async getTrackById(id: number) {
    if (isNaN(id)) {
      throw new BadRequestError('Geçersiz şarkı ID formatı');
    }
    
    const song = await prisma.song.findUnique({
      where: { id },
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
      throw new NotFoundError('Şarkı bulunamadı');
    }
    
    return song;
  },
  
  /**
   * Parçaları arama
   */
  async searchTracks(query: string, limit: number = 10, page: number = 1) {
    if (!query) {
      throw new BadRequestError('Arama sorgusu gerekli');
    }
    
    // Parametrelerin geçerli olduğundan emin ol
    if (isNaN(limit) || isNaN(page) || limit < 1 || page < 1) {
      throw new BadRequestError('Geçersiz limit veya sayfa numarası');
    }
    
    const skip = (page - 1) * limit;
    
    const searchQuery = {
      OR: [
        { title: { contains: query, mode: 'insensitive' as const } },
        { artist: { name: { contains: query, mode: 'insensitive' as const } } },
        { album: { title: { contains: query, mode: 'insensitive' as const } } }
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
        take: limit
      }),
      prisma.song.count({ where: searchQuery })
    ]);
    
    const totalPages = Math.ceil(total / limit);
    
    return {
      data: songs,
      meta: {
        total,
        page,
        limit,
        totalPages,
        query
      }
    };
  },
  
  /**
   * Parçayı beğen
   */
  async likeTrack(userId: number, trackId: number) {
    // Önce şarkının var olduğunu kontrol et
    const song = await prisma.song.findUnique({
      where: { id: trackId }
    });
    
    if (!song) {
      throw new NotFoundError('Şarkı bulunamadı');
    }
    
    // Kullanıcının bu şarkıyı daha önce beğenip beğenmediğini kontrol et
    const existingLike = await prisma.likedSong.findUnique({
      where: {
        userId_songId: {
          userId,
          songId: trackId
        }
      }
    });
    
    if (existingLike) {
      throw new BadRequestError('Bu şarkıyı zaten beğendiniz');
    }
    
    // Beğeniyi kaydet
    await prisma.likedSong.create({
      data: {
        user: {
          connect: { id: userId }
        },
        song: {
          connect: { id: trackId }
        }
      }
    });
  },
  
  /**
   * Parça beğenisini kaldır
   */
  async unlikeTrack(userId: number, trackId: number) {
    // Kullanıcının bu şarkıyı daha önce beğenip beğenmediğini kontrol et
    const existingLike = await prisma.likedSong.findUnique({
      where: {
        userId_songId: {
          userId,
          songId: trackId
        }
      }
    });
    
    if (!existingLike) {
      throw new BadRequestError('Bu şarkıyı beğenmediniz');
    }
    
    // Beğeniyi kaldır
    await prisma.likedSong.delete({
      where: {
        userId_songId: {
          userId,
          songId: trackId
        }
      }
    });
  },
  
  /**
   * Beğenilen parçaları getir
   */
  async getLikedTracks(userId: number, limit: number = 20, page: number = 1) {
    const skip = (page - 1) * limit;
    
    const [likedSongs, total] = await Promise.all([
      prisma.likedSong.findMany({
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
        orderBy: { likedAt: 'desc' },
        skip,
        take: limit
      }),
      prisma.likedSong.count({ where: { userId } })
    ]);
    
    const totalPages = Math.ceil(total / limit);
    
    return {
      data: likedSongs.map((like: any) => like.song),
      meta: {
        total,
        page,
        limit,
        totalPages
      }
    };
  },
  
  /**
   * Parça değerlendirmesi ekle
   */
  async addTrackReview(userId: number, reviewData: TrackReviewInput & { rating?: number }) {
    const { trackId, content, rating } = reviewData;
    
    // Parçanın var olduğunu kontrol et
    const song = await prisma.song.findUnique({
      where: { id: trackId }
    });
    
    if (!song) {
      throw new NotFoundError('Şarkı bulunamadı');
    }
    
    // Kullanıcının bu parçayı daha önce değerlendirip değerlendirmediğini kontrol et
    const existingReview = await prisma.review.findFirst({
      where: {
        userId,
        songId: trackId
      }
    });
    
    if (existingReview) {
      throw new BadRequestError('Bu şarkıyı zaten değerlendirdiniz');
    }
    
    // Değerlendirmeyi oluştur
    const review = await prisma.review.create({
      data: {
        content,
        user: {
          connect: { id: userId }
        },
        song: {
          connect: { id: trackId }
        }
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
    
    // Eğer rating verilmişse, puanlama da ekle
    if (rating !== undefined && rating >= 1 && rating <= 5) {
      await prisma.rating.create({
        data: {
          score: rating,
          user: {
            connect: { id: userId }
          },
          song: {
            connect: { id: trackId }
          }
        }
      });
    }
    
    return review;
  },
  
  /**
   * Parça değerlendirmelerini getir
   */
  async getTrackReviews(trackId: number) {
    // Parçanın var olduğunu kontrol et
    const song = await prisma.song.findUnique({
      where: { id: trackId }
    });
    
    if (!song) {
      throw new NotFoundError('Şarkı bulunamadı');
    }
    
    // Değerlendirmeleri getir
    const reviews = await prisma.review.findMany({
      where: { songId: trackId },
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
    
    return reviews;
  }
}; 