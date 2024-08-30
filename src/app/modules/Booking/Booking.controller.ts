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
const viewBookingByAdmin = catchAsync(
  async (req: Request & { user?: any }, res: Response) => {
    const user = req.user;
    const result = await bookingService.viewBookingByAdmin();
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Bookings retrieved successfully",
      data: result,
    });
  }
);
const cancelABookingByUser = catchAsync(
  async (req: Request & { user?: any }, res: Response) => {
    const user = req.user;
    const result = await bookingService.cancelABookingByUser(
      req.params.id,
      user
    );
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Bookings cancelled successfully",
      data: result,
    });
  }
);
const checkBookingAvailability = catchAsync(
  async (req: Request & { user?: any }, res: Response) => {
    const user = req.user;
    const result = await bookingService.checkBookingAvailability(req);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Availability checked successfully",
      data: result,
    });
  }
);
const updateBookingByAdmin = catchAsync(
  async (req: Request & { user?: any }, res: Response) => {
    const result = await bookingService.updateBookingByAdmin(
      req.body?.status?.status,
      req.params.id
    );
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Booking updated successfully",
      data: result,
    });
  }
);

export const bookingController = {
  createBooking,
  viewBookingByUser,
  cancelABookingByUser,
  viewBookingByAdmin,
  checkBookingAvailability,
  updateBookingByAdmin,
};
