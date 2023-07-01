import mongoose from 'mongoose';
import app from './app';
import config from './config/index';
import { logger, errorlogger } from './shared/logger';
import { Server } from 'http';

// Handling uncaught exceptions
process.on('uncaughtException', error => {
  errorlogger.error(error);
  process.exit(1);
});

let server: Server;

async function bootstrap() {
  try {
    // Connect to the database
    await mongoose.connect(config.database_url as string);
    logger.info('✅ Database connected successfully');

    // Start the server
    server = app.listen(config.port, () => {
      logger.info(`Application listening on port ${config.port}`);
    });
  } catch (err) {
    // Log error if database connection fails
    errorlogger.error('❌ Failed to connect database.', err);
  }

  // Gracefully shutting down the server in case of unhandled rejection
  process.on('unhandledRejection', error => {
    errorlogger.error(error);

    if (server) {
      // Close the server and log the error
      server.close(() => {
        errorlogger.error(error);
        process.exit(1);
      });
    } else {
      // If server is not available, exit the process
      process.exit(1);
    }
  });
}

// Call the bootstrap function to start the application
bootstrap();

// Handling SIGTERM signal
process.on('SIGTERM', () => {
  logger.info('SIGTERM is received.');
  if (server) {
    // Close the server gracefully
    server.close();
  }
});
