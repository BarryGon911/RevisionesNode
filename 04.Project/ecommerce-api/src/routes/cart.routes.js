import { Router } from 'express';
import { body, param } from 'express-validator';
import { handleValidation } from '../middlewares/validate.js';
import { requireAuth } from '../middlewares/auth.js';
import { getCart, addItem, updateItem, removeItem } from '../controllers/cart.controller.js';

const router = Router();

router.get('/', requireAuth, getCart);

router.post('/items',
  requireAuth,
  body('productId').isMongoId(),
  body('quantity').isInt({ min: 1 }),
  handleValidation,
  addItem
);

router.put('/items/:productId',
  requireAuth,
  param('productId').isMongoId(),
  body('quantity').isInt({ min: 1 }),
  handleValidation,
  updateItem
);

router.delete('/items/:productId',
  requireAuth,
  param('productId').isMongoId(),
  handleValidation,
  removeItem
);

export default router;