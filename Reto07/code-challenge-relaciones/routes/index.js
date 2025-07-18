import express from "express";
import calificacionesRoutes from "./calificacionesRoutes.js";

const routes = express.Router();

routes.get("/", (req, res) => {
    res.json({
        message: "Bienvenido a la API de Calificaciones",
        endpoints: [
        "GET / - Mensaje de bienvenida",
        "GET /calificaciones - Obtener todas las calificaciones"
        ]
    });
});

export default routes;
