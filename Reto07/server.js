import express from 'express';
import routes from './routes/index.js';

const app = express();
const PORT = 3000;

app.use(express.json());
app.use('/api', routes); // Define la ruta base para las rutas de la API

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
    
    });
