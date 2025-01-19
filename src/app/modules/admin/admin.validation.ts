import { z } from 'zod';
import { gender } from './admin.constant';

const updateAdminZodSchema = z.object({
  body: z.object({
    name: z.string({}).optional(),
    gender: z.enum([...gender] as [string, ...string[]], {}).optional(),
    email: z.string().email().optional(),
    emergencyContactNo: z
      .string()
      .min(10).optional(),
    profileImage: z.string().optional()
  }),
});


export const AdminValidator = { updateAdminZodSchema };
