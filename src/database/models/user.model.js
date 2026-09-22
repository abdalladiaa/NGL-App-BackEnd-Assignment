import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "First name is required"],
      minlength: [
        3,
        "First name must be at least 3 characters. You entered {VALUE}",
      ],
      maxlength: [20, "First name cannot exceed 20 characters"],
      lowerCase: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: [true, "Last name is required"],
      minlength: [
        3,
        "Last name must be at least 3 characters. You entered {VALUE}",
      ],
      maxlength: [20, "Last name cannot exceed 20 characters"],
      lowerCase: true,
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    password: { type: String, required: true },
    gender: {
      type: String,
      enum: ["male", "female", "other"],
      default: "other",
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    virtuals: {
      fullName: {
        get() {
          return `${this.firstName} ${this.lastName}`;
        },
      },
    },
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

const User = mongoose.model("User", userSchema);

export default User;