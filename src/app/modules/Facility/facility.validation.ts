import { z } from "zod";

export const createFacilityValidationSchema = z.object({
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

export const facilityValidation = {
  createFacility: createFacilityValidationSchema,
};
