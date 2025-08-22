import Libro from "../models/Libro.js";
import Resena from "../models/Resena.js";
import Autor from "../models/Autor.js";

export const crearAutor = async (req, res) => {
  try {
    const { nombre, nacionalidad, fechaNacimiento } = req.body;

    const nuevoAutor = await Autor.create({
      nombre,
      nacionalidad,
      fechaNacimiento,
    });
    res.status(201).json(nuevoAutor);
  }
  catch (error) {
    res.status(500).json({ error: "Error al crear autor", detalle: error.message });
  }
};

export const obtenerAutores = async (req, res) => {
  try {
    const autores = await Autor.findAll({
      include: [
        { model: Libro, as: "libros" },
        { model: Resena, as: "resenas" },
      ],
    });
    res.json(autores);
  }
  catch (error) {
    res.status(500).json({ error: "Error al obtener autores", detalle: error.message });
  }
}

export const obtenerAutorPorId = async (req, res) => {
  try {
    const autor = await Autor.findByPk(req.params.id, {
      include: [
        { model: Libro, as: "libros" },
        { model: Resena, as: "resenas" },
      ],
    });
    if (!autor) return res.status(404).json({ error: "Autor no encontrado" });
    res.json(autor);
  }
  catch (error) {
    res.status(500).json({ error: "Error al obtener autor", detalle: error.message });
  }
}

export const actualizarAutor = async (req, res) => {
  try {
    const autor = await Autor.findByPk(req.params.id);
    if (!autor) return res.status(404).json({ error: "Autor no encontrado" });

    const { nombre, nacionalidad, fechaNacimiento } = req.body;
    await autor.update({ nombre, nacionalidad, fechaNacimiento });
    res.json(autor);
  }
  catch (error) {
    res.status(500).json({ error: "Error al actualizar autor", detalle: error.message });
  }
}

export const eliminarAutor = async (req, res) => {
  try {
    const autor = await Autor.findByPk(req.params.id);
    if (!autor) return res.status(404).json({ error: "Autor no encontrado" });

    await autor.destroy();
    res.json({ mensaje: "Autor eliminado" });
  }
  catch (error) {
    res.status(500).json({ error: "Error al eliminar autor", detalle: error.message });
  }
}

export default {
  crearAutor,
  obtenerAutores,
  obtenerAutorPorId,
  actualizarAutor,
  eliminarAutor,
};