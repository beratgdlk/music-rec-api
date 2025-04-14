import { Request, Response } from "express";

import prisma from "../config/database";

// Yeni çalma listesi oluştur
export const createPlaylist = async (req: Request, res: Response) => {
  try {
    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({ error: "Yetkilendirme hatası" });
    }

    const { name, description, isPublic, coverImage } = req.body;

    if (!name) {
      return res.status(400).json({ error: "Çalma listesi adı gereklidir" });
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

    res.status(201).json({
      message: "Çalma listesi başarıyla oluşturuldu",
      playlist,
    });
  } catch (error) {
    console.error("Çalma listesi oluşturma hatası:", error);
    res.status(500).json({ error: "Sunucu hatası" });
  }
};

// Tüm çalma listelerini getir (sadece herkese açık olanlar)
export const getPlaylists = async (req: Request, res: Response) => {
  try {
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
      orderBy: { createdAt: "desc" },
    });

    res.json(playlists);
  } catch (error) {
    console.error("Çalma listelerini getirme hatası:", error);
    res.status(500).json({ error: "Sunucu hatası" });
  }
};

// Kullanıcının kendi çalma listelerini getir
export const getUserPlaylists = async (req: Request, res: Response) => {
  try {
    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({ error: "Authentication required" });
    }

    const playlists = await prisma.playlist.findMany({
      where: {
        ownerId: userId,
      },
      include: {
        _count: {
          select: { songs: true },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    res.json(playlists);
  } catch (error) {
    console.error("Error fetching user playlists:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// Belirli bir çalma listesini getir
export const getPlaylistById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({ error: "Yetkilendirme hatası" });
    }

    // ID'nin sayı olduğundan emin ol
    const numericId = parseInt(id);
    if (isNaN(numericId)) {
      return res
        .status(400)
        .json({ error: "Geçersiz çalma listesi ID formatı" });
    }

    const playlist = await prisma.playlist.findUnique({
      where: { id: numericId },
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
          orderBy: { order: "asc" },
        },
      },
    });

    if (!playlist) {
      return res.status(404).json({ error: "Çalma listesi bulunamadı" });
    }

    // Çalma listesi gizli ve sahibi değilse erişimi engelle
    if (!playlist.isPublic && playlist.owner.id !== userId) {
      return res
        .status(403)
        .json({ error: "Bu çalma listesine erişim izniniz yok" });
    }

    res.json(playlist);
  } catch (error) {
    console.error("Çalma listesi getirme hatası:", error);
    res.status(500).json({ error: "Sunucu hatası" });
  }
};

// Çalma listesini güncelle
export const updatePlaylist = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({ error: "Yetkilendirme hatası" });
    }

    // ID'nin sayı olduğundan emin ol
    const numericId = parseInt(id);
    if (isNaN(numericId)) {
      return res
        .status(400)
        .json({ error: "Geçersiz çalma listesi ID formatı" });
    }

    // Çalma listesinin sahibi olduğunu kontrol et
    const playlist = await prisma.playlist.findUnique({
      where: { id: numericId },
      select: { ownerId: true },
    });

    if (!playlist) {
      return res.status(404).json({ error: "Çalma listesi bulunamadı" });
    }

    if (playlist.ownerId !== userId) {
      return res
        .status(403)
        .json({ error: "Bu çalma listesini değiştirme izniniz yok" });
    }

    const { name, description, isPublic, coverImage } = req.body;

    const updatedPlaylist = await prisma.playlist.update({
      where: { id: numericId },
      data: {
        ...(name && { name }),
        ...(description !== undefined && { description }),
        ...(isPublic !== undefined && { isPublic }),
        ...(coverImage !== undefined && { coverImage }),
      },
    });

    res.json({
      message: "Çalma listesi başarıyla güncellendi",
      playlist: updatedPlaylist,
    });
  } catch (error) {
    console.error("Çalma listesi güncelleme hatası:", error);
    res.status(500).json({ error: "Sunucu hatası" });
  }
};

// Çalma listesini sil
export const deletePlaylist = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({ error: "Yetkilendirme hatası" });
    }

    // ID'nin sayı olduğundan emin ol
    const numericId = parseInt(id);
    if (isNaN(numericId)) {
      return res
        .status(400)
        .json({ error: "Geçersiz çalma listesi ID formatı" });
    }

    // Çalma listesinin sahibi olduğunu kontrol et
    const playlist = await prisma.playlist.findUnique({
      where: { id: numericId },
      select: { ownerId: true },
    });

    if (!playlist) {
      return res.status(404).json({ error: "Çalma listesi bulunamadı" });
    }

    if (playlist.ownerId !== userId) {
      return res
        .status(403)
        .json({ error: "Bu çalma listesini silme izniniz yok" });
    }

    // Önce ilişkili kayıtları sil
    await prisma.songPlaylist.deleteMany({
      where: { playlistId: numericId },
    });

    // Sonra çalma listesini sil
    await prisma.playlist.delete({
      where: { id: numericId },
    });

    res.json({ message: "Çalma listesi başarıyla silindi" });
  } catch (error) {
    console.error("Çalma listesi silme hatası:", error);
    res.status(500).json({ error: "Sunucu hatası" });
  }
};

