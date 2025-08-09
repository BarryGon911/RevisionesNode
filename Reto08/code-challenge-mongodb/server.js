import express from "express";
import dotenv from "dotenv";
import rutas from "./src/routes/index.js";
import connectDB from "./src/config/database.js";

dotenv.config();

const app = express();
app.use(express.json());

app.use("/", rutas);

const port = process.env.SRV_PORT || 3000;

connectDB().then(() => {
  app.listen(port, () => {
    console.log(`Servidor escuchando en puerto ${port}`);
  });
}).catch(err => {
  console.error("Fallo al conectar la DB:", err);
  process.exit(1);
});