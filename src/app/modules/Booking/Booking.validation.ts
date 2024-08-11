import { z } from "zod";

export const createBookingValidationSchema = z.object({
  body: z.object({
    date: z.string({ required_error: "Booking date is required" }),
    startTime: z.string({ required_error: "Start time is required" }),
    endTime: z.string({ required_error: "End time is required" }),
    facility: z
      .string({ required_error: "Facility reference is required" })
      .uuid("Invalid Facility ID"),
  }),
});

export const bookingValidation = {
  createBookingValidationSchema,
};
