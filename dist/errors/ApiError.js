'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
class ApiError extends Error {
  constructor(status, message, stack = '') {
    super(message);
    this.status = status;
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}
exports.default = ApiError;
