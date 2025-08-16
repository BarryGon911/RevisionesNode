import express from "express";
import autoresRoutes from "./autoresRoutes.js";
import librosRoutes from "./librosRoutes.js";
import reseñasRoutes from "./reseñasRoutes.js";

const router = express.Router();

router.use("/", autoresRoutes);
router.use("/", librosRoutes);
router.use("/", reseñasRoutes);

export default router;