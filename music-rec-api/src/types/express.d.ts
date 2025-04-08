import { Express } from 'express';

// Express Request tipini genişlet
declare global {
  namespace Express {
    interface Request {
      userId?: number;
    }
  }
} 