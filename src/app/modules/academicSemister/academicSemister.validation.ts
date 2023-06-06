import { z } from 'zod';
import {
  AcademicSemisterCodes,
  AcademicSemisterMonths,
  AcademicSemisterTitles,
} from './academicSemister.constants';

// Define the Zod schema for creating a academic semister
const createAcademicSemisterZodSchema = z.object({
  body: z.object({
    title: z.enum([...AcademicSemisterTitles] as [string, ...string[]], {
      required_error: 'title is required',
    }),
    year: z.number({
      required_error: 'year is required',
    }),
    code: z.enum([...AcademicSemisterCodes] as [string, ...string[]], {
      required_error: 'code is required',
    }),
    startMonth: z.enum([...AcademicSemisterMonths] as [string, ...string[]], {
      required_error: 'start month is required',
    }),
    endMonth: z.enum([...AcademicSemisterMonths] as [string, ...string[]], {
      required_error: 'end month is required',
    }),
  }),
});

export const AcademicSemisterValidation = {
  createAcademicSemisterZodSchema,
};
