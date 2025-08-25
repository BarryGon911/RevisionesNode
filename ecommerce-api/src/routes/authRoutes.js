import { Router } from "express";
import { body } from "express-validator";
import { register, login } from "#controllers/authController.js";
import { validate } from "#middlewares/validate.js";

const router = Router();

router.post("/register",
  [
    body("name").notEmpty(),
    body("email").isEmail(),
    body("password").isLength({ min: 6 }),
    body("role").optional().isIn(["admin","customer"])
  ],
  validate,
  register
);

router.post("/login",
  [ body("email").isEmail(), body("password").notEmpty() ],
  validate,
  login
);

export default router;