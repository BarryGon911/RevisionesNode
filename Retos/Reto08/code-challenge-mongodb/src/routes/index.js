import express from "express";
import librosRoutes from "#routes/librosRoutes.js";
import usuariosRoutes from "#routes/usuariosRoutes.js";
import autoresRoutes from "#routes/autoresRoutes.js";
import resenasRoutes from "#routes/resenasRoutes.js";

const router = express.Router();

router.use("/libros", librosRoutes);
router.use("/autores", autoresRoutes);
router.use("/resenas", resenasRoutes);
router.use("/usuarios", usuariosRoutes);

export default router;