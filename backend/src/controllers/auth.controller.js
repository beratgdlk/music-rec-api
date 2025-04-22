"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProfile = exports.logout = exports.refreshToken = exports.login = exports.register = void 0;
const auth_service_1 = require("../services/auth.service");
const user_service_1 = require("../services/user.service");
const logger_utils_1 = __importDefault(require("../utils/logger.utils"));
// User registration
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password, username, name, profileImage } = req.body;
        const authResult = yield auth_service_1.AuthService.register({
            email,
            password,
            username,
            name,
            profileImage
        });
        // Set HTTP-only cookie for refresh token
        res.cookie('refreshToken', authResult.refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
            path: '/api/auth/refresh-token'
        });
        res.status(201).json({
            message: 'Kullanıcı başarıyla oluşturuldu',
            user: authResult.user,
            accessToken: authResult.accessToken
        });
    }
    catch (error) {
        logger_utils_1.default.error(`Registration error: ${error.message}`);
        res.status(error.statusCode || 500).json({
            error: error.message || 'Sunucu hatası'
        });
    }
});
exports.register = register;
// User login
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const authResult = yield auth_service_1.AuthService.login({
            email,
            password
        });
        // Set HTTP-only cookie for refresh token
        res.cookie('refreshToken', authResult.refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
            path: '/api/auth/refresh-token'
        });
        res.json({
            message: 'Giriş başarılı',
            user: authResult.user,
            accessToken: authResult.accessToken
        });
    }
    catch (error) {
        logger_utils_1.default.error(`Login error: ${error.message}`);
        res.status(error.statusCode || 500).json({
            error: error.message || 'Sunucu hatası'
        });
    }
});
exports.login = login;
// Refresh access token
const refreshToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        // Refresh token'ı cookie'den veya body'den al
        const refreshToken = ((_a = req.cookies) === null || _a === void 0 ? void 0 : _a.refreshToken) || req.body.refreshToken;
        if (!refreshToken) {
            return res.status(401).json({ error: 'Refresh token gerekiyor' });
        }
        const tokens = yield auth_service_1.AuthService.refreshToken({ refreshToken });
        // Set HTTP-only cookie for new refresh token
        res.cookie('refreshToken', tokens.refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
            path: '/api/auth/refresh-token'
        });
        res.json({
            accessToken: tokens.accessToken
        });
    }
    catch (error) {
        logger_utils_1.default.error(`Refresh token error: ${error.message}`);
        res.status(error.statusCode || 401).json({
            error: error.message || 'Geçersiz token'
        });
    }
});
exports.refreshToken = refreshToken;
// User logout
const logout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        // Refresh token'ı cookie'den veya body'den al
        const refreshToken = ((_a = req.cookies) === null || _a === void 0 ? void 0 : _a.refreshToken) || req.body.refreshToken;
        if (refreshToken) {
            yield auth_service_1.AuthService.logout(refreshToken);
        }
        // Clear refresh token cookie
        res.clearCookie('refreshToken', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            path: '/api/auth/refresh-token'
        });
        res.json({ message: 'Çıkış başarılı' });
    }
    catch (error) {
        logger_utils_1.default.error(`Logout error: ${error.message}`);
        res.status(500).json({ error: 'Çıkış yapılırken bir hata oluştu' });
    }
});
exports.logout = logout;
// Get user profile
const getProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.userId;
        if (!userId) {
            return res.status(401).json({ error: 'Kimlik doğrulama hatası' });
        }
        // Use the user service instead of directly using prisma
        const user = yield user_service_1.UserService.getUserById(userId);
        res.json(user);
    }
    catch (error) {
        logger_utils_1.default.error(`Profile error: ${error.message}`);
        res.status(error.statusCode || 500).json({
            error: error.message || 'Sunucu hatası'
        });
    }
});
exports.getProfile = getProfile;
