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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const _db_1 = __importDefault(require("@db"));
const auth_utils_1 = require("../utils/auth.utils");
const error_utils_1 = require("../utils/error.utils");
const user_service_1 = require("./user.service");
/**
 * Kimlik doğrulama servisi
 */
exports.AuthService = {
    /**
     * Kullanıcı kaydı
     */
    register(userData) {
        return __awaiter(this, void 0, void 0, function* () {
            // UserService'i kullanarak kullanıcı oluştur
            const newUser = yield user_service_1.UserService.createUser(userData);
            // Tokenları oluştur
            const accessToken = (0, auth_utils_1.generateToken)(newUser.id);
            const refreshToken = (0, auth_utils_1.generateRefreshToken)();
            // Refresh token'ı veritabanına kaydet
            yield _db_1.default.refreshToken.create({
                data: {
                    token: refreshToken,
                    userId: newUser.id,
                    expiresAt: (0, auth_utils_1.getRefreshTokenExpiry)()
                }
            });
            return {
                user: newUser,
                accessToken,
                refreshToken
            };
        });
    },
    /**
     * Kullanıcı girişi
     */
    login(loginData) {
        return __awaiter(this, void 0, void 0, function* () {
            // Email ile kullanıcıyı bul
            const user = yield user_service_1.UserService.getUserByEmail(loginData.email);
            // Kullanıcı bulunamadıysa
            if (!user) {
                throw new error_utils_1.UnauthorizedError('Geçersiz e-posta veya şifre');
            }
            // Şifre kontrolü
            const isPasswordValid = yield (0, auth_utils_1.comparePassword)(loginData.password, user.password);
            if (!isPasswordValid) {
                throw new error_utils_1.UnauthorizedError('Geçersiz e-posta veya şifre');
            }
            // Tokenları oluştur
            const accessToken = (0, auth_utils_1.generateToken)(user.id);
            const refreshToken = (0, auth_utils_1.generateRefreshToken)();
            // Refresh token'ı veritabanına kaydet
            yield _db_1.default.refreshToken.create({
                data: {
                    token: refreshToken,
                    userId: user.id,
                    expiresAt: (0, auth_utils_1.getRefreshTokenExpiry)()
                }
            });
            // Password hariç kullanıcı bilgilerini döndür
            const { password } = user, userWithoutPassword = __rest(user, ["password"]);
            return {
                user: userWithoutPassword,
                accessToken,
                refreshToken
            };
        });
    },
    /**
     * Refresh token ile yeni access token al
     */
    refreshToken(refreshData) {
        return __awaiter(this, void 0, void 0, function* () {
            const { refreshToken } = refreshData;
            // Refresh token'ı veritabanında ara
            const tokenRecord = yield _db_1.default.refreshToken.findUnique({
                where: { token: refreshToken },
                include: { user: true }
            });
            // Token bulunamadıysa veya iptal edildiyse
            if (!tokenRecord || tokenRecord.revoked) {
                throw new error_utils_1.UnauthorizedError('Geçersiz refresh token');
            }
            // Token süresi dolduysa
            if (new Date() > tokenRecord.expiresAt) {
                // Süresi dolmuş token'ı iptal et
                yield _db_1.default.refreshToken.update({
                    where: { id: tokenRecord.id },
                    data: { revoked: true }
                });
                throw new error_utils_1.UnauthorizedError('Refresh token süresi dolmuş');
            }
            // Eski token'ı iptal et
            yield _db_1.default.refreshToken.update({
                where: { id: tokenRecord.id },
                data: { revoked: true }
            });
            // Yeni tokenlar oluştur
            const accessToken = (0, auth_utils_1.generateToken)(tokenRecord.user.id);
            const newRefreshToken = (0, auth_utils_1.generateRefreshToken)();
            // Yeni refresh token'ı veritabanına kaydet
            yield _db_1.default.refreshToken.create({
                data: {
                    token: newRefreshToken,
                    userId: tokenRecord.user.id,
                    expiresAt: (0, auth_utils_1.getRefreshTokenExpiry)()
                }
            });
            return {
                accessToken,
                refreshToken: newRefreshToken
            };
        });
    },
    /**
     * Çıkış yap (refresh token'ı iptal et)
     */
    logout(refreshToken) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!refreshToken) {
                return; // Token yoksa sessizce devam et
            }
            // Token'ı bul ve iptal et
            try {
                yield _db_1.default.refreshToken.updateMany({
                    where: { token: refreshToken },
                    data: { revoked: true }
                });
            }
            catch (error) {
                // Hata durumunda sessizce devam et
            }
        });
    }
};
