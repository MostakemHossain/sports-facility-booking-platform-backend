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
  const refreshToken = jwtHelpers.generateToken(
    userInfo,
    config.jwt__refresh_secret as string,
    config.jwt__refresh_expire_in as string
  );
  const { password, createdAt, updatedAt, __v, ...userWithoutPassword } =
    isUserAlreadyExists.toObject();
  return {
    token,
    refreshToken,
    data: userWithoutPassword,
  };
};

const refreshToken = async (token: string) => {
  let decodedData;
  try {
    decodedData = jwtHelpers.verifyToken(
      token,
      config.jwt__refresh_secret as string
    );
  } catch (error) {
    throw new AppError(httpStatus.UNAUTHORIZED, "You are not authorized");
  }
  const userData = await User.findOne({
    email: decodedData.email,
  });
  if (!userData) {
    throw new AppError(httpStatus.NOT_FOUND, "USER NOT FOUND");
  }
  const accessToken = jwtHelpers.generateToken(
    {
      email: userData.email,
      role: userData.role,
    },
    config.jwt__access_secret as string,
    config.jwt__access_expire_in as string
  );

  return {
    id: userData.id,
    email: userData.email,
    accessToken,
  };
};

const getAllUsers = async () => {
  const result = await User.find();
  return result;
};

const updateUserRole = async (
  payload: { role: string },
  id: string,
  role: string
) => {
  const userToUpdate = await User.findById(id);
  if (!userToUpdate) {
    throw new Error("User not found");
  }
  if (role === "admin" && payload.role === "super-admin") {
    throw new Error("Admins cannot update a super admin's role");
  }

  const updatedUser = await User.findByIdAndUpdate(
    id,
    { role: payload.role },
    { new: true }
  );
  return updatedUser;
};

const deleteUser = async (id: string) => {
  const userToDelete = await User.findByIdAndDelete(id);
  return userToDelete;
};

const getMe = async (email: string) => {
  const user = await User.findOne({ email });
  return user;
};
export const userService = {
  createUser,
  loginUser,
  refreshToken,
  getAllUsers,
  updateUserRole,
  deleteUser,
  getMe,
};
