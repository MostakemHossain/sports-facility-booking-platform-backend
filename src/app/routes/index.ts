import express from "express";
import { userRoutes } from "../modules/user/user.routes";

const router = express.Router();

const moduleRoutes = [
  {
    path: "/auth",
    route: userRoutes,
  },
];

moduleRoutes.forEach((e) => router.use(e.path, e.route));

export default router;
