import Cart from "#models/Cart.js";
import Product from "#models/Product.js";

const getUserId = (user) => (user?.id || user?._id);

// GET /cart
export const getMyCart = async (req, res, next) => {
  try {
    const userId = getUserId(req.user);
    if (!userId) return res.status(401).json({ error: "No autenticado" });

    const cart = await Cart.findOne({ user: userId }).populate("items.product");
    return res.status(200).json(cart || { user: userId, items: [] });
  } catch (e) {
    next(e);
  }
};

// POST /cart  { productId, quantity }
export const addToCart = async (req, res, next) => {
  try {
    const userId = getUserId(req.user);
    if (!userId) return res.status(401).json({ error: "No autenticado" });

    const { productId } = req.body;
    const quantity = Number(req.body.quantity ?? 1);
    if (!productId) return res.status(400).json({ error: "productId requerido" });
    if (!Number.isFinite(quantity) || quantity <= 0) {
      return res.status(400).json({ error: "quantity inválido" });
    }

    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ error: "Producto no encontrado" });

    const cart = await Cart.findOneAndUpdate(
      { user: userId },
      { $setOnInsert: { user: userId, items: [] } },
      { upsert: true, new: true }
    );

    const existing = cart.items.find((i) => String(i.product) === String(productId));
    if (existing) existing.quantity += quantity;
    else cart.items.push({ product: productId, quantity });

    await cart.save();
    await cart.populate("items.product");

    // Puede ser 200 o 201 según tu preferencia; dejamos 201 y los tests aceptan 200/201.
    return res.status(201).json(cart);
  } catch (e) {
    next(e);
  }
};

// PUT /cart    { productId, quantity }
// PATCH /cart/:productId   { quantity }  (vía param → body)
export const updateCartItem = async (req, res, next) => {
  try {
    const userId = getUserId(req.user);
    if (!userId) return res.status(401).json({ error: "No autenticado" });

    const { productId } = req.body;
    const quantity = Number(req.body.quantity);
    if (!productId) return res.status(400).json({ error: "productId requerido" });
    if (!Number.isFinite(quantity) || quantity <= 0) {
      return res.status(400).json({ error: "quantity inválido" });
    }

    const cart = await Cart.findOne({ user: userId });
    if (!cart) return res.status(404).json({ error: "Carrito no encontrado" });

    const item = cart.items.find((i) => String(i.product) === String(productId));
    if (!item) return res.status(404).json({ error: "Item no existe en carrito" });

    item.quantity = quantity;
    await cart.save();
    await cart.populate("items.product");

    return res.status(200).json(cart);
  } catch (e) {
    next(e);
  }
};

// DELETE /cart/item/:productId  |  DELETE /cart/:productId
export const removeFromCart = async (req, res, next) => {
  try {
    const userId = getUserId(req.user);
    if (!userId) return res.status(401).json({ error: "No autenticado" });

    const { productId } = req.params;
    if (!productId) return res.status(400).json({ error: "productId requerido" });

    const cart = await Cart.findOne({ user: userId });
    if (!cart) return res.status(404).json({ error: "Carrito no encontrado" });

    const before = cart.items.length;
    cart.items = cart.items.filter((i) => String(i.product) !== String(productId));
    if (cart.items.length === before) {
      return res.status(404).json({ error: "Item no existe en carrito" });
    }

    await cart.save();
    await cart.populate("items.product");

    // Tu API venía respondiendo 200; mantenemos 200 (los tests ya aceptan 200/204).
    return res.status(200).json(cart);
  } catch (e) {
    next(e);
  }
};

// DELETE /cart/clear
export const clearCart = async (req, res, next) => {
  try {
    const userId = getUserId(req.user);
    if (!userId) return res.status(401).json({ error: "No autenticado" });

    const cart = await Cart.findOne({ user: userId });
    if (!cart) return res.status(404).json({ error: "Carrito vacío" });

    cart.items = [];
    await cart.save();

    return res.status(200).json(cart);
  } catch (e) {
    next(e);
  }
};