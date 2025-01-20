"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const schedule_router_1 = require("../modules/schedule/schedule.router");
const booking_router_1 = require("../modules/booking/booking.router");
const user_route_1 = require("../modules/user/user.route");
const auth_router_1 = require("../modules/auth/auth.router");
const router = express_1.default.Router();
const moduleRoutes = [
    {
        path: '/users',
        route: user_route_1.UserRouter,
    },
    {
        path: '/auth',
        route: auth_router_1.AuthRouter,
    },
    {
        path: '/schedules',
        route: schedule_router_1.ScheduleRouter,
    },
    {
        path: '/bookings',
        route: booking_router_1.BookingRouter,
    },
];
moduleRoutes.forEach(route => router.use(route.path, route.route));
exports.default = router;
