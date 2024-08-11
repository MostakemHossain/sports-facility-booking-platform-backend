import { z } from "zod";

export const createUserValidationSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: "Name is required",
    }),
    email: z
      .string({
        required_error: "Email is required",
      })
      .email({ message: "Invalid email address" }),
    password: z
      .string({
        required_error: "Password is required",
      })
      .min(6, { message: "Password must be at least 6 characters long" }),
    phone: z.string({
      required_error: "Phone number is required",
    }),
    role: z.enum(["admin", "user"], {
      required_error: "Role is required",
    }),
    address: z.string({
      required_error: "Address is required",
    }),
  }),
});
export const loginUserValidationSchema = z.object({
  body: z.object({
    email: z
      .string({
        required_error: "Email is required",
      })
      .email({ message: "Invalid email address" }),
    password: z.string({
      required_error: "Password is required",
    }),
  }),
});

export const userValidation = {
  createUserValidationSchema,
  loginUserValidationSchema,
};
