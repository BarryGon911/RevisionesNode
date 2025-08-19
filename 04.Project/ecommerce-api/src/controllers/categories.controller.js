import Category from '../models/Category.js';

export async function listCategories(req, res) {
  const items = await Category.find().sort({ name: 1 });
  return res.json(items);
}

export async function getCategory(req, res) {
  const item = await Category.findById(req.params.id);
  if (!item) return res.status(404).json({ error: 'Categoría no encontrada' });
  return res.json(item);
}

export async function createCategory(req, res) {
  const item = await Category.create({ name: req.body.name, description: req.body.description || '' });
  return res.status(201).json(item);
}

export async function updateCategory(req, res) {
  const item = await Category.findByIdAndUpdate(req.params.id, { name: req.body.name, description: req.body.description || '' }, { new: true });
  if (!item) return res.status(404).json({ error: 'Categoría no encontrada' });
  return res.json(item);
}

export async function deleteCategory(req, res) {
  const item = await Category.findByIdAndDelete(req.params.id);
  if (!item) return res.status(404).json({ error: 'Categoría no encontrada' });
  return res.json({ message: 'Categoría eliminada' });
}