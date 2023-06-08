'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.UserValidation = void 0;
const zod_1 = require('zod');
// Define the Zod schema for creating a user
const createUserZodSchema = zod_1.z.object({
  body: zod_1.z.object({
    role: zod_1.z.string({
      required_error: 'role is required',
    }),
    password: zod_1.z.string().optional(),
  }),
});
exports.UserValidation = {
  createUserZodSchema,
};
