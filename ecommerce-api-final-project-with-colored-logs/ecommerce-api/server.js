import express from 'express';
import dotenv from 'dotenv';
import routes from './src/routes/index.js';
import dbConnection from './src/config/database.js';
import logger from './src/middlewares/logger.js';
import setupGlobalErrorHandlers from './src/middlewares/globalErrorHandler.js';
import errorHandler from './src/middlewares/errorHandler.js';

dotenv.config();
setupGlobalErrorHandlers();

const app = express();
app.use(express.json());
app.use(logger);

// connect DB
await dbConnection();

app.get('/health', (req, res) => res.json({ status: 'ok' }));

app.use('/api', routes);

app.use((req, res) => {
  res.status(404).json({
    error: 'Route not found',
    method: req.method,
    url: req.originalUrl,
  });
});

app.use(errorHandler);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});