import express from "express";
import morgan from "morgan";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";

// Rutas principales de tu API (alias configurado como #routes)
import routes from "#routes";

// Rutas para el visor de reportes (API/runner + estáticos)
import testReportsRouter from "./routes/testReports.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

/**
 * Swagger UI
 * Toma el OpenAPI desde docs/openapi.yaml
 */
const swaggerDocument = YAML.load(path.join(__dirname, "../docs/openapi.yaml"));
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

/**
 * Test Reports UI + archivos generados por Newman
 * - UI estática del dashboard:  /api/test-reports/ui/
 * - Archivos de reportes:       /api/test-reports/reports/...
 * - API para leer JSON/MD y ejecutar tests: /api/test-reports/*
 *
 * Nota: los reportes se escriben en la carpeta /reports a nivel de proyecto.
 */
app.use(
  "/api/test-reports/ui",
  express.static(path.join(__dirname, "..", "docs", "test-dashboard"))
);
app.use(
  "/api/test-reports/reports",
  express.static(path.join(__dirname, "..", "reports"))
);
app.use("/api/test-reports", testReportsRouter);

/**
 * Rutas de la API
 */
app.use("/api", routes);

/**
 * 404
 */
app.use((req, res, next) => {
  res.status(404).json({ error: "Not Found" });
});

/**
 * Manejador de errores
 */
app.use((err, req, res, next) => {
  console.error(err);
  const status = err.status || 500;
  res.status(status).json({ error: err.message || "Internal Server Error" });
});


// import express from "express";
// import morgan from "morgan";
// import cors from "cors";
// import path from "path";
// import { fileURLToPath } from "url";
// import swaggerUi from "swagger-ui-express";
// import YAML from "yamljs";
// import routes from "#routes";
// import path from 'path';
// import testReportsRouter from './routes/testReports.js';

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// export const app = express();

// app.use(cors());
// app.use(express.json());
// app.use(morgan("dev"));

// // Docs
// const swaggerDocument = YAML.load(path.join(__dirname, "../docs/openapi.yaml"));
// app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// // API routes
// app.use("/api", routes);

// // 404
// app.use((req, res, next) => {
//   res.status(404).json({ error: "Not Found" });
// });

// // Error handler
// app.use((err, req, res, next) => {
//   console.error(err);
//   const status = err.status || 500;
//   res.status(status).json({ error: err.message || "Internal Server Error" });
// });