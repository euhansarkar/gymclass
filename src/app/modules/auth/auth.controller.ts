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

const verifyUser = catchAsync(async (req, res) => {
  const result = await AuthService.verifyUser(req.body);

  sendResponse<User>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `user successfully verified`,
    data: result,
  });
});

const resetPasswordRequest = catchAsync(async (req, res) => {
  const result = await AuthService.resetPasswordRequest(req.body?.contactNo);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `Reset Password Request Successfully Sent`,
    data: result,
  });
});

const resendOTP = catchAsync(async (req, res) => {
  const result = await AuthService.resendOTP(req.body?.contactNo);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `Resend OTP Request Successfully Sent`,
    data: result,
  });
});

const resetPassword = catchAsync(async (req, res) => {
  const result = await AuthService.resetPassword(req?.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `Password reset successfully`,
    data: result,
  });
});

const checkOTPValidation = catchAsync(async (req, res) => {
  const result = await AuthService.checkOTPValidation(req?.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `OTP Validated Successfully`,
    data: result,
  });
});

export const AuthController = {
  login,
  refreshToken,
  changePassword,
  checkOTPValidation,
  resetPassword,
  resetPasswordRequest,
  verifyUser,
  resendOTP
};
