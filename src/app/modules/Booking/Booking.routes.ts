import express from "express";
import auth from "../../middleware/auth";
import validateRequest from "../../middleware/validateRequest";
import { bookingController } from "./Booking.controller";
import { bookingValidation } from "./Booking.validation";
const router = express.Router();

router.post(
  "/",
  auth("user"),
  validateRequest(bookingValidation.createBookingValidationSchema),
  bookingController.createBooking
);
router.get("/user", auth("user"), bookingController.viewBookingByUser);
router.delete("/:id", auth("user"), bookingController.cancelABookingByUser);

export const bookingRoutes = router;
