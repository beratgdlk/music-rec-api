"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
// Configs
const env_1 = require("./config/env");
require("./config/database");
const logger_utils_1 = __importDefault(require("./utils/logger.utils"));
// Routes
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const track_routes_1 = __importDefault(require("./routes/track.routes"));
const playlist_routes_1 = __importDefault(require("./routes/playlist.routes"));
const recommendation_routes_1 = __importDefault(require("./routes/recommendation.routes"));
// Middlewares
const cors_middleware_1 = require("./middlewares/cors.middleware");
const rateLimit_middleware_1 = require("./middlewares/rateLimit.middleware");
const error_middleware_1 = require("./middlewares/error.middleware");
const logger_middleware_1 = require("./middlewares/logger.middleware");
const app = (0, express_1.default)();
// Security middleware
app.use((0, helmet_1.default)());
// Global Middlewares
app.use(cors_middleware_1.corsMiddleware);
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use(logger_middleware_1.requestLogger);
app.use(rateLimit_middleware_1.apiLimiter);
// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'Service is healthy' });
});
// Auth routes with stricter rate limiting
app.use('/api/auth', rateLimit_middleware_1.authLimiter, auth_routes_1.default);
// User routes
app.use('/api/users', user_routes_1.default);
// Track routes
app.use('/api/tracks', track_routes_1.default);
// Playlist routes 
app.use('/api/playlists', playlist_routes_1.default);
// Recommendation routes
app.use('/api/recommendations', recommendation_routes_1.default);
// Root endpoint
app.get('/', (req, res) => {
    res.json({ message: 'Music API is running!' });
});
// Error handling
app.use(error_middleware_1.notFound);
app.use(error_middleware_1.errorHandler);
app.listen(env_1.PORT, () => {
    logger_utils_1.default.info(`Server running at http://localhost:${env_1.PORT}`);
});
