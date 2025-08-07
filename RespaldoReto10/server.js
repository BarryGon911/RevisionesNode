import express from "express";
import registroRoutes from "./routes/registro.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = process.env.SRV_PORT || 3000;

app.use(express.json());
app.use("/api", registroRoutes);

// Middleware global de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    error: "Error interno del servidor",
  });
});

app.listen(port, () => {
  console.log(`🚀 Servidor de Node ejecutándose en el en puerto: ${port}`);
});