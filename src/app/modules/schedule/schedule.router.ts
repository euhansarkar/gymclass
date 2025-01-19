import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { ScheduleController } from './schedule.controller';
import { ScheduleValidation } from './schedule.validation';
const router = express.Router();


router
    .route(`/`)
    .post(
        validateRequest(ScheduleValidation.create),
        ScheduleController.createOne
    )
    .get(ScheduleController.getAll);

router
    .route(`/:id`)
    .get(ScheduleController.getOne)
    .patch(
        validateRequest(ScheduleValidation.update),
        ScheduleController.updateOne)
    .delete(ScheduleController.deleteOne);

export const ScheduleRouter = router;