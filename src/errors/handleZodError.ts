import { ZodError, ZodIssue } from 'zod';
import { GenericErrorResponse } from '../interfaces/common';
import { GenericErrorMessage } from '../interfaces/error';

// Function to handle Zod validation errors
const handleZodError = (error: ZodError): GenericErrorResponse => {
  // Extract the individual issues from the ZodError
  const errors: GenericErrorMessage[] = error?.issues?.map(
    (issue: ZodIssue) => {
      return {
        // Extract the last property in the path array as the path
        path: issue?.path[issue?.path?.length - 1],
        // Extract the error message
        message: issue.message,
      };
    }
  );

  const statusCode = 400;
  return {
    // Set the response status code
    statusCode,
    // Set the generic message for the error
    message: 'Zod Validation Error',
    // Set the detailed error messages
    errorMessage: errors,
  };
};

export default handleZodError;
