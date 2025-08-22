import express from "express";
import autoresRoutes from "../routes/autoresRoutes.js";
import librosRoutes from "../routes/librosRoutes";
import resenasRoutes from "./resenasRoutes.js";

const router = express.Router();

router.use("/", autoresRoutes);
router.use("/", librosRoutes);
router.use("/", resenasRoutes);

export default router;