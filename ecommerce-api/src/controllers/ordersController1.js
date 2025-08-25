import Order from "#models/Order.js";
import Cart from "#models/Cart.js";
import Product from "#models/Product.js";

export const createOrder = async (req, res, next) => {
  try {
    let items = req.body.items;
    if (!items || !items.length) {
      const cart = await Cart.findOne({ user: req.user._id });
      if (!cart || !cart.items.length) return res.status(400).json({ error: "No hay items para ordenar" });
      items = cart.items.map(i => ({ product: i.product, quantity: i.quantity }));
    }
    const populated = await Product.find({ _id: { $in: items.map(i => i.product) } });
    const priceMap = Object.fromEntries(populated.map(p => [p._id.toString(), p.price]));
    const orderItems = items.map(i => ({ product: i.product, quantity: i.quantity, price: priceMap[i.product] }));
    const total = orderItems.reduce((acc, i) => acc + i.price * i.quantity, 0);
    const order = await Order.create({ user: req.user._id, items: orderItems, total });
    await Cart.findOneAndUpdate({ user: req.user._id }, { items: [] });
    res.status(201).json(order);
  }
  catch (e) { next(e); }
};

export const listMyOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({ user: req.user._id }).populate("items.product");
    res.json(orders);
  }
  catch (e) { next(e); }
};