import express from 'express';
import routes from './routes/index.js';
import { setupSwagger } from './docs/swagger.js';

const app = express();

app.use(express.json());
app.get('/', (req, res) => res.json({ ok: true, message: 'E-commerce API (Express)' }));

setupSwagger(app);

app.use('/api', routes);

// Manejo del código 404
app.use((req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});

// Manejo simple de errores
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Error interno del servidor' });
});

export default app;