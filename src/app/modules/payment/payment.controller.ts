import httpStatus from "http-status";
import catchAsync from "../../shared/catchAsync";
import { paymentServices } from "./payment.service";

const confimationController = catchAsync(async (req, res) => {
  const { transactionId, status, productId } = req.query;
  const result = await paymentServices.confirmationService(
    transactionId as string,
    status as string,
    productId as string
  );
  res.set("Content-Type", result.contentType);
  res.status(httpStatus.OK).send(result.html);
});

export const paymentController = {
  confimationController,
};
