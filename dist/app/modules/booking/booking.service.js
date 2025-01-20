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
exports.BookingService = void 0;
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const booking_constant_1 = require("./booking.constant");
const searchFilterHelper_1 = require("../../../helpers/searchFilterHelper");
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const http_status_1 = __importDefault(require("http-status"));
const schedule_service_1 = require("../schedule/schedule.service");
const createOne = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const isScheduleExists = yield schedule_service_1.ScheduleService.getOne(data === null || data === void 0 ? void 0 : data.scheduleId);
    if (!isScheduleExists) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "schedule not found");
    }
    const isUserExistsInThisSchedule = yield prisma_1.default.booking.findFirst({ where: { scheduleId: isScheduleExists === null || isScheduleExists === void 0 ? void 0 : isScheduleExists.id, traineeId: data === null || data === void 0 ? void 0 : data.traineeId } });
    if (isUserExistsInThisSchedule) {
        throw new ApiError_1.default(http_status_1.default.CONFLICT, "Yo've Already Booked The Schedule");
    }
    const total = yield prisma_1.default.booking.count({
        where: { scheduleId: isScheduleExists.id, isCancelled: false },
    });
    if (total >= 10) {
        throw new ApiError_1.default(http_status_1.default.EXPECTATION_FAILED, 'Class schedule is full. Maximum 10 trainees allowed per schedule.');
    }
    const result = yield prisma_1.default.booking.create({
        data
    });
    return result;
});
const getAll = (filters, options) => __awaiter(void 0, void 0, void 0, function* () {
    const { page, limit, skip } = paginationHelper_1.paginationHelpers.calculatePagination(options);
    const andConditions = searchFilterHelper_1.SearchingFilteringHelper.searchingFiltering({ filters, searchAbleFields: booking_constant_1.BookingSearchableFields, relationalFields: booking_constant_1.BookingRelationalFields, relationalFieldsMapper: booking_constant_1.BookingRelationalFieldsMapper });
    const whereConditions = andConditions.length > 0 ? { AND: andConditions } : {};
    const result = yield prisma_1.default.booking.findMany({
        skip,
        take: limit,
        where: whereConditions,
        include: {}
    });
    const total = yield prisma_1.default.booking.count({
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
    const result = yield prisma_1.default.booking.findUnique({
        where: {
            id,
        },
        include: {},
    });
    if (!result) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "booking not found");
    }
    return result;
});
const updateOne = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isExists = yield getOne(id);
    const result = yield prisma_1.default.booking.update({
        where: {
            id: isExists === null || isExists === void 0 ? void 0 : isExists.id
        },
        data: payload,
    });
    return result;
});
const deleteOne = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const isExists = yield getOne(id);
    const result = yield prisma_1.default.booking.delete({
        where: {
            id: isExists === null || isExists === void 0 ? void 0 : isExists.id
        },
    });
    return result;
});
exports.BookingService = { createOne, updateOne, deleteOne, getAll, getOne };
