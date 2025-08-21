import { Router } from "express";
import { param } from "express-validator";
import validate from "../middlewares/validation.js";
import auth from "../middlewares/authMiddleware.js";
import { create, getMyOrders, getById } from "../controllers/orderController.js";

const router = Router();

router.post("/", auth, create);
router.get("/", auth, getMyOrders);
router.get("/:id", [ auth, param("id").isMongoId() ], validate, getById);

export default router;