import express from "express";
import registroRoutes from "./routes/registro.js";

const app = express();
const PORT = process.env.PORT || 3000;

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

app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
});
