import cookieParser from "cookie-parser";
import express from "express";
import helmet from "helmet";

// Configs
import "./config/database";
import { PORT } from "./config/env";
import logger from "./utils/logger.utils";

// Routes
import authRoutes from "./routes/auth.routes";
import playlistRoutes from "./routes/playlist.routes";
import recommendationRoutes from "./routes/recommendation.routes";
import trackRoutes from "./routes/track.routes";
import userRoutes from "./routes/user.routes";

// Middlewares
import { corsMiddleware } from "./middlewares/cors.middleware";
import { errorHandler, notFound } from "./middlewares/error.middleware";
import { requestLogger } from "./middlewares/logger.middleware";
import { apiLimiter, authLimiter } from "./middlewares/rateLimit.middleware";

const app = express();

// Security middleware
app.use(helmet());

// Global Middlewares
app.use(corsMiddleware);
app.use(express.json());
app.use(cookieParser());
app.use(requestLogger);
app.use(apiLimiter);

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "Service is healthy" });
});

// Auth routes with stricter rate limiting
app.use("/api/auth", authLimiter, authRoutes);

// User routes
app.use("/api/users", userRoutes);

// Track routes
app.use("/api/tracks", trackRoutes);

// Playlist routes
app.use("/api/playlists", playlistRoutes);

// Recommendation routes
app.use("/api/recommendations", recommendationRoutes);

// Root endpoint
app.get("/", (req, res) => {
  res.json({ message: "Music API is running!" });
});

// Error handling
app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  logger.info(`Server running at http://localhost:${PORT}`);
});
