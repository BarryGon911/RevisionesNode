import { Router } from 'express';
import { body } from 'express-validator';
import { handleValidation } from '../middlewares/validate.js';
import { requireAuth, requireRole } from '../middlewares/auth.js';
import { createOrder, myOrders, listOrders } from '../controllers/orders.controller.js';

const router = Router();

router.post('/',
  requireAuth,
  body('items').optional().isArray({ min: 1 }),
  body('items.*.product').optional().isMongoId(),
  body('items.*.quantity').optional().isInt({ min: 1 }),
  handleValidation,
  createOrder
);

router.get('/my', requireAuth, myOrders);

router.get('/', requireAuth, requireRole('admin'), listOrders);

export default router;