import express from "express";
import librosRoutes from "./librosRoutes.js";
import autoresRoutes from "./autoresRoutes.js";

const router = express.Router();

router.use(librosRoutes);
router.use(autoresRoutes);

export default router;