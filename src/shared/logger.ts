import { createLogger, format, transports } from 'winston';
import path from 'path';
import process from 'process';
import DailyRotateFile from 'winston-daily-rotate-file';
const { combine, timestamp, label, printf /* prettyPrint */ } = format;

// Custom format
const myFormat = printf(({ level, message, label, timestamp }) => {
  const date = new Date(timestamp);
  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();
  return `${`[${date.toDateString()} ${hour}:${minute}:${second}]`} [${label}] ${level}: ${message}`;
});

// Create a logger for general information logs
const logger = createLogger({
  level: 'info',
  format: combine(
    label({ label: 'UM' }),
    timestamp(),
    myFormat /* prettyPrint() */
  ),
  defaultMeta: { service: 'user-service' },
  transports: [
    new transports.Console(), // Log to the console
    new DailyRotateFile({
      filename: path.join(
        process.cwd(),
        'logs',
        'winston',
        'success',
        'UMS-%DATE%-success.log'
      ), // Specify the file path for success logs
      datePattern: 'YYYY-MM-DD-HH',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '14d',
    }),
  ],
});

// Create a logger specifically for error logs
const errorlogger = createLogger({
  level: 'error',
  format: combine(
    label({ label: 'UM' }),
    timestamp(),
    myFormat /* prettyPrint() */
  ),
  defaultMeta: { service: 'user-service' },
  transports: [
    new transports.Console(), // Log errors to the console
    new DailyRotateFile({
      filename: path.join(
        process.cwd(),
        'logs',
        'winston',
        'errors',
        'UMS-%DATE%-errors.log'
      ), // Specify the file path for success logs
      datePattern: 'YYYY-MM-DD-HH',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '14d',
    }),
  ],
});

export { logger, errorlogger };
