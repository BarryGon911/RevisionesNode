import Cart from "#models/Cart.js";
import Product from "#models/Product.js";

export const getMyCart = async (req, res, next) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id }).populate("items.product");
    res.json(cart || { user: req.user._id, items: [] });
  }
  catch (e) { next(e); }
};

export const addToCart = async (req, res, next) => {
  try {
    const { productId, quantity } = req.body;
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ error: "Producto no encontrado" });
    const cart = await Cart.findOneAndUpdate(
      { user: req.user._id },
      { $setOnInsert: { user: req.user._id, items: [] } },
      { upsert: true, new: true }
    );
    const existing = cart.items.find(i => i.product.toString() === productId);
    if (existing) existing.quantity += quantity;
    else cart.items.push({ product: productId, quantity });
    await cart.save();
    await cart.populate("items.product");
    res.status(201).json(cart);
  }
  catch (e) { next(e); }
};

export const updateCartItem = async (req, res, next) => {
  try {
    const { productId, quantity } = req.body;
    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart) return res.status(404).json({ error: "Carrito vacío" });
    const item = cart.items.find(i => i.product.toString() === productId);
    if (!item) return res.status(404).json({ error: "Item no existe en carrito" });
    item.quantity = quantity;
    await cart.save();
    await cart.populate("items.product");
    res.json(cart);
  }
  catch (e) { next(e); }
};

export const removeFromCart = async (req, res, next) => {
  try {
    const { productId } = req.params;
    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart) return res.status(404).json({ error: "Carrito vacío" });
    cart.items = cart.items.filter(i => i.product.toString() !== productId);
    await cart.save();
    await cart.populate("items.product");
    res.json(cart);
  }
  catch (e) { next(e); }
};

export const clearCart = async (req, res, next) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart) return res.status(404).json({ error: "Carrito vacío" });
    cart.items = [];
    await cart.save();
    res.json(cart);
  }
  catch (e) { next(e); }
};