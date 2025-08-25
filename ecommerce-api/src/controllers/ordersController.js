import Order from '#models/Order.js';
import Cart from '#models/Cart.js';
import Product from '#models/Product.js';

// Normaliza el id del usuario desde req.user
const getUserId = (user) => (user?.id || user?._id);

/**
 * POST /orders
 * - Si vienen items en el body, los usa (product/productId + quantity).
 * - Si no, toma los items del carrito del usuario.
 * - Valida existencia de productos y cantidades.
 * - Calcula total y crea la orden.
 * - Limpia el carrito después de crear la orden.
 */
export const createOrder = async (req, res, next) => {
  try {
    const userId = getUserId(req.user);
    if (!userId) return res.status(401).json({ error: 'No autenticado' });

    // 1) Construir items (desde body o desde el carrito)
    let items = Array.isArray(req.body?.items) ? req.body.items : null;

    if (items && items.length) {
      // Normaliza: { product: <id>, quantity } o { productId, quantity }
      items = items
        .map((i) => ({
          product: i.product || i.productId,
          quantity: Number(i.quantity ?? 1),
        }))
        .filter((i) => i.product && Number.isFinite(i.quantity) && i.quantity > 0);

      if (!items.length) {
        return res.status(400).json({ error: 'Items inválidos' });
      }
    } else {
      // Tomar del carrito
      const cart = await Cart.findOne({ user: userId });
      if (!cart || !cart.items?.length) {
        return res.status(400).json({ error: 'No hay items para ordenar' });
      }
      items = cart.items.map((i) => ({
        product: i.product,
        quantity: Number(i.quantity || 1),
      }));
    }

    // 2) Validar existencia de productos
    const productIds = [...new Set(items.map((i) => String(i.product)))];
    const products = await Product.find(
      { _id: { $in: productIds } },
      { price: 1 }
    );

    if (products.length !== productIds.length) {
      return res.status(400).json({ error: 'Algún producto no existe' });
    }

    const priceMap = Object.fromEntries(
      products.map((p) => [String(p._id), Number(p.price || 0)])
    );

    // 3) Construir items con precio y calcular total
    const orderItems = items.map((i) => ({
      product: i.product,
      quantity: i.quantity,
      price: priceMap[String(i.product)],
    }));

    if (orderItems.some((i) => typeof i.price !== 'number')) {
      return res.status(400).json({ error: 'No se pudo determinar el precio de un producto' });
    }

    const total = orderItems.reduce((acc, i) => acc + i.price * i.quantity, 0);

    // 4) Crear la orden
    const order = await Order.create({
      user: userId,
      items: orderItems,
      total,
      status: 'created',
    });

    // 5) (Opcional recomendado) Vaciar carrito
    await Cart.findOneAndUpdate(
      { user: userId },
      { $set: { items: [] } },
      { upsert: false }
    );

    return res.status(201).json(order);
  } catch (e) {
    return next(e);
  }
};

/**
 * GET /orders
 * - Lista las órdenes del usuario autenticado con populate de productos
 */
export const listMyOrders = async (req, res, next) => {
  try {
    const userId = getUserId(req.user);
    if (!userId) return res.status(401).json({ error: 'No autenticado' });

    const orders = await Order.find({ user: userId }).populate('items.product');
    return res.json(orders);
  } catch (e) {
    return next(e);
  }
};