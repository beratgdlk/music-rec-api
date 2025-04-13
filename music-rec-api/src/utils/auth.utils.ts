import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { JWT_SECRET, JWT_EXPIRES_IN } from '../config/env';
import crypto from 'crypto';

/**
 * Generate JWT token (access token)
 */
export const generateToken = (userId: number): string => {
  return jwt.sign({ id: userId }, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
  });
};

/**
 * Generate refresh token
 */
export const generateRefreshToken = (): string => {
  return crypto.randomBytes(40).toString('hex');
};

/**
 * Calculate refresh token expiry (30 days from now)
 */
export const getRefreshTokenExpiry = (): Date => {
  const expiryDays = 30;
  const expiryDate = new Date();
  expiryDate.setDate(expiryDate.getDate() + expiryDays);
  return expiryDate;
};

/**
 * Hash password
 */
export const hashPassword = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

/**
 * Compare password with hash
 */
export const comparePassword = async (
  password: string,
  hashedPassword: string
): Promise<boolean> => {
  return bcrypt.compare(password, hashedPassword);
};