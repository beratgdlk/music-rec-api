import { NextFunction, Request, Response } from "express-serve-static-core";
import { NODE_ENV } from "../config/env";
import { ApiError } from "../utils/error.utils";
import logger from "../utils/logger.utils";

/**
 * Global error handling middleware
 */
export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Hatayı logla
  logger.error(
    `${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`
  );

  if (err.stack) {
    logger.debug(err.stack);
  }

  // Default error
  let statusCode = 500;
  let message = "Sunucu hatası";
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
      ...(NODE_ENV === "development" && { stack }),
    },
  });
};

/**
 * 404 Not Found handler for undefined routes
 */
export const notFound = (req: Request, res: Response, next: NextFunction) => {
  logger.warn(`404 - ${req.originalUrl} - ${req.method} - ${req.ip}`);
  const error = new ApiError(`Bulunamadı - ${req.originalUrl}`, 404);
  next(error);
};
