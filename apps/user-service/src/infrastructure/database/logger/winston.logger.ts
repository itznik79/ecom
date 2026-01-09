import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';
import * as path from 'path';
import * as fs from 'fs';

const logDir = path.join(process.cwd(), 'logs');

// Ensure logs directory exists
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir, { recursive: true });
}

const isProd = process.env.NODE_ENV === 'production';

const logFormat = winston.format.printf(
  ({ level, message, timestamp, context, stack }) => {
    return `[${timestamp}] ${level.toUpperCase()}${
      context ? ` [${context}]` : ''
    }: ${stack || message}`;
  },
);

export const winstonLogger = WinstonModule.createLogger({
  level: isProd ? 'info' : 'debug',

  format: winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.errors({ stack: true }),
    isProd ? winston.format.json() : logFormat,
  ),

  defaultMeta: {
    service: process.env.SERVICE_NAME,
    env: process.env.NODE_ENV,
  },

  transports: [
    new winston.transports.Console(),

    new winston.transports.File({
      filename: path.join(logDir, 'error.log'),
      level: 'error',
    }),

    new winston.transports.File({
      filename: path.join(logDir, 'combined.log'),
    }),
  ],
});
