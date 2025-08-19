import Product from '../models/Product.js';
import { buildPagination } from '../utils/pagination.js';

export async function listProducts(req, res) {
  const { page, limit, skip } = buildPagination(req.query);
  const filter = {};
  if (req.query.category) filter.category = req.query.category;
  if (req.query.q) filter.$text = { $search: req.query.q };
  const [items, total] = await Promise.all([
    Product.find(filter).populate('category').skip(skip).limit(limit).sort({ createdAt: -1 }),
    Product.countDocuments(filter),
  ]);
  res.json({ page, limit, total, items });
}

export async function getProduct(req, res) {
  const item = await Product.findById(req.params.id).populate('category');
  if (!item) return res.status(404).json({ error: 'Producto no encontrado' });
  res.json(item);
}

export async function createProduct(req, res) {
  const item = await Product.create({
    name: req.body.name,
    description: req.body.description || '',
    price: req.body.price,
    stock: req.body.stock,
    category: req.body.category,
  });
  res.status(201).json(item);
}

export async function updateProduct(req, res) {
  const item = await Product.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name, description: req.body.description || '', price: req.body.price, stock: req.body.stock, category: req.body.category },
    { new: true }
  );
  if (!item) return res.status(404).json({ error: 'Producto no encontrado' });
  res.json(item);
}

export async function deleteProduct(req, res) {
  const item = await Product.findByIdAndDelete(req.params.id);
  if (!item) return res.status(404).json({ error: 'Producto no encontrado' });
  res.json({ message: 'Producto eliminado' });
}
