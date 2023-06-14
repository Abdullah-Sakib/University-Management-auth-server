import { RequestHandler } from 'express';
import { UserService } from './user.service';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { IUser } from './user.interface';

const createStudent: RequestHandler = catchAsync(async (req, res) => {
  const { student, ...user } = req.body;
  const result = await UserService.createStudent(student, user);

  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'user created successfully',
    data: result,
  });
});

const createFaculty: RequestHandler = catchAsync(async (req, res) => {
  const { faculty, ...userData } = req.body;

  const result = await UserService.createFaculty(faculty, userData);

  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'faculty created successfully',
    data: result,
  });
});

const createAdmin: RequestHandler = catchAsync(async (req, res) => {
  const { admin, ...adminData } = req.body;

  const result = await UserService.createAdmin(admin, adminData);

  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin created successfully',
    data: result,
  });
});

export const UserController = {
  createStudent,
  createFaculty,
  createAdmin,
};
