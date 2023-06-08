"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("../../config"));
const handleValidationError_1 = require("../../errors/handleValidationError");
const ApiError_1 = __importDefault(require("../../errors/ApiError"));
const logger_1 = require("../../shared/logger");
const zod_1 = require("zod");
const handleZodError_1 = __importDefault(require("../../errors/handleZodError"));
// Global error handler middleware
const globalErrorHandler = (err, // Error object representing a validation error
req, // Express request object
res, // Express response object
next // Express next function
) => {
    // Log errors in production environment otherwise log in console
    config_1.default.env === 'development'
        ? console.log(`😲 globalErrorHander`, err)
        : logger_1.errorlogger.error(`😲 globalErrorHander`, err);
    let statusCode = 500; // Default status code for internal server errors
    let message = 'Something went wrong!'; // Default error message
    let errorMessage = []; // Array to store detailed error messages
    // Check if the error is a validation error
    if ((err === null || err === void 0 ? void 0 : err.name) === 'ValidationError') {
        // Handle the validation error
        const simplifiedError = (0, handleValidationError_1.handleValidationError)(err);
        statusCode = simplifiedError === null || simplifiedError === void 0 ? void 0 : simplifiedError.statusCode;
        message = simplifiedError === null || simplifiedError === void 0 ? void 0 : simplifiedError.message;
        errorMessage = simplifiedError === null || simplifiedError === void 0 ? void 0 : simplifiedError.errorMessage;
    }
    // Checi if the error is an instance of ZodError
    else if (err instanceof zod_1.ZodError) {
        const simplifiedError = (0, handleZodError_1.default)(err);
        statusCode = simplifiedError === null || simplifiedError === void 0 ? void 0 : simplifiedError.statusCode;
        message = simplifiedError === null || simplifiedError === void 0 ? void 0 : simplifiedError.message;
        errorMessage = simplifiedError === null || simplifiedError === void 0 ? void 0 : simplifiedError.errorMessage;
    }
    // Check if the error is an instance of the custom ApiError class
    else if (err instanceof ApiError_1.default) {
        statusCode = err === null || err === void 0 ? void 0 : err.status;
        message = err === null || err === void 0 ? void 0 : err.message;
        errorMessage = (err === null || err === void 0 ? void 0 : err.message)
            ? [
                {
                    path: '',
                    message: err === null || err === void 0 ? void 0 : err.message,
                },
            ]
            : [];
    }
    // Check if the error is a generic Error object
    else if (err instanceof Error) {
        message = err === null || err === void 0 ? void 0 : err.message;
        errorMessage = (err === null || err === void 0 ? void 0 : err.message)
            ? [
                {
                    path: '',
                    message: err === null || err === void 0 ? void 0 : err.message,
                },
            ]
            : [];
    }
    // Send the error response
    res.status(statusCode).json({
        success: false,
        message,
        errorMessage,
        stack: config_1.default.env !== 'production' ? err.stack : undefined,
    });
    next(); // Call the next middleware function
};
exports.default = globalErrorHandler;
