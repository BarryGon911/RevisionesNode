import Order from '../models/order.js';
import Cart from '../models/cart.js';
import Product from '../models/product.js';

export const create = async (req, res, next) => {
  try {
    const cart = await Cart.findOne({ user: req.user.userId }).populate('items.product');
    if (!cart || cart.items.length === 0) return res.status(400).json({ message: 'Cart is empty' });
    const items = cart.items.map(i => ({ product: i.product._id, quantity: i.quantity, price: i.product.price }));
    const total = items.reduce((sum, i) => sum + i.quantity * i.price, 0);
    const order = await Order.create({ user: req.user.userId, items, total, status: 'pending' });
    // reduce stock (basic)
    for (const i of cart.items) {
      await Product.findByIdAndUpdate(i.product._id, { $inc: { stock: -i.quantity } });
    }
    cart.items = [];
    await cart.save();
    res.status(201).json(order);
  } catch (err) { next(err); }
};

export const getMyOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({ user: req.user.userId }).populate('items.product');
    res.json(orders);
  } catch (err) { next(err); }
};

export const getById = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id).populate('items.product');
    if (!order) return res.status(404).json({ message: 'Order not found' });
    if (order.user.toString() !== req.user.userId && req.user.role !== 'admin')
      return res.status(403).json({ message: 'Forbidden' });
    res.json(order);
  } catch (err) { next(err); }
};
