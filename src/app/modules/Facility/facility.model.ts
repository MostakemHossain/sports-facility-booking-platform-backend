import mongoose, { Schema } from "mongoose";
import { TFacility } from "./facility.interface";

const FacilitySchema = new Schema<TFacility>({
  name: {
    type: String,
    required: [true, "Facility name is required"],
  },
  description: {
    type: String,
    required: [true, "Facility description is required"],
  },
  pricePerHour: {
    type: Number,
    required: [true, "Price per hour is required"],
  },
  location: {
    type: String,
    required: [true, "Facility location is required"],
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

export const Facility = mongoose.model<TFacility>("Facility", FacilitySchema);
