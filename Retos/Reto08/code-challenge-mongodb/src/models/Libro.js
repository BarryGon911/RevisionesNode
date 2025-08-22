import mongoose from "mongoose";

const libroSchema = new mongoose.Schema(
  {
    titulo: { type: String, required: true, unique: true, trim: true },
    anio: { type: Number, required: true, min: 0 },
    genero: { type: String, required: true, trim: true },
    autorId: { type: mongoose.Schema.Types.ObjectId, ref: "Autor", required: true },
  },
  { timestamps: true, versionKey: false }
);

libroSchema.index({ titulo: 1 }, { unique: true });

// Virtual: reseñas del libro
libroSchema.virtual("resenas", {
  ref: "Resena",
  localField: "_id",
  foreignField: "libroId",
  justOne: false,
});

export default mongoose.model("Libro", libroSchema);