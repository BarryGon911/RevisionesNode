import express from "express";
import {
  crearAutor,
  obtenerAutores,
  obtenerAutorPorId,
  actualizarAutor,
  eliminarAutor,
} from "../controllers/autoresController.js";

const router = express.Router();

router.get("/autores", obtenerAutores);
router.get("/autores/:id", obtenerAutorPorId);
router.post("/autores", crearAutor);
router.put("/autores/:id", actualizarAutor);
router.delete("/autores/:id", eliminarAutor);

export default router;