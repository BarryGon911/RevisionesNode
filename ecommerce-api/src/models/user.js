import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  displayName: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true, select: false },
  role: { type: String, enum: ["admin","customer"], default: "customer" },
}, { timestamps: true });

const User = mongoose.model("User", userSchema);

export default User;