import { Router } from "express";
import { body } from "express-validator";
import validate from "../middlewares/validation.js";
import { register, login } from "../controllers/authController.js";

const router = Router();

router.post("/register", [
  body("displayName").notEmpty().isLength({ min: 2 }),
  body("email").isEmail(),
  body("password").isLength({ min: 6 })
], validate, register);

router.post("/login", [
  body("email").isEmail(),
  body("password").notEmpty()
], validate, login);

export default router;