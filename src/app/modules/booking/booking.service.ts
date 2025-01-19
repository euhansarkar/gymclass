import { Booking, Prisma } from "@prisma/client";
import { paginationHelpers } from "../../../helpers/paginationHelper";
import { IGenericResponse } from "../../../interfaces/common";
import { IPaginationOptions } from "../../../interfaces/pagination";
import prisma from "../../../shared/prisma";
import { IBookingFilterRequest } from "./booking.interface";
import { BookingRelationalFields, BookingRelationalFieldsMapper, BookingSearchableFields } from "./booking.constant";
import { SearchingFilteringHelper } from "../../../helpers/searchFilterHelper";
import ApiError from "../../../errors/ApiError";
import httpStatus from "http-status";

const createOne = async (data: Booking): Promise<Booking> => {
    const result = await prisma.booking.create({
        data
    })
    return result;
}

const getAll = async (
    filters: IBookingFilterRequest,
    options: IPaginationOptions
): Promise<IGenericResponse<Booking[]>> => {
    const { page, limit, skip } = paginationHelpers.calculatePagination(options);


    const andConditions = SearchingFilteringHelper.searchingFiltering({ filters, searchAbleFields: BookingSearchableFields, relationalFields: BookingRelationalFields, relationalFieldsMapper: BookingRelationalFieldsMapper });


    const whereConditions: Prisma.BookingWhereInput =
        andConditions.length > 0 ? { AND: andConditions } : {};

    const result = await prisma.booking.findMany({
        skip,
        take: limit,
        where: whereConditions,
        include: {
        }
    });
    const total = await prisma.booking.count({
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

const getOne = async (id: string): Promise<Booking | null> => {
    const result = await prisma.booking.findUnique({
      where: {
        id,
      },
      include: {
      },
    });

    if (!result) {
        throw new ApiError(httpStatus.NOT_FOUND, "booking not found");
    }

    return result;
};

const updateOne = async (id: string, payload: Partial<Booking>): Promise<Booking> => {

    const isExists = await getOne(id);

    const result = await prisma.booking.update({
        where: {
            id
        },
        data: payload
    });
    return result;
};

const deleteOne = async (id: string): Promise<Booking> => {

    const isExists = await getOne(id);

    const result = await prisma.booking.delete({
        where: {
            id
        }
    });
    return result;
};

export const BookingService = { createOne, updateOne, deleteOne, getAll, getOne }
