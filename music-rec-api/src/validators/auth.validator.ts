import { body } from 'express-validator';

/**
 * Kullanıcı kaydı için validation kuralları
 */
export const registerValidation = [
  // Kullanıcı adı kuralları
  body('username')
    .notEmpty().withMessage('Kullanıcı adı gereklidir')
    .isLength({ min: 3, max: 30 }).withMessage('Kullanıcı adı 3-30 karakter arasında olmalıdır')
    .matches(/^[a-zA-Z0-9_]+$/).withMessage('Kullanıcı adı sadece harf, rakam ve alt çizgi içerebilir'),
  
  // Email kuralları
  body('email')
    .notEmpty().withMessage('E-posta adresi gereklidir')
    .isEmail().withMessage('Geçerli bir e-posta adresi giriniz')
    .normalizeEmail(),
  
  // Şifre kuralları
  body('password')
    .notEmpty().withMessage('Şifre gereklidir')
    .isLength({ min: 6 }).withMessage('Şifre en az 6 karakter olmalıdır')
    .matches(/\d/).withMessage('Şifre en az bir rakam içermelidir'),
  
  // İsim alanı için (opsiyonel)
  body('name')
    .optional()
    .isLength({ min: 2, max: 100 }).withMessage('İsim 2-100 karakter arasında olmalıdır'),
  
  // Profil resmi için (opsiyonel)
  body('profileImage')
    .optional()
    .isURL().withMessage('Geçerli bir URL giriniz')
];

/**
 * Kullanıcı girişi için validation kuralları
 */
export const loginValidation = [
  // Email kuralları
  body('email')
    .notEmpty().withMessage('E-posta adresi gereklidir')
    .isEmail().withMessage('Geçerli bir e-posta adresi giriniz')
    .normalizeEmail(),
  
  // Şifre kuralları
  body('password')
    .notEmpty().withMessage('Şifre gereklidir')
]; 