import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/pagination';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { AdminFilterableFields } from './admin.constant';
import { AdminService } from './admin.service';

const getAll = catchAsync(async (req, res) => {
  const filters = pick(req.query, AdminFilterableFields);
  const options = pick(req.query, paginationFields);
  const result = await AdminService.getAll(filters, options);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `all Admins found`,
    data: result?.data,
    meta: result?.meta,
  });
});

const getOne = catchAsync(async (req, res) => {
  const result = await AdminService.getOne(req.params.id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `user found`,
    data: result,
  });
});

const updateOne = catchAsync(async (req, res) => {
  const data = req.body;
  const result = await AdminService.updateOne(req.params.id, data);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `Admin updated`,
    data: result,
  });
});

const deleteOne = catchAsync(async (req, res) => {
  const result = await AdminService.deleteOne(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `Admin deleted`,
    data: result,
  });
});

export const AdminController = { getOne, getAll, updateOne, deleteOne };
