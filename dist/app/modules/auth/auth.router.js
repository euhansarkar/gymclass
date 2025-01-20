"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRouter = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const auth_validator_1 = require("./auth.validator");
const auth_controller_1 = require("./auth.controller");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const user_1 = require("../../../enums/user");
const router = express_1.default.Router();
router
    .route(`/login`)
    .post(
// validateRequest(AuthValidator.login),
auth_controller_1.AuthController.login);
router
    .route(`/refresh-token`)
    .post((0, validateRequest_1.default)(auth_validator_1.AuthValidator.refreshToken), auth_controller_1.AuthController.refreshToken);
router
    .route(`/change-password`)
    .post((0, validateRequest_1.default)(auth_validator_1.AuthValidator.changePassword), (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN, user_1.ENUM_USER_ROLE.TRAINER, user_1.ENUM_USER_ROLE.TRAINEE), auth_controller_1.AuthController.changePassword);
exports.AuthRouter = router;
