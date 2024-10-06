import express from "express";
import validateRequest from "../../middleware/validateRequest";
import { reviewController } from "./review.controller";
import { reviewValidation } from "./review.validation";

const router = express.Router();

router.post(
  "/create-review",
  validateRequest(reviewValidation.createReviewValidationSchema),
  reviewController.createReview
);

export const reviewRoutes = router;
