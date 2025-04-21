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
exports.TrackService = void 0;
const database_1 = __importDefault(require("../config/database"));
const error_utils_1 = require("../utils/error.utils");
/**
 * Parça servisi
 */
exports.TrackService = {
    /**
     * Tüm parçaları getir
     */
    getTracks() {
        return __awaiter(this, arguments, void 0, function* (limit = 10, page = 1, genre) {
            // Parametrelerin geçerli olduğundan emin ol
            if (isNaN(limit) || isNaN(page) || limit < 1 || page < 1) {
                throw new error_utils_1.BadRequestError('Geçersiz limit veya sayfa numarası');
            }
            const skip = (page - 1) * limit;
            // Tür filtresi ekleme
            const where = genre
                ? {
                    album: {
                        genres: {
                            some: {
                                genre: {
                                    name: {
                                        equals: genre,
                                        mode: 'insensitive'
                                    }
                                }
                            }
                        }
                    }
                }
                : {};
            const [songs, total] = yield Promise.all([
                database_1.default.song.findMany({
                    where,
                    include: {
                        artist: {
                            select: {
                                id: true,
                                name: true
                            }
                        },
                        album: {
                            select: {
                                id: true,
                                title: true,
                                coverImage: true
                            }
                        },
                        _count: {
                            select: {
                                likedBy: true,
                                reviews: true
                            }
                        }
                    },
                    orderBy: { createdAt: 'desc' },
                    skip,
                    take: limit
                }),
                database_1.default.song.count({ where })
            ]);
            const totalPages = Math.ceil(total / limit);
            return {
                data: songs,
                meta: {
                    total,
                    page,
                    limit,
                    totalPages
                }
            };
        });
    },
    /**
     * Belirli bir parçayı getir
     */
    getTrackById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            if (isNaN(id)) {
                throw new error_utils_1.BadRequestError('Geçersiz şarkı ID formatı');
            }
            const song = yield database_1.default.song.findUnique({
                where: { id },
                include: {
                    artist: true,
                    album: {
                        include: {
                            genres: {
                                include: {
                                    genre: true
                                }
                            }
                        }
                    },
                    _count: {
                        select: {
                            likedBy: true,
                            reviews: true,
                            playlists: true
                        }
                    }
                }
            });
            if (!song) {
                throw new error_utils_1.NotFoundError('Şarkı bulunamadı');
            }
            return song;
        });
    },
    /**
     * Parçaları arama
     */
    searchTracks(query_1) {
        return __awaiter(this, arguments, void 0, function* (query, limit = 10, page = 1) {
            if (!query) {
                throw new error_utils_1.BadRequestError('Arama sorgusu gerekli');
            }
            // Parametrelerin geçerli olduğundan emin ol
            if (isNaN(limit) || isNaN(page) || limit < 1 || page < 1) {
                throw new error_utils_1.BadRequestError('Geçersiz limit veya sayfa numarası');
            }
            const skip = (page - 1) * limit;
            const searchQuery = {
                OR: [
                    { title: { contains: query, mode: 'insensitive' } },
                    { artist: { name: { contains: query, mode: 'insensitive' } } },
                    { album: { title: { contains: query, mode: 'insensitive' } } }
                ]
            };
            const [songs, total] = yield Promise.all([
                database_1.default.song.findMany({
                    where: searchQuery,
                    include: {
                        artist: {
                            select: {
                                id: true,
                                name: true
                            }
                        },
                        album: {
                            select: {
                                id: true,
                                title: true,
                                coverImage: true
                            }
                        }
                    },
                    orderBy: { title: 'asc' },
                    skip,
                    take: limit
                }),
                database_1.default.song.count({ where: searchQuery })
            ]);
            const totalPages = Math.ceil(total / limit);
            return {
                data: songs,
                meta: {
                    total,
                    page,
                    limit,
                    totalPages,
                    query
                }
            };
        });
    },
    /**
     * Parçayı beğen
     */
    likeTrack(userId, trackId) {
        return __awaiter(this, void 0, void 0, function* () {
            // Önce şarkının var olduğunu kontrol et
            const song = yield database_1.default.song.findUnique({
                where: { id: trackId }
            });
            if (!song) {
                throw new error_utils_1.NotFoundError('Şarkı bulunamadı');
            }
            // Kullanıcının bu şarkıyı daha önce beğenip beğenmediğini kontrol et
            const existingLike = yield database_1.default.likedSong.findUnique({
                where: {
                    userId_songId: {
                        userId,
                        songId: trackId
                    }
                }
            });
            if (existingLike) {
                throw new error_utils_1.BadRequestError('Bu şarkıyı zaten beğendiniz');
            }
            // Beğeniyi kaydet
            yield database_1.default.likedSong.create({
                data: {
                    user: {
                        connect: { id: userId }
                    },
                    song: {
                        connect: { id: trackId }
                    }
                }
            });
        });
    },
    /**
     * Parça beğenisini kaldır
     */
    unlikeTrack(userId, trackId) {
        return __awaiter(this, void 0, void 0, function* () {
            // Kullanıcının bu şarkıyı daha önce beğenip beğenmediğini kontrol et
            const existingLike = yield database_1.default.likedSong.findUnique({
                where: {
                    userId_songId: {
                        userId,
                        songId: trackId
                    }
                }
            });
            if (!existingLike) {
                throw new error_utils_1.BadRequestError('Bu şarkıyı beğenmediniz');
            }
            // Beğeniyi kaldır
            yield database_1.default.likedSong.delete({
                where: {
                    userId_songId: {
                        userId,
                        songId: trackId
                    }
                }
            });
        });
    },
    /**
     * Beğenilen parçaları getir
     */
    getLikedTracks(userId_1) {
        return __awaiter(this, arguments, void 0, function* (userId, limit = 20, page = 1) {
            const skip = (page - 1) * limit;
            const [likedSongs, total] = yield Promise.all([
                database_1.default.likedSong.findMany({
                    where: { userId },
                    include: {
                        song: {
                            include: {
                                artist: {
                                    select: {
                                        id: true,
                                        name: true
                                    }
                                },
                                album: {
                                    select: {
                                        id: true,
                                        title: true,
                                        coverImage: true
                                    }
                                }
                            }
                        }
                    },
                    orderBy: { likedAt: 'desc' },
                    skip,
                    take: limit
                }),
                database_1.default.likedSong.count({ where: { userId } })
            ]);
            const totalPages = Math.ceil(total / limit);
            return {
                data: likedSongs.map((like) => like.song),
                meta: {
                    total,
                    page,
                    limit,
                    totalPages
                }
            };
        });
    },
    /**
     * Parça değerlendirmesi ekle
     */
    addTrackReview(userId, reviewData) {
        return __awaiter(this, void 0, void 0, function* () {
            const { trackId, content, rating } = reviewData;
            // Parçanın var olduğunu kontrol et
            const song = yield database_1.default.song.findUnique({
                where: { id: trackId }
            });
            if (!song) {
                throw new error_utils_1.NotFoundError('Şarkı bulunamadı');
            }
            // Kullanıcının bu parçayı daha önce değerlendirip değerlendirmediğini kontrol et
            const existingReview = yield database_1.default.review.findFirst({
                where: {
                    userId,
                    songId: trackId
                }
            });
            if (existingReview) {
                throw new error_utils_1.BadRequestError('Bu şarkıyı zaten değerlendirdiniz');
            }
            // Değerlendirmeyi oluştur
            const review = yield database_1.default.review.create({
                data: {
                    content,
                    user: {
                        connect: { id: userId }
                    },
                    song: {
                        connect: { id: trackId }
                    }
                },
                include: {
                    user: {
                        select: {
                            id: true,
                            username: true,
                            name: true,
                            profileImage: true
                        }
                    }
                }
            });
            // Eğer rating verilmişse, puanlama da ekle
            if (rating !== undefined && rating >= 1 && rating <= 5) {
                yield database_1.default.rating.create({
                    data: {
                        score: rating,
                        user: {
                            connect: { id: userId }
                        },
                        song: {
                            connect: { id: trackId }
                        }
                    }
                });
            }
            return review;
        });
    },
    /**
     * Parça değerlendirmelerini getir
     */
    getTrackReviews(trackId) {
        return __awaiter(this, void 0, void 0, function* () {
            // Parçanın var olduğunu kontrol et
            const song = yield database_1.default.song.findUnique({
                where: { id: trackId }
            });
            if (!song) {
                throw new error_utils_1.NotFoundError('Şarkı bulunamadı');
            }
            // Değerlendirmeleri getir
            const reviews = yield database_1.default.review.findMany({
                where: { songId: trackId },
                include: {
                    user: {
                        select: {
                            id: true,
                            username: true,
                            name: true,
                            profileImage: true
                        }
                    }
                },
                orderBy: { createdAt: 'desc' }
            });
            return reviews;
        });
    }
};
