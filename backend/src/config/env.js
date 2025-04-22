"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DATABASE_URL = exports.JWT_EXPIRES_IN = exports.JWT_SECRET = exports.NODE_ENV = exports.PORT = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
// Env configuration
dotenv_1.default.config();
// Constants
exports.PORT = process.env.PORT || 5000;
exports.NODE_ENV = process.env.NODE_ENV || 'development';
exports.JWT_SECRET = process.env.JWT_SECRET || 'your_default_jwt_secret';
exports.JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';
// Database
exports.DATABASE_URL = process.env.DATABASE_URL;
