"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = __importDefault(require("winston"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const env_1 = require("../config/env");
// Log dizini oluştur (yoksa)
const logDir = path_1.default.resolve(process.cwd(), 'logs');
if (!fs_1.default.existsSync(logDir)) {
    fs_1.default.mkdirSync(logDir, { recursive: true });
}
// Log seviyelerini tanımla
const levels = {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    debug: 4,
};
// Çalışma ortamına göre log seviyesini belirle
const level = () => {
    return env_1.NODE_ENV === 'development' ? 'debug' : 'warn';
};
// Tarih ve saat formatını tanımla
const format = winston_1.default.format.combine(winston_1.default.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), winston_1.default.format.printf((info) => `${info.timestamp} ${info.level}: ${info.message}`));
// Transport'ları tanımla (nereye log yazılacak)
const transports = [
    // Konsola yazma
    new winston_1.default.transports.Console(),
    // Tüm loglar için dosya
    new winston_1.default.transports.File({
        filename: path_1.default.join(logDir, 'all.log')
    }),
    // Sadece hatalar için ayrı dosya
    new winston_1.default.transports.File({
        filename: path_1.default.join(logDir, 'error.log'),
        level: 'error'
    }),
];
// Winston logger'ı oluştur
const logger = winston_1.default.createLogger({
    level: level(),
    levels,
    format,
    transports,
});
exports.default = logger;
