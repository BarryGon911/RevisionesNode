import mongoose from "mongoose";

const autorSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  nacionalidad: { type: String, required: true },
  fechaNacimiento: { type: Date }
}, { timestamps: true });

const Autor = mongoose.model("Autor", autorSchema);

export default Autor;