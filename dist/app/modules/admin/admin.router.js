"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminRouter = void 0;
const express_1 = __importDefault(require("express"));
const admin_controller_1 = require("./admin.controller");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const admin_validation_1 = require("./admin.validation");
const router = express_1.default.Router();
router.route(`/`).get(admin_controller_1.AdminController.getAll);
router
    .route(`/:id`)
    .get(admin_controller_1.AdminController.getOne)
    .patch((0, validateRequest_1.default)(admin_validation_1.AdminValidator.updateAdminZodSchema), admin_controller_1.AdminController.updateOne)
    .delete(admin_controller_1.AdminController.deleteOne);
exports.AdminRouter = router;
