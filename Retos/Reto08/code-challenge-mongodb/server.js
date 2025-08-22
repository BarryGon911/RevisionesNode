// import "module-alias/register";
import rutas from "#routes/index.js";
import errorHandler from "#middlewares/errorHandler.js";
import connectDB from "#config/database.js";
import { normalizarAnio } from "#middlewares/normalizarAnio.js";
import colors from "colors";
import express from "express";

import dotenv from "dotenv";
dotenv.config();

// --- Versión con top-level await (Node 22 + ESM) ---
const port = process.env.SRV_PORT || 3000;

try {
  await connectDB();
  console.log(colors.bgGrey.black.bold("MongoDB connection is OK"));

  const app = express();
  // Middlewares base
  app.use(express.json());
  app.use(normalizarAnio);
  // Rutas
  app.use("/", rutas);
  // Manejo de errores global
  app.use(errorHandler);
  // Escuchar servidor
  app.listen(port, () => {
    console.log(colors.bgMagenta.italic.bold(`NodeJS Server running on http://localhost:${port}`));
  });
}
catch (err) {
  console.error(colors.bgRed.white.bold("MongoDB connection failed →"), err?.message || err);
  process.exit(1);
}

// import "module-alias/register.js";
// import rutas from "@routes/index.js";
// import errorHandler from "@middlewares/errorHandler.js";
// import connectDB from "@config/database.js";
// import { normalizarAnio } from "@middlewares/normalizarAnio.js";
// import colors from "colors";
// import express from "express";

// import dotenv from "dotenv";
// dotenv.config();

// const app = express();

// app.use(express.json());
// app.use(normalizarAnio);
// app.use("/", rutas);

// Manejo de errores global
// app.use(errorHandler);

// const port = process.env.SRV_PORT || 3000;

// // Verficación de Conexión a MongoDB
// (async () => {
//   try {
//     await connectDB();
//     console.log(colors.bgGrey.black.bold("MongoDB connection is OK"));
//   }
//   catch (error) {
//     console.error(colors.bgRed.white.bold("MongoDB connection failed", `→ ${error instanceof Error ? error.message : String(error)}`));
//     process.exit(1);
//   }
// })();

// // Escuchando al Server de NodeJS
// app.listen(port, () => {
// console.log(colors.bgMagenta.magenta.italic.bold(`NodeJS Server running on http://localhost:${port}`));
// });

// const port = process.env.SRV_PORT || 3000;

// try {
//   await connectDB();
//   console.log(colors.bgGrey.black.bold("MongoDB connection is OK"));

//   const app = express();
//   app.use(express.json());
//   app.use(normalizarAnio);
//   app.use(rutas);
//   app.use(errorHandler);

//   app.listen(port, () => {
//     console.log(colors.bgMagenta.italic.bold(`NodeJS Server running on http://localhost:${port}`));
//   });
// }
// catch (err) {
//   console.error(colors.bgRed.white.bold("MongoDB connection failed →"), err?.message || err);
//   process.exit(1);
// }