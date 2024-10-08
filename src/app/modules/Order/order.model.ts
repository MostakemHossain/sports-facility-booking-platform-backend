import { model, Schema } from "mongoose";
import { TOrder } from "./order.interface";

const OrderSchema: Schema = new Schema<TOrder>(
  {
    user: {
      name: { type: String, required: true },
      email: { type: String, required: true },
    },

    productId: {
      type: String,
      required: [true, "Product Id is Required"],
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["Pending", "Paid", "Shipped", "Completed", "Cancelled"],
      default: "Pending",
    },
    paymentStatus: {
      type: String,
      enum: ["Pending", "Paid", "Failed"],
      default: "Pending",
    },
    transactionId: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Order = model("Order", OrderSchema);
