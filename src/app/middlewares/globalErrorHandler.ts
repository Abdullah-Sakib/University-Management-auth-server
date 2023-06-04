import { NextFunction, Request, Response } from 'express'
import config from '../../config'
import { GenericErrorMessage } from '../../interfaces/error'
import { handleValidationError } from '../../errors/handleValidationError'
import ApiError from '../../errors/ApiError'
import mongoose from 'mongoose'

const globalErrorHandler = (
  err: mongoose.Error.ValidationError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let statusCode = 500
  let message = 'Something went wrong!'
  let errorMessage: GenericErrorMessage[] = []

  if (err?.name === 'ValidationError') {
    const simplifiedError = handleValidationError(err)
    statusCode = simplifiedError?.statusCode
    message = simplifiedError?.message
    errorMessage = simplifiedError?.errorMessage
  } else if (err instanceof ApiError) {
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
  } else if (err instanceof Error) {
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

  res.status(statusCode).json({
    success: false,
    message,
    errorMessage,
    stack: config.env !== 'production' ? err.stack : undefined,
  })
  next()
}

export default globalErrorHandler
