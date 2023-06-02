import winston from 'winston'
import path from 'path'
import process from 'process'

// Create a logger for general information logs
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  defaultMeta: { service: 'user-service' },
  transports: [
    new winston.transports.Console(), // Log to the console
    new winston.transports.File({
      // Log to a file
      filename: path.join(process.cwd(), 'logs', 'winston', 'success.log'), // Specify the file path for success logs
      level: 'info',
    }),
  ],
})

// Create a logger specifically for error logs
const errorlogger = winston.createLogger({
  level: 'error',
  format: winston.format.json(),
  defaultMeta: { service: 'user-service' },
  transports: [
    new winston.transports.Console(), // Log errors to the console
    new winston.transports.File({
      // Log errors to a file
      filename: path.join(process.cwd(), 'logs', 'winston', 'error.log'), // Specify the file path for error logs
      level: 'error',
    }),
  ],
})

export { logger, errorlogger }
