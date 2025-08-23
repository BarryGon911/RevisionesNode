import express from "express";
import rutas from "#routes/index.js";
import errorHandler from "#middlewares/errorHandler.js";
import { normalizarAnio } from "#middlewares/normalizarAnio.js";
import connectDB from "#config/database.js";
import { printRoutes } from "#utils/routes-debug.js";

import dotenv from "dotenv";

dotenv.config();

const port = process.env.SRV_PORT || process.env.PORT || 3000;
// Prefijo opcional; "/" por defecto (raíz). Cambia en .env si quieres "/api" o "/api/v1"
const BASE_PATH = process.env.BASE_PATH || "/";

try {
  await connectDB();
  console.log("MongoDB connection is OK");

  const app = express();

  // Middlewares globales
  app.use(express.json());
  app.use(normalizarAnio);

  // Rutas montadas bajo el prefijo configurado
  app.use(BASE_PATH, rutas);

  // Manejo de errores (siempre al final)
  app.use(errorHandler);

  // Arranque del servidor + impresión de rutas
  app.listen(port, () => {
    const baseShown = BASE_PATH === "/" ? "" : BASE_PATH;
    const trailingSlash = baseShown && !baseShown.endsWith("/") ? "/" : "";
    console.log(`Base URL: http://localhost:${port}${baseShown}${trailingSlash}`);

    // Listado de rutas (no bloquea si falla)
    import("./src/utils/routes-debug.js")
      .then(({ printRoutes }) => {
        printRoutes({
          app,
          router: rutas,                // Fallback directo al router montado
          basePath: baseShown
        });
      })
      .catch((err) => {
        console.warn("No pude imprimir rutas:", err?.message || err);
      });
  });
} catch (error) {
  console.error("MongoDB connection failed:", error?.stack || error);
  process.exit(1);
}

// import rutas from "#routes/index.js";
// import errorHandler from "#middlewares/errorHandler.js";
// import connectDB from "#config/database.js";
// import { normalizarAnio } from "#middlewares/normalizarAnio.js";
// import { printRoutes } from "#utils/routes-debug.js";
// import express from "express";

// import dotenv from "dotenv";
// dotenv.config();

// const port = process.env.SRV_PORT || 3000;

// try {
//   await connectDB();
//   console.log("MongoDB connection is OK");

//   const app = express();

//   app.use(express.json());
//   app.use(normalizarAnio);

//   app.use("/", rutas);

//   app.use(errorHandler);

//   app.listen(port, () => {
//     // console.log(`NodeJS Server running on http://localhost:${port}`);
//     console.log(`Base URL: http://localhost:${port}${process.env.BASE_PATH || "/"}`);
//     printRoutes(app);
//   });
// }
// catch (error) {
//   console.error("MongoDB connection failed ?"), error?.stack || error;
//   process.exit(1);
// }