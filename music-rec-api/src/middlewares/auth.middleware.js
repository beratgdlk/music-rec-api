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
exports.authorizeUser = exports.authorizeAdmin = exports.authorizePlaylistOwner = exports.authenticate = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const database_1 = __importDefault(require("../config/database"));
// JWT token'ı doğrulayan middleware
const authenticate = (req, res, next) => {
    // Header'dan token al
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Authentication token required' });
    }
    const token = authHeader.split(' ')[1];
    try {
        // Token'ı doğrula
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET || 'secret-key');
        // Kullanıcı ID'sini request'e ekle
        req.userId = decoded.id;
        next();
    }
    catch (error) {
        return res.status(401).json({ error: 'Invalid or expired token' });
    }
};
exports.authenticate = authenticate;
// Çalma listesi sahibini doğrulayan middleware
const authorizePlaylistOwner = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const userId = req.userId;
        if (!userId) {
            return res.status(401).json({ error: 'Authentication required' });
        }
        // ID'nin sayı olduğundan emin ol
        const playlistId = parseInt(id);
        if (isNaN(playlistId)) {
            return res.status(400).json({ error: 'Invalid playlist ID format' });
        }
        // Çalma listesinin sahibi olduğunu kontrol et
        const playlist = yield database_1.default.playlist.findUnique({
            where: { id: playlistId },
            select: { ownerId: true }
        });
        if (!playlist) {
            return res.status(404).json({ error: 'Playlist not found' });
        }
        if (playlist.ownerId !== userId) {
            return res.status(403).json({ error: 'You do not have permission to modify this playlist' });
        }
        next();
    }
    catch (error) {
        console.error('Authorization error:', error);
        res.status(500).json({ error: 'Server error' });
    }
});
exports.authorizePlaylistOwner = authorizePlaylistOwner;
// Admin kullanıcıyı doğrulayan middleware
const authorizeAdmin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.userId;
        if (!userId) {
            return res.status(401).json({ error: 'Authentication required' });
        }
        // Kullanıcının admin olup olmadığını kontrol et
        const user = yield database_1.default.user.findUnique({
            where: { id: userId },
            select: { isAdmin: true }
        });
        if (!user || !user.isAdmin) {
            return res.status(403).json({ error: 'Admin privileges required' });
        }
        next();
    }
    catch (error) {
        console.error('Admin authorization error:', error);
        res.status(500).json({ error: 'Server error' });
    }
});
exports.authorizeAdmin = authorizeAdmin;
// Kullanıcının kendisi veya admin olduğunu doğrulayan middleware
const authorizeUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const userId = req.userId;
        if (!userId) {
            return res.status(401).json({ error: 'Authentication required' });
        }
        // ID'nin sayı olduğundan emin ol
        const targetUserId = parseInt(id);
        if (isNaN(targetUserId)) {
            return res.status(400).json({ error: 'Invalid user ID format' });
        }
        // Kullanıcının kendisi veya admin olup olmadığını kontrol et
        if (userId !== targetUserId) {
            const user = yield database_1.default.user.findUnique({
                where: { id: userId },
                select: { isAdmin: true }
            });
            if (!user || !user.isAdmin) {
                return res.status(403).json({ error: 'You do not have permission to perform this action' });
            }
        }
        next();
    }
    catch (error) {
        console.error('User authorization error:', error);
        res.status(500).json({ error: 'Server error' });
    }
});
exports.authorizeUser = authorizeUser;
