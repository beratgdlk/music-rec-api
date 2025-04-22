import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import prisma from "../config/database";

// Request tipini genişlet
declare global {
  namespace Express {
    interface Request {
      userId?: number;
    }
  }
}

// JWT token'ı doğrulayan middleware
export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  // Header'dan token al
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({ error: "Authentication token required" });
    return;
  }

  const token = authHeader.split(" ")[1];

  try {
    // Token'ı doğrula
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "secret-key"
    ) as { id: number };

    // Kullanıcı ID'sini request'e ekle
    req.userId = decoded.id;

    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid or expired token" });
    return;
  }
};

// Çalma listesi sahibini doğrulayan middleware
export const authorizePlaylistOwner = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const userId = req.userId;

    if (!userId) {
      res.status(401).json({ error: "Authentication required" });
      return;
    }

    // ID'nin sayı olduğundan emin ol
    const playlistId = parseInt(id);
    if (isNaN(playlistId)) {
      res.status(400).json({ error: "Invalid playlist ID format" });
      return;
    }

    // Çalma listesinin sahibi olduğunu kontrol et
    const playlist = await prisma.playlist.findUnique({
      where: { id: playlistId },
      select: { ownerId: true },
    });

    if (!playlist) {
      res.status(404).json({ error: "Playlist not found" });
      return;
    }

    if (playlist.ownerId !== userId) {
      res
        .status(403)
        .json({ error: "You do not have permission to modify this playlist" });
      return;
    }

    next();
  } catch (error) {
    console.error("Authorization error:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// Admin kullanıcıyı doğrulayan middleware
export const authorizeAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const userId = req.userId;

    if (!userId) {
      res.status(401).json({ error: "Authentication required" });
      return;
    }

    // Kullanıcının admin olup olmadığını kontrol et
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { isAdmin: true },
    });

    if (!user || !user.isAdmin) {
      res.status(403).json({ error: "Admin privileges required" });
      return;
    }

    next();
  } catch (error) {
    console.error("Admin authorization error:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// Kullanıcının kendisi veya admin olduğunu doğrulayan middleware
export const authorizeUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const userId = req.userId;

    if (!userId) {
      res.status(401).json({ error: "Authentication required" });
      return;
    }

    // ID'nin sayı olduğundan emin ol
    const targetUserId = parseInt(id);
    if (isNaN(targetUserId)) {
      res.status(400).json({ error: "Invalid user ID format" });
      return;
    }

    // Kullanıcının kendisi veya admin olup olmadığını kontrol et
    if (userId !== targetUserId) {
      const user = await prisma.user.findUnique({
        where: { id: userId },
        select: { isAdmin: true },
      });

      if (!user || !user.isAdmin) {
        res
          .status(403)
          .json({ error: "You do not have permission to perform this action" });
        return;
      }
    }

    next();
  } catch (error) {
    console.error("User authorization error:", error);
    res.status(500).json({ error: "Server error" });
  }
};
