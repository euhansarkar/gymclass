import express from 'express';
import { ScheduleRouter } from '../modules/schedule/schedule.router';


const router = express.Router();

const moduleRoutes = [
  {
    path: '/schedules',
    route: ScheduleRouter,
  }
];

moduleRoutes.forEach(route => router.use(route.path, route.route));
export default router;
