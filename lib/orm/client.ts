import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@db/client';
import { isDevelopment } from '@lib/constants';
import pg from 'pg';

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);

const orm = new PrismaClient({
  adapter,
  log: isDevelopment ? ['query', 'error', 'warn'] : ['error'],
  errorFormat: 'minimal'
});

export { orm };
