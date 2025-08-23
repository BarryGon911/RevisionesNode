import { Router } from 'express';
import { body, param } from 'express-validator';
import { getMyCart, addToCart, updateCartItem, removeFromCart, clearCart } from '#controllers/cartsController.js';
import { validate } from '#middlewares/validate.js';
import { auth } from '#middlewares/auth.js';

const router = Router();

router.get('/', auth(['customer','admin']), getMyCart);

router.post('/',
  auth(['customer','admin']),
  [ body('productId').isMongoId(), body('quantity').isInt({ min: 1 }) ],
  validate,
  addToCart
);

router.put('/',
  auth(['customer','admin']),
  [ body('productId').isMongoId(), body('quantity').isInt({ min: 1 }) ],
  validate,
  updateCartItem
);

router.delete('/item/:productId',
  auth(['customer','admin']),
  [ param('productId').isMongoId() ],
  validate,
  removeFromCart
);

router.delete('/clear',
  auth(['customer','admin']),
  clearCart
);

export default router;
