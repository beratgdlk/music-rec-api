// Define UserData type based on what we need rather than importing from Prisma
export interface UserData {
  id: number;
  email: string;
  username: string;
  name?: string | null;
  profileImage?: string | null;
  isAdmin: boolean;
  createdAt: Date;
  updatedAt: Date;
}

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

// Auth response with tokens
export interface AuthResponse {
  user: UserData;
  accessToken: string;
  refreshToken: string;
}

// Refresh token request
export interface RefreshTokenRequest {
  refreshToken: string;
}

// Token response
export interface TokenResponse {
  accessToken: string;
  refreshToken: string;
} 