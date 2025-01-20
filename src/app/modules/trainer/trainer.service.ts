/* eslint-disable @typescript-eslint/no-explicit-any */
import { Trainer, Prisma } from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import {
  TrainerRelationalFields,
  TrainerRelationalFieldsMapper,
  TrainerSearchableFields,
} from './trainer.constant';
import { ITrainerFilterRequest } from './trainer.interface';

const getAll = async (
  filters: ITrainerFilterRequest,
  options: IPaginationOptions
) => {
  const { limit, page, skip } = paginationHelpers.calculatePagination(options);
  const { searchTerm, ...filterData } = filters;

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      OR: TrainerSearchableFields.map(field => ({
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
        if (TrainerRelationalFields.includes(key)) {
          return {
            [TrainerRelationalFieldsMapper[key]]: {
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

  const whereConditions: Prisma.TrainerWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.trainer.findMany({
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
  const total = await prisma.trainer.count({
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

const getOne = async (id: string): Promise<Trainer | null> => {

  const result = await prisma.trainer.findUnique({
    where: {
      id,
    },
  });

  return result;
};

const updateOne = async (
  id: string,
  TrainerData: Partial<Trainer>
): Promise<Trainer | null> => {
  const isExist = await prisma.trainer.findUnique({ where: { id } });

  if (!isExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, `Trainer not found`);
  }

  await prisma.$transaction(async transectionClient => {
    await transectionClient.trainer.update({
      where: {
        id: isExist.id, // Update based on the unique Trainer id
      },
      data: TrainerData,
    });
  });

  const result = await prisma.trainer.findUnique({
    where: {
      id,
    },
  });

  return result;
};

const deleteOne = async (id: string): Promise<Trainer | null> => {
  const isExist = await prisma.trainer.findUnique({ where: { id } });

  if (!isExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, `Trainer not found`);
  }

  const result = await prisma.$transaction(async transactionClient => {
    await transactionClient.trainer.delete({
      where: {
        id: isExist.id,
      },
    });
  });

  //! check this then delete 
  console.log(result);

  return isExist;
};

export const TrainerService = { getOne, getAll, updateOne, deleteOne };
