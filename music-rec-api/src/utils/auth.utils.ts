import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { JWT_SECRET, JWT_EXPIRES_IN } from '../config/env';

/**
 * Generate JWT token
 */
export const generateToken = (userId: number): string => {
  return jwt.sign({ id: userId }, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
  });
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