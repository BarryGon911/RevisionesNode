import express from "express";
import librosRoutes from "#routes/librosRoutes.js";
import usuariosRoutes from "#routes/usuariosRoutes.js";
import autoresRoutes from "#routes/autoresRoutes.js";
import resenasRoutes from "#routes/resenasRoutes.js";
import adminRoutes from "#routes/adminRoutes.js"; // <-- IMPORT NECESARIO

const router = express.Router();

librosRoutes._mountpath = "/libros";
autoresRoutes._mountpath = "/autores";
resenasRoutes._mountpath = "/resenas";
usuariosRoutes._mountpath = "/usuarios";
adminRoutes._mountpath = "/admin";

router.use("/libros", librosRoutes);
router.use("/autores", autoresRoutes);
router.use("/resenas", resenasRoutes);
router.use("/usuarios", usuariosRoutes);
router.use("/admin", adminRoutes);

export default router;