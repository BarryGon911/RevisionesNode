import express from "express";
import { obtenerAutores, obtenerAutorPorId, crearAutor, actualizarAutor, eliminarAutor } from "#controllers/autoresController.js";

const router = express.Router();

router.get("/", obtenerAutores);
router.get("/:id", obtenerAutorPorId);
router.post("/", crearAutor);
router.put("/:id", actualizarAutor);
router.delete("/:id", eliminarAutor);

export default router;