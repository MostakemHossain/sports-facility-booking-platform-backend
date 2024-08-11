import bcrypt from "bcrypt";
import httpStatus from "http-status";
import config from "../../config";
import AppError from "../../errors/appError";
import { jwtHelpers } from "../../helpers/jwtHelper";
import { TLoginUser, TUser } from "./user.interface";
import { User } from "./user.model";

const createUser = async (payload: TUser) => {
  const isUserAlreadyExists = await User.findOne({
    email: payload.email,
  });
  if (isUserAlreadyExists) {
    throw new AppError(httpStatus.BAD_REQUEST, "User already exists");
  }

  const result = await User.create(payload);

  const { password, createdAt, updatedAt, __v, ...userWithoutPassword } =
    result.toObject();

  return userWithoutPassword;
};

const loginUser = async (payload: TLoginUser) => {
  const isUserAlreadyExists = await User.findOne({
    email: payload.email,
  });
  if (!isUserAlreadyExists) {
    throw new AppError(httpStatus.BAD_REQUEST, "User Not Found");
  }
  const hashedPassword = await bcrypt.compare(
    payload.password,
    isUserAlreadyExists.password
  );
  if (!hashedPassword) {
    throw new AppError(httpStatus.BAD_REQUEST, "Incorrect email and password");
  }
  const userInfo = {
    id: isUserAlreadyExists._id,
    email: isUserAlreadyExists.email,
    role: isUserAlreadyExists.role,
  };
  const token = await jwtHelpers.generateToken(
    userInfo,
    config.jwt__access_secret as string,
    config.jwt__access_expire_in as string
  );
  const { password, createdAt, updatedAt, __v, ...userWithoutPassword } =
    isUserAlreadyExists.toObject();
  return {
    token,
    data: userWithoutPassword,
  };
};

export const userService = {
  createUser,
  loginUser,
};
