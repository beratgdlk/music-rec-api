import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../utils/error.utils';
import { NODE_ENV } from '../config/env';

/**
 * Global error handling middleware
 */
export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err);

  // Default error
  let statusCode = 500;
  let message = 'Sunucu hatası';
  let stack = err.stack;

  // If known API error
  if (err instanceof ApiError) {
    statusCode = err.statusCode;
    message = err.message;
  }

  // Send error response
  res.status(statusCode).json({
    success: false,
    error: {
      message,
      // Only include stack in development
      ...(NODE_ENV === 'development' && { stack }),
    },
  });
};

/**
 * 404 Not Found handler for undefined routes
 */
export const notFound = (req: Request, res: Response, next: NextFunction) => {
  const error = new ApiError(`Bulunamadı - ${req.originalUrl}`, 404);
  next(error);
}; 