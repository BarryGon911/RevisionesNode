import mongoose from "mongoose";

const autorSchema = new mongoose.Schema(
  {
    nombre: { type: String, required: true, trim: true },
    nacionalidad: { type: String, required: true, trim: true },
    fechaNacimiento: { type: Date },
  },
  { timestamps: true, versionKey: false }
);

// Virtual: libros escritos por el autor
autorSchema.virtual("libros", {
  ref: "Libro",
  localField: "_id",
  foreignField: "autorId",
  justOne: false,
});

export default mongoose.model("Autor", autorSchema);