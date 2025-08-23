import Product from '#models/Product.js';
import Category from '#models/Category.js';
import { paginateQuery, buildPaginatedResult } from '#utils/pagination.js';

export const listProducts = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page || '1', 10);
    const limit = parseInt(req.query.limit || '10', 10);
    const { skip } = paginateQuery({}, { page, limit });
    const [data, total] = await Promise.all([
      Product.find().populate('category').skip(skip).limit(limit),
      Product.countDocuments()
    ]);
    res.json(buildPaginatedResult({ data, total, page, limit }));
  } catch (e) { next(e); }
};

export const getProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id).populate('category');
    if (!product) return res.status(404).json({ error: 'Producto no encontrado' });
    res.json(product);
  } catch (e) { next(e); }
};

export const createProduct = async (req, res, next) => {
  try {
    const { name, description, price, stock, category } = req.body;
    const cat = await Category.findById(category);
    if (!cat) return res.status(400).json({ error: 'Categoría inválida' });
    const product = await Product.create({ name, description, price, stock, category });
    res.status(201).json(product);
  } catch (e) { next(e); }
};

export const updateProduct = async (req, res, next) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!product) return res.status(404).json({ error: 'Producto no encontrado' });
    res.json(product);
  } catch (e) { next(e); }
};

export const deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ error: 'Producto no encontrado' });
    res.json({ message: 'Producto eliminado' });
  } catch (e) { next(e); }
};
