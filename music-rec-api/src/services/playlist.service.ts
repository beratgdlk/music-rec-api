import prisma from '../config/database';
import { BadRequestError, NotFoundError, ForbiddenError } from '../utils/error.utils';

/**
 * Çalma listesi servisi
 */
export const PlaylistService = {
  /**
   * Yeni çalma listesi oluştur
   */
  async createPlaylist(userId: number, playlistData: { name: string, description?: string, isPublic?: boolean, coverImage?: string }) {
    const { name, description, isPublic, coverImage } = playlistData;
    
    if (!name) {
      throw new BadRequestError('Çalma listesi adı gereklidir');
    }

    const playlist = await prisma.playlist.create({
      data: {
        name,
        description,
        isPublic: isPublic === undefined ? true : isPublic,
        coverImage,
        owner: {
          connect: { id: userId },
        },
      },
    });

    return playlist;
  },

  /**
   * Tüm herkese açık çalma listelerini getir
   */
  async getPublicPlaylists() {
    const playlists = await prisma.playlist.findMany({
      where: { isPublic: true },
      include: {
        owner: {
          select: {
            id: true,
            username: true,
            name: true,
            profileImage: true,
          },
        },
        _count: {
          select: { songs: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    return playlists;
  },

  /**
   * Kullanıcının kendi çalma listelerini getir
   */
  async getUserPlaylists(userId: number) {
    const playlists = await prisma.playlist.findMany({
      where: {
        ownerId: userId,
      },
      include: {
        _count: {
          select: { songs: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    return playlists;
  },

  /**
   * Belirli bir çalma listesini getir
   */
  async getPlaylistById(playlistId: number, userId: number) {
    if (isNaN(playlistId)) {
      throw new BadRequestError('Geçersiz çalma listesi ID formatı');
    }

    const playlist = await prisma.playlist.findUnique({
      where: { id: playlistId },
      include: {
        owner: {
          select: {
            id: true,
            username: true,
            name: true,
            profileImage: true,
          },
        },
        songs: {
          include: {
            song: {
              include: {
                artist: {
                  select: {
                    id: true,
                    name: true,
                  },
                },
                album: {
                  select: {
                    id: true,
                    title: true,
                    coverImage: true,
                  },
                },
              },
            },
          },
          orderBy: { order: 'asc' },
        },
      },
    });

    if (!playlist) {
      throw new NotFoundError('Çalma listesi bulunamadı');
    }

    // Çalma listesi gizli ve sahibi değilse erişimi engelle
    if (!playlist.isPublic && playlist.owner.id !== userId) {
      throw new ForbiddenError('Bu çalma listesine erişim izniniz yok');
    }

    return playlist;
  },

  /**
   * Çalma listesini güncelle
   */
  async updatePlaylist(
    playlistId: number, 
    userId: number, 
    updateData: { name?: string, description?: string, isPublic?: boolean, coverImage?: string }
  ) {
    if (isNaN(playlistId)) {
      throw new BadRequestError('Geçersiz çalma listesi ID formatı');
    }

    // Çalma listesinin sahibi olduğunu kontrol et
    const playlist = await prisma.playlist.findUnique({
      where: { id: playlistId },
      select: { ownerId: true },
    });

    if (!playlist) {
      throw new NotFoundError('Çalma listesi bulunamadı');
    }

    if (playlist.ownerId !== userId) {
      throw new ForbiddenError('Bu çalma listesini düzenleme yetkiniz yok');
    }

    // Çalma listesini güncelle
    const updatedPlaylist = await prisma.playlist.update({
      where: { id: playlistId },
      data: updateData,
    });

    return updatedPlaylist;
  },

  /**
   * Çalma listesini sil
   */
  async deletePlaylist(playlistId: number, userId: number) {
    if (isNaN(playlistId)) {
      throw new BadRequestError('Geçersiz çalma listesi ID formatı');
    }

    // Çalma listesinin sahibi olduğunu kontrol et
    const playlist = await prisma.playlist.findUnique({
      where: { id: playlistId },
      select: { ownerId: true },
    });

    if (!playlist) {
      throw new NotFoundError('Çalma listesi bulunamadı');
    }

    if (playlist.ownerId !== userId) {
      throw new ForbiddenError('Bu çalma listesini silme yetkiniz yok');
    }

    // Önce çalma listesindeki şarkıları sil (cascade delete ile otomatik olarak silinir)
    await prisma.playlist.delete({
      where: { id: playlistId },
    });
  },

  /**
   * Çalma listesine şarkı ekle
   */
  async addSongToPlaylist(playlistId: number, songId: number, userId: number) {
    if (isNaN(playlistId) || isNaN(songId)) {
      throw new BadRequestError('Geçersiz ID formatı');
    }

    // Çalma listesinin sahibi olduğunu kontrol et
    const playlist = await prisma.playlist.findUnique({
      where: { id: playlistId },
      select: { ownerId: true },
    });

    if (!playlist) {
      throw new NotFoundError('Çalma listesi bulunamadı');
    }

    if (playlist.ownerId !== userId) {
      throw new ForbiddenError('Bu çalma listesine şarkı ekleme yetkiniz yok');
    }

    // Şarkının var olduğunu kontrol et
    const song = await prisma.song.findUnique({
      where: { id: songId },
    });

    if (!song) {
      throw new NotFoundError('Şarkı bulunamadı');
    }

    // Şarkının zaten çalma listesinde olup olmadığını kontrol et
    const existingSong = await prisma.songPlaylist.findUnique({
      where: {
        playlistId_songId: {
          playlistId,
          songId,
        },
      },
    });

    if (existingSong) {
      throw new BadRequestError('Bu şarkı zaten çalma listesinde mevcut');
    }

    // Çalma listesindeki son sıra numarasını bul
    const lastOrderItem = await prisma.songPlaylist.findFirst({
      where: { playlistId },
      orderBy: { order: 'desc' },
      select: { order: true },
    });

    const nextOrder = lastOrderItem ? lastOrderItem.order + 1 : 1;

    // Şarkıyı çalma listesine ekle
    const playlistSong = await prisma.songPlaylist.create({
      data: {
        playlist: {
          connect: { id: playlistId },
        },
        song: {
          connect: { id: songId },
        },
        order: nextOrder,
      },
      include: {
        song: {
          include: {
            artist: true,
            album: true,
          },
        },
      },
    });

    return playlistSong;
  },

  /**
   * Çalma listesinden şarkı kaldır
   */
  async removeSongFromPlaylist(playlistId: number, songId: number, userId: number) {
    if (isNaN(playlistId) || isNaN(songId)) {
      throw new BadRequestError('Geçersiz ID formatı');
    }

    // Çalma listesinin sahibi olduğunu kontrol et
    const playlist = await prisma.playlist.findUnique({
      where: { id: playlistId },
      select: { ownerId: true },
    });

    if (!playlist) {
      throw new NotFoundError('Çalma listesi bulunamadı');
    }

    if (playlist.ownerId !== userId) {
      throw new ForbiddenError('Bu çalma listesinden şarkı kaldırma yetkiniz yok');
    }

    // Şarkının çalma listesinde olduğunu kontrol et
    const playlistSong = await prisma.songPlaylist.findUnique({
      where: {
        playlistId_songId: {
          playlistId,
          songId,
        },
      },
    });

    if (!playlistSong) {
      throw new NotFoundError('Bu şarkı çalma listesinde bulunamadı');
    }

    // Şarkıyı çalma listesinden kaldır
    await prisma.songPlaylist.delete({
      where: {
        playlistId_songId: {
          playlistId,
          songId,
        },
      },
    });

    // Sıralama düzenini güncelle
    const remainingSongs = await prisma.songPlaylist.findMany({
      where: { playlistId },
      orderBy: { order: 'asc' },
    });

    // Sıralamayı yeniden düzenle
    for (let i = 0; i < remainingSongs.length; i++) {
      await prisma.songPlaylist.update({
        where: {
          playlistId_songId: {
            playlistId,
            songId: remainingSongs[i].songId,
          },
        },
        data: { order: i + 1 },
      });
    }
  },

  /**
   * Öne çıkan çalma listelerini getir
   */
  async getFeaturedPlaylists() {
    // Bu fonksiyon, en çok şarkı içeren veya en popüler çalma listelerini getirebilir
    // Şimdilik sadece public çalma listelerinden ilk 5'ini getiriyoruz
    const featuredPlaylists = await prisma.playlist.findMany({
      where: { isPublic: true },
      include: {
        owner: {
          select: {
            id: true,
            username: true,
            name: true,
            profileImage: true,
          },
        },
        _count: {
          select: { songs: true },
        },
      },
      orderBy: { createdAt: 'desc' },
      take: 5,
    });

    return featuredPlaylists;
  },
}; 