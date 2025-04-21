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
exports.RecommendationService = void 0;
const database_1 = __importDefault(require("../config/database"));
const error_utils_1 = require("../utils/error.utils");
/**
 * Öneri Servisi
 */
exports.RecommendationService = {
    /**
     * Kullanıcı için şarkı önerileri al
     * Collaborative filtering yaklaşımı kullanır:
     * 1. Kullanıcının beğendiği şarkıları bulur
     * 2. Benzer beğenilere sahip diğer kullanıcıları bulur
     * 3. Bu kullanıcıların beğendiği, ancak hedef kullanıcının henüz beğenmediği şarkıları önerir
     */
    getRecommendationsForUser(userId_1) {
        return __awaiter(this, arguments, void 0, function* (userId, limit = 10) {
            // Kullanıcının varlığını kontrol et
            const user = yield database_1.default.user.findUnique({
                where: { id: userId }
            });
            if (!user) {
                throw new error_utils_1.NotFoundError('Kullanıcı bulunamadı');
            }
            // Kullanıcının beğendiği şarkıları bul
            const userLikes = yield database_1.default.likedSong.findMany({
                where: { userId },
                select: { songId: true }
            });
            // Kullanıcı henüz hiç şarkı beğenmediyse, popüler şarkıları öner
            if (userLikes.length === 0) {
                return this.getPopularSongs(limit);
            }
            // Kullanıcının beğendiği şarkı ID'leri
            const userLikedSongIds = userLikes.map(like => like.songId);
            // Kullanıcının beğendiği şarkıları beğenen diğer kullanıcıları bul
            const similarUsers = yield database_1.default.likedSong.findMany({
                where: {
                    songId: { in: userLikedSongIds },
                    userId: { not: userId } // Kendimizi hariç tutuyoruz
                },
                select: { userId: true },
                distinct: ['userId']
            });
            const similarUserIds = similarUsers.map(user => user.userId);
            // Benzer kullanıcılar bulunamadıysa, tür bazlı öneriler sun
            if (similarUserIds.length === 0) {
                return this.getRecommendationsByGenre(userId, limit);
            }
            // Benzer kullanıcıların beğendiği ama bu kullanıcının beğenmediği şarkılar
            const recommendedSongs = yield database_1.default.song.findMany({
                where: {
                    likedBy: {
                        some: {
                            userId: { in: similarUserIds }
                        }
                    },
                    // Kullanıcının zaten beğendiği şarkıları hariç tut
                    id: {
                        notIn: userLikedSongIds
                    }
                },
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
                            likedBy: true
                        }
                    }
                },
                orderBy: [
                    // Beğeni sayısına göre sırala
                    { likedBy: { _count: 'desc' } },
                    // Sonra yeni eklenen şarkıları öne çıkar
                    { createdAt: 'desc' }
                ],
                take: limit
            });
            return recommendedSongs;
        });
    },
    /**
     * Popüler şarkıları getir (en çok beğenilen)
     */
    getPopularSongs() {
        return __awaiter(this, arguments, void 0, function* (limit = 10) {
            return database_1.default.song.findMany({
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
                            reviews: true
                        }
                    }
                },
                orderBy: {
                    likedBy: {
                        _count: 'desc'
                    }
                },
                take: limit
            });
        });
    },
    /**
     * Kullanıcının beğendiği müzik türlerine göre şarkı önerileri
     */
    getRecommendationsByGenre(userId_1) {
        return __awaiter(this, arguments, void 0, function* (userId, limit = 10) {
            // Kullanıcının beğendiği şarkıların türlerini bul
            const likedGenres = yield database_1.default.likedSong.findMany({
                where: { userId },
                select: {
                    song: {
                        select: {
                            album: {
                                select: {
                                    genres: {
                                        select: {
                                            genreId: true
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            });
            // Tüm genreId'leri topla
            const genreIds = new Set();
            likedGenres.forEach(like => {
                var _a;
                (_a = like.song.album) === null || _a === void 0 ? void 0 : _a.genres.forEach(g => {
                    if (g.genreId)
                        genreIds.add(g.genreId);
                });
            });
            // Türlere göre şarkı önerisi
            if (genreIds.size > 0) {
                // Kullanıcının beğendiği şarkıları bul
                const userLikes = yield database_1.default.likedSong.findMany({
                    where: { userId },
                    select: { songId: true }
                });
                const userLikedSongIds = userLikes.map(like => like.songId);
                return database_1.default.song.findMany({
                    where: {
                        album: {
                            genres: {
                                some: {
                                    genreId: { in: Array.from(genreIds) }
                                }
                            }
                        },
                        // Kullanıcının zaten beğendiği şarkıları hariç tut
                        id: {
                            notIn: userLikedSongIds
                        }
                    },
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
                                likedBy: true
                            }
                        }
                    },
                    orderBy: [
                        { likedBy: { _count: 'desc' } },
                        { createdAt: 'desc' }
                    ],
                    take: limit
                });
            }
            // Hiçbir tür bulunamazsa, popüler şarkıları döndür
            return this.getPopularSongs(limit);
        });
    }
};
