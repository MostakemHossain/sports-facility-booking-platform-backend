import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";
import { bookingService } from "./Booking.service";

const createBooking = catchAsync(
  async (req: Request & { user?: any }, res: Response) => {
    const user = req.user;
    const result = await bookingService.createBooking(req.body, user);
    sendResponse(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: "Booking created successfully",
      data: result,
    });
  }
);
const viewBookingByUser = catchAsync(
  async (req: Request & { user?: any }, res: Response) => {
    const user = req.user;
    const result = await bookingService.viewBookingByUser(user);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Bookings retrieved successfully",
      data: result,
    });
  }
);

export const bookingController = {
  createBooking,
  viewBookingByUser,
};
