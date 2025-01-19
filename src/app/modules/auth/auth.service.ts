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
import { JwtPayload, Secret } from 'jsonwebtoken';
import config from '../../../config';
import { jwtHelpers } from '../../../helpers/jwtHelpers';
import bcrypt from 'bcrypt';
import prisma from '../../../shared/prisma';
import prismaWithExtensions from '../../middlewares/prismaMiddleware';

const login = async (data: ILogin): Promise<ILoginResponse> => {
  const { email, password } = data;

  console.log(`data from login`, data);
  // check user exists
  const isUserExist = await prismaWithExtensions.user.isUserExists(email);

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
    { id: isUserExist?.id, email: isUserExist?.email, role: isUserExist?.role },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  const refreshToken = jwtHelpers.createToken(
    { id: isUserExist?.id, email: isUserExist?.email, role: isUserExist?.role },
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

  const { email } = verifiedToken;

  // check is user deleted or not on database
  const isUserExist = await prismaWithExtensions.user.isUserExists(email);

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, `user not found`);
  }
  // generate new Token
  const newAccessToken = jwtHelpers.createToken(
    {
      id: isUserExist.id,
      email: isUserExist.email,
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


  const { email } = userData!;
  const { oldPassword, newPassword } = passwordData!;

  // checking is user exists
  const isUserExist = await prismaWithExtensions.user.isUserExists(email);

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



export const AuthService = {
  login,
  refreshToken,
  changePassword,
};
