import express from 'express';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';

// Routes
import authRoutes from './routes/auth.routes';
import userRoutes from './routes/user.routes';

// Middlewares
import { corsMiddleware } from './middlewares/cors.middleware';
import { apiLimiter, authLimiter } from './middlewares/rateLimit.middleware';

dotenv.config();

const app = express();
export const prisma = new PrismaClient();
const PORT = process.env.PORT || 5000;

// Global Middlewares
app.use(corsMiddleware);
app.use(express.json());
app.use(apiLimiter);

// Auth routes with stricter rate limiting
app.use('/api/auth', authLimiter, authRoutes);

// User routes
app.use('/api/users', userRoutes);

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