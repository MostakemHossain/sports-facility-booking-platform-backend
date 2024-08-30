import express from "express";
import auth from "../../middleware/auth";
import validateRequest from "../../middleware/validateRequest";
import { bookingController } from "./Booking.controller";
import { bookingValidation } from "./Booking.validation";
const router = express.Router();

router.post(
  "/bookings/create-booking",
  auth("user"),
  validateRequest(bookingValidation.createBookingValidationSchema),
  bookingController.createBooking
);
router.get("/bookings/user", auth("user"), bookingController.viewBookingByUser);
router.get(
  "/bookings/admin",
  auth("admin"),
  bookingController.viewBookingByAdmin
);
router.get("/check-availability", bookingController.checkBookingAvailability);
router.delete(
  "bookings/:id",
  auth("user"),
  bookingController.cancelABookingByUser
);
router.put(
  "/bookings/admin/status/:id",
  auth("admin"),
  bookingController.updateBookingByAdmin
);

export const bookingRoutes = router;
