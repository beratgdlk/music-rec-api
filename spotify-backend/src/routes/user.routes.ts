import express from 'express';
import { 
  getUsers, 
  getUserById, 
  updateUser, 
  deleteUser 
} from '../controllers/user.controller';
import { authenticate } from '../middlewares/auth.middleware';

const router = express.Router();

// Tüm rotalar yetkilendirme gerektirir
router.use(authenticate);

// Tüm kullanıcıları listele
router.get('/', getUsers);

// Belirli bir kullanıcıyı getir
router.get('/:id', getUserById);

// Kullanıcı güncelle (sadece kendi profilini)
router.put('/:id', updateUser);

// Kullanıcıyı sil (sadece kendi hesabını)
router.delete('/:id', deleteUser);

export default router; 