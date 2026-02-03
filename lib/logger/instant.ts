import { config } from '@lib/config';
import { pino, type LevelWithSilentOrString } from 'pino';

const loggerLevel = config.features<LevelWithSilentOrString>('logger.level');

const logger = pino({
  level: loggerLevel,
  transport: {
    target: 'pino-pretty',
    options: {
      colorize: true,
      translateTime: 'SYS:HH:MM:ss.l',
      ignore: 'pid,hostname',
      messageFormat: '{context} {msg}',
      errorLikeObjectKeys: ['err', 'error'],
      singleLine: false
    }
  }
});

const createLogger = (context: string) => logger.child({ context });

export { logger, createLogger };
