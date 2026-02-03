import { logger } from './instant';

const appLog = {
  info: (message: string, meta?: Record<string, unknown>) => logger.info(meta, message),
  error: (message: string, error?: Error | unknown, meta?: Record<string, unknown>) =>
    error instanceof Error
      ? logger.error({ ...meta, err: error, stack: error.stack }, message)
      : logger.error({ ...meta, error }, message),
  warn: (message: string, meta?: Record<string, unknown>) => logger.warn(meta, message),
  debug: (message: string, meta?: Record<string, unknown>) => logger.debug(meta, message),
  trace: (message: string, meta?: Record<string, unknown>) => logger.trace(meta, message)
};

export { logger, createLogger } from './instant';
export { appLog };
