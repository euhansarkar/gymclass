"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingRouter = void 0;
const express_1 = __importDefault(require("express"));
const booking_controller_1 = require("./booking.controller");
const router = express_1.default.Router();
router
    .route(`/`)
    .post(
// validateRequest(BookingValidation.create),
booking_controller_1.BookingController.createOne)
    .get(booking_controller_1.BookingController.getAll);
router
    .route(`/:id`)
    .get(booking_controller_1.BookingController.getOne)
    .patch(
// validateRequest(BookingValidation.update),
booking_controller_1.BookingController.updateOne)
    .delete(booking_controller_1.BookingController.deleteOne);
exports.BookingRouter = router;
