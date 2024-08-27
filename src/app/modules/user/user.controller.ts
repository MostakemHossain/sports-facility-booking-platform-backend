import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";
import { userService } from "./user.service";

const createUser = catchAsync(async (req: Request, res: Response) => {
  const result = await userService.createUser(req.body);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "User registered successfully",
    data: result,
  });
});
const loginUser = catchAsync(async (req: Request, res: Response) => {
  const result = await userService.loginUser(req.body);
  const { refreshToken, ...remainingData } = result;
  res.cookie("refresh", refreshToken, {
    secure: false,
    httpOnly: true,
  });
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User logged in successfully",
    token: result.token,
    data: remainingData.data,
  });
});

const refreshToken = catchAsync(async (req: Request, res: Response) => {
  const { refresh } = req.cookies;
  const result = await userService.refreshToken(refresh);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User login successfully",
    data: result,
  });
});
const getAllUsers = catchAsync(async (req: Request, res: Response) => {
  const result = await userService.getAllUsers();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Users retrieved successfully",
    data: result,
  });
});
const updateUserRole = catchAsync(
  async (req: Request & { user?: any }, res: Response) => {
    const result = await userService.updateUserRole(
      req.body,
      req.params.id,
      req.user.role
    );
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Users updated successfully",
      data: result,
    });
  }
);

export const userController = {
  createUser,
  loginUser,
  refreshToken,
  getAllUsers,
  updateUserRole,
};
