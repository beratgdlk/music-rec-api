import express from 'express';
import helmet from 'helmet';

// Configs
import { PORT } from './config/env';
import './config/database';

// Routes
import authRoutes from './routes/auth.routes';
import userRoutes from './routes/user.routes';
import trackRoutes from './routes/track.routes';
import playlistRoutes from './routes/playlist.routes';

// Middlewares
import { corsMiddleware } from './middlewares/cors.middleware';
import { apiLimiter, authLimiter } from './middlewares/rateLimit.middleware';
import { errorHandler, notFound } from './middlewares/error.middleware';

const app = express();

// Security middleware
app.use(helmet());

// Global Middlewares
app.use(corsMiddleware);
app.use(express.json());
app.use(apiLimiter);

// Auth routes with stricter rate limiting
app.use('/api/auth', authLimiter, authRoutes);

// User routes
app.use('/api/users', userRoutes);

// Track routes
app.use('/api/tracks', trackRoutes);

// Playlist routes 
app.use('/api/playlists', playlistRoutes);

// Root endpoint
app.get('/', (req, res) => {
  res.json({ message: 'Music API is running!' });
});

// Error handling
app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
}); 