import httpStatus from "http-status";
import catchAsync from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";
import { orderService } from "./order.service";

const createOrder = catchAsync(async (req, res) => {
  const result = await orderService.createOrder(req.body);
  sendResponse(res, {
    success: true,
    message: "Order Created successfully",
    statusCode: httpStatus.OK,
    data: result,
  });
});

export const orderController = {
  createOrder,
};
