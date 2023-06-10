import { z } from 'zod';
import {
  AcademicSemesterCodes,
  AcademicSemesterMonths,
  AcademicSemesterTitles,
} from './academicSemester.constants';

// Define the Zod schema for creating a academic Semester
const createAcademicSemesterZodSchema = z.object({
  body: z.object({
    title: z.enum([...AcademicSemesterTitles] as [string, ...string[]], {
      required_error: 'title is required',
    }),
    year: z.string({
      required_error: 'year is required',
    }),
    code: z.enum([...AcademicSemesterCodes] as [string, ...string[]], {
      required_error: 'code is required',
    }),
    startMonth: z.enum([...AcademicSemesterMonths] as [string, ...string[]], {
      required_error: 'start month is required',
    }),
    endMonth: z.enum([...AcademicSemesterMonths] as [string, ...string[]], {
      required_error: 'end month is required',
    }),
  }),
});

const updateAcademicSemesterZodSchema = z
  .object({
    body: z.object({
      title: z
        .enum([...AcademicSemesterTitles] as [string, ...string[]], {
          required_error: 'title is required',
        })
        .optional(),
      year: z
        .string({
          required_error: 'year is required',
        })
        .optional(),
      code: z
        .enum([...AcademicSemesterCodes] as [string, ...string[]], {
          required_error: 'code is required',
        })
        .optional(),
      startMonth: z
        .enum([...AcademicSemesterMonths] as [string, ...string[]], {
          required_error: 'start month is required',
        })
        .optional(),
      endMonth: z
        .enum([...AcademicSemesterMonths] as [string, ...string[]], {
          required_error: 'end month is required',
        })
        .optional(),
    }),
  })
  .refine(
    data =>
      (data?.body?.title && data?.body?.code) ||
      (!data?.body?.title && !data?.body?.code),
    {
      message: 'Either title and code both should be provided or neither',
    }
  );

export const AcademicSemesterValidation = {
  createAcademicSemesterZodSchema,
  updateAcademicSemesterZodSchema,
};
