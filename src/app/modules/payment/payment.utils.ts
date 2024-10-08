/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import config from "../../config";
import { PaymentData } from "./payment.type";

export const initiatePayment = async (paymentData: PaymentData) => {
  const response = await axios.post(config.PAYMENT_URL!, {
    store_id: config.STORE_ID,
    signature_key: config.SIGNATURE_KEY,
    tran_id: paymentData.transactionId,
    success_url: `https://sports-edge.vercel.app/api/payment/confirmation?transactionId=${paymentData.transactionId}&status=success&productId=${paymentData.productId}`,
    fail_url: `https://sports-edge.vercel.app/api/payment/confirmation?status=failed`,
    cancel_url: "https://sports-edge.vercel.app/",
    amount: paymentData.totalPrice,
    currency: "BDT",
    desc: "Merchant Registration Payment",
    cus_name: paymentData.customerName,
    cus_email: paymentData.customerEmail,
    cus_add1: "N/A",
    cus_add2: "N/A",
    cus_city: "N/A",
    cus_state: "N/A",
    cus_postcode: "N/A",
    cus_country: "N/A",
    cus_phone: "N/A",
    type: "json",
  });

  return response.data;
};

export const verifyPayment = async (tnxId: string) => {
  try {
    const response = await axios.get(config.PAYMENT_VERIFY_URL as string, {
      params: {
        store_id: config.STORE_ID,
        signature_key: config.SIGNATURE_KEY,
        type: "json",
        request_id: tnxId,
      },
    });

    return response.data;
  } catch (err) {
    throw new Error("Payment validation failed!");
  }
};
