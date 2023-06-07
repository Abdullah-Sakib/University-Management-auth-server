import { NextFunction, Request, RequestHandler, Response } from 'express';

// Function to wrap an asynchronous request handler with error handling
const catchAsync = (func: RequestHandler) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      func(req, res, next); // Call the provided request handler function
    } catch (error) {
      next(); // Call the next middleware or error handler in case of an error
    }
  };
};

export default catchAsync;
