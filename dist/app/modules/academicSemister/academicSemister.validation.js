'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.AcademicSemisterValidation = void 0;
const zod_1 = require('zod');
const academicSemister_constants_1 = require('./academicSemister.constants');
// Define the Zod schema for creating a academic semister
const createAcademicSemisterZodSchema = zod_1.z.object({
  body: zod_1.z.object({
    title: zod_1.z.enum(
      [...academicSemister_constants_1.AcademicSemisterTitles],
      {
        required_error: 'title is required',
      }
    ),
    year: zod_1.z.number({
      required_error: 'year is required',
    }),
    code: zod_1.z.enum(
      [...academicSemister_constants_1.AcademicSemisterCodes],
      {
        required_error: 'code is required',
      }
    ),
    startMonth: zod_1.z.enum(
      [...academicSemister_constants_1.AcademicSemisterMonths],
      {
        required_error: 'start month is required',
      }
    ),
    endMonth: zod_1.z.enum(
      [...academicSemister_constants_1.AcademicSemisterMonths],
      {
        required_error: 'end month is required',
      }
    ),
  }),
});
exports.AcademicSemisterValidation = {
  createAcademicSemisterZodSchema,
};
