import { Schema } from "mongoose";

export type TReview = {
  userId: Schema.Types.ObjectId;
  email: string;
  name: string;
  rating: number;
  review: string;
};
