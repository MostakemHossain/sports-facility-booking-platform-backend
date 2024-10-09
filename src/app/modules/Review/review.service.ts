import { TReview } from "./review.interface";
import { Review } from "./review.model";

const createReview = async (payload: TReview) => {
  const result = await Review.create(payload).then((review) =>
    review.populate("userId")
  );
  return result;
};

const getMyReviews = async (id: string) => {
  const result = await Review.find({
    userId: id,
  }).populate("userId");
  return result;
};
const deleteMyReviews = async (id: string) => {
  const result = await Review.findByIdAndDelete(id);
  return result;
};

const updateMyReviews = async (id: string, payload: Partial<TReview>) => {
  const result = await Review.findByIdAndUpdate(id, payload, { new: true });
  return result;
};
const getAllReviews = async () => {
  const result = await Review.find().populate("userId");
  return result;
};

export const reviewService = {
  createReview,
  getMyReviews,
  deleteMyReviews,
  updateMyReviews,
  getAllReviews,
};
