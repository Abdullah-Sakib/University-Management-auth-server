import mongoose from 'mongoose';
import { GenericErrorMessage } from '../interfaces/error';

export const handleCastError = (error: mongoose.Error.CastError) => {
  const errors: GenericErrorMessage[] = [
    {
      path: error.path,
      message: 'Invalid Id',
    },
  ];
  const statusCode = 400;
  return {
    statusCode,
    message: 'Cast error',
    errorMessage: errors,
  };
};
