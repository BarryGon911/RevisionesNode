import Category from '#models/Category.js';
import { paginateQuery, buildPaginatedResult } from '#utils/pagination.js';

export const listCategories = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page || '1', 10);
    const limit = parseInt(req.query.limit || '10', 10);
    const { skip } = paginateQuery({}, { page, limit });
    const [data, total] = await Promise.all([
      Category.find().skip(skip).limit(limit),
      Category.countDocuments()
    ]);
    res.json(buildPaginatedResult({ data, total, page, limit }));
  } catch (e) { next(e); }
};

export const createCategory = async (req, res, next) => {
  try {
    const { name, description } = req.body;
    const exists = await Category.findOne({ name });
    if (exists) return res.status(400).json({ error: 'La categoría ya existe' });
    const cat = await Category.create({ name, description });
    res.status(201).json(cat);
  } catch (e) { next(e); }
};

export const updateCategory = async (req, res, next) => {
  try {
    const cat = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!cat) return res.status(404).json({ error: 'Categoría no encontrada' });
    res.json(cat);
  } catch (e) { next(e); }
};

export const deleteCategory = async (req, res, next) => {
  try {
    const cat = await Category.findByIdAndDelete(req.params.id);
    if (!cat) return res.status(404).json({ error: 'Categoría no encontrada' });
    res.json({ message: 'Categoría eliminada' });
  } catch (e) { next(e); }
};
