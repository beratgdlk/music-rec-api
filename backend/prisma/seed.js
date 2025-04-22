"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
const bcrypt = __importStar(require("bcrypt"));
const database_1 = __importDefault(require("../src/config/database"));
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("Veritabanı test verileri oluşturuluyor...");
        // Varolan verileri temizle
        yield database_1.default.$transaction([
            database_1.default.likedSong.deleteMany(),
            database_1.default.songPlaylist.deleteMany(),
            database_1.default.wishlist.deleteMany(),
            database_1.default.rating.deleteMany(),
            database_1.default.review.deleteMany(),
            database_1.default.albumGenre.deleteMany(),
            database_1.default.artistGenre.deleteMany(),
            database_1.default.song.deleteMany(),
            database_1.default.album.deleteMany(),
            database_1.default.genre.deleteMany(),
            database_1.default.artist.deleteMany(),
            database_1.default.playlist.deleteMany(),
            database_1.default.friendship.deleteMany(),
            database_1.default.user.deleteMany(),
        ]);
        // Kullanıcılar
        const adminPassword = yield bcrypt.hash("admin123", 10);
        const userPassword = yield bcrypt.hash("user123", 10);
        const admin = yield database_1.default.user.create({
            data: {
                email: "admin@spotify.com",
                username: "admin",
                password: adminPassword,
                name: "Admin User",
                isAdmin: true,
                profileImage: "https://randomuser.me/api/portraits/men/1.jpg",
            },
        });
        const user1 = yield database_1.default.user.create({
            data: {
                email: "user1@spotify.com",
                username: "user1",
                password: userPassword,
                name: "Test User 1",
                profileImage: "https://randomuser.me/api/portraits/women/1.jpg",
            },
        });
        const user2 = yield database_1.default.user.create({
            data: {
                email: "user2@spotify.com",
                username: "user2",
                password: userPassword,
                name: "Test User 2",
                profileImage: "https://randomuser.me/api/portraits/men/2.jpg",
            },
        });
        console.log("Kullanıcılar oluşturuldu...");
        // Türler
        const genres = yield Promise.all([
            database_1.default.genre.create({ data: { name: "Rock" } }),
            database_1.default.genre.create({ data: { name: "Pop" } }),
            database_1.default.genre.create({ data: { name: "Hip Hop" } }),
            database_1.default.genre.create({ data: { name: "Electronic" } }),
            database_1.default.genre.create({ data: { name: "Jazz" } }),
            database_1.default.genre.create({ data: { name: "Classical" } }),
        ]);
        console.log("Türler oluşturuldu...");
        // Sanatçılar
        const artist1 = yield database_1.default.artist.create({
            data: {
                name: "Rock Star",
                bio: "Ünlü rock sanatçısı",
                country: "USA",
                profileImage: "https://randomuser.me/api/portraits/men/10.jpg",
            },
        });
        const artist2 = yield database_1.default.artist.create({
            data: {
                name: "Pop Queen",
                bio: "Ünlü pop sanatçısı",
                country: "UK",
                profileImage: "https://randomuser.me/api/portraits/women/10.jpg",
            },
        });
        const artist3 = yield database_1.default.artist.create({
            data: {
                name: "Electro Master",
                bio: "Ünlü elektronik müzik prodüktörü",
                country: "Germany",
                profileImage: "https://randomuser.me/api/portraits/men/11.jpg",
            },
        });
        // Sanatçı türleri
        yield database_1.default.artistGenre.create({
            data: {
                artist: { connect: { id: artist1.id } },
                genre: { connect: { id: genres[0].id } }, // Rock
            },
        });
        yield database_1.default.artistGenre.create({
            data: {
                artist: { connect: { id: artist2.id } },
                genre: { connect: { id: genres[1].id } }, // Pop
            },
        });
        yield database_1.default.artistGenre.create({
            data: {
                artist: { connect: { id: artist3.id } },
                genre: { connect: { id: genres[3].id } }, // Electronic
            },
        });
        console.log("Sanatçılar oluşturuldu...");
        // Albümler
        const album1 = yield database_1.default.album.create({
            data: {
                title: "Rock Classics",
                releaseYear: 2020,
                type: "ALBUM",
                coverImage: "https://picsum.photos/id/1/500/500",
                artist: { connect: { id: artist1.id } },
            },
        });
        const album2 = yield database_1.default.album.create({
            data: {
                title: "Pop Hits",
                releaseYear: 2021,
                type: "ALBUM",
                coverImage: "https://picsum.photos/id/2/500/500",
                artist: { connect: { id: artist2.id } },
            },
        });
        const album3 = yield database_1.default.album.create({
            data: {
                title: "Electronic Dreams",
                releaseYear: 2022,
                type: "ALBUM",
                coverImage: "https://picsum.photos/id/3/500/500",
                artist: { connect: { id: artist3.id } },
            },
        });
        // Albüm türleri
        yield database_1.default.albumGenre.create({
            data: {
                album: { connect: { id: album1.id } },
                genre: { connect: { id: genres[0].id } }, // Rock
            },
        });
        yield database_1.default.albumGenre.create({
            data: {
                album: { connect: { id: album2.id } },
                genre: { connect: { id: genres[1].id } }, // Pop
            },
        });
        yield database_1.default.albumGenre.create({
            data: {
                album: { connect: { id: album3.id } },
                genre: { connect: { id: genres[3].id } }, // Electronic
            },
        });
        console.log("Albümler oluşturuldu...");
        // Şarkılar
        const songs = [];
        // Rock albümü şarkıları
        for (let i = 1; i <= 5; i++) {
            const song = yield database_1.default.song.create({
                data: {
                    title: `Rock Song ${i}`,
                    duration: 180 + i * 30, // saniye cinsinden
                    trackNumber: i,
                    audioUrl: `https://example.com/audio/rock${i}.mp3`,
                    album: { connect: { id: album1.id } },
                    artist: { connect: { id: artist1.id } },
                },
            });
            songs.push(song);
        }
        // Pop albümü şarkıları
        for (let i = 1; i <= 5; i++) {
            const song = yield database_1.default.song.create({
                data: {
                    title: `Pop Song ${i}`,
                    duration: 180 + i * 20,
                    trackNumber: i,
                    audioUrl: `https://example.com/audio/pop${i}.mp3`,
                    album: { connect: { id: album2.id } },
                    artist: { connect: { id: artist2.id } },
                },
            });
            songs.push(song);
        }
        // Electronic albümü şarkıları
        for (let i = 1; i <= 5; i++) {
            const song = yield database_1.default.song.create({
                data: {
                    title: `Electronic Song ${i}`,
                    duration: 180 + i * 40,
                    trackNumber: i,
                    audioUrl: `https://example.com/audio/electronic${i}.mp3`,
                    album: { connect: { id: album3.id } },
                    artist: { connect: { id: artist3.id } },
                },
            });
            songs.push(song);
        }
        console.log("Şarkılar oluşturuldu...");
        // Çalma listeleri
        const playlist1 = yield database_1.default.playlist.create({
            data: {
                name: "Favori Rock Şarkıları",
                description: "En sevdiğim rock parçaları",
                coverImage: "https://picsum.photos/id/10/500/500",
                owner: { connect: { id: user1.id } },
            },
        });
        const playlist2 = yield database_1.default.playlist.create({
            data: {
                name: "Pop Hitleri",
                description: "En iyi pop şarkıları",
                coverImage: "https://picsum.photos/id/11/500/500",
                owner: { connect: { id: user2.id } },
            },
        });
        // Çalma listelerine şarkı ekle
        let order = 1;
        // Rock şarkılarını playlist1'e ekle
        for (let i = 0; i < 5; i++) {
            yield database_1.default.songPlaylist.create({
                data: {
                    playlist: { connect: { id: playlist1.id } },
                    song: { connect: { id: songs[i].id } },
                    order: order++,
                },
            });
        }
        order = 1;
        // Pop şarkılarını playlist2'ye ekle
        for (let i = 5; i < 10; i++) {
            yield database_1.default.songPlaylist.create({
                data: {
                    playlist: { connect: { id: playlist2.id } },
                    song: { connect: { id: songs[i].id } },
                    order: order++,
                },
            });
        }
        console.log("Çalma listeleri oluşturuldu...");
        // Beğenilen şarkılar
        for (let i = 0; i < 5; i++) {
            yield database_1.default.likedSong.create({
                data: {
                    user: { connect: { id: user1.id } },
                    song: { connect: { id: songs[i].id } },
                },
            });
        }
        for (let i = 5; i < 10; i++) {
            yield database_1.default.likedSong.create({
                data: {
                    user: { connect: { id: user2.id } },
                    song: { connect: { id: songs[i].id } },
                },
            });
        }
        console.log("Beğenilen şarkılar oluşturuldu...");
        // Yorumlar
        yield database_1.default.review.create({
            data: {
                content: "Harika bir albüm!",
                user: { connect: { id: user1.id } },
                album: { connect: { id: album1.id } },
            },
        });
        yield database_1.default.review.create({
            data: {
                content: "Çok iyi şarkı, dinlemeye doyamıyorum!",
                user: { connect: { id: user2.id } },
                song: { connect: { id: songs[0].id } },
            },
        });
        // Puanlamalar
        yield database_1.default.rating.create({
            data: {
                score: 5,
                user: { connect: { id: user1.id } },
                album: { connect: { id: album1.id } },
            },
        });
        yield database_1.default.rating.create({
            data: {
                score: 4,
                user: { connect: { id: user2.id } },
                song: { connect: { id: songs[0].id } },
            },
        });
        console.log("Yorumlar ve puanlamalar oluşturuldu...");
        // Arkadaşlık
        yield database_1.default.friendship.create({
            data: {
                user: { connect: { id: user1.id } },
                friend: { connect: { id: user2.id } },
                status: "ACCEPTED",
            },
        });
        console.log("Test verileri başarıyla oluşturuldu!");
    });
}
main()
    .catch((e) => {
    console.error("Hata oluştu:", e);
    process.exit(1);
})
    .finally(() => __awaiter(void 0, void 0, void 0, function* () {
    yield database_1.default.$disconnect();
}));
