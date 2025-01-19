import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AuthValidator } from './auth.validator';
import { AuthController } from './auth.controller';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';
const router = express.Router();

router.route(`/verification`).post(AuthController.verifyUser);

router.route(`/reset-password-req`).post(AuthController.resetPasswordRequest);

router.route(`/resend-otp`).post(AuthController.resendOTP);

router.route(`/reset-password`).post(AuthController.resetPassword);

router.route(`/check-otp-validation`).post(AuthController.checkOTPValidation);

router
  .route(`/login`)
  .post(validateRequest(AuthValidator.login), AuthController.login);

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
    auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.NORMAL_USER),
    AuthController.changePassword
  );

export const AuthRouter = router;
