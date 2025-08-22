import mongoose from "mongoose";

const libroSchema = new mongoose.Schema(
  {
    titulo: { type: String, required: true, unique: true, trim: true },
    anio: { type: Number, required: true, min: 0 },
    genero: { type: String, required: true, trim: true },
    fechaPublicacion: { type: Date },
    autorId: { type: mongoose.Schema.Types.ObjectId, ref: "Autor", required: true },
  },
  { timestamps: true, versionKey: false }
);

libroSchema.index({ titulo: 1 }, { unique: true });

// Compound indexes
libroSchema.index({ genero: 1, anio: -1 });
libroSchema.index({ autorId: 1, anio: -1 });

// Virtual: reseñas del libro
libroSchema.virtual("resenas", {
  ref: "Resena",
  localField: "_id",
  foreignField: "libroId",
  justOne: false,
});

// Unified JSON/Object transforms: expose "id", hide "_id", and show "año" alias instead of "anio"
libroSchema.set("toJSON", {
  virtuals: true,
  transform: (doc, ret) => {
    if (ret._id) { ret.id = ret._id.toString(); delete ret._id; }
    if (ret.anio != null) { ret["año"] = ret.anio; delete ret.anio; }
    return ret;
  },
});
libroSchema.set("toObject", {
  virtuals: true,
  transform: (doc, ret) => {
    if (ret._id) { ret.id = ret._id.toString(); delete ret._id; }
    if (ret.anio != null) { ret["año"] = ret.anio; delete ret.anio; }
    return ret;
  },
});

// Helper estático: trae un libro con su autor y reseñas (ordenadas nuevas->viejas)
libroSchema.statics.findWithAutorAndResenas = function (id) {
  return this.findById(id)
    .populate({ path: "autorId", select: "nombre nacionalidad fechaNacimiento" })
    .populate({
      path: "resenas",
      options: { sort: { fecha: -1 } },
      populate: { path: "usuarioId", select: "nombre email" },
    });
};

export default mongoose.model("Libro", libroSchema);
