import { Router } from "express";
import { body, param } from "express-validator";
import { getMyCart, addToCart, updateCartItem, removeFromCart, clearCart } from "#controllers/cartsController.js";
import { validate } from "#middlewares/validate.js";
import { auth } from "#middlewares/auth.js";

const router = Router();

const paramToBodyProductId = (req, _res, next) => {
  if (req.params.productId && !req.body.productId) {
    req.body.productId = req.params.productId;
  }
  next();
};

// GET /cart (usuario)
router.get(
  "/",
  auth(["customer", "admin"]),
  getMyCart
);

// POST /cart (agregar item)  { productId, quantity }
router.post(
  "/",
  auth(["customer", "admin"]),
  [ body("productId").isMongoId(), body("quantity").isInt({ min: 1 }) ],
  validate,
  addToCart
);

// PUT /cart (actualizar cantidad)  { productId, quantity }
router.put(
  "/",
  auth(["customer", "admin"]),
  [ body("productId").isMongoId(), body("quantity").isInt({ min: 1 }) ],
  validate,
  updateCartItem
);

router.patch(
  "/:productId",
  auth(["customer", "admin"]),
  [
    param("productId").isMongoId(),
    body("quantity").isInt({ min: 1 })
  ],
  validate,
  paramToBodyProductId,
  updateCartItem
);

router.patch(
  "/items/:productId",
  auth(["customer", "admin"]),
  [
    param("productId").isMongoId(),
    body("quantity").isInt({ min: 1 })
  ],
  validate,
  paramToBodyProductId,
  updateCartItem
);

// DELETE /cart/item/:productId
router.delete(
  "/item/:productId",
  auth(["customer", "admin"]),
  [ param("productId").isMongoId() ],
  validate,
  removeFromCart
);

// ALIAS: DELETE /cart/:productId
router.delete(
  "/:productId",
  auth(["customer", "admin"]),
  [ param("productId").isMongoId() ],
  validate,
  removeFromCart
);

// DELETE /cart/clear (vaciar carrito)
router.delete(
  "/clear",
  auth(["customer", "admin"]),
  clearCart
);

export default router;