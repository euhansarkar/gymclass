/* eslint-disable @typescript-eslint/no-explicit-any */
import { Admin, Prisma } from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import {
  AdminRelationalFields,
  AdminRelationalFieldsMapper,
  AdminSearchableFields,
} from './admin.constant';
import { IAdminFilterRequest } from './admin.interface';

const getAll = async (
  filters: IAdminFilterRequest,
  options: IPaginationOptions
) => {
  const { limit, page, skip } = paginationHelpers.calculatePagination(options);
  const { searchTerm, ...filterData } = filters;

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      OR: AdminSearchableFields.map(field => ({
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
        if (AdminRelationalFields.includes(key)) {
          return {
            [AdminRelationalFieldsMapper[key]]: {
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

  const whereConditions: Prisma.AdminWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.admin.findMany({
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
  const total = await prisma.admin.count({
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

const getOne = async (id: string): Promise<Admin | null> => {

  const result = await prisma.admin.findUnique({
    where: {
      id,
    },
  });

  return result;
};

const updateOne = async (
  id: string,
  adminData: Partial<Admin>
): Promise<Admin | null> => {
  const isExist = await prisma.admin.findUnique({ where: { id } });

  if (!isExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, `Admin not found`);
  }

  await prisma.$transaction(async transectionClient => {
    await transectionClient.admin.update({
      where: {
        id: isExist.id, // Update based on the unique Admin id
      },
      data: adminData,
    });
  });

  const result = await prisma.admin.findUnique({
    where: {
      id,
    },
  });

  return result;
};

const deleteOne = async (id: string): Promise<Admin | null> => {
  const isExist = await prisma.admin.findUnique({ where: { id } });

  if (!isExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, `Admin not found`);
  }

  const result = await prisma.$transaction(async transactionClient => {
    await transactionClient.admin.delete({
      where: {
        id: isExist.id,
      },
    });
  });

  //! check this then delete 
  console.log(result);

  return isExist;
};

export const AdminService = { getOne, getAll, updateOne, deleteOne };
