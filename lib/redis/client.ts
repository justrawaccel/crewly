import { appLog } from '@lib/logger';
import Redis from 'ioredis';

export const redis = new Redis(process.env.REDIS_URL!, {
  maxRetriesPerRequest: 3,
  retryStrategy: (times) => Math.min(times * 50, 2000),
  lazyConnect: false
});

redis.on('error', (error) => {
  appLog.error('redis connection error:', error);
});

redis.on('connect', () => {
  appLog.info('redis connected');
});
