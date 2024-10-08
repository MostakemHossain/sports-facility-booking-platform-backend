import { z } from "zod";

export const createOrderValidationSchema = z.object({
  body: z.object({
    user: z.object({
      name: z.string().nonempty("Name is required"),
      email: z.string().email("Invalid email address"),
    }),
    productId: z.string().nonempty("Product Id is required"),
    totalPrice: z
      .number()
      .min(0, "Total price must be greater than or equal to 0"),
    status: z
      .enum(["Pending", "Paid", "Shipped", "Completed", "Cancelled"])
      .optional(),
    paymentStatus: z.enum(["Pending", "Paid", "Failed"]).optional(),
  }),
});

export const orderValidation = {
  createOrderValidationSchema,
};
