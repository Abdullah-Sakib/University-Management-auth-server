import express from 'express';
import { UserRouter } from '../modules/user/user.router';
import { AcademicSemisterRouter } from '../modules/academicSemister/academicSemister.router';
const router = express.Router();

const moduleRoutes = [
  {
    path: '/users',
    router: UserRouter,
  },
  {
    path: '/academic-semisters',
    router: AcademicSemisterRouter,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.router));

export default router;
