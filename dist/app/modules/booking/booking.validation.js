"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingValidation = void 0;
const zod_1 = require("zod");
const create = zod_1.z.object({
    scheduleId: zod_1.z.string({
        required_error: 'Schedule ID is required.',
        invalid_type_error: 'Schedule ID must be a valid string.',
    }),
    traineeId: zod_1.z.string({
        required_error: 'Trainee ID is required.',
        invalid_type_error: 'Trainee ID must be a valid string.',
    }),
    isCancelled: zod_1.z
        .boolean({
        invalid_type_error: 'isCancelled must be a boolean value.',
    })
        .optional(),
});
const update = zod_1.z.object({
    scheduleId: zod_1.z
        .string({
        invalid_type_error: 'Schedule ID must be a valid string.',
    })
        .optional(),
    traineeId: zod_1.z
        .string({
        invalid_type_error: 'Trainee ID must be a valid string.',
    })
        .optional(),
    isCancelled: zod_1.z
        .boolean({
        invalid_type_error: 'isCancelled must be a boolean value.',
    })
        .optional(),
});
exports.BookingValidation = {
    create,
    update
};
