import prisma from '../config/database';
import { 
  TrackData, 
  TrackWithDetails, 
  TrackQueryParams,
  TrackReviewInput
} from '../models/track.model';
import { NotFoundError, BadRequestError } from '../utils/error.utils';

/**
 * Parça servisi
 */
export const TrackService = {
  /**
   * Tüm parçaları getir (sayfalama ve filtreleme destekler)
   */
  async getAllTracks(params: TrackQueryParams): Promise<TrackData[]> {
    const { 
      limit = 20, 
      offset = 0, 
      sort = 'title',
      order = 'asc',
      artistId,
      albumId 
    } = params;

    // Filtreleme şartlarını oluştur
    const where: any = {};
    
    if (artistId) {
      where.artistId = artistId;
    }
    
    if (albumId) {
      where.albumId = albumId;
    }

    // Parçaları al
    const tracks = await prisma.song.findMany({
      where,
      take: limit,
      skip: offset,
      orderBy: {
        [sort]: order,
      },
      include: {
        artist: {
          select: {
            id: true,
            name: true,
          }
        },
        album: {
          select: {
            id: true,
            title: true,
            coverImage: true,
          }
        }
      }
    });

    return tracks;
  },

  /**
   * ID'ye göre parça getir
   */
  async getTrackById(id: number): Promise<TrackWithDetails> {
    const track = await prisma.song.findUnique({
      where: { id },
      include: {
        artist: {
          select: {
            id: true,
            name: true,
          }
        },
        album: {
          select: {
            id: true,
            title: true,
            coverImage: true,
          }
        },
        reviews: {
          include: {
            user: {
              select: {
                id: true,
                username: true,
                profileImage: true,
              }
            }
          }
        },
        ratings: {
          select: {
            id: true,
            score: true,
            userId: true,
          }
        }
      }
    });

    if (!track) {
      throw new NotFoundError('Parça bulunamadı');
    }

    return track;
  },

  /**
   * Parçalar içinde arama yap
   */
  async searchTracks(query: string, limit: number = 20): Promise<TrackData[]> {
    if (!query || query.trim() === '') {
      throw new BadRequestError('Arama sorgusu gereklidir');
    }

    // Parçalarda arama yap
    const tracks = await prisma.song.findMany({
      where: {
        OR: [
          { title: { contains: query, mode: 'insensitive' } },
          { 
            artist: { 
              name: { contains: query, mode: 'insensitive' } 
            } 
          },
          { 
            album: { 
              title: { contains: query, mode: 'insensitive' } 
            } 
          }
        ]
      },
      take: limit,
      include: {
        artist: {
          select: {
            id: true,
            name: true,
          }
        },
        album: {
          select: {
            id: true,
            title: true,
            coverImage: true,
          }
        }
      }
    });

    return tracks;
  },

  /**
   * Parçaya ilgili diğer parçaları getir
   */
  async getRelatedTracks(trackId: number, limit: number = 5): Promise<TrackData[]> {
    // Önce parçayı bul
    const track = await prisma.song.findUnique({
      where: { id: trackId },
    });

    if (!track) {
      throw new NotFoundError('Parça bulunamadı');
    }

    // Aynı sanatçı veya albümden parçaları getir
    const relatedTracks = await prisma.song.findMany({
      where: {
        OR: [
          { artistId: track.artistId },
          { albumId: track.albumId }
        ],
        NOT: {
          id: trackId // Kendisini hariç tut
        }
      },
      take: limit,
      include: {
        artist: {
          select: {
            id: true,
            name: true,
          }
        },
        album: {
          select: {
            id: true,
            title: true,
            coverImage: true,
          }
        }
      }
    });

    return relatedTracks;
  },

  /**
   * Parçaya inceleme ekle
   */
  async addReview(userId: number, reviewData: TrackReviewInput): Promise<any> {
    const { trackId, content } = reviewData;

    // Parçanın varlığını kontrol et
    const track = await prisma.song.findUnique({
      where: { id: trackId },
    });

    if (!track) {
      throw new NotFoundError('Parça bulunamadı');
    }

    // Kullanıcının bu parça için zaten bir incelemesi var mı kontrol et
    const existingReview = await prisma.review.findFirst({
      where: {
        userId,
        songId: trackId
      }
    });

    if (existingReview) {
      // Mevcut incelemeyi güncelle
      return await prisma.review.update({
        where: { id: existingReview.id },
        data: { content },
      });
    }

    // Yeni inceleme oluştur
    return await prisma.review.create({
      data: {
        content,
        userId,
        songId: trackId,
      }
    });
  },

  /**
   * Parça incelemelerini getir
   */
  async getTrackReviews(trackId: number): Promise<any[]> {
    // Parçanın varlığını kontrol et
    const track = await prisma.song.findUnique({
      where: { id: trackId },
    });

    if (!track) {
      throw new NotFoundError('Parça bulunamadı');
    }

    // İncelemeleri getir
    const reviews = await prisma.review.findMany({
      where: { songId: trackId },
      include: {
        user: {
          select: {
            id: true,
            username: true,
            profileImage: true,
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    return reviews;
  },

  /**
   * Parçayı beğen
   */
  async likeTrack(userId: number, trackId: number): Promise<void> {
    // Parçanın varlığını kontrol et
    const track = await prisma.song.findUnique({
      where: { id: trackId },
    });

    if (!track) {
      throw new NotFoundError('Parça bulunamadı');
    }

    // Zaten beğenilmiş mi kontrol et
    const existingLike = await prisma.likedSong.findUnique({
      where: {
        userId_songId: {
          userId,
          songId: trackId,
        }
      }
    });

    if (existingLike) {
      return; // Zaten beğenilmiş
    }

    // Beğeniyi ekle
    await prisma.likedSong.create({
      data: {
        userId,
        songId: trackId,
      }
    });
  },

  /**
   * Parça beğenisini kaldır
   */
  async unlikeTrack(userId: number, trackId: number): Promise<void> {
    // Beğeniyi kaldır
    try {
      await prisma.likedSong.delete({
        where: {
          userId_songId: {
            userId,
            songId: trackId,
          }
        }
      });
    } catch (error) {
      // Beğeni yok ise hata verme
    }
  },

  /**
   * Kullanıcının beğendiği parçaları getir
   */
  async getLikedTracks(userId: number): Promise<TrackData[]> {
    const likedTracks = await prisma.likedSong.findMany({
      where: { userId },
      include: {
        song: {
          include: {
            artist: {
              select: {
                id: true,
                name: true,
              }
            },
            album: {
              select: {
                id: true,
                title: true,
                coverImage: true,
              }
            }
          }
        }
      },
      orderBy: { likedAt: 'desc' }
    });

    return likedTracks.map(liked => liked.song);
  },
}; 