// Çalma listesine şarkı ekle
export const addSongToPlaylist = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { songId, order } = req.body;
    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({ error: "Yetkilendirme hatası" });
    }

    // ID'lerin sayı olduğundan emin ol
    const numericId = parseInt(id);
    const numericSongId = parseInt(songId);

    if (isNaN(numericId) || isNaN(numericSongId)) {
      return res.status(400).json({ error: "Geçersiz ID formatı" });
    }

    // Çalma listesinin sahibi olduğunu kontrol et
    const playlist = await prisma.playlist.findUnique({
      where: { id: numericId },
      select: { ownerId: true },
    });

    if (!playlist) {
      return res.status(404).json({ error: "Çalma listesi bulunamadı" });
    }

    if (playlist.ownerId !== userId) {
      return res
        .status(403)
        .json({ error: "Bu çalma listesine şarkı ekleme izniniz yok" });
    }

    // Şarkının var olduğunu kontrol et
    const song = await prisma.song.findUnique({
      where: { id: numericSongId },
    });

    if (!song) {
      return res.status(404).json({ error: "Şarkı bulunamadı" });
    }

    // Şarkının çalma listesinde olup olmadığını kontrol et
    const existingSong = await prisma.songPlaylist.findUnique({
      where: {
        playlistId_songId: {
          playlistId: numericId,
          songId: numericSongId,
        },
      },
    });

    if (existingSong) {
      return res.status(400).json({ error: "Bu şarkı zaten çalma listesinde" });
    }

    // Son sıra numarasını bul
    const lastSong = await prisma.songPlaylist.findFirst({
      where: { playlistId: numericId },
      orderBy: { order: "desc" },
      select: { order: true },
    });

    const nextOrder = order || (lastSong ? lastSong.order + 1 : 1);

    // Şarkıyı çalma listesine ekle
    await prisma.songPlaylist.create({
      data: {
        playlist: { connect: { id: numericId } },
        song: { connect: { id: numericSongId } },
        order: nextOrder,
      },
    });

    res.status(201).json({
      message: "Şarkı çalma listesine başarıyla eklendi",
      playlistId: numericId,
      songId: numericSongId,
      order: nextOrder,
    });
  } catch (error) {
    console.error("Şarkı ekleme hatası:", error);
    res.status(500).json({ error: "Sunucu hatası" });
  }
};

// Çalma listesinden şarkı çıkar
export const removeSongFromPlaylist = async (req: Request, res: Response) => {
  try {
    const { id, songId } = req.params;
    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({ error: "Yetkilendirme hatası" });
    }

    // ID'lerin sayı olduğundan emin ol
    const numericId = parseInt(id);
    const numericSongId = parseInt(songId);

    if (isNaN(numericId) || isNaN(numericSongId)) {
      return res.status(400).json({ error: "Geçersiz ID formatı" });
    }

    // Çalma listesinin sahibi olduğunu kontrol et
    const playlist = await prisma.playlist.findUnique({
      where: { id: numericId },
      select: { ownerId: true },
    });

    if (!playlist) {
      return res.status(404).json({ error: "Çalma listesi bulunamadı" });
    }

    if (playlist.ownerId !== userId) {
      return res
        .status(403)
        .json({ error: "Bu çalma listesinden şarkı çıkarma izniniz yok" });
    }

    // Şarkının çalma listesinde olup olmadığını kontrol et
    const playlistSong = await prisma.songPlaylist.findUnique({
      where: {
        playlistId_songId: {
          playlistId: numericId,
          songId: numericSongId,
        },
      },
    });

    if (!playlistSong) {
      return res
        .status(404)
        .json({ error: "Bu şarkı çalma listesinde bulunamadı" });
    }

    // Şarkıyı çalma listesinden çıkar
    await prisma.songPlaylist.delete({
      where: {
        playlistId_songId: {
          playlistId: numericId,
          songId: numericSongId,
        },
      },
    });

    // Sıralama numaralarını yeniden düzenle
    const playlistSongs = await prisma.songPlaylist.findMany({
      where: { playlistId: numericId },
      orderBy: { order: "asc" },
    });

    // Her şarkı için sırasını güncelle
    for (let i = 0; i < playlistSongs.length; i++) {
      await prisma.songPlaylist.update({
        where: {
          playlistId_songId: {
            playlistId: numericId,
            songId: playlistSongs[i].songId,
          },
        },
        data: { order: i + 1 },
      });
    }

    res.json({ message: "Şarkı çalma listesinden başarıyla çıkarıldı" });
  } catch (error) {
    console.error("Şarkı çıkarma hatası:", error);
    res.status(500).json({ error: "Sunucu hatası" });
  }
};

// Öne çıkan çalma listelerini getir
export const getFeaturedPlaylists = async (req: Request, res: Response) => {
  try {
    // Rastgele 5 popüler çalma listesi getir
    const featuredPlaylists = await prisma.playlist.findMany({
      where: {
        isPublic: true,
      },
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
      orderBy: [{ updatedAt: "desc" }],
      take: 5,
    });

    res.json(featuredPlaylists);
  } catch (error) {
    console.error("Featured playlists error:", error);
    res.status(500).json({ error: "Server error" });
  }
};
