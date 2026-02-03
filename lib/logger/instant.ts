import { config } from '@lib/config';
import { pino, type LevelWithSilentOrString } from 'pino';

const loggerLevel = config.features<LevelWithSilentOrString>('logger.level');

const logger = pino({
  level: loggerLevel,
  formatters: {
    level: (label) => ({ level: label }),
    bindings: (bindings) => ({
      pid: bindings.pid,
      host: bindings.hostname
    })
  },
  timestamp: pino.stdTimeFunctions.isoTime
});

const createLogger = (context: string) => logger.child({ context });

export { logger, createLogger };
