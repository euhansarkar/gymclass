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
exports.UserService = void 0;
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const http_status_1 = __importDefault(require("http-status"));
const config_1 = __importDefault(require("../../../config"));
const user_1 = require("../../../enums/user");
const bcrypt_1 = __importDefault(require("bcrypt"));
const createAdmin = (adminData, userData) => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma_1.default.$transaction((transactionClient) => __awaiter(void 0, void 0, void 0, function* () {
        userData.role = user_1.ENUM_USER_ROLE.ADMIN;
        if (!userData.password) {
            userData.password = config_1.default.default_admin_pass;
        }
        userData.password = yield hashPassword(userData.password);
        const userCreation = yield transactionClient.user.create({
            data: userData,
        });
        if (!userCreation) {
            throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, `Failed to create User`);
        }
        const adminCreation = yield transactionClient.admin.create({
            data: Object.assign(Object.assign({}, adminData), { userId: userCreation.id }),
        });
        if (!adminCreation) {
            throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, `Failed to create Admin`);
        }
    }));
    return { message: `Admin created successfully` };
});
const getOne = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.user.findUnique({
        where: {
            id,
        },
        include: {
            admin: true,
            trainee: true,
            trainer: true
        }
    });
    return result;
});
const createTrainer = (trainerData, userData) => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma_1.default.$transaction((transactionClient) => __awaiter(void 0, void 0, void 0, function* () {
        userData.role = user_1.ENUM_USER_ROLE.TRAINER;
        if (!userData.password) {
            userData.password = config_1.default.default_trainer_pass;
        }
        userData.password = yield hashPassword(userData.password);
        const userCreation = yield transactionClient.user.create({
            data: userData,
        });
        if (!userCreation) {
            throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, `Failed to create User`);
        }
        const trainerCreation = yield transactionClient.trainer.create({
            data: Object.assign(Object.assign({}, trainerData), { userId: userCreation.id }),
        });
        if (!trainerCreation) {
            throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, `Failed to create Trainer`);
        }
    }));
    return { message: `Trainer created successfully` };
});
const createTrainee = (traineeData, userData) => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma_1.default.$transaction((transactionClient) => __awaiter(void 0, void 0, void 0, function* () {
        userData.role = user_1.ENUM_USER_ROLE.TRAINEE;
        if (!userData.password) {
            userData.password = config_1.default.default_trainee_pass;
        }
        userData.password = yield hashPassword(userData.password);
        const userCreation = yield transactionClient.user.create({
            data: userData,
            include: { trainee: true },
        });
        if (!userCreation) {
            throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, `Failed to create User`);
        }
        traineeData.userId = userCreation === null || userCreation === void 0 ? void 0 : userCreation.id;
        const traineeCreation = yield transactionClient.trainee.create({
            data: traineeData,
        });
        if (!traineeCreation) {
            throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, `Failed to create Trainee`);
        }
    }));
    return { message: `Trainee created successfully` };
});
const getMe = (user) => __awaiter(void 0, void 0, void 0, function* () {
    if (!(user === null || user === void 0 ? void 0 : user.id)) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, 'User is not authenticated');
    }
    // Fetch the user along with their roles
    const isUserExist = yield prisma_1.default.user.findUnique({
        where: { id: user.id },
        include: {
            admin: true,
            trainer: true,
            trainee: true,
        },
    });
    if (!isUserExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'User not found');
    }
    let result;
    // Return the respective role details based on the user's role
    if (isUserExist.role === user_1.ENUM_USER_ROLE.ADMIN && isUserExist.admin) {
        result = yield prisma_1.default.admin.findUnique({
            where: { id: isUserExist.admin.id },
        });
    }
    else if (isUserExist.role === user_1.ENUM_USER_ROLE.TRAINER && isUserExist.trainer) {
        result = yield prisma_1.default.trainer.findUnique({
            where: { id: isUserExist.trainer.id },
        });
    }
    else if (isUserExist.role === user_1.ENUM_USER_ROLE.TRAINEE && isUserExist.trainee) {
        result = yield prisma_1.default.trainee.findUnique({
            where: { id: isUserExist.trainee.id },
        });
    }
    else {
        throw new ApiError_1.default(http_status_1.default.FORBIDDEN, 'User role not recognized or role data missing');
    }
    return result;
});
const hashPassword = (password) => __awaiter(void 0, void 0, void 0, function* () {
    const hashedPassword = yield bcrypt_1.default.hash(password, Number(config_1.default === null || config_1.default === void 0 ? void 0 : config_1.default.bycrypt_salt_rounds));
    return hashedPassword;
});
exports.UserService = { createAdmin, createTrainer, createTrainee, getOne, getMe };
