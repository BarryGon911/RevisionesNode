import rutas from "#routes/index.js";
import errorHandler from "#middlewares/errorHandler.js";
import connectDB from "#config/database.js";
import { normalizarAnio } from "#middlewares/normalizarAnio.js";
import { printRoutes } from "#utils/routes-debug.js";
import express from "express";

import dotenv from "dotenv";
dotenv.config();

const port = process.env.SRV_PORT || 3000;

try {
  await connectDB();
  console.log("MongoDB connection is OK");

  const app = express();

  app.use(express.json());
  app.use(normalizarAnio);

  app.use("/", rutas);

  app.use(errorHandler);

  app.listen(port, () => {
    // console.log(`NodeJS Server running on http://localhost:${port}`);
    console.log(`Base URL: http://localhost:${port}${process.env.BASE_PATH || "/"}`);
    printRoutes(app);
  });
}
catch (error) {
  console.error("MongoDB connection failed ?"), error?.stack || error;
  process.exit(1);
}