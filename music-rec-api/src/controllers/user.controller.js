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
exports.deleteUser = exports.updateUser = exports.getUserById = exports.getUsers = void 0;
const user_service_1 = require("../services/user.service");
const logger_utils_1 = __importDefault(require("../utils/logger.utils"));
// Tüm kullanıcıları getir
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield user_service_1.UserService.getAllUsers();
        res.json(users);
    }
    catch (error) {
        logger_utils_1.default.error(`Kullanıcıları getirme hatası: ${error.message}`);
        res.status(error.statusCode || 500).json({ error: error.message || 'Sunucu hatası' });
    }
});
exports.getUsers = getUsers;
// Belirli bir kullanıcıyı getir
const getUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const userId = req.userId; // Auth middleware'den gelen kullanıcı ID'si
        if (!userId) {
            return res.status(401).json({ error: 'Yetkilendirme hatası' });
        }
        // ID'nin sayı olduğundan emin ol
        const numericId = parseInt(id);
        const user = yield user_service_1.UserService.getUserById(numericId);
        res.json(user);
    }
    catch (error) {
        logger_utils_1.default.error(`Kullanıcı getirme hatası: ${error.message}`);
        res.status(error.statusCode || 500).json({ error: error.message || 'Sunucu hatası' });
    }
});
exports.getUserById = getUserById;
// Kullanıcıyı güncelle (sadece kullanıcının kendisi veya admin)
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const userId = req.userId; // Auth middleware'den gelen kullanıcı ID'si
        if (!userId) {
            return res.status(401).json({ error: 'Yetkilendirme hatası' });
        }
        // ID'nin sayı olduğundan emin ol
        const numericId = parseInt(id);
        const { username, name, email, profileImage, password } = req.body;
        const updatedUser = yield user_service_1.UserService.updateUser(numericId, {
            username,
            name,
            email,
            profileImage,
            password
        });
        res.json({
            message: 'Kullanıcı başarıyla güncellendi',
            user: updatedUser
        });
    }
    catch (error) {
        logger_utils_1.default.error(`Kullanıcı güncelleme hatası: ${error.message}`);
        res.status(error.statusCode || 500).json({ error: error.message || 'Sunucu hatası' });
    }
});
exports.updateUser = updateUser;
// Kullanıcıyı sil (sadece kullanıcının kendisi veya admin)
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const userId = req.userId; // Auth middleware'den gelen kullanıcı ID'si
        if (!userId) {
            return res.status(401).json({ error: 'Yetkilendirme hatası' });
        }
        // ID'nin sayı olduğundan emin ol
        const numericId = parseInt(id);
        yield user_service_1.UserService.deleteUser(numericId);
        res.json({ message: 'Kullanıcı başarıyla silindi' });
    }
    catch (error) {
        logger_utils_1.default.error(`Kullanıcı silme hatası: ${error.message}`);
        res.status(error.statusCode || 500).json({ error: error.message || 'Sunucu hatası' });
    }
});
exports.deleteUser = deleteUser;
