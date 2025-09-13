// prisma/client.ts
import { PrismaClient } from '@prisma/client';

// avoid duplicating client in dev/test hot-reloads
const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    // log: ['query', 'error', 'warn'], // enable if you want
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

export default prisma;
