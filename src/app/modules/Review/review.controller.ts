import httpStatus from "http-status";
import catchAsync from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";
import { reviewService } from "./review.service";

const createReview = catchAsync(async (req, res) => {
  const result = await reviewService.createReview(req.body);
  sendResponse(res, {
    success: true,
    message: "Review Created successfully",
    statusCode: httpStatus.CREATED,
    data: result,
  });
});
const getMyReviews = catchAsync(async (req, res) => {
  const result = await reviewService.getMyReviews(req.params.id);
  sendResponse(res, {
    success: true,
    message: "My Review is Retrieved successfully",
    statusCode: httpStatus.OK,
    data: result,
  });
});
const getALLReviews = catchAsync(async (req, res) => {
  const result = await reviewService.getAllReviews();
  sendResponse(res, {
    success: true,
    message: "Review is Retrieved successfully",
    statusCode: httpStatus.OK,
    data: result,
  });
});
const deleteMyReviews = catchAsync(async (req, res) => {
  const result = await reviewService.deleteMyReviews(req.params.id);
  sendResponse(res, {
    success: true,
    message: "My Review is Deleted successfully",
    statusCode: httpStatus.OK,
    data: result,
  });
});
const updateMyReviews = catchAsync(async (req, res) => {
  const result = await reviewService.updateMyReviews(req.params.id, req.body);
  sendResponse(res, {
    success: true,
    message: "My Review is updated successfully",
    statusCode: httpStatus.OK,
    data: result,
  });
});

export const reviewController = {
  createReview,
  getMyReviews,
  deleteMyReviews,
  updateMyReviews,
  getALLReviews
};
