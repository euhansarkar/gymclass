"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidation = void 0;
const zod_1 = require("zod");
const user_constant_1 = require("./user.constant");
const createAdminZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        password: zod_1.z.string().refine((value) => {
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
        contactNo: zod_1.z.string({ required_error: "contactNo is required" }),
        admin: zod_1.z.object({
            gender: zod_1.z.enum([...user_constant_1.gender], {
                required_error: 'Gender is required',
            }),
            email: zod_1.z.string().email('Invalid email address'),
            emergencyContactNo: zod_1.z
                .string()
                .min(10, 'Emergency contact number is required'),
            profileImage: zod_1.z.string().optional()
        }),
    }),
});
exports.UserValidation = {
    createAdminZodSchema,
};
