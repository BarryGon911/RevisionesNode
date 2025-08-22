import mongoose from "mongoose";

const resenaSchema = new mongoose.Schema(
  {
    comentario: { type: String, required: true, trim: true },
    puntuacion: { type: Number, required: true, min: 1, max: 5 },
    fecha: { type: Date, default: Date.now },
    libroId: { type: mongoose.Schema.Types.ObjectId, ref: "Libro", required: true },
    // Extra (SQL): asociar opcionalmente a un usuario que hizo la reseña
    usuarioId: { type: mongoose.Schema.Types.ObjectId, ref: "Usuario" },
  },
  { timestamps: true, versionKey: false }
);

export default mongoose.model("Resena", resenaSchema);