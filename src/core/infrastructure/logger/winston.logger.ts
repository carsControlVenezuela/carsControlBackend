import winston from 'winston';
import { ILogger } from '../../domain/logger/logger.interface';

const { combine, timestamp, printf } = winston.format;

const RESET = '\x1b[0m';
const DIM = '\x1b[2m';
const PURPLE = '\x1b[35m';
const GREEN = '\x1b[32m';
const YELLOW = '\x1b[33m';
const RED = '\x1b[31m';
const BLUE = '\x1b[34m';

const levelConfig: Record<string, { label: string; color: string }> = {
  info: { label: 'INFO ', color: BLUE },
  debug: { label: 'DEBUG', color: GREEN },
  warn: { label: 'WARN ', color: YELLOW },
  error: { label: 'ERROR', color: RED },
};

const devFormat = printf(({ level, message, timestamp, context, ...meta }) => {
  const cfg = levelConfig[level] ?? { label: level.toUpperCase(), color: RESET };
  const badge = `${cfg.color}${cfg.label}${RESET}`;
  const time = `${DIM}${timestamp}${RESET}`;
  const ctx = context ? `${PURPLE}[${context}]${RESET} ` : '';
  const metaStr = Object.keys(meta).length
    ? ' ' +
      Object.entries(meta)
        .map(([k, v]) => `${DIM}${k}=${RESET}${v}`)
        .join(' ')
    : '';

  return `${time} ${badge} ${ctx}${message}${metaStr}`;
});

const logger = winston.createLogger({
  level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
  transports: [
    new winston.transports.Console({
      format: combine(timestamp({ format: 'HH:mm:ss' }), devFormat),
      silent: process.env.NODE_ENV === 'production',
    }),
    new winston.transports.File({
      filename: 'logs/error.log',
      level: 'error',
      format: combine(timestamp(), winston.format.json()),
    }),
    new winston.transports.File({
      filename: 'logs/combined.log',
      format: combine(timestamp(), winston.format.json()),
    }),
  ],
});

export class WinstonLogger implements ILogger {
  info(message: string, meta?: object): void {
    logger.info(message, meta);
  }
  error(message: string, meta?: object): void {
    logger.error(message, meta);
  }
  warn(message: string, meta?: object): void {
    logger.warn(message, meta);
  }
  debug(message: string, meta?: object): void {
    logger.debug(message, meta);
  }
}

export const AppLogger = new WinstonLogger();
