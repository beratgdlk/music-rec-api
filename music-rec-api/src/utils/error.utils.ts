/**
 * Custom API Error class with status code
 */
export class ApiError extends Error {
  statusCode: number;
  
  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * Not Found Error (404)
 */
export class NotFoundError extends ApiError {
  constructor(message = 'Resource not found') {
    super(message, 404);
  }
}

/**
 * Bad Request Error (400)
 */
export class BadRequestError extends ApiError {
  constructor(message = 'Bad request') {
    super(message, 400);
  }
}

/**
 * Unauthorized Error (401)
 */
export class UnauthorizedError extends ApiError {
  constructor(message = 'Unauthorized') {
    super(message, 401);
  }
}

/**
 * Forbidden Error (403)
 */
export class ForbiddenError extends ApiError {
  constructor(message = 'Forbidden') {
    super(message, 403);
  }
} 