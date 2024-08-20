import { z } from 'zod';
import {
  AcademicSemesterCode,
  AcademicSemesterName,
  Months,
} from './semester.constant';

const createAcademicSemesterValidationSchema = z.object({
  body: z.object({
    name: z.enum([...AcademicSemesterName] as [string]),
    year: z.string(),
    code: z.enum([...AcademicSemesterCode] as [string]),
    startMonth: z.enum([...Months] as [string]),
  }),
});

const updateAcademicSemesterValidationSchema = z.object({
  body: z.object({
    name: z.enum([...AcademicSemesterName] as [string]).optional(),
    year: z.string().optional(),
    code: z.enum([...AcademicSemesterCode] as [string]).optional(),
    startMonth: z.enum([...Months] as [string]).optional(),
  }),
});

export const AcademicSemesterValidation = {
  createAcademicSemesterValidationSchema,
  updateAcademicSemesterValidationSchema,
};
