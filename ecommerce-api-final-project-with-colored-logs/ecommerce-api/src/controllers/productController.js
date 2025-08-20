import Product from '../models/product.js';

export const list = async (req, res, next) => {
  try {
    const page = Math.max(parseInt(req.query.page) || 1, 1);
    const limit = Math.min(Math.max(parseInt(req.query.limit) || 10, 1), 100);
    const skip = (page - 1) * limit;
    const [items, total] = await Promise.all([
      Product.find().populate('category').skip(skip).limit(limit),
      Product.countDocuments()
    ]);
    res.json({ page, limit, total, items });
  } catch (err) { next(err); }
};

export const getById = async (req, res, next) => {
  try {
    const item = await Product.findById(req.params.id).populate('category');
    if (!item) return res.status(404).json({ message: 'Product not found' });
    res.json(item);
  } catch (err) { next(err); }
};

export const create = async (req, res, next) => {
  try {
    const item = await Product.create(req.body);
    res.status(201).json(item);
  } catch (err) { next(err); }
};

export const update = async (req, res, next) => {
  try {
    const item = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!item) return res.status(404).json({ message: 'Product not found' });
    res.json(item);
  } catch (err) { next(err); }
};

export const remove = async (req, res, next) => {
  try {
    const item = await Product.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ message: 'Product not found' });
    res.status(204).end();
  } catch (err) { next(err); }
};
