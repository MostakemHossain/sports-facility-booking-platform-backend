import express from "express";
import auth from "../../middleware/auth";
import validateRequest from "../../middleware/validateRequest";
import { facilityController } from "./facility.controller";
import { facilityValidation } from "./facility.validation";
const router = express.Router();

router.post(
  "/facility",
  auth("admin"),
  validateRequest(facilityValidation.createFacility),
  facilityController.createFacility
);

export const facilityRoutes = router;
