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
exports.comparePassword = exports.hashPassword = exports.getRefreshTokenExpiry = exports.generateRefreshToken = exports.generateToken = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const crypto_1 = __importDefault(require("crypto"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_1 = require("../config/env");
/**
 * Generate JWT token (access token)
 */
const generateToken = (userId) => {
    // @ts-ignore
    return jsonwebtoken_1.default.sign({ id: userId }, env_1.JWT_SECRET, {
        expiresIn: env_1.JWT_EXPIRES_IN,
    });
};
exports.generateToken = generateToken;
/**
 * Generate refresh token
 */
const generateRefreshToken = () => {
    return crypto_1.default.randomBytes(40).toString('hex');
};
exports.generateRefreshToken = generateRefreshToken;
/**
 * Calculate refresh token expiry (30 days from now)
 */
const getRefreshTokenExpiry = () => {
    const expiryDays = 30;
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + expiryDays);
    return expiryDate;
};
exports.getRefreshTokenExpiry = getRefreshTokenExpiry;
/**
 * Hash password
 */
const hashPassword = (password) => __awaiter(void 0, void 0, void 0, function* () {
    const salt = yield bcrypt_1.default.genSalt(10);
    return bcrypt_1.default.hash(password, salt);
});
exports.hashPassword = hashPassword;
/**
 * Compare password with hash
 */
const comparePassword = (password, hashedPassword) => __awaiter(void 0, void 0, void 0, function* () {
    return bcrypt_1.default.compare(password, hashedPassword);
});
exports.comparePassword = comparePassword;
