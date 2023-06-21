import express from 'express';
import { UserRoutes } from '../modules/user/user.router';
import { AcademicSemesterRoutes } from '../modules/academicSemester/academicSemester.router';
import { AcademicFacultyRoutes } from '../modules/academicFaculty/academicFaculty.route';
import { AcademicDepartmentRoutes } from '../modules/academicDepartment/academicDepartment.route';
import { StudentRoutes } from '../modules/student/student.router';
import { FacultyRoutes } from '../modules/faculty/faculty.router';
import { ManagementDepartmentRoutes } from '../modules/managementDepartment/managementDepartment.router';
import { AdminRoutes } from '../modules/admin/admin.router';
import { AuthRoutes } from '../modules/auth/auth.route';
const router = express.Router();

const moduleRoutes = [
  {
    path: '/users',
    router: UserRoutes,
  },
  {
    path: '/academic-semesters',
    router: AcademicSemesterRoutes,
  },
  {
    path: '/academic-faculties',
    router: AcademicFacultyRoutes,
  },
  {
    path: '/academic-departments',
    router: AcademicDepartmentRoutes,
  },
  {
    path: '/student',
    router: StudentRoutes,
  },
  {
    path: '/faculty',
    router: FacultyRoutes,
  },
  {
    path: '/admin',
    router: AdminRoutes,
  },
  {
    path: '/management-departments',
    router: ManagementDepartmentRoutes,
  },
  {
    path: '/auth',
    router: AuthRoutes,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.router));

export default router;
