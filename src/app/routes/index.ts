import express from "express";
import { bookingRoutes } from "../modules/Booking/Booking.routes";
import { facilityRoutes } from "../modules/Facility/facility.routes";
import { userRoutes } from "../modules/user/user.routes";

const router = express.Router();

const moduleRoutes = [
  {
    path: "/auth",
    route: userRoutes,
  },
  {
    path: "/",
    route: facilityRoutes,
  },
  {
    path: "/bookings",
    route: bookingRoutes,
  },
];

moduleRoutes.forEach((e) => router.use(e.path, e.route));

export default router;
