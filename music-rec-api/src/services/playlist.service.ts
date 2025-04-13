import prisma from '../config/database';
import { 
  PlaylistData, 
  PlaylistWithSongs,
  PlaylistCreateInput,
  PlaylistUpdateInput,
  PlaylistAddTrackInput
} from '../models/playlist.model';
import { NotFoundError, ForbiddenError } from '../utils/error.utils';

/**
 * Çalma listesi servisi
 */
export const PlaylistService = {
  /**
   * Tüm herkese açık çalma listelerini getir
   */
  async getPublicPlaylists(limit: number = 20, offset: number = 0): Promise<PlaylistData[]> {
    const playlists = await prisma.playlist.findMany({
      where: { isPublic: true },
      take: limit,
      skip: offset,
      include: {
        owner: {
          select: {
            id: true,
            username: true,
          }
        },
        songs: {
          select: {
            songId: true,
          }
        }
      },
      orderBy: { updatedAt: 'desc' }
    });

    // Şarkı sayısını ekle
    return playlists.map(playlist => ({
      ...playlist,
      trackCount: playlist.songs.length,
      songs: undefined // Gereksiz veriyi temizle
    }));
  },

  /**
   * Kullanıcıya ait çalma listelerini getir
   */
  async getUserPlaylists(userId: number): Promise<PlaylistData[]> {
    const playlists = await prisma.playlist.findMany({
      where: { ownerId: userId },
      include: {
        owner: {
          select: {
            id: true,
            username: true,
          }
        },
        songs: {
          select: {
            songId: true,
          }
        }
      },
      orderBy: { updatedAt: 'desc' }
    });

    // Şarkı sayısını ekle
    return playlists.map(playlist => ({
      ...playlist,
      trackCount: playlist.songs.length,
      songs: undefined // Gereksiz veriyi temizle
    }));
  },

  /**
   * ID'ye göre çalma listesi getir
   */
  async getPlaylistById(playlistId: number, userId?: number): Promise<PlaylistWithSongs> {
    const playlist = await prisma.playlist.findUnique({
      where: { id: playlistId },
      include: {
        owner: {
          select: {
            id: true,
            username: true,
          }
        },
        songs: {
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
          orderBy: { order: 'asc' }
        }
      }
    });

    if (!playlist) {
      throw new NotFoundError('Çalma listesi bulunamadı');
    }

    // Herkese açık değilse ve kullanıcı sahibi değilse erişimi reddet
    if (!playlist.isPublic && (!userId || playlist.ownerId !== userId)) {
      throw new ForbiddenError('Bu çalma listesine erişim izniniz yok');
    }

    // Şarkıları düzenle
    const formattedSongs = playlist.songs.map(item => ({
      ...item.song,
      order: item.order
    }));

    return {
      ...playlist,
      songs: formattedSongs
    };
  },

  /**
   * Yeni çalma listesi oluştur
   */
  async createPlaylist(userId: number, playlistData: PlaylistCreateInput): Promise<PlaylistData> {
    const newPlaylist = await prisma.playlist.create({
      data: {
        name: playlistData.name,
        description: playlistData.description,
        isPublic: playlistData.isPublic ?? true,
        coverImage: playlistData.coverImage,
        ownerId: userId,
      },
      include: {
        owner: {
          select: {
            id: true,
            username: true,
          }
        }
      }
    });

    return {
      ...newPlaylist,
      trackCount: 0
    };
  },

  /**
   * Çalma listesini güncelle
   */
  async updatePlaylist(
    playlistId: number,
    userId: number,
    updateData: PlaylistUpdateInput
  ): Promise<PlaylistData> {
    // Çalma listesini bul
    const playlist = await prisma.playlist.findUnique({
      where: { id: playlistId },
    });

    if (!playlist) {
      throw new NotFoundError('Çalma listesi bulunamadı');
    }

    // Sadece sahibinin güncellemesine izin ver
    if (playlist.ownerId !== userId) {
      throw new ForbiddenError('Bu çalma listesini düzenleme yetkiniz yok');
    }

    // Güncelle
    const updatedPlaylist = await prisma.playlist.update({
      where: { id: playlistId },
      data: updateData,
      include: {
        owner: {
          select: {
            id: true,
            username: true,
          }
        },
        songs: {
          select: {
            songId: true,
          }
        }
      }
    });

    return {
      ...updatedPlaylist,
      trackCount: updatedPlaylist.songs.length,
      songs: undefined
    };
  },

  /**
   * Çalma listesini sil
   */
  async deletePlaylist(playlistId: number, userId: number): Promise<void> {
    // Çalma listesini bul
    const playlist = await prisma.playlist.findUnique({
      where: { id: playlistId },
    });

    if (!playlist) {
      throw new NotFoundError('Çalma listesi bulunamadı');
    }

    // Sadece sahibinin silmesine izin ver
    if (playlist.ownerId !== userId) {
      throw new ForbiddenError('Bu çalma listesini silme yetkiniz yok');
    }

    // Önce ilişkili şarkıları sil (cascade delete yerine)
    await prisma.songPlaylist.deleteMany({
      where: { playlistId }
    });

    // Çalma listesini sil
    await prisma.playlist.delete({
      where: { id: playlistId }
    });
  },

  /**
   * Çalma listesine şarkı ekle
   */
  async addTrackToPlaylist(userId: number, data: PlaylistAddTrackInput): Promise<void> {
    const { playlistId, trackId, order } = data;

    // Çalma listesini bul
    const playlist = await prisma.playlist.findUnique({
      where: { id: playlistId },
    });

    if (!playlist) {
      throw new NotFoundError('Çalma listesi bulunamadı');
    }

    // Sadece sahibinin eklemesine izin ver
    if (playlist.ownerId !== userId) {
      throw new ForbiddenError('Bu çalma listesine şarkı ekleme yetkiniz yok');
    }

    // Şarkının varlığını kontrol et
    const track = await prisma.song.findUnique({
      where: { id: trackId },
    });

    if (!track) {
      throw new NotFoundError('Şarkı bulunamadı');
    }

    // Şarkı zaten eklenmişse güncelle
    const existingEntry = await prisma.songPlaylist.findUnique({
      where: {
        playlistId_songId: {
          playlistId,
          songId: trackId,
        }
      }
    });

    if (existingEntry) {
      if (order) {
        // Sırayı güncelle
        await prisma.songPlaylist.update({
          where: {
            playlistId_songId: {
              playlistId,
              songId: trackId,
            }
          },
          data: { order }
        });
      }
      return;
    }

    // Mevcut son sırayı bul
    let nextOrder = 1;
    if (!order) {
      const lastEntry = await prisma.songPlaylist.findFirst({
        where: { playlistId },
        orderBy: { order: 'desc' },
      });

      if (lastEntry) {
        nextOrder = lastEntry.order + 1;
      }
    }

    // Şarkıyı ekle
    await prisma.songPlaylist.create({
      data: {
        playlistId,
        songId: trackId,
        order: order || nextOrder,
      }
    });
  },

  /**
   * Çalma listesinden şarkı kaldır
   */
  async removeTrackFromPlaylist(userId: number, playlistId: number, trackId: number): Promise<void> {
    // Çalma listesini bul
    const playlist = await prisma.playlist.findUnique({
      where: { id: playlistId },
    });

    if (!playlist) {
      throw new NotFoundError('Çalma listesi bulunamadı');
    }

    // Sadece sahibinin kaldırmasına izin ver
    if (playlist.ownerId !== userId) {
      throw new ForbiddenError('Bu çalma listesinden şarkı kaldırma yetkiniz yok');
    }

    // Şarkıyı kaldır
    try {
      await prisma.songPlaylist.delete({
        where: {
          playlistId_songId: {
            playlistId,
            songId: trackId,
          }
        }
      });
    } catch (error) {
      // Şarkı zaten listede yoksa sessizce devam et
    }
  },
}; 