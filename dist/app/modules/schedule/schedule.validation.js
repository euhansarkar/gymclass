"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScheduleValidation = void 0;
const zod_1 = require("zod");
const create = zod_1.z.object({
    title: zod_1.z.string({
        required_error: 'Title is required.',
        invalid_type_error: 'Title must be a valid string.',
    }),
    startTime: zod_1.z
        .string({
        required_error: 'Start time is required.',
        invalid_type_error: 'Start time must be a valid ISO string.',
    })
        .refine(value => !isNaN(Date.parse(value)), {
        message: 'Start time must be a valid date.',
    }),
    endTime: zod_1.z
        .string({
        required_error: 'End time is required.',
        invalid_type_error: 'End time must be a valid ISO string.',
    })
        .refine(value => !isNaN(Date.parse(value)), {
        message: 'End time must be a valid date.',
    })
        .refine(
    // @ts-expect-error err
    (value, ctx) => {
        const startTime = ctx.parent.startTime;
        return new Date(value) > new Date(startTime);
    }, { message: 'End time must be after the start time.' }),
    trainerId: zod_1.z.string({
        required_error: 'Trainer ID is required.',
        invalid_type_error: 'Trainer ID must be a valid string.',
    }),
    maxTrainees: zod_1.z
        .number({
        invalid_type_error: 'Max trainees must be a valid number.',
    })
        .int('Max trainees must be an integer.')
        .positive('Max trainees must be greater than 0.')
        .max(10, 'Max trainees cannot exceed 100.')
        .default(10),
});
const update = zod_1.z.object({
    title: zod_1.z
        .string({
        invalid_type_error: 'Title must be a valid string.',
    })
        .optional(),
    startTime: zod_1.z
        .string({
        invalid_type_error: 'Start time must be a valid ISO string.',
    })
        .refine(value => !isNaN(Date.parse(value)), {
        message: 'Start time must be a valid date.',
    })
        .optional(),
    endTime: zod_1.z
        .string({
        invalid_type_error: 'End time must be a valid ISO string.',
    })
        .refine(value => !isNaN(Date.parse(value)), {
        message: 'End time must be a valid date.',
    })
        .refine(
    // @ts-expect-error err
    (value, ctx) => {
        const { startTime } = ctx.parent;
        if (startTime && value) {
            return new Date(value) > new Date(startTime);
        }
        return true;
    }, { message: 'End time must be after the start time.' })
        .optional(),
    trainerId: zod_1.z
        .string({
        invalid_type_error: 'Trainer ID must be a valid string.',
    })
        .optional(),
    maxTrainees: zod_1.z
        .number({
        invalid_type_error: 'Max trainees must be a valid number.',
    })
        .int('Max trainees must be an integer.')
        .positive('Max trainees must be greater than 0.')
        .max(100, 'Max trainees cannot exceed 100.')
        .optional(),
});
exports.ScheduleValidation = {
    create,
    update
};
