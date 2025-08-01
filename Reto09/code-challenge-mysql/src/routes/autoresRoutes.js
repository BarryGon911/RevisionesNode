import express from "express";
import { crearAutor } from "../controllers/autoresController.js";

const router = express.Router();

router.post("/autores", crearAutor);

export default router;