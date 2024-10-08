/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { readFileSync } from "fs";
import { join } from "path";
import Booking from "../Booking/Booking.model";
import { Order } from "../Order/order.model";

const confirmationService = async (
  transactionId: string,
  status: string,
  productId: string
) => {
  let result;
  let message = "";

  if (status === "success") {
    result = await Order.findOneAndUpdate(
      { transactionId },
      {
        paymentStatus: "Paid",
      }
    );

    const res = await Booking.findByIdAndUpdate(
      {
        _id: productId,
      },
      {
        isBooked: "confirmed",
      }
    );

    message = "Successfully Paid!";
  } else {
    message = "Payment Failed!";
  }

  const filePath = join(__dirname, "../../views/confirmation.html");
  let template = readFileSync(filePath, "utf-8");

  template = template.replace("{{message}}", message);

  return {
    contentType: "text/html",
    html: template,
  };
};

export const paymentServices = {
  confirmationService,
};
