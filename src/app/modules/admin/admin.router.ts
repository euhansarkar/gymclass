import express from 'express';
import { AdminController } from './admin.controller';
import validateRequest from '../../middlewares/validateRequest';
import { AdminValidator } from './admin.validation';
const router = express.Router();

router.route(`/`).get(AdminController.getAll);

router
  .route(`/:id`)
  .get(AdminController.getOne)
  .patch(
    validateRequest(AdminValidator.updateAdminZodSchema),
    AdminController.updateOne
  )
  .delete(AdminController.deleteOne);

export const AdminRouter = router;
