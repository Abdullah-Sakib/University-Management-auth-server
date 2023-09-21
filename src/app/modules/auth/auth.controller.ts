import { RequestHandler } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { AuthService } from './auth.service';
import { ILoginUserResponse, IRefreshTokenResponse } from './auth.interface';
import config from '../../../config';

const loginUser: RequestHandler = catchAsync(async (req, res) => {
  const { ...loginData } = req.body;
  const result = await AuthService.loginUser(loginData);
  const { refreshToken } = result;

  const cookieOptions = {
    secure: config.env === 'production',
    httpOnly: true,
  };

  // set refeshToken in the browser cookie
  res.cookie('refreshToken', refreshToken, cookieOptions);

  sendResponse<ILoginUserResponse>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'user login successfully',
    data: result,
  });
});

const refreshToken: RequestHandler = catchAsync(async (req, res) => {
  const { refreshToken } = req.cookies;
  const result = await AuthService.refreshToken(refreshToken);

  const cookieOptions = {
    secure: config.env === 'production',
    httpOnly: true,
  };

  // set refeshToken in the browser cookie
  res.cookie('refeshToken', refreshToken, cookieOptions);

  sendResponse<IRefreshTokenResponse>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'user login successfully',
    data: result,
  });
});

const changePassword: RequestHandler = catchAsync(async (req, res) => {
  const { ...passwordData } = req.body;
  const user = req.user;
  await AuthService.changePassword(passwordData, user);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'password changed successfully',
  });
});

export const AuthController = {
  loginUser,
  refreshToken,
  changePassword,
};
