import express from "express";
import librosRoutes from "./src/routes/librosRoutes.js";
import connectDB from "./src/config/database.js";

import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(express.json());
app.use("/", librosRoutes);

const port = process.env.SRV_PORT || 3000;

(async () => {
  try {
    await connectDB();
    console.log("Conexión OK a MySQL");
  } catch (error) {
    console.error("My SQL DB connection failed:"), colors.red(error instanceof Error ? error.message : String(error));
    process.exit(1);
  }
})();

app.listen(port, () => {
  console.log(`Servidor ejecutándose en http://localhost:${port}`);
});