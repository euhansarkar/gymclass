import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { UserService } from './user.service';


const createAdmin = catchAsync(async (req, res) => {
  const { admin, ...adminData } = req.body;

  const result = await UserService.createAdmin(admin, adminData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `admin created`,
    data: result,
  });
});



const getOne = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await UserService.getOne(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `user fetched`,
    data: result,
  })
})

const getMe = catchAsync(async (req, res) => {
  const user = req?.user;

  const result = await UserService.getMe(user);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `found me`,
    data: result,
  });
});

export const UserController = { createAdmin, getOne, getMe };
