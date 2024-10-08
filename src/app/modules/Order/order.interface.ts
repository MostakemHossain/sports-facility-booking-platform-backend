import { Schema } from "mongoose";

export type TOrder = {
  user: {
    name: string;
    email: string;
  };
  productId: Schema.Types.ObjectId;
  totalPrice: number;
  status: string;
  paymentStatus: string;
  transactionId: string;
};
