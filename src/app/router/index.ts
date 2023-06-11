import express from 'express';
import { UserRouter } from '../modules/user/user.router';
import { AcademicSemesterRouter } from '../modules/academicSemester/academicSemester.router';
import { AcademicFacultyRoutes } from '../modules/academicFaculty/academicFaculty.route';
import { AcademicDepartmentRoutes } from '../modules/academicDepartment/academicDepartment.route';
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
  {
    path: '/academic-faculties',
    router: AcademicFacultyRoutes,
  },
  {
    path: '/academic-departments',
    router: AcademicDepartmentRoutes,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.router));

export default router;
