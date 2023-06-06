import mongoose from 'mongoose';
import { GenericErrorMessage } from '../interfaces/error';
import { GenericErrorResponse } from '../interfaces/common';

// This function handles validation errors in Mongoose and returns a formatted error response
export const handleValidationError = (
  err: mongoose.Error.ValidationError
): GenericErrorResponse => {
  const errors: GenericErrorMessage[] = Object.values(err.errors).map(
    (error: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
      return {
        path: error?.path,
        message: error?.message,
      };
    }
  );
  const statusCode = 400;
  return {
    statusCode,
    message: 'Validation error',
    errorMessage: errors,
  };
};
