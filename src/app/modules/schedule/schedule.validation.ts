import { z } from "zod";

const create = z.object({
    body: z.object({
        name: z.string({
            required_error: "name is required",
        }),
        image: z.string({
            required_error: "image is required",
        })
    })
})

const update = z.object({
    body: z.object({
        name: z.string(),
        image: z.string().optional()
    })
});

export const ScheduleValidation = {
    create,
    update
}