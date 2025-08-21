import { Router } from "express";
import { param, query } from "express-validator";
import validate from "../middlewares/validation.js";
import auth from "../middlewares/authMiddleware.js";
import isAdmin from "../middlewares/isAdminMiddleware.js";
import { list, getById, remove } from "../controllers/userController.js";

const router = Router();

router.get("/", [ auth, isAdmin, query("page").optional().isInt({min:1}), query("limit").optional().isInt({min:1,max:100}) ], validate, list);
router.get("/:id", [ auth, isAdmin, param("id").isMongoId() ], validate, getById);
router.delete("/:id", [ auth, isAdmin, param("id").isMongoId() ], validate, remove);

export default router;