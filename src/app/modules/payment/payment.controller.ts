/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import catchAsync from "../../shared/catchAsync";
import { paymentServices } from "./payment.service";

const confimationController = catchAsync(async (req, res) => {
  const { transactionId, status, productId } = req.query;
  const result = await paymentServices.confirmationService(
    transactionId as string,
    status as string,
    productId as string
  );
  res.send("<h1>Payment Success full</h1>");
});

export const paymentController = {
  confimationController,
};
