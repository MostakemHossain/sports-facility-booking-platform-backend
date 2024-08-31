import { z } from "zod";
const createEmployee = z.object({
  name: z.string({
    required_error: "Name is required",
  }),
  designation: z.string({
    required_error: "Designation is required",
  }),
  phone: z.string({
    required_error: "Phone is required",
  }),
});

export const employeeValidation = {
  createEmployee,
};
