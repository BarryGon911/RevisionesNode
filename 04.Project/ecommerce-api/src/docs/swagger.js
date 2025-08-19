import swaggerUi from 'swagger-ui-express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function setupSwagger(app) {
  const specPath = path.join(__dirname, 'openapi.json');
  const spec = JSON.parse(fs.readFileSync(specPath, 'utf-8'));
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(spec, { explorer: true }));
  app.get('/openapi.json', (req, res) => res.json(spec));
}