import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";
import { contactService } from "./contact.service";

const createContact = catchAsync(async (req: Request, res: Response) => {
  const result = await contactService.createContact(req.body);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Contact created successfully",
    data: result,
  });
});
const getAllContact = catchAsync(async (req: Request, res: Response) => {
  const result = await contactService.getAllContact();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Contacts retrieved successfully",
    data: result,
  });
});
const deleteContact = catchAsync(async (req: Request, res: Response) => {
  const result = await contactService.deleteContact(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Contact deleted successfully",
    data: result,
  });
});
export const contactController = {
  createContact,
  getAllContact,
  deleteContact,
};
