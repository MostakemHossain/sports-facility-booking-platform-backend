import { initiatePayment } from "../payment/payment.utils";
import { TOrder } from "./order.interface";
import { Order } from "./order.model";

const createOrder = async (orderData: TOrder) => {
  const transactionId = `TXN-SF-${Date.now()}`;

  const order = new Order({
    user: orderData.user,
    productId: orderData.productId,
    totalPrice: orderData.totalPrice,
    status: "Pending",
    paymentStatus: "Pending",
    transactionId,
  });

  await order.save();

  const paymentData = {
    transactionId,
    totalPrice: orderData.totalPrice,
    customerName: orderData.user.name,
    customerEmail: orderData.user.email,
    productId: orderData.productId,
  };

  const paymentSession = await initiatePayment(paymentData);

  return paymentSession;
};

export const orderService = {
  createOrder,
};
