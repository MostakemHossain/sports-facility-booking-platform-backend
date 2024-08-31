import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";
import { employeeService } from "./employee.service";

const createEmployee = catchAsync(async (req: Request, res: Response) => {
  const result = await employeeService.createEmployee(req);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Employee created successfully",
    data: result,
  });
});
const getAllEmployee = catchAsync(async (req: Request, res: Response) => {
  const result = await employeeService.getAllEmployee();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Employee retrieved successfully",
    data: result,
  });
});

export const employeeController = {
  createEmployee,
  getAllEmployee
};
