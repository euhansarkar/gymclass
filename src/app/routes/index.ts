import express from 'express';
import { ScheduleRouter } from '../modules/schedule/schedule.router';
import { BookingRouter } from '../modules/booking/booking.router';


const router = express.Router();

const moduleRoutes = [
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
