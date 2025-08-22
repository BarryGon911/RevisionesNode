import express from "express";
import {
  obtenerResenas,
  obtenerResenaPorId,
  crearResena,
  actualizarResena,
  eliminarResena,
} from "../controllers/resenasController.js";

const router = express.Router();

router.get("/resenas", obtenerResenas);
router.get("/resenas/:id", obtenerResenaPorId);
router.post("/resenas", crearResena);
router.put("/resenas/:id", actualizarResena);
router.delete("/resenas/:id", eliminarResena);

export default router;