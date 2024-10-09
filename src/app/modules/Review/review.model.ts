import mongoose, { Schema } from "mongoose";
import { TReview } from "./review.interface";

const ReviewSchema = new Schema<TReview>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: [true, "User ID is required"],
      ref: "User",
    },
    email: {
      type: String,
      required: [true, "Email is required"],
    },
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    rating: {
      type: Number,
      required: [true, "Rating is required"],
    },
    review: {
      type: String,
      required: [true, "Review is required"],
    },
  },
  {
    timestamps: true,
  }
);

export const Review = mongoose.model<TReview>("Review", ReviewSchema);
