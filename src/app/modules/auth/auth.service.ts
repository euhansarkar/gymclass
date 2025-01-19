/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
import {
  IChangePassword,
  ILogin,
  ILoginResponse,
  IRefreshTokenResponse,
} from './auth.interface';
import ApiError from '../../../errors/ApiError';
import httpStatus from 'http-status';
import prismaWithExtensions from '../../prismaMiddlwares/prismaWithExtensions';
import { JwtPayload, Secret } from 'jsonwebtoken';
import config from '../../../config';
import { jwtHelpers } from '../../../helpers/jwtHelpers';
import bcrypt from 'bcrypt';
import prisma from '../../../shared/prisma';
import { User, Verification } from '@prisma/client';
import { BulkSMSSender } from '../../../helpers/sms';

const login = async (data: ILogin): Promise<ILoginResponse> => {
  const { contactNo, password } = data;

  console.log(`data from login`, data);
  // check user exists
  const isUserExist = await prismaWithExtensions.user.isUserExists(contactNo);

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, `user not found`);
  }

  // match password
  const isPasswordMatched = await prismaWithExtensions.user.isPasswordMatched(
    password,
    isUserExist.password!
  );

  if (!isPasswordMatched) {
    throw new ApiError(httpStatus.UNAUTHORIZED, `password is incorrect`);
  }

  // create access token and refresh token

  const accessToken = jwtHelpers.createToken(
    { id: isUserExist?.id, contactNo: isUserExist?.contactNo, role: isUserExist?.role },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  const refreshToken = jwtHelpers.createToken(
    { id: isUserExist?.id, contactNo: isUserExist?.contactNo, role: isUserExist?.role },
    config.jwt.refresh_secret as Secret,
    config.jwt.refresh_expires_in as string
  );

  return {
    accessToken,
    refreshToken,
    needsPasswordChange: true,
  };
};

const refreshToken = async (token: string): Promise<IRefreshTokenResponse> => {
  // verify token
  let verifiedToken = null;
  try {
    verifiedToken = jwtHelpers.verifyToken(
      token,
      config.jwt.refresh_secret as Secret
    );
  } catch (err) {
    throw new ApiError(httpStatus.FORBIDDEN, `invalid refresh token`);
  }

  const { contactNo } = verifiedToken;

  // check is user deleted or not on database
  const isUserExist = await prismaWithExtensions.user.isUserExists(contactNo);

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, `user not found`);
  }
  // generate new Token
  const newAccessToken = jwtHelpers.createToken(
    {
      id: isUserExist.id,
      contactNo: isUserExist.contactNo,
      role: isUserExist.role,
    },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  return { accessToken: newAccessToken };
};

const changePassword = async (
  userData: JwtPayload | null,
  passwordData: IChangePassword
): Promise<{ message: string }> => {


  const { contactNo } = userData!;
  const { oldPassword, newPassword } = passwordData!;

  // checking is user exists
  const isUserExist = await prismaWithExtensions.user.isUserExists(contactNo);

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, `user not found`);
  }

  if (
    isUserExist.password &&
    !(await prismaWithExtensions.user.isPasswordMatched(
      oldPassword,
      isUserExist.password
    ))
  ) {
    throw new ApiError(httpStatus.UNAUTHORIZED, `old password is incorrect`);
  }

  const newHashPassword = await bcrypt.hash(
    newPassword,
    Number(config.bycrypt_salt_rounds)
  );

  const updatedData = {
    password: newHashPassword,
    needsPasswordChange: false,
    passwordChangeAt: new Date(),
  };

  await prisma.user.update({
    where: {
      id: isUserExist.id,
    },
    data: updatedData,
  });

  return { message: `password changed successfully` };
};

const verifyUser = async (data: Verification): Promise<User | null> => {
  const { contactNo, otp } = data;

  const isUserExist = await prismaWithExtensions.user.isUserExists(contactNo);

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, `user not found`);
  }

  const isVerificationExist = await prisma.verification.findFirst({
    where: {
      otp,
      userId: isUserExist?.id!,
      contactNo: isUserExist?.contactNo!,
    },
  });

  if (!isVerificationExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Invalid OTP');
  }

  const result = await prisma?.$transaction(async transactionClient => {
    const updateUser = await transactionClient.user.update({
      where: {
        uid: isUserExist?.uid,
      },
      data: {
        isActive: true,
        isVerified: true,
      },
    });

    if (!updateUser) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'User Updation Failed');
    }

    // delete verification
    const deleteVerification = await transactionClient.verification.delete({
      where: {
        id: isVerificationExist?.id,
      },
    });

    if (!deleteVerification) {
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        'user verification deletion failed'
      );
    }

    return updateUser;
  });

  return result;
};

