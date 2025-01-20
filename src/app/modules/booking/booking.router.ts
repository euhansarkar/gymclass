import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { BookingController } from './booking.controller';
import { BookingValidation } from './booking.validation';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';
const router = express.Router();


router
  .route(`/`)
  .post(
    auth(ENUM_USER_ROLE.TRAINEE),
    // validateRequest(BookingValidation.create),
    BookingController.createOne,
  )
  .get(BookingController.getAll);

router
  .route(`/:id`)
  .get(BookingController.getOne)
  .patch(
    auth(ENUM_USER_ROLE.TRAINEE),
    // validateRequest(BookingValidation.update),
    BookingController.updateOne,
  )
  .delete(BookingController.deleteOne);

export const BookingRouter = router;