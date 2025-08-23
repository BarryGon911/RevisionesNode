import express from "express";
import rutas from "#routes/index.js";
import errorHandler from "#middlewares/errorHandler.js";
import { normalizarAnio } from "#middlewares/normalizarAnio.js";
import connectDB from "#config/database.js";

import dotenv from "dotenv";
dotenv.config();

const port = process.env.SRV_PORT || 3000;
const BASE_PATH = process.env.BASE_PATH || "/"; // "/" por defecto

try {
  await connectDB();
  console.log("MongoDB connection is OK");

  const app = express();
  app.use(express.json());
  app.use(normalizarAnio);

  // Monta tus rutas
  app.use(BASE_PATH, rutas);

  // Manejo de errores
  app.use(errorHandler);

  // Arranca y lista rutas
  app.listen(port, () => {
    const baseShown = BASE_PATH === "/" ? "" : BASE_PATH;
    console.log(
      `Base URL: http://localhost:${port}${baseShown}${baseShown.endsWith("/") ? "" : "/"}`
    );

    // Carga perezosa del debugger y listado robusto (app o router)
    import("./src/utils/routes-debug.js")
      .then(({ printRoutes }) => {
        printRoutes({
          app,
          router: rutas,                 // <— fallback directo al router montado
          basePath: baseShown            // <— si usas prefijo, aparecerá
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















// import express from "express";
// import rutas from "#routes/index.js";
// import errorHandler from "#middlewares/errorHandler.js";
// import { normalizarAnio } from "#middlewares/normalizarAnio.js";
// import connectDB from "#config/database.js";

// import dotenv from "dotenv";
// dotenv.config();

// const port = process.env.SRV_PORT || 3000;
// const BASE_PATH = process.env.BASE_PATH || "/"; // "/" por defecto

// try {
//   await connectDB();
//   console.log("MongoDB connection is OK");

//   const app = express();
//   app.use(express.json());
//   app.use(normalizarAnio);

//   // Monta tus rutas
//   app.use(BASE_PATH, rutas);

//   // Manejo de errores
//   app.use(errorHandler);

//   // Arranca y lista rutas
//   app.listen(port, () => {
//     const baseShown = BASE_PATH === "/" ? "" : BASE_PATH;
//     console.log(
//       `Base URL: http://localhost:${port}${baseShown}${baseShown.endsWith("/") ? "" : "/"}`
//     );
//     import("./src/utils/routes-debug.js")
//       .then(({ printRoutes }) => {
//         printRoutes(app, { basePath: baseShown });
//       })
//       .catch((err) => {
//         console.warn("No pude imprimir rutas:", err?.message || err);
//       });
//   });
// } catch (error) {
//   console.error("MongoDB connection failed:", error?.stack || error);
//   process.exit(1);
// }