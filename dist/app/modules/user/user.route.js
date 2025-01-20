"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRouter = void 0;
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("./user.controller");
const user_1 = require("../../../enums/user");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const router = express_1.default.Router();
router
    .route(`/create-admin`)
    .post(
// validateRequest(UserValidation.createAdminZodSchema),
user_controller_1.UserController.createAdmin);
router.route(`/create-trainer`).post(
// validateRequest(UserValidation.createAdminZodSchema),
user_controller_1.UserController.createTrainer);
router.route(`/create-trainee`).post(
// validateRequest(UserValidation.createAdminZodSchema),
user_controller_1.UserController.createTrainee);
router
    .route(`/get-me`)
    .post((0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN, user_1.ENUM_USER_ROLE.TRAINER, user_1.ENUM_USER_ROLE.TRAINEE), user_controller_1.UserController.getMe);
router.route(`/:id`).get(user_controller_1.UserController.getOne);
exports.UserRouter = router;
