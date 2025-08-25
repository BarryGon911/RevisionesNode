import { Router } from "express";
import authRoutes from "#routes/authRoutes.js";
import productRoutes from "#routes/productRoutes.js";
import categoryRoutes from "#routes/categoryRoutes.js";
import userRoutes from "#routes/userRoutes.js";
import cartRoutes from "#routes/cartRoutes.js";
import orderRoutes from "#routes/orderRoutes.js";

const router = Router();
router.use("/auth", authRoutes);
router.use("/products", productRoutes);
router.use("/categories", categoryRoutes);
router.use("/users", userRoutes);
router.use("/cart", cartRoutes);
router.use("/orders", orderRoutes);

export default router;