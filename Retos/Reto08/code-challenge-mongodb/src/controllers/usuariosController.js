import mongoose from "mongoose";
import Usuario from "#models/Usuario.js";

export const obtenerUsuarios = async (req, res, next) => {
  try {
    const usuarios = await Usuario.find();
    res.json(usuarios);
  } catch (error) { next(error); }
};

export const obtenerUsuarioPorId = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "ID inválido" });
    }
    const usuario = await Usuario.findById(id);
    if (!usuario) return res.status(404).json({ error: "Usuario no encontrado" });
    res.json(usuario);
  } catch (error) { next(error); }
};

export const crearUsuario = async (req, res, next) => {
  try {
    const { nombre, email, password } = req.body;
    if (!nombre || !email || !password) {
      return res.status(400).json({ error: "Faltan campos requeridos (nombre, email, password)" });
    }
    const existente = await Usuario.findOne({ email });
    if (existente) return res.status(409).json({ error: "Email ya registrado" });
    const usuario = await Usuario.create({ nombre, email, password });
    res.status(201).json(usuario);
  } catch (error) { next(error); }
};

export const actualizarUsuario = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "ID inválido" });
    }
    const updates = req.body;
    if (updates.email) {
      const existe = await Usuario.findOne({ email: updates.email, _id: { $ne: id } });
      if (existe) return res.status(409).json({ error: "Email ya registrado" });
    }
    const usuario = await Usuario.findByIdAndUpdate(id, updates, { new: true, runValidators: true });
    if (!usuario) return res.status(404).json({ error: "Usuario no encontrado" });
    res.json(usuario);
  } catch (error) { next(error); }
};

export const eliminarUsuario = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "ID inválido" });
    }
    const usuario = await Usuario.findByIdAndDelete(id);
    if (!usuario) return res.status(404).json({ error: "Usuario no encontrado" });
    res.json({ mensaje: "Usuario eliminado" });
  } catch (error) { next(error); }
};
