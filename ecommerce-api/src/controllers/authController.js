import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.js";

const signToken = (user) => {
  return jwt.sign({ userId: user._id, displayName: user.displayName, role: user.role }, process.env.JWT_SECRET, { expiresIn: "2h" });
};

export const register = async (req, res, next) => {
  try {
    const { displayName, email, password, role } = req.body;
    const exists = await User.findOne({ email });
    if (exists) return res.status(409).json({ message: "Email already in use" });
    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ displayName, email, password: hashed, role: role || "customer" });
    const token = signToken(user);
    res.status(201).json({ token, user: { id: user._id, displayName: user.displayName, email: user.email, role: user.role } });
  } catch (err) { next(err); }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select("+password");
    if (!user) return res.status(401).json({ message: "Invalid credentials" });
    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(401).json({ message: "Invalid credentials" });
    const token = signToken(user);
    res.json({ token, user: { id: user._id, displayName: user.displayName, email: user.email, role: user.role } });
  } catch (err) { next(err); }
};
