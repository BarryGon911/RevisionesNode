import mongoose from "mongoose";

const resenaSchema = new mongoose.Schema(
  {
    comentario: { type: String, required: true, trim: true },
    puntuacion: { type: Number, required: true, min: 1, max: 5 },
    fecha: { type: Date, default: Date.now },
    libroId: { type: mongoose.Schema.Types.ObjectId, ref: "Libro", required: true },
    usuarioId: { type: mongoose.Schema.Types.ObjectId, ref: "Usuario" },
  },
  { timestamps: true, versionKey: false }
);

// Índice para consultar reseñas de un libro por fecha (desc)
resenaSchema.index({ libroId: 1, fecha: -1 });

// Unified JSON/Object transforms: expose "id", hide "_id"
resenaSchema.set("toJSON", {
  virtuals: true,
  transform: (doc, ret) => {
    if (ret._id) { ret.id = ret._id.toString(); delete ret._id; }
    return ret;
  },
});
resenaSchema.set("toObject", {
  virtuals: true,
  transform: (doc, ret) => {
    if (ret._id) { ret.id = ret._id.toString(); delete ret._id; }
    return ret;
  },
});

export default mongoose.model("Resena", resenaSchema);