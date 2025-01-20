import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/pagination';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { TraineeFilterableFields } from './trainee.constant';
import { TraineeService } from './trainee.service';

const getAll = catchAsync(async (req, res) => {
  const filters = pick(req.query, TraineeFilterableFields);
  const options = pick(req.query, paginationFields);
  const result = await TraineeService.getAll(filters, options);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `all Trainees found`,
    data: result?.data,
    meta: result?.meta,
  });
});

const getOne = catchAsync(async (req, res) => {
  const result = await TraineeService.getOne(req.params.id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `user found`,
    data: result,
  });
});

const updateOne = catchAsync(async (req, res) => {
  const data = req.body;
  const result = await TraineeService.updateOne(req.params.id, data);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `Trainee updated`,
    data: result,
  });
});

const deleteOne = catchAsync(async (req, res) => {
  const result = await TraineeService.deleteOne(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `Trainee deleted`,
    data: result,
  });
});

export const TraineeController = { getOne, getAll, updateOne, deleteOne };
