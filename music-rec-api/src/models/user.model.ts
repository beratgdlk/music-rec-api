import { User as PrismaUser, Friendship } from '@prisma/client';

// User type without sensitive fields
export type UserData = Omit<PrismaUser, 'password'>;

// User input for registration
export interface UserRegisterInput {
  username: string;
  email: string;
  password: string;
  name?: string;
  profileImage?: string;
}

// User input for login
export interface UserLoginInput {
  email: string;
  password: string;
}

// User input for update
export interface UserUpdateInput {
  username?: string;
  name?: string;
  profileImage?: string;
  password?: string;
}

// Auth response with token
export interface AuthResponse {
  user: UserData;
  token: string;
} 