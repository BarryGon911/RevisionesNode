import express from 'express';
import calificacionesRoutes from './calificacionesRoutes.js';

const router = express.Router();
// Ruta principal que devuelve un mensaje de bienvenida

router.get('/', (req, res) => {
    res.json({
        message: 'Bienvenido a la API de Calificaciones',
        endpoints: [
        'GET / - Mensaje de bienvenida',
        'GET /calificaciones - Obtener todas las calificaciones'
        ]
    });
    });


