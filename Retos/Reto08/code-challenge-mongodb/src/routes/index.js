import librosRoutes from "./librosRoutes.js";
import usuariosRoutes from "./usuariosRoutes.js";
import autoresRoutes from "./autoresRoutes.js";
import resenasRoutes from "./resenasRoutes.js";

import express from "express";
const router = express.Router();

// Montar rutas de libros en /libros
router.use("/libros", librosRoutes);
router.use("/autores", autoresRoutes);
router.use("/resenas", resenasRoutes);
router.use("/usuarios", usuariosRoutes);
router.use("/autores", autoresRoutes);
router.use("/resenas", resenasRoutes);

export default router;