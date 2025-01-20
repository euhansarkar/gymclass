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
exports.ScheduleService = void 0;
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const schedule_constant_1 = require("./schedule.constant");
const searchFilterHelper_1 = require("../../../helpers/searchFilterHelper");
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const http_status_1 = __importDefault(require("http-status"));
const createOne = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const startOfDay = new Date(data.startTime);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(data.startTime);
    endOfDay.setHours(23, 59, 59, 999);
    const scheduleCount = yield prisma_1.default.schedule.count({
        where: {
            startTime: {
                gte: startOfDay,
                lte: endOfDay,
            },
        },
    });
    if (scheduleCount >= 5) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, `Only 5 Class Schedules are allowed per day.`);
    }
    const result = yield prisma_1.default.schedule.create({
        data,
    });
    return result;
});
const getAll = (filters, options) => __awaiter(void 0, void 0, void 0, function* () {
    const { page, limit, skip } = paginationHelper_1.paginationHelpers.calculatePagination(options);
    const andConditions = searchFilterHelper_1.SearchingFilteringHelper.searchingFiltering({ filters, searchAbleFields: schedule_constant_1.ScheduleSearchableFields, relationalFields: schedule_constant_1.ScheduleRelationalFields, relationalFieldsMapper: schedule_constant_1.ScheduleRelationalFieldsMapper });
    const whereConditions = andConditions.length > 0 ? { AND: andConditions } : {};
    const result = yield prisma_1.default.schedule.findMany({
        skip,
        take: limit,
        where: whereConditions,
        include: {
            bookings: true
        }
    });
    const total = yield prisma_1.default.schedule.count({
        where: whereConditions
    });
    return {
        meta: {
            page,
            limit,
            total
        },
        data: result
    };
});
const getOne = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.schedule.findUnique({
        where: {
            id,
        },
        include: {
            bookings: true
        },
    });
    if (!result) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "schedule not found");
    }
    return result;
});
const updateOne = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isExists = yield getOne(id);
    const result = yield prisma_1.default.schedule.update({
        where: {
            id: isExists === null || isExists === void 0 ? void 0 : isExists.id,
        },
        data: payload,
    });
    return result;
});
const deleteOne = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const isExists = yield getOne(id);
    const result = yield prisma_1.default.schedule.delete({
        where: {
            id: isExists === null || isExists === void 0 ? void 0 : isExists.id
        },
    });
    return result;
});
exports.ScheduleService = { createOne, updateOne, deleteOne, getAll, getOne };
