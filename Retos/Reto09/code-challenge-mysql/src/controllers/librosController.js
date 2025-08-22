import { Libro, Autor, Resena } from "../models/index.js";

export const obtenerLibros = async (req, res) => {
  try {
    const libros = await Libro.findAll({
      include: { model: Autor, as: "autor" },
    });
    res.json(libros);
  }
  catch (error) {
    res.status(500).json({ error: "Error al obtener libros", detalle: error.message });
  }
};

export const obtenerLibroPorId = async (req, res) => {
  try {
    const libro = await Libro.findByPk(req.params.id, {
      include: [
        { model: Autor, as: "autor" },
        { model: Resena, as: "resenas" },
      ],
    });
    if (!libro) return res.status(404).json({ error: "Libro no encontrado" });
    res.json(libro);
  }
  catch (error) {
    res.status(500).json({ error: "Error al obtener libro", detalle: error.message });
  }
};

export const crearLibro = async (req, res) => {
  try {
    const libro = await Libro.create(req.body);
    res.status(201).json(libro);
  } catch (error) {
    res.status(400).json({ error: "Error al crear libro", detalle: error.message });
  }
};

export const actualizarLibro = async (req, res) => {
  try {
    const libro = await Libro.findByPk(req.params.id);
    if (!libro) return res.status(404).json({ error: "Libro no encontrado" });

    await libro.update(req.body);
    res.json(libro);
  }
  catch (error) {
    res.status(400).json({ error: "Error al actualizar libro", detalle: error.message });
  }
};

export const eliminarLibro = async (req, res) => {
  try {
    const libro = await Libro.findByPk(req.params.id);
    if (!libro) return res.status(404).json({ error: "Libro no encontrado" });

    await libro.destroy();
    res.json({ mensaje: "Libro eliminado" });
  }
  catch (error) {
    res.status(500).json({ error: "Error al eliminar libro", detalle: error.message });
  }
};

export default {
  obtenerLibros,
  obtenerLibroPorId,
  crearLibro,
  actualizarLibro,
  eliminarLibro
};