const resetPasswordRequest = async (contactNo: string) => {
  console.log(`see contadct no`, contactNo);
  // is user exist
  const isUserExist = await prismaWithExtensions.user.isUserExists(contactNo);

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, `user not found`);
  }

  const result = await prisma.$transaction(async transactionClient => {
    // delete previous verifications
    await transactionClient?.verification?.deleteMany({
      where: {
        contactNo: isUserExist?.contactNo,
        userId: isUserExist?.id,
      },
    });

    // user verification creation
    const verificationCreation = await transactionClient.verification.create({
      data: {
        contactNo: isUserExist?.contactNo!,
        userId: isUserExist?.id!,
        otp: Math.floor(100000 + Math.random() * 900000),
      },
    });

    if (!verificationCreation) {
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        'verification creation failed'
      );
    }

    if (verificationCreation) {
      await BulkSMSSender.send({
        number: isUserExist?.contactNo!,
        message: `Welcome to ToletPro! Your Password Reset OTP code: ${verificationCreation?.otp}`,
      });
    }

    return verificationCreation;
  });

  return result;
};

const resetPassword = async (data: any) => {
  const { contactNo, otp, password } = data;

  const isUserExist = await prismaWithExtensions.user.isUserExists(contactNo);

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, `user not found`);
  }

  const result = await prisma.$transaction(async transactionClient => {
    const isVerificationExist = await transactionClient.verification.findFirst({
      where: {
        otp,
        userId: isUserExist?.id,
        contactNo: isUserExist?.contactNo,
      },
    });

    if (!isVerificationExist) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Invalid OTP');
    }

    // Hash the new password
    const newHashPassword = await bcrypt.hash(
      String(password),
      Number(config.bycrypt_salt_rounds)
    );

    // Update the user with the new password
    const updateUser = await transactionClient.user.update({
      where: {
        uid: isUserExist.uid,
      },
      data: {
        password: newHashPassword,
        needsPasswordChange: false,
        passwordChangeAt: new Date(),
      },
    });

    if (!updateUser) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Password reset failed');
    }

    // Delete the verification record
    await transactionClient.verification.delete({
      where: {
        id: isVerificationExist?.id,
      },
    });

    return updateUser;
  });

  return result;
};

const checkOTPValidation = async (data: Verification) => {
  const { contactNo, otp } = data;

  const isUserExist = await prismaWithExtensions.user.isUserExists(contactNo);

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, `user not found`);
  }

  const result = await prisma.$transaction(async transactionClient => {
    const isVerificationExist = await transactionClient.verification.findFirst({
      where: {
        otp,
        userId: isUserExist?.id,
        contactNo: isUserExist?.contactNo,
      },
    });

    if (!isVerificationExist) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Invalid OTP');
    }

    return isVerificationExist;
  });

  return result;
};

const resendOTP = async (contactNo: string): Promise<{ message: string }> => {
  // Check if the user exists
  const isUserExist = await prismaWithExtensions.user.isUserExists(contactNo);

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, `user not found`);
  }

  // Generate a new OTP and send it
  const result = await prisma.$transaction(async transactionClient => {
    // Delete any existing OTPs for the user
    await transactionClient.verification.deleteMany({
      where: {
        contactNo: isUserExist.contactNo,
        userId: isUserExist.id,
      },
    });

    // Create a new verification record with the OTP
    const newOTP = Math.floor(100000 + Math.random() * 900000); // 6-digit OTP
    const verificationCreation = await transactionClient.verification.create({
      data: {
        contactNo: isUserExist.contactNo!,
        userId: isUserExist.id!,
        otp: newOTP,
      },
    });

    if (!verificationCreation) {
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        'Failed to create a new verification record'
      );
    }

    // Send the OTP to the user's contact number
    await BulkSMSSender.send({
      number: isUserExist.contactNo!,
      message: `Your OTP code is: ${newOTP}. Please use this code to verify your account.`,
    });

    return verificationCreation;
  });

  console.log(`all prev verification code deletion`, result);

  return { message: `OTP resent successfully to ${contactNo}` };
};


export const AuthService = {
  login,
  refreshToken,
  changePassword,
  verifyUser,
  resetPasswordRequest,
  resetPassword,
  checkOTPValidation,
  resendOTP,
};
