import { Express } from 'express-serve-static-core';
import { User } from '@prisma/client';

declare global {
  namespace Express {
    interface Request {
      userId?: number;
      user?: User;
    }
  }
}

export {}; 