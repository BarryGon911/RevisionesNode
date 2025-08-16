import express from "express";
import librosRoutes from "./librosRoutes.js";

const router = express.Router();

// Montar rutas de libros en /libros
router.use("/libros", librosRoutes);

export default router;