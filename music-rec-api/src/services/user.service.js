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
exports.UserService = void 0;
const database_1 = __importDefault(require("../config/database"));
const auth_utils_1 = require("../utils/auth.utils");
const error_utils_1 = require("../utils/error.utils");
/**
 * Kullanıcı servisi
 */
exports.UserService = {
    /**
     * Tüm kullanıcıları getir
     */
    getAllUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield database_1.default.user.findMany({
                select: {
                    id: true,
                    username: true,
                    email: true,
                    name: true,
                    profileImage: true,
                    isAdmin: true,
                    createdAt: true,
                    updatedAt: true,
                },
            });
            return users;
        });
    },
    /**
     * ID'ye göre kullanıcı getir
     */
    getUserById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield database_1.default.user.findUnique({
                where: { id },
                select: {
                    id: true,
                    username: true,
                    email: true,
                    name: true,
                    profileImage: true,
                    isAdmin: true,
                    createdAt: true,
                    updatedAt: true,
                },
            });
            if (!user) {
                throw new error_utils_1.NotFoundError('Kullanıcı bulunamadı');
            }
            return user;
        });
    },
    /**
     * Email ile kullanıcı getir (kimlik doğrulama için)
     */
    getUserByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield database_1.default.user.findUnique({
                where: { email },
            });
            return user;
        });
    },
    /**
     * Yeni kullanıcı oluştur
     */
    createUser(userData) {
        return __awaiter(this, void 0, void 0, function* () {
            // Email veya kullanıcı adının kullanımda olup olmadığını kontrol et
            const existingUser = yield database_1.default.user.findFirst({
                where: {
                    OR: [
                        { email: userData.email },
                        { username: userData.username },
                    ],
                },
            });
            if (existingUser) {
                if (existingUser.email === userData.email) {
                    throw new error_utils_1.BadRequestError('Bu e-posta adresi zaten kullanımda');
                }
                if (existingUser.username === userData.username) {
                    throw new error_utils_1.BadRequestError('Bu kullanıcı adı zaten kullanımda');
                }
            }
            // Şifreyi hashle
            const hashedPassword = yield (0, auth_utils_1.hashPassword)(userData.password);
            // Kullanıcı oluştur
            const newUser = yield database_1.default.user.create({
                data: Object.assign(Object.assign({}, userData), { password: hashedPassword }),
                select: {
                    id: true,
                    username: true,
                    email: true,
                    name: true,
                    profileImage: true,
                    isAdmin: true,
                    createdAt: true,
                    updatedAt: true,
                },
            });
            return newUser;
        });
    },
    /**
     * Kullanıcı bilgilerini güncelle
     */
    updateUser(id, updateData) {
        return __awaiter(this, void 0, void 0, function* () {
            // Şifre varsa hashle
            if (updateData.password) {
                updateData.password = yield (0, auth_utils_1.hashPassword)(updateData.password);
            }
            // Kullanıcı güncelle
            try {
                const updatedUser = yield database_1.default.user.update({
                    where: { id },
                    data: updateData,
                    select: {
                        id: true,
                        username: true,
                        email: true,
                        name: true,
                        profileImage: true,
                        isAdmin: true,
                        createdAt: true,
                        updatedAt: true,
                    },
                });
                return updatedUser;
            }
            catch (error) {
                throw new error_utils_1.NotFoundError('Kullanıcı bulunamadı');
            }
        });
    },
    /**
     * Kullanıcı sil
     */
    deleteUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield database_1.default.user.delete({
                    where: { id },
                });
            }
            catch (error) {
                throw new error_utils_1.NotFoundError('Kullanıcı bulunamadı');
            }
        });
    },
};
