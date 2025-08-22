import mongoose from "mongoose";
import Autor from "../models/Autor.js";
import Libro from "../models/Libro.js";

export const obtenerAutores = async (req, res) => {
  try {
    const autores = await Autor.find();
    res.json(autores);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error del servidor" });
  }
};

export const obtenerAutorPorId = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "ID inválido" });
    }
    const autor = await Autor.findById(id).populate({
      path: "libros",
      select: "titulo anio fechaPublicacion genero autorId",
    });
    if (!autor) return res.status(404).json({ error: "Autor no encontrado" });
    // Ajuste: para cada libro, aplicar transforms (año) al serializar con toObject()
    const obj = autor.toObject();
    if (Array.isArray(obj.libros)) {
      obj.libros = obj.libros.map(l => {
        const lo = l.toJSON ? l.toJSON() : l;
        return lo;
      });
    }
    res.json(obj);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error del servidor" });
  }
};

export const crearAutor = async (req, res) => {
  try {
    const { nombre, nacionalidad, fechaNacimiento } = req.body;
    if (!nombre || !nacionalidad) {
      return res.status(400).json({ error: "Faltan campos requeridos" });
    }
    const autor = await Autor.create({
      nombre,
      nacionalidad,
      fechaNacimiento: fechaNacimiento ? new Date(fechaNacimiento) : undefined,
    });
    res.status(201).json(autor);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error del servidor" });
  }
};

export const actualizarAutor = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "ID inválido" });
    }
    const updates = req.body;
    if (updates.fechaNacimiento) updates.fechaNacimiento = new Date(updates.fechaNacimiento);
    const autor = await Autor.findByIdAndUpdate(id, updates, { new: true, runValidators: true });
    if (!autor) return res.status(404).json({ error: "Autor no encontrado" });
    res.json(autor);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error del servidor" });
  }
};

export const eliminarAutor = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "ID inválido" });
    }
    const autor = await Autor.findByIdAndDelete(id);
    if (!autor) return res.status(404).json({ error: "Autor no encontrado" });
    res.json({ mensaje: "Autor eliminado" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error del servidor" });
  }
};
