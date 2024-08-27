import bcrypt from "bcrypt";
import { Schema, model } from "mongoose";
import config from "../../config";
import { TUser } from "./user.interface";

const UserSchema = new Schema<TUser>(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
      trim: true,
    },
    role: {
      type: String,
      enum: ["super-admin", "admin", "user"],
      default: "user",
    },
    address: {
      type: String,
      required: [true, "Address is required"],
      trim: true,
    },
    photo: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

UserSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(
    this.password,
    Number(config.bcrypt_salt_rounds)
  );
  next();
});

/// post save middleware
UserSchema.post("save", function (doc, next) {
  doc.password = "";
  next();
});

export const User = model<TUser>("User", UserSchema);
