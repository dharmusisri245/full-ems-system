import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },

    email: { type: String, required: true, unique: true },

    password: { type: String, required: true },

    avatar: {
      url: String,
      public_id: String,
    },

    otp: String,

    otpExpire: Date,
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
