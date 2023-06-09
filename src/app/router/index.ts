import express from 'express';
import { UserRouter } from '../modules/user/user.router';
import { AcademicSemesterRouter } from '../modules/academicSemester/academicSemester.router';
const router = express.Router();

const moduleRoutes = [
  {
    path: '/users',
    router: UserRouter,
  },
  {
    path: '/academic-semesters',
    router: AcademicSemesterRouter,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.router));

export default router;
