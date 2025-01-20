import { z } from 'zod';
import { gender } from './user.constant';
import { Role } from '@prisma/client';



const adminCreationZodSchema = z.object({
  body: z.object({
    admin: z.object({
      location: z.string().optional(),
    }),
    username: z
      .string()
      .min(6, { message: 'Username must be at least 6 characters long.' })
      .regex(/^[a-zA-Z0-9]+$/, {
        message: 'Username can only contain letters and numbers.',
      }),
    email: z.string().email({ message: 'Invalid email address.' }),
    password: z
      .string()
      .min(6, { message: 'Password must be at least 6 characters long.' }),
  }),
});


const trainerCreationZodSchema = z.object({
  body: z.object({
    trainer: z.object({
      specialization: z
        .string()
        .nonempty({ message: 'Specialization is required.' }),
      bio: z.string().optional(),
      location: z.string().optional(),
    }),
    username: z.string().nonempty({ message: 'Username is required.' }),
    email: z.string().email({ message: 'Invalid email address.' }),
    password: z
      .string()
      .min(8, { message: 'Password must be at least 8 characters long.' }),
    role: z.enum([Role.TRAINER], {
      errorMap: () => ({
        message: 'Role must be one of: Trainer, Admin, User.',
      }),
    }),
  }),
});


const traineeCreationZodSchema = z.object({
  body: z.object({
    trainee: z.object({
      bio: z.string().optional(),
      location: z.string().optional(),
    }),
    username: z
      .string()
      .min(6, { message: 'Username must be at least 6 characters long.' })
      .regex(/^[a-zA-Z0-9_]+$/, {
        message: 'Username can only contain letters, numbers, and underscores.',
      }),
    email: z.string().email({ message: 'Invalid email address.' }),
    password: z
      .string()
      .min(8, { message: 'Password must be at least 8 characters long.' })
      .regex(/[A-Z]/, {
        message: 'Password must contain at least one uppercase letter.',
      })
      .regex(/[a-z]/, {
        message: 'Password must contain at least one lowercase letter.',
      })
      .regex(/[0-9]/, { message: 'Password must contain at least one number.' })
      .regex(/[@$!%*?&#]/, {
        message: 'Password must contain at least one special character.',
      }),
    role: z.enum([Role.TRAINEE], {
      message: "Role must be one of the following: 'Trainee', 'Admin', 'User'.",
    }),
  }),
});


export const UserValidation = {
  adminCreationZodSchema,
  trainerCreationZodSchema,
  traineeCreationZodSchema,
};
