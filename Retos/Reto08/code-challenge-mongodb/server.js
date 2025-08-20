import express from "express";
import rutas from "./src/routes/index.js";
import connectDB from "./src/config/database.js";
import colors from "colors";
import dotenv from "dotenv";
import "dotenv/config";
dotenv.config();

const app = express();
app.use(express.json());

app.use("/", rutas);

const port = process.env.SRV_PORT || 3000;

// Método de Rodrigo
// connectDB().then(() => {
//   app.listen(port, () => {
//     console.log(`Servidor escuchando en puerto ${port}`);
//   });
// }).catch(err => {
//   console.error("Fallo al conectar la DB:", err);
//   process.exit(1);
// });

(async () => {
  try {
    await connectDB();
    console.log("Conexión a la BD exitosa");
  } catch (error) {
    console.error("La Conexión a la BD ha fallado:", error instanceof Error ? error.message : String(error));
    process.exit(1);
  }
})();

app.listen(port, () => {
  // console.log(colors.bgMagenta.magenta.italic.bold(`🚀 Servidor ejecutándose en http://localhost:${port}`));
  console.log(colors.bgMagenta.magenta.italic.bold(`🟢 NodeJS Server running on http://localhost:${port}`));
});