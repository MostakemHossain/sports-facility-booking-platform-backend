import { z } from "zod";

const createFacilityValidationSchema = z.object({
  body: z.object({
    name: z.string({ required_error: "Facility name is required" }),
    description: z.string({
      required_error: "Facility description is required",
    }),
    pricePerHour: z.number({
      required_error: "Price per hour is required",
      invalid_type_error: "Price per hour must be a number",
    }),
    location: z.string({ required_error: "Facility location is required" }),
  }),
});
export const updateFacilityValidationSchema = z.object({
  body: z
    .object({
      name: z
        .string({ required_error: "Facility name is required" })
        .optional(),
      description: z
        .string({
          required_error: "Facility description is required",
        })
        .optional(),
      pricePerHour: z
        .number({
          required_error: "Price per hour is required",
          invalid_type_error: "Price per hour must be a number",
        })
        .optional(),
      location: z.string().optional(),
    })
});

export const facilityValidation = {
  createFacilityValidationSchema,
  updateFacilityValidationSchema,
};
