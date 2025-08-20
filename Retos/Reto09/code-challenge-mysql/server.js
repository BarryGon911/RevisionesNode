import express from "express";
import librosRoutes from "./src/routes/index.js";
import connectDB from "./src/config/database.js";
import colors from "colors";
import dotenv from "dotenv";
import "dotenv/config";
dotenv.config();

const app = express();
app.use(express.json());
app.use("/", librosRoutes);

const port = process.env.SRV_PORT || 3000;

(async () => {
  try {
    await connectDB();
    console.log(colors.bgBlue.cyan.italic.bold("🟢 Conexión a la BD exitosa"));
  } catch (error) {
    console.error(colors.bgRed.white.bold("🔴 La Conexión a la BD ha fallado:"), colors.red(error instanceof Error ? error.message : String(error)));
    process.exit(1);
  }
})();

app.listen(port, () => {
  // console.log(colors.bgMagenta.magenta.italic.bold(`🚀 Servidor ejecutándose en http://localhost:${port}`));
  console.log(colors.bgMagenta.magenta.italic.bold(`🟢 NodeJS Server running on http://localhost:${port}`));
});