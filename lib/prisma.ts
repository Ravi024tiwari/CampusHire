import 'dotenv/config';
import { PrismaNeon } from '@prisma/adapter-neon';
import { PrismaClient } from '@/src/generated/prisma';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

function makePrismaClient() {
  const connectionString = process.env.DATABASE_URL || '';
  const adapter = new PrismaNeon({ connectionString });
  return new PrismaClient({
    adapter,
    log: process.env.NODE_ENV === 'development' ? ['warn', 'error'] : ['error'],
  });
}

// In development, recreate if model definitions changed or instantiate fresh
export const prisma = makePrismaClient();

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}

