import dotenv from "dotenv";

// Env configuration
dotenv.config();

// Constants
export const PORT = process.env.PORT || 5000;
export const NODE_ENV = process.env.NODE_ENV || "development";
export const JWT_SECRET = process.env.JWT_SECRET || "your_default_jwt_secret";
export const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "7d";

// Database
export const DATABASE_URL = process.env.DATABASE_URL;
