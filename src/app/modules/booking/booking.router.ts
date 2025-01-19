import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { BookingController } from './booking.controller';
import { BookingValidation } from './booking.validation';
const router = express.Router();


router
    .route(`/`)
    .post(
        // validateRequest(BookingValidation.create),
        BookingController.createOne
    )
    .get(BookingController.getAll);

router
    .route(`/:id`)
    .get(BookingController.getOne)
    .patch(
        // validateRequest(BookingValidation.update),
        BookingController.updateOne)
    .delete(BookingController.deleteOne);

export const BookingRouter = router;