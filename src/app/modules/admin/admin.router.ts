import express from 'express';
import { AdminController } from './admin.controller';
import validateRequest from '../../middlewares/validateRequest';
import { AdminValidator } from './admin.validation';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';
const router = express.Router();

router.use(auth(ENUM_USER_ROLE.ADMIN));

router.route(`/`).get( AdminController.getAll);

router
  .route(`/:id`)
  .get(AdminController.getOne)
  .patch(
    validateRequest(AdminValidator.updateAdminZodSchema),
    AdminController.updateOne
  )
  .delete(AdminController.deleteOne);

export const AdminRouter = router;
