import prisma from '../../../shared/prisma';
import ApiError from '../../../errors/ApiError';
import httpStatus from 'http-status';
import config from '../../../config';
import { Admin, Trainee, Trainer, User } from '@prisma/client';
import { ENUM_USER_ROLE } from '../../../enums/user';
import { JwtPayload } from 'jsonwebtoken';

const createAdmin = async (
  adminData: Admin,
  userData: User,
): Promise<{ message: string }> => {
  await prisma.$transaction(async transactionClient => {
    userData.role = ENUM_USER_ROLE.ADMIN;

    if (!userData.password) {
      userData.password = config.default_admin_pass as string;
    }

    const userCreation = await transactionClient.user.create({
      data: userData,
    });

    if (!userCreation) {
      throw new ApiError(httpStatus.BAD_REQUEST, `Failed to create User`);
    }

    const adminCreation = await transactionClient.admin.create({
      data: {
        ...adminData,
        userId: userCreation.id,
      },
    });

    if (!adminCreation) {
      throw new ApiError(httpStatus.BAD_REQUEST, `Failed to create Admin`);
    }

  });

  return { message: `Admin created successfully` };
};


const getOne = async (id: string): Promise<User | null> => {

  const result = await prisma.user.findUnique({
    where: {
      id,
    },
    include: {
      admin: true,
      trainee: true,
      trainer: true
    }
  });

  return result;
};

const getMe = async (
  user: JwtPayload | null,
): Promise<Admin | Trainer | Trainee | null> => {
  if (!user?.id) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'User is not authenticated');
  }

  // Fetch the user along with their roles
  const isUserExist = await prisma.user.findUnique({
    where: { id: user.id },
    include: {
      admin: true,
      trainer: true,
      trainee: true,
    },
  });

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }

  let result;

  // Return the respective role details based on the user's role
  if (isUserExist.role === ENUM_USER_ROLE.ADMIN && isUserExist.admin) {
    result = await prisma.admin.findUnique({
      where: { id: isUserExist.admin.id },
    });
  } else if (isUserExist.role === ENUM_USER_ROLE.TRAINER && isUserExist.trainer) {
    result = await prisma.trainer.findUnique({
      where: { id: isUserExist.trainer.id },
    });
  } else if (isUserExist.role === ENUM_USER_ROLE.TRAINEE && isUserExist.trainee) {
    result = await prisma.trainee.findUnique({
      where: { id: isUserExist.trainee.id },
    });
  } else {
    throw new ApiError(
      httpStatus.FORBIDDEN,
      'User role not recognized or role data missing',
    );
  }

  return result;
};


export const UserService = { createAdmin, getOne, getMe }; 
