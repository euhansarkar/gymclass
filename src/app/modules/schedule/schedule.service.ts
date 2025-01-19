import { Schedule, Prisma } from "@prisma/client";
import { paginationHelpers } from "../../../helpers/paginationHelper";
import { IGenericResponse } from "../../../interfaces/common";
import { IPaginationOptions } from "../../../interfaces/pagination";
import prisma from "../../../shared/prisma";
import { IScheduleFilterRequest } from "./schedule.interface";
import { ScheduleRelationalFields, ScheduleRelationalFieldsMapper, ScheduleSearchableFields } from "./schedule.constant";
import { SearchingFilteringHelper } from "../../../helpers/searchFilterHelper";
import ApiError from "../../../errors/ApiError";
import httpStatus from "http-status";

const createOne = async (data: Schedule): Promise<Schedule> => {

  const startOfDay = new Date(data.startTime);
  startOfDay.setHours(0, 0, 0, 0);

  const endOfDay = new Date(data.startTime);
  endOfDay.setHours(23, 59, 59, 999);

  const scheduleCount = await prisma.schedule.count({
    where: {
      startTime: {
        gte: startOfDay,
        lte: endOfDay,
      },
    },
  });

  if (scheduleCount >= 5) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      `Only 5 Class Schedules are allowed per day.`,
    );
  }

  const result = await prisma.schedule.create({
    data,
  });

  return result;
};

const getAll = async (
    filters: IScheduleFilterRequest,
    options: IPaginationOptions
): Promise<IGenericResponse<Schedule[]>> => {
    const { page, limit, skip } = paginationHelpers.calculatePagination(options);


    const andConditions = SearchingFilteringHelper.searchingFiltering({ filters, searchAbleFields: ScheduleSearchableFields, relationalFields: ScheduleRelationalFields, relationalFieldsMapper: ScheduleRelationalFieldsMapper });


    const whereConditions: Prisma.ScheduleWhereInput =
        andConditions.length > 0 ? { AND: andConditions } : {};

    const result = await prisma.schedule.findMany({
        skip,
        take: limit,
        where: whereConditions,
        include: {
            bookings: true 
        }
    });
    const total = await prisma.schedule.count({
        where: whereConditions
    })

    return {
        meta: {
            page,
            limit,
            total
        },
        data: result
    };
}

const getOne = async (id: string): Promise<Schedule | null> => {

    const result = await prisma.schedule.findUnique({
      where: {
        id,
      },
      include: {
          bookings: true 
      },
    });

    if (!result) {
        throw new ApiError(httpStatus.NOT_FOUND, "schedule not found");
    }

    return result;
};

const updateOne = async (id: string, payload: Partial<Schedule>): Promise<Schedule> => {

    const isExists = await getOne(id);

    const result = await prisma.schedule.update({
      where: {
        id: isExists?.id,
      },
      data: payload,
    });
    return result;
};

const deleteOne = async (id: string): Promise<Schedule> => {

    const isExists = await getOne(id);

    const result = await prisma.schedule.delete({
      where: {
        id: isExists?.id 
      },
    });
    return result;
};

export const ScheduleService = { createOne, updateOne, deleteOne, getAll, getOne }
