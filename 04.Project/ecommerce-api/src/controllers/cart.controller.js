import Cart from '../models/Cart.js';
import Product from '../models/Product.js';

export async function getCart(req, res) {
  let cart = await Cart.findOne({ user: req.user.id }).populate('items.product');
  if (!cart) {
    cart = await Cart.create({ user: req.user.id, items: [] });
  }
  res.json(cart);
}

export async function addItem(req, res) {
  const { productId, quantity } = req.body;
  const product = await Product.findById(productId);
  if (!product) return res.status(404).json({ error: 'Producto no encontrado' });
  if (quantity < 1) return res.status(400).json({ error: 'Cantidad inválida' });

  let cart = await Cart.findOne({ user: req.user.id });
  if (!cart) cart = await Cart.create({ user: req.user.id, items: [] });

  const idx = cart.items.findIndex(i => i.product.toString() == productId);
  if (idx >= 0) {
    cart.items[idx].quantity += quantity;
  } else {
    cart.items.push({ product: productId, quantity });
  }
  await cart.save();
  await cart.populate('items.product');
  res.status(201).json(cart);
}

export async function updateItem(req, res) {
  const { productId } = req.params;
  const { quantity } = req.body;
  if (quantity < 1) return res.status(400).json({ error: 'Cantidad inválida' });

  const cart = await Cart.findOne({ user: req.user.id });
  if (!cart) return res.status(404).json({ error: 'Carrito no encontrado' });

  const idx = cart.items.findIndex(i => i.product.toString() == productId);
  if (idx < 0) return res.status(404).json({ error: 'Item no encontrado en carrito' });

  cart.items[idx].quantity = quantity;
  await cart.save();
  await cart.populate('items.product');
  res.json(cart);
}

export async function removeItem(req, res) {
  const { productId } = req.params;
  const cart = await Cart.findOne({ user: req.user.id });
  if (!cart) return res.status(404).json({ error: 'Carrito no encontrado' });
  cart.items = cart.items.filter(i => i.product.toString() !== productId);
  await cart.save();
  await cart.populate('items.product');
  res.json(cart);
}
