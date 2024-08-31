import { Schema, model } from "mongoose";
import { TEmployee } from "./employee.interface";

const employeeSchema = new Schema<TEmployee>({
  name: { type: String, required: [true, "Name is required"] },
  designation: { type: String, required: [true, "Designation is required"] },
  image: { type: String, required: [true, "Image is required"] },
  phone: { type: String, required: [true, "Phone is required"] },
  facebookURL: { type: String },
  linkedinURL: { type: String },
  instrURL: { type: String },
});

export const Employee = model<TEmployee>("employee", employeeSchema);
