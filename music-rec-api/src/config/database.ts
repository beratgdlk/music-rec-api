import { PrismaClient } from '@prisma/client';

// Singleton pattern for Prisma client
export const prisma = new PrismaClient();

export default prisma; 