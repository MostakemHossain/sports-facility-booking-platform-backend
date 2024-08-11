import httpStatus from "http-status";
import AppError from "../../errors/appError";
import { TUser } from "./user.interface";
import { User } from "./user.model";

const createUser = async (payload: TUser) => {
  const isUserAlreadyExists = await User.findOne({
    where: { email: payload.email },
  });
  if (isUserAlreadyExists) {
    throw new AppError(httpStatus.BAD_REQUEST, "User already exists");
  }

  const result = await User.create(payload);

  const { password, ...userWithoutPassword } = result.toObject();

  return userWithoutPassword;
};

export const userService = {
  createUser,
};
