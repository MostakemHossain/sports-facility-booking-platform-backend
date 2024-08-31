import { Schema, model } from "mongoose";
import { TContact } from "./contact.interface";

const contactSchema = new Schema<TContact>(
  {
    name: { type: String, required: [true, "Name is required"] },
    email: { type: String, required: [true, "email is required"] },
    phone: { type: String, required: [true, "Phone number is required"] },
    message: { type: String, required: [true, "message is required"] },
  },
  {
    timestamps: true,
  }
);
export const Contact = model<TContact>("contact", contactSchema);
