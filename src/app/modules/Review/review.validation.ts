import { z } from "zod";

const createReviewValidationSchema = z.object({
  body: z.object({
    userId: z.string({ required_error: "User ID is required" }),
    email: z
      .string({
        required_error: "Email is required",
      })
      .email("Invalid email format"),
    name: z.string({ required_error: "Name is required" }),
    rating: z
      .number({
        required_error: "Rating is required",
        invalid_type_error: "Rating must be a number",
      })
      .min(0, "Rating must be at least 0")
      .max(5, "Rating cannot exceed 5"),
    review: z
      .string({
        required_error: "Review is required",
      })
      .min(10, "Review must be at least 10 characters long")
      .max(300, "Review cannot exceed 300 characters"),
  }),
});


export const updateReviewValidationSchema = z.object({
  body: z.object({
    userId: z.string().optional(),
    email: z.string().email("Invalid email format").optional(),
    name: z.string().optional(),
    rating: z
      .number()
      .min(0, "Rating must be at least 0")
      .max(5, "Rating cannot exceed 5")
      .optional(),
    review: z
      .string()
      .min(10, "Review must be at least 10 characters long")
      .max(300, "Review cannot exceed 300 characters")
      .optional(),
  }),
});

export const reviewValidation = {
  createReviewValidationSchema,
  updateReviewValidationSchema,
};
