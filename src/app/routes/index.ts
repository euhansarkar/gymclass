import express from 'express';
import { ScheduleRouter } from '../modules/schedule/schedule.router';
import { BookingRouter } from '../modules/booking/booking.router';
import { AdminRouter } from '../modules/admin/admin.router';
import { UserRouter } from '../modules/user/user.route';


const router = express.Router();

const moduleRoutes = [
  {
    path: '/users',
    route: UserRouter,
  },
  {
    path: '/schedules',
    route: ScheduleRouter,
  },
  {
    path: '/bookings',
    route: BookingRouter,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));
export default router;
