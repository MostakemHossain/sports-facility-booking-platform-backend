import httpStatus from "http-status";
import catchAsync from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";
import { reviewService } from "./review.service";

const createReview = catchAsync(async (req, res) => {
  const result = await reviewService.createReview(req.body);
  sendResponse(res, {
    success: true,
    message: "Review Created successfully",
    statusCode: httpStatus.OK,
    data: result,
  });
});

export const reviewController = {
  createReview,
};
