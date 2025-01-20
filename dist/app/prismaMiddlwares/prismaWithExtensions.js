"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = __importDefault(require("../../shared/prisma"));
// import { User } from '@prisma/client';
const prismaWithExtensions = prisma_1.default.$extends({
    model: {
    // user: {
    //   async isUserExists(contactNo: string): Promise<Partial<User> | null> {
    //     // Implement your logic to check if a user with the given ID exists.
    //     const user = await prisma.user.findUnique({ where: { contactNo } });
    //     return user;
    //   },
    //   async isPasswordMatched(
    //     givenPassword: string,
    //     savedPassword: string
    //   ): Promise<boolean> {
    //     // Implement your logic to compare passwords using bcrypt.
    //     return bcrypt.compare(givenPassword, savedPassword);
    //   },
    // },
    },
});
exports.default = prismaWithExtensions;
