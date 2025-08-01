import express from "express";
import {
  obtenerLibros,
  obtenerLibroPorId,
  crearLibro,
  actualizarLibro,
  eliminarLibro,
} from "../controllers/librosController.js";

const router = express.Router();

router.get("/libros", obtenerLibros);
router.get("/libros/:id", obtenerLibroPorId);
router.post("/libros", crearLibro);
router.put("/libros/:id", actualizarLibro);
router.delete("/libros/:id", eliminarLibro);

export default router;