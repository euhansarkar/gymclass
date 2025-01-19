/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { AuthService } from './auth.service';
import { ILoginResponse } from './auth.interface';
import config from '../../../config';
import { User } from '@prisma/client';

const login = catchAsync(async (req, res) => {
  const result = await AuthService.login(req.body);

  //set refresh token into cookie
  const cookieOptions = {
    secure: config.env === `production`,
    httpOnly: true,
  };

  res.cookie(`refreshToken`, result.refreshToken, cookieOptions);
  const { refreshToken, ...others } = result;

  sendResponse<ILoginResponse>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `login successfull`,
    data: others,
  });
});

const refreshToken = catchAsync(async (req, res) => {
  const { refreshToken } = req.cookies;
  const result = AuthService.refreshToken(refreshToken);

  //set refresh token into cookie
  const cookieOptions = {
    secure: config.env === `production`,
    httpOnly: true,
  };

  res.cookie(`refreshToken`, refreshToken, cookieOptions);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `refresh token generated a new access token`,
    data: result,
  });
});

const changePassword = catchAsync(async (req, res) => {
  const user = req.user;
  const { ...passwordData } = req.body;
  const result = await AuthService.changePassword(user, passwordData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `password changed`,
    data: result,
  });
});


export const AuthController = {
  login,
  refreshToken,
  changePassword
};
