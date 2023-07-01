/* eslint-disable no-console */
/* eslint-disable no-unused-expressions */
import { ErrorRequestHandler } from 'express';
import config from '../../config';
import { GenericErrorMessage } from '../../interfaces/error';
import { handleValidationError } from '../../errors/handleValidationError';
import ApiError from '../../errors/ApiError';
import { errorlogger } from '../../shared/logger';
import { ZodError } from 'zod';
import handleZodError from '../../errors/handleZodError';
import { handleCastError } from '../../errors/handleCastError';

// Global error handler middleware
const globalErrorHandler: ErrorRequestHandler = (
  err, // Error object representing a validation error
  req, // Express request object
  res, // Express response object
  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  next // Express next function
) => {
  // Log errors in production environment otherwise log in console
  config.env === 'development'
    ? console.log(`😲 globalErrorHander =>`, err)
    : errorlogger.error(`😲 globalErrorHander =>`, err);

  let statusCode = 500; // Default status code for internal server errors
  let message = 'Something went wrong!'; // Default error message
  let errorMessage: GenericErrorMessage[] = []; // Array to store detailed error messages

  // Check if the error is a mongoose validation error
  if (err?.name === 'ValidationError') {
    // Handle the validation error
    const simplifiedError = handleValidationError(err);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorMessage = simplifiedError?.errorMessage;
  }
  // Checi if the error is an instance of ZodError
  else if (err instanceof ZodError) {
    const simplifiedError = handleZodError(err);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorMessage = simplifiedError?.errorMessage;
  }
  // Check if the error is a cast error
  else if (err?.name === 'CastError') {
    // Handle the cast error
    const simplifiedError = handleCastError(err);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorMessage = simplifiedError?.errorMessage;
  }
  // Check if the error is an instance of the custom ApiError class
  else if (err instanceof ApiError) {
    statusCode = err?.statusCode;
    message = err?.message;
    errorMessage = err?.message
      ? [
          {
            path: '',
            message: err?.message,
          },
        ]
      : [];
  }
  // Check if the error is a generic Error object
  else if (err instanceof Error) {
    message = err?.message;
    errorMessage = err?.message
      ? [
          {
            path: '',
            message: err?.message,
          },
        ]
      : [];
  }

  // Send the error response
  res.status(statusCode).json({
    success: false,
    message,
    errorMessage,
    stack: config.env !== 'production' ? err.stack : undefined,
  });
};

export default globalErrorHandler;
