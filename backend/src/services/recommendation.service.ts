import prisma from '../config/database';
import { BadRequestError, NotFoundError } from '../utils/error.utils';
import logger from '../utils/logger.utils';

/**
 * Öneri Servisi
 */
export const RecommendationService = {
  /**
   * Kullanıcı için şarkı önerileri al
   * Collaborative filtering yaklaşımı kullanır:
   * 1. Kullanıcının beğendiği şarkıları bulur
   * 2. Benzer beğenilere sahip diğer kullanıcıları bulur
   * 3. Bu kullanıcıların beğendiği, ancak hedef kullanıcının henüz beğenmediği şarkıları önerir
   */
  async getRecommendationsForUser(userId: number, limit: number = 10) {
    // Kullanıcının varlığını kontrol et
    const user = await prisma.user.findUnique({
      where: { id: userId }
    });

    if (!user) {
      throw new NotFoundError('Kullanıcı bulunamadı');
    }

    // Kullanıcının beğendiği şarkıları bul
    const userLikes = await prisma.likedSong.findMany({
      where: { userId },
      select: { songId: true }
    });

    // Kullanıcı henüz hiç şarkı beğenmediyse, popüler şarkıları öner
    if (userLikes.length === 0) {
      return this.getPopularSongs(limit);
    }

    // Kullanıcının beğendiği şarkı ID'leri
    const userLikedSongIds = userLikes.map(like => like.songId);

    // Kullanıcının beğendiği şarkıları beğenen diğer kullanıcıları bul
    const similarUsers = await prisma.likedSong.findMany({
      where: {
        songId: { in: userLikedSongIds },
        userId: { not: userId } // Kendimizi hariç tutuyoruz
      },
      select: { userId: true },
      distinct: ['userId']
    });

    const similarUserIds = similarUsers.map(user => user.userId);

    // Benzer kullanıcılar bulunamadıysa, tür bazlı öneriler sun
    if (similarUserIds.length === 0) {
      return this.getRecommendationsByGenre(userId, limit);
    }

    // Benzer kullanıcıların beğendiği ama bu kullanıcının beğenmediği şarkılar
    const recommendedSongs = await prisma.song.findMany({
      where: {
        likedBy: {
          some: {
            userId: { in: similarUserIds }
          }
        },
        // Kullanıcının zaten beğendiği şarkıları hariç tut
        id: {
          notIn: userLikedSongIds
        }
      },
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
            likedBy: true
          }
        }
      },
      orderBy: [
        // Beğeni sayısına göre sırala
        { likedBy: { _count: 'desc' } },
        // Sonra yeni eklenen şarkıları öne çıkar
        { createdAt: 'desc' }
      ],
      take: limit
    });

    return recommendedSongs;
  },

  /**
   * Popüler şarkıları getir (en çok beğenilen)
   */
  async getPopularSongs(limit: number = 10) {
    return prisma.song.findMany({
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
            reviews: true
          }
        }
      },
      orderBy: {
        likedBy: {
          _count: 'desc'
        }
      },
      take: limit
    });
  },

  /**
   * Kullanıcının beğendiği müzik türlerine göre şarkı önerileri
   */
  async getRecommendationsByGenre(userId: number, limit: number = 10) {
    // Kullanıcının beğendiği şarkıların türlerini bul
    const likedGenres = await prisma.likedSong.findMany({
      where: { userId },
      select: {
        song: {
          select: {
            album: {
              select: {
                genres: {
                  select: {
                    genreId: true
                  }
                }
              }
            }
          }
        }
      }
    });

    // Tüm genreId'leri topla
    const genreIds = new Set<number>();
    likedGenres.forEach(like => {
      like.song.album?.genres.forEach(g => {
        if (g.genreId) genreIds.add(g.genreId);
      });
    });

    // Türlere göre şarkı önerisi
    if (genreIds.size > 0) {
      // Kullanıcının beğendiği şarkıları bul
      const userLikes = await prisma.likedSong.findMany({
        where: { userId },
        select: { songId: true }
      });

      const userLikedSongIds = userLikes.map(like => like.songId);

      return prisma.song.findMany({
        where: {
          album: {
            genres: {
              some: {
                genreId: { in: Array.from(genreIds) }
              }
            }
          },
          // Kullanıcının zaten beğendiği şarkıları hariç tut
          id: {
            notIn: userLikedSongIds
          }
        },
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
              likedBy: true
            }
          }
        },
        orderBy: [
          { likedBy: { _count: 'desc' } },
          { createdAt: 'desc' }
        ],
        take: limit
      });
    }

    // Hiçbir tür bulunamazsa, popüler şarkıları döndür
    return this.getPopularSongs(limit);
  }
}; 