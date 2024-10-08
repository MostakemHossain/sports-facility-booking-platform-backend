/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from "http-status";
import AppError from "../../errors/appError";
import { generateTimeSlots } from "../../utils/generateTimeSlots";
import { Facility } from "../Facility/facility.model";
import { TBooking } from "./Booking.interface";
import Booking from "./Booking.model";

const createBooking = async (payload: TBooking, user: any) => {
  const facility = await Facility.findById(payload.facility);
  if (!facility) {
    throw new AppError(httpStatus.BAD_REQUEST, "Facility not found");
  }

  const startTime = new Date(`1970-01-01T${payload.startTime}:00Z`);
  const endTime = new Date(`1970-01-01T${payload.endTime}:00Z`);

  const hours = (endTime.getTime() - startTime.getTime()) / (1000 * 60 * 60);

  if (hours <= 0) {
    throw new Error("End time must be after start time");
  }

  // Check if the time slot is already booked
  const existingBooking = await Booking.findOne({
    date: payload.date,
    $or: [
      {
        startTime: { $lt: payload.endTime },
        endTime: { $gt: payload.startTime },
      },
      {
        startTime: { $lt: payload.startTime },
        endTime: { $gt: payload.endTime },
      },
    ],
  });

  if (existingBooking) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "This time slot is already booked."
    );
  }

  const payableAmount = hours * facility.pricePerHour;

  const result = await Booking.create({
    ...payload,
    user: user.id,
    payableAmount: payableAmount,
  });

  return result;
};

const viewBookingByUser = async (user: any) => {
  const result = await Booking.find({ user: user.id }).populate("facility");
  return result;
};

const cancelABookingByUser = async (id: string, user: any) => {
  const verifyUserBookingIdAndToken = await Booking.findOne({
    _id: id,
    user: user.id,
  });

  if (!verifyUserBookingIdAndToken) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "You are not authorized to cancel this booking"
    );
  }

  const result = await Booking.findByIdAndUpdate(
    id,
    { isBooked: "canceled" },
    { new: true }
  ).populate("facility");

  return result;
};

const viewBookingByAdmin = async () => {
  const result = await Booking.find().populate("facility user");
  return result;
};

const checkBookingAvailability = async (req: any) => {
  const { date, facility } = req.query;

  if (!facility) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "Facility parameter is required"
    );
  }

  const queryDate = date ? new Date(date as string) : new Date();

  const bookings = await Booking.find({
    date: queryDate.toISOString().split("T")[0],
    facility: facility,
  });

  const allTimeSlots = generateTimeSlots();

  const availableTimeSlots = allTimeSlots.filter((slot) => {
    return !bookings.some((booking) => {
      return (
        booking.startTime === slot.startTime && booking.endTime === slot.endTime
      );
    });
  });

  if (availableTimeSlots.length === 0) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      "No available time slots for the selected date and facility."
    );
  }

  return availableTimeSlots;
};

const updateBookingByAdmin = (payload: any, id: string) => {
  return Booking.findByIdAndUpdate(
    id,
    {
      isBooked: String(payload),
    },
    { new: true }
  );
};

export const bookingService = {
  createBooking,
  viewBookingByUser,
  cancelABookingByUser,
  viewBookingByAdmin,
  checkBookingAvailability,
  updateBookingByAdmin,
};
