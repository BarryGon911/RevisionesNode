import express from "express";
import { obtenerLibros, obtenerLibroPorId, crearLibro, actualizarLibro, eliminarLibro } from "#controllers/librosController.js";

const router = express.Router();

router.get("/", obtenerLibros);
router.get("/:id", obtenerLibroPorId);
router.post("/", crearLibro);
router.put("/:id", actualizarLibro);
router.delete("/:id", eliminarLibro);

export default router;