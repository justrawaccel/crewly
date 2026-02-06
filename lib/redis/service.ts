import { appLog } from '@lib/logger';
import { redis } from './client';

class CacheService {
  private readonly prefix: string;

  constructor(prefix: string) {
    this.prefix = prefix;
  }

  private getKey(key: string): string {
    return `${this.prefix}:${key}`;
  }

  async get<T>(key: string): Promise<T | null> {
    try {
      const value = await redis.get(this.getKey(key));

      return value ? JSON.parse(value) : null;
    } catch (error) {
      appLog.error(`cache get error for key ${key}:`, error);
      return null;
    }
  }

  async set<T>(key: string, value: T, ttl?: number): Promise<boolean> {
    try {
      const serialized = JSON.stringify(value);

      if (ttl) {
        await redis.setex(this.getKey(key), ttl, serialized);
      } else {
        await redis.set(this.getKey(key), serialized);
      }

      return true;
    } catch (error) {
      appLog.error(`cache set error for key ${key}:`, error);
      return false;
    }
  }

  async del(key: string): Promise<boolean> {
    try {
      await redis.del(this.getKey(key));

      return true;
    } catch (error) {
      appLog.error(`cache delete error for key ${key}:`, error);
      return false;
    }
  }

  async has(key: string): Promise<boolean> {
    try {
      const exists = await redis.exists(this.getKey(key));

      return exists === 1;
    } catch (error) {
      appLog.error(`cache exists check error for key ${key}:`, error);
      return false;
    }
  }

  async clearByPattern(pattern: string): Promise<number> {
    try {
      const keys = await redis.keys(this.getKey(pattern));
      if (keys.length === 0) return 0;

      return redis.del(...keys);
    } catch (error) {
      appLog.error(`cache clear by pattern error for ${pattern}:`, error);
      return 0;
    }
  }

  async getTTL(key: string): Promise<number> {
    try {
      return redis.ttl(this.getKey(key));
    } catch (error) {
      appLog.error(`cache TTL check error for key ${key}:`, error);
      return -1;
    }
  }

  async setWithoutExpiry<T>(key: string, value: T): Promise<boolean> {
    try {
      const serialized = JSON.stringify(value);

      await redis.set(this.getKey(key), serialized);

      return true;
    } catch (error) {
      appLog.error(`cache set without expiry error for key ${key}:`, error);
      return false;
    }
  }

  async increment(key: string, amount = 1): Promise<number> {
    try {
      return redis.incrby(this.getKey(key), amount);
    } catch (error) {
      appLog.error(`cache increment error for key ${key}:`, error);
      return 0;
    }
  }

  async decrement(key: string, amount = 1): Promise<number> {
    try {
      return redis.decrby(this.getKey(key), amount);
    } catch (error) {
      appLog.error(`cache decrement error for key ${key}:`, error);
      return 0;
    }
  }
}

export { CacheService };
