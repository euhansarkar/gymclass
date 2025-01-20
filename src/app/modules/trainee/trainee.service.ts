/* eslint-disable @typescript-eslint/no-explicit-any */
import { Trainee, Prisma } from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import {
  TraineeRelationalFields,
  TraineeRelationalFieldsMapper,
  TraineeSearchableFields,
} from './trainee.constant';
import { ITraineeFilterRequest } from './trainee.interface';

const getAll = async (
  filters: ITraineeFilterRequest,
  options: IPaginationOptions
) => {
  const { limit, page, skip } = paginationHelpers.calculatePagination(options);
  const { searchTerm, ...filterData } = filters;

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      OR: TraineeSearchableFields.map(field => ({
        [field]: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      })),
    });
  }

  if (Object.keys(filterData).length > 0) {
    andConditions.push({
      AND: Object.keys(filterData).map(key => {
        if (TraineeRelationalFields.includes(key)) {
          return {
            [TraineeRelationalFieldsMapper[key]]: {
              id: (filterData as any)[key],
            },
          };
        } else {
          return {
            [key]: {
              equals: (filterData as any)[key],
            },
          };
        }
      }),
    });
  }

  const whereConditions: Prisma.TraineeWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.trainee.findMany({
    where: whereConditions,
    skip,
    take: limit,
    orderBy:
      options.sortBy && options.sortOrder
        ? { [options.sortBy]: options.sortOrder }
        : {
          createdAt: 'desc',
        },
  });
  const total = await prisma.trainee.count({
    where: whereConditions,
  });

  return {
    meta: {
      total,
      page,
      limit,
    },
    data: result,
  };
};

const getOne = async (id: string): Promise<Trainee | null> => {

  const result = await prisma.trainee.findUnique({
    where: {
      id,
    },
  });

  return result;
};

const updateOne = async (
  id: string,
  TraineeData: Partial<Trainee>
): Promise<Trainee | null> => {
  const isExist = await prisma.trainee.findUnique({ where: { id } });

  if (!isExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, `Trainee not found`);
  }

  await prisma.$transaction(async transectionClient => {
    await transectionClient.trainee.update({
      where: {
        id: isExist.id, // Update based on the unique Trainee id
      },
      data: TraineeData,
    });
  });

  const result = await prisma.trainee.findUnique({
    where: {
      id,
    },
  });

  return result;
};

const deleteOne = async (id: string): Promise<Trainee | null> => {
  const isExist = await prisma.trainee.findUnique({ where: { id } });

  if (!isExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, `Trainee not found`);
  }

  const result = await prisma.$transaction(async transactionClient => {
    await transactionClient.trainee.delete({
      where: {
        id: isExist.id,
      },
    });
  });

  //! check this then delete 
  console.log(result);

  return isExist;
};

export const TraineeService = { getOne, getAll, updateOne, deleteOne };
