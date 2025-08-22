import mongoose from "mongoose";

const usuarioSchema = new mongoose.Schema(
  {
    nombre: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true },
  },
  { timestamps: true, versionKey: false }
);

usuarioSchema.index({ email: 1 }, { unique: true });

// Unified JSON/Object transforms: expose "id", hide "_id", and hide password
usuarioSchema.set("toJSON", {
  virtuals: true,
  transform: (doc, ret) => {
    if (ret._id) { ret.id = ret._id.toString(); delete ret._id; }
    if (ret.password) { delete ret.password; }
    return ret;
  },
});
usuarioSchema.set("toObject", {
  virtuals: true,
  transform: (doc, ret) => {
    if (ret._id) { ret.id = ret._id.toString(); delete ret._id; }
    if (ret.password) { delete ret.password; }
    return ret;
  },
});

export default mongoose.model("Usuario", usuarioSchema);
