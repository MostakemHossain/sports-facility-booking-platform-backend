import express from "express";
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
];

moduleRoutes.forEach((e) => router.use(e.path, e.route));

export default router;
