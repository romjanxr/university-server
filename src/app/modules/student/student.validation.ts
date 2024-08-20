import { z } from 'zod';

// Zod schema for Username
const createUserNameValidationSchema = z.object({
  firstName: z
    .string()
    .max(20, 'Maximum 20 characters supported')
    .refine(
      (value) =>
        value.charAt(0).toUpperCase() + value.slice(1).toLowerCase() === value,
      {
        message: '{VALUE} is not in capitalize format',
      },
    ),
  middleName: z.string(),
  lastName: z.string().refine((value) => /^[A-Za-z]+$/.test(value), {
    message: '{VALUE} must be alphabetic characters',
  }),
});

// Zod schema for Guardian
const createGuardianValidationSchema = z.object({
  fatherName: z.string(),
  fatherOccupation: z.string(),
  fatherContactNo: z.string(),
  motherName: z.string(),
  motherOccupation: z.string(),
  motherContactNo: z.string(),
});

// Zod schema for Local Guardian
const createLocalGuardianValidationSchema = z.object({
  name: z.string(),
  occupation: z.string(),
  contactNo: z.string(),
  address: z.string(),
});

// Zod schema for Student
const createStudentValidationSchema = z.object({
  body: z.object({
    password: z.string().max(20),
    student: z.object({
      name: createUserNameValidationSchema,
      gender: z.enum(['male', 'female', 'other'], {
        errorMap: () => ({ message: '{VALUE} is not valid' }),
      }),
      dateOfBirth: z.string().optional(),
      email: z.string().email(),
      contactNo: z.string(),
      emergencyContactNo: z.string(),
      bloodGroup: z
        .enum(['A+', 'A-', 'AB+', 'AB-', 'B+', 'B-', 'O+', 'O-'])
        .optional(),
      presentAddress: z.string(),
      permanentAddress: z.string(),
      guardian: createGuardianValidationSchema,
      localGuardian: createLocalGuardianValidationSchema,
      profileImg: z.string().optional(),
      addmissionSemester: z.string(),
      academicDepartment: z.string(),
    }),
  }),
});

const updateUserNameValidationSchema = z.object({
  firstName: z
    .string()
    .max(20, 'Maximum 20 characters supported')
    .refine(
      (value) =>
        value.charAt(0).toUpperCase() + value.slice(1).toLowerCase() === value,
      {
        message: '{VALUE} is not in capitalize format',
      },
    )
    .optional(),
  middleName: z.string().optional(),
  lastName: z
    .string()
    .refine((value) => /^[A-Za-z]+$/.test(value), {
      message: '{VALUE} must be alphabetic characters',
    })
    .optional(),
});

const updateGuardianValidationSchema = z.object({
  fatherName: z.string().optional(),
  fatherOccupation: z.string().optional(),
  fatherContactNo: z.string().optional(),
  motherName: z.string().optional(),
  motherOccupation: z.string().optional(),
  motherContactNo: z.string().optional(),
});

const updateLocalGuardianValidationSchema = z.object({
  name: z.string().optional(),
  occupation: z.string().optional(),
  contactNo: z.string().optional(),
  address: z.string().optional(),
});

const updateStudentValidationSchema = z.object({
  body: z.object({
    student: z.object({
      name: updateUserNameValidationSchema.optional(),
      gender: z
        .enum(['male', 'female', 'other'], {
          errorMap: () => ({ message: '{VALUE} is not valid' }),
        })
        .optional(),
      dateOfBirth: z.string().optional(),
      email: z.string().email().optional(),
      contactNo: z.string().optional(),
      emergencyContactNo: z.string().optional(),
      bloodGroup: z
        .enum(['A+', 'A-', 'AB+', 'AB-', 'B+', 'B-', 'O+', 'O-'])
        .optional(),
      presentAddress: z.string().optional(),
      permanentAddress: z.string().optional(),
      guardian: updateGuardianValidationSchema.optional(),
      localGuardian: updateLocalGuardianValidationSchema.optional(),
      profileImg: z.string().optional().optional(),
      addmissionSemester: z.string().optional(),
      academicDepartment: z.string().optional(),
    }),
  }),
});

export const StudentValidation = {
  createStudentValidationSchema,
  updateStudentValidationSchema,
};
