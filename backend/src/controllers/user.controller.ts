import { Request, Response } from "express";
import { UserService } from "../services/user.service";
import logger from "../utils/logger.utils";

// Tüm kullanıcıları getir
export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await UserService.getAllUsers();
    res.json(users);
  } catch (error: any) {
    logger.error(`Kullanıcıları getirme hatası: ${error.message}`);
    res
      .status(error.statusCode || 500)
      .json({ error: error.message || "Sunucu hatası" });
  }
};

// Belirli bir kullanıcıyı getir
export const getUserById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const userId = req.userId; // Auth middleware'den gelen kullanıcı ID'si

    if (!userId) {
      res.status(401).json({ error: "Yetkilendirme hatası" });
      return;
    }

    // ID'nin sayı olduğundan emin ol
    const numericId = parseInt(id);
    const user = await UserService.getUserById(numericId);

    res.json(user);
  } catch (error: any) {
    logger.error(`Kullanıcı getirme hatası: ${error.message}`);
    res
      .status(error.statusCode || 500)
      .json({ error: error.message || "Sunucu hatası" });
  }
};

// Kullanıcıyı güncelle (sadece kullanıcının kendisi veya admin)
export const updateUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const userId = req.userId; // Auth middleware'den gelen kullanıcı ID'si

    if (!userId) {
      res.status(401).json({ error: "Yetkilendirme hatası" });
      return;
    }

    // ID'nin sayı olduğundan emin ol
    const numericId = parseInt(id);

    const { username, name, email, profileImage, password } = req.body;

    const updatedUser = await UserService.updateUser(numericId, {
      username,
      name,
      email,
      profileImage,
      password,
    });

    res.json({
      message: "Kullanıcı başarıyla güncellendi",
      user: updatedUser,
    });
  } catch (error: any) {
    logger.error(`Kullanıcı güncelleme hatası: ${error.message}`);
    res
      .status(error.statusCode || 500)
      .json({ error: error.message || "Sunucu hatası" });
  }
};

// Kullanıcıyı sil (sadece kullanıcının kendisi veya admin)
export const deleteUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const userId = req.userId; // Auth middleware'den gelen kullanıcı ID'si

    if (!userId) {
      res.status(401).json({ error: "Yetkilendirme hatası" });
      return;
    }

    // ID'nin sayı olduğundan emin ol
    const numericId = parseInt(id);

    await UserService.deleteUser(numericId);

    res.json({ message: "Kullanıcı başarıyla silindi" });
  } catch (error: any) {
    logger.error(`Kullanıcı silme hatası: ${error.message}`);
    res
      .status(error.statusCode || 500)
      .json({ error: error.message || "Sunucu hatası" });
  }
};
