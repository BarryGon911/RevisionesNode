import express from "express";
import {
  obtenerResenas,
  crearResena
} from "../controllers/resenasController.js";

const router = express.Router();

router.get("/", obtenerResenas);
router.post("/", crearResena);

export default router;
