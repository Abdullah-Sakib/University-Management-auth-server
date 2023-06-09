import { AcademicSemisterService } from './academicSemister.service';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { IAcademicSemister } from './academicSemister.interface';
import { RequestHandler } from 'express';

const createSemister: RequestHandler = catchAsync(async (req, res) => {
  const { ...academicSemisterData } = req.body;
  const result = await AcademicSemisterService.createSemister(
    academicSemisterData
  );

  sendResponse<IAcademicSemister>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic semister created successfully',
    data: result,
  });
});

export const AcademicSemisterController = {
  createSemister,
};
