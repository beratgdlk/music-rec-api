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
exports.PlaylistService = void 0;
const database_1 = __importDefault(require("../config/database"));
const error_utils_1 = require("../utils/error.utils");
/**
 * Çalma listesi servisi
 */
exports.PlaylistService = {
    /**
     * Yeni çalma listesi oluştur
     */
    createPlaylist(userId, playlistData) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, description, isPublic, coverImage } = playlistData;
            if (!name) {
                throw new error_utils_1.BadRequestError('Çalma listesi adı gereklidir');
            }
            const playlist = yield database_1.default.playlist.create({
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
            return playlist;
        });
    },
    /**
     * Tüm herkese açık çalma listelerini getir
     */
    getPublicPlaylists() {
        return __awaiter(this, void 0, void 0, function* () {
            const playlists = yield database_1.default.playlist.findMany({
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
                orderBy: { createdAt: 'desc' },
            });
            return playlists;
        });
    },
    /**
     * Kullanıcının kendi çalma listelerini getir
     */
    getUserPlaylists(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const playlists = yield database_1.default.playlist.findMany({
                where: {
                    ownerId: userId,
                },
                include: {
                    _count: {
                        select: { songs: true },
                    },
                },
                orderBy: { createdAt: 'desc' },
            });
            return playlists;
        });
    },
    /**
     * Belirli bir çalma listesini getir
     */
    getPlaylistById(playlistId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            if (isNaN(playlistId)) {
                throw new error_utils_1.BadRequestError('Geçersiz çalma listesi ID formatı');
            }
            const playlist = yield database_1.default.playlist.findUnique({
                where: { id: playlistId },
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
                        orderBy: { order: 'asc' },
                    },
                },
            });
            if (!playlist) {
                throw new error_utils_1.NotFoundError('Çalma listesi bulunamadı');
            }
            // Çalma listesi gizli ve sahibi değilse erişimi engelle
            if (!playlist.isPublic && playlist.owner.id !== userId) {
                throw new error_utils_1.ForbiddenError('Bu çalma listesine erişim izniniz yok');
            }
            return playlist;
        });
    },
    /**
     * Çalma listesini güncelle
     */
    updatePlaylist(playlistId, userId, updateData) {
        return __awaiter(this, void 0, void 0, function* () {
            if (isNaN(playlistId)) {
                throw new error_utils_1.BadRequestError('Geçersiz çalma listesi ID formatı');
            }
            // Çalma listesinin sahibi olduğunu kontrol et
            const playlist = yield database_1.default.playlist.findUnique({
                where: { id: playlistId },
                select: { ownerId: true },
            });
            if (!playlist) {
                throw new error_utils_1.NotFoundError('Çalma listesi bulunamadı');
            }
            if (playlist.ownerId !== userId) {
                throw new error_utils_1.ForbiddenError('Bu çalma listesini düzenleme yetkiniz yok');
            }
            // Çalma listesini güncelle
            const updatedPlaylist = yield database_1.default.playlist.update({
                where: { id: playlistId },
                data: updateData,
            });
            return updatedPlaylist;
        });
    },
    /**
     * Çalma listesini sil
     */
    deletePlaylist(playlistId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            if (isNaN(playlistId)) {
                throw new error_utils_1.BadRequestError('Geçersiz çalma listesi ID formatı');
            }
            // Çalma listesinin sahibi olduğunu kontrol et
            const playlist = yield database_1.default.playlist.findUnique({
                where: { id: playlistId },
                select: { ownerId: true },
            });
            if (!playlist) {
                throw new error_utils_1.NotFoundError('Çalma listesi bulunamadı');
            }
            if (playlist.ownerId !== userId) {
                throw new error_utils_1.ForbiddenError('Bu çalma listesini silme yetkiniz yok');
            }
            // Önce çalma listesindeki şarkıları sil (cascade delete ile otomatik olarak silinir)
            yield database_1.default.playlist.delete({
                where: { id: playlistId },
            });
        });
    },
    /**
     * Çalma listesine şarkı ekle
     */
    addSongToPlaylist(playlistId, songId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            if (isNaN(playlistId) || isNaN(songId)) {
                throw new error_utils_1.BadRequestError('Geçersiz ID formatı');
            }
            // Çalma listesinin sahibi olduğunu kontrol et
            const playlist = yield database_1.default.playlist.findUnique({
                where: { id: playlistId },
                select: { ownerId: true },
            });
            if (!playlist) {
                throw new error_utils_1.NotFoundError('Çalma listesi bulunamadı');
            }
            if (playlist.ownerId !== userId) {
                throw new error_utils_1.ForbiddenError('Bu çalma listesine şarkı ekleme yetkiniz yok');
            }
            // Şarkının var olduğunu kontrol et
            const song = yield database_1.default.song.findUnique({
                where: { id: songId },
            });
            if (!song) {
                throw new error_utils_1.NotFoundError('Şarkı bulunamadı');
            }
            // Şarkının zaten çalma listesinde olup olmadığını kontrol et
            const existingSong = yield database_1.default.songPlaylist.findUnique({
                where: {
                    playlistId_songId: {
                        playlistId,
                        songId,
                    },
                },
            });
            if (existingSong) {
                throw new error_utils_1.BadRequestError('Bu şarkı zaten çalma listesinde mevcut');
            }
            // Çalma listesindeki son sıra numarasını bul
            const lastOrderItem = yield database_1.default.songPlaylist.findFirst({
                where: { playlistId },
                orderBy: { order: 'desc' },
                select: { order: true },
            });
            const nextOrder = lastOrderItem ? lastOrderItem.order + 1 : 1;
            // Şarkıyı çalma listesine ekle
            const playlistSong = yield database_1.default.songPlaylist.create({
                data: {
                    playlist: {
                        connect: { id: playlistId },
                    },
                    song: {
                        connect: { id: songId },
                    },
                    order: nextOrder,
                },
                include: {
                    song: {
                        include: {
                            artist: true,
                            album: true,
                        },
                    },
                },
            });
            return playlistSong;
        });
    },
    /**
     * Çalma listesinden şarkı kaldır
     */
    removeSongFromPlaylist(playlistId, songId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            if (isNaN(playlistId) || isNaN(songId)) {
                throw new error_utils_1.BadRequestError('Geçersiz ID formatı');
            }
            // Çalma listesinin sahibi olduğunu kontrol et
            const playlist = yield database_1.default.playlist.findUnique({
                where: { id: playlistId },
                select: { ownerId: true },
            });
            if (!playlist) {
                throw new error_utils_1.NotFoundError('Çalma listesi bulunamadı');
            }
            if (playlist.ownerId !== userId) {
                throw new error_utils_1.ForbiddenError('Bu çalma listesinden şarkı kaldırma yetkiniz yok');
            }
            // Şarkının çalma listesinde olduğunu kontrol et
            const playlistSong = yield database_1.default.songPlaylist.findUnique({
                where: {
                    playlistId_songId: {
                        playlistId,
                        songId,
                    },
                },
            });
            if (!playlistSong) {
                throw new error_utils_1.NotFoundError('Bu şarkı çalma listesinde bulunamadı');
            }
            // Şarkıyı çalma listesinden kaldır
            yield database_1.default.songPlaylist.delete({
                where: {
                    playlistId_songId: {
                        playlistId,
                        songId,
                    },
                },
            });
            // Sıralama düzenini güncelle
            const remainingSongs = yield database_1.default.songPlaylist.findMany({
                where: { playlistId },
                orderBy: { order: 'asc' },
            });
            // Sıralamayı yeniden düzenle
            for (let i = 0; i < remainingSongs.length; i++) {
                yield database_1.default.songPlaylist.update({
                    where: {
                        playlistId_songId: {
                            playlistId,
                            songId: remainingSongs[i].songId,
                        },
                    },
                    data: { order: i + 1 },
                });
            }
        });
    },
    /**
     * Öne çıkan çalma listelerini getir
     */
    getFeaturedPlaylists() {
        return __awaiter(this, void 0, void 0, function* () {
            // Bu fonksiyon, en çok şarkı içeren veya en popüler çalma listelerini getirebilir
            // Şimdilik sadece public çalma listelerinden ilk 5'ini getiriyoruz
            const featuredPlaylists = yield database_1.default.playlist.findMany({
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
                orderBy: { createdAt: 'desc' },
                take: 5,
            });
            return featuredPlaylists;
        });
    },
};
