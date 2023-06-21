import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { User } from '../user/user.model';
import { ILoginUser, ILoginUserResponse } from './auth.interface';
import { Secret } from 'jsonwebtoken';
import config from '../../../config';
import { jwtHelper } from '../../../helper/jwtHelper';

const loginUser = async (payload: ILoginUser): Promise<ILoginUserResponse> => {
  const { id, password } = payload;
  // instance of user
  const user = new User();

  const isUserExist = await user.isUserExists(id);

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
  }

  if (
    isUserExist?.password &&
    !user.isPasswordMatched(password, isUserExist?.password)
  ) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'password is incorrect');
  }
  const { id: userId, role, needsPasswordChange } = isUserExist;
  const accessToken = jwtHelper.createToken(
    {
      id: userId,
      role: role,
    },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  const refreshToken = jwtHelper.createToken(
    {
      id: userId,
      role: role,
    },
    config.jwt.refresh_secret as Secret,
    config.jwt.refresh_expires_in as string
  );
  console.log(accessToken, refreshToken, needsPasswordChange);
  return {
    accessToken,
    refreshToken,
    needsPasswordChange,
  };
};

export const AuthService = {
  loginUser,
};
