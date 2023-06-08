'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.errorlogger = exports.logger = void 0;
const winston_1 = require('winston');
const path_1 = __importDefault(require('path'));
const process_1 = __importDefault(require('process'));
const winston_daily_rotate_file_1 = __importDefault(
  require('winston-daily-rotate-file')
);
const { combine, timestamp, label, printf, prettyPrint } = winston_1.format;
// Custom format
const myFormat = printf(({ level, message, label, timestamp }) => {
  const date = new Date(timestamp);
  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();
  return `${`[${date.toDateString()} ${hour}:${minute}:${second}]`} [${label}] ${level}: ${message}`;
});
// Create a logger for general information logs
const logger = (0, winston_1.createLogger)({
  level: 'info',
  format: combine(label({ label: 'UM' }), timestamp(), myFormat, prettyPrint()),
  defaultMeta: { service: 'user-service' },
  transports: [
    new winston_1.transports.Console(),
    new winston_daily_rotate_file_1.default({
      filename: path_1.default.join(
        process_1.default.cwd(),
        'logs',
        'winston',
        'success',
        'UMS-%DATE%-success.log'
      ),
      datePattern: 'YYYY-MM-DD-HH',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '14d',
    }),
  ],
});
exports.logger = logger;
// Create a logger specifically for error logs
const errorlogger = (0, winston_1.createLogger)({
  level: 'error',
  format: combine(label({ label: 'UM' }), timestamp(), myFormat, prettyPrint()),
  defaultMeta: { service: 'user-service' },
  transports: [
    new winston_1.transports.Console(),
    new winston_daily_rotate_file_1.default({
      filename: path_1.default.join(
        process_1.default.cwd(),
        'logs',
        'winston',
        'errors',
        'UMS-%DATE%-errors.log'
      ),
      datePattern: 'YYYY-MM-DD-HH',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '14d',
    }),
  ],
});
exports.errorlogger = errorlogger;
