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
exports.AuthService = void 0;
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const http_status_1 = __importDefault(require("http-status"));
const config_1 = __importDefault(require("../../../config"));
const jwtHelpers_1 = require("../../../helpers/jwtHelpers");
const bcrypt_1 = __importDefault(require("bcrypt"));
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const prismaMiddleware_1 = __importDefault(require("../../middlewares/prismaMiddleware"));
const login = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = data;
    console.log(`data from login`, data);
    // check user exists
    const isUserExist = yield prismaMiddleware_1.default.user.isUserExists(email);
    if (!isUserExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, `user not found`);
    }
    // match password
    const isPasswordMatched = yield prismaMiddleware_1.default.user.isPasswordMatched(password, isUserExist.password);
    if (!isPasswordMatched) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, `password is incorrect`);
    }
    // create access token and refresh token
    const accessToken = jwtHelpers_1.jwtHelpers.createToken({ id: isUserExist === null || isUserExist === void 0 ? void 0 : isUserExist.id, email: isUserExist === null || isUserExist === void 0 ? void 0 : isUserExist.email, role: isUserExist === null || isUserExist === void 0 ? void 0 : isUserExist.role }, config_1.default.jwt.secret, config_1.default.jwt.expires_in);
    const refreshToken = jwtHelpers_1.jwtHelpers.createToken({ id: isUserExist === null || isUserExist === void 0 ? void 0 : isUserExist.id, email: isUserExist === null || isUserExist === void 0 ? void 0 : isUserExist.email, role: isUserExist === null || isUserExist === void 0 ? void 0 : isUserExist.role }, config_1.default.jwt.refresh_secret, config_1.default.jwt.refresh_expires_in);
    return {
        accessToken,
        refreshToken,
        needsPasswordChange: true,
    };
});
const refreshToken = (token) => __awaiter(void 0, void 0, void 0, function* () {
    // verify token
    let verifiedToken = null;
    try {
        verifiedToken = jwtHelpers_1.jwtHelpers.verifyToken(token, config_1.default.jwt.refresh_secret);
    }
    catch (err) {
        throw new ApiError_1.default(http_status_1.default.FORBIDDEN, `invalid refresh token`);
    }
    const { email } = verifiedToken;
    // check is user deleted or not on database
    const isUserExist = yield prismaMiddleware_1.default.user.isUserExists(email);
    if (!isUserExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, `user not found`);
    }
    // generate new Token
    const newAccessToken = jwtHelpers_1.jwtHelpers.createToken({
        id: isUserExist.id,
        email: isUserExist.email,
        role: isUserExist.role,
    }, config_1.default.jwt.secret, config_1.default.jwt.expires_in);
    return { accessToken: newAccessToken };
});
const changePassword = (userData, passwordData) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = userData;
    const { oldPassword, newPassword } = passwordData;
    // checking is user exists
    const isUserExist = yield prismaMiddleware_1.default.user.isUserExists(email);
    if (!isUserExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, `user not found`);
    }
    if (isUserExist.password &&
        !(yield prismaMiddleware_1.default.user.isPasswordMatched(oldPassword, isUserExist.password))) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, `old password is incorrect`);
    }
    const newHashPassword = yield bcrypt_1.default.hash(newPassword, Number(config_1.default.bycrypt_salt_rounds));
    const updatedData = {
        password: newHashPassword,
        needsPasswordChange: false,
        passwordChangeAt: new Date(),
    };
    yield prisma_1.default.user.update({
        where: {
            id: isUserExist.id,
        },
        data: updatedData,
    });
    return { message: `password changed successfully` };
});
exports.AuthService = {
    login,
    refreshToken,
    changePassword,
};
