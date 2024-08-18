import { z } from 'zod';

const UserValidationSchema = z.object({
  password: z
    .string({ invalid_type_error: 'Password must be string' })
    .max(20, { message: 'Maximum 20 character supported' })
    .optional(),
});

export const UserValidation = {
  UserValidationSchema,
};
