import express from 'express';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';

// Routes
import authRoutes from './routes/auth.routes';
import userRoutes from './routes/user.routes';
import playlistRoutes from './routes/playlist.routes';
import trackRoutes from './routes/track.routes';

// Middlewares
import { corsMiddleware } from './middlewares/cors.middleware';
import { apiLimiter, authLimiter, adminLimiter } from './middlewares/rateLimit.middleware';

dotenv.config();

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 5000;

// Global Middlewares
app.use(corsMiddleware);
app.use(express.json());
app.use(apiLimiter);

// Auth routes with stricter rate limiting
app.use('/api/auth', authLimiter, authRoutes);

// Admin routes with admin rate limiting
app.use('/api/admin', adminLimiter, userRoutes);

// Other routes
app.use('/api/users', userRoutes);
app.use('/api/playlists', playlistRoutes);
app.use('/api/tracks', trackRoutes);

// Root endpoint
app.get('/', (req, res) => {
  res.json({ message: 'Music API is running!' });
});

// Error handler
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Server error!' });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

export { prisma }; 