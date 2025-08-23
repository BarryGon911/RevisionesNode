import { Router } from 'express';
import { body } from 'express-validator';
import { createOrder, listMyOrders } from '#controllers/ordersController.js';
import { validate } from '#middlewares/validate.js';
import { auth } from '#middlewares/auth.js';

const router = Router();

router.get('/', auth(['customer','admin']), listMyOrders);

router.post('/',
  auth(['customer','admin']),
  [ body('items').optional().isArray() ],
  validate,
  createOrder
);

export default router;
