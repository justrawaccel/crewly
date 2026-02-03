import { pino } from "pino";

// todo: load from yml config (need additional lib)
const loggerLevel = "debug";

const logger = pino({
  level: loggerLevel,
  formatters: {
    level: (label) => ({ level: label }),
    bindings: (bindings) => ({
      pid: bindings.pid,
      host: bindings.hostname,
    }),
  },
  timestamp: pino.stdTimeFunctions.isoTime,
});

const createLogger = (context: string) => logger.child({ context });

export { logger, createLogger };
