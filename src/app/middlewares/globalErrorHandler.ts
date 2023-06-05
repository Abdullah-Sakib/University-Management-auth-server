import { ErrorRequestHandler } from 'express'
import config from '../../config'
import { GenericErrorMessage } from '../../interfaces/error'
import { handleValidationError } from '../../errors/handleValidationError'
import ApiError from '../../errors/ApiError'

// Global error handler middleware
const globalErrorHandler: ErrorRequestHandler = (
  err, // Error object representing a validation error
  req, // Express request object
  res, // Express response object
  next // Express next function
) => {
  let statusCode = 500 // Default status code for internal server errors
  let message = 'Something went wrong!' // Default error message
  let errorMessage: GenericErrorMessage[] = [] // Array to store detailed error messages

  // Check if the error is a validation error
  if (err?.name === 'ValidationError') {
    // Handle the validation error
    const simplifiedError = handleValidationError(err)
    statusCode = simplifiedError?.statusCode
    message = simplifiedError?.message
    errorMessage = simplifiedError?.errorMessage
  }
  // Check if the error is an instance of the custom ApiError class
  else if (err instanceof ApiError) {
    statusCode = err?.status
    message = err?.message
    errorMessage = err?.message
      ? [
          {
            path: '',
            message: err?.message,
          },
        ]
      : []
  }
  // Check if the error is a generic Error object
  else if (err instanceof Error) {
    message = err?.message
    errorMessage = err?.message
      ? [
          {
            path: '',
            message: err?.message,
          },
        ]
      : []
  }

  // Send the error response
  res.status(statusCode).json({
    success: false,
    message,
    errorMessage,
    stack: config.env !== 'production' ? err.stack : undefined,
  })
  next() // Call the next middleware function
}

export default globalErrorHandler
