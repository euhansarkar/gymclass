import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/pagination';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { TrainerFilterableFields } from './trainer.constant';
import { TrainerService } from './trainer.service';

const getAll = catchAsync(async (req, res) => {
  const filters = pick(req.query, TrainerFilterableFields);
  const options = pick(req.query, paginationFields);
  const result = await TrainerService.getAll(filters, options);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `all Trainers found`,
    data: result?.data,
    meta: result?.meta,
  });
});

const getOne = catchAsync(async (req, res) => {
  const result = await TrainerService.getOne(req.params.id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `user found`,
    data: result,
  });
});

const updateOne = catchAsync(async (req, res) => {
  const data = req.body;
  const result = await TrainerService.updateOne(req.params.id, data);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `Trainer updated`,
    data: result,
  });
});

const deleteOne = catchAsync(async (req, res) => {
  const result = await TrainerService.deleteOne(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `Trainer deleted`,
    data: result,
  });
});

export const TrainerController = { getOne, getAll, updateOne, deleteOne };
