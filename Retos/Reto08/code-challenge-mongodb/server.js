import "module-alias/register.js";
import rutas from "@routes/index.js";
import errorHandler from "@middlewares/errorHandler.js";
import connectDB from "@config/database.js";
import colors from "colors";
import { normalizarAnio } from "@middlewares/normalizarAnio.js";
import express from "express";

import dotenv from "dotenv";
dotenv.config();

const app = express();

app.use(express.json());
app.use(normalizarAnio);
app.use("/", rutas);

// Manejo de errores global
app.use(errorHandler);

const port = process.env.SRV_PORT || 3000;

// Verficación de Conexión a MongoDB
(async () => {
  try {
    await connectDB();
    console.log(colors.bgGrey.black.bold(("MongoBD connection is OK ")));
  }
  catch (error) {
    console.error(colors.bgRed.white.bold("MongoDB connection failed", `→ ${error instanceof Error ? error.message : String(error)}`));
    process.exit(1);
  }
})();

// Escuchando al Server
app.listen(port, () => {
  console.log(colors.bgMagenta.magenta.italic.bold(`NodeJS Server running on http://localhost:${port}`));
});