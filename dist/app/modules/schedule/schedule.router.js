"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScheduleRouter = void 0;
const express_1 = __importDefault(require("express"));
const schedule_controller_1 = require("./schedule.controller");
const router = express_1.default.Router();
router
    .route(`/`)
    .post(
// validateRequest(ScheduleValidation.create),
schedule_controller_1.ScheduleController.createOne)
    .get(schedule_controller_1.ScheduleController.getAll);
router
    .route(`/:id`)
    .get(schedule_controller_1.ScheduleController.getOne)
    .patch(
// validateRequest(ScheduleValidation.update),
schedule_controller_1.ScheduleController.updateOne)
    .delete(schedule_controller_1.ScheduleController.deleteOne);
exports.ScheduleRouter = router;
