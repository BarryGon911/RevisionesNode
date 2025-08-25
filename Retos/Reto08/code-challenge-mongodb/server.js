import express from "express";
import rutas from "#routes/index.js";
import errorHandler from "#middlewares/errorHandler.js";
import { normalizarAnio } from "#middlewares/normalizarAnio.js";
import connectDB from "#config/database.js";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import dotenv from "dotenv";
dotenv.config();

const port = process.env.SRV_PORT || process.env.PORT || 3000;

function normalizeBasePath(p) {
  let s = (p || "/").trim();
  if (!s.startsWith("/")) s = "/" + s;
  s = s.replace(/\/{2,}/g, "/");
  if (s.length > 1 && s.endsWith("/")) s = s.slice(0, -1);
  return s || "/";
}

const BASE_PATH = normalizeBasePath(process.env.BASE_PATH || "/");

// ---- Helpers para /version sin JSON modules ----
function readPkgMetaFallback() {
  try {
    const __dirname = path.dirname(fileURLToPath(import.meta.url));
    const pkgPath = path.join(__dirname, "package.json");
    const raw = fs.readFileSync(pkgPath, "utf-8");
    const pkg = JSON.parse(raw);
    return { name: pkg.name || "app", version: pkg.version || "1.0.0" };
  }
  catch {
    return { name: "app", version: "1.0.0" };
  }
}

const PKG_META = {
  name: process.env.npm_package_name || readPkgMetaFallback().name,
  version: process.env.npm_package_version || readPkgMetaFallback().version,
};
try {
  await connectDB();
  console.log("MongoDB connection is OK");

  const app = express();
  app.use(express.json());
  app.use(normalizarAnio);

  const base = BASE_PATH === "/" ? "" : BASE_PATH;

  // Health y Version (antes de montar rutas)
  app.get(`${base}/health`, (req, res) => {
    res.status(200).json({
      ok: true,
      uptimeSec: Math.round(process.uptime()),
      timestamp: new Date().toISOString(),
      env: process.env.NODE_ENV || "development",
    });
  });

  app.get(`${base}/version`, (req, res) => {
    res.json(PKG_META);
  });
  app.get(`${base}/`, (req, res) => {
    res.json({
      ok: true,
      message: "API Biblioteca operativa",
      basePath: BASE_PATH,
      endpoints: [
        "/libros",
        "/autores",
        "/resenas",
        "/usuarios",
        "/health",
        "/version",
      ].map((p) => `${BASE_PATH}${p}`),
      timestamp: new Date().toISOString(),
    });
  });
  
  app.use(BASE_PATH, rutas);
  app.use(errorHandler);

  app.listen(port, () => {
    console.log(`Base URL: http://localhost:${port}${BASE_PATH === "/" ? "/" : BASE_PATH + "/"}`);
    import("./src/utils/routes-debug.js")
      .then(({ printRoutes }) => {
        printRoutes({
          app,
          router: rutas,
          basePath: BASE_PATH,
        });
      }).catch((err) => {
        console.warn("No pude imprimir rutas:", err?.message || err);
      });
  });
} catch (error) {
  console.error("MongoDB connection failed:", error?.stack || error);
  process.exit(1);
}