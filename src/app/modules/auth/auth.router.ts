import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AuthValidator } from './auth.validator';
import { AuthController } from './auth.controller';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';
const router = express.Router();

router
  .route(`/login`)
  .post(
    // validateRequest(AuthValidator.login),
    AuthController.login);

router
  .route(`/refresh-token`)
  .post(
    validateRequest(AuthValidator.refreshToken),
    AuthController.refreshToken
  );

router
  .route(`/change-password`)
  .post(
    validateRequest(AuthValidator.changePassword),
    auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.TRAINER, ENUM_USER_ROLE.TRAINEE),
    AuthController.changePassword
  );

export const AuthRouter = router;
