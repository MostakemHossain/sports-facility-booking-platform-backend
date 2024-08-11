import express from "express";
import auth from "../../middleware/auth";
import validateRequest from "../../middleware/validateRequest";
import { bookingController } from "./Booking.controller";
import { bookingValidation } from "./Booking.validation";
const router = express.Router();

router.post(
  "/",
  auth("user"),
  //   validateRequest(bookingValidation.createBookingValidationSchema),
  bookingController.createBooking
);

export const bookingRoutes = router;
