"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginValidation = exports.registerValidation = void 0;
const express_validator_1 = require("express-validator");
/**
 * Kullanıcı kaydı için validation kuralları
 */
exports.registerValidation = [
    // Kullanıcı adı kuralları
    (0, express_validator_1.body)('username')
        .notEmpty().withMessage('Kullanıcı adı gereklidir')
        .isLength({ min: 3, max: 30 }).withMessage('Kullanıcı adı 3-30 karakter arasında olmalıdır')
        .matches(/^[a-zA-Z0-9_]+$/).withMessage('Kullanıcı adı sadece harf, rakam ve alt çizgi içerebilir'),
    // Email kuralları
    (0, express_validator_1.body)('email')
        .notEmpty().withMessage('E-posta adresi gereklidir')
        .isEmail().withMessage('Geçerli bir e-posta adresi giriniz')
        .normalizeEmail(),
    // Şifre kuralları
    (0, express_validator_1.body)('password')
        .notEmpty().withMessage('Şifre gereklidir')
        .isLength({ min: 6 }).withMessage('Şifre en az 6 karakter olmalıdır')
        .matches(/\d/).withMessage('Şifre en az bir rakam içermelidir'),
    // İsim alanı için (opsiyonel)
    (0, express_validator_1.body)('name')
        .optional()
        .isLength({ min: 2, max: 100 }).withMessage('İsim 2-100 karakter arasında olmalıdır'),
    // Profil resmi için (opsiyonel)
    (0, express_validator_1.body)('profileImage')
        .optional()
        .isURL().withMessage('Geçerli bir URL giriniz')
];
/**
 * Kullanıcı girişi için validation kuralları
 */
exports.loginValidation = [
    // Email kuralları
    (0, express_validator_1.body)('email')
        .notEmpty().withMessage('E-posta adresi gereklidir')
        .isEmail().withMessage('Geçerli bir e-posta adresi giriniz')
        .normalizeEmail(),
    // Şifre kuralları
    (0, express_validator_1.body)('password')
        .notEmpty().withMessage('Şifre gereklidir')
];
