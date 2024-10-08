import express from "express";
import { bookingRoutes } from "../modules/Booking/Booking.routes";
import { contactRoutes } from "../modules/Contact/contact.routes";
import { employeeRoutes } from "../modules/Employee/employee.routes";
import { facilityRoutes } from "../modules/Facility/facility.routes";
import { OrderRoutes } from "../modules/Order/roder.routes";
import { reviewRoutes } from "../modules/Review/review.routes";
import { userRoutes } from "../modules/user/user.routes";
import { paymentRoutes } from "../modules/payment/payment.routes";

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
    path: "/",
    route: bookingRoutes,
  },
  {
    path: "/contact",
    route: contactRoutes,
  },
  {
    path: "/employee",
    route: employeeRoutes,
  },
  {
    path: "/review",
    route: reviewRoutes,
  },
  {
    path: "/order",
    route: OrderRoutes,
  },
  {
    path: "/payment",
    route: paymentRoutes,
  },
];

moduleRoutes.forEach((e) => router.use(e.path, e.route));

export default router;
