import { z } from 'zod';
import { gender } from './user.constant';



const createAdminZodSchema = z.object({
  body: z.object({
    password: z.string().refine((value) => {
      if (!value) {
        throw new Error('Password is required');
      }
      const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d.*\d)(?=.*[!@#$%^&*()_+}{"':;?/>.<,])(?=(.*\d){2})(?=(.*[!@#$%^&*()_+}{"':;?/>.<,]){2})(?!.*\s).*$/;
      if (!passwordRegex.test(value)) {
        throw new Error('Password must include 1 capital letter, 1 small letter, 2 numbers, and 2 special characters');
      }
      if (value.length < 8) {
        throw new Error('Password must be at least 8 characters long');
      }
      return true;
    }, { message: 'Invalid password' }),
    contactNo: z.string({ required_error: "contactNo is required" }),
    admin: z.object({
      gender: z.enum([...gender] as [string, ...string[]], {
        required_error: 'Gender is required',
      }),
      email: z.string().email('Invalid email address'),
      emergencyContactNo: z
        .string()
        .min(10, 'Emergency contact number is required'),
      profileImage: z.string().optional()
    }),
  }),
});

export const UserValidation = {
  createAdminZodSchema,
};
