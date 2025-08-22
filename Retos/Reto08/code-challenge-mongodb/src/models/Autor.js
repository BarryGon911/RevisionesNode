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

// Unified JSON/Object transforms: expose "id", hide "_id"
autorSchema.set("toJSON", {
  virtuals: true,
  transform: (doc, ret) => {
    if (ret._id) { ret.id = ret._id.toString(); delete ret._id; }
    return ret;
  },
});
autorSchema.set("toObject", {
  virtuals: true,
  transform: (doc, ret) => {
    if (ret._id) { ret.id = ret._id.toString(); delete ret._id; }
    return ret;
  },
});

export default mongoose.model("Autor", autorSchema);
