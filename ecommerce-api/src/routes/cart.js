import { Router } from "express";
import { body, param } from "express-validator";
import validate from "../middlewares/validation.js";
import auth from "../middlewares/authMiddleware.js";
import { getMyCart, addProduct, updateItem, removeItem } from "../controllers/cartController.js";

const router = Router();

router.get("/", auth, getMyCart);

router.post("/add-product", [
  auth,
  body("productId").isMongoId(),
  body("quantity").optional().isInt({ min:1 })
], validate, addProduct);

router.put("/item", [
  auth,
  body("productId").isMongoId(),
  body("quantity").isInt({ min:0 })
], validate, updateItem);

router.delete("/item/:productId", [ auth, param("productId").isMongoId() ], validate, removeItem);

export default router;