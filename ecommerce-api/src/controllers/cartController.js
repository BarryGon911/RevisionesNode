import Cart from "../models/cart.js";
import Product from "../models/product.js";

export const getMyCart = async (req, res, next) => {
  try {
    const cart = await Cart.findOne({ user: req.user.userId }).populate("items.product");
    res.json(cart || { user: req.user.userId, items: [] });
  } catch (err) { next(err); }
};

export const addProduct = async (req, res, next) => {
  try {
    const { productId, quantity } = req.body;
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: "Product not found" });
    let cart = await Cart.findOne({ user: req.user.userId });
    if (!cart) cart = await Cart.create({ user: req.user.userId, items: [] });
    const idx = cart.items.findIndex(i => i.product.toString() === productId);
    if (idx >= 0) cart.items[idx].quantity += (quantity || 1);
    else cart.items.push({ product: productId, quantity: quantity || 1 });
    await cart.save();
    await cart.populate("items.product");
    res.status(201).json(cart);
  } catch (err) { next(err); }
};

export const updateItem = async (req, res, next) => {
  try {
    const { productId, quantity } = req.body;
    let cart = await Cart.findOne({ user: req.user.userId });
    if (!cart) return res.status(404).json({ message: "Cart not found" });
    const idx = cart.items.findIndex(i => i.product.toString() === productId);
    if (idx < 0) return res.status(404).json({ message: "Item not found in cart" });
    if (quantity <= 0) cart.items.splice(idx,1);
    else cart.items[idx].quantity = quantity;
    await cart.save();
    await cart.populate("items.product");
    res.json(cart);
  } catch (err) { next(err); }
};

export const removeItem = async (req, res, next) => {
  try {
    const { productId } = req.params;
    let cart = await Cart.findOne({ user: req.user.userId });
    if (!cart) return res.status(404).json({ message: "Cart not found" });
    cart.items = cart.items.filter(i => i.product.toString() !== productId);
    await cart.save();
    await cart.populate("items.product");
    res.json(cart);
  } catch (err) { next(err); }
};
