import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import pick from "../../../shared/pick";
import sendResponse from "../../../shared/sendResponse";
import { ScheduleService } from "./schedule.service";
import { ScheduleFilterableFields } from "./schedule.constant";

const createOne = catchAsync(async (req, res) => {
    const result = await ScheduleService.createOne(req.body);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Schedule created successfully!",
        data: result
    })
})

const getAll = catchAsync(async (req: Request, res: Response) => {

    const filters = pick(req.query, ScheduleFilterableFields);
    const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);
    const result = await ScheduleService.getAll(filters, options);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Schedule fetched successfully!",
        meta: result.meta,
        data: result.data
    })
});

const getOne = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await ScheduleService.getOne(id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Schedule fetched successfully',
        data: result
    });
});

const updateOne = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await ScheduleService.updateOne(id, req.body);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Schedule updated successfully',
        data: result
    });
});

const deleteOne = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await ScheduleService.deleteOne(id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Schedule delete successfully',
        data: result
    });
});


export const ScheduleController = {
    createOne, updateOne, deleteOne, getAll, getOne
}