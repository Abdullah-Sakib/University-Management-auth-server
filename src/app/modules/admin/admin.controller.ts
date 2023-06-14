import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { RequestHandler } from 'express';
import { pick } from '../../../shared/pick';
import { paginationFields } from '../../../constants/pagination';
import { IAdmin } from './admin.interface';
import { adminFilterableFields } from './admin.constants';
import { AdminService } from './admin.service';

const getAllAdmins: RequestHandler = catchAsync(async (req, res) => {
  const filters = pick(req.query, adminFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);

  const result = await AdminService.getAllAdmins(filters, paginationOptions);
  sendResponse<IAdmin[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin retrived successfully',
    meta: result.meta,
    data: result.data,
  });
});

const getSingleAdmin: RequestHandler = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await AdminService.getSingleAdmin(id);
  sendResponse<IAdmin>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin retrived successfully',
    data: result,
  });
});

const updateAdmin: RequestHandler = catchAsync(async (req, res) => {
  const id = req.params.id;
  const updateData = req.body;

  const result = await AdminService.updateAdmin(id, updateData);

  sendResponse<IAdmin>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin updated successfully',
    data: result,
  });
});

const deleteAdmin: RequestHandler = catchAsync(async (req, res) => {
  const id = req.params.id;

  const result = await AdminService.deleteAdmin(id);

  sendResponse<IAdmin>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin deleted successfully',
    data: result,
  });
});

export const AdminController = {
  getAllAdmins,
  getSingleAdmin,
  updateAdmin,
  deleteAdmin,
};
