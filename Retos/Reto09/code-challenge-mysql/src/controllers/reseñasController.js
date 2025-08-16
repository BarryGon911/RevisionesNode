import { Resena, Libro } from "../models/index.js";

// Obtener todas las reseñas
export const obtenerResenas = async (req, res) => {
  try {
    const resenas = await Resena.findAll({
      include: { model: Libro, as: "libro" },
    });
    res.json(resenas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener una reseña por ID
export const obtenerResenaPorId = async (req, res) => {
  try {
    const resena = await Resena.findByPk(req.params.id, {
      include: { model: Libro, as: "libro" },
    });
    if (!resena) return res.status(404).json({ error: "Reseña no encontrada" });
    res.json(resena);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Crear una nueva reseña
export const crearResena = async (req, res) => {
  try {
    const nuevaResena = await Resena.create(req.body);
    res.status(201).json(nuevaResena);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Actualizar una reseña
export const actualizarResena = async (req, res) => {
  try {
    const resena = await Resena.findByPk(req.params.id);
    if (!resena) return res.status(404).json({ error: "Reseña no encontrada" });
    await resena.update(req.body);
    res.json(resena);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Eliminar una reseña
export const eliminarResena = async (req, res) => {
  try {
    const resena = await Resena.findByPk(req.params.id);
    if (!resena) return res.status(404).json({ error: "Reseña no encontrada" });
    await resena.destroy();
    res.json({ mensaje: "Reseña eliminada" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};