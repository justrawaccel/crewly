import { config } from '@lib/config';
import { isDevelopment } from '@lib/constants';
import { pino, type LevelWithSilentOrString } from 'pino';

const loggerLevel = config.features<LevelWithSilentOrString>('logger.level');

const logger = pino({
  level: loggerLevel,
  base: {
    pid: process.pid
  },
  timestamp: pino.stdTimeFunctions.isoTime,
  transport: isDevelopment
    ? {
        target: 'pino-pretty',
        options: {
          colorize: true,
          levelFirst: true,
          translateTime: 'HH:MM:ss.l A',
          ignore: 'hostname',
          singleLine: false,
          messageFormat: '{msg}'
        }
      }
    : undefined
});

const createLogger = (context: string) => logger.child({ context });

export { logger, createLogger };
