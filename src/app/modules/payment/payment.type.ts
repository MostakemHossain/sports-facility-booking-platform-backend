import { Schema } from "mongoose";

export type PaymentData = {
  transactionId: string;
  totalPrice: number;
  customerName: string;
  customerEmail: string;
  productId: Schema.Types.ObjectId;
};
