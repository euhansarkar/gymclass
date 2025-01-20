"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminValidator = void 0;
const zod_1 = require("zod");
const admin_constant_1 = require("./admin.constant");
const updateAdminZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({}).optional(),
        gender: zod_1.z.enum([...admin_constant_1.gender], {}).optional(),
        email: zod_1.z.string().email().optional(),
        emergencyContactNo: zod_1.z
            .string()
            .min(10).optional(),
        profileImage: zod_1.z.string().optional()
    }),
});
exports.AdminValidator = { updateAdminZodSchema };
