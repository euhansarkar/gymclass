import express from 'express';
import { TraineeController } from './trainee.controller';
import validateRequest from '../../middlewares/validateRequest';
import { TraineeValidator } from './trainee.validation';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';
const router = express.Router();

router.route(`/`).get(
  auth(ENUM_USER_ROLE.ADMIN),
  TraineeController.getAll);

router
  .route(`/:id`)
  .get(TraineeController.getOne)
  .patch(
    validateRequest(TraineeValidator.updateTraineeZodSchema),
    auth(ENUM_USER_ROLE.TRAINEE),
    TraineeController.updateOne,
  )
  .delete(auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.TRAINEE), TraineeController.deleteOne);

export const TraineeRouter = router;
