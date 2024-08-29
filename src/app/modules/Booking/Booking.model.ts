import mongoose, { Schema } from "mongoose";
import { TBooking } from "./Booking.interface";

const BookingSchema: Schema<TBooking> = new Schema({
  date: {
    type: Date,
    required: [true, "Booking date is required"],
  },
  startTime: {
    type: String,
    required: [true, "Start time is required"],
  },
  endTime: {
    type: String,
    required: [true, "End time is required"],
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: [true, "User reference is required"],
  },
  facility: {
    type: Schema.Types.ObjectId,
    ref: "Facility",
    required: [true, "Facility reference is required"],
  },
  payableAmount: {
    type: Number,
    required: [true, "Payable amount is required"],
  },
  isBooked: {
    type: String,
    enum: ["confirmed", "pending", "canceled"],
    default: "pending",
  },
});

const Booking = mongoose.model<TBooking>("Booking", BookingSchema);

export default Booking;
