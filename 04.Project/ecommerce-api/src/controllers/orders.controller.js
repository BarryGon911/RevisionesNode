import Order from '../models/Order.js';
import Product from '../models/Product.js';
import Cart from '../models/Cart.js';

export async function createOrder(req, res) {
  // Permite crear desde items explícitos o desde el carrito actual
  let items = req.body.items;
  if (!items || !Array.isArray(items) || items.length === 0) {
    const cart = await Cart.findOne({ user: req.user.id });
    if (!cart || cart.items.length === 0) return res.status(400).json({ error: 'Sin items para ordenar' });
    items = cart.items.map(i => ({ product: i.product, quantity: i.quantity }));
  }

  // Resolver precios actuales y calcular total
  const resolved = [];
  let total = 0;
  for (const it of items) {
    const prod = await Product.findById(it.product);
    if (!prod) return res.status(400).json({ error: `Producto inválido: ${it.product}` });
    const price = prod.price;
    resolved.push({ product: prod._id, quantity: it.quantity, price });
    total += price * it.quantity;
  }

  const order = await Order.create({ user: req.user.id, items: resolved, total });
  // opcional: limpiar carrito
  const cart = await Cart.findOne({ user: req.user.id });
  if (cart) { cart.items = []; await cart.save(); }
  res.status(201).json(order);
}

export async function myOrders(req, res) {
  const items = await Order.find({ user: req.user.id }).sort({ createdAt: -1 }).populate('items.product');
  res.json(items);
}

export async function listOrders(req, res) {
  const items = await Order.find().sort({ createdAt: -1 }).populate('user', 'name email').populate('items.product');
  res.json(items);
}
