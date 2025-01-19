import { z } from 'zod';

const login = z.object({
  body: z.object({
    contactNo: z.string({
      required_error: `contactNo is required`,
    }),
    password: z.string({
      required_error: `user password is required`,
    }),
  }),
});

const refreshToken = z.object({
  cookies: z.object({
    refreshToken: z.string({
      required_error: `refresh token is required`,
    }),
  }),
});

const changePassword = z.object({
  body: z.object({
    oldPassword: z.string({
      required_error: `old password is required`,
    }),
    newPassword: z.string({
      required_error: `new password is required`,
    }),
  }),
});

export const AuthValidator = { login, refreshToken, changePassword };
