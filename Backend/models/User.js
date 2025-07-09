import mongoose from "mongoose";

// User Schema
const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: "user" },
  },
  {
    timestamps: true, // ✅ Adds createdAt and updatedAt fields
  }
);

const User = mongoose.model("User", userSchema);

export default User;
