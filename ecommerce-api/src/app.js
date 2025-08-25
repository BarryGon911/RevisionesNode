import express from "express";
import morgan from "morgan";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";

import routes from "#routes";
import testReportsRouter from "./routes/testReports.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Swagger UI (openapi.yaml ya con servers: /api)
const swaggerDocument = YAML.load(path.join(__dirname, "../docs/openapi.yaml"));
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// UI estática del dashboard (docs/test-dashboard) — SIN CACHÉ
app.use(
  "/api/test-reports/ui",
  express.static(path.join(__dirname, "..", "docs", "test-dashboard"), {
    etag: false,
    lastModified: false,
    cacheControl: false,
    maxAge: 0,
    setHeaders: (res) => res.set("Cache-Control", "no-store")
  })
);

// Archivos de reportes (reports/) — SIN CACHÉ
app.use(
  "/api/test-reports/reports",
  express.static(path.join(__dirname, "..", "reports"), {
    etag: false,
    lastModified: false,
    cacheControl: false,
    maxAge: 0,
    setHeaders: (res) => res.set("Cache-Control", "no-store")
  })
);

// Endpoints utilitarios del runner: /api/test-reports/report, /run, etc.
app.use("/api/test-reports", testReportsRouter);

// Rutas de la API real
app.use("/api", routes);

// 404
app.use((req, res) => {
  res.status(404).json({ error: "Not Found" });
});

// Error handler
app.use((err, _req, res, _next) => {
  console.error(err);
  const status = err.status || 500;
  res.status(status).json({ error: err.message || "Internal Server Error" });
});