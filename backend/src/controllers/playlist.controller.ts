import { Request, Response } from "express";
import { PlaylistService } from "../services/playlist.service";
import logger from "../utils/logger.utils";

// Yeni çalma listesi oluştur
export const createPlaylist = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const userId = req.userId;

    if (!userId) {
      res.status(401).json({ error: "Yetkilendirme hatası" });
      return;
    }

    const { name, description, isPublic, coverImage } = req.body;

    const playlist = await PlaylistService.createPlaylist(userId, {
      name,
      description,
      isPublic,
      coverImage,
    });

    res.status(201).json({
      message: "Çalma listesi başarıyla oluşturuldu",
      playlist,
    });
  } catch (error: any) {
    logger.error(`Çalma listesi oluşturma hatası: ${error.message}`);
    res
      .status(error.statusCode || 500)
      .json({ error: error.message || "Sunucu hatası" });
  }
};

// Tüm çalma listelerini getir (sadece herkese açık olanlar)
export const getPlaylists = async (req: Request, res: Response) => {
  try {
    const playlists = await PlaylistService.getPublicPlaylists();
    res.json(playlists);
  } catch (error: any) {
    logger.error(`Çalma listelerini getirme hatası: ${error.message}`);
    res
      .status(error.statusCode || 500)
      .json({ error: error.message || "Sunucu hatası" });
  }
};

// Kullanıcının kendi çalma listelerini getir
export const getUserPlaylists = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const userId = req.userId;

    if (!userId) {
      res.status(401).json({ error: "Authentication required" });
      return;
    }

    const playlists = await PlaylistService.getUserPlaylists(userId);
    res.json(playlists);
  } catch (error: any) {
    logger.error(`Error fetching user playlists: ${error.message}`);
    res
      .status(error.statusCode || 500)
      .json({ error: error.message || "Server error" });
  }
};

// Belirli bir çalma listesini getir
export const getPlaylistById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const userId = req.userId;

    if (!userId) {
      res.status(401).json({ error: "Yetkilendirme hatası" });
      return;
    }

    // ID'nin sayı olduğundan emin ol
    const numericId = parseInt(id);
    const playlist = await PlaylistService.getPlaylistById(numericId, userId);
    res.json(playlist);
  } catch (error: any) {
    logger.error(`Çalma listesi getirme hatası: ${error.message}`);
    res
      .status(error.statusCode || 500)
      .json({ error: error.message || "Sunucu hatası" });
  }
};

// Çalma listesini güncelle
export const updatePlaylist = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const userId = req.userId;

    if (!userId) {
      res.status(401).json({ error: "Yetkilendirme hatası" });
      return;
    }

    // ID'nin sayı olduğundan emin ol
    const numericId = parseInt(id);
    const { name, description, isPublic, coverImage } = req.body;

    const updatedPlaylist = await PlaylistService.updatePlaylist(
      numericId,
      userId,
      {
        name,
        description,
        isPublic,
        coverImage,
      }
    );

    res.json({
      message: "Çalma listesi başarıyla güncellendi",
      playlist: updatedPlaylist,
    });
  } catch (error: any) {
    logger.error(`Çalma listesi güncelleme hatası: ${error.message}`);
    res
      .status(error.statusCode || 500)
      .json({ error: error.message || "Sunucu hatası" });
  }
};

// Çalma listesini sil
export const deletePlaylist = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const userId = req.userId;

    if (!userId) {
      res.status(401).json({ error: "Yetkilendirme hatası" });
      return;
    }

    // ID'nin sayı olduğundan emin ol
    const numericId = parseInt(id);
    await PlaylistService.deletePlaylist(numericId, userId);

    res.json({ message: "Çalma listesi başarıyla silindi" });
  } catch (error: any) {
    logger.error(`Çalma listesi silme hatası: ${error.message}`);
    res
      .status(error.statusCode || 500)
      .json({ error: error.message || "Sunucu hatası" });
  }
};

// Çalma listesine şarkı ekle
export const addSongToPlaylist = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const { songId } = req.body;
    const userId = req.userId;

    if (!userId) {
      res.status(401).json({ error: "Yetkilendirme hatası" });
      return;
    }

    // ID'lerin sayı olduğundan emin ol
    const playlistId = parseInt(id);
    const songIdNum = parseInt(songId);

    const result = await PlaylistService.addSongToPlaylist(
      playlistId,
      songIdNum,
      userId
    );

    res.status(201).json({
      message: "Şarkı çalma listesine başarıyla eklendi",
      playlistSong: result,
    });
  } catch (error: any) {
    logger.error(`Çalma listesine şarkı ekleme hatası: ${error.message}`);
    res
      .status(error.statusCode || 500)
      .json({ error: error.message || "Sunucu hatası" });
  }
};

// Çalma listesinden şarkı kaldır
export const removeSongFromPlaylist = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id, songId } = req.params;
    const userId = req.userId;

    if (!userId) {
      res.status(401).json({ error: "Yetkilendirme hatası" });
      return;
    }

    // ID'lerin sayı olduğundan emin ol
    const playlistId = parseInt(id);
    const songIdNum = parseInt(songId);

    await PlaylistService.removeSongFromPlaylist(playlistId, songIdNum, userId);

    res.json({ message: "Şarkı çalma listesinden başarıyla kaldırıldı" });
  } catch (error: any) {
    logger.error(`Çalma listesinden şarkı kaldırma hatası: ${error.message}`);
    res
      .status(error.statusCode || 500)
      .json({ error: error.message || "Sunucu hatası" });
  }
};

// Öne çıkan çalma listelerini getir
export const getFeaturedPlaylists = async (req: Request, res: Response) => {
  try {
    const featuredPlaylists = await PlaylistService.getFeaturedPlaylists();
    res.json(featuredPlaylists);
  } catch (error: any) {
    logger.error(
      `Öne çıkan çalma listelerini getirme hatası: ${error.message}`
    );
    res
      .status(error.statusCode || 500)
      .json({ error: error.message || "Sunucu hatası" });
  }
};
