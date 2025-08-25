// import express from "express";
// import librosRoutes from "#routes/librosRoutes.js";
// import usuariosRoutes from "#routes/usuariosRoutes.js";
// import autoresRoutes from "#routes/autoresRoutes.js";
// import resenasRoutes from "#routes/resenasRoutes.js";

// const router = express.Router();

// router.use("/libros", librosRoutes);
// router.use("/autores", autoresRoutes);
// router.use("/resenas", resenasRoutes);
// router.use("/usuarios", usuariosRoutes);

// export default router;

import express from "express";
import librosRoutes from "#routes/librosRoutes.js";
import usuariosRoutes from "#routes/usuariosRoutes.js";
import autoresRoutes from "#routes/autoresRoutes.js";
import resenasRoutes from "#routes/resenasRoutes.js";

const router = express.Router();

// Metadatos para el debugger (NO afecta tus endpoints)
librosRoutes._mountpath = "/libros";
autoresRoutes._mountpath = "/autores";
resenasRoutes._mountpath = "/resenas";
usuariosRoutes._mountpath = "/usuarios";

// Montaje real de rutas
router.use("/libros", librosRoutes);
router.use("/autores", autoresRoutes);
router.use("/resenas", resenasRoutes);
router.use("/usuarios", usuariosRoutes);

export default router;