import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import pick from "../../../shared/pick";
import sendResponse from "../../../shared/sendResponse";
import { BookingService } from "./booking.service";
import { BookingFilterableFields } from "./booking.constant";

const createOne = catchAsync(async (req, res) => {
    const result = await BookingService.createOne(req.body);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Booking created successfully!",
        data: result
    })
})

const getAll = catchAsync(async (req: Request, res: Response) => {

    const filters = pick(req.query, BookingFilterableFields);
    const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);
    const result = await BookingService.getAll(filters, options);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Booking fetched successfully!",
        meta: result.meta,
        data: result.data
    })
});

const getOne = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await BookingService.getOne(id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Booking fetched successfully',
        data: result
    });
});

const updateOne = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await BookingService.updateOne(id, req.body);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Booking updated successfully',
        data: result
    });
});

const deleteOne = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await BookingService.deleteOne(id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Booking delete successfully',
        data: result
    });
});


export const BookingController = {
    createOne, updateOne, deleteOne, getAll, getOne
}