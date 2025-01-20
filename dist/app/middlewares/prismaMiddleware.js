"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const prisma_1 = __importDefault(require("../../shared/prisma"));
const prismaWithExtensions = prisma_1.default.$extends({
    model: {
        user: {
            isUserExists(email) {
                return __awaiter(this, void 0, void 0, function* () {
                    // Implement your logic to check if a user with the given ID exists.
                    const user = yield prisma_1.default.user.findUnique({ where: { email } });
                    return user;
                });
            },
            isPasswordMatched(givenPassword, savedPassword) {
                return __awaiter(this, void 0, void 0, function* () {
                    // Implement your logic to compare passwords using bcrypt.
                    return bcrypt_1.default.compare(givenPassword, savedPassword);
                });
            },
        },
    },
});
exports.default = prismaWithExtensions;
