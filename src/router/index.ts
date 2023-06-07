import express from 'express';
import { UserRouter } from '../app/modules/user/user.router';
import { AcademicSemisterRouter } from '../app/modules/academicSemister/academicSemister.router';
const router = express.Router();

const moduleRoutes = [
  {
    router: '/users/',
    path: UserRouter,
  },
  {
    router: '/academic-semisters/',
    path: AcademicSemisterRouter,
  },
];

moduleRoutes.forEach(route => router.use(route.router, route.path));

export default router;
