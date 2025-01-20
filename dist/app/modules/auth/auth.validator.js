"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthValidator = void 0;
const zod_1 = require("zod");
const login = zod_1.z.object({
    body: zod_1.z.object({
        contactNo: zod_1.z.string({
            required_error: `contactNo is required`,
        }),
        password: zod_1.z.string({
            required_error: `user password is required`,
        }),
    }),
});
const refreshToken = zod_1.z.object({
    cookies: zod_1.z.object({
        refreshToken: zod_1.z.string({
            required_error: `refresh token is required`,
        }),
    }),
});
const changePassword = zod_1.z.object({
    body: zod_1.z.object({
        oldPassword: zod_1.z.string({
            required_error: `old password is required`,
        }),
        newPassword: zod_1.z.string({
            required_error: `new password is required`,
        }),
    }),
});
exports.AuthValidator = { login, refreshToken, changePassword